import type { Config } from "tailwindcss";

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
        background: "#000000",
        secondary: "#0a0a0a",
        card: "#111111",
        muted: "#a0a0a0",
        foreground: "#FFFFFF",
        "cyan-primary": "#06b6d4",
        "violet-secondary": "#8b5cf6",
        "indigo-accent": "#6366f1"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"]
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(6, 182, 212, 0.3), 0 10px 40px rgba(6, 182, 212, 0.15), 0 15px 45px rgba(139, 92, 246, 0.1)",
        "glow-lg": "0 0 0 2px rgba(6, 182, 212, 0.4), 0 20px 60px rgba(6, 182, 212, 0.2)"
      },
      backgroundImage: {
        "accent-gradient": "linear-gradient(120deg, #06b6d4, #8b5cf6)",
        "glass-gradient": "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
        "hero-radial": "radial-gradient(circle at 50% 10%, rgba(6, 182, 212, 0.1), transparent 45%), radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.08), transparent 40%)"
      },
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "20px"
      },
      keyframes: {
        "key-press": {
          "0%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(4px) scale(0.95)" },
          "100%": { transform: "translateY(0) scale(1)" }
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(6, 182, 212, 0.7)" },
          "50%": { boxShadow: "0 0 0 8px rgba(6, 182, 212, 0)" }
        }
      },
      animation: {
        "key-press": "key-press 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "pulse-glow": "pulse-glow 1.5s infinite"
      }
    }
  },
  plugins: []
};

export default config;
