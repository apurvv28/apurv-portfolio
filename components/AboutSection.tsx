"use client";

import { motion } from "framer-motion";

export default function AboutSection(): JSX.Element {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="mx-auto mt-24 max-w-6xl px-6 sm:mt-32"
    >
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="glass-card rounded-[2rem] border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 p-7 sm:p-12"
      >
        <p className="text-[10px] font-semibold tracking-[0.3em] text-cyan-400/80 uppercase sm:text-xs">
          About
        </p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Apurv <span className="text-cyan-400">Saktepar</span>
        </h2>

        <div className="mt-8 max-w-4xl space-y-6 text-base leading-relaxed text-[var(--text-muted)] sm:text-lg lg:text-xl">
          <p>
            I&apos;m a software engineer focused on <span className="font-medium text-[var(--text-main)]">DBMS, machine learning, multi-cloud systems, and scalable system design</span>. Currently completing my B.Tech in Computer Science and Engineering (AI) at Vishwakarma Institute of Technology, Pune, with a 9.52 CGPA, after a Diploma in Computer Engineering from Government Polytechnic, Pune (93.27%).
          </p>
          <p>
            My work centers on building <span className="font-medium text-[var(--text-main)]">AI-powered applications</span> such as RAG pipelines and multi-agent systems orchestrated with LangGraph and CrewAI, on top of a full-stack foundation in React, Next.js, FastAPI, and Node.js. On the infrastructure side, I work across AWS and GCP with Docker, Kubernetes, and Terraform for deployment and DevOps.
          </p>
          <p>
            That shows up in projects like <span className="font-medium text-[var(--text-main)]">SamayVidya</span>, a six-agent scheduling system adopted by VIT Pune&apos;s CSE-AI department; <span className="font-medium text-[var(--text-main)]">EMR 2.0</span>, a voice-first medical documentation platform built on a seven-agent pipeline; and <span className="font-medium text-[var(--text-main)]">DevForge</span>, a multi-LLM CI/CD generator I published to npm. Along the way I&apos;ve led winning teams at Code Apex 2.0, Smart India Hackathon, and placed at Cavista Technologies and IMPETUS Project Expo.
          </p>
        </div>
      </motion.div>
    </motion.section>
  );
}