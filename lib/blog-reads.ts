import fs from "node:fs/promises";
import path from "node:path";
import { list, put } from "@vercel/blob";

const READS_PATH = path.join(process.cwd(), "config", "blog-reads.json");

function isBlobConfigured(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

let readsBlobUrl: string | null = null;

async function getReadsBlobUrl(): Promise<string | null> {
  if (readsBlobUrl) return readsBlobUrl;
  try {
    const { blobs } = await list();
    const blob = blobs.find((b) => b.pathname === "blog-reads.json");
    if (blob) {
      readsBlobUrl = blob.url;
      return readsBlobUrl;
    }
  } catch (e) {
    console.error("Failed to list blobs for blog-reads.json:", e);
  }
  return null;
}

async function ensureConfigDir() {
  await fs.mkdir(path.dirname(READS_PATH), { recursive: true });
}

export async function getBlogReads(): Promise<Record<string, number>> {
  if (isBlobConfigured()) {
    try {
      const url = await getReadsBlobUrl();
      if (url) {
        const response = await fetch(`${url}?t=${Date.now()}`, { cache: "no-store" });
        if (response.ok) {
          const data = await response.json();
          return typeof data === "object" && data !== null ? data : {};
        }
      }
    } catch (e) {
      console.error("Failed to read blog reads from Vercel Blob:", e);
    }
    return {};
  }

  // Local fallback
  try {
    const raw = await fs.readFile(READS_PATH, "utf8");
    const data = JSON.parse(raw);
    return typeof data === "object" && data !== null ? data : {};
  } catch {
    return {};
  }
}

export async function incrementBlogReads(slug: string): Promise<number> {
  const reads = await getBlogReads();
  const currentCount = reads[slug] || 0;
  const newCount = currentCount + 1;
  reads[slug] = newCount;

  if (isBlobConfigured()) {
    try {
      const blob = await put("blog-reads.json", JSON.stringify(reads), {
        access: "public",
        addRandomSuffix: false,
        allowOverwrite: true
      });
      readsBlobUrl = blob.url;
      return newCount;
    } catch (e) {
      console.error("Failed to write blog reads to Vercel Blob:", e);
      throw new Error("Unable to save blog reads to Vercel Blob.");
    }
  }

  // Local save fallback
  await ensureConfigDir();
  await fs.writeFile(READS_PATH, JSON.stringify(reads, null, 2), "utf8");
  return newCount;
}
