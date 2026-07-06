"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { skills } from "@/data/skills";
import SkillIcon from "./SkillIcon";
import { cn } from "@/lib/utils";

export default function Skills(): JSX.Element {
  const techSkills = skills.filter((skill) => skill.category === "tech");
  const softSkills = skills.filter((skill) => skill.category === "soft");

  return (
    <section id="skills" className="relative mx-auto mt-24 max-w-7xl px-6 sm:mt-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
      >
        <SectionLabel index="02. SKILLS" title="Skill Matrix" kicker="SYSTEMS" />

        <div className="glass-panel-strong glass-scrim rounded-[2rem] p-6 sm:p-8 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="glass-panel rounded-[1.75rem] p-5 sm:p-6">
              <p className="font-mono text-caption uppercase tracking-[0.2em] text-foreground-subtle">
                Technical Stack
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {techSkills.map((skill, index) => (
                  <motion.article
                    key={skill.name}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: index * 0.04, duration: 0.45 }}
                    whileHover={{ y: -3 }}
                    className="neu-raised flex items-start gap-3 rounded-2xl p-4"
                  >
                    <div className="neu-flat flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--glass-border)]">
                      <SkillIcon iconType={skill.iconType} size={18} className="text-foreground-muted" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-heading text-body-sm text-foreground">{skill.name}</h3>
                      <p className="mt-1 text-caption leading-relaxed text-foreground-muted">
                        {skill.description}
                      </p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>

            <div className="glass-panel rounded-[1.75rem] p-5 sm:p-6">
              <p className="font-mono text-caption uppercase tracking-[0.2em] text-foreground-subtle">
                Core Traits
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {softSkills.map((skill, index) => (
                  <motion.article
                    key={skill.name}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: index * 0.04, duration: 0.45 }}
                    whileHover={{ y: -3 }}
                    className={cn(
                      "neu-raised flex items-start gap-3 rounded-2xl p-4",
                      "bg-[linear-gradient(180deg,var(--surface-secondary),var(--surface-raised))]"
                    )}
                  >
                    <div className="neu-flat flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--glass-border)]">
                      <SkillIcon iconType={skill.iconType} size={18} className="text-foreground-muted" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-heading text-body-sm text-foreground">{skill.name}</h3>
                      <p className="mt-1 text-caption leading-relaxed text-foreground-muted">
                        {skill.description}
                      </p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

