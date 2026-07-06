import { NextResponse } from "next/server";
import { createAdminSessionToken, ADMIN_SESSION_COOKIE, buildAdminCookieOptions } from "@/lib/admin-auth";
import { verifyAdminPassword } from "@/lib/admin-credentials";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = (await request.json()) as { password?: string };
    const password = body.password ?? "";

    if (!password) {
      return NextResponse.json({ error: "Password is required." }, { status: 400 });
    }

    const valid = await verifyAdminPassword(password);
    if (!valid) {
      return NextResponse.json({ error: "Invalid password." }, { status: 401 });
    }

    const token = await createAdminSessionToken();
    const response = NextResponse.json({ ok: true }, { status: 200 });
    response.cookies.set(ADMIN_SESSION_COOKIE, token, buildAdminCookieOptions());
    return response;
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to authenticate right now. Please try again."
      },
      { status: 500 }
    );
  }
}