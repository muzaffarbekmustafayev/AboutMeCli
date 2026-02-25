import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Navigation,
  Pagination,
  EffectCoverflow,
} from "swiper/modules";
import { useTranslation } from "react-i18next";
import SEO from "../components/SEO";

import {
  Code,
  Database,
  Zap,
  Filter,
  ChevronLeft,
  ChevronRight,
  Wrench,
} from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const SKILLS = [
  { name: "React.js", icon: Code, category: "frontend", level: "expert", color: "text-blue-500" },
  { name: "JavaScript", icon: Code, category: "frontend", level: "advanced", color: "text-yellow-500" },
  { name: "TypeScript", icon: Code, category: "frontend", level: "intermediate", color: "text-blue-600" },
  { name: "Tailwind CSS", icon: Zap, category: "frontend", level: "expert", color: "text-cyan-500" },
  { name: "Next.js", icon: Zap, category: "frontend", level: "intermediate", color: "text-gray-700 dark:text-gray-200" },

  { name: "Node.js", icon: Database, category: "backend", level: "advanced", color: "text-green-500" },
  { name: "Express.js", icon: Code, category: "backend", level: "advanced", color: "text-gray-600 dark:text-gray-300" },
  { name: "REST API", icon: Zap, category: "backend", level: "expert", color: "text-green-600" },
  { name: "JWT Auth", icon: Wrench, category: "backend", level: "advanced", color: "text-purple-500" },

  { name: "MongoDB", icon: Database, category: "database", level: "advanced", color: "text-green-600" },
  { name: "MySQL", icon: Database, category: "database", level: "intermediate", color: "text-blue-600" },
  { name: "Firebase", icon: Zap, category: "database", level: "intermediate", color: "text-yellow-500" },

  { name: "Git", icon: Wrench, category: "tools", level: "advanced", color: "text-orange-500" },
  { name: "GitHub", icon: Wrench, category: "tools", level: "expert", color: "text-gray-700 dark:text-gray-200" },
  { name: "Postman", icon: Wrench, category: "tools", level: "advanced", color: "text-orange-400" },
  { name: "Vite", icon: Zap, category: "tools", level: "intermediate", color: "text-purple-500" },
];

const categories = ["all", "frontend", "backend", "database", "tools"];

function Skills() {
  const { t } = useTranslation();

  const [category, setCategory] = useState("all");
  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const filteredSkills =
    category === "all"
      ? SKILLS
      : SKILLS.filter((skill) => skill.category === category);

  useEffect(() => {
    swiperRef.current?.slideToLoop(0);
  }, [category]);

  return (
    <>
      <SEO 
        title={t("skills.title", { defaultValue: "Skills" })}
        description={t("skills.description", { defaultValue: "My technical skills" })}
        path="/skills"
      />
    <section className="section-shell max-w-7xl mx-auto px-6 py-24 text-gray-800 dark:text-gray-200 overflow-hidden">
      {/* TITLE */}
      <div className="text-center mb-10">
        <h2 className="font-display text-4xl md:text-5xl font-extrabold brand-gradient">
          {t("skills.title")}
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {t("skills.subtitle")}
        </p>
      </div>

      {/* FILTER */}
      <div className="flex flex-wrap justify-center gap-3 mb-14">
        <Filter className="w-5 h-5 text-gray-500 self-center" />
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              category === c
                ? "bg-gradient-to-r from-teal-600 to-cyan-500 text-white shadow-lg scale-105"
                : "control-surface text-slate-700 dark:text-slate-300 hover:scale-105"
            }`}
          >
            {t(`skills.categories.${c}`)}
          </button>
        ))}
      </div>

      {/* SLIDER */}
      <div className="relative group">
        {/* NAV */}
        <button
          ref={prevRef}
          className="absolute left-0 top-1/2 -translate-x-8 -translate-y-1/2 z-10
          w-12 h-12 rounded-full control-surface
          opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
        >
          <ChevronLeft />
        </button>

        <button
          ref={nextRef}
          className="absolute right-0 top-1/2 translate-x-8 -translate-y-1/2 z-10
          w-12 h-12 rounded-full control-surface
          opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
        >
          <ChevronRight />
        </button>

        <Swiper
          modules={[Autoplay, Navigation, Pagination, EffectCoverflow]}
          effect="coverflow"
          centeredSlides
          grabCursor
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 35,
            stretch: 0,
            depth: 180,
            modifier: 1,
            slideShadows: false,
          }}
          autoplay={{ delay: 2800, pauseOnMouseEnter: true }}
          pagination={{ clickable: true }}
          loop
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          className="pb-14"
        >
          {filteredSkills.map((skill, index) => {
            const Icon = skill.icon;

            return (
              <SwiperSlide key={index} className="!w-[260px]">
                <div
                  className="
                    glass-card group relative h-60 rounded-2xl
                    flex flex-col items-center justify-center
                    shadow-xl transition-all duration-300
                    hover:shadow-cyan-500/20
                  "
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-500/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition" />

                  <Icon className={`w-16 h-16 mb-4 ${skill.color}`} />

                  <h3 className="font-semibold text-lg">
                    {skill.name}
                  </h3>

                  <span className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {t(`skills.levels.${skill.level}`)}
                  </span>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* FOOTER */}
      <p className="mt-20 text-center text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
        {t("skills.footer")}
      </p>
    </section>
    </>
  );
}

export default Skills;
