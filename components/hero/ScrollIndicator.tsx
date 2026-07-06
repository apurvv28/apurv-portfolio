"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function ScrollIndicator(): JSX.Element {
  const reducedMotion = useReducedMotion();

  const scrollToNext = (): void => {
    const about = document.getElementById("about");
    if (about) {
      about.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToNext}
      aria-label="Scroll to next section"
      className="group absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
    >
      {/* Satellite ping */}
      <span className="relative flex h-3 w-3 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-satellite-ping rounded-full bg-foreground opacity-20" />
        <span className="relative h-1.5 w-1.5 rounded-full bg-foreground opacity-60" />
      </span>

      <motion.span
        animate={reducedMotion ? undefined : { y: [0, 6, 0] }}
        transition={reducedMotion ? undefined : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="text-foreground-subtle transition-colors group-hover:text-foreground"
      >
        <ChevronDown className="h-5 w-5" strokeWidth={1.5} />
      </motion.span>
    </button>
  );
}
