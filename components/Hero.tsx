"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Code2, Brain, Cloud, Database } from "lucide-react";

const STACK = [
  { icon: Code2, label: "Full-Stack" },
  { icon: Brain, label: "AI / ML" },
  { icon: Cloud, label: "Cloud" },
  { icon: Database, label: "Systems" },
];

const TOOLS = ["MERN", "GCP", "AWS", "Docker", "MySQL"];

export default function Hero(): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const blendOpacity = useTransform(scrollYProgress, [0.45, 1], [0, 1]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-screen flex-col overflow-hidden pt-28 pb-8"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-hero-radial opacity-70" />
      <div className="pointer-events-none absolute right-[6%] top-1/3 -z-10 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-accent-gradient opacity-20 blur-[120px] lg:right-[18%] lg:h-[520px] lg:w-[520px]" />

      {/* flex-1 + flex-col here, NOT on the row below — this is what lets
          mt-auto push the bottom strip down without stretching/centering
          the photo into empty space */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 lg:px-10"
      >
        {/* ---------- Top row ---------- */}
        <div className="flex shrink-0 items-start justify-between">
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-flex items-center gap-2 rounded-full glass-card border border-cyan-500/30 px-5 py-2 text-[10px] font-medium tracking-[0.25em] text-cyan-400 uppercase sm:text-xs"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Available for Opportunities
          </motion.p>

          <RotatingEmblem />
        </div>

        {/* ---------- Middle row: NOT flex-1 anymore, sized naturally,
             everything bottom-anchored so the photo sits flush with the
             baseline instead of floating in dead space ---------- */}
        <div className="relative mt-12 grid grid-cols-1 items-end gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-6">
          {/* Heading + stack badge */}
          <div className="order-1 lg:col-span-5 lg:pb-6">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-balance text-4xl font-bold leading-[1.05] tracking-tight text-[var(--text-main)] sm:text-5xl lg:text-6xl"
            >
              Meet the Engineer
              <span className="mt-2 block bg-accent-gradient bg-clip-text text-transparent">
                Behind the Code
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.7 }}
              className="mt-8 inline-flex items-center gap-3 rounded-full glass-card border border-white/10 px-4 py-2"
            >
              <span className="pl-1 text-[10px] font-medium tracking-[0.2em] text-[var(--text-muted)] uppercase">
                Core Toolkit
              </span>
              <span className="h-4 w-px bg-white/15" />
              <span className="flex items-center gap-2.5">
                {STACK.map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    title={label}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[var(--text-muted)] transition-colors hover:border-cyan-500/40 hover:text-cyan-400"
                  >
                    <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </span>
                ))}
              </span>
            </motion.div>
          </div>

          {/* Portrait — height is viewport-relative + capped, NOT a giant
              fixed box, so there's no leftover space for it to float in */}
          <motion.div
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.2 }}
            transition={{ delay: 0.25, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="order-2 relative mx-auto h-[48vh] max-h-[560px] w-[78%] sm:h-[52vh] sm:w-[68%] lg:col-span-4 lg:h-[56vh] lg:w-full"
          >
            <motion.div
              style={{ y: photoY }}
              className="relative h-full w-full
                [mask-image:radial-gradient(ellipse_72%_92%_at_50%_42%,black_55%,transparent_100%)]
                [-webkit-mask-image:radial-gradient(ellipse_72%_92%_at_50%_42%,black_55%,transparent_100%)]"
            >
              {/* Once you have a clean cutout (e.g. from remove.bg), swap
                  src to "/profile.png" and delete the mask-image classes
                  above — a real cutout doesn't need the vignette. */}
              <Image
                src="/profile.png"
                alt="Apurv — Software & AI/ML Engineer"
                fill
                priority
                sizes="(min-width: 1024px) 32vw, 80vw"
                className="object-cover object-top"
              />
            </motion.div>
          </motion.div>

          {/* Aside copy + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="order-3 flex flex-col gap-6 lg:col-span-3 lg:items-start lg:pb-6"
          >
            <p className="text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
              As a software &amp; AI/ML engineer, I rely on tools like Next.js, LangGraph, and AWS to design intelligent systems that ship.
            </p>
            <motion.a
              href="#work"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex w-fit items-center justify-center rounded-full bg-accent-gradient px-7 py-3.5 text-sm font-semibold text-white shadow-glow transition-all"
            >
              Explore Work
            </motion.a>
          </motion.div>
        </div>

        {/* ---------- Bottom group: pinned to the bottom of the section
             via mt-auto, independent of how tall the row above is ---------- */}
        <div className="mt-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.8 }}
            className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-t border-white/10 pt-8"
          >
            {TOOLS.map((tool) => (
              <span
                key={tool}
                className="text-sm font-medium tracking-wide text-[var(--text-muted)] opacity-50 transition-opacity hover:opacity-100"
              >
                {tool}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        style={{ opacity: blendOpacity }}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-black"
      />
    </section>
  );
}

function RotatingEmblem(): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.9 }}
      className="relative hidden h-[110px] w-[110px] shrink-0 items-center justify-center sm:flex"
    >
      <motion.svg
        viewBox="0 0 100 100"
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 h-full w-full text-cyan-400/70"
      >
        <defs>
          <path id="emblemCircle" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
        </defs>
        <text fontSize="7.4" letterSpacing="2.5" fill="currentColor" className="uppercase">
          <textPath href="#emblemCircle" startOffset="0%">
            Full-Stack Engineer • AI/ML Engineer •
          </textPath>
        </text>
      </motion.svg>
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-gradient text-sm font-bold text-white shadow-glow">
        A
      </span>
    </motion.div>
  );
}