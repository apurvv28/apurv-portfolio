"use client";

import { Menu, X, Github, Linkedin, Code2, FileText, ExternalLink } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { href: "home", label: "Home" },
  { href: "about", label: "About" },
  { href: "work", label: "Work" },
  { href: "contact", label: "Contact" }
];

const socialLinks = [
  { label: "GitHub", icon: Github, href: "https://github.com/apurvv28", color: "dark:text-white text-gray-900" },
  { label: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/apurv-saktepar-054a17281/", color: "text-cyan-primary" },
  { label: "LeetCode", icon: Code2, href: "https://leetcode.com/u/apurv28/", color: "text-violet-secondary" },
  { label: "Resume", icon: FileText, href: "/resume/apurv.pdf", color: "text-indigo-accent" }
];

function scrollToSection(id: string) {
  if (id === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

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
    <header className="fixed left-0 right-0 top-4 z-40 mx-auto w-[min(96%,1200px)] px-4 sm:px-6">
      <nav
        aria-label="Main navigation"
        className={`glass-card border border-cyan-500/30 px-4 sm:px-6 py-3 sm:py-4 shadow-lg transition-all duration-500 ${
          menuOpen ? "rounded-3xl" : "rounded-full"
        }`}
      >
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("home")}
            className="text-xs sm:text-sm font-bold tracking-[0.3em] text-cyan-500 hover:text-cyan-400 transition-colors uppercase"
          >
            APURV
          </button>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="group relative text-xs sm:text-sm font-medium text-[var(--text-muted)] transition-colors hover:text-cyan-400"
              >
                {item.label}
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 bg-cyan-500 origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </button>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Social Links Circle Button */}
            <div ref={socialRef} className="relative">
              <motion.button
                type="button"
                aria-label="Social links"
                aria-expanded={socialOpen}
                onClick={() => setSocialOpen((prev) => !prev)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl glass-button border border-cyan-500/30 text-cyan-400 hover:border-cyan-500/60 hover:text-cyan-300 transition-all"
              >
                <motion.div
                  animate={socialOpen ? { rotate: 45 } : { rotate: 0 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                >
                  <ExternalLink size={15} />
                </motion.div>
              </motion.button>

              {/* Dropdown */}
              <AnimatePresence>
                {socialOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.2, type: "spring", stiffness: 400, damping: 25 }}
                    className="absolute right-0 top-12 z-50 w-44 rounded-2xl border border-cyan-500/25 p-2 shadow-[0_8px_40px_rgba(0,0,0,0.6),0_0_0_1px_rgba(6,182,212,0.1)] overflow-hidden backdrop-blur-2xl bg-[#05080f]/85"
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
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[var(--text-muted)] hover:bg-cyan-500/10 hover:text-[var(--text-main)] transition-all group"
                      >
                        <link.icon size={15} className={`${link.color} group-hover:scale-110 transition-transform`} />
                        <span className="font-medium">{link.label}</span>
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile hamburger */}
            <motion.button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle mobile menu"
              onClick={() => setMenuOpen((prev) => !prev)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl glass-button border border-cyan-500/30 text-[var(--text-main)] hover:border-cyan-500/60 transition-all lg:hidden"
            >
              <motion.div
                animate={menuOpen ? { rotate: 90 } : { rotate: 0 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
              className="overflow-hidden lg:hidden mt-4 pt-4 border-t border-cyan-500/20"
            >
              <div className="flex flex-col gap-1">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <button
                      onClick={() => { scrollToSection(item.href); setMenuOpen(false); }}
                      className="block w-full text-left rounded-lg px-4 py-2 text-sm font-medium text-[var(--text-muted)] hover:bg-cyan-500/10 hover:text-cyan-400 transition-all"
                    >
                      {item.label}
                    </button>
                  </motion.div>
                ))}
                {/* Social links strip in mobile menu */}
                <div className="mt-2 pt-2 border-t border-cyan-500/10 flex flex-wrap gap-2 px-4 pb-1">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setMenuOpen(false)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-500/20 bg-cyan-500/5 px-3 py-1.5 text-xs text-[var(--text-muted)] hover:bg-cyan-500/15 hover:text-[var(--text-main)] transition-all"
                    >
                      <link.icon size={12} className={link.color} />
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
