"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutSection(): JSX.Element {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="mx-auto mt-24 max-w-6xl px-6 sm:mt-32"
    >
      <motion.div 
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="glass-card rounded-[2rem] border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 p-7 sm:p-12"
      >
        <div className="grid items-start gap-10 lg:grid-cols-[220px_1fr] lg:gap-14">
          <div className="flex flex-col items-center">
            <div className="group relative flex h-44 w-44 items-center justify-center overflow-hidden rounded-full border border-cyan-400/35 bg-[#08101f] shadow-[0_0_40px_rgba(6,182,212,0.15)] sm:h-52 sm:w-52">
              <Image
                src="/images/apurv.jpeg"
                alt="Apurv Saktepar"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 176px, 208px"
                priority
              />
              <div className="absolute inset-0 border-2 border-dashed border-cyan-300/35 rounded-full" />
            </div>
            <p className="mt-4 text-center text-[10px] tracking-[0.2em] text-cyan-300/70 uppercase sm:text-xs">Apurv Saktepar</p>
          </div>

          <div>
            <p className="text-[10px] font-semibold tracking-[0.3em] text-cyan-400/80 uppercase sm:text-xs">
              About
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Apurv <span className="text-cyan-400">Saktepar</span>
            </h2>

            <div className="mt-8 space-y-6 text-base leading-relaxed text-[var(--text-muted)] sm:text-lg lg:text-xl">
              <p>
                I build software where <span className="font-medium text-[var(--text-main)]">engineering quality meets product clarity</span>. My focus is turning ambiguous ideas into robust systems that feel simple for users and remain maintainable for teams.
              </p>
              <p>
                Over the past few years I&apos;ve worked across full-stack web development, AI/ML integration, and developer tooling. I enjoy designing architectures that are fast by default, observable in production, and flexible enough to evolve as product goals change.
              </p>
              <p>
                From healthcare workflows and productivity platforms to portfolio-grade interfaces, I care about outcome-driven execution: understanding the business context, shipping with discipline, and refining details until the experience feels intentional.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
