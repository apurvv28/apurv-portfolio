import fs from "node:fs/promises";
import path from "node:path";
import bcrypt from "bcryptjs";

export type AdminCredentials = {
  passwordHash: string;
  updatedAt: string;
};

const CREDENTIALS_PATH = path.join(process.cwd(), "config", "admin-credentials.json");
const CREDENTIALS_BLOB_URL = process.env.ADMIN_CREDENTIALS_BLOB_URL?.trim();

export function getAdminCredentialsPath(): string {
  return CREDENTIALS_PATH;
}

async function readCredentialsPayload(): Promise<string> {
  if (CREDENTIALS_BLOB_URL) {
    const response = await fetch(CREDENTIALS_BLOB_URL, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(
        `Unable to read admin credentials from blob URL (${response.status} ${response.statusText}).`
      );
    }

    return response.text();
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
      CREDENTIALS_BLOB_URL
        ? `Admin credentials blob is missing or invalid at ${CREDENTIALS_BLOB_URL}. Make sure the Vercel Blob object contains the JSON payload with passwordHash and updatedAt.`
        : `Admin credentials file is missing or invalid at ${CREDENTIALS_PATH}. Run npm run admin:set-password to create it locally.`
    );
  }
}

export async function verifyAdminPassword(password: string): Promise<boolean> {
  const credentials = await readAdminCredentials();
  return bcrypt.compare(password, credentials.passwordHash);
}