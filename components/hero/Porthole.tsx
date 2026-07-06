"use client";

import Image from "next/image";
import { motion, useReducedMotion, type MotionValue } from "framer-motion";
import { SPACE_ASSETS, spaceImageClass } from "@/lib/space-assets";
import { cn } from "@/lib/utils";

type PortholeProps = {
  parallaxY?: MotionValue<number>;
  className?: string;
};

export default function Porthole({ parallaxY, className }: PortholeProps): JSX.Element {
  const reducedMotion = useReducedMotion();

  return (
    <div className={cn("relative mx-auto aspect-square w-full max-w-[420px] lg:max-w-[480px]", className)}>
      <div className="glass-panel-strong absolute inset-0 rounded-full p-3 sm:p-4">
        <div className="neu-flat relative h-full w-full overflow-hidden rounded-full p-4 sm:p-5">
          <div className="relative h-full w-full overflow-hidden rounded-full bg-surface-secondary">
            <div
              className="absolute inset-0 opacity-60"
              style={{
                background:
                  "radial-gradient(circle at 35% 30%, var(--surface-mid), var(--surface-base) 70%)"
              }}
            />

            {!reducedMotion && (
              <div className="absolute inset-0 overflow-hidden rounded-full">
                <div className="absolute inset-0 animate-light-sweep">
                  <div
                    className="h-full w-1/3"
                    style={{
                      background:
                        "linear-gradient(105deg, transparent 0%, var(--glass-inner-glow) 45%, transparent 100%)"
                    }}
                  />
                </div>
              </div>
            )}

            <motion.div style={{ y: parallaxY }} className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="relative flex h-[78%] w-[78%] items-center justify-center"
                animate={
                  reducedMotion
                    ? undefined
                    : { y: [0, -14, 0], rotate: [-1.5, 1.5, -1.5] }
                }
                transition={
                  reducedMotion
                    ? undefined
                    : { duration: 7, repeat: Infinity, ease: "easeInOut" }
                }
              >
                <Image
                  src={SPACE_ASSETS.astronautPrimary}
                  alt="Astronaut illustration"
                  fill
                  className={`object-contain object-center drop-shadow-[0_8px_24px_var(--glass-shadow)] ${spaceImageClass}`}
                  sizes="(min-width: 1024px) 480px, 85vw"
                  priority
                />
              </motion.div>
            </motion.div>

            <div
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{
                boxShadow: "inset 0 0 40px var(--glass-shadow), inset 0 2px 0 var(--glass-inner-glow)"
              }}
            />
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute -inset-1 rounded-full opacity-40"
        style={{
          background:
            "conic-gradient(from 180deg, transparent, var(--glass-border), transparent, var(--glass-border), transparent)"
        }}
      />
    </div>
  );
}
