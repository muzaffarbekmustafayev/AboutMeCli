import {
  Code2,
  Database,
  Layout,
  Settings,
  Terminal,
  Cpu,
  Zap,
  Layers,
  Search,
  Wrench,
} from "lucide-react";

export const SKILLS = [
  { name: "React.js", category: "frontend", level: "expert", Icon: Layout },
  { name: "JavaScript", category: "frontend", level: "advanced", Icon: Code2 },
  { name: "TypeScript", category: "frontend", level: "intermediate", Icon: Code2 },
  { name: "Tailwind CSS", category: "frontend", level: "expert", Icon: Zap },
  { name: "Next.js", category: "frontend", level: "intermediate", Icon: Layers },

  { name: "Node.js", category: "backend", level: "advanced", Icon: Settings },
  { name: "Express.js", category: "backend", level: "advanced", Icon: Terminal },
  { name: "REST API", category: "backend", level: "expert", Icon: Zap },
  { name: "JWT Auth", category: "backend", level: "advanced", Icon: Cpu },

  { name: "MongoDB", category: "database", level: "advanced", Icon: Database },
  { name: "MySQL", category: "database", level: "intermediate", Icon: Database },
  { name: "Firebase", category: "database", level: "intermediate", Icon: Zap },

  { name: "Git", category: "tools", level: "advanced", Icon: Wrench },
  { name: "GitHub", category: "tools", level: "expert", Icon: Terminal },
  { name: "Postman", category: "tools", level: "advanced", Icon: Search },
  { name: "Vite", category: "tools", level: "intermediate", Icon: Zap },
];
