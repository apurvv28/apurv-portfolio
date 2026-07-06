import type { LucideIcon } from "lucide-react";
import { BriefcaseBusiness, Code2 } from "lucide-react";

export type ExperienceEntry = {
  id: string;
  role: string;
  company: string;
  duration: string;
  icon: LucideIcon;
  responsibilities: string[];
};

export const experience: ExperienceEntry[] = [
  {
    id: "globeminds",
    role: "Diploma Trainee Engineer",
    company: "Globeminds Technologies Pvt. Ltd., Pune",
    duration: "May 2024 — June 2024",
    icon: Code2,
    responsibilities: [
      "Developed a medical management desktop application serving 500+ daily transactions",
      "Reduced manual inventory errors by 95% and cut billing time from 3 minutes to 30 seconds",
      "Implemented prescription auto-validation logic that flagged 150+ potential drug interactions"
    ]
  },
  {
    id: "bits-volts",
    role: "Front-End Developer Intern",
    company: "Bits and Volts Pvt. Ltd., Remote — Pune",
    duration: "June 2025 — Aug 2025",
    icon: BriefcaseBusiness,
    responsibilities: [
      "Developed 15+ responsive UI components across 3 web applications",
      "Integrated 20+ RESTful APIs, reducing data fetch latency by 40% through state management and caching",
      "Reduced initial page load time from 3.2s to 1.1s with code splitting, lazy loading, and image optimization"
    ]
  }
];
