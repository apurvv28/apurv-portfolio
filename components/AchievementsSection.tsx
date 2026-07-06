"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { achievements } from "@/data/achievements";
import { cn } from "@/lib/utils";

export default function AchievementsSection(): JSX.Element {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();

  return (
    <section id="achievements" className="relative mx-auto mt-24 max-w-5xl px-6 sm:mt-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
      >
        <SectionLabel index="06. ACHIEVEMENTS" title="Medals & Badges" />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-3">
          {achievements.map((item, index) => {
            const isExpanded = expandedId === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.06, duration: 0.5 }}
                className="relative flex flex-col items-center"
              >
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  onMouseEnter={() => !reducedMotion && setExpandedId(item.id)}
                  onMouseLeave={() => !reducedMotion && setExpandedId(null)}
                  aria-expanded={isExpanded}
                  className="group relative flex flex-col items-center gap-3"
                >
                  {/* Hexagonal-ish badge */}
                  <div className="relative">
                    <div
                      className={cn(
                        "neu-raised flex h-20 w-20 items-center justify-center rounded-2xl transition-transform duration-300 sm:h-24 sm:w-24",
                        "group-hover:-translate-y-1 group-hover:shadow-neu-raised-dark"
                      )}
                      style={{ clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)" }}
                    >
                      <item.icon className="h-8 w-8 text-foreground-muted" strokeWidth={1.25} />
                    </div>

                    {/* Shine sweep on hover */}
                    {!reducedMotion && (
                      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition-opacity group-hover:opacity-100">
                        <div className="absolute inset-0 animate-light-sweep">
                          <div
                            className="h-full w-1/2"
                            style={{
                              background:
                                "linear-gradient(105deg, transparent, var(--glass-inner-glow), transparent)"
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <p className="max-w-[140px] text-center font-mono text-[11px] uppercase tracking-[0.1em] text-foreground-muted">
                    {item.name}
                  </p>
                </button>

                {/* Expandable glass detail panel */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.98 }}
                      transition={{ duration: 0.25 }}
                      className="glass-panel-strong absolute top-full z-20 mt-2 w-[min(260px,80vw)] rounded-xl p-4 text-center"
                    >
                      <p className="font-heading text-body-sm text-foreground">{item.name}</p>
                      <p className="mt-1 text-caption text-foreground-muted">{item.event}</p>
                      <p className="mt-2 font-mono text-caption uppercase tracking-[0.15em] text-foreground">
                        {item.result}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
