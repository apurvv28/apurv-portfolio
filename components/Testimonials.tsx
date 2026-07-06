"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Pranjal Bannore",
    role: "Senior Cloud Architect, TCS Pune",
    quote:
      "Apurv brings high communication skills, a strong sense of leadership and a deep understanding of software architecture. He consistently delivers high-quality work.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pranjal"
  },
  {
    name: "Pritam Chhannure",
    role: "CEO, iBid Logistics Pvt. Ltd., Solapur",
    quote:
      "Strong architecture instincts, great communication, and a bias for shipping. Apurv consistently turns ideas into production-grade outcomes.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pritam"
  },
  {
    name: "Darshan Dodal",
    role: "CEO, Bits and Volts Pvt. Ltd., Pune",
    quote:
      "Apurv is a skilled frontend developer with a strong sense of design and user experience. As an intern he delivered high-quality work and was a valuable asset to our team.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Darshan"
  }
];

function SignalWave(): JSX.Element {
  return (
    <svg viewBox="0 0 48 12" className="h-3 w-12 text-foreground-subtle" aria-hidden="true">
      {[0, 8, 16, 24, 32, 40].map((x, i) => (
        <motion.rect
          key={x}
          x={x}
          y={4}
          width={3}
          height={4}
          rx={1}
          fill="currentColor"
          animate={{ height: [4, 10, 4], y: [4, 1, 4] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut"
          }}
        />
      ))}
    </svg>
  );
}

export default function Testimonials(): JSX.Element {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const dragRef = useRef(0);
  const reducedMotion = useReducedMotion();

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused, next, reducedMotion]);

  const item = testimonials[index];

  return (
    <section id="testimonials" className="relative mx-auto mt-24 max-w-5xl px-6 sm:mt-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
      >
        <SectionLabel index="07. TRANSMISSIONS" title="Incoming Transmissions" kicker="COMMS" />

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.article
              key={item.name}
              drag={reducedMotion ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -dragRef.current - 60) next();
                else if (info.offset.x > dragRef.current + 60) prev();
              }}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel-strong glass-scrim cursor-grab rounded-3xl p-8 active:cursor-grabbing sm:p-10"
            >
              <div className="flex items-center justify-between gap-4">
                <SignalWave />
                <span className="font-mono text-caption uppercase tracking-[0.2em] text-foreground-subtle">
                  Signal {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <blockquote className="mt-6 text-body leading-relaxed text-foreground-muted sm:text-lg">
                &ldquo;{item.quote}&rdquo;
              </blockquote>

              <div className="mt-8 flex items-center gap-4">
                <div className="neu-raised h-14 w-14 shrink-0 overflow-hidden rounded-full p-0.5">
                  <img
                    src={item.avatar}
                    alt=""
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-heading text-h6 text-foreground">{item.name}</p>
                  <p className="text-caption text-foreground-subtle">{item.role}</p>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous transmission"
              className="neu-raised flex h-10 w-10 items-center justify-center rounded-full transition-transform hover:-translate-y-0.5 active:neu-pressed"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
            </button>

            {/* Orbit dot indicators */}
            <div className="flex items-center gap-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to transmission ${i + 1}`}
                  className="relative flex h-4 w-4 items-center justify-center"
                >
                  <span
                    className={cn(
                      "absolute h-3 w-3 rounded-full border border-foreground/20 transition-all duration-300",
                      i === index && "border-foreground/50"
                    )}
                  />
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full bg-foreground transition-all duration-300",
                      i === index ? "opacity-80 scale-125" : "opacity-25"
                    )}
                  />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Next transmission"
              className="neu-raised flex h-10 w-10 items-center justify-center rounded-full transition-transform hover:-translate-y-0.5 active:neu-pressed"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
