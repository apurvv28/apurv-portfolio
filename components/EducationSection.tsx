"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import { education } from "@/data/education";
import { cn } from "@/lib/utils";

export default function EducationSection(): JSX.Element {
  const [activeId, setActiveId] = useState<string>(
    education.find((e) => e.active)?.id ?? education[0].id
  );

  return (
    <section id="education" className="relative mx-auto mt-24 max-w-6xl px-6 sm:mt-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
      >
        <SectionLabel index="03. EDUCATION" title="Flight Timeline" />

        <div className="glass-panel-strong glass-scrim rounded-[2rem] p-5 sm:p-8 lg:p-10">
          {/* Mobile timeline */}
          <div className="relative space-y-6 pl-6 sm:hidden">
            <div
              className="absolute left-3 top-1.5 h-[calc(100%-0.75rem)] border-l border-dashed border-foreground/20"
              aria-hidden="true"
            />

            {education.map((entry, index) => {
              const isActive = entry.id === activeId;

              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: index * 0.08, duration: 0.55 }}
                  className="relative"
                  onMouseEnter={() => setActiveId(entry.id)}
                  onClick={() => setActiveId(entry.id)}
                >
                  <div className="absolute left-0 top-4 z-10">
                    <div
                      className={cn(
                        "neu-raised flex h-7 w-7 items-center justify-center rounded-full border border-[var(--glass-border)] bg-surface-secondary transition-all duration-300",
                        isActive && "ring-1 ring-foreground/10"
                      )}
                    >
                      <GraduationCap
                        className={cn(
                          "h-3.5 w-3.5 transition-colors",
                          isActive ? "text-foreground" : "text-foreground-muted"
                        )}
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>

                  <div className={cn("glass-panel rounded-2xl p-5", isActive && "ring-1 ring-foreground/10")}>
                    <p className="font-mono text-caption uppercase tracking-[0.2em] text-foreground-subtle">
                      {entry.duration}
                    </p>
                    <h3 className="mt-2 font-heading text-h5 text-foreground">{entry.degree}</h3>
                    <p className="mt-1 text-body-sm text-foreground-muted">{entry.institute}</p>
                    <p className="mt-3 inline-flex rounded-full neu-pressed px-3 py-1 font-mono text-caption text-foreground">
                      {entry.score}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Desktop timeline */}
          <div className="relative hidden sm:block">
            <div
              className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 border-l border-dashed border-foreground/20"
              aria-hidden="true"
            />

            <div className="space-y-16 sm:space-y-20">
              {education.map((entry, index) => {
                const isActive = entry.id === activeId;
                const isLeft = index % 2 === 0;

                return (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: index * 0.12, duration: 0.6 }}
                    className={cn(
                      "relative grid grid-cols-1 items-center gap-6 sm:grid-cols-2",
                      isLeft ? "sm:text-right" : "sm:text-left"
                    )}
                    onMouseEnter={() => setActiveId(entry.id)}
                    onClick={() => setActiveId(entry.id)}
                  >
                    <div className={cn(isLeft ? "sm:pr-10" : "sm:col-start-2 sm:pl-10 sm:text-left")}>
                      <motion.div
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.25 }}
                        className={cn("glass-panel rounded-2xl p-5 sm:p-6", isActive && "ring-1 ring-foreground/10")}
                      >
                        <p className="font-mono text-caption uppercase tracking-[0.2em] text-foreground-subtle">
                          {entry.duration}
                        </p>
                        <h3 className="mt-2 font-heading text-h5 text-foreground">{entry.degree}</h3>
                        <p className="mt-1 text-body-sm text-foreground-muted">{entry.institute}</p>
                        <p className="mt-3 inline-flex rounded-full neu-pressed px-3 py-1 font-mono text-caption text-foreground">
                          {entry.score}
                        </p>
                      </motion.div>
                    </div>

                    <div
                      className={cn(
                        "absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2",
                        !isLeft && "sm:col-start-1"
                      )}
                    >
                      <div
                        className={cn(
                          "neu-raised flex h-14 w-14 items-center justify-center rounded-full border border-[var(--glass-border)] bg-surface-secondary transition-all duration-300",
                          isActive && "ring-1 ring-foreground/10"
                        )}
                      >
                        <GraduationCap
                          className={cn(
                            "h-5 w-5 transition-opacity",
                            isActive ? "text-foreground" : "text-foreground-muted"
                          )}
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>

                    <div className={cn("hidden sm:block", isLeft ? "sm:col-start-2" : "sm:col-start-1")} />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
