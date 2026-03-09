import {
  Code,
  Database,
  Zap,
  Filter,
  ChevronLeft,
  ChevronRight,
  Wrench,
} from "lucide-react";

const SKILLS = [
  { name: "React.js", icon: Code, category: "frontend", level: "Expert", color: "text-blue-500" },
  { name: "JavaScript", icon: Code, category: "frontend", level: "Advanced", color: "text-yellow-500" },
  { name: "TypeScript", icon: Code, category: "frontend", level: "Intermediate", color: "text-blue-600" },
  { name: "Tailwind CSS", icon: Zap, category: "frontend", level: "Expert", color: "text-sky-500" },
  { name: "Next.js", icon: Zap, category: "frontend", level: "Intermediate", color: "text-gray-700 dark:text-gray-200" },

  { name: "Node.js", icon: Database, category: "backend", level: "Advanced", color: "text-green-500" },
  { name: "Express.js", icon: Code, category: "backend", level: "Advanced", color: "text-gray-600 dark:text-gray-300" },
  { name: "REST API", icon: Zap, category: "backend", level: "Expert", color: "text-green-600" },
  { name: "JWT Auth", icon: Wrench, category: "backend", level: "Advanced", color: "text-purple-500" },

  { name: "MongoDB", icon: Database, category: "database", level: "Advanced", color: "text-green-600" },
  { name: "MySQL", icon: Database, category: "database", level: "Intermediate", color: "text-blue-600" },
  { name: "Firebase", icon: Zap, category: "database", level: "Intermediate", color: "text-yellow-500" },

  { name: "Git", icon: Wrench, category: "tools", level: "Advanced", color: "text-orange-500" },
  { name: "GitHub", icon: Wrench, category: "tools", level: "Expert", color: "text-gray-700 dark:text-gray-200" },
  { name: "Postman", icon: Wrench, category: "tools", level: "Advanced", color: "text-orange-400" },
  { name: "Vite", icon: Zap, category: "tools", level: "Intermediate", color: "text-purple-500" },
];
