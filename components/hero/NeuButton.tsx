"use client";

import { useState, type MouseEvent, type ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

type NeuButtonProps = {
  variant?: "neu" | "glass";
  href: string;
  external?: boolean;
  className?: string;
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
};

function usePressHandlers(setPressed: (v: boolean) => void) {
  return {
    onMouseDown: () => setPressed(true),
    onMouseUp: () => setPressed(false),
    onMouseLeave: () => setPressed(false),
    onTouchStart: () => setPressed(true),
    onTouchEnd: () => setPressed(false)
  };
}

export default function NeuButton({
  variant = "neu",
  href,
  external,
  className,
  children,
  onClick
}: NeuButtonProps): JSX.Element {
  const [pressed, setPressed] = useState(false);
  const pressHandlers = usePressHandlers(setPressed);

  const baseClasses = cn(
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-body-sm font-medium",
    "transition-all duration-200",
    variant === "neu" ? "neu-raised text-foreground" : "glass-panel text-foreground",
    pressed && "neu-pressed translate-y-0.5",
    !pressed && "hover:-translate-y-0.5",
    className
  );

  const isHash = href.startsWith("#");
  const isPdf = href.endsWith(".pdf");
  const isExternal = external || href.startsWith("http") || isPdf;

  const handleHashClick = (e: MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    const id = href.slice(1);
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    onClick?.(e);
  };

  if (isHash) {
    return (
      <motion.a
        href={href}
        className={baseClasses}
        onClick={handleHashClick}
        whileTap={{ scale: 0.98 }}
        {...pressHandlers}
      >
        {children}
      </motion.a>
    );
  }

  if (isExternal) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={baseClasses}
        onClick={onClick}
        whileTap={{ scale: 0.98 }}
        {...pressHandlers}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.div whileTap={{ scale: 0.98 }} {...pressHandlers}>
      <Link href={href} className={baseClasses} onClick={onClick}>
        {children}
      </Link>
    </motion.div>
  );
}
