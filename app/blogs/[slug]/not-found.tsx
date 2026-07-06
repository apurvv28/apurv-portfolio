import Link from "next/link";

export default function BlogNotFound(): JSX.Element {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-24">
      <section className="glass-panel max-w-xl rounded-[2rem] p-8 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-foreground-subtle">Transmission lost in deep space</p>
        <h1 className="mt-4 font-heading text-4xl text-foreground">This blog is unavailable.</h1>
        <p className="mt-3 text-sm text-foreground-muted">The requested post could not be found or is not published yet.</p>
        <Link href="/blogs" className="neu-raised mt-6 inline-flex rounded-2xl px-5 py-3 font-mono text-xs uppercase tracking-[0.22em] text-foreground">
          Back to blogs
        </Link>
      </section>
    </main>
  );
}