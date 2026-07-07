"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, CheckCircle2, CircleDot, PencilLine, Plus, Trash2, RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import Toast from "@/components/ui/Toast";
import { cn } from "@/lib/utils";
import type { BlogRecord } from "@/lib/blog-storage";

type BlogAdminClientProps = {
  initialBlogs: BlogRecord[];
};

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

export default function BlogAdminClient({ initialBlogs }: BlogAdminClientProps): JSX.Element {
  const router = useRouter();
  const [blogs, setBlogs] = useState(initialBlogs);
  const [deleteSlug, setDeleteSlug] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error"; visible: boolean }>({
    message: "",
    type: "success",
    visible: false
  });

  const selectedBlog = useMemo(() => blogs.find((blog) => blog.slug === deleteSlug) ?? null, [blogs, deleteSlug]);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type, visible: true });
    window.setTimeout(() => setToast((current) => ({ ...current, visible: false })), 2200);
  };

  const mutateBlog = async (slug: string, payload: Record<string, unknown>) => {
    const response = await fetch(`/api/blogs/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to update blog.");
    return data.blog as BlogRecord;
  };

  const handleToggleStatus = async (blog: BlogRecord) => {
    try {
      const nextStatus = blog.status === "published" ? "draft" : "published";
      const updated = await mutateBlog(blog.slug, {
        title: blog.title,
        slug: blog.slug,
        coverImage: blog.coverImage,
        tags: blog.tags,
        excerpt: blog.excerpt,
        content: blog.content,
        publishedAt: blog.publishedAt,
        updatedAt: new Date().toISOString(),
        status: nextStatus
      });
      setBlogs((current) => current.map((item) => (item.slug === blog.slug ? updated : item)));
      showToast(`${updated.title} updated to ${updated.status}.`, "success");
      router.refresh();
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Unable to update blog.", "error");
    }
  };

  const handleDelete = async () => {
    if (!deleteSlug) return;

    try {
      const response = await fetch(`/api/blogs/${deleteSlug}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to delete blog.");

      setBlogs((current) => current.filter((item) => item.slug !== deleteSlug));
      showToast("Blog deleted.", "success");
      setDeleteSlug(null);
      router.refresh();
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Unable to delete blog.", "error");
    }
  };

  return (
    <section className="glass-panel rounded-[2rem] p-6 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-foreground-subtle">Mission Control</p>
          <h2 className="mt-2 font-heading text-2xl text-foreground sm:text-3xl">Blogs</h2>
        </div>
        <Link href="/admin/dashboard/new" className="neu-raised inline-flex items-center gap-2 rounded-2xl px-4 py-3 font-mono text-xs uppercase tracking-[0.22em] text-foreground transition-transform hover:-translate-y-0.5">
          <Plus className="h-4 w-4" />
          New Blog
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {blogs.length === 0 ? (
          <div className="neu-flat rounded-3xl p-8 text-center">
            <p className="font-heading text-xl text-foreground">No transmissions yet.</p>
            <p className="mt-2 text-sm text-foreground-muted">Create the first blog entry to populate this dashboard.</p>
          </div>
        ) : (
          blogs.map((blog) => (
            <motion.article
              key={blog.slug}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel-strong rounded-3xl border border-[var(--glass-border)] p-4 sm:p-5"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="truncate font-heading text-xl text-foreground">{blog.title}</h3>
                    <span className={cn(
                      "inline-flex items-center gap-1 rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em]",
                      blog.status === "published"
                        ? "border-[var(--glass-border-strong)] text-foreground"
                        : "border-[var(--glass-border)] text-foreground-muted"
                    )}>
                      {blog.status === "published" ? <CheckCircle2 className="h-3.5 w-3.5" /> : <CircleDot className="h-3.5 w-3.5" />}
                      {blog.status === "published" ? "Published" : "Draft"}
                    </span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm text-foreground-muted">{blog.excerpt}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-caption text-foreground-subtle">
                    <span className="inline-flex items-center gap-1 font-mono uppercase tracking-[0.16em]"><CalendarDays className="h-3.5 w-3.5" /> {formatDate(blog.updatedAt)}</span>
                    <span className="font-mono uppercase tracking-[0.16em]">/{blog.slug}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Link href={`/admin/dashboard/edit/${blog.slug}`} className="neu-raised inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-sm text-foreground transition-transform hover:-translate-y-0.5">
                    <PencilLine className="h-4 w-4" />
                    Edit
                  </Link>
                  <button type="button" onClick={() => handleToggleStatus(blog)} className="neu-raised inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-sm text-foreground transition-transform hover:-translate-y-0.5">
                    <RefreshCcw className="h-4 w-4" />
                    Toggle
                  </button>
                  <button type="button" onClick={() => setDeleteSlug(blog.slug)} className="neu-raised inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-sm text-foreground transition-transform hover:-translate-y-0.5">
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </div>
              </div>
            </motion.article>
          ))
        )}
      </div>

      <AnimatePresence>
        {deleteSlug && selectedBlog ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: 20, scale: 0.96 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 12, scale: 0.98 }}
              className="glass-panel w-full max-w-md rounded-[2rem] p-6"
            >
              <p className="font-mono text-caption uppercase tracking-[0.24em] text-foreground-subtle">Confirm Deletion</p>
              <h3 className="mt-3 font-heading text-2xl text-foreground">Delete {selectedBlog.title}?</h3>
              <p className="mt-3 text-sm text-foreground-muted">This blog will be permanently removed from the collection.</p>
              <div className="mt-6 flex justify-end gap-3">
                <button type="button" onClick={() => setDeleteSlug(null)} className="neu-flat rounded-2xl px-4 py-3 font-mono text-xs uppercase tracking-[0.2em] text-foreground-muted">
                  Cancel
                </button>
                <button type="button" onClick={handleDelete} className="neu-raised rounded-2xl px-4 py-3 font-mono text-xs uppercase tracking-[0.2em] text-foreground">
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onDismiss={() => setToast((current) => ({ ...current, visible: false }))}
      />
    </section>
  );
}