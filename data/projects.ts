export type Project = {
  title: string;
  description: string;
  category: string;
  stack: string[];
  image: string;
  github: string;
  demo: string;
  features?: string[];
  color?: string;
};

export const projects: Project[] = [
  {
    title: "StudyGenie",
    category: "AI / EdTech Platform",
    description: "An AI-powered learning platform with an intelligent chatbot, personalized roadmaps, and performance analytics for students transitioning into technical education.",
    features: [
      "Intelligent Chatbot for 24/7 learning assistance",
      "Personalized Learning Roadmaps tailored to student needs",
      "Performance Analytics to track and improve learning outcomes"
    ],
    stack: ["MERN", "Python", "LangGraph", "LLM APIs"],
    image: "/projects/studygenie.png",
    github: "https://github.com/apurvv28/studygenie",
    demo: "No demo",
    color: "#5158b0ff"
  },
  {
    title: "EMR 2.0",
    category: "AI + Healthcare",
    description: "A smart electronic medical record platform using a 7+ AI agent workflow to automate patient documentation and support diagnosis.",
    features: [
      "7+ AI Agent Workflow for complex medical tasks",
      "Automated Patient Documentation and record management",
      "Diagnostic Support tools with AI-driven insights"
    ],
    stack: ["FastAPI", "Next.js", "Llama", "CrewAI", "LangGraph", "Clerk", "Convex"],
    image: "/projects/emr.png",
    github: "https://github.com/apurvv28/cavista-hack-techtadkaa",
    demo: "https://cavista-hack-techtadkaa.vercel.app/",
    color: "#901616b9"
  },
  {
    title: "ResearchMind",
    category: "AI Research Tool",
    description: "An AI research assistant that analyzes academic papers, summarizes key findings, and drafts structured literature reviews.",
    features: [
      "Automated Analysis of academic papers and journals",
      "Drafting Structured Literature Reviews with AI",
      "Key Finding Summarization and trend analysis"
    ],
    stack: ["Python", "LLM APIs", "Vector Search", "Next.js"],
    image: "/projects/researchmind.png",
    github: "https://github.com/apurvv28/ResearchMind-Literature_Survey_Tool",
    demo: "https://researchmind-io.vercel.app",
    color: "#27fdb2ff"
  },
  {
    title: "SamayVidya",
    category: "AI Productivity Tool",
    description: "An intelligent scheduler that creates adaptive study plans from deadlines, subject difficulty, and availability constraints.",
    features: [
      "Adaptive Study Plans based on real-time progress",
      "Deadline-aware Scheduling for efficient time management",
      "Availability Constraint tracking and optimization"
    ],
    stack: ["React", "Node.js", "Scheduling Algorithms", "Analytics"],
    image: "/projects/samayvidya.png",
    github: "https://github.com/apurvv28/samayvidya",
    demo: "https://samayvidya.vercel.app",
    color: "#800bf5ff"
  },
  {
    title: "Accident Detection System",
    category: "Computer Vision / Safety Tech",
    description: "A safety platform that detects accidents in real time and auto-sends emergency alerts with GPS location sharing.",
    features: [
      "Real-time Accident Detection using computer vision",
      "Automated Emergency Alerts to nearest responders",
      "GPS Location Sharing for precise rescue operations"
    ],
    stack: ["Python", "IoT Sensors", "Machine Learning", "Real-time Alerts"],
    image: "/projects/accident.png",
    github: "https://github.com/apurvv28/Accident-Detection-DL",
    demo: "NA",
    color: "#ef4444"
  },
  {
    title: "DSA Viz",
    category: "Educational Tool",
    description: "An interactive platform for visualizing algorithms and data structures through step-by-step animations and complexity insights.",
    features: [
      "Interactive Visualizations for 20+ algorithms",
      "Step-by-step Animations for better understanding",
      "Complexity Insights and efficiency analysis"
    ],
    stack: ["React", "JavaScript", "D3.js", "Animation"],
    image: "/projects/dsaviz.png",
    github: "https://github.com/apurvv28/ADSAA",
    demo: "https://dsa-vit.vercel.app",
    color: "#f8e00dff"
  },
  {
    title: "Placify",
    category: "Career Tech Platform",
    description: "A placement preparation platform with company-wise tracks, coding modules, and interview prep analytics.",
    features: [
      "Company-wise Tracks for targeted preparation",
      "Interactive Coding Modules and practice tests",
      "Interview Prep Analytics to track progress"
    ],
    stack: ["React", "Node.js", "MongoDB", "Dashboard"],
    image: "/projects/placify.png",
    github: "https://github.com/apurvv28/placify",
    demo: "https://placify-ai.vercel.app",
    color: "#4a0df3ff"
  },
];
