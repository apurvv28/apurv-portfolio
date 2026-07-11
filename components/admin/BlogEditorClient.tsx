"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CloudUpload, LoaderCircle, Plus, X, Upload } from "lucide-react";
import Toast from "@/components/ui/Toast";
import { cn } from "@/lib/utils";
import type { BlogRecord, BlogStatus } from "@/lib/blog-storage";

type BlogEditorClientProps = {
  mode: "create" | "edit";
  initialBlog?: Partial<BlogRecord>;
};

type BlogFormState = {
  title: string;
  slug: string;
  coverImage: string;
  tags: string[];
  tagInput: string;
  excerpt: string;
  content: string;
  status: BlogStatus;
};

const AUTOSAVE_PREFIX = "portfolio-blog-draft";

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function formatClock(date = new Date()): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function parseMarkdownFile(fileContent: string) {
  // strip UTF-8 BOM if present
  const cleanContent = fileContent.replace(/^\uFEFF/, "");
  const match = cleanContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    const lines = cleanContent.split(/\r?\n/);
    const titleLine = lines.find((line) => line.startsWith("# "));
    const title = titleLine ? titleLine.replace(/^#\s+/, "").trim() : "";
    return {
      frontmatter: { title },
      content: cleanContent.trim()
    };
  }

  const yamlBlock = match[1];
  const content = match[2].trim();
  const frontmatter: Record<string, any> = {};

  const lines = yamlBlock.split(/\r?\n/);
  let currentKey: string | null = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith("-") && currentKey) {
      const val = trimmed.slice(1).trim().replace(/^['"]|['"]$/g, "");
      if (Array.isArray(frontmatter[currentKey])) {
        frontmatter[currentKey].push(val);
      } else {
        frontmatter[currentKey] = [val];
      }
      continue;
    }

    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    let val = line.slice(colonIndex + 1).trim();

    currentKey = key;

    if (val === "") {
      if (key === "tags") {
        frontmatter[key] = [];
      }
    } else {
      if (key === "tags") {
        if (val.startsWith("[") && val.endsWith("]")) {
          frontmatter[key] = val
            .slice(1, -1)
            .split(",")
            .map((t) => t.trim().replace(/^['"]|['"]$/g, ""))
            .filter(Boolean);
        } else {
          frontmatter[key] = val
            .split(",")
            .map((t) => t.trim().replace(/^['"]|['"]$/g, ""))
            .filter(Boolean);
        }
      } else {
        val = val.replace(/^['"]|['"]$/g, "");
        frontmatter[key] = val;
      }
    }
  }

  return { frontmatter, content };
}

function MermaidCode({ code }: { code: string }) {
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const render = async () => {
      try {
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
        const id = `mermaid-svg-${Math.random().toString(36).substring(2, 9)}`;
        const { svg: renderedSvg } = await mermaid.render(id, code);
        if (active) {
          setSvg(renderedSvg);
          setError(null);
        }
      } catch (err: any) {
        console.error("Mermaid parsing error:", err);
        if (active) {
          setError(err?.message || "Invalid Mermaid syntax");
        }
      }
    };

    render();
    return () => {
      active = false;
    };
  }, [code]);

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 font-mono text-xs text-red-400 my-4">
        <p className="font-semibold">Mermaid Render Error:</p>
        <p className="mt-1 whitespace-pre-wrap">{error}</p>
      </div>
    );
  }

  if (!svg) {
    return (
      <div className="flex h-20 items-center justify-center font-mono text-xs text-foreground-muted animate-pulse my-4 rounded-xl bg-surface-secondary/40 border border-white/5">
        Rendering diagram...
      </div>
    );
  }

  return (
    <div
      className="mermaid-render flex justify-center my-6 overflow-x-auto p-4 rounded-xl bg-surface-secondary/40 border border-white/5"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

export default function BlogEditorClient({ mode, initialBlog }: BlogEditorClientProps): JSX.Element {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mdFileInputRef = useRef<HTMLInputElement>(null);
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error"; visible: boolean }>({
    message: "",
    type: "success",
    visible: false
  });
  const [savedAt, setSavedAt] = useState<string | null>(null);

  const [form, setForm] = useState<BlogFormState>(() => ({
    title: initialBlog?.title ?? "",
    slug: initialBlog?.slug ?? "",
    coverImage: initialBlog?.coverImage ?? "/images/magic-object.png",
    tags: initialBlog?.tags ?? [],
    tagInput: "",
    excerpt: initialBlog?.excerpt ?? "",
    content: initialBlog?.content ?? "",
    status: initialBlog?.status ?? "draft"
  }));

  const autosaveKey = useMemo(() => `${AUTOSAVE_PREFIX}:${mode}:${initialBlog?.slug ?? "new"}`, [mode, initialBlog?.slug]);

  useEffect(() => {
    const raw = localStorage.getItem(autosaveKey);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as Partial<BlogFormState>;
        setForm((current) => ({
          ...current,
          ...parsed,
          tagInput: "",
          tags: parsed.tags ?? current.tags
        }));
      } catch {
        // ignore stale drafts
      }
    }
  }, [autosaveKey]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      localStorage.setItem(autosaveKey, JSON.stringify(form));
      setSavedAt(formatClock());
    }, 10000);

    return () => window.clearInterval(timer);
  }, [autosaveKey, form]);

  const setField = <K extends keyof BlogFormState>(key: K, value: BlogFormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const addTag = () => {
    const nextTag = form.tagInput.trim();
    if (!nextTag) return;
    setForm((current) => ({
      ...current,
      tags: Array.from(new Set([...current.tags, nextTag])),
      tagInput: ""
    }));
  };

  const removeTag = (tag: string) => {
    setForm((current) => ({
      ...current,
      tags: current.tags.filter((item) => item !== tag)
    }));
  };

  const uploadCover = async (file: File) => {
    const data = new FormData();
    data.append("file", file);

    const response = await fetch("/api/blogs/upload", { method: "POST", body: data });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || "Upload failed.");
    setField("coverImage", payload.url as string);
  };

  const handleCoverUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      await uploadCover(file);
      setToast({
        message: "Cover image uploaded successfully.",
        type: "success",
        visible: true
      });
    } catch (error) {
      setToast({
        message: error instanceof Error ? error.message : "Failed to upload cover image.",
        type: "error",
        visible: true
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMdImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    event.target.value = "";

    const isFormDirty = form.title || form.excerpt || form.content;
    if (isFormDirty) {
      const confirmOverwrite = window.confirm("Importing a markdown file will overwrite your current changes. Do you want to proceed?");
      if (!confirmOverwrite) return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      if (typeof text !== "string") return;

      try {
        const { frontmatter, content } = parseMarkdownFile(text);

        const title = frontmatter.title || "";
        const slug = frontmatter.slug || slugify(title);
        const excerpt = frontmatter.excerpt || content.slice(0, 160).replace(/[\*_>#-]/g, " ").trim();
        let coverImage = frontmatter.coverImage || "/images/magic-object.png";
        if (coverImage && !coverImage.startsWith("/") && !coverImage.startsWith("http://") && !coverImage.startsWith("https://")) {
          coverImage = "/" + coverImage;
        }
        const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags : [];
        const status = (frontmatter.status === "published" || frontmatter.status === "draft") ? frontmatter.status : "draft";

        setForm({
          title,
          slug,
          coverImage,
          tags,
          tagInput: "",
          excerpt,
          content,
          status
        });

        if (frontmatter.slug) {
          setSlugTouched(true);
        }

        setToast({
          message: `Successfully imported "${file.name}"`,
          type: "success",
          visible: true
        });
      } catch (error) {
        setToast({
          message: `Failed to parse file: ${error instanceof Error ? error.message : "Invalid format"}`,
          type: "error",
          visible: true
        });
      }
    };

    reader.onerror = () => {
      setToast({
        message: "Failed to read file.",
        type: "error",
        visible: true
      });
    };

    reader.readAsText(file);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const payload = {
        title: form.title,
        slug: form.slug,
        coverImage: form.coverImage,
        tags: form.tags,
        excerpt: form.excerpt,
        content: form.content,
        status: form.status,
        updatedAt: new Date().toISOString(),
        publishedAt: initialBlog?.publishedAt ?? new Date().toISOString()
      };

      const endpoint = mode === "create" ? "/api/blogs" : `/api/blogs/${initialBlog?.slug}`;
      const response = await fetch(endpoint, {
        method: mode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to save blog.");

      localStorage.removeItem(autosaveKey);
      setToast({ message: "Blog saved successfully.", type: "success", visible: true });

      const savedBlog = result.blog as BlogRecord;
      if (mode === "create") {
        router.replace(`/admin/dashboard/edit/${savedBlog.slug}`);
      } else if (savedBlog.slug !== initialBlog?.slug) {
        router.replace(`/admin/dashboard/edit/${savedBlog.slug}`);
      } else {
        router.refresh();
      }
    } catch (error) {
      setToast({
        message: error instanceof Error ? error.message : "Unable to save blog.",
        type: "error",
        visible: true
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="glass-panel rounded-[2rem] p-6 sm:p-8">
      <input
        ref={mdFileInputRef}
        type="file"
        accept=".md"
        onChange={handleMdImport}
        className="hidden"
      />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-foreground-subtle">Blog Editor</p>
          <h2 className="mt-2 font-heading text-2xl text-foreground sm:text-3xl">{mode === "create" ? "New Blog" : "Edit Blog"}</h2>
        </div>
        <Link href="/admin/dashboard" className="font-mono text-xs uppercase tracking-[0.22em] text-foreground-muted hover:text-foreground">
          Back to dashboard
        </Link>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-4">
          <label className="block space-y-2">
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-foreground-subtle">Title</span>
            <input value={form.title} onChange={(event) => {
              const nextTitle = event.target.value;
              setField("title", nextTitle);
              if (!slugTouched) setField("slug", slugify(nextTitle));
            }} className="neu-pressed w-full rounded-2xl px-4 py-3 text-sm text-foreground outline-none" placeholder="Enter a blog title" />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block space-y-2">
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-foreground-subtle">Slug</span>
              <input value={form.slug} onChange={(event) => { setSlugTouched(true); setField("slug", slugify(event.target.value)); }} className="neu-pressed w-full rounded-2xl px-4 py-3 text-sm text-foreground outline-none" placeholder="auto-generated-slug" />
            </label>
            <label className="block space-y-2">
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-foreground-subtle">Status</span>
              <button type="button" onClick={() => setField("status", form.status === "draft" ? "published" : "draft")} className="neu-raised flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm text-foreground">
                <span>{form.status === "draft" ? "Draft" : "Published"}</span>
                <span className={cn("inline-flex h-5 w-9 items-center rounded-full p-0.5", form.status === "draft" ? "bg-surface-mid" : "bg-foreground") }>
                  <span className={cn("h-4 w-4 rounded-full bg-surface-base transition-transform", form.status === "published" && "translate-x-4")} />
                </span>
              </button>
            </label>
          </div>

          <div className="block space-y-2">
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-foreground-subtle">Cover Image</span>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
            <button type="button" onClick={(e) => { e.preventDefault(); fileInputRef.current?.click(); }} className="glass-panel flex w-full flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-[var(--glass-border-strong)] px-6 py-8 text-center text-sm text-foreground-muted w-full cursor-pointer">
              <CloudUpload className="h-7 w-7" />
              <span>Drop image here or browse</span>
              {form.coverImage ? <img src={form.coverImage} alt="Cover preview" className="mt-2 h-28 w-full rounded-2xl object-cover" /> : null}
            </button>
          </div>

          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-foreground-subtle">Tags</span>
            <div className="neu-pressed rounded-2xl px-4 py-3">
              <div className="flex flex-wrap gap-2">
                {form.tags.map((tag) => (
                  <button key={tag} type="button" onClick={() => removeTag(tag)} className="neu-flat inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-foreground">
                    {tag}
                    <X className="h-3 w-3" />
                  </button>
                ))}
                <input value={form.tagInput} onChange={(event) => setField("tagInput", event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); addTag(); } }} placeholder="Type and press Enter" className="min-w-[10rem] flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-foreground-subtle" />
              </div>
            </div>
          </div>

          <label className="block space-y-2">
            <span className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.22em] text-foreground-subtle">
              Excerpt <span>{form.excerpt.length}/240</span>
            </span>
            <textarea value={form.excerpt} onChange={(event) => setField("excerpt", event.target.value)} rows={4} className="neu-pressed w-full rounded-2xl px-4 py-3 text-sm text-foreground outline-none" placeholder="Short summary for cards and metadata" />
          </label>

          <label className="block space-y-2">
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-foreground-subtle">Content</span>
            <textarea value={form.content} onChange={(event) => setField("content", event.target.value)} rows={14} className="neu-pressed w-full rounded-3xl px-4 py-4 font-mono text-sm text-foreground outline-none" placeholder="# Write your markdown here" />
          </label>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-caption uppercase tracking-[0.18em] text-foreground-subtle">
              {savedAt ? `Draft saved locally at ${savedAt}` : "Autosaves every 10 seconds"}
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => mdFileInputRef.current?.click()}
                className="neu-raised inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 font-mono text-xs uppercase tracking-[0.24em] text-foreground cursor-pointer"
              >
                <Upload className="h-4 w-4" />
                Import .md
              </button>
              <button type="button" onClick={handleSave} disabled={loading} className="neu-raised inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 font-mono text-xs uppercase tracking-[0.24em] text-foreground disabled:opacity-60">
                {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                Save Blog
              </button>
            </div>
          </div>
        </div>

        <div className="glass-panel-strong rounded-[2rem] p-5">
          <div className="flex items-center justify-between">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-foreground-subtle">Live Preview</p>
            <span className="font-mono text-caption uppercase tracking-[0.18em] text-foreground-subtle">{form.status}</span>
          </div>
          <div className="blog-preview mt-4 rounded-3xl border border-[var(--glass-border)] bg-surface-secondary p-5">
            <h3 className="font-heading text-2xl text-foreground">{form.title || "Untitled transmission"}</h3>
            <p className="mt-2 text-sm text-foreground-muted">{form.excerpt || "Your excerpt will appear here."}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {form.tags.map((tag) => <span key={tag} className="neu-flat rounded-full px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-foreground">{tag}</span>)}
            </div>
            <div className="blog-preview-content mt-6">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code(props) {
                    const { node, className, children, ...rest } = props;
                    const match = /language-mermaid/.exec(className || "");
                    return match ? (
                      <MermaidCode code={String(children).replace(/\n$/, "")} />
                    ) : (
                      <code className={className} {...rest}>
                        {children}
                      </code>
                    );
                  }
                }}
              >
                {form.content || "Start writing markdown to see the live preview."}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>

      <Toast message={toast.message} type={toast.type} visible={toast.visible} onDismiss={() => setToast((current) => ({ ...current, visible: false }))} />
    </section>
  );
}