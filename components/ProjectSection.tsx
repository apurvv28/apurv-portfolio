"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { projects } from "@/data/projects";
import { ExternalLink, Github } from "lucide-react";

const ProjectSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const allProjects = projects;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Map vertical scroll progress to horizontal translation
  // Added buffer (0.1, 0.9) to make the experience feel more "locked in" and controllable.
  // We use [0.1, 0.9] so horizontal scroll only happens in the middle 80% of the section's vertical run.
  const x = useTransform(progress, [0.1, 0.9], ["0vw", `-${(allProjects.length - 1) * 100}vw`]);

  return (
    <section 
      ref={containerRef} 
      className="relative bg-black"
      style={{ height: `${allProjects.length * 400}vh` }}
    >
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        
        {/* Horizontal Scroll Wrapper */}
        <motion.div 
          style={{ x }} 
          className="flex h-full"
        >
          {allProjects.map((project, index) => (
            <div 
              key={project.title}
              className="relative w-screen h-screen flex-shrink-0 flex items-center justify-center px-6 lg:px-24"
            >
              <ProjectFullView 
                project={project} 
                index={index} 
              />
            </div>
          ))}
        </motion.div>

        {/* Custom Scroll Indicator (Vertical Line with Profile Pic) */}
        <div className="hidden lg:flex absolute right-12 top-1/2 -translate-y-1/2 h-[50vh] flex-col items-center z-50">
          <div className="w-[1px] h-full bg-white/10 relative">
            {/* Progress Track */}
            <motion.div 
              style={{ height: useTransform(progress, [0.1, 0.9], ["0%", "100%"]) }}
              className="absolute top-0 w-full bg-cyan-500/50"
            />
            {/* Moving Profile Picture */}
            <motion.div 
              style={{ 
                top: useTransform(progress, [0.1, 0.9], ["0%", "100%"]),
              }}
              className="absolute -left-[18px] -translate-y-1/2 w-9 h-9 rounded-full border-2 border-cyan-500/30 bg-black overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.3)] cursor-pointer hover:scale-110 transition-transform"
            >
              <img 
                src="https://avatars.githubusercontent.com/u/108502283?v=4" 
                alt="Apurv Profile"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProjectFullView = ({ project, index }: any) => {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-32 w-full max-w-7xl mx-auto">
      
      {/* Left side: Content */}
      <div className="w-full lg:w-[45%] order-2 lg:order-1">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="text-sm font-mono tracking-[0.3em] text-cyan-500/70">PROJECT 0{index + 1}</span>
            <div className="w-16 h-px bg-zinc-800" />
          </div>
          
          <h2 className="text-5xl lg:text-8xl font-bold text-white mb-10 tracking-tighter leading-none">
            {project.title.split(' ').map((word: string, i: number) => (
              <span key={i} className="block">{word}</span>
            ))}
          </h2>
          
          <div className="space-y-8 mb-12">
            <p className="text-zinc-400 text-lg lg:text-xl leading-relaxed max-w-lg">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-3">
              {project.stack.map((tech: string) => (
                <span 
                  key={tech}
                  className="px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-medium text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-8">
            <a 
              href={project.github} 
              target="_blank" 
              rel="noreferrer" 
              className="group flex items-center gap-3 text-sm font-bold text-zinc-400 hover:text-white transition-colors"
            >
              <Github size={20} className="group-hover:scale-110 transition-transform" />
              <span>SOURCE</span>
            </a>
            {project.demo && project.demo !== "No demo" && project.demo !== "NA" && (
              <a 
                href={project.demo} 
                target="_blank" 
                rel="noreferrer" 
                className="group flex items-center gap-3 text-sm font-bold text-zinc-400 hover:text-white transition-colors"
              >
                <ExternalLink size={20} className="group-hover:scale-110 transition-transform" />
                <span>LIVE DEMO</span>
              </a>
            )}
          </div>
        </motion.div>
      </div>

      {/* Right side: Image showcase */}
      <div className="w-full lg:w-[55%] order-1 lg:order-2">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative w-full"
        >
          <div className="relative w-full">
            <Image 
              src={project.image} 
              alt={project.title}
              width={1600}
              height={1000}
              className="h-auto w-full object-contain select-none"
              priority={index === 0}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectSection;
