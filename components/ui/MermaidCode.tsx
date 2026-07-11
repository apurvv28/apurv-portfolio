"use client";

import { useEffect, useState } from "react";

type MermaidCodeProps = {
  code: string;
};

export default function MermaidCode({ code }: MermaidCodeProps): JSX.Element {
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const render = async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        const isDark =
          document.documentElement.classList.contains("dark") ||
          (!document.documentElement.classList.contains("light") &&
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-color-scheme: dark)").matches);

        mermaid.initialize({
          startOnLoad: false,
          theme: isDark ? "dark" : "default",
          securityLevel: "loose",
          themeVariables: {
            background: "transparent",
          },
        });
        const id = `mermaid-svg-${Math.random().toString(36).substring(2, 9)}`;
        const { svg: renderedSvg } = await mermaid.render(id, code);
        if (active) {
          setSvg(renderedSvg);
          setError(null);
        }
      } catch (err: any) {
        console.error("Mermaid parsing error:", err);
        if (active) {
          setError(err?.message || "Invalid Mermaid syntax");
        }
      }
    };

    render();
    return () => {
      active = false;
    };
  }, [code]);

  if (error) {
    return (
      <div className="my-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4 font-mono text-xs text-red-400">
        <p className="font-semibold">Mermaid Render Error:</p>
        <p className="mt-1 whitespace-pre-wrap">{error}</p>
      </div>
    );
  }

  if (!svg) {
    return (
      <div className="my-4 flex h-20 animate-pulse items-center justify-center rounded-xl border border-white/5 bg-surface-secondary/40 font-mono text-xs text-foreground-muted">
        Rendering diagram...
      </div>
    );
  }

  return (
    <div
      className="mermaid-render my-6 flex justify-center overflow-x-auto rounded-xl border border-white/5 bg-surface-secondary/40 p-4"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
