import React, { useState, useMemo, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectCoverflow, Keyboard } from "swiper/modules";
import SEO from "../components/SEO";
import {
  Code2,
  Database,
  Layout,
  Settings,
  Terminal,
  Cpu,
  Zap,
  Layers,
  Sparkles,
  Search,
  CheckCircle2,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const SKILLS = [
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

  { name: "Git", category: "tools", level: "advanced", icon: <Settings size={20} /> },
  { name: "GitHub", category: "tools", level: "expert", icon: <Terminal size={20} /> },
  { name: "Postman", category: "tools", level: "advanced", icon: <Search size={20} /> },
  { name: "Vite", category: "tools", level: "intermediate", icon: <Zap size={20} /> },
];

const categoryConfig = {
  all: { icon: <Layers size={16} />, label: "All Tech" },
  frontend: { icon: <Layout size={16} />, label: "Frontend" },
  backend: { icon: <Settings size={16} />, label: "Backend" },
  database: { icon: <Database size={16} />, label: "Database" },
  tools: { icon: <Terminal size={16} />, label: "Tools" },
};

function Skills() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const swiperRef = useRef(null);

  const filteredSkills = useMemo(() => {
    return SKILLS.filter(skill => {
      const matchesCategory = activeCategory === "all" || skill.category === activeCategory;
      const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const stats = useMemo(() => ({
    total: SKILLS.length,
    expert: SKILLS.filter(s => s.level === "expert").length,
    advanced: SKILLS.filter(s => s.level === "advanced").length,
  }), []);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(0);
    }
  }, [activeCategory, searchQuery]);

  return (
    <>
      <SEO
        title={t("skills.title", { defaultValue: "Skills" })}
        description={t("skills.description", { defaultValue: "My technical skills" })}
        path="/skills"
      />

      <section id="skills" className="section-shell min-h-screen px-4 pt-28 pb-20 text-slate-700 dark:text-slate-300 sm:px-6 sm:pt-32">
        <div className="mx-auto w-full max-w-7xl">
          
          {/* Header */}
          <header className="mb-16 space-y-4 max-w-3xl">
            <div className="hero-badge">
              <Sparkles size={14} />
              Stack
            </div>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl lg:text-6xl">
              {t("skills.title")}
            </h1>
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              {t("skills.subtitle")}
            </p>
          </header>

          {/* Stats Bar */}
          <div className="mb-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
            <div className="glass-card rounded-2xl p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Total</p>
              <p className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white">{stats.total}</p>
            </div>
            <div className="glass-card rounded-2xl p-6 shadow-sm border-blue-500/10">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Expert</p>
              <p className="mt-2 text-3xl font-extrabold text-blue-600 dark:text-blue-400">{stats.expert}</p>
            </div>
            <div className="glass-card rounded-2xl p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Advanced</p>
              <p className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white">{stats.advanced}</p>
            </div>
            <div className="hidden glass-card rounded-2xl p-6 shadow-sm sm:block">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Status</p>
              <div className="mt-2 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-widest">Active</span>
              </div>
            </div>
          </div>

          {/* Controls - Standardized to match Navbar item style */}
          <div className="mb-12 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="control-surface rounded-full p-1.5 flex flex-wrap items-center gap-1 shadow-lg">
              {Object.entries(categoryConfig).map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeCategory === key
                      ? "bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow-md"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700/60"
                  }`}
                >
                  {config.icon}
                  {t(`skills.categories.${key}`, { defaultValue: config.label })}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search tech..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-slate-100 bg-white py-3 pl-12 pr-6 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-200 shadow-sm"
              />
            </div>
          </div>

          {/* Carousel */}
          <div className="group relative">
            <button className="swiper-prev absolute -left-14 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-slate-100 bg-white text-slate-400 shadow-lg transition-all hover:text-blue-600 dark:border-slate-800 dark:bg-slate-900 lg:flex">
              <ChevronLeft size={24} />
            </button>
            <button className="swiper-next absolute -right-14 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-slate-100 bg-white text-slate-400 shadow-lg transition-all hover:text-blue-600 dark:border-slate-800 dark:bg-slate-900 lg:flex">
              <ChevronRight size={24} />
            </button>

            <Swiper
              modules={[Autoplay, Navigation, Pagination, EffectCoverflow, Keyboard]}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 }
              }}
              navigation={{
                prevEl: ".swiper-prev",
                nextEl: ".swiper-next",
              }}
              pagination={{ clickable: true, el: '.swiper-pagination-custom' }}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              keyboard={{ enabled: true }}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              className="!pb-16"
            >
              {filteredSkills.map((skill) => (
                <SwiperSlide key={skill.name}>
                  <div className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 transition-all hover:border-blue-200 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900/40">
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-700 to-blue-500 text-white shadow-lg transition-transform group-hover:scale-110">
                        {skill.icon}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 size={14} className={skill.level === 'expert' ? 'text-blue-500' : 'text-slate-300 dark:text-slate-700'} />
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          {t(`skills.levels.${skill.level}`)}
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-slate-100">
                      {skill.name}
                    </h3>
                    
                    <div className="mt-6 flex items-center gap-2">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800 shadow-inner">
                        <div 
                          className={`h-full rounded-full bg-gradient-to-r from-blue-700 to-blue-500 transition-all duration-1000 ${
                            skill.level === 'expert' ? 'w-full' : skill.level === 'advanced' ? 'w-[80%]' : 'w-[60%]'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            
            <div className="swiper-pagination-custom mt-6 flex justify-center gap-2" />
          </div>

          {/* Empty State */}
          {filteredSkills.length === 0 && (
            <div className="py-24 text-center">
              <p className="text-lg text-slate-400">No skills found matching your search.</p>
            </div>
          )}

          {/* Footer Note */}
          <footer className="mt-20 border-t border-slate-100 pt-12 dark:border-slate-800">
            <div className="rounded-[2.5rem] bg-slate-50 p-10 dark:bg-slate-800/30">
              <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                <div className="space-y-3">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight">Learning Path</h4>
                  <p className="max-w-md text-base leading-relaxed text-slate-500 dark:text-slate-400">
                    {t("skills.footer")}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {["System Architecture", "Scalable UI", "API Design"].map(tag => (
                    <span key={tag} className="control-surface rounded-full px-5 py-2 text-xs font-bold text-slate-500 dark:text-slate-400 shadow-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </footer>

        </div>
      </section>
    </>
  );
}

export default Skills;
