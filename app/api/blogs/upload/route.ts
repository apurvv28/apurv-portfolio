import fs from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/admin-auth";
import { isS3Configured, uploadS3Image } from "@/lib/s3-storage";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "blogs");

async function isAdminRequest(request: Request): Promise<boolean> {
  const token = request.headers.get("cookie")
    ?.split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${ADMIN_SESSION_COOKIE}=`))
    ?.split("=")[1];

  return verifyAdminSessionToken(token);
}

function getExtension(file: File): string {
  const extension = path.extname(file.name).toLowerCase();
  if ([".png", ".jpg", ".jpeg", ".webp", ".gif"].includes(extension)) {
    return extension;
  }

  const mimeToExt: Record<string, string> = {
    "image/png": ".png",
    "image/jpeg": ".jpg",
    "image/webp": ".webp",
    "image/gif": ".gif"
  };

  return mimeToExt[file.type] ?? ".png";
}

export async function POST(request: Request): Promise<NextResponse> {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing upload file." }, { status: 400 });
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "File is too large." }, { status: 413 });
  }

  const filename = `${randomUUID()}${getExtension(file)}`;
  let fileUrl = "";

  if (isS3Configured()) {
    try {
      const buffer = Buffer.from(await file.arrayBuffer());
      fileUrl = await uploadS3Image(filename, buffer, file.type);
    } catch (error: any) {
      return NextResponse.json(
        { error: `Failed to upload to S3: ${error.message}` },
        { status: 500 }
      );
    }
  } else {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    const filePath = path.join(UPLOAD_DIR, filename);
    await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));
    fileUrl = `/uploads/blogs/${filename}`;
  }

  return NextResponse.json({
    url: fileUrl,
    filename
  });
}