"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const ROLES = ["AI/ML Engineer", "Full-Stack Developer", "Competitive Programmer"];

const TYPE_SPEED = 55;
const DELETE_SPEED = 35;
const PAUSE_MS = 2200;

export default function RotatingRole({ className }: { className?: string }): JSX.Element {
  const reducedMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setDisplayText(ROLES[0]);
      return;
    }

    const currentRole = ROLES[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), PAUSE_MS);
    } else if (isDeleting && displayText === "") {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      }, 400);
    } else if (isDeleting) {
      timeout = setTimeout(() => {
        setDisplayText(currentRole.slice(0, displayText.length - 1));
      }, DELETE_SPEED);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(currentRole.slice(0, displayText.length + 1));
      }, TYPE_SPEED);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex, reducedMotion]);

  return (
    <p className={cn("font-heading text-h5 text-foreground-muted", className)}>
      <span className="sr-only">{ROLES.join(", ")}</span>
      <span aria-hidden="true">
        {displayText}
        <motion.span
          className="ml-0.5 inline-block h-[1.1em] w-0.5 bg-foreground align-middle"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.9, repeat: Infinity }}
        />
      </span>
    </p>
  );
}
