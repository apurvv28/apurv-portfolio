"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";
import { useReducedMotion } from "framer-motion";

const STORAGE_KEY = "portfolio-intro-seen";

type IntroContextValue = {
  introComplete: boolean;
  skipIntro: () => void;
  completeIntro: () => void;
};

const IntroContext = createContext<IntroContextValue | null>(null);

export function IntroProvider({ children }: { children: ReactNode }): JSX.Element {
  const reducedMotion = useReducedMotion();
  const [introComplete, setIntroComplete] = useState(false);
  const [checked, setChecked] = useState(false);

  useLayoutEffect(() => {
    const seen = sessionStorage.getItem(STORAGE_KEY) === "1";
    if (seen || reducedMotion) {
      setIntroComplete(true);
    }
    setChecked(true);
  }, [reducedMotion]);

  useEffect(() => {
    if (!checked) return;
    document.body.style.overflow = introComplete ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [introComplete, checked]);

  const finish = useCallback(() => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setIntroComplete(true);
  }, []);

  const value = useMemo(
    () => ({
      introComplete,
      skipIntro: finish,
      completeIntro: finish
    }),
    [introComplete, finish]
  );

  return <IntroContext.Provider value={value}>{children}</IntroContext.Provider>;
}

export function useIntro(): IntroContextValue {
  const ctx = useContext(IntroContext);
  if (!ctx) throw new Error("useIntro must be used within IntroProvider");
  return ctx;
}
