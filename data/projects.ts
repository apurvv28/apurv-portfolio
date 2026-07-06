export type Project = {
  title: string;
  description: string;
  category: string;
  tags: ("AI-ML" | "Full-Stack" | "DevOps")[];
  stack: string[];
  image: string;
  github: string;
  demo: string;
  features?: string[];
};

export const projectFilters = ["All", "AI-ML", "Full-Stack", "DevOps"] as const;
export type ProjectFilter = (typeof projectFilters)[number];

export const projects: Project[] = [
  {
    title: "EMR 2.0",
    category: "AI + Healthcare",
    tags: ["AI-ML", "Full-Stack"],
    description: "A smart electronic medical record platform using a 7+ AI agent workflow to automate patient documentation and support diagnosis.",
    features: [
      "7+ AI Agent Workflow for complex medical tasks",
      "Automated Patient Documentation and record management",
      "Diagnostic Support tools with AI-driven insights"
    ],
    stack: ["FastAPI", "Next.js", "Llama", "CrewAI", "LangGraph", "Clerk", "Convex"],
    image: "/projects/emr.png",
    github: "https://github.com/apurvv28/cavista-hack-techtadkaa",
    demo: "https://cavista-hack-techtadkaa.vercel.app/"
  },
  {
    title: "PIE",
    category: "ML Risk Intelligence",
    tags: ["AI-ML"],
    description: "A real-time pre-delinquency intervention platform that scores transaction events with a dual-model XGBoost + LightGBM ensemble.",
    features: [
      "10K+ transaction events processed with sub-second delinquency scoring",
      "Dual-model XGBoost + LightGBM ensemble trained on 25+ behavioral risk features",
      "FastAPI, Redis, and React pipeline with automated drift monitoring"
    ],
    stack: ["XGBoost", "LightGBM", "Pandas", "React", "FastAPI", "Redis", "SQLite"],
    image: "/projects/pie.png",
    github: "https://github.com/apurvv28/Pre-Delinquency-Intervention-System",
    demo: "NA"
  },
  {
    title: "ResearchMind",
    category: "AI Research Tool",
    tags: ["AI-ML", "Full-Stack"],
    description: "An AI research assistant that analyzes academic papers, summarizes key findings, and drafts structured literature reviews.",
    features: [
      "Automated Analysis of academic papers and journals",
      "Drafting Structured Literature Reviews with AI",
      "Key Finding Summarization and trend analysis"
    ],
    stack: ["Python", "LLM APIs", "Vector Search", "Next.js"],
    image: "/projects/researchmind.png",
    github: "https://github.com/apurvv28/ResearchMind-Literature_Survey_Tool",
    demo: "https://researchmind-io.vercel.app"
  },
  {
    title: "SamayVidya",
    category: "AI Productivity Tool",
    tags: ["AI-ML", "Full-Stack"],
    description: "An intelligent scheduler that creates adaptive study plans from deadlines, subject difficulty, and availability constraints.",
    features: [
      "Adaptive Study Plans based on real-time progress",
      "Deadline-aware Scheduling for efficient time management",
      "Availability Constraint tracking and optimization"
    ],
    stack: ["React", "Node.js", "Scheduling Algorithms", "Analytics"],
    image: "/projects/samayvidya.png",
    github: "https://github.com/apurvv28/samayvidya",
    demo: "https://samayvidya.vercel.app"
  },
  {
    title: "DevForge",
    category: "AI-Powered CI/CD",
    tags: ["DevOps", "Full-Stack"],
    description: "A production-ready CLI tool that generates CI/CD workflows and infrastructure plans using a multi-LLM agentic pipeline.",
    features: [
      "Auto-detects frameworks across 6+ stacks",
      "Generates GitHub Actions and Jenkins workflows with one command",
      "Includes NIST SP 800-53 and ISO 27001 compliance scanning"
    ],
    stack: ["TypeScript", "LangGraph", "Amazon Bedrock", "GitHub Actions", "Terraform", "Docker"],
    image: "/projects/devforge.png",
    github: "https://github.com/apurvv28/devforge",
    demo: "https://www.npmjs.com/package/@apurvv28/devforge"
  },
  {
    title: "Placify",
    category: "Career Tech Platform",
    tags: ["Full-Stack"],
    description: "A placement preparation platform with company-wise tracks, coding modules, and interview prep analytics.",
    features: [
      "Company-wise Tracks for targeted preparation",
      "Interactive Coding Modules and practice tests",
      "Interview Prep Analytics to track progress"
    ],
    stack: ["React", "Node.js", "MongoDB", "Dashboard"],
    image: "/projects/placify.png",
    github: "https://github.com/apurvv28/placify",
    demo: "https://placify-ai.vercel.app"
  }
];
