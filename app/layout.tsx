import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import AnimatedCursor from "@/components/AnimatedCursor";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

const siteUrl = "https://apurvv.vercel.app";

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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} min-h-screen bg-[var(--bg)] text-[var(--text-main)] antialiased`}>
        <div className="aurora-bg">
          <div className="aurora-1" />
          <div className="aurora-2" />
          <div className="aurora-3" />
        </div>
        <AnimatedCursor />
        <SmoothScroll />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
