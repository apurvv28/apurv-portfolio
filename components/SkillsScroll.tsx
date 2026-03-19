"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/skills";
import SkillIcon from "./SkillIcon";

export default function SkillsScroll(): JSX.Element {
  // Use only soft skills for this ribbon animation
  const softSkills = skills.filter((s) => s.category === "soft");
  const scrollingSkills = [...softSkills, ...softSkills, ...softSkills];

  return (
    <section className="relative mt-12 flex min-h-[350px] flex-col items-center justify-center overflow-hidden py-12 sm:min-h-[450px]">
      {/* Background Decor */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-20">
        <div className="h-[400px] w-[800px] rounded-full bg-violet-500/10 blur-[150px]" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-20 mx-auto mb-8 max-w-7xl px-6 text-center"
      >
        <p className="text-[10px] font-bold tracking-[0.4em] text-violet-400 uppercase">Traits</p>
        <h2 className="mt-2 text-3xl font-black tracking-tighter text-white sm:text-5xl uppercase italic">
          Soft <span className="text-violet-400 text-glow">Skills</span>
        </h2>
      </motion.div>

      {/* Ribbon Container */}
      <div className="relative h-[200px] w-full sm:h-[280px]">
        {/* Ribbon 1: Moving Right -> Left, Slanted Down */}
        <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 -rotate-3 scale-110 overflow-hidden bg-gradient-to-r from-cyan-600/10 via-violet-600/10 to-cyan-600/10 py-4 backdrop-blur-sm border-y border-white/5 z-0">
          <motion.div
            className="flex gap-16 sm:gap-24"
            animate={{ x: ["0%", "-33.33%"] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {scrollingSkills.map((skill, index) => (
              <div
                key={`${skill.name}-top-${index}`}
                className="flex items-center gap-4 flex-shrink-0 group"
              >
                <div className="text-2xl text-white opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                  <SkillIcon iconType={skill.iconType} size={30} />
                </div>
                <span className="text-base font-black text-white uppercase tracking-tighter italic">
                  {skill.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Ribbon 2: Moving Left -> Right, Slanted Up */}
        <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 rotate-3 scale-110 overflow-hidden bg-gradient-to-r from-violet-600/20 via-cyan-600/20 to-violet-600/20 py-5 backdrop-blur-md border-y border-white/10 shadow-[0_0_40px_rgba(139,92,246,0.1)] z-10 mix-blend-screen">
          <motion.div
            className="flex gap-20 sm:gap-32"
            animate={{ x: ["-33.33%", "0%"] }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...scrollingSkills].reverse().map((skill, index) => (
              <div
                key={`${skill.name}-bottom-${index}`}
                className="flex items-center gap-5 flex-shrink-0 group"
              >
                <div className="text-3xl text-violet-300 group-hover:text-white transition-all group-hover:drop-shadow-[0_0_10px_rgba(139,92,246,0.5)]">
                  <SkillIcon iconType={skill.iconType} size={36} />
                </div>
                <p className="text-xl font-black text-white uppercase italic tracking-tighter">
                  {skill.name}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
