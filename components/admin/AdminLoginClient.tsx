"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, LockKeyhole, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const MAX_FAILED_ATTEMPTS = 5;
const COOLDOWN_SECONDS = 30;
const STORAGE_KEY = "portfolio-admin-login-state";

type LoginState = {
  failedAttempts: number;
  cooldownUntil: number;
};

function readState(): LoginState {
  if (typeof window === "undefined") {
    return { failedAttempts: 0, cooldownUntil: 0 };
  }

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return { failedAttempts: 0, cooldownUntil: 0 };
    return JSON.parse(raw) as LoginState;
  } catch {
    return { failedAttempts: 0, cooldownUntil: 0 };
  }
}

export default function AdminLoginClient(): JSX.Element {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shakeKey, setShakeKey] = useState(0);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [cooldownUntil, setCooldownUntil] = useState(0);
  const [cooldownNow, setCooldownNow] = useState(Date.now());

  useEffect(() => {
    const state = readState();
    setFailedAttempts(state.failedAttempts);
    setCooldownUntil(state.cooldownUntil);
  }, []);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ failedAttempts, cooldownUntil }));
  }, [failedAttempts, cooldownUntil]);

  useEffect(() => {
    if (!cooldownUntil) return;
    const timer = window.setInterval(() => setCooldownNow(Date.now()), 250);
    return () => window.clearInterval(timer);
  }, [cooldownUntil]);

  const cooldownRemaining = Math.max(0, Math.ceil((cooldownUntil - cooldownNow) / 1000));
  const coolingDown = cooldownRemaining > 0;

  const buttonLabel = useMemo(() => {
    if (loading) return "Authenticating";
    if (coolingDown) return `Locked ${cooldownRemaining}s`;
    return "Authenticate";
  }, [loading, coolingDown, cooldownRemaining]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if (loading || coolingDown) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ password })
      });

      if (!response.ok) {
        let serverMessage = "Authentication failed. Check the password and try again.";

        try {
          const payload = (await response.json()) as { error?: string };
          if (payload.error) {
            serverMessage = payload.error;
          }
        } catch {
          // Keep the fallback message when the server does not return JSON.
        }

        const remainingAttempts = failedAttempts + 1;
        const shouldLock = remainingAttempts >= MAX_FAILED_ATTEMPTS;

        setFailedAttempts(shouldLock ? 0 : remainingAttempts);
        setCooldownUntil(shouldLock ? Date.now() + COOLDOWN_SECONDS * 1000 : 0);
        setError(
          shouldLock
            ? `Too many failed attempts. Try again in ${COOLDOWN_SECONDS} seconds.`
            : serverMessage
        );
        setShakeKey((value) => value + 1);
        return;
      }

      sessionStorage.removeItem(STORAGE_KEY);
      router.replace("/admin/dashboard");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_45%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.06),transparent_35%)] opacity-70" />
      <div className="absolute inset-0 opacity-30" aria-hidden="true">
        {Array.from({ length: 60 }).map((_, index) => (
          <span
            key={index}
            className="absolute h-px w-px rounded-full bg-white"
            style={{
              left: `${(index * 13.7) % 100}%`,
              top: `${(index * 7.9) % 100}%`,
              opacity: 0.12 + (index % 4) * 0.08
            }}
          />
        ))}
      </div>

      <motion.section
        key={shakeKey}
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1, x: error ? [0, -10, 10, -7, 7, 0] : 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="glass-panel relative z-10 w-full max-w-xl overflow-hidden rounded-[2rem] p-6 shadow-2xl sm:p-8"
      >
        <div className="mb-8 text-center">
          <p className="font-mono text-caption uppercase tracking-[0.3em] text-foreground-subtle">Airlock Access</p>
          <h1 className="mt-3 font-heading text-3xl text-foreground sm:text-4xl">Admin Login</h1>
          <p className="mt-3 text-sm text-foreground-muted sm:text-base">
            Authenticate to access the hidden blog dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block space-y-2">
            <span className="font-mono text-xs uppercase tracking-[0.24em] text-foreground-muted">
              Password
            </span>
            <div className="neu-pressed flex items-center gap-3 rounded-2xl px-4 py-3">
              <LockKeyhole className="h-4 w-4 text-foreground-muted" strokeWidth={1.8} />
              <input
                type={visible ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter admin password"
                autoComplete="current-password"
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-foreground-subtle"
              />
              <button
                type="button"
                onClick={() => setVisible((current) => !current)}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-foreground-muted transition-colors hover:text-foreground"
                aria-label={visible ? "Hide password" : "Show password"}
              >
                {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </label>

          <button
            type="submit"
            disabled={loading || coolingDown}
            className="neu-raised flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 font-mono text-sm uppercase tracking-[0.22em] text-foreground transition-all disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
            {buttonLabel}
          </button>
        </form>

        <AnimatePresence>
          {error ? (
            <motion.p
              key={error}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-4 rounded-2xl border border-[var(--glass-border)] bg-surface-secondary px-4 py-3 text-sm text-foreground-muted"
            >
              {error}
            </motion.p>
          ) : null}
        </AnimatePresence>

        {coolingDown ? (
          <p className="mt-3 text-center font-mono text-caption uppercase tracking-[0.18em] text-foreground-subtle">
            Cooldown active for {cooldownRemaining}s
          </p>
        ) : null}
      </motion.section>
    </main>
  );
}