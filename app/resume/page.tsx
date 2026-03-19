import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume"
};

const highlights = [
  "Built AI-powered products across EdTech, healthcare, and productivity domains.",
  "Designed full-stack systems with modern architecture and performance-first principles.",
  "Implemented ML workflows for fraud detection, accident alerts, and adaptive scheduling.",
  "Experienced with Next.js, React, FastAPI, Node.js, Python, and cloud deployment."
];

export default function ResumePage(): JSX.Element {
  return (
    <section className="mx-auto max-w-5xl px-4 pb-4 pt-32 sm:px-6">
      <p className="text-xs tracking-[0.24em] text-[var(--text-muted)] uppercase">Resume</p>
      <h1 className="mt-4 text-4xl font-semibold text-[var(--text-main)] sm:text-5xl">Experience snapshot</h1>

      <ul className="mt-8 space-y-3">
        {highlights.map((point) => (
          <li key={point} className="rounded-xl border border-white/10 bg-[var(--card-bg)] px-4 py-3 text-sm text-[var(--text-muted)] sm:text-base">
            {point}
          </li>
        ))}
      </ul>

      <a
        href="#"
        className="mt-8 inline-flex rounded-full bg-accent-gradient px-6 py-3 text-sm font-medium text-white shadow-glow"
      >
        Download Resume (PDF)
      </a>
    </section>
  );
}
