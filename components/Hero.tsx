"use client";

import { motion } from "framer-motion";

export default function Hero(): JSX.Element {
  return (
    <section id="home" className="relative flex min-h-[90vh] items-center justify-center overflow-hidden pt-20 sm:pt-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-hero-radial opacity-70" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-5xl px-6 text-center"
      >
        <motion.p 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-8 inline-flex rounded-full glass-card border border-cyan-500/30 px-5 py-2 text-[10px] font-medium tracking-[0.25em] text-cyan-400 uppercase sm:text-xs"
        >
          Software Engineer | AI/ML Engineer 
        </motion.p>

        <h1 className="text-balance text-4xl font-bold leading-[1.1] tracking-tight text-[var(--text-main)] sm:text-6xl lg:text-7xl">
          Building softwares that solve real-problem
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="mt-3 block bg-accent-gradient bg-clip-text font-serif text-3xl italic text-transparent sm:text-5xl lg:text-6xl"
          >
            I belief in crafting products that are fast, reliable, and worth using
          </motion.span>
        </h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg lg:text-xl"
        >
          I specialize in full-stack product engineering with AI/ML capabilities, thoughtful cloud based architecture, and clean execution.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
        >
          <motion.a
            href="#work"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full rounded-full bg-accent-gradient px-8 py-4 text-sm font-semibold text-white shadow-glow transition-all sm:w-auto"
          >
            Explore Work
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, y: -2, backgroundColor: "rgba(6, 182, 212, 0.1)" }}
            whileTap={{ scale: 0.98 }}
            className="w-full rounded-full glass-button border border-cyan-500/40 px-8 py-4 text-sm font-semibold text-white transition-all sm:w-auto"
          >
            Start a Conversation
          </motion.a>
        </motion.div>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          aria-label="Scroll to about section"
          className="group mx-auto mt-20 flex w-fit flex-col items-center gap-3 text-[10px] tracking-[0.3em] text-[var(--text-muted)] uppercase transition-colors hover:text-cyan-400"
        >
          Scroll
          <div className="relative h-12 w-px overflow-hidden bg-white/10">
            <motion.div 
              animate={{ 
                y: ["-100%", "100%"] 
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500 to-transparent"
            />
          </div>
        </motion.a>
      </motion.div>
    </section>
  );
}
