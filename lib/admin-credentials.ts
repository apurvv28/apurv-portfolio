import fs from "node:fs/promises";
import path from "node:path";
import bcrypt from "bcryptjs";

export type AdminCredentials = {
  passwordHash: string;
  updatedAt: string;
};

const CREDENTIALS_PATH = path.join(process.cwd(), "config", "admin-credentials.json");

export function getAdminCredentialsPath(): string {
  return CREDENTIALS_PATH;
}

export async function readAdminCredentials(): Promise<AdminCredentials> {
  try {
    const raw = await fs.readFile(CREDENTIALS_PATH, "utf8");
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
      `Admin credentials file is missing or invalid at ${CREDENTIALS_PATH}. Run npm run admin:set-password to create it locally.`
    );
  }
}

export async function verifyAdminPassword(password: string): Promise<boolean> {
  const credentials = await readAdminCredentials();
  return bcrypt.compare(password, credentials.passwordHash);
}