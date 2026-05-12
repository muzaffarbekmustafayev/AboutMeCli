import React from "react";
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
  { name: "React.js", category: "frontend", level: "expert", icon: <Layout size={20} /> },
  { name: "JavaScript", category: "frontend", level: "advanced", icon: <Code2 size={20} /> },
  { name: "TypeScript", category: "frontend", level: "intermediate", icon: <Code2 size={20} /> },
  { name: "Tailwind CSS", category: "frontend", level: "expert", icon: <Zap size={20} /> },
  { name: "Next.js", category: "frontend", level: "intermediate", icon: <Layers size={20} /> },

  { name: "Node.js", category: "backend", level: "advanced", icon: <Settings size={20} /> },
  { name: "Express.js", category: "backend", level: "advanced", icon: <Terminal size={20} /> },
  { name: "REST API", category: "backend", level: "expert", icon: <Zap size={20} /> },
  { name: "JWT Auth", category: "backend", level: "advanced", icon: <Cpu size={20} /> },

  { name: "MongoDB", category: "database", level: "advanced", icon: <Database size={20} /> },
  { name: "MySQL", category: "database", level: "intermediate", icon: <Database size={20} /> },
  { name: "Firebase", category: "database", level: "intermediate", icon: <Zap size={20} /> },

  { name: "Git", category: "tools", level: "advanced", icon: <Wrench size={20} /> },
  { name: "GitHub", category: "tools", level: "expert", icon: <Terminal size={20} /> },
  { name: "Postman", category: "tools", level: "advanced", icon: <Search size={20} /> },
  { name: "Vite", category: "tools", level: "intermediate", icon: <Zap size={20} /> },
];
