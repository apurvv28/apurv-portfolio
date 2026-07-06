import type { Metadata } from "next";
import { listBlogRecords } from "@/lib/blog-storage";
import LogoutButton from "@/components/admin/LogoutButton";
import BlogAdminClient from "@/components/admin/BlogAdminClient";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: {
    index: false,
    follow: false,
    nocache: true
  }
};

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage(): Promise<JSX.Element> {
  const blogs = await listBlogRecords({ includeDrafts: true });

  return (
    <main className="min-h-screen px-4 pb-16 pt-32 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <section className="glass-panel rounded-[2rem] p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="font-mono text-caption uppercase tracking-[0.28em] text-foreground-subtle">
                Hidden Control Room
              </p>
              <h1 className="mt-3 font-heading text-3xl text-foreground sm:text-4xl">
                Blog Dashboard
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-foreground-muted sm:text-base">
                This shell is reserved for the blog management UI. The next prompt will fill in the editor and list views.
              </p>
            </div>

            <LogoutButton />
          </div>
        </section>

        <BlogAdminClient initialBlogs={blogs} />
      </div>
    </main>
  );
}