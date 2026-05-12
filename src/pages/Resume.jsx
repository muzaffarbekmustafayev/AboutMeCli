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
  Globe
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
            <h1 className="font-display text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-6xl lg:text-7xl">
              Muzaffarbek Mustafayev
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-lg text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-2 font-semibold"><Briefcase size={20} className="text-blue-500" /> {t("resume.role")}</span>
              <span className="hidden sm:inline text-slate-200 dark:text-slate-800">|</span>
              <span className="flex items-center gap-2 font-semibold"><Code size={20} className="text-blue-500" /> {t("resume.stack")}</span>
              <span className="hidden sm:inline text-slate-200 dark:text-slate-800">|</span>
              <span className="flex items-center gap-2 font-semibold"><MapPin size={20} className="text-blue-500" /> {t("resume.location")}</span>
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
              <p className="mt-8 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                {t("resume.summary.text")}
              </p>
            </section>

            {/* Experience */}
            <section>
              <SectionHeader icon={<Briefcase size={24} />} title={t("resume.experience.title")} />
              <div className="mt-10 space-y-12">
                <div className="relative pl-10 pb-6">
                  <div className="absolute left-0 top-2 h-full w-0.5 bg-slate-100 dark:bg-slate-800" />
                  <div className="absolute -left-[5px] top-2 h-3 w-3 rounded-full bg-blue-500 shadow-[0_0_0_6px_rgba(59,130,246,0.1)]" />
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{t("resume.experience.role")}</h3>
                    <span className="control-surface rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">{t("resume.experience.period")}</span>
                  </div>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">{t("resume.experience.company")}</p>
                  
                  <ul className="space-y-4">
                    {t("resume.experience.tasks", { returnObjects: true }).map((item, i) => (
                      <li key={i} className="flex items-start gap-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
                        <ChevronRight size={20} className="mt-1 text-blue-500 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Featured Projects */}
            <section>
              <SectionHeader icon={<Code size={24} />} title={t("resume.projects.title")} />
              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                <ProjectCard 
                  title={t("resume.projects.aiTitle")} 
                  desc={t("resume.projects.ai")} 
                  label={t("resume.projects.live")} 
                />
                <ProjectCard 
                  title={t("resume.projects.faceTitle")} 
                  desc={t("resume.projects.face")} 
                  label={t("resume.projects.live")} 
                />
              </div>
            </section>
          </main>

          {/* Sidebar */}
          <aside className="space-y-16">
            
            {/* Contact Information */}
            <section className="glass-card rounded-[2.5rem] p-8 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">Direct Contact</h3>
              <div className="space-y-6">
                <ContactItem icon={<Mail size={18} />} label="Email" value="muzaffarbekmustafayev@gmail.com" href="mailto:muzaffarbekmustafayev@gmail.com" />
                <ContactItem icon={<Phone size={18} />} label="Phone" value={socialMedias.phone.path} href={`tel:${socialMedias.phone.path}`} />
                <div className="flex gap-4 pt-6">
                  <SocialIcon href={socialMedias.linkedin.path} icon={<Linkedin size={22} />} />
                  <SocialIcon href={socialMedias.github.path} icon={<Github size={22} />} />
                  <SocialIcon href={socialMedias.youtube.path} icon={<Youtube size={22} />} />
                </div>
              </div>
            </section>

            {/* Technical Skills */}
            <section>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">{t("resume.skills.title")}</h3>
              <div className="space-y-10">
                <SkillSet title={t("resume.skills.frontend")} items={["React", "JS (ES6+)", "TS", "Redux", "Tailwind"]} />
                <SkillSet title={t("resume.skills.backend")} items={["Node.js", "Express", "Python", "FastAPI", "MongoDB"]} />
              </div>
            </section>

            {/* Education */}
            <section>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">{t("resume.education.title")}</h3>
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">{t("resume.education.degree")}</h4>
                <p className="text-sm font-bold text-blue-500 uppercase tracking-widest">{t("resume.education.period")}</p>
                <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">{t("resume.education.school")}</p>
              </div>
            </section>

            {/* Languages */}
            <section>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">{t("resume.languages.title")}</h3>
              <div className="space-y-6">
                <LanguageProgress label={t("resume.languages.uz")} value="100%" />
                <LanguageProgress label={t("resume.languages.en")} value="80%" />
                <LanguageProgress label={t("resume.languages.ru")} value="75%" />
              </div>
            </section>

          </aside>
        </div>

        <footer className="mt-28 border-t border-slate-100 pt-12 text-center dark:border-slate-800">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
            {t("resume.footer", { year: new Date().getFullYear() })}
          </p>
        </footer>
      </div>
    </div>
  );
};

const SectionHeader = ({ icon, title }) => (
  <div className="flex items-center gap-5 border-b border-slate-100 pb-4 dark:border-slate-800">
    <div className="text-blue-600 dark:text-blue-400">{icon}</div>
    <h2 className="text-lg font-extrabold uppercase tracking-widest text-slate-900 dark:text-slate-100">{title}</h2>
  </div>
);

const ProjectCard = ({ title, desc, label }) => (
  <div className="group glass-card rounded-[2rem] p-8 transition-all hover:translate-y-[-4px] hover:shadow-2xl hover:shadow-blue-500/10">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors">{title}</h3>
      <ExternalLink size={20} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
    </div>
    <p className="text-base leading-relaxed text-slate-500 dark:text-slate-400">{desc}</p>
    <div className="mt-6 inline-flex rounded-full bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
      {label}
    </div>
  </div>
);

const ContactItem = ({ icon, label, value, href }) => (
  <div className="group space-y-2">
    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</p>
    <a href={href} className="flex items-center gap-4 text-base font-semibold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-500 transition-all duration-200 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-md group-hover:shadow-blue-500/20 dark:bg-blue-900/30">
        {icon}
      </div>
      {value}
    </a>
  </div>
);

const SocialIcon = ({ href, icon }) => (
  <a href={href} className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-100 bg-white text-slate-400 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:text-blue-600 hover:shadow-md hover:shadow-blue-500/15 dark:border-slate-800 dark:bg-slate-900 dark:hover:text-blue-400">
    {icon}
  </a>
);

const SkillSet = ({ title, items }) => (
  <div className="space-y-5">
    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 tracking-tight uppercase">{title}</h4>
    <div className="flex flex-wrap gap-2.5">
      {items.map(item => (
        <span key={item} className="control-surface rounded-full px-4 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:text-blue-600 hover:border-blue-300 dark:hover:text-blue-400 dark:hover:border-blue-500/40 cursor-default">
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
    <div className="space-y-3" ref={ref}>
      <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
        <span className="text-slate-500 dark:text-slate-400">{label}</span>
        <span className="text-blue-600 dark:text-blue-400">{value}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800 shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-blue-700 to-blue-500 transition-[width] duration-1000 ease-out"
          style={{ width }}
        />
      </div>
    </div>
  );
};

export default Resume;
