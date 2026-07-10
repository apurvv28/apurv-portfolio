import { NextResponse } from "next/server";
import { incrementBlogReads } from "@/lib/blog-reads";
import { readBlogBySlug } from "@/lib/blog-storage";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
): Promise<NextResponse> {
  try {
    const { slug } = await params;

    // Verify that the blog exists before incrementing reads
    const blog = await readBlogBySlug(slug);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found." }, { status: 404 });
    }

    const count = await incrementBlogReads(slug);
    return NextResponse.json({ ok: true, reads: count });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to record read." },
      { status: 500 }
    );
  }
}
