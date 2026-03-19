"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { skills } from "@/data/skills";
import SkillIcon from "./SkillIcon";

export default function TechStackGrid() {
  const techSkills = skills.filter((s) => s.category === "tech");
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rotateClockwise = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const rotateCounterClockwise = useTransform(scrollYProgress, [0, 1], [0, -120]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      style={{ position: "relative" }}
      className="mt-32 py-24 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        {/* Magic Object Stacking Area */}
        <div className="relative flex flex-col items-center mb-16">
          {/* Top Title - Z-index 20 */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-7xl font-bold tracking-tighter text-white relative z-20 mb-[-1.5rem] sm:mb-[-2.5rem]"
          >
            The Magic
          </motion.h2>

          {/* Magic Object - Z-index 10 (Sandwiched) */}
          <motion.div
            style={{ rotate: rotateClockwise }}
            className="relative w-64 h-64 sm:w-80 sm:h-80 mix-blend-screen z-10 opacity-90"
          >
            <Image
              src="/images/magic-object.png"
              alt="Magic Skillset"
              fill
              priority
              sizes="(max-width: 768px) 256px, 320px"
              className="object-contain drop-shadow-[0_0_50px_rgba(6,182,212,0.4)]"
            />

            {/* Inner反向旋转 element for extra dynamic look */}
            <motion.div
              style={{ rotate: rotateCounterClockwise }}
              className="absolute inset-4 border border-cyan-500/10 rounded-full blur-[2px]"
            />
          </motion.div>

          {/* Bottom Title - Z-index 0 */}
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-7xl font-bold tracking-tighter bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent italic font-playfair relative z-0 mt-[-2rem] sm:mt-[-3.5rem]"
          >
            Behind.
          </motion.h2>

          <p className="absolute -top-12 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs font-bold tracking-[0.4em] text-gray-500 uppercase whitespace-nowrap">
            My Skillset
          </p>
        </div>

        {/* Tech Capsules Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-5xl"
        >
          {techSkills.map((skill) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex items-center gap-3 px-5 py-2.5 rounded-full glass-card border border-white/10 hover:border-cyan-500/30 transition-colors group cursor-default"
            >
              <SkillIcon
                iconType={skill.iconType}
                size={18}
                className="text-[var(--text-muted)] group-hover:text-cyan-400 transition-colors"
              />
              <span className="text-sm font-medium text-[var(--text-muted)] group-hover:text-white transition-colors">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
