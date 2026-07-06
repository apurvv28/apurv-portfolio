"use client";

import { motion } from "framer-motion";

type StatusBadgeProps = {
  label: string;
};

export default function StatusBadge({ label }: StatusBadgeProps): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.6 }}
      className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-400/15 bg-amber-400/10 px-4 py-2"
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-300/35" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-300" />
      </span>
      <span className="text-caption font-medium uppercase tracking-[0.2em] text-amber-200/90">
        {label}
      </span>
    </motion.div>
  );
}