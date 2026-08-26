import React, { useEffect, useRef, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Code,
  ExternalLink,
  Linkedin,
  Github,
  Award,
  Calendar,
  ChevronRight,
  Youtube,
  Sparkles,
  Globe,
  Cpu,
  Server,
  Layers,
  Database,
  Terminal,
  Bot
} from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "../components/SEO";
import { socialMedias } from "../data/socialMedias";
import CVDownload from "../components/CVdownload";

const Resume = () => {
  const { t } = useTranslation();

  return (
    <div className="section-shell min-h-screen transition-colors duration-300 text-slate-700 dark:text-slate-300">
      <SEO title="Resume" description="My professional background" path="/resume" />

      <div className="max-w-7xl mx-auto px-4 py-28 sm:px-6 sm:pt-32">
        
        {/* Header Section */}
        <header className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="space-y-5">
            <div className="hero-badge">
              <Sparkles size={14} />
              Professional Profile
            </div>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl lg:text-6xl">
              Muzaffarbek Mustafayev
            </h1>
            <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
              {t("resume.role")}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm sm:text-base text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-2 font-medium">
                <Globe size={18} className="text-blue-500" />
                <a href="https://muzaffarbek.uz" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 underline-offset-4 hover:underline">
                  muzaffarbek.uz
                </a>
              </span>
              <span className="hidden sm:inline text-slate-300 dark:text-slate-700">|</span>
              <span className="flex items-center gap-2 font-medium">
                <Code size={18} className="text-blue-500" /> {t("resume.stack")}
              </span>
              <span className="hidden sm:inline text-slate-300 dark:text-slate-700">|</span>
              <span className="flex items-center gap-2 font-medium">
                <MapPin size={18} className="text-blue-500" /> {t("resume.location")}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <CVDownload />
          </div>
        </header>

        <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
          
          {/* Main Content */}
          <main className="space-y-16">
            
            {/* Summary */}
            <section>
              <SectionHeader icon={<Award size={24} />} title={t("resume.summary.title")} />
              <p className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                {t("resume.summary.text")}
              </p>
            </section>

            {/* Experience & Scientific Timeline */}
            <section>
              <SectionHeader icon={<Briefcase size={24} />} title={t("resume.experience.title")} />
              <div className="mt-8 space-y-10">
                <div className="relative pl-8 pb-4">
                  <div className="absolute left-0 top-2 h-full w-0.5 bg-blue-500/20 dark:bg-blue-500/30" />
                  <div className="absolute -left-[5px] top-2 h-3 w-3 rounded-full bg-blue-500 shadow-[0_0_0_6px_rgba(59,130,246,0.2)]" />
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{t("resume.experience.role")}</h3>
                    <span className="inline-flex rounded-full bg-blue-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 border border-blue-500/20">{t("resume.experience.period")}</span>
                  </div>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">{t("resume.experience.company")}</p>
                  
                  <ul className="space-y-3.5">
                    {t("resume.experience.tasks", { returnObjects: true }).map((item, i) => (
                      <li key={i} className="flex items-start gap-3.5 text-base leading-relaxed text-slate-600 dark:text-slate-300">
                        <ChevronRight size={18} className="mt-1 text-blue-500 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Education (Detailed 4-Stage Chronological Block) */}
            <section>
              <SectionHeader icon={<GraduationCap size={24} />} title={t("resume.education.title")} />
              <div className="mt-8 space-y-6">
                
                {/* 1. TSU - Master */}
                <div className="group glass-card rounded-2xl p-6 transition-all hover:border-blue-500/30">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                      {t("resume.education.tsu.school")}
                    </h3>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 font-mono">
                      {t("resume.education.tsu.period")}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-md bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-2 border border-emerald-500/20">
                    {t("resume.education.tsu.degree")}
                  </div>
                  <p className="text-base text-slate-600 dark:text-slate-300">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">Yo'nalish / Направление:</span> {t("resume.education.tsu.major")}
                  </p>
                </div>

                {/* 2. SamDU - Bachelor */}
                <div className="group glass-card rounded-2xl p-6 transition-all hover:border-blue-500/30">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                      {t("resume.education.samdu.school")}
                    </h3>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 font-mono">
                      {t("resume.education.samdu.period")}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-md bg-blue-500/10 px-2.5 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-2 border border-blue-500/20">
                    {t("resume.education.samdu.degree")}
                  </div>
                  <p className="text-base text-slate-600 dark:text-slate-300">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">Yo'nalish / Направление:</span> {t("resume.education.samdu.major")}
                  </p>
                </div>

                {/* 3. SamDU Academic Lyceum */}
                <div className="group glass-card rounded-2xl p-6 transition-all hover:border-purple-500/30">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                      {t("resume.education.lyceum.school")}
                    </h3>
                    <span className="text-xs font-bold text-purple-600 dark:text-purple-400 font-mono">
                      {t("resume.education.lyceum.period")}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-md bg-purple-500/10 px-2.5 py-1 text-xs font-semibold text-purple-600 dark:text-purple-400 mb-2 border border-purple-500/20">
                    {t("resume.education.lyceum.degree")}
                  </div>
                  <p className="text-base text-slate-600 dark:text-slate-300">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">Yo'nalish / Направление:</span> {t("resume.education.lyceum.major")}
                  </p>
                </div>

                {/* 4. 38-General Secondary School */}
                <div className="group glass-card rounded-2xl p-6 transition-all hover:border-amber-500/30">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                      {t("resume.education.school.school")}
                    </h3>
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400 font-mono">
                      {t("resume.education.school.period")}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-md bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400 mb-2 border border-amber-500/20">
                    {t("resume.education.school.degree")}
                  </div>
                  <p className="text-base text-slate-600 dark:text-slate-300">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">Yo'nalish / Направление:</span> {t("resume.education.school.major")}
                  </p>
                </div>

              </div>
            </section>

            {/* Featured Projects & Scientific Research */}
            <section>
              <SectionHeader icon={<Code size={24} />} title={t("resume.projects.title")} />
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <ProjectCard 
                  title={t("resume.projects.asrTitle")} 
                  desc={t("resume.projects.asrDesc")} 
                  label="Speech AI & Research"
                  link="https://doi.org/10.5281/zenodo.21299321"
                />
                <ProjectCard 
                  title={t("resume.projects.sammeetTitle")} 
                  desc={t("resume.projects.sammeetDesc")} 
                  label="WebRTC & Video" 
                />
                <ProjectCard 
                  title={t("resume.projects.tourismTitle")} 
                  desc={t("resume.projects.tourismDesc")} 
                  label="Inclusive Tourism" 
                />
                <ProjectCard 
                  title={t("resume.projects.ruralTitle")} 
                  desc={t("resume.projects.ruralDesc")} 
                  label="HealthTech Startup" 
                />
                <ProjectCard 
                  title={t("resume.projects.aiBotsTitle")} 
                  desc={t("resume.projects.aiBotsDesc")} 
                  label="LLM & Automation" 
                  className="sm:col-span-2"
                />
              </div>
            </section>
          </main>

          {/* Sidebar */}
          <aside className="space-y-12">
            
            {/* Contact Information */}
            <section className="glass-card rounded-3xl p-6 sm:p-8 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">{t("menu.contact")}</h3>
              <div className="space-y-5">
                <ContactItem icon={<Globe size={18} />} label="Portfolio" value="muzaffarbek.uz" href="https://muzaffarbek.uz" />
                <ContactItem icon={<Mail size={18} />} label={t("contact.email")} value="muzaffarbekmustafayev@gmail.com" href="mailto:muzaffarbekmustafayev@gmail.com" />
                <ContactItem icon={<Phone size={18} />} label={t("contact.phone")} value={socialMedias.phone.path} href={`tel:${socialMedias.phone.path}`} />
                <div className="flex gap-3 pt-4 border-t border-slate-200/50 dark:border-white/[0.06]">
                  <SocialIcon href={socialMedias.linkedin.path} icon={<Linkedin size={20} />} />
                  <SocialIcon href={socialMedias.github.path} icon={<Github size={20} />} />
                  <SocialIcon href={socialMedias.youtube.path} icon={<Youtube size={20} />} />
                </div>
              </div>
            </section>

            {/* Technical & Fundamental Skills Sidebar */}
            <section className="glass-card rounded-3xl p-6 sm:p-8 space-y-8">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">{t("resume.skills.title")}</h3>
              
              <SkillSet 
                title={t("resume.skills.math", { defaultValue: "Matematika & Fundamental Fanlar" })} 
                items={["Differensial tenglamalar (ODE/PDE)", "Matematik analiz", "Chiziqli algebra", "Ehtimollar nazariyasi & Statistika", "Diskret matematika", "Fizika & Dinamika"]} 
              />
              <SkillSet 
                title={t("resume.skills.ai")} 
                items={["Whisper ASR", "Wav2Vec 2.0", "VOSK", "MediaPipe", "TensorFlow.js", "Gemini API", "Claude Code", "OpenRouter"]} 
              />
              <SkillSet 
                title={t("resume.skills.frontend")} 
                items={["React", "Next.js", "TypeScript", "Tailwind CSS", "React Native", "Expo"]} 
              />
              <SkillSet 
                title={t("resume.skills.backend")} 
                items={["Node.js", "Express.js", "FastAPI (Python)", "REST APIs", "WebSockets", "WebRTC"]} 
              />
              <SkillSet 
                title={t("resume.skills.database")} 
                items={["MongoDB", "PostgreSQL", "SQLAlchemy", "Redis"]} 
              />
              <SkillSet 
                title={t("resume.skills.robotics")} 
                items={["Mexatronika", "ESP32", "Raspberry Pi Zero 2 W"]} 
              />
              <SkillSet 
                title={t("resume.skills.devops")} 
                items={["Linux (Ubuntu/Debian)", "Nginx", "Reverse Proxy", "SSL (Let's Encrypt)", "Git/GitHub"]} 
              />
            </section>

            {/* Languages */}
            <section className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">{t("resume.languages.title")}</h3>
              <div className="space-y-5">
                <LanguageProgress label={t("resume.languages.uz")} value="100%" />
                <LanguageProgress label={t("resume.languages.en")} value="85%" />
                <LanguageProgress label={t("resume.languages.ru")} value="80%" />
              </div>
            </section>

          </aside>
        </div>

        <footer className="mt-24 border-t border-slate-200/60 pt-10 text-center dark:border-slate-800">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
            {t("resume.footer", { year: new Date().getFullYear() })}
          </p>
        </footer>
      </div>
    </div>
  );
};

const SectionHeader = ({ icon, title }) => (
  <div className="flex items-center gap-4 border-b border-slate-200/60 pb-3.5 dark:border-slate-800">
    <div className="text-blue-600 dark:text-blue-400">{icon}</div>
    <h2 className="text-base sm:text-lg font-extrabold uppercase tracking-widest text-slate-900 dark:text-slate-100">{title}</h2>
  </div>
);

const ProjectCard = ({ title, desc, label, link, className = "" }) => (
  <div className={`group glass-card rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 ${className}`}>
    <div className="flex items-start justify-between gap-4 mb-3">
      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {title}
      </h3>
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-500 transition-colors">
          <ExternalLink size={18} />
        </a>
      ) : (
        <ExternalLink size={18} className="text-slate-300 dark:text-slate-600 group-hover:text-blue-500 transition-colors" />
      )}
    </div>
    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{desc}</p>
    <div className="mt-5 inline-flex rounded-full bg-blue-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 border border-blue-500/20">
      {label}
    </div>
  </div>
);

const ContactItem = ({ icon, label, value, href }) => (
  <div className="group space-y-1">
    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</p>
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="flex items-center gap-3 text-sm sm:text-base font-semibold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400 break-all">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 transition-all duration-200 group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-500/20 dark:text-blue-400">
        {icon}
      </div>
      <span>{value}</span>
    </a>
  </div>
);

const SocialIcon = ({ href, icon }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/80 bg-white text-slate-500 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-600 hover:shadow-md hover:shadow-blue-500/15 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:text-blue-400">
    {icon}
  </a>
);

const SkillSet = ({ title, items }) => (
  <div className="space-y-3">
    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 tracking-wide uppercase">{title}</h4>
    <div className="flex flex-wrap gap-2">
      {items.map(item => (
        <span key={item} className="inline-flex rounded-lg border border-slate-200/80 bg-white/70 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 shadow-sm transition-all duration-200 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 cursor-default">
          {item}
        </span>
      ))}
    </div>
  </div>
);

const LanguageProgress = ({ label, value }) => {
  const [width, setWidth] = useState("0%");
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWidth(value);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div className="space-y-2.5" ref={ref}>
      <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
        <span className="text-slate-600 dark:text-slate-300">{label}</span>
        <span className="text-blue-600 dark:text-blue-400 font-mono">{value}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200/60 dark:bg-slate-800 shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-[width] duration-1000 ease-out"
          style={{ width }}
        />
      </div>
    </div>
  );
};

export default Resume;
