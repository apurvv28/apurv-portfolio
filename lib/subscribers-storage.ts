import fs from "node:fs/promises";
import path from "node:path";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getS3Client, isS3Configured } from "./s3-storage";
import { unstable_noStore as noStore } from "next/cache";

const SUBSCRIBERS_PATH = path.join(process.cwd(), "config", "subscribers.json");
const S3_KEY = "config/subscribers.json";

async function ensureConfigDir() {
  await fs.mkdir(path.dirname(SUBSCRIBERS_PATH), { recursive: true });
}

export async function getSubscribers(): Promise<string[]> {
  if (isS3Configured()) {
    try {
      noStore();
      const client = getS3Client();
      const bucket = process.env.AWS_S3_BUCKET!;
      const command = new GetObjectCommand({
        Bucket: bucket,
        Key: S3_KEY
      });
      const response = await client.send(command);
      if (response.Body) {
        const raw = await response.Body.transformToString();
        const listData = JSON.parse(raw);
        return Array.isArray(listData) ? listData : [];
      }
    } catch (e: any) {
      if (e.name === "NoSuchKey" || e.name === "NotFound" || e.$metadata?.httpStatusCode === 404) {
        return [];
      }
      console.error("Failed to read subscribers from S3:", e);
    }
    return []; // Bypass local filesystem read when S3 is active
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

  if (isS3Configured()) {
    try {
      noStore();
      const client = getS3Client();
      const bucket = process.env.AWS_S3_BUCKET!;
      const command = new PutObjectCommand({
        Bucket: bucket,
        Key: S3_KEY,
        Body: JSON.stringify(listData, null, 2),
        ContentType: "application/json"
      });
      await client.send(command);
      return true; // Return immediately to bypass local filesystem write when S3 is active
    } catch (e) {
      console.error("Failed to write subscribers to S3:", e);
      throw new Error("Unable to save subscriber to S3.");
    }
  }

  // Local save as copy/fallback in development
  await ensureConfigDir();
  await fs.writeFile(SUBSCRIBERS_PATH, JSON.stringify(listData, null, 2), "utf8");
  return true;
}
