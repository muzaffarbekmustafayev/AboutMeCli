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
import CVDownload from "../components/CVdownload";
import SectionHeader from "../components/ui/SectionHeader";
import ProjectCard from "../components/ui/ProjectCard";
import ResumeSidebar from "../features/resume/components/ResumeSidebar";
import ExperienceTimeline from "../features/resume/components/ExperienceTimeline";
import EducationBlock from "../features/resume/components/EducationBlock";

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

            <ExperienceTimeline />

            {/* Education (Detailed 4-Stage Chronological Block) */}
            <EducationBlock />

            {/* Featured Projects & Scientific Research */}
            <section>
              <SectionHeader icon={<Code size={24} />} title={t("resume.projects.title")} />
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <ProjectCard 
                  title={t("resume.projects.asrTitle")} 
                  desc={t("resume.projects.asrDesc")} 
                  label={t("resume.projects.labels.asr", { defaultValue: "Speech AI & Research" })}
                  link="https://doi.org/10.5281/zenodo.21299321"
                />
                <ProjectCard 
                  title={t("resume.projects.sammeetTitle")} 
                  desc={t("resume.projects.sammeetDesc")} 
                  label={t("resume.projects.labels.webrtc", { defaultValue: "WebRTC & Video" })} 
                />
                <ProjectCard 
                  title={t("resume.projects.tourismTitle")} 
                  desc={t("resume.projects.tourismDesc")} 
                  label={t("resume.projects.labels.tourism", { defaultValue: "Inclusive Tourism" })} 
                />
                <ProjectCard 
                  title={t("resume.projects.ruralTitle")} 
                  desc={t("resume.projects.ruralDesc")} 
                  label={t("resume.projects.labels.healthtech", { defaultValue: "HealthTech Startup" })} 
                />
                <ProjectCard 
                  title={t("resume.projects.aiBotsTitle")} 
                  desc={t("resume.projects.aiBotsDesc")} 
                  label={t("resume.projects.labels.llm", { defaultValue: "LLM & Automation" })} 
                  className="sm:col-span-2"
                />
              </div>
            </section>
          </main>

          <ResumeSidebar />
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


export default Resume;
