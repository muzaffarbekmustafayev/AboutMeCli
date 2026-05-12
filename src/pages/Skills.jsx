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
  ChevronRight
} from "lucide-react";
import { SKILLS } from "../data/skillsData";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const categoryConfig = {
  all: { icon: <Layers size={16} />, label: "skills.categories.all" },
  frontend: { icon: <Layout size={16} />, label: "skills.categories.frontend" },
  backend: { icon: <Settings size={16} />, label: "skills.categories.backend" },
  database: { icon: <Database size={16} />, label: "skills.categories.database" },
  tools: { icon: <Terminal size={16} />, label: "skills.categories.tools" },
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
        title={t("skills.title")}
        description={t("skills.description")}
        path="/skills"
      />

      <section id="skills" className="section-shell min-h-screen px-4 pt-28 pb-20 text-slate-700 dark:text-slate-300 sm:px-6 sm:pt-32">
        <div className="mx-auto w-full max-w-7xl">

          {/* Header */}
          <header className="mb-16 space-y-4 max-w-3xl">
            <div className="hero-badge">
              <Sparkles size={14} />
              {t("skills.badge")}
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
            <div className="glass-card rounded-2xl p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-blue-500/20 cursor-default">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{t("skills.stats.total")}</p>
              <p className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white">{stats.total}</p>
            </div>
            <div className="glass-card rounded-2xl p-6 shadow-sm border-blue-500/10 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-blue-500/30 cursor-default">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{t("skills.stats.expert")}</p>
              <p className="mt-2 text-3xl font-extrabold text-blue-600 dark:text-blue-400">{stats.expert}</p>
            </div>
            <div className="glass-card rounded-2xl p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-blue-500/20 cursor-default">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{t("skills.stats.advanced")}</p>
              <p className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white">{stats.advanced}</p>
            </div>
            <div className="hidden glass-card rounded-2xl p-6 shadow-sm sm:block transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-default">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{t("skills.stats.status")}</p>
              <div className="mt-2 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-widest">{t("skills.stats.active")}</span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="control-surface rounded-full p-1.5 flex items-center gap-1 shadow-lg overflow-x-auto no-scrollbar max-w-full">
              {Object.entries(categoryConfig).map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                    activeCategory === key
                      ? "bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow-md"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700/60"
                  }`}
                >
                  {config.icon}
                  {t(config.label)}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder={t("skills.search")}
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
              modules={[Autoplay, Navigation, Pagination, Keyboard]}
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
                  <div className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 transition-all duration-250 hover:-translate-y-1 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-500/10 dark:border-slate-800 dark:bg-slate-900/40">
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-700 to-blue-500 text-white shadow-lg transition-shadow duration-200 group-hover:shadow-blue-600/30">
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
              <p className="text-lg text-slate-400">{t("skills.empty")}</p>
            </div>
          )}

          {/* Footer Note */}
          <footer className="mt-20 border-t border-slate-100 pt-12 dark:border-slate-800">
            <div className="rounded-[2.5rem] bg-slate-50 p-10 dark:bg-slate-800/30">
              <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                <div className="space-y-3">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight">{t("skills.learningPath")}</h4>
                  <p className="max-w-md text-base leading-relaxed text-slate-500 dark:text-slate-400">
                    {t("skills.footer")}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {(t("skills.learningTags", { returnObjects: true }) || ["System Architecture", "Scalable UI", "API Design"]).map(tag => (
                    <span key={tag} className="control-surface rounded-full px-5 py-2 text-xs font-bold text-slate-500 dark:text-slate-400 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:text-blue-600 hover:border-blue-300 dark:hover:text-blue-400 dark:hover:border-blue-500/40 cursor-default">
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
