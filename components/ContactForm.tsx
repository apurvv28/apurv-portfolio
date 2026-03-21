"use client";

import { type ChangeEvent, type FormEvent, useState } from "react";
import Link from "next/link";
import { Mail, Github, Linkedin, Send, ArrowUpRight, Clock3, MapPin, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const socials = [
  { label: "Email", icon: Mail, href: "mailto:apurvsaktepar2806@gmail.com", value: "apurvsaktepar2806@gmail.com" },
  { label: "GitHub", icon: Github, href: "https://github.com/apurvv28", value: "@apurvv28" },
  { label: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/apurv-saktepar-054a17281/", value: "Apurv Saktepar" }
];

const CONTACT_EMAIL = "apurvsaktepar2806@gmail.com";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialFormState: FormState = {
  name: "",
  email: "",
  subject: "",
  message: ""
};

export default function ContactForm(): JSX.Element {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [isSending, setIsSending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setIsSending(true);

    const subjectLine = formState.subject.trim() || "Portfolio inquiry";
    const body = [
      `Name: ${formState.name}`,
      `Email: ${formState.email}`,
      "",
      formState.message
    ].join("\n");

    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;

    setTimeout(() => {
      setIsSending(false);
      setIsSubmitted(true);
      setFormState(initialFormState);
    }, 300);
  };

  return (
    <section id="contact" className="relative mx-auto mt-24 max-w-7xl px-6 pb-20 sm:mt-32 sm:pb-32">
      <div className="pointer-events-none absolute inset-x-6 top-0 -z-10 h-64 rounded-[2rem] bg-[radial-gradient(circle_at_20%_20%,rgba(6,182,212,0.16),transparent_60%),radial-gradient(circle_at_80%_40%,rgba(16,185,129,0.12),transparent_55%)] blur-2xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="glass-card overflow-hidden rounded-[2.5rem] border border-cyan-500/20 bg-[#050a12]/75 p-3 sm:p-4"
      >
        <div className="grid gap-3 lg:grid-cols-12">
          <div className="relative overflow-hidden rounded-[1.8rem] border border-cyan-500/20 bg-[linear-gradient(155deg,#0c2230_0%,#081723_42%,#050912_100%)] p-8 sm:p-10 lg:col-span-5">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-400/15 blur-3xl" />

            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-[10px] font-semibold tracking-[0.24em] text-cyan-300 uppercase sm:text-xs">
              <Sparkles size={14} />
              Start A Project
            </p>

            <h2 className="mt-6 text-3xl font-bold leading-[1.05] text-white sm:text-4xl lg:text-5xl">
              Let&apos;s turn your next idea into a fast, polished product.
            </h2>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-cyan-50/75 sm:text-base">
              Available for product builds, performance-focused frontend engineering, and AI-first feature work.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-cyan-200/80 uppercase">
                  <Clock3 size={14} />
                  Response Time
                </p>
                <p className="mt-2 text-sm text-white">Within 24 hours</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-cyan-200/80 uppercase">
                  <MapPin size={14} />
                  Location
                </p>
                <p className="mt-2 text-sm text-white">India, Remote Worldwide</p>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ x: 4 }}
                  className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 transition-colors hover:border-cyan-400/30 hover:bg-cyan-400/10"
                >
                  <span className="flex items-center gap-3">
                    <social.icon size={16} className="text-cyan-300" />
                    <span>
                      <span className="font-semibold">{social.label}</span>
                      <span className="ml-2 text-cyan-100/70">{social.value}</span>
                    </span>
                  </span>
                  <ArrowUpRight size={15} className="text-cyan-200/60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </motion.a>
              ))}
            </div>

            <Link
              href="/resume/apurv.pdf"
              target="_blank"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-xs font-semibold tracking-[0.14em] text-cyan-100 uppercase transition-colors hover:border-cyan-300/40 hover:text-white"
            >
              View Resume
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="rounded-[1.8rem] border border-white/10 bg-[#070e18]/90 p-8 sm:p-10 lg:col-span-7">
            <div className="mb-7">
              <p className="text-[10px] font-semibold tracking-[0.24em] text-cyan-300/80 uppercase sm:text-xs">Send Details</p>
              <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">Share your brief and timeline</h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
                Use the form below and I&apos;ll draft a clear plan with scope, stack, and milestones.
              </p>
            </div>

            <form className="space-y-5" onSubmit={onSubmit} aria-label="Contact form">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Name</span>
                  <input
                    name="name"
                    value={formState.name}
                    onChange={onInputChange}
                    aria-label="Name"
                    required
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3.5 text-sm text-white placeholder-zinc-600 outline-none transition-all focus:border-cyan-400/40 focus:bg-cyan-400/[0.03]"
                    placeholder="Your full name"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Email</span>
                  <input
                    name="email"
                    value={formState.email}
                    onChange={onInputChange}
                    aria-label="Email"
                    type="email"
                    required
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3.5 text-sm text-white placeholder-zinc-600 outline-none transition-all focus:border-cyan-400/40 focus:bg-cyan-400/[0.03]"
                    placeholder="name@company.com"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Subject</span>
                <input
                  name="subject"
                  value={formState.subject}
                  onChange={onInputChange}
                  aria-label="Subject"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3.5 text-sm text-white placeholder-zinc-600 outline-none transition-all focus:border-cyan-400/40 focus:bg-cyan-400/[0.03]"
                  placeholder="Landing page build, dashboard redesign, AI feature integration..."
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Message</span>
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={onInputChange}
                  aria-label="Message"
                  rows={6}
                  required
                  className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-white placeholder-zinc-600 outline-none transition-all focus:border-cyan-400/40 focus:bg-cyan-400/[0.03]"
                  placeholder="Tell me goals, timeline, constraints, and anything important about the product."
                />
              </label>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-zinc-500">Submitting opens your email app with all details prefilled.</p>
                {isSubmitted && (
                  <p className="text-xs font-medium text-emerald-300">Draft created. Looking forward to your message.</p>
                )}
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.01, y: -1 }}
                whileTap={{ scale: 0.99 }}
                disabled={isSending}
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full border border-cyan-300/40 bg-[linear-gradient(90deg,#ecfeff_0%,#a5f3fc_35%,#67e8f9_100%)] px-8 py-4 text-sm font-bold text-slate-900 transition-all hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <Send size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                {isSending ? "Preparing Draft..." : "Send Inquiry"}
              </motion.button>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
