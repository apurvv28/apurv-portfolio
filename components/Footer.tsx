"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Github, Linkedin, FileText, Rocket } from "lucide-react";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" }
];

const socials = [
  { href: "https://github.com/apurvv28", icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/apurv-saktepar-054a17281/", icon: Linkedin, label: "LinkedIn" },
  { href: "/resume/apurv.pdf", icon: FileText, label: "Resume" }
];

function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function Footer(): JSX.Element {
  const [launching, setLaunching] = useState(false);
  const reducedMotion = useReducedMotion();

  const handleBackToTop = (): void => {
    if (!reducedMotion) setLaunching(true);
    scrollToTop();
    window.setTimeout(() => setLaunching(false), 600);
  };

  return (
    <footer className="relative mt-24">
      {/* Starfield fade-out */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--surface-base))"
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 opacity-30"
        aria-hidden="true"
      >
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-px w-px rounded-full bg-foreground"
            style={{
              left: `${(i * 17 + 5) % 100}%`,
              bottom: `${(i * 13) % 80}%`,
              opacity: 0.15 + (i % 5) * 0.08
            }}
          />
        ))}
      </div>

      <div className="glass-panel relative mx-auto max-w-6xl border-x-0 border-b-0 px-6 py-10 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-heading text-h6 text-foreground">Apurv Saktepar</p>
            <p className="mt-1 font-mono text-caption uppercase tracking-[0.18em] text-foreground-subtle">
              Software Developer & AI/ML Engineer
            </p>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-caption uppercase tracking-[0.12em] text-foreground-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={s.label}
                className="neu-raised flex h-10 w-10 items-center justify-center rounded-full transition-transform hover:-translate-y-0.5 active:neu-pressed"
              >
                <s.icon className="h-4 w-4 text-foreground-muted" strokeWidth={1.5} />
              </a>
            ))}

            <motion.button
              type="button"
              onClick={handleBackToTop}
              aria-label="Back to top"
              animate={launching && !reducedMotion ? { y: [0, -8, -16], opacity: [1, 1, 0] } : { y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="neu-raised flex h-10 w-10 items-center justify-center rounded-full transition-transform hover:-translate-y-1 active:neu-pressed"
            >
              <Rocket className="h-4 w-4 text-foreground-muted" strokeWidth={1.5} />
            </motion.button>
          </div>
        </div>

        <p className="mt-8 border-t border-[var(--glass-border)] pt-6 text-center font-mono text-caption text-foreground-subtle sm:text-left">
          © {new Date().getFullYear()} Apurv Saktepar · Crafted with Next.js
        </p>
      </div>
    </footer>
  );
}
