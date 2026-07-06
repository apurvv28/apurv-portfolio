"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "@/components/theme/ThemeProvider";
import { SPACE_ASSETS, spaceImageClass } from "@/lib/space-assets";
import { cn } from "@/lib/utils";

export default function ThemeToggle(): JSX.Element | null {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "fixed right-4 top-[5.5rem] z-toggle flex h-11 w-11 items-center justify-center overflow-hidden rounded-full",
        "neu-raised transition-transform hover:-translate-y-0.5 active:neu-pressed",
        "sm:right-6 sm:top-6"
      )}
    >
      <motion.div
        className="relative h-7 w-7"
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.45, ease: "easeInOut" }}
      >
        <Image
          src={SPACE_ASSETS.planet}
          alt=""
          fill
          className={`object-contain ${spaceImageClass}`}
          sizes="28px"
        />
        {/* Day/night shadow overlay */}
        {/* <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: "var(--surface-base)" }}
          initial={false}
          animate={{ opacity: isDark ? 0.55 : 0.1, x: isDark ? "30%" : "-20%" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        /> */}
      </motion.div>
    </button>
  );
}
