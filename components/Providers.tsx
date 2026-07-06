"use client";

import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { IntroProvider, useIntro } from "@/components/intro/IntroProvider";
import SpaceBackground from "@/components/SpaceBackground";
import IntroLoader from "@/components/IntroLoader";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

function AppShell({ children }: { children: ReactNode }): JSX.Element {
  const { introComplete } = useIntro();

  return (
    <>
      <SpaceBackground />
      <IntroLoader />
      <div
        className={cn(
          "transition-opacity duration-700 ease-out",
          introComplete ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        {children}
      </div>
    </>
  );
}

export default function Providers({ children }: { children: ReactNode }): JSX.Element {
  return (
    <ThemeProvider>
      <IntroProvider>
        <AppShell>{children}</AppShell>
      </IntroProvider>
    </ThemeProvider>
  );
}
