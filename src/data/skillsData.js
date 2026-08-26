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
  Server,
  ShieldCheck,
  Globe,
  Boxes,
  Workflow,
  Sparkles,
  GitBranch,
  Cloud,
  FileCode2,
  HardDrive,
  Network,
  Activity,
  Lock,
  Monitor,
  FolderGit2,
  RefreshCw,
  Gauge,
  Smartphone,
  Bot,
  Send,
  Radio
} from "lucide-react";

export const SKILLS = [
  // ==========================================
  // --- AI, ASR & TELEGRAM BOTS ---
  // ==========================================
  { name: "AI & LLM Integration (Gemini/Claude)", category: "ai", level: "expert", Icon: Sparkles },
  { name: "Speech-to-Text / ASR", category: "ai", level: "expert", Icon: Activity },
  { name: "Computer Vision", category: "ai", level: "advanced", Icon: Bot },
  { name: "Python FastAPI", category: "ai", level: "advanced", Icon: Terminal },

  // ==========================================
  // --- FULL-STACK & ARCHITECTURE ---
  // ==========================================
  { name: "Full-Stack Architecture", category: "fullstack", level: "expert", Icon: Layers },
  { name: "WebRTC Real-Time Streams", category: "fullstack", level: "expert", Icon: Radio },
  { name: "Next.js", category: "fullstack", level: "advanced", Icon: Globe },

  // ==========================================
  // --- FRONTEND ENGINEERING ---
  // ==========================================
  { name: "React.js", category: "frontend", level: "expert", Icon: Layout },
  { name: "JavaScript", category: "frontend", level: "expert", Icon: Code2 },
  { name: "TypeScript", category: "frontend", level: "advanced", Icon: FileCode2 },
  { name: "Tailwind CSS", category: "frontend", level: "expert", Icon: Zap },
  { name: "HTML & CSS", category: "frontend", level: "expert", Icon: Globe },

  // ==========================================
  // --- MOBILE DEVELOPMENT ---
  // ==========================================
  { name: "React Native", category: "mobile", level: "advanced", Icon: Smartphone },
  { name: "Progressive Web Apps (PWA)", category: "mobile", level: "expert", Icon: Globe },

  // ==========================================
  // --- BACKEND & APIS ---
  // ==========================================
  { name: "Node.js", category: "backend", level: "expert", Icon: Server },
  { name: "Express.js", category: "backend", level: "expert", Icon: Terminal },
  { name: "Nest.js", category: "backend", level: "intermediate", Icon: Server },
  { name: "RESTful APIs", category: "backend", level: "expert", Icon: Zap },
  { name: "WebSockets", category: "backend", level: "advanced", Icon: Activity },

  // ==========================================
  // --- DEVOPS & CLOUD ---
  // ==========================================
  { name: "Docker", category: "devops", level: "advanced", Icon: Boxes },
  { name: "CI / CD (GitHub Actions)", category: "devops", level: "advanced", Icon: RefreshCw },
  { name: "Nginx", category: "devops", level: "advanced", Icon: Network },

  // ==========================================
  // --- SYSTEM ADMINISTRATION & SECURITY ---
  // ==========================================
  { name: "Linux Server Administration", category: "sysadmin", level: "advanced", Icon: Terminal },
  { name: "Bash Scripting", category: "sysadmin", level: "advanced", Icon: Code2 },
  { name: "Server Security & SSL", category: "sysadmin", level: "expert", Icon: ShieldCheck },

  // ==========================================
  // --- DATABASES & CACHING ---
  // ==========================================
  { name: "MongoDB", category: "database", level: "expert", Icon: Database },
  { name: "PostgreSQL", category: "database", level: "advanced", Icon: HardDrive },
  { name: "MySQL", category: "database", level: "advanced", Icon: Database },
  { name: "Redis", category: "database", level: "advanced", Icon: Zap },

  // ==========================================
  // --- TOOLS & WORKFLOW ---
  // ==========================================
  { name: "Git & GitHub", category: "tools", level: "expert", Icon: GitBranch },
  { name: "Postman", category: "tools", level: "expert", Icon: Search },
  { name: "Vite", category: "tools", level: "expert", Icon: Zap },
  { name: "Linux CLI", category: "tools", level: "advanced", Icon: Terminal }
];
