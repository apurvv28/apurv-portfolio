import { NextResponse } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { isS3Configured, getS3Client } from "@/lib/s3-storage";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ filename: string }> }
): Promise<Response> {
  const { filename } = await params;

  if (!isS3Configured()) {
    return new Response("Not Found", { status: 404 });
  }

  try {
    const client = getS3Client();
    const bucket = process.env.AWS_S3_BUCKET!;
    const key = `uploads/blogs/${filename}`;

    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key
    });

    const response = await client.send(command);
    if (!response.Body) {
      return new Response("Not Found", { status: 404 });
    }

    const stream = response.Body.transformToWebStream();
    const contentType = response.ContentType || "application/octet-stream";

    const headers = new Headers();
    headers.set("Content-Type", contentType);
    if (response.CacheControl) {
      headers.set("Cache-Control", response.CacheControl);
    } else {
      headers.set("Cache-Control", "public, max-age=31536000, immutable");
    }

    return new Response(stream, {
      headers
    });
  } catch (error: any) {
    if (
      error.name === "NoSuchKey" ||
      error.name === "NotFound" ||
      error.$metadata?.httpStatusCode === 404
    ) {
      return new Response("Not Found", { status: 404 });
    }
    console.error("Error proxying S3 image:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
