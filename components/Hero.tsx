"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Porthole from "@/components/hero/Porthole";
import RotatingRole from "@/components/hero/RotatingRole";
import ScrollIndicator from "@/components/hero/ScrollIndicator";
import NeuButton from "@/components/hero/NeuButton";
import TextReveal from "@/components/hero/TextReveal";
import StatusBadge from "@/components/hero/StatusBadge";

export default function Hero(): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : -100]);
  const portholeY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : -50]);
  const astronautY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : -80]);
  const fadeGradientOpacity = useTransform(scrollYProgress, [0.5, 1], [0, 1]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-screen flex-col overflow-hidden pt-28 pb-20"
    >
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-content mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 lg:px-10"
      >
        <div className="grid flex-1 grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Porthole — above text on mobile */}
          <motion.div
            style={{ y: portholeY }}
            className="order-1 flex justify-center lg:order-2 lg:justify-end"
          >
            <Porthole parallaxY={astronautY} className="w-[min(85vw,420px)] lg:w-full" />
          </motion.div>

          {/* Copy + CTAs */}
          <div className="order-2 flex flex-col gap-6 lg:order-1 lg:gap-8">
            <StatusBadge label="Available for Opportunities" />

            <div className="space-y-3">
              <TextReveal
                text="Apurv Saktepar"
                className="font-heading text-display text-foreground"
              />
              <RotatingRole />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.7 }}
              className="max-w-lg text-body-sm leading-relaxed text-foreground-muted sm:text-body"
            >
              Software Development Engineer with strong skills in Development, DevOps, Machine Learning, Multi-cloud Technologies and Scalable System Design. 
Experienced in building AI-powered applications such as RAG and Agentic AI. 
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <NeuButton href="#work" variant="neu">
                View Projects
              </NeuButton>
              <NeuButton href="/resume/apurv.pdf" variant="glass" external>
                Download Resume
              </NeuButton>
              <NeuButton href="#contact" variant="neu">
                Contact Me
              </NeuButton>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <ScrollIndicator />

      <motion.div
        style={{ opacity: fadeGradientOpacity }}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-surface"
        aria-hidden="true"
      />
    </section>
  );
}
