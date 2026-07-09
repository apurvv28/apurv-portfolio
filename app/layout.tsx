import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import AnimatedCursor from "@/components/AnimatedCursor";
import Providers from "@/components/Providers";
import ThemeToggle from "@/components/ThemeToggle";
import "../styles/globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap"
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap"
});

const siteUrl = "https://apurvv.me";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Apurv Saktepar | Software Developer & AI/ML Engineer",
    template: "%s | Apurv Saktepar"
  },
  description:
    "Premium developer portfolio of Apurv Saktepar, showcasing AI systems, full-stack engineering, and high-performance digital product development.",
  openGraph: {
    title: "Apurv Saktepar | Software Developer & AI/ML Engineer",
    description:
      "I design and build products that deliver real impact, from AI-driven platforms to scalable full-stack applications.",
    url: siteUrl,
    siteName: "Apurv Portfolio",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Apurv Saktepar | Software Developer & AI/ML Engineer",
    description: "I design and build products that deliver real impact."
  },
  robots: {
    index: true,
    follow: true
  },
  keywords: [
    "Apurv Saktepar",
    "Software Developer",
    "AI ML Engineer",
    "Next.js Portfolio",
    "Full Stack Developer Pune"
  ]
};

const themeInitScript = `(function(){try{var t=localStorage.getItem('portfolio-theme');var d=t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);if(!d)document.documentElement.classList.add('light');}catch(e){document.documentElement.classList.add('dark');}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <Script id="theme-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${dmSans.variable} ${jetbrainsMono.variable} min-h-screen bg-surface text-foreground antialiased`}
      >
        <Providers>
          <AnimatedCursor />
          <SmoothScroll />
          <ThemeToggle />
          <Header />
          <main className="relative z-content">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
