import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
  HeadObjectCommand
} from "@aws-sdk/client-s3";

let s3Client: S3Client | null = null;

export function isS3Configured(): boolean {
  return !!(
    process.env.AWS_ACCESS_KEY_ID &&
    process.env.AWS_SECRET_ACCESS_KEY &&
    process.env.AWS_S3_BUCKET
  );
}

export function getS3Client(): S3Client {
  if (!s3Client) {
    if (!isS3Configured()) {
      throw new Error("AWS S3 environment variables are not fully configured.");
    }
    s3Client = new S3Client({
      region: process.env.AWS_REGION || "us-east-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
      }
    });
  }
  return s3Client;
}

export async function readS3Blog(slug: string): Promise<string | null> {
  const client = getS3Client();
  const bucket = process.env.AWS_S3_BUCKET!;
  try {
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: `blogs/${slug}.md`
    });
    const response = await client.send(command);
    if (!response.Body) return null;
    return await response.Body.transformToString();
  } catch (error: any) {
    if (error.name === "NoSuchKey") return null;
    throw error;
  }
}

export async function writeS3Blog(slug: string, content: string): Promise<void> {
  const client = getS3Client();
  const bucket = process.env.AWS_S3_BUCKET!;
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: `blogs/${slug}.md`,
    Body: content,
    ContentType: "text/markdown"
  });
  await client.send(command);
}

export async function deleteS3Blog(slug: string): Promise<boolean> {
  const client = getS3Client();
  const bucket = process.env.AWS_S3_BUCKET!;
  try {
    const headCommand = new HeadObjectCommand({
      Bucket: bucket,
      Key: `blogs/${slug}.md`
    });
    await client.send(headCommand);

    const deleteCommand = new DeleteObjectCommand({
      Bucket: bucket,
      Key: `blogs/${slug}.md`
    });
    await client.send(deleteCommand);
    return true;
  } catch (error: any) {
    if (error.name === "NotFound" || error.name === "NoSuchKey") return false;
    throw error;
  }
}

export async function listS3Blogs(): Promise<{ slug: string; content: string }[]> {
  const client = getS3Client();
  const bucket = process.env.AWS_S3_BUCKET!;
  const command = new ListObjectsV2Command({
    Bucket: bucket,
    Prefix: "blogs/"
  });
  const response = await client.send(command);
  const contents = response.Contents || [];

  const markdownKeys = contents
    .map((c) => c.Key!)
    .filter((key) => key.startsWith("blogs/") && key.endsWith(".md") && key !== "blogs/");

  const results = await Promise.all(
    markdownKeys.map(async (key) => {
      const slug = key.substring("blogs/".length, key.length - ".md".length);
      const getCmd = new GetObjectCommand({ Bucket: bucket, Key: key });
      const getResp = await client.send(getCmd);
      const content = getResp.Body ? await getResp.Body.transformToString() : "";
      return { slug, content };
    })
  );
  return results;
}

export async function uploadS3Image(
  filename: string,
  file: Buffer,
  contentType: string
): Promise<string> {
  const client = getS3Client();
  const bucket = process.env.AWS_S3_BUCKET!;
  const key = `uploads/blogs/${filename}`;
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: file,
    ContentType: contentType
  });
  await client.send(command);

  const region = process.env.AWS_REGION || "us-east-1";
  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
}
