import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { listPublishedBlogs, readBlogBySlug, getRelatedBlogs } from "@/lib/blog-storage";
import BlogPostClient from "@/components/blogs/BlogPostClient";

type PageProps = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await readBlogBySlug(slug);

  if (!blog || blog.status !== "published") {
    return {
      title: "Transmission lost in deep space",
      description: "The requested transmission could not be located."
    };
  }

  return {
    title: blog.title,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: "article",
      images: [{ url: blog.coverImage }]
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt
    }
  };
}

export default async function BlogPostPage({ params }: PageProps): Promise<JSX.Element> {
  const { slug } = await params;
  const blog = await readBlogBySlug(slug);

  if (!blog || blog.status !== "published") notFound();

  const related = getRelatedBlogs(await listPublishedBlogs(), blog.slug, blog.tags, 3);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt,
    datePublished: blog.publishedAt,
    dateModified: blog.updatedAt,
    image: [blog.coverImage],
    author: {
      "@type": "Person",
      name: "Apurv Saktepar"
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <BlogPostClient blog={blog} related={related} />
    </>
  );
}