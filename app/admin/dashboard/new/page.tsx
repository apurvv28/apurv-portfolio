import type { Metadata } from "next";
import BlogEditorClient from "@/components/admin/BlogEditorClient";

export const metadata: Metadata = {
  title: "New Blog",
  robots: { index: false, follow: false, nocache: true }
};

export const dynamic = "force-dynamic";

export default function NewBlogPage(): JSX.Element {
  return <BlogEditorClient mode="create" />;
}