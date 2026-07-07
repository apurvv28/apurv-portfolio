import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/admin-auth";
import { createBlog, listBlogs, validateBlogInput } from "@/lib/blog-storage";
import { notifySubscribers } from "@/lib/email-notifier";

async function isAdminRequest(request: Request): Promise<boolean> {
  const token = request.headers.get("cookie")
    ?.split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${ADMIN_SESSION_COOKIE}=`))
    ?.split("=")[1];

  return verifyAdminSessionToken(token);
}

export async function GET(request: Request): Promise<NextResponse> {
  const url = new URL(request.url);
  const wantsAdmin = url.searchParams.get("admin") === "true";

  if (wantsAdmin && !(await isAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const blogs = await listBlogs({ includeDrafts: wantsAdmin });
  return NextResponse.json({ blogs });
}

export async function POST(request: Request): Promise<NextResponse> {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const errors = validateBlogInput(body);

    if (errors.length > 0) {
      return NextResponse.json({ error: errors[0], errors }, { status: 400 });
    }

    const blog = await createBlog({
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

    revalidatePath("/blogs");
    revalidatePath(`/blogs/${blog.slug}`);
    revalidatePath("/admin/dashboard");

    if (blog.status === "published") {
      await notifySubscribers(blog);
    }

    return NextResponse.json({ blog }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create blog." },
      { status: 500 }
    );
  }
}