import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/admin-auth";
import { deleteBlog, readBlogBySlug, updateBlog, validateBlogInput } from "@/lib/blog-storage";
import { notifySubscribers } from "@/lib/email-notifier";

async function isAdminRequest(request: Request): Promise<boolean> {
  const token = request.headers.get("cookie")
    ?.split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${ADMIN_SESSION_COOKIE}=`))
    ?.split("=")[1];

  return verifyAdminSessionToken(token);
}

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }): Promise<NextResponse> {
  const { slug } = await params;
  const blog = await readBlogBySlug(slug);

  if (!blog) {
    return NextResponse.json({ error: "Blog not found." }, { status: 404 });
  }

  if (blog.status === "draft" && !(await isAdminRequest(request))) {
    return NextResponse.json({ error: "Blog not found." }, { status: 404 });
  }

  return NextResponse.json({ blog });
}

export async function PUT(request: Request, { params }: { params: Promise<{ slug: string }> }): Promise<NextResponse> {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;

  try {
    const body = await request.json();
    const errors = validateBlogInput(body);

    if (errors.length > 0) {
      return NextResponse.json({ error: errors[0], errors }, { status: 400 });
    }

    const existing = await readBlogBySlug(slug);

    const blog = await updateBlog(slug, {
      title: body.title,
      slug: body.slug,
      coverImage: body.coverImage,
      tags: body.tags,
      excerpt: body.excerpt,
      content: body.content,
      publishedAt: body.publishedAt,
      updatedAt: body.updatedAt,
      status: body.status
    });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found." }, { status: 404 });
    }

    revalidatePath("/blogs");
    revalidatePath(`/blogs/${slug}`);
    revalidatePath(`/blogs/${blog.slug}`);
    revalidatePath("/admin/dashboard");

    if (existing && existing.status === "draft" && blog.status === "published") {
      await notifySubscribers(blog);
    }

    return NextResponse.json({ blog });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to update blog." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ slug: string }> }): Promise<NextResponse> {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const deleted = await deleteBlog(slug);

  if (!deleted) {
    return NextResponse.json({ error: "Blog not found." }, { status: 404 });
  }

  revalidatePath("/blogs");
  revalidatePath(`/blogs/${slug}`);
  revalidatePath("/admin/dashboard");

  return NextResponse.json({ ok: true });
}