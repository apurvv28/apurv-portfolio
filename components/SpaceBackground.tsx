"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { useTheme } from "@/components/theme/ThemeProvider";
import { SPACE_ASSETS, spaceImageClass } from "@/lib/space-assets";

type Star = {
  x: number;
  y: number;
  size: number;
  opacity: number;
  depth: number;
};

const STAR_COUNT = 180;

function createStars(width: number, height: number): Star[] {
  return Array.from({ length: STAR_COUNT }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 1.6 + 0.4,
    opacity: Math.random() * 0.6 + 0.2,
    depth: Math.random() * 0.8 + 0.2
  }));
}

function BackgroundAstronaut({ opacity }: { opacity: number }): JSX.Element {
  return (
    <div
      className="pointer-events-none absolute right-[6%] top-[16%] hidden opacity-70 md:block lg:right-[10%] lg:top-[20%]"
      style={{ opacity }}
      aria-hidden="true"
    >
      <div className="relative h-36 w-28 lg:h-48 lg:w-36">
        <Image
          src={SPACE_ASSETS.astronautSecondary}
          alt=""
          fill
          className={`object-contain object-center ${spaceImageClass}`}
          sizes="192px"
        />
      </div>
    </div>
  );
}

export default function SpaceBackground(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const { theme, mounted } = useTheme();

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    const starColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--star-color")
      .trim();

    for (const star of starsRef.current) {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = starColor || "rgba(255,255,255,0.7)";
      ctx.globalAlpha = star.opacity;
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }, []);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    starsRef.current = createStars(width, height);
    draw();
  }, [draw]);

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [resize]);

  useEffect(() => {
    draw();
  }, [theme, mounted, draw]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-background overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-surface" />
      <div
        className="absolute inset-0 opacity-25 dark:opacity-20"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, var(--surface-mid), transparent 70%)"
        }}
      />

      <div className="absolute -right-[8%] top-[8%] hidden opacity-[0.07] dark:opacity-[0.12] lg:block">
        <Image
          src={SPACE_ASSETS.planet}
          alt=""
          width={320}
          height={320}
          className={`h-48 w-48 object-contain lg:h-64 lg:w-64 ${spaceImageClass}`}
        />
      </div>

      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <BackgroundAstronaut opacity={0.12} />
    </div>
  );
}
