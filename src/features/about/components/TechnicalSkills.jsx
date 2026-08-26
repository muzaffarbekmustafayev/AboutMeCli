import React, { useMemo, memo } from "react";
import { useTranslation } from "react-i18next";
import { Code2, Smartphone, Server, Database, Award, Bot, Cpu, Wrench } from "lucide-react";

const TechnicalSkills = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || "uz";

  const skillGroups = useMemo(() => [
    {
      category: "Frontend & Mobile",
      icon: <Smartphone className="h-5 w-5 text-sky-500" />,
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "React Native", "Expo", "HTML5/CSS3"]
    },
    {
      category: "Backend & Real-time",
      icon: <Server className="h-5 w-5 text-emerald-500" />,
      skills: ["Node.js", "Express.js", "FastAPI (Python)", "RESTful APIs", "WebSockets", "WebRTC", "Simple-Peer"]
    },
    {
      category: "Databases",
      icon: <Database className="h-5 w-5 text-amber-500" />,
      skills: ["MongoDB", "PostgreSQL", "SQLAlchemy", "Redis", "Mongoose"]
    },
    {
      category: t("about.skills.mathCategory", { defaultValue: "Matematika & Fundamental Fanlar" }),
      icon: <Award className="h-5 w-5 text-indigo-500" />,
      skills: t("about.skills.mathItems", { 
        returnObjects: true, 
        defaultValue: [
          "Differensial tenglamalar (ODE/PDE)", "Matematik analiz", "Chiziqli algebra", 
          "Ehtimollar nazariyasi & Statistika", "Diskret matematika & Graflar", "Fizika & Mexatronika dinamikasi"
        ]
      })
    },
    {
      category: "AI, ML & ASR",
      icon: <Bot className="h-5 w-5 text-purple-500" />,
      skills: [
        "Speech-to-Text / ASR", "Whisper", "Wav2Vec 2.0", "VOSK",
        "Computer Vision", "MediaPipe", "TensorFlow.js",
        "LLM & Agents", "Gemini API", "Claude Code", "OpenRouter"
      ]
    },
    {
      category: t("about.skills.roboticsCategory", { defaultValue: "Robototexnika & Hardware" }),
      icon: <Cpu className="h-5 w-5 text-rose-500" />,
      skills: t("about.skills.roboticsItems", {
        returnObjects: true,
        defaultValue: ["Mexatronika asoslari", "ESP32", "Raspberry Pi Zero 2 W", "Microcontroller interfacing", "Sensors & Actuators"]
      })
    },
    {
      category: "DevOps & Server",
      icon: <Wrench className="h-5 w-5 text-cyan-500" />,
      skills: ["Linux (Ubuntu/Debian)", "Nginx", "Reverse Proxy", "SSL (Let's Encrypt)", "Git & GitHub", "CI/CD"]
    }
  ], [lang, t]);

  return (
    <section>
      <div className="flex items-center gap-3 mb-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/25 dark:bg-indigo-500">
          <Code2 size={20} />
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-slate-100">
            {t("about.skills.title")}
          </h2>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {t("about.skills.subtitle")}
          </p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {skillGroups.map((group, idx) => (
          <div key={idx} className="glass-card rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500/20">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 dark:bg-white/[0.06]">
                {group.icon}
              </div>
              <h3 className="font-display text-sm font-bold text-slate-900 dark:text-slate-100">
                {group.category}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span key={skill} className="inline-flex rounded-lg border border-slate-200/80 bg-white/80 px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-blue-400 hover:text-blue-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:border-blue-400 dark:hover:text-blue-400 cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default memo(TechnicalSkills);
