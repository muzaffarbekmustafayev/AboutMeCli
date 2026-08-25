import React, { useState, useMemo, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, Keyboard } from "swiper/modules";
import SEO from "../components/SEO";
import {
  Database,
  Layout,
  Settings,
  Terminal,
  Zap,
  Layers,
  Sparkles,
  Search,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  SlidersHorizontal,
  Server,
  Cloud,
  ShieldCheck,
  Workflow,
  Wrench,
  Smartphone,
  Bot
} from "lucide-react";
import { SKILLS } from "../data/skillsData";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const categoryConfig = {
  all: { icon: <Layers size={15} />, label: "skills.categories.all" },
  ai: { icon: <Bot size={15} />, label: "skills.categories.ai" },
  fullstack: { icon: <Workflow size={15} />, label: "skills.categories.fullstack" },
  frontend: { icon: <Layout size={15} />, label: "skills.categories.frontend" },
  mobile: { icon: <Smartphone size={15} />, label: "skills.categories.mobile" },
  backend: { icon: <Server size={15} />, label: "skills.categories.backend" },
  devops: { icon: <Cloud size={15} />, label: "skills.categories.devops" },
  sysadmin: { icon: <ShieldCheck size={15} />, label: "skills.categories.sysadmin" },
  database: { icon: <Database size={15} />, label: "skills.categories.database" },
  tools: { icon: <Wrench size={15} />, label: "skills.categories.tools" },
};

