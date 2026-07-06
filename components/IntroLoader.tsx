"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTheme } from "@/components/theme/ThemeProvider";
import { useIntro } from "@/components/intro/IntroProvider";
import IntroSpaceship from "@/components/intro/IntroSpaceship";

const FULL_NAME = "Apurv Saktepar";
const TYPE_SPEED = 80;

type Phase = "preload" | "fly" | "turn" | "flash" | "exit";

export default function IntroLoader(): JSX.Element | null {
  const { introComplete, completeIntro, skipIntro } = useIntro();
  const { theme } = useTheme();
  const reducedMotion = useReducedMotion();

  const [phase, setPhase] = useState<Phase>("preload");
  const [typedName, setTypedName] = useState("");

  useEffect(() => {
    if (introComplete || reducedMotion) return;
    const t = window.setTimeout(() => setPhase("fly"), 400);
    return () => clearTimeout(t);
  }, [introComplete, reducedMotion]);

  useEffect(() => {
    if (phase !== "fly" || typedName.length >= FULL_NAME.length) return;
    const t = window.setTimeout(() => {
      setTypedName(FULL_NAME.slice(0, typedName.length + 1));
    }, TYPE_SPEED);
    return () => clearTimeout(t);
  }, [phase, typedName]);

  useEffect(() => {
    if (introComplete || reducedMotion) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    if (phase === "fly" && typedName.length >= FULL_NAME.length) {
      timers.push(setTimeout(() => setPhase("turn"), 700));
    }
    if (phase === "turn") {
      timers.push(setTimeout(() => setPhase("flash"), 1500));
    }
    if (phase === "flash") {
      timers.push(setTimeout(() => setPhase("exit"), 750));
    }
    if (phase === "exit") {
      timers.push(setTimeout(() => completeIntro(), 550));
    }

    return () => timers.forEach(clearTimeout);
  }, [phase, typedName, introComplete, reducedMotion, completeIntro]);

  if (introComplete || reducedMotion) return null;

  const flashColor = theme === "dark" ? "#000000" : "#ffffff";
  const enginesActive = phase === "turn" || phase === "flash";

  const shipAnimate =
    phase === "fly"
      ? { x: "-50%", y: "-50%", scale: 0.72, rotate: -4, opacity: 1 }
      : phase === "turn"
        ? { x: "-50%", y: "-38%", scale: 3.2, rotate: 0, opacity: 1 }
        : { x: "-50%", y: "-32%", scale: 5.5, rotate: 2, opacity: 0 };

  const shipTransition =
    phase === "fly"
      ? { duration: 2.4, ease: [0.22, 1, 0.36, 1] as const }
      : phase === "turn"
        ? { duration: 1.4, ease: [0.65, 0, 0.35, 1] as const }
        : { duration: 0.45, ease: "easeIn" as const };

  return (
    <AnimatePresence>
      <motion.div
        key="intro"
        className="fixed inset-0 z-[20000] overflow-hidden bg-black"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="absolute inset-0 opacity-50" aria-hidden="true">
          {Array.from({ length: 90 }).map((_, i) => (
            <span
              key={i}
              className="absolute h-px w-px rounded-full bg-white"
              style={{
                left: `${(i * 13.7) % 100}%`,
                top: `${(i * 9.3) % 100}%`,
                opacity: 0.15 + (i % 5) * 0.12
              }}
            />
          ))}
        </div>

        {/* Speed lines during turn */}
        {(phase === "turn" || phase === "flash") && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-px bg-white/20"
                style={{
                  top: `${20 + i * 5}%`,
                  width: `${30 + (i % 4) * 15}%`,
                  left: `${(i * 11) % 60}%`
                }}
                initial={{ x: 0, opacity: 0 }}
                animate={{ x: [0, 120], opacity: [0, 0.5, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05 }}
              />
            ))}
          </div>
        )}

        <motion.div
          className="absolute left-1/2 top-1/2 w-[min(94vw,680px)]"
          initial={{ x: "-220%", y: "-50%", scale: 0.38, rotate: 12, opacity: 0 }}
          animate={
            phase === "preload"
              ? { x: "-220%", y: "-50%", scale: 0.38, rotate: 12, opacity: 0 }
              : shipAnimate
          }
          transition={phase === "preload" ? { duration: 0 } : shipTransition}
        >
          <IntroSpaceship
            name={typedName}
            showCursor={phase === "fly" || phase === "turn"}
            enginesActive={enginesActive}
            className="h-auto w-full select-none drop-shadow-[0_24px_48px_rgba(0,0,0,0.55)]"
          />
        </motion.div>

        <button
          type="button"
          onClick={skipIntro}
          className="absolute bottom-8 right-8 z-10 font-mono text-caption uppercase tracking-[0.2em] text-white/35 transition-colors hover:text-white/75"
        >
          Skip intro
        </button>

        <AnimatePresence>
          {(phase === "flash" || phase === "exit") && (
            <motion.div
              className="pointer-events-none absolute inset-0 z-20"
              style={{ backgroundColor: flashColor }}
              initial={{ opacity: 0, scale: 0.15 }}
              animate={
                phase === "exit"
                  ? { opacity: 0, scale: 1.15 }
                  : { opacity: 1, scale: 1.08 }
              }
              exit={{ opacity: 0 }}
              transition={{ duration: phase === "exit" ? 0.55 : 0.7, ease: [0.65, 0, 0.35, 1] }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
