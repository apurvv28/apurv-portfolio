"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import type { MouseEvent } from "react";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps): JSX.Element {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springX = useSpring(rotateX, { stiffness: 280, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 280, damping: 20 });

  const onMove = (event: MouseEvent<HTMLDivElement>): void => {
    // Disable tilt on mobile for better performance and UX
    if (window.innerWidth < 768) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    rotateX.set(((centerY - y) / rect.height) * 10);
    rotateY.set(((x - centerX) / rect.width) * 10);
  };

  const onLeave = (): void => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.article
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{ 
        rotateX: springX, 
        rotateY: springY, 
        transformPerspective: 1200 
      }}
      className="group relative overflow-hidden rounded-[2rem] border border-white/5 bg-[#0a0f1a]/40 backdrop-blur-sm transition-colors hover:border-cyan-500/30"
    >
      <div className="relative h-60 overflow-hidden sm:h-72">
        <Image
          src={project.image}
          alt={`${project.title} preview image`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] to-transparent opacity-60 transition-opacity group-hover:opacity-40" />
      </div>

      <div className="p-8 sm:p-10">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-cyan-400/80 uppercase sm:text-xs">
            {project.category}
          </p>
          <div className="flex gap-4">
            <Link
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="text-white/40 transition-colors hover:text-cyan-400"
            >
              <Github size={18} />
            </Link>
            <Link
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="text-white/40 transition-colors hover:text-cyan-400"
            >
              <ExternalLink size={18} />
            </Link>
          </div>
        </div>

        <h3 className="mt-4 text-2xl font-bold text-white sm:text-3xl">{project.title}</h3>
        <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
          {project.description}
        </p>

        <div className="mt-8 flex flex-wrap gap-2.5">
          {project.stack.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/5 bg-white/[0.03] px-4 py-1.5 text-[10px] font-medium text-gray-300 transition-colors group-hover:border-cyan-500/20 group-hover:bg-cyan-500/5 group-hover:text-cyan-100 sm:text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
