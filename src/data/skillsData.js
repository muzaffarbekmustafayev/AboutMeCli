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
  { name: "AI & LLM API Integration (Gemini/Claude)", category: "ai", level: "expert", Icon: Sparkles },
  { name: "Telegram Bot Development (grammY)", category: "ai", level: "expert", Icon: Send },
  { name: "Speech-to-Text / ASR (Whisper, Wav2Vec)", category: "ai", level: "expert", Icon: Activity },
  { name: "FastAPI & Python AI Pipelines", category: "ai", level: "advanced", Icon: Terminal },
  { name: "Computer Vision (MediaPipe / TF.js)", category: "ai", level: "advanced", Icon: Bot },
  { name: "OpenRouter & Multi-LLM Routing", category: "ai", level: "expert", Icon: Workflow },

  // ==========================================
  // --- FULL-STACK & ARCHITECTURE ---
  // ==========================================
  { name: "Full-Stack Architecture", category: "fullstack", level: "expert", Icon: Layers },
  { name: "WebRTC Real-Time Media Streams", category: "fullstack", level: "expert", Icon: Radio },
  { name: "REST & Client-Server", category: "fullstack", level: "expert", Icon: Workflow },
  { name: "Next.js (SSR / SSG)", category: "fullstack", level: "advanced", Icon: Globe },
  { name: "State Management (Redux/Zustand)", category: "fullstack", level: "advanced", Icon: Boxes },
  { name: "Monorepo & Modular Code", category: "fullstack", level: "advanced", Icon: FolderGit2 },
  { name: "Authentication & RBAC Sessions", category: "fullstack", level: "expert", Icon: Lock },

  // ==========================================
  // --- FRONTEND ENGINEERING ---
  // ==========================================
  { name: "React.js (Hooks & Context)", category: "frontend", level: "expert", Icon: Layout },
  { name: "JavaScript (ES6+ / Async)", category: "frontend", level: "expert", Icon: Code2 },
  { name: "TypeScript", category: "frontend", level: "advanced", Icon: FileCode2 },
  { name: "Tailwind CSS", category: "frontend", level: "expert", Icon: Zap },
  { name: "HTML5 & Semantic Web", category: "frontend", level: "expert", Icon: Globe },
  { name: "Framer Motion (UI FX)", category: "frontend", level: "advanced", Icon: Sparkles },
  { name: "Responsive & Adaptive UX", category: "frontend", level: "expert", Icon: Monitor },
  { name: "Core Web Vitals & Perf", category: "frontend", level: "advanced", Icon: Gauge },

  // ==========================================
  // --- MOBILE DEVELOPMENT ---
  // ==========================================
  { name: "React Native (Cross-Platform)", category: "mobile", level: "advanced", Icon: Smartphone },
  { name: "Expo Ecosystem & CLI", category: "mobile", level: "advanced", Icon: Smartphone },
  { name: "Progressive Web Apps (PWA)", category: "mobile", level: "expert", Icon: Globe },
  { name: "Mobile-First UI & Gestures", category: "mobile", level: "expert", Icon: Layout },
  { name: "Offline Sync & Local Storage", category: "mobile", level: "advanced", Icon: HardDrive },

  // ==========================================
  // --- BACKEND & APIS ---
  // ==========================================
  { name: "Node.js (Async Event Loop)", category: "backend", level: "expert", Icon: Server },
  { name: "Express.js Framework", category: "backend", level: "expert", Icon: Terminal },
  { name: "RESTful API Design", category: "backend", level: "expert", Icon: Zap },
  { name: "JWT & OAuth2 Security", category: "backend", level: "expert", Icon: ShieldCheck },
  { name: "Microservices Architecture", category: "backend", level: "advanced", Icon: Cpu },
  { name: "WebSockets (Socket.io)", category: "backend", level: "advanced", Icon: Activity },
  { name: "Nest.js (TypeScript Backend)", category: "backend", level: "intermediate", Icon: Server },
  { name: "API Rate Limiting & Helmet", category: "backend", level: "advanced", Icon: Lock },

  // ==========================================
  // --- DEVOPS & CLOUD ---
  // ==========================================
  { name: "Docker & Containerization", category: "devops", level: "advanced", Icon: Boxes },
  { name: "Docker Compose & Multi-stage", category: "devops", level: "advanced", Icon: Boxes },
  { name: "CI / CD (GitHub Actions)", category: "devops", level: "advanced", Icon: RefreshCw },
  { name: "Nginx Reverse Proxy & Load Balancer", category: "devops", level: "advanced", Icon: Network },
  { name: "Vercel, Render & VPS Deploy", category: "devops", level: "expert", Icon: Cloud },
  { name: "Cloudflare (CDN, SSL, DNS)", category: "devops", level: "advanced", Icon: Globe },

  // ==========================================
  // --- SYSTEM ADMINISTRATION & SECURITY ---
  // ==========================================
  { name: "Linux Server Admin (Ubuntu/Debian)", category: "sysadmin", level: "advanced", Icon: Terminal },
  { name: "Bash Scripting & Automation", category: "sysadmin", level: "advanced", Icon: Code2 },
  { name: "SSH, Key-based Auth & Hardening", category: "sysadmin", level: "expert", Icon: Lock },
  { name: "SSL / TLS & Let's Encrypt", category: "sysadmin", level: "expert", Icon: ShieldCheck },
  { name: "Systemd Services & PM2 Process Mgr", category: "sysadmin", level: "expert", Icon: Activity },
  { name: "UFW Firewall & Port Management", category: "sysadmin", level: "advanced", Icon: ShieldCheck },
  { name: "Server Logs & Cron Jobs", category: "sysadmin", level: "advanced", Icon: Settings },

  // ==========================================
  // --- DATABASES & CACHING ---
  // ==========================================
  { name: "MongoDB & Mongoose ODM", category: "database", level: "expert", Icon: Database },
  { name: "PostgreSQL", category: "database", level: "advanced", Icon: HardDrive },
  { name: "MySQL & Relational Queries", category: "database", level: "advanced", Icon: Database },
  { name: "Redis (Caching & Fast Store)", category: "database", level: "advanced", Icon: Zap },
  { name: "Prisma ORM & Migrations", category: "database", level: "advanced", Icon: Workflow },
  { name: "Firebase & Firestore", category: "database", level: "intermediate", Icon: Cloud },

  // ==========================================
  // --- TOOLS & WORKFLOW ---
  // ==========================================
  { name: "Git & GitHub Collaboration", category: "tools", level: "expert", Icon: GitBranch },
  { name: "Postman & Swagger / OpenAPI", category: "tools", level: "expert", Icon: Search },
  { name: "Vite & Modern Build Tools", category: "tools", level: "expert", Icon: Zap },
  { name: "Linux CLI & Vim / Nano", category: "tools", level: "advanced", Icon: Terminal },
  { name: "ESLint, Prettier & Code Standards", category: "tools", level: "expert", Icon: Wrench }
];
