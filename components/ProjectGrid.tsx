"use client";

import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

type ProjectGridProps = {
  limit?: number;
};

export default function ProjectGrid({ limit }: ProjectGridProps): JSX.Element {
  const visibleProjects = typeof limit === "number" ? projects.slice(0, limit) : projects;

  return (
    <section id="work" className="mx-auto mt-24 max-w-7xl px-6 sm:mt-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-[10px] font-semibold tracking-[0.3em] text-cyan-400 uppercase sm:text-xs">Selected Work</p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">Built for impact and scale.</h2>
      </motion.div>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:gap-10">
        {visibleProjects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
