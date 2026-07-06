"use client";

import { motion, useReducedMotion } from "framer-motion";

type TextRevealProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "p";
};

export default function TextReveal({
  text,
  className,
  as: Tag = "h1"
}: TextRevealProps): JSX.Element {
  const reducedMotion = useReducedMotion();
  const words = text.split(" ");

  if (reducedMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className} aria-label={text}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline-flex flex-wrap gap-x-[0.3em]">
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            className="inline-block"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.15 + i * 0.12,
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            {word}
          </motion.span>
        ))}
      </span>
    </Tag>
  );
}
