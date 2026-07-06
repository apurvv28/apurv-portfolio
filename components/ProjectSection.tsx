"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import {
  projects,
  projectFilters,
  type Project,
  type ProjectFilter
} from "@/data/projects";
import { cn } from "@/lib/utils";

function hasDemo(demo: string): boolean {
  return demo !== "No demo" && demo !== "NA" && demo.length > 0;
}

function MissionCard({ project, index }: { project: Project; index: number }): JSX.Element {
  const reducedMotion = useReducedMotion();
  const missionCode = `MISSION-${String(index + 1).padStart(2, "0")}`;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={reducedMotion ? undefined : { y: -8 }}
      className="group relative overflow-hidden rounded-2xl glass-panel"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-[var(--glass-border)]">
        <Image
          src={project.image}
          alt={`${project.title} project preview`}
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--glass-scrim)] via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-60" />
      </div>

      {/* Scanline / glare sweep on hover */}
      {!reducedMotion && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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

      {/* Neumorphic header strip */}
      <div className="neu-flat border-b border-[var(--glass-border)] px-5 py-3">
        <p className="font-mono text-caption uppercase tracking-[0.22em] text-foreground-subtle">
          {missionCode}: {project.title}
        </p>
      </div>

      <div className="relative p-5 sm:p-6">
        <p className="text-body-sm leading-relaxed text-foreground-muted">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: reducedMotion ? 0 : i * 0.04, duration: 0.3 }}
              className="neu-pressed rounded-full px-3 py-1 font-mono text-[11px] text-foreground-muted"
            >
              {tech}
            </motion.span>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-3">
          {hasDemo(project.demo) && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              aria-label={`Live demo for ${project.title}`}
              className="neu-raised flex h-10 w-10 items-center justify-center rounded-full transition-transform hover:-translate-y-0.5 active:neu-pressed"
            >
              <ExternalLink className="h-4 w-4 text-foreground-muted" strokeWidth={1.5} />
            </a>
          )}
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            aria-label={`GitHub repository for ${project.title}`}
            className="neu-raised flex h-10 w-10 items-center justify-center rounded-full transition-transform hover:-translate-y-0.5 active:neu-pressed"
          >
            <Github className="h-4 w-4 text-foreground-muted" strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function ProjectSection(): JSX.Element {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("All");

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.tags.includes(activeFilter));

  return (
    <section id="work" className="relative mx-auto mt-24 max-w-7xl px-6 sm:mt-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7 }}
      >
        <SectionLabel index="05. PROJECTS" title="Mission Archive" />

        {/* Segmented filter control */}
        <div className="neu-flat mb-10 inline-flex flex-wrap gap-1 rounded-full p-1">
          {projectFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "rounded-full px-4 py-2 font-mono text-caption uppercase tracking-[0.12em] transition-all duration-200",
                activeFilter === filter
                  ? "neu-pressed text-foreground"
                  : "text-foreground-muted hover:text-foreground"
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        <motion.div layout className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <MissionCard
                key={project.title}
                project={project}
                index={projects.indexOf(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
}
