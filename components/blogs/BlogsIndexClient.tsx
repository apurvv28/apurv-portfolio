"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Search, Satellite, ChevronDown, BookOpen } from "lucide-react";
import type { BlogSummary } from "@/lib/blog-storage";

type BlogsIndexClientProps = { blogs: BlogSummary[] };

const PAGE_SIZE = 6;

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function BlogsIndexClient({ blogs }: BlogsIndexClientProps): JSX.Element {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [queryInput, setQueryInput] = useState("");
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState<{ message: string; type: "success" | "error" }>({
    message: "",
    type: "success"
  });

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscribeEmail) return;

    setSubmitting(true);
    setSubscribeStatus({ message: "", type: "success" });

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: subscribeEmail })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe.");
      }

      setSubscribeStatus({ message: data.message || "Subscribed successfully!", type: "success" });
      setSubscribeEmail("");
    } catch (error: any) {
      setSubscribeStatus({ message: error.message || "Failed to subscribe.", type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => setQuery(queryInput.trim().toLowerCase()), 250);
    return () => window.clearTimeout(timer);
  }, [queryInput]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [query, selectedTags, sortOrder]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisibleCount((current) => current + PAGE_SIZE);
      },
      { rootMargin: "200px" }
    );

    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, []);

  const allTags = useMemo(
    () => Array.from(new Set(blogs.flatMap((blog) => blog.tags))).sort((a, b) => a.localeCompare(b)),
    [blogs]
  );

  const filteredBlogs = useMemo(() => {
    const filtered = blogs.filter((blog) => {
      const matchesQuery = !query || blog.title.toLowerCase().includes(query) || blog.tags.some((tag) => tag.toLowerCase().includes(query));
      const matchesTags = selectedTags.length === 0 || selectedTags.every((tag) => blog.tags.includes(tag));
      return matchesQuery && matchesTags;
    });

    return [...filtered].sort((left, right) => {
      const leftDate = new Date(left.publishedAt).getTime();
      const rightDate = new Date(right.publishedAt).getTime();
      return sortOrder === "newest" ? rightDate - leftDate : leftDate - rightDate;
    });
  }, [blogs, query, selectedTags, sortOrder]);

  const visibleBlogs = filteredBlogs.slice(0, visibleCount);

  return (
    <main className="min-h-screen px-4 pb-20 pt-32 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <section className="glass-panel rounded-[2rem] p-6 sm:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-foreground-subtle">// TRANSMISSIONS LOG</p>
          <h1 className="mt-3 font-heading text-4xl text-foreground sm:text-5xl">Blogs</h1>
          <p className="mt-3 max-w-2xl text-sm text-foreground-muted sm:text-base">Notes, breakdowns, and field reports from the build process.</p>

          <div className="mt-6 border-t border-[var(--glass-border)] pt-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-foreground-subtle">Subscribe to updates</p>
            <form onSubmit={handleSubscribe} className="mt-3 flex flex-col gap-3 sm:flex-row max-w-md">
              <label className="neu-pressed flex flex-1 items-center gap-3 rounded-2xl px-4 py-2.5">
                <input
                  type="email"
                  required
                  value={subscribeEmail}
                  onChange={(event) => setSubscribeEmail(event.target.value)}
                  className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-foreground-subtle"
                  placeholder="Enter your email address"
                />
              </label>
              <button
                type="submit"
                disabled={submitting}
                className="neu-raised rounded-2xl px-5 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-foreground hover:-translate-y-0.5 disabled:opacity-50"
              >
                {submitting ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
            {subscribeStatus.message && (
              <p className={`mt-2 text-xs font-mono ${subscribeStatus.type === "success" ? "text-green-400" : "text-red-400"}`}>
                {subscribeStatus.message}
              </p>
            )}
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_auto_auto]">
            <label className="neu-pressed flex items-center gap-3 rounded-2xl px-4 py-3">
              <Search className="h-4 w-4 text-foreground-muted" />
              <input value={queryInput} onChange={(event) => setQueryInput(event.target.value)} className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-foreground-subtle" placeholder="Search by title or tags" />
            </label>
            <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value as "newest" | "oldest")} className="neu-pressed rounded-2xl px-4 py-3 text-sm text-foreground outline-none">
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
            <div className="neu-flat inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm text-foreground-muted">
              <BookOpen className="h-4 w-4" /> {filteredBlogs.length} transmissions
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {allTags.map((tag) => {
              const active = selectedTags.includes(tag);
              return (
                <button key={tag} type="button" onClick={() => setSelectedTags((current) => active ? current.filter((item) => item !== tag) : [...current, tag])} className={"rounded-full px-4 py-2 text-xs uppercase tracking-[0.18em] transition-all " + (active ? "neu-raised text-foreground" : "neu-flat text-foreground-muted") }>
                  {tag}
                </button>
              );
            })}
          </div>
        </section>

        {visibleBlogs.length === 0 ? (
          <section className="glass-panel rounded-[2rem] p-10 text-center">
            <Satellite className="mx-auto h-10 w-10 text-foreground-muted" />
            <h2 className="mt-4 font-heading text-2xl text-foreground">No transmissions found in this sector</h2>
            <p className="mt-2 text-sm text-foreground-muted">Try clearing filters or searching a different keyword.</p>
          </section>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visibleBlogs.map((blog) => (
                <motion.article key={blog.slug} layout initial={reducedMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="glass-panel-strong group overflow-hidden rounded-[2rem] border border-[var(--glass-border)]">
                  <Link href={`/blogs/${blog.slug}`} className="block h-full">
                    <div className="relative h-56 overflow-hidden">
                      <img src={blog.coverImage} alt={blog.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between text-caption text-foreground-subtle">
                        <span className="font-mono uppercase tracking-[0.18em]">{formatDate(blog.publishedAt)}</span>
                        <span className="font-mono uppercase tracking-[0.18em]">{blog.readTimeMinutes} min read</span>
                      </div>
                      <h2 className="mt-3 font-heading text-2xl text-foreground">{blog.title}</h2>
                      <p className="mt-2 line-clamp-3 text-sm text-foreground-muted">{blog.excerpt}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {blog.tags.map((tag) => <span key={tag} className="neu-flat rounded-full px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-foreground-muted">{tag}</span>)}
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}

        {visibleCount < filteredBlogs.length ? (
          <div ref={sentinelRef} className="mt-2 flex items-center justify-center gap-3 py-10 text-sm text-foreground-muted">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.4, ease: "linear" }}>
              <Satellite className="h-5 w-5" />
            </motion.div>
            Loading more transmissions...
            <ChevronDown className="h-4 w-4" />
          </div>
        ) : null}
      </div>
    </main>
  );
}