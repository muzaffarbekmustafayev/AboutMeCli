import React, { useMemo } from "react";
import { 
  Sparkles, 
  MapPin,
  Globe2,
  ExternalLink
} from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "../components/SEO";
import EducationTimeline from "../features/about/components/EducationTimeline";
import TechnicalSkills from "../features/about/components/TechnicalSkills";
import ProjectsResearch from "../features/about/components/ProjectsResearch";
import AboutSidebar from "../features/about/components/AboutSidebar";

function About() {
  const { t } = useTranslation();

  return (
    <>
      <SEO
        title={t("about.title", { defaultValue: "Men haqimda" })}
        description="Muzaffarbek Mustafayev - Senior Software Engineer, AI & Speech Technologies Researcher"
        path="/about"
      />

      <div className="section-shell min-h-screen px-4 pt-28 pb-20 text-slate-700 dark:text-slate-300 sm:px-6 sm:pt-32 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          
          {/* Header Profile Hero */}
          <header className="mb-16 space-y-6 max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-blue-700 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-300">
              <Sparkles size={14} />
              {t("about.role", { defaultValue: "Senior Software Engineer · AI & Systems Researcher" })}
            </div>

            <h1 className="font-display text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl lg:text-6xl">
              Muzaffarbek Mustafayev
            </h1>

            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300 sm:text-xl">
              {t("about.intro")}
            </p>

            {/* Quick Meta Row */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200">
                <MapPin size={14} className="text-blue-500" />
                {t("about.location", { defaultValue: "Samarqand, O'zbekiston · Tomsk, Rossiya" })}
              </span>
              <a
                href="https://muzaffarbek.uz"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-blue-200/80 bg-blue-50/80 px-3.5 py-1.5 text-xs font-semibold text-blue-700 transition-colors hover:bg-blue-100 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-300"
              >
                <Globe2 size={14} />
                muzaffarbek.uz
                <ExternalLink size={12} />
              </a>
            </div>
          </header>

          <div className="grid gap-14 lg:grid-cols-12">
            
            {/* Main Column (8 cols) */}
            <div className="space-y-16 lg:col-span-8">
              
              {/* Ta'lim (Education) Section - Chronological Timeline */}
              <EducationTimeline />

              {/* Texnik Ko'nikmalar (Technical Skills) Section */}
              <TechnicalSkills />

              {/* Asosiy Loyihalar va Ilmiy Faoliyat Section */}
              <ProjectsResearch />

            </div>

            {/* Sidebar Column (4 cols) */}
            <AboutSidebar />

          </div>
        </div>
      </div>
    </>
  );
}

export default About;
