import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/admin-auth";

async function hasValidSession(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  return verifyAdminSessionToken(token);
}

export async function middleware(request: NextRequest): Promise<NextResponse | undefined> {
  const { pathname, searchParams } = request.nextUrl;
  const isAdminLogin = pathname === "/admin-login";
  const isDashboard = pathname.startsWith("/admin/dashboard");
  const isBlogApi = pathname.startsWith("/api/blogs");
  const needsAuthForBlogs = isBlogApi && (request.method !== "GET" || searchParams.get("admin") === "true");

  if (isAdminLogin) {
    if (await hasValidSession(request)) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    return undefined;
  }

  if (isDashboard) {
    if (!(await hasValidSession(request))) {
      return NextResponse.redirect(new URL("/admin-login", request.url));
    }
    return undefined;
  }

  if (needsAuthForBlogs && !(await hasValidSession(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return undefined;
}

export const config = {
  matcher: ["/admin-login", "/admin/dashboard/:path*", "/api/blogs/:path*"]
};