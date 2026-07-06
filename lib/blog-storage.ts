import fs from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

export type BlogStatus = "draft" | "published";

export type BlogFrontmatter = {
  title: string;
  slug: string;
  coverImage: string;
  tags: string[];
  excerpt: string;
  publishedAt: string;
  updatedAt: string;
  status: BlogStatus;
};

export type BlogRecord = BlogFrontmatter & {
  content: string;
  html: string;
  readTimeMinutes: number;
};

export type BlogSummary = Omit<BlogRecord, "content" | "html">;

export type BlogInput = {
  title?: string;
  slug?: string;
  coverImage?: string;
  tags?: string[];
  excerpt?: string;
  content?: string;
  publishedAt?: string;
  updatedAt?: string;
  status?: BlogStatus;
};

const BLOGS_DIR = path.join(process.cwd(), "content", "blogs");

function stripMarkdown(markdown: string): string {
  return markdown.replace(/```[\s\S]*?```/g, " ").replace(/`[^`]*`/g, " ").replace(/[\*_>#-]/g, " ");
}

function countWords(markdown: string): number {
  return stripMarkdown(markdown)
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function toSlugBase(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export function sanitizeTags(tags: unknown): string[] {
  if (!Array.isArray(tags)) return [];

  return Array.from(
    new Set(
      tags
        .map((tag) => String(tag).trim())
        .filter((tag) => /^[a-z0-9][a-z0-9\s-]{0,30}$/i.test(tag))
    )
  ).slice(0, 12);
}

export function validateBlogInput(input: BlogInput): string[] {
  const errors: string[] = [];
  const title = input.title?.trim() ?? "";
  const content = input.content?.trim() ?? "";

  if (!title) errors.push("Title is required.");
  if (content.length < 120) errors.push("Content must be at least 120 characters.");

  const tags = sanitizeTags(input.tags);
  if ((input.tags?.length ?? 0) > 0 && tags.length === 0) {
    errors.push("Tags must use simple letters, numbers, spaces, and hyphens.");
  }

  return errors;
}

async function ensureBlogDir(): Promise<void> {
  await fs.mkdir(BLOGS_DIR, { recursive: true });
}

function getBlogFilePath(slug: string): string {
  return path.join(BLOGS_DIR, `${slug}.md`);
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function generateUniqueSlug(baseTitle: string, excludeSlug?: string): Promise<string> {
  await ensureBlogDir();

  const baseSlug = toSlugBase(baseTitle) || `blog-${randomUUID().slice(0, 8)}`;
  let slug = baseSlug;
  let counter = 2;

  while (await fileExists(getBlogFilePath(slug)) && slug !== excludeSlug) {
    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }

  return slug;
}

function parseBlogMarkdown(fileContents: string): BlogRecord {
  const { data, content } = matter(fileContents);
  const frontmatter = data as Partial<BlogFrontmatter>;

  if (
    !frontmatter.title ||
    !frontmatter.slug ||
    !frontmatter.coverImage ||
    !frontmatter.excerpt ||
    !frontmatter.publishedAt ||
    !frontmatter.updatedAt ||
    !frontmatter.status
  ) {
    throw new Error("Invalid blog frontmatter.");
  }

  const normalizedTags = Array.isArray(frontmatter.tags) ? sanitizeTags(frontmatter.tags) : [];

  return {
    title: frontmatter.title,
    slug: frontmatter.slug,
    coverImage: frontmatter.coverImage,
    tags: normalizedTags,
    excerpt: frontmatter.excerpt,
    publishedAt: frontmatter.publishedAt,
    updatedAt: frontmatter.updatedAt,
    status: frontmatter.status,
    content: content.trim(),
    html: "",
    readTimeMinutes: Math.max(1, Math.ceil(countWords(content) / 200))
  };
}

async function renderMarkdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(remarkGfm).use(remarkHtml).process(markdown);
  return String(result);
}

export async function listBlogFiles(): Promise<string[]> {
  await ensureBlogDir();
  const entries = await fs.readdir(BLOGS_DIR);
  return entries.filter((entry) => entry.endsWith(".md")).map((entry) => path.join(BLOGS_DIR, entry));
}

export async function readBlogBySlug(slug: string): Promise<BlogRecord | null> {
  const filePath = getBlogFilePath(slug);

  if (!(await fileExists(filePath))) return null;

  const raw = await fs.readFile(filePath, "utf8");
  const parsed = parseBlogMarkdown(raw);
  parsed.html = await renderMarkdownToHtml(parsed.content);
  return parsed;
}

export async function listBlogs(options: { includeDrafts?: boolean } = {}): Promise<BlogSummary[]> {
  const records = await Promise.all(
    (await listBlogFiles()).map(async (filePath) => {
      const raw = await fs.readFile(filePath, "utf8");
      const blog = parseBlogMarkdown(raw);
      blog.html = await renderMarkdownToHtml(blog.content);
      return blog;
    })
  );

  const filtered = options.includeDrafts ? records : records.filter((blog) => blog.status === "published");

  return filtered
    .sort((left, right) => new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime())
    .map(({ content: _content, html: _html, ...summary }) => summary);
}

export async function listBlogRecords(options: { includeDrafts?: boolean } = {}): Promise<BlogRecord[]> {
  const records = await Promise.all(
    (await listBlogFiles()).map(async (filePath) => {
      const raw = await fs.readFile(filePath, "utf8");
      const blog = parseBlogMarkdown(raw);
      blog.html = await renderMarkdownToHtml(blog.content);
      return blog;
    })
  );

  return options.includeDrafts ? records : records.filter((blog) => blog.status === "published");
}

export async function listPublishedBlogs(): Promise<BlogSummary[]> {
  return listBlogs({ includeDrafts: false });
}

export function getRelatedBlogs(
  blogs: BlogSummary[],
  targetSlug: string,
  targetTags: string[],
  limit = 3
): BlogSummary[] {
  return blogs
    .filter((blog) => blog.slug !== targetSlug)
    .map((blog) => ({
      blog,
      score: blog.tags.reduce((total, tag) => total + (targetTags.includes(tag) ? 1 : 0), 0)
    }))
    .sort((left, right) => {
      if (right.score !== left.score) return right.score - left.score;
      return new Date(right.blog.updatedAt).getTime() - new Date(left.blog.updatedAt).getTime();
    })
    .slice(0, limit)
    .map(({ blog }) => blog);
}

function serializeBlog(blog: BlogRecord): string {
  const frontmatter: BlogFrontmatter = {
    title: blog.title,
    slug: blog.slug,
    coverImage: blog.coverImage,
    tags: blog.tags,
    excerpt: blog.excerpt,
    publishedAt: blog.publishedAt,
    updatedAt: blog.updatedAt,
    status: blog.status
  };

  return matter.stringify(blog.content.trim() + "\n", frontmatter);
}

export async function createBlog(input: Required<Pick<BlogInput, "title" | "content">> & BlogInput): Promise<BlogRecord> {
  await ensureBlogDir();

  const slug = await generateUniqueSlug(input.slug || input.title);
  const now = new Date().toISOString();
  const blog: BlogRecord = {
    title: input.title.trim(),
    slug,
    coverImage: input.coverImage?.trim() || "/images/magic-object.png",
    tags: sanitizeTags(input.tags),
    excerpt: input.excerpt?.trim() || input.content.trim().slice(0, 160),
    publishedAt: input.publishedAt ?? now,
    updatedAt: input.updatedAt ?? now,
    status: input.status ?? "draft",
    content: input.content.trim(),
    html: "",
    readTimeMinutes: Math.max(1, Math.ceil(countWords(input.content) / 200))
  };

  await fs.writeFile(getBlogFilePath(blog.slug), serializeBlog(blog), "utf8");
  blog.html = await renderMarkdownToHtml(blog.content);
  return blog;
}

export async function updateBlog(
  slug: string,
  input: BlogInput
): Promise<BlogRecord | null> {
  const existing = await readBlogBySlug(slug);
  if (!existing) return null;

  const nextTitle = input.title?.trim() || existing.title;
  const nextSlug = input.slug?.trim() ? await generateUniqueSlug(input.slug, slug) : slug;
  const nextContent = input.content?.trim() || existing.content;
  const nextBlog: BlogRecord = {
    title: nextTitle,
    slug: nextSlug,
    coverImage: input.coverImage?.trim() || existing.coverImage,
    tags: input.tags ? sanitizeTags(input.tags) : existing.tags,
    excerpt: input.excerpt?.trim() || existing.excerpt,
    publishedAt: input.publishedAt ?? existing.publishedAt,
    updatedAt: input.updatedAt ?? new Date().toISOString(),
    status: input.status ?? existing.status,
    content: nextContent,
    html: "",
    readTimeMinutes: Math.max(1, Math.ceil(countWords(nextContent) / 200))
  };

  const currentFile = getBlogFilePath(slug);
  const nextFile = getBlogFilePath(nextBlog.slug);

  await fs.writeFile(nextFile, serializeBlog(nextBlog), "utf8");
  if (nextFile !== currentFile) {
    await fs.unlink(currentFile);
  }

  nextBlog.html = await renderMarkdownToHtml(nextBlog.content);
  return nextBlog;
}

export async function deleteBlog(slug: string): Promise<boolean> {
  const filePath = getBlogFilePath(slug);
  if (!(await fileExists(filePath))) return false;
  await fs.unlink(filePath);
  return true;
}

export async function ensureBlogSeed(blog: BlogInput): Promise<void> {
  const slug = blog.slug || (blog.title ? toSlugBase(blog.title) : "");
  if (!slug) return;

  if (await fileExists(getBlogFilePath(slug))) return;
  if (!blog.title || !blog.content) return;

  await createBlog({
    ...blog,
    slug
  } as Required<Pick<BlogInput, "title" | "content">> & BlogInput);
}