"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "@/components/theme/ThemeProvider";
import { SPACE_ASSETS, spaceImageClass } from "@/lib/space-assets";

type Star = {
  x: number;
  y: number;
  size: number;
  opacity: number;
  depth: number;
};

type ShootingStar = {
  id: number;
  top: number;
  left: number;
  delay: number;
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
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className="pointer-events-none absolute right-[6%] top-[16%] hidden md:block lg:right-[10%] lg:top-[20%]"
      style={{ opacity }}
      aria-hidden="true"
    >
      <motion.div
        className="relative h-36 w-28 lg:h-48 lg:w-36"
        animate={
          reducedMotion
            ? undefined
            : { y: [0, -18, 0], rotate: [-2, 2, -2] }
        }
        transition={
          reducedMotion
            ? undefined
            : { duration: 10, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <Image
          src={SPACE_ASSETS.astronautSecondary}
          alt=""
          fill
          className={`object-contain object-center ${spaceImageClass}`}
          sizes="192px"
        />
      </motion.div>
    </motion.div>
  );
}

export default function SpaceBackground(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number>(0);
  const { theme, mounted } = useTheme();
  const reducedMotion = useReducedMotion();
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const [astronautOpacity, setAstronautOpacity] = useState(0.08);
  const shootingIdRef = useRef(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    const scrollOffset = reducedMotion ? 0 : scrollRef.current * 0.15;
    const mouseX = reducedMotion ? 0 : mouseRef.current.x * 0.02;
    const mouseY = reducedMotion ? 0 : mouseRef.current.y * 0.02;

    const starColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--star-color")
      .trim();

    for (const star of starsRef.current) {
      const parallaxX = mouseX * star.depth + scrollOffset * star.depth * 0.3;
      const parallaxY = mouseY * star.depth + scrollOffset * star.depth * 0.15;
      let x = (star.x + parallaxX) % width;
      let y = (star.y + parallaxY) % height;
      if (x < 0) x += width;
      if (y < 0) y += height;

      ctx.beginPath();
      ctx.arc(x, y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = starColor || "rgba(255,255,255,0.7)";
      ctx.globalAlpha = star.opacity;
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }, [reducedMotion]);

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
    if (reducedMotion) {
      draw();
      return;
    }

    const onScroll = (): void => {
      scrollRef.current = window.scrollY;
    };
    const onMouse = (e: MouseEvent): void => {
      mouseRef.current = {
        x: e.clientX - window.innerWidth / 2,
        y: e.clientY - window.innerHeight / 2
      };
    };

    const loop = (): void => {
      draw();
      frameRef.current = requestAnimationFrame(loop);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse, { passive: true });
    frameRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
      cancelAnimationFrame(frameRef.current);
    };
  }, [draw, reducedMotion]);

  useEffect(() => {
    draw();
  }, [theme, mounted, draw]);

  useEffect(() => {
    if (reducedMotion) return;

    const spawn = (): void => {
      const id = shootingIdRef.current++;
      const star: ShootingStar = {
        id,
        top: Math.random() * 60 + 5,
        left: Math.random() * 50 + 40,
        delay: 0
      };
      setShootingStars((prev) => [...prev.slice(-3), star]);
      window.setTimeout(() => {
        setShootingStars((prev) => prev.filter((s) => s.id !== id));
      }, 1400);
    };

    spawn();
    const interval = window.setInterval(spawn, 6000 + Math.random() * 8000);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  useEffect(() => {
    const hero = document.getElementById("home");
    const about = document.getElementById("about");
    if (!hero && !about) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((e) => e.isIntersecting);
        setAstronautOpacity(visible ? 0.12 : 0.05);
      },
      { threshold: 0.15 }
    );

    if (hero) observer.observe(hero);
    if (about) observer.observe(about);
    return () => observer.disconnect();
  }, []);

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

      {/* Distant planet */}
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

      {!reducedMotion &&
        shootingStars.map((star) => (
          <div
            key={star.id}
            className="absolute h-px w-24 origin-right animate-shooting-star"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              background:
                "linear-gradient(90deg, transparent, var(--shooting-star), transparent)",
              transform: "rotate(-25deg)"
            }}
          />
        ))}

      <BackgroundAstronaut opacity={astronautOpacity} />
    </div>
  );
}
