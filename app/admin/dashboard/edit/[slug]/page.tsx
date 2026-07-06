import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogEditorClient from "@/components/admin/BlogEditorClient";
import { readBlogBySlug } from "@/lib/blog-storage";

export const metadata: Metadata = {
  title: "Edit Blog",
  robots: { index: false, follow: false, nocache: true }
};

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ slug: string }> };

export default async function EditBlogPage({ params }: PageProps): Promise<JSX.Element> {
  const { slug } = await params;
  const blog = await readBlogBySlug(slug);
  if (!blog) notFound();

  return <BlogEditorClient mode="edit" initialBlog={blog} />;
}