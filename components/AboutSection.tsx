"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import CountUp from "@/components/ui/CountUp";

const STATS = [
  { label: "CGPA", value: 9.52, decimals: 2, suffix: "" },
  { label: "Internships", value: 2, decimals: 0, suffix: "" },
  { label: "Projects", value: 4, decimals: 0, suffix: "" },
  { label: "Recognitions", value: 5, decimals: 0, suffix: "" }
];

function MissionPatch(): JSX.Element {
  return (
    <div className="relative mx-auto h-36 w-36 shrink-0 sm:h-44 sm:w-44">
      {/* Orbiting dashed ring */}
      <motion.div
        className="absolute inset-0 rounded-full border border-dashed border-foreground/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute inset-2 rounded-full border border-dotted border-foreground/10"
        animate={{ rotate: -360 }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      />

      {/* Neumorphic badge frame */}
      <div className="neu-raised absolute inset-4 overflow-hidden rounded-full p-1">
        <div className="relative h-full w-full overflow-hidden rounded-full bg-surface-secondary">
          <Image
            src="/profile.png"
            alt="Apurv Saktepar"
            fill
            className="object-cover object-top"
            sizes="176px"
          />
        </div>
      </div>

      {/* Mission patch label */}
      <div className="neu-flat absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground-muted">
          SDE-01
        </span>
      </div>
    </div>
  );
}

export default function AboutSection(): JSX.Element {
  return (
    <section id="about" className="relative mx-auto mt-24 max-w-6xl px-6 sm:mt-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <SectionLabel index="01. ABOUT" title="Mission Log — Profile" kicker="MISSION LOG" />

        <div className="glass-panel-strong glass-scrim rounded-[2rem] p-6 sm:p-10 lg:p-12">
          <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:gap-14">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <MissionPatch />
            </motion.div>

            <div className="flex-1 space-y-6">
              <div className="space-y-4 text-body-sm leading-relaxed text-foreground-muted sm:text-body">
                <p>
                  I&apos;m a Software Development Engineer focused on{" "}
                  <span className="font-medium text-foreground">
                    DBMS, machine learning, multi-cloud technologies, and scalable system design
                  </span>
                  .
                </p>
                <p>
                  My work centers on building{" "}
                  <span className="font-medium text-foreground">AI-powered applications</span>{" "}
                  such as RAG pipelines and agentic AI systems, with a full-stack foundation in
                  React, Next.js, FastAPI, and Node.js.
                </p>
                <p>
                  I enjoy problem-solving, leadership, collaborative development, and designing
                  secure, data-driven, customer-centric solutions. That shows up in projects like{" "}
                  <span className="font-medium text-foreground">SamayVidya</span>,{" "}
                  <span className="font-medium text-foreground">EMR 2.0</span>,{" "}
                  <span className="font-medium text-foreground">DevForge</span>, and{" "}
                  <span className="font-medium text-foreground">PIE</span>.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                {STATS.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    className="neu-raised rounded-2xl px-4 py-4 text-center"
                  >
                    <p className="font-heading text-h4 text-foreground">
                      <CountUp
                        end={stat.value}
                        decimals={stat.decimals}
                        suffix={stat.suffix}
                      />
                    </p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-foreground-subtle">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
