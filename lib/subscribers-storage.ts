import fs from "node:fs/promises";
import path from "node:path";
import { list, put } from "@vercel/blob";

const SUBSCRIBERS_PATH = path.join(process.cwd(), "config", "subscribers.json");

function isBlobConfigured(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

async function ensureConfigDir() {
  await fs.mkdir(path.dirname(SUBSCRIBERS_PATH), { recursive: true });
}

export async function getSubscribers(): Promise<string[]> {
  if (isBlobConfigured()) {
    try {
      const { blobs } = await list();
      const subscriberBlob = blobs.find((b) => b.pathname === "subscribers.json");
      if (subscriberBlob) {
        const response = await fetch(subscriberBlob.url, { cache: "no-store" });
        if (response.ok) {
          const listData = await response.json();
          return Array.isArray(listData) ? listData : [];
        }
      }
    } catch (e) {
      console.error("Failed to read subscribers from Vercel Blob:", e);
    }
  }

  // Local fallback
  try {
    const raw = await fs.readFile(SUBSCRIBERS_PATH, "utf8");
    const listData = JSON.parse(raw);
    return Array.isArray(listData) ? listData : [];
  } catch {
    return [];
  }
}

export async function addSubscriber(email: string): Promise<boolean> {
  const listData = await getSubscribers();
  if (listData.includes(email)) return false;

  listData.push(email);

  if (isBlobConfigured()) {
    try {
      await put("subscribers.json", JSON.stringify(listData), {
        access: "public",
        addRandomSuffix: false
      });
    } catch (e) {
      console.error("Failed to write subscribers to Vercel Blob:", e);
    }
  }

  // Always save locally as copy/fallback
  await ensureConfigDir();
  await fs.writeFile(SUBSCRIBERS_PATH, JSON.stringify(listData, null, 2), "utf8");
  return true;
}
