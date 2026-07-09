"use client";

import Link from "next/link";
import { Menu, X, Github, Linkedin, Code2, FileText, ExternalLink } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#work", label: "Work" },
  { href: "/blogs", label: "Blogs", route: true },
  { href: "/#contact", label: "Contact" }
];

const socialLinks = [
  { label: "GitHub", icon: Github, href: "https://github.com/apurvv28" },
  { label: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/apurv-saktepar-054a17281/" },
  { label: "LeetCode", icon: Code2, href: "https://leetcode.com/u/apurv28/" },
  { label: "Resume", icon: FileText, href: "/resume/apurv.pdf" }
];

export default function Header(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);
  const socialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (socialRef.current && !socialRef.current.contains(e.target as Node)) {
        setSocialOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <header className="fixed left-0 right-0 top-4 z-header mx-auto w-[min(96%,1200px)] px-4 sm:px-6">
      <nav
        aria-label="Main navigation"
        className={cn(
          "glass-panel-strong backdrop-blur-md px-4 py-3 shadow-[0_10px_30px_var(--glass-shadow)] transition-all duration-300 sm:px-6 sm:py-4",
          menuOpen ? "rounded-3xl" : "rounded-full"
        )}
      >
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <Link
            href="/#home"
            className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-foreground transition-colors hover:text-foreground-muted sm:text-sm"
          >
            APURV
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) =>
              item.route ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative font-mono text-xs font-medium uppercase tracking-[0.14em] text-foreground-muted transition-colors hover:text-foreground sm:text-sm"
                >
                  {item.label}
                  <motion.span
                    className="absolute -bottom-1 left-0 h-px w-full origin-left bg-foreground"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.25 }}
                  />
                </Link>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative font-mono text-xs font-medium uppercase tracking-[0.14em] text-foreground-muted transition-colors hover:text-foreground sm:text-sm"
                >
                  {item.label}
                  <motion.span
                    className="absolute -bottom-1 left-0 h-px w-full origin-left bg-foreground"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.25 }}
                  />
                </Link>
              )
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div ref={socialRef} className="relative">
              <motion.button
                type="button"
                aria-label="Social links"
                aria-expanded={socialOpen}
                onClick={() => setSocialOpen((prev) => !prev)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="neu-raised inline-flex h-9 w-9 items-center justify-center rounded-xl text-foreground-muted transition-colors hover:text-foreground"
              >
                <motion.div
                  animate={socialOpen ? { rotate: 45 } : { rotate: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <ExternalLink size={15} />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {socialOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="glass-panel-strong absolute right-0 top-12 z-50 w-44 overflow-hidden rounded-2xl p-2"
                  >
                    {socialLinks.map((link, index) => (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        onClick={() => setSocialOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground-muted transition-all hover:bg-surface-mid hover:text-foreground"
                      >
                        <link.icon size={15} className="text-foreground-muted" />
                        <span className="font-medium">{link.label}</span>
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle mobile menu"
              onClick={() => setMenuOpen((prev) => !prev)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="neu-raised inline-flex h-9 w-9 items-center justify-center rounded-xl text-foreground lg:hidden"
            >
              <motion.div
                animate={menuOpen ? { rotate: 90 } : { rotate: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </motion.div>
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="mt-4 overflow-hidden border-t border-[var(--glass-border)] pt-4 lg:hidden"
            >
              <div className="flex flex-col gap-1">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.16, delay: index * 0.03, ease: "easeOut" }}
                  >
                    {item.route ? (
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="block w-full rounded-lg px-4 py-2 text-left font-mono text-sm font-medium uppercase tracking-[0.1em] text-foreground-muted transition-all hover:bg-surface-mid hover:text-foreground"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="block w-full rounded-lg px-4 py-2 text-left font-mono text-sm font-medium uppercase tracking-[0.1em] text-foreground-muted transition-all hover:bg-surface-mid hover:text-foreground"
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
                <div className="mt-2 flex flex-wrap gap-2 border-t border-[var(--glass-border)] px-4 pb-1 pt-2">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setMenuOpen(false)}
                      className="neu-flat inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-xs text-foreground-muted transition-all hover:text-foreground"
                    >
                      <link.icon size={12} />
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
