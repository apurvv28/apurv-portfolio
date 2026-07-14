import fs from "node:fs/promises";
import path from "node:path";
import bcrypt from "bcryptjs";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getS3Client, isS3Configured } from "./s3-storage";

export type AdminCredentials = {
  passwordHash: string;
  updatedAt: string;
};

const CREDENTIALS_PATH = path.join(process.cwd(), "config", "admin-credentials.json");
const S3_KEY = "config/admin-credentials.json";

export function getAdminCredentialsPath(): string {
  return CREDENTIALS_PATH;
}

async function readCredentialsPayload(): Promise<string> {
  if (isS3Configured()) {
    const client = getS3Client();
    const bucket = process.env.AWS_S3_BUCKET!;
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: S3_KEY
    });
    const response = await client.send(command);
    if (!response.Body) {
      throw new Error("Credentials file body is empty in S3.");
    }
    return response.Body.transformToString();
  }

  return fs.readFile(CREDENTIALS_PATH, "utf8");
}

export async function readAdminCredentials(): Promise<AdminCredentials> {
  try {
    const raw = await readCredentialsPayload();
    const parsed = JSON.parse(raw) as Partial<AdminCredentials>;

    if (!parsed.passwordHash || !parsed.updatedAt) {
      throw new Error("Missing passwordHash or updatedAt.");
    }

    return {
      passwordHash: parsed.passwordHash,
      updatedAt: parsed.updatedAt
    };
  } catch (error) {
    throw new Error(
      isS3Configured()
        ? `Admin credentials are missing or invalid in S3 bucket (${process.env.AWS_S3_BUCKET}). Run npm run admin:set-password to create and upload them.`
        : `Admin credentials file is missing or invalid at ${CREDENTIALS_PATH}. Run npm run admin:set-password to create it locally.`
    );
  }
}

export async function verifyAdminPassword(password: string): Promise<boolean> {
  const credentials = await readAdminCredentials();
  return bcrypt.compare(password, credentials.passwordHash);
}