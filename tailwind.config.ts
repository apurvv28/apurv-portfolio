import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "var(--surface-base)",
          secondary: "var(--surface-secondary)",
          raised: "var(--surface-raised)",
          mid: "var(--surface-mid)",
          deep: "var(--surface-deep)"
        },
        foreground: {
          DEFAULT: "var(--text-main)",
          muted: "var(--text-muted)",
          subtle: "var(--text-subtle)"
        },
        border: {
          glass: "var(--glass-border)",
          neu: "var(--neu-border)"
        }
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "-apple-system", "sans-serif"],
        heading: ["var(--font-heading)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"]
      },
      fontSize: {
        display: ["clamp(2.75rem, 6vw, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "700" }],
        h1: ["clamp(2.25rem, 4.5vw, 3.5rem)", { lineHeight: "1.1", letterSpacing: "-0.025em", fontWeight: "700" }],
        h2: ["clamp(1.875rem, 3.5vw, 2.75rem)", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "600" }],
        h3: ["clamp(1.5rem, 2.5vw, 2rem)", { lineHeight: "1.2", letterSpacing: "-0.015em", fontWeight: "600" }],
        h4: ["1.375rem", { lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "600" }],
        h5: ["1.125rem", { lineHeight: "1.35", letterSpacing: "-0.005em", fontWeight: "600" }],
        h6: ["1rem", { lineHeight: "1.4", fontWeight: "600" }],
        body: ["1rem", { lineHeight: "1.65" }],
        "body-sm": ["0.875rem", { lineHeight: "1.6" }],
        caption: ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.02em" }]
      },
      boxShadow: {
        "neu-raised-dark": "8px 8px 16px var(--neu-shadow-dark), -8px -8px 16px var(--neu-shadow-light)",
        "neu-pressed-dark": "inset 6px 6px 12px var(--neu-shadow-dark), inset -6px -6px 12px var(--neu-shadow-light)",
        "neu-flat-dark": "4px 4px 8px var(--neu-shadow-dark), -4px -4px 8px var(--neu-shadow-light)",
        "glass-soft": "0 8px 32px var(--glass-shadow), inset 0 1px 0 var(--glass-inner-glow)",
        "glass-strong": "0 12px 48px var(--glass-shadow-strong), inset 0 1px 0 var(--glass-inner-glow)"
      },
      backdropBlur: {
        glass: "20px",
        "glass-strong": "32px"
      },
      transitionDuration: {
        theme: "350ms"
      },
      keyframes: {
        "light-sweep": {
          "0%": { transform: "translateX(-120%) skewX(-12deg)", opacity: "0" },
          "15%": { opacity: "0.35" },
          "50%": { opacity: "0.2" },
          "100%": { transform: "translateX(220%) skewX(-12deg)", opacity: "0" }
        },
        "satellite-ping": {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "70%": { transform: "scale(2.2)", opacity: "0" },
          "100%": { transform: "scale(2.2)", opacity: "0" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(1.5deg)" }
        },
        "shooting-star": {
          "0%": { transform: "translate(0, 0) scaleX(0)", opacity: "0" },
          "10%": { opacity: "0.6" },
          "100%": { transform: "translate(-280px, 140px) scaleX(1)", opacity: "0" }
        }
      },
      animation: {
        "light-sweep": "light-sweep 5s ease-in-out infinite",
        "satellite-ping": "satellite-ping 2s ease-out infinite",
        float: "float 6s ease-in-out infinite",
        "shooting-star": "shooting-star 1.2s ease-out forwards"
      },
      zIndex: {
        background: "0",
        content: "10",
        header: "40",
        toggle: "50"
      }
    }
  },
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        ".neu-raised": {
          background: "var(--surface-raised)",
          boxShadow:
            "8px 8px 16px var(--neu-shadow-dark), -8px -8px 16px var(--neu-shadow-light)",
          border: "1px solid var(--neu-border)"
        },
        ".neu-pressed": {
          background: "var(--surface-mid)",
          boxShadow:
            "inset 6px 6px 12px var(--neu-shadow-dark), inset -6px -6px 12px var(--neu-shadow-light)",
          border: "1px solid var(--neu-border)"
        },
        ".neu-flat": {
          background: "var(--surface-secondary)",
          boxShadow:
            "4px 4px 8px var(--neu-shadow-dark), -4px -4px 8px var(--neu-shadow-light)",
          border: "1px solid var(--neu-border)"
        },
        ".glass-panel": {
          background: "var(--glass-bg)",
          backdropFilter: "blur(20px) saturate(120%)",
          WebkitBackdropFilter: "blur(20px) saturate(120%)",
          border: "1px solid var(--glass-border)",
          boxShadow: "0 8px 32px var(--glass-shadow), inset 0 1px 0 var(--glass-inner-glow)"
        },
        ".glass-panel-strong": {
          background: "var(--glass-bg-strong)",
          backdropFilter: "blur(32px) saturate(140%)",
          WebkitBackdropFilter: "blur(32px) saturate(140%)",
          border: "1px solid var(--glass-border-strong)",
          boxShadow: "0 12px 48px var(--glass-shadow-strong), inset 0 1px 0 var(--glass-inner-glow)"
        }
      });
    })
  ]
};

export default config;
