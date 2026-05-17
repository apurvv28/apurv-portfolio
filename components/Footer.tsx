import Link from "next/link";

export default function Footer(): JSX.Element {
  return (
    <footer className="mx-auto mt-20 max-w-6xl border-t border-cyan-500/20 px-4 py-10 sm:px-6">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-cyan-400">Apurv Saktepar</p>
          <p className="mt-1 text-xs text-[var(--text-muted)]">Software Developer & AI/ML Engineer</p>
        </div>

        <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
          <Link className="transition hover:text-cyan-400" href="#about">
            About
          </Link>
          <Link className="transition hover:text-cyan-400" href="#work">
            Work
          </Link>
          <Link className="transition hover:text-cyan-400" href="#blog">
            Blog
          </Link>
          <Link className="transition hover:text-cyan-400" href="#contact">
            Contact
          </Link>
        </div>
      </div>
      <p className="mt-6 text-xs text-[var(--text-muted)]">
        © {new Date().getFullYear()} Apurv Saktepar. Crafted with Next.js and motion.
      </p>
    </footer>
  );
}
