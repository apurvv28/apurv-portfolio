"use client";

import { motion } from "framer-motion";

type IntroSpaceshipProps = {
  name: string;
  showCursor?: boolean;
  enginesActive?: boolean;
  className?: string;
};

export default function IntroSpaceship({
  name,
  showCursor = false,
  enginesActive = false,
  className
}: IntroSpaceshipProps): JSX.Element {
  return (
    <svg
      viewBox="0 0 960 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="scene-glow" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#8b8b8b" stopOpacity="0.34" />
          <stop offset="45%" stopColor="#4b5563" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hull-core" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#f7f7f7" />
          <stop offset="38%" stopColor="#d4d4d4" />
          <stop offset="72%" stopColor="#7c7c7c" />
          <stop offset="100%" stopColor="#353535" />
        </linearGradient>
        <linearGradient id="hull-side" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6b7280" />
          <stop offset="32%" stopColor="#f4f4f5" />
          <stop offset="72%" stopColor="#b5b5b5" />
          <stop offset="100%" stopColor="#404040" />
        </linearGradient>
        <linearGradient id="hull-shadow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4b5563" />
          <stop offset="100%" stopColor="#111111" />
        </linearGradient>
        <linearGradient id="accent-line" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.38" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="canopy-glass" x1="18%" y1="0%" x2="82%" y2="100%">
          <stop offset="0%" stopColor="#7c7c7c" stopOpacity="0.9" />
          <stop offset="38%" stopColor="#232323" stopOpacity="0.94" />
          <stop offset="100%" stopColor="#050505" stopOpacity="0.98" />
        </linearGradient>
        <linearGradient id="canopy-shine" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="panel-line" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="engine-glow" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="55%" stopColor="#cbd5e1" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="thruster-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="35%" stopColor="#fef3c7" />
          <stop offset="65%" stopColor="#d4d4d4" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="plume" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="32%" stopColor="#dbeafe" stopOpacity="0.84" />
          <stop offset="70%" stopColor="#64748b" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <filter id="ship-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="soft-shadow" x="-12%" y="-14%" width="124%" height="142%">
          <feDropShadow dx="0" dy="14" stdDeviation="18" floodColor="#000" floodOpacity="0.5" />
        </filter>
      </defs>

      <ellipse cx="480" cy="292" rx="320" ry="140" fill="url(#scene-glow)" opacity="0.85" />
      <ellipse cx="480" cy="410" rx="312" ry="28" fill="#000" opacity="0.32" />

      <g filter="url(#soft-shadow)">
        <path d="M286 344 L474 256 L674 344 L474 390 Z" fill="url(#hull-shadow)" opacity="0.65" />

        <path d="M214 314 L302 270 L352 292 L282 354 Z" fill="url(#hull-side)" />
        <path d="M746 314 L658 270 L608 292 L678 354 Z" fill="url(#hull-side)" />
        <path d="M250 326 L334 292" stroke="url(#accent-line)" strokeWidth="2" />
        <path d="M710 326 L626 292" stroke="url(#accent-line)" strokeWidth="2" />

        <path d="M180 292 L272 260 L314 278 L248 334 L180 316 Z" fill="#2f2f2f" opacity="0.95" />
        <path d="M780 292 L688 260 L646 278 L712 334 L780 316 Z" fill="#2f2f2f" opacity="0.95" />

        <path d="M310 210 L650 210 L724 280 L618 354 L340 354 L236 280 Z" fill="url(#hull-core)" />
        <path d="M346 238 L614 238 L670 282 L584 326 L376 326 L290 282 Z" fill="#f5f5f5" opacity="0.28" />
        <path d="M320 230 L640 230" stroke="url(#accent-line)" strokeWidth="2.2" />
        <path d="M302 250 C390 236, 570 236, 658 250" stroke="url(#panel-line)" strokeWidth="1.5" fill="none" />

        <path d="M332 202 L432 146 L528 146 L628 202 L600 224 L360 224 Z" fill="url(#hull-side)" />
        <path d="M376 172 L484 172 L554 198 L484 214 L412 214 L340 198 Z" fill="url(#hull-shadow)" opacity="0.52" />

        <ellipse cx="480" cy="176" rx="92" ry="50" fill="url(#canopy-glass)" />
        <ellipse cx="480" cy="176" rx="92" ry="50" stroke="#ffffff" strokeOpacity="0.24" strokeWidth="1.6" />
        <path d="M414 162 C450 142, 510 142, 546 162 L528 176 C505 162, 455 162, 432 176 Z" fill="url(#canopy-shine)" />
        <path d="M448 154 C470 147, 490 147, 512 154" stroke="#ffffff" strokeOpacity="0.38" strokeWidth="2" strokeLinecap="round" />

        <path d="M404 198 L556 198 L580 220 L536 232 L424 232 L380 220 Z" fill="#e5e5e5" opacity="0.84" />
        <path d="M356 224 L604 224 L620 242 L580 254 L380 254 L340 242 Z" fill="#1a1a1a" opacity="0.3" />

        <path d="M452 226 L508 226 L522 238 L496 248 L464 248 L438 238 Z" fill="#0a0a0a" opacity="0.92" />
        <path d="M472 230 L488 230 L494 236 L488 242 L472 242 L466 236 Z" fill="#ffffff" opacity="0.32" />

        <path d="M420 258 L540 258 L560 272 L526 282 L434 282 L400 272 Z" fill="#171717" opacity="0.5" />
        <path d="M356 276 L604 276" stroke="url(#panel-line)" strokeWidth="1.4" />
        <path d="M376 286 L584 286" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="2" />

        <path d="M284 332 L368 308 L396 320 L336 364 L278 352 Z" fill="#4b4b4b" opacity="0.95" />
        <path d="M676 332 L592 308 L564 320 L624 364 L682 352 Z" fill="#4b4b4b" opacity="0.95" />

        <path d="M388 360 L572 360 L596 374 L520 388 L440 388 L364 374 Z" fill="#111111" opacity="0.62" />
        <path d="M408 370 L552 370" stroke="url(#accent-line)" strokeWidth="1.8" />

        <path d="M428 378 L532 378 L548 390 L512 404 L448 404 L412 390 Z" fill="url(#hull-shadow)" opacity="0.92" />

        <path d="M308 362 L404 332" stroke="#ffffff" strokeOpacity="0.12" strokeWidth="1" />
        <path d="M652 362 L556 332" stroke="#ffffff" strokeOpacity="0.12" strokeWidth="1" />
        <path d="M450 214 L450 352" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
        <path d="M510 214 L510 352" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
        <path d="M390 248 L390 330" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
        <path d="M570 248 L570 330" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />

        {[
          [360, 294],
          [396, 302],
          [432, 308],
          [528, 308],
          [564, 302],
          [600, 294]
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.8" fill="#ffffff" opacity="0.28" />
        ))}

        <rect x="352" y="292" width="256" height="36" rx="5" fill="#0a0a0a" fillOpacity="0.24" stroke="#ffffff" strokeOpacity="0.12" />
        <rect x="358" y="296" width="244" height="28" rx="3" fill="#111111" fillOpacity="0.52" />
      </g>

      <foreignObject x="360" y="297" width="240" height="26">
        <div
          className="flex h-full items-center justify-center font-heading text-[11px] font-bold uppercase tracking-[0.32em] text-white/90"
          style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}
        >
          <span>{name}</span>
          {showCursor && <span className="intro-type-cursor ml-0.5 inline-block h-[0.9em] w-0.5 bg-white/80" />}
        </div>
      </foreignObject>

      {/* Engine thrust — animated on turn */}
      {enginesActive && (
        <g filter="url(#ship-glow)">
          <motion.path
            d="M156 344 L64 314 L44 326 L118 372 L176 360 Z"
            fill="url(#engine-glow)"
            animate={{ opacity: [0.35, 0.95, 0.35], scaleX: [1, 1.28, 1] }}
            transition={{ duration: 0.34, repeat: Infinity }}
            style={{ transformOrigin: "118px 344px" }}
          />
          <motion.path
            d="M804 344 L896 314 L916 326 L842 372 L784 360 Z"
            fill="url(#engine-glow)"
            animate={{ opacity: [0.35, 0.95, 0.35], scaleX: [1, 1.28, 1] }}
            transition={{ duration: 0.34, repeat: Infinity, delay: 0.08 }}
            style={{ transformOrigin: "842px 344px" }}
          />
          <motion.ellipse
            cx="118"
            cy="344"
            rx="24"
            ry="16"
            fill="url(#thruster-core)"
            animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.15, 1] }}
            transition={{ duration: 0.3, repeat: Infinity }}
          />
          <motion.ellipse
            cx="842"
            cy="344"
            rx="24"
            ry="16"
            fill="url(#thruster-core)"
            animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.15, 1] }}
            transition={{ duration: 0.3, repeat: Infinity, delay: 0.06 }}
          />
          <motion.ellipse
            cx="118"
            cy="344"
            rx="36"
            ry="20"
            fill="url(#plume)"
            animate={{ opacity: [0.28, 0.72, 0.28], scale: [1, 1.12, 1] }}
            transition={{ duration: 0.28, repeat: Infinity }}
          />
          <motion.ellipse
            cx="842"
            cy="344"
            rx="36"
            ry="20"
            fill="url(#plume)"
            animate={{ opacity: [0.28, 0.72, 0.28], scale: [1, 1.12, 1] }}
            transition={{ duration: 0.28, repeat: Infinity, delay: 0.06 }}
          />
        </g>
      )}

      {/* Forward light sweep */}
      <motion.rect
        x="340"
        y="146"
        width="88"
        height="210"
        fill="url(#canopy-shine)"
        opacity="0.16"
        animate={{ x: [340, 560, 340] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ transform: "skewX(-14deg)" }}
      />
    </svg>
  );
}
