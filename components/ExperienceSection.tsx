"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { experience } from "@/data/experience";

export default function ExperienceSection(): JSX.Element {
  return (
    <section id="experience" className="relative mx-auto mt-24 max-w-7xl px-6 sm:mt-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
      >
        <SectionLabel index="04. EXPERIENCE" title="Technical Experience" kicker="INTERNSHIPS" />

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="flex gap-5 overflow-x-auto pb-4 hide-scrollbar sm:grid sm:grid-cols-2 sm:overflow-visible lg:gap-6">
          {experience.map((entry, index) => (
            <motion.article
              key={entry.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="glass-panel min-w-[280px] shrink-0 rounded-2xl p-6 sm:min-w-0"
            >
              <div className="flex items-start gap-4">
                <div className="neu-raised flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
                  <entry.icon className="h-5 w-5 text-foreground-muted" strokeWidth={1.5} />
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-caption uppercase tracking-[0.18em] text-foreground-subtle">
                    {entry.duration}
                  </p>
                  <h3 className="mt-1 font-heading text-h5 text-foreground">{entry.role}</h3>
                  <p className="mt-0.5 text-body-sm text-foreground-muted">{entry.company}</p>
                </div>
              </div>

              <ul className="mt-5 space-y-2.5 border-t border-[var(--glass-border)] pt-5">
                {entry.responsibilities.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-body-sm leading-relaxed text-foreground-muted"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground/40" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
