import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, buildAdminCookieOptions } from "@/lib/admin-auth";

export async function POST(): Promise<NextResponse> {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, "", {
    ...buildAdminCookieOptions(),
    maxAge: 0
  });
  return response;
}