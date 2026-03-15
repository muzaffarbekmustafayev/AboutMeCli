import React, { useMemo } from "react";
import { 
  Briefcase, 
  GraduationCap, 
  ShieldCheck, 
  Sparkles, 
  Sigma, 
  Cpu, 
  ScanSearch, 
  Target, 
  MapPin,
  Code2,
  Layers,
  Zap
} from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "../components/SEO";

function About() {
  const { t } = useTranslation();

  const pillars = useMemo(
    () => [
      {
        icon: <Layers size={20} className="text-white" />,
        title: t("about.pillar.product", { defaultValue: "Product Thinking" }),
        text: t("about.stack"),
      },
      {
        icon: <ShieldCheck size={20} className="text-white" />,
        title: t("about.pillar.security", { defaultValue: "System Security" }),
        text: t("about.experience"),
      },
      {
        icon: <Zap size={20} className="text-white" />,
        title: t("about.pillar.growth", { defaultValue: "Growth Mindset" }),
        text: t("about.interests"),
      },
    ],
    [t]
  );

  const technologies = useMemo(
    () => [
      "React", "Node.js", "JavaScript", "TypeScript", 
      "MongoDB", "Express.js", "Tailwind CSS", "Next.js", 
      "Git", "REST APIs", "Redux", "Firebase"
    ],
    []
  );

  const journey = useMemo(
    () => [
      {
        period: t("about.journey.studyPeriod", { defaultValue: "2022 - Present" }),
        title: t("about.journey.studyTitle", { defaultValue: "Software Engineering" }),
        text: t("about.intro"),
      },
      {
        period: t("about.journey.buildPeriod", { defaultValue: "2023 - Present" }),
        title: t("about.journey.buildTitle", { defaultValue: "Full-Stack Development" }),
        text: t("about.experience"),
      },
      {
        period: t("about.journey.nextPeriod", { defaultValue: "Forward" }),
        title: t("about.journey.nextTitle", { defaultValue: "Engineering Impact" }),
        text: t("about.mission"),
      },
    ],
    [t]
  );

  const technicalBackground = useMemo(
    () => [
      {
        icon: <Sigma size={20} className="text-blue-600 dark:text-blue-400" />,
        title: t("about.background.mathTitle", { defaultValue: "Mathematics" }),
        text: t("about.background.mathText", {
          defaultValue: "Precise thinking and abstraction through a strong mathematical foundation.",
        }),
      },
      {
        icon: <Cpu size={20} className="text-blue-600 dark:text-blue-400" />,
        title: t("about.background.physicsTitle", { defaultValue: "Systems" }),
        text: t("about.background.physicsText", {
          defaultValue: "Analyzing dependencies and cause-effect relationships in complex structures.",
        }),
      },
      {
        icon: <ScanSearch size={20} className="text-blue-600 dark:text-blue-400" />,
        title: t("about.background.engineeringTitle", { defaultValue: "Execution" }),
        text: t("about.background.engineeringText", {
          defaultValue: "Connecting theoretical concepts with maintainable practical implementations.",
        }),
      },
    ],
    [t]
  );

  return (
    <>
      <SEO
        title={t("about.title", { defaultValue: "About" })}
        description={t("about.description", { defaultValue: "Learn more about me" })}
        path="/about"
      />

      <section id="about" className="section-shell min-h-screen px-4 pt-28 pb-20 text-slate-700 dark:text-slate-300 sm:px-6 sm:pt-32">
        <div className="mx-auto w-full max-w-7xl">
          
          {/* Header */}
          <header className="mb-16 space-y-4 max-w-3xl">
            <div className="hero-badge">
              <Sparkles size={14} />
              {t("about.title")}
            </div>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl lg:text-6xl">
              {t("about.intro").split('.')[0]}.
            </h1>
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              {t("about.stack")}
            </p>
          </header>

          <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
            
            <div className="space-y-16">
              {/* Mission & Key Info */}
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
                <div className="glass-card rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                    <Target size={18} />
                    <span className="text-xs font-bold uppercase tracking-wider">{t("about.missionLabel")}</span>
                  </div>
                  <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
                    {t("about.mission")}
                  </p>
                </div>
                <div className="glass-card rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                    <MapPin size={18} />
                    <span className="text-xs font-bold uppercase tracking-wider">Location</span>
                  </div>
                  <p className="mt-4 text-lg font-bold text-slate-900 dark:text-slate-100">
                    Samarkand, Uzbekistan
                  </p>
                </div>
              </div>

              {/* Pillars */}
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {pillars.map((item) => (
                  <div key={item.title} className="group glass-card rounded-2xl p-6 transition-all hover:translate-y-[-4px]">
                    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-700 to-blue-500 text-white shadow-lg shadow-blue-700/20 transition-transform group-hover:scale-110">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Tech Stack */}
              <section>
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
                  <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    <Code2 size={16} />
                    {t("about.techTitle")}
                  </h2>
                  <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                  {technologies.map((tech) => (
                    <span key={tech} className="control-surface rounded-full px-5 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm transition-all hover:scale-105">
                      {tech}
                    </span>
                  ))}
                </div>
              </section>

              {/* Journey */}
              <section>
                <h2 className="mb-10 text-xl font-bold text-slate-900 dark:text-slate-100">
                  The Journey
                </h2>
                <div className="space-y-10">
                  {journey.map((item, idx) => (
                    <div key={idx} className="relative flex gap-8 pb-4">
                      {idx !== journey.length - 1 && (
                        <div className="absolute left-[23px] top-12 h-full w-0.5 bg-slate-100 dark:bg-slate-800" />
                      )}
                      <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-700 to-blue-500 text-white shadow-lg shadow-blue-700/20">
                        <span className="text-sm font-bold">{idx + 1}</span>
                      </div>
                      <div className="pt-1">
                        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">{item.period}</span>
                        <h4 className="mt-1 text-xl font-bold text-slate-900 dark:text-slate-100">{item.title}</h4>
                        <p className="mt-3 text-base leading-relaxed text-slate-500 dark:text-slate-400">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar / Secondary Info */}
            <aside className="space-y-12">
              {/* Quote Panel */}
              <div className="rounded-[2.5rem] bg-gradient-to-br from-blue-700 to-blue-600 p-8 text-white shadow-2xl shadow-blue-700/30">
                <p className="text-xs font-bold uppercase tracking-widest text-blue-100/70">Philosophy</p>
                <blockquote className="mt-8 font-display text-3xl font-bold leading-tight text-white">
                  "{t("about.quote")}"
                </blockquote>
                <p className="mt-8 text-base leading-relaxed text-blue-100/80 italic">
                  {t("about.experience")}
                </p>
              </div>

              {/* Background Cards */}
              <div className="space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Foundation</h3>
                {technicalBackground.map((item) => (
                  <div key={item.title} className="glass-card rounded-3xl p-6 shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                        {item.icon}
                      </div>
                      <span className="text-base font-bold text-slate-900 dark:text-slate-100">{item.title}</span>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Competencies */}
              <div className="rounded-3xl bg-slate-100/50 p-8 dark:bg-slate-800/30">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Focus Areas</h3>
                <div className="flex flex-wrap gap-2">
                  {["Architecture", "Clean Code", "Security", "Scalability", "UX"].map(tag => (
                    <span key={tag} className="control-surface rounded-full px-4 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300">#{tag}</span>
                  ))}
                </div>
              </div>
            </aside>

          </div>
        </div>
      </section>
    </>
  );
}

export default About;
