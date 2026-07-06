export const ADMIN_SESSION_COOKIE = "portfolio_admin_session";
export const ADMIN_SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;
const ADMIN_SESSION_SECRET = process.env.ADMIN_SESSION_SECRET ?? "apurv-portfolio-admin-session-secret";

export type AdminCookieOptions = {
  httpOnly: boolean;
  secure: boolean;
  sameSite: "strict";
  path: string;
  maxAge: number;
};

export type AdminSessionPayload = {
  purpose: "admin-session";
  issuedAt: number;
  expiresAt: number;
};

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (let index = 0; index < bytes.length; index += 1) {
    binary += String.fromCharCode(bytes[index] ?? 0);
  }

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlToBytes(value: string): ArrayBuffer {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes.buffer;
}

function textToBytes(value: string): ArrayBuffer {
  return new TextEncoder().encode(value).buffer;
}

function bytesToText(value: ArrayBuffer | Uint8Array): string {
  return new TextDecoder().decode(value instanceof Uint8Array ? value : new Uint8Array(value));
}

async function importSessionSecret(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    textToBytes(ADMIN_SESSION_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

async function signToken(value: string): Promise<string> {
  const key = await importSessionSecret();
  const signature = await crypto.subtle.sign("HMAC", key, textToBytes(value));
  return bytesToBase64Url(new Uint8Array(signature));
}

async function verifySignature(value: string, signature: string): Promise<boolean> {
  const expectedSignature = await signToken(value);
  return expectedSignature === signature;
}

export async function createAdminSessionToken(): Promise<string> {
  const payload: AdminSessionPayload = {
    purpose: "admin-session",
    issuedAt: Date.now(),
    expiresAt: Date.now() + ADMIN_SESSION_DURATION_MS
  };

  const encodedPayload = bytesToBase64Url(new TextEncoder().encode(JSON.stringify(payload)));
  const signature = await signToken(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

export async function verifyAdminSessionToken(token?: string | null): Promise<boolean> {
  if (!token) return false;

  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) return false;

  const valid = await verifySignature(encodedPayload, signature);
  if (!valid) return false;

  try {
    const payload = JSON.parse(bytesToText(base64UrlToBytes(encodedPayload))) as AdminSessionPayload;
    return payload.purpose === "admin-session" && payload.expiresAt > Date.now();
  } catch {
    return false;
  }
}

export function buildAdminCookieOptions(): AdminCookieOptions {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: Math.floor(ADMIN_SESSION_DURATION_MS / 1000)
  };
}