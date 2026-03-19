export interface Skill {
  name: string;
  color: string;
  description: string;
  iconType: string;
  category: "tech" | "soft";
}

export const skills: Skill[] = [
  // Tech Skills
  {
    name: "C++",
    color: "from-blue-500 to-cyan-500",
    description: "Building low level systems",
    iconType: "cpp",
    category: "tech"
  },
  {
    name: "Java",
    color: "from-blue-500 to-cyan-500",
    description: "Building enterprise applications",
    iconType: "java",
    category: "tech"
  },
  {
    name: "React",
    color: "from-blue-500 to-cyan-500",
    description: "Building modern UIs with reusable components.",
    iconType: "react",
    category: "tech"
  },
  {
    name: "Next.js",
    color: "from-black to-gray-700",
    description: "Production-grade React framework with SSR & routing.",
    iconType: "nextjs",
    category: "tech"
  },
  {
    name: "TypeScript",
    color: "from-blue-600 to-blue-400",
    description: "Type-safe JavaScript for scalable applications.",
    iconType: "typescript",
    category: "tech"
  },
  {
    name: "Node.js",
    color: "from-green-600 to-emerald-500",
    description: "Scalable backend runtime for APIs and services.",
    iconType: "nodejs",
    category: "tech"
  },
  {
    name: "Python",
    color: "from-yellow-500 to-blue-500",
    description: "Core language for AI, ML, and backend systems.",
    iconType: "python",
    category: "tech"
  },
  {
    name: "FastAPI",
    color: "from-green-500 to-teal-500",
    description: "High-performance APIs for AI-driven systems.",
    iconType: "fastapi",
    category: "tech"
  },
  {
    name: "Spring Boot",
    color: "from-green-700 to-green-500",
    description: "Robust Java backend framework for enterprise apps.",
    iconType: "springboot",
    category: "tech"
  },
  {
    name: "LangGraph",
    color: "from-purple-500 to-pink-500",
    description: "Stateful orchestration for multi-agent AI systems.",
    iconType: "langgraph",
    category: "tech"
  },
  {
    name: "CrewAI",
    color: "from-indigo-500 to-purple-500",
    description: "Designing and managing autonomous AI agents.",
    iconType: "crewai",
    category: "tech"
  },
  {
    name: "Docker",
    color: "from-blue-500 to-cyan-600",
    description: "Containerization for consistent environments.",
    iconType: "docker",
    category: "tech"
  },
  {
    name: "AWS",
    color: "from-orange-500 to-yellow-500",
    description: "Cloud infrastructure and scalable deployments.",
    iconType: "aws",
    category: "tech"
  },
  {
    name: "GCP",
    color: "from-blue-500 to-red-500",
    description: "Cloud services for AI, compute, and data pipelines.",
    iconType: "gcp",
    category: "tech"
  },
  {
    name: "PostgreSQL",
    color: "from-blue-600 to-blue-400",
    description: "Advanced relational database for complex queries.",
    iconType: "postgresql",
    category: "tech"
  },
  {
    name: "MySQL",
    color: "from-blue-500 to-orange-500",
    description: "Reliable relational database for web applications.",
    iconType: "mysql",
    category: "tech"
  },
  {
    name: "MongoDB",
    color: "from-green-500 to-emerald-600",
    description: "Flexible NoSQL database for scalable apps.",
    iconType: "mongodb",
    category: "tech"
  },
  {
    name: "GitHub",
    color: "from-gray-800 to-black",
    description: "Version control, CI/CD, and collaboration.",
    iconType: "github",
    category: "tech"
  },
  {
    name: "Tailwind CSS",
    color: "from-cyan-400 to-blue-500",
    description: "Utility-first CSS for rapid UI development.",
    iconType: "tailwind",
    category: "tech"
  },
  {
    name: "Generative AI",
    color: "from-pink-500 to-purple-600",
    description: "Developing LLM-powered applications and workflows.",
    iconType: "genai",
    category: "tech"
  },
  {
    name: "Scikit-Learn",
    color: "from-purple-600 to-indigo-500",
    description: "Building intelligent models for predictions and insights.",
    iconType: "sklearn",
    category: "tech"
  },
  {
    name: "Pandas",
    color: "from-purple-600 to-indigo-500",
    description: "Building intelligent models for predictions and insights.",
    iconType: "pandas",
    category: "tech"
  },
  {
    name: "TensorFlow",
    color: "from-purple-600 to-indigo-500",
    description: "Building intelligent models for predictions and insights.",
    iconType: "tensorflow",
    category: "tech"
  },
  {
    name: "PyTorch",
    color: "from-purple-600 to-indigo-500",
    description: "Building intelligent models for predictions and insights.",
    iconType: "pytorch",
    category: "tech"
  },
  // Soft Skills
  {
    name: "Leadership",
    color: "from-indigo-500 to-blue-500",
    description: "Guiding teams towards common goals.",
    iconType: "leadership",
    category: "soft"
  },
  {
    name: "Critical Thinking",
    color: "from-cyan-500 to-blue-500",
    description: "Analyzing facts to form a judgment.",
    iconType: "thinking",
    category: "soft"
  },
  {
    name: "Teamwork",
    color: "from-blue-500 to-cyan-500",
    description: "Collaborating effectively with others.",
    iconType: "teamwork",
    category: "soft"
  },
  {
    name: "Problem Solving",
    color: "from-cyan-400 to-blue-400",
    description: "Finding solutions to complex issues.",
    iconType: "solving",
    category: "soft"
  },
  {
    name: "Communication",
    color: "from-blue-400 to-cyan-400",
    description: "Conveying ideas clearly and concisely.",
    iconType: "comm",
    category: "soft"
  },
  {
    name: "Adaptability",
    color: "from-indigo-400 to-blue-400",
    description: "Thriving in changing environments.",
    iconType: "adapt",
    category: "soft"
  }
];