function Skills() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'carousel'
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
    intermediate: SKILLS.filter(s => s.level === "intermediate").length,
  }), []);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(0);
    }
  }, [activeCategory, searchQuery]);

  return (
    <>
      <SEO
        title={t("skills.title")}
        description={t("skills.description")}
        path="/skills"
      />

      <section id="skills" className="section-shell min-h-screen px-4 pt-28 pb-20 text-slate-700 dark:text-slate-300 sm:px-6 sm:pt-32">
        <div className="mx-auto w-full max-w-7xl">

          {/* Header */}
          <header className="mb-14 space-y-4 max-w-3xl">
            <div className="hero-badge">
              <Sparkles size={14} />
              {t("skills.badge")}
            </div>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl lg:text-6xl">
              {t("skills.title")}
            </h1>
            <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
              {t("skills.subtitle")}
            </p>
          </header>

          {/* Stats Bar */}
          <div className="mb-14 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            <div className="glass-card card-glow-hover rounded-2xl p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{t("skills.stats.total")}</p>
              <p className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white">{stats.total}</p>
            </div>
            <div className="glass-card card-glow-hover rounded-2xl p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{t("skills.stats.expert")}</p>
              <p className="mt-2 text-3xl font-extrabold text-blue-600 dark:text-blue-400">{stats.expert}</p>
            </div>
            <div className="glass-card card-glow-hover rounded-2xl p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{t("skills.stats.advanced")}</p>
              <p className="mt-2 text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">{stats.advanced}</p>
            </div>
            <div className="glass-card card-glow-hover rounded-2xl p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{t("skills.stats.status")}</p>
              <div className="mt-2 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">{t("skills.stats.active")}</span>
              </div>
            </div>
          </div>

          {/* Controls & Filter Bar */}
          <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            {/* Category Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {Object.entries(categoryConfig).map(([key, config]) => {
                const count = key === "all" ? SKILLS.length : SKILLS.filter(s => s.category === key).length;
                const isActive = activeCategory === key;

                return (
                  <button
                    key={key}
                    onClick={() => setActiveCategory(key)}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all duration-200 active:scale-95 ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/25"
                        : "control-surface text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                    }`}
                  >
                    {config.icon}
                    <span>{t(config.label)}</span>
                    <span
                      className={`inline-flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold ${
                        isActive
                          ? "bg-white/25 text-white"
                          : "bg-slate-200/80 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search & View Switcher */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="search"
                  placeholder={t("skills.search")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="form-control w-full rounded-2xl py-2.5 pl-11 pr-4 text-xs"
                />
              </div>

              {/* View Toggle */}
              <div className="control-surface rounded-2xl p-1 flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid View"
                  className={`p-2 rounded-xl text-xs transition-all ${
                    viewMode === "grid"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-600 hover:text-blue-600 dark:text-slate-300"
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("carousel")}
                  aria-label="Carousel View"
                  className={`p-2 rounded-xl text-xs transition-all ${
                    viewMode === "carousel"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-600 hover:text-blue-600 dark:text-slate-300"
                  }`}
                  title="Carousel View"
                >
                  <SlidersHorizontal size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Grid View */}
          {viewMode === "grid" ? (
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredSkills.map((skill) => (
                <div
                  key={skill.name}
                  className="card-glow-hover interactive-card glass-card relative flex flex-col justify-between overflow-hidden rounded-3xl p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-500 text-white shadow-md shadow-blue-600/25">
                      <skill.Icon size={20} />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2
                        size={14}
                        className={
                          skill.level === "expert"
                            ? "text-blue-500"
                            : skill.level === "advanced"
                              ? "text-indigo-400"
                              : "text-slate-400"
                        }
                      />
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        {t(`skills.levels.${skill.level}`)}
                      </span>
                    </div>
                  </div>

                  <h3 className="mt-5 font-display text-base font-bold text-slate-900 dark:text-slate-100">
                    {skill.name}
                  </h3>

                  <div className="mt-4 flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200/70 dark:bg-slate-800">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all duration-700 ${
                          skill.level === "expert"
                            ? "w-full"
                            : skill.level === "advanced"
                              ? "w-[80%]"
                              : "w-[60%]"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Carousel View */
            <div className="group relative">
              <button className="swiper-prev absolute -left-12 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-2xl glass-card text-slate-600 shadow-lg transition-all hover:text-blue-600 active:scale-95 dark:text-slate-300 lg:flex">
                <ChevronLeft size={22} />
              </button>
              <button className="swiper-next absolute -right-12 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-2xl glass-card text-slate-600 shadow-lg transition-all hover:text-blue-600 active:scale-95 dark:text-slate-300 lg:flex">
                <ChevronRight size={22} />
              </button>

              <Swiper
                modules={[Autoplay, Navigation, Pagination, Keyboard]}
                spaceBetween={20}
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
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                keyboard={{ enabled: true }}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                className="!pb-14"
              >
                {filteredSkills.map((skill) => (
                  <SwiperSlide key={skill.name}>
                    <div className="card-glow-hover interactive-card glass-card relative flex flex-col justify-between overflow-hidden rounded-3xl p-7 min-h-[220px]">
                      <div className="flex items-center justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-500 text-white shadow-md shadow-blue-600/25">
                          <skill.Icon size={20} />
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 size={14} className={skill.level === 'expert' ? 'text-blue-500' : 'text-slate-400'} />
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            {t(`skills.levels.${skill.level}`)}
                          </span>
                        </div>
                      </div>

                      <h3 className="mt-6 font-display text-lg font-bold text-slate-900 dark:text-slate-100">
                        {skill.name}
                      </h3>

                      <div className="mt-5 flex items-center gap-2">
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200/70 dark:bg-slate-800">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all duration-700 ${
                              skill.level === 'expert' ? 'w-full' : skill.level === 'advanced' ? 'w-[80%]' : 'w-[60%]'
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="swiper-pagination-custom mt-4 flex justify-center gap-2" />
            </div>
          )}

          {/* Empty State */}
          {filteredSkills.length === 0 && (
            <div className="py-24 text-center">
              <p className="text-lg text-slate-400">{t("skills.empty")}</p>
            </div>
          )}

          {/* Footer Note */}
          <footer className="mt-16 border-t border-slate-200/70 pt-10 dark:border-slate-800/80">
            <div className="glass-card rounded-3xl p-8 sm:p-10">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                  <h4 className="font-display text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight">{t("skills.learningPath")}</h4>
                  <p className="max-w-md text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    {t("skills.footer")}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {(t("skills.learningTags", { returnObjects: true }) || ["System Architecture", "Scalable UI", "API Design"]).map(tag => (
                    <span key={tag} className="control-surface rounded-full px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:text-blue-600 dark:hover:text-blue-400 cursor-default">
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
