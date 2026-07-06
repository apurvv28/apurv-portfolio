"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function AnimatedCursor(): JSX.Element | null {
  const [enabled, setEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const reducedMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothOptions = { damping: 22, stiffness: 280, mass: 0.55 };
  const smoothX = useSpring(mouseX, smoothOptions);
  const smoothY = useSpring(mouseY, smoothOptions);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const noCustomCursor = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateEnabled = (): void => {
      setEnabled(finePointer.matches && !noCustomCursor.matches && !reducedMotion);
    };

    updateEnabled();
    finePointer.addEventListener("change", updateEnabled);
    noCustomCursor.addEventListener("change", updateEnabled);

    return () => {
      finePointer.removeEventListener("change", updateEnabled);
      noCustomCursor.removeEventListener("change", updateEnabled);
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent): void => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseLeave = (): void => setIsVisible(false);

    const handleMouseOver = (e: MouseEvent): void => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, input, textarea, select, label, [role='button']");
      const pointerCursor =
        target.dataset?.cursor === "pointer" ||
        window.getComputedStyle(target).cursor === "pointer";
      setIsHovering(Boolean(interactive || pointerCursor));
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [enabled, mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>

      {/* Trailing orbit ring */}
      <motion.div
        className={cn(
          "pointer-events-none fixed left-0 top-0 z-[10000] rounded-full border bg-surface/5 backdrop-blur-[1px] transition-colors duration-200",
          isHovering ? "border-foreground/50" : "border-foreground/25"
        )}
        style={{
          x: smoothX,
          y: smoothY,
          opacity: isVisible ? 1 : 0,
          translateX: "-50%",
          translateY: "-50%",
          boxShadow: "0 0 18px var(--glass-inner-glow), inset 0 0 12px var(--glass-shadow)"
        }}
        animate={{
          width: isHovering ? 52 : 30,
          height: isHovering ? 52 : 30
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        aria-hidden="true"
      >
        {/* Dashed orbit path */}
        <motion.div
          className="absolute inset-0 rounded-full border border-dashed border-foreground/15"
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />

        {/* Crosshair ticks */}
        <span className="absolute left-1/2 top-0 h-1.5 w-px -translate-x-1/2 bg-foreground/40" />
        <span className="absolute bottom-0 left-1/2 h-1.5 w-px -translate-x-1/2 bg-foreground/40" />
        <span className="absolute left-0 top-1/2 h-px w-1.5 -translate-y-1/2 bg-foreground/40" />
        <span className="absolute right-0 top-1/2 h-px w-1.5 -translate-y-1/2 bg-foreground/40" />
      </motion.div>

      {/* Inner star / reticle dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[10001]"
        style={{
          x: mouseX,
          y: mouseY,
          opacity: isVisible ? 1 : 0,
          translateX: "-50%",
          translateY: "-50%"
        }}
        aria-hidden="true"
      >
        <motion.div
          className="rounded-full bg-foreground"
          style={{ boxShadow: "0 0 10px var(--glass-inner-glow)" }}
          animate={{
            width: isHovering ? 0 : 5,
            height: isHovering ? 0 : 5,
            opacity: isHovering ? 0 : 1
          }}
          transition={{ duration: 0.18 }}
        />

        {/* Hover: small targeting ring */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/50"
          animate={{
            width: isHovering ? 10 : 0,
            height: isHovering ? 10 : 0,
            opacity: isHovering ? 1 : 0
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </>
  );
}
