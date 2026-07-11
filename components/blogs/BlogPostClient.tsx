"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Copy, Share2, ArrowLeft, Eye } from "lucide-react";
import type { BlogRecord, BlogSummary } from "@/lib/blog-storage";

type BlogPostClientProps = {
  blog: BlogRecord;
  related: BlogSummary[];
};

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogPostClient({ blog, related }: BlogPostClientProps): JSX.Element {
  const [progress, setProgress] = useState(0);
  const [readCount, setReadCount] = useState(blog.reads ?? 0);

  useEffect(() => {
    let mounted = true;

    const recordRead = async () => {
      try {
        const viewedKey = `read_blog_${blog.slug}`;
        if (sessionStorage.getItem(viewedKey)) {
          return;
        }

        const response = await fetch(`/api/blogs/${blog.slug}/read`, {
          method: "POST",
        });
        if (response.ok) {
          const data = await response.json();
          if (mounted && typeof data.reads === "number") {
            setReadCount(data.reads);
            sessionStorage.setItem(viewedKey, "true");
          }
        }
      } catch (error) {
        console.error("Failed to record read:", error);
      }
    };

    recordRead();

    return () => {
      mounted = false;
    };
  }, [blog.slug]);

  useEffect(() => {
    const renderMermaid = async () => {
      try {
        const mermaidElements = document.querySelectorAll("pre code.language-mermaid");
        if (mermaidElements.length === 0) return;

        const mermaid = (await import("mermaid")).default;
        const isDark = document.documentElement.classList.contains("dark") || 
                       (!document.documentElement.classList.contains("light") && 
                        (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches));
        mermaid.initialize({
          startOnLoad: false,
          theme: isDark ? "dark" : "default",
          securityLevel: "loose",
          themeVariables: {
            background: "transparent",
          }
        });

        mermaidElements.forEach((codeEl, index) => {
          const preEl = codeEl.parentElement;
          if (!preEl) return;

          const container = document.createElement("div");
          container.className = "mermaid flex justify-center my-6 p-4 rounded-xl bg-surface-secondary/40 border border-white/5 overflow-x-auto";
          container.id = `mermaid-${index}`;
          container.textContent = codeEl.textContent;

          preEl.parentNode?.replaceChild(container, preEl);
        });

        await mermaid.run();
      } catch (error) {
        console.error("Failed to render Mermaid diagrams:", error);
      }
    };

    renderMermaid();
  }, [blog.html]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min(100, (scrollTop / total) * 100) : 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
  };

  const share = async () => {
    if (navigator.share) {
      await navigator.share({ title: blog.title, text: blog.excerpt, url: window.location.href });
      return;
    }
    await copyLink();
  };

  return (
    <main className="min-h-screen pb-20 pt-24 sm:pt-28">
      <div className="fixed left-0 top-0 z-50 h-1 w-full bg-transparent">
        <motion.div className="h-full bg-gradient-to-r from-white/20 via-white/80 to-white/20" style={{ width: `${progress}%` }} />
      </div>

      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <img src={blog.coverImage} alt={blog.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/55 to-black/85" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-5xl px-4 pb-10 sm:px-6 lg:px-8">
            <div className="glass-panel-strong dark:bg-black/40 max-w-3xl rounded-[2rem] p-6 sm:p-8">
              <Link href="/blogs" className="inline-flex items-center gap-2 font-mono text-caption uppercase tracking-[0.22em] text-foreground-muted hover:text-foreground">
                <ArrowLeft className="h-4 w-4" /> Back to blogs
              </Link>
              <h1 className="mt-4 font-heading text-4xl text-foreground sm:text-5xl">{blog.title}</h1>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-foreground-muted">
                <span>{formatDate(blog.publishedAt)}</span>
                <span>•</span>
                <span>{blog.readTimeMinutes} min read</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1.5">
                  <Eye className="h-4 w-4" />
                  {readCount} {readCount === 1 ? "read" : "reads"}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {blog.tags.map((tag) => <span key={tag} className="neu-flat rounded-full px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-foreground">{tag}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <article className="mx-auto mt-12 w-full max-w-[740px] px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end gap-2">
          <button type="button" onClick={copyLink} className="neu-raised inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm text-foreground">
            <Copy className="h-4 w-4" /> Copy link
          </button>
          <button type="button" onClick={share} className="neu-raised inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm text-foreground">
            <Share2 className="h-4 w-4" /> Share
          </button>
        </div>

        <div className="blog-content glass-panel mt-6 rounded-[2rem] p-6 sm:p-8" dangerouslySetInnerHTML={{ __html: blog.html }} />
      </article>

      {related.length > 0 ? (
        <section className="mx-auto mt-14 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-foreground-subtle">Related Transmissions</p>
          <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {related.map((item) => (
              <Link key={item.slug} href={`/blogs/${item.slug}`} className="glass-panel-strong rounded-[2rem] p-5 transition-transform hover:-translate-y-1">
                <img src={item.coverImage} alt={item.title} className="h-40 w-full rounded-2xl object-cover" />
                <h2 className="mt-4 font-heading text-2xl text-foreground">{item.title}</h2>
                <p className="mt-2 line-clamp-3 text-sm text-foreground-muted">{item.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}