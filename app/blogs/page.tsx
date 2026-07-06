import type { Metadata } from "next";
import { listPublishedBlogs } from "@/lib/blog-storage";
import BlogsIndexClient from "@/components/blogs/BlogsIndexClient";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Transmission logs, project breakdowns, and writing from Apurv Saktepar.",
  robots: { index: true, follow: true }
};

export const dynamic = "force-dynamic";

export default async function BlogsPage(): Promise<JSX.Element> {
  const blogs = await listPublishedBlogs();
  return <BlogsIndexClient blogs={blogs} />;
}