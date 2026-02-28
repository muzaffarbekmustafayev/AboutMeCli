import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Navigation,
  EffectCoverflow,
  A11y,
  Keyboard,
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
  const canNavigate = filteredSkills.length > 1;
  const shouldLoop = filteredSkills.length > 3;

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
        <div className="text-center mb-10">
          <h2 className="font-display text-4xl md:text-5xl font-extrabold brand-gradient">
            {t("skills.title")}
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t("skills.subtitle")}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-14">
          <Filter className="w-5 h-5 text-gray-500 self-center" />
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                category === c
                  ? "bg-gradient-to-r from-teal-600 to-cyan-500 text-white shadow-lg scale-105"
                  : "control-surface text-slate-700 dark:text-slate-300 hover:bg-teal-100/80 hover:text-teal-700 dark:hover:bg-teal-900/30 dark:hover:text-teal-200 hover:scale-105"
              }`}
            >
              {t(`skills.categories.${c}`)}
            </button>
          ))}
        </div>

        <div className="relative">
          <button
            ref={prevRef}
            type="button"
            aria-label={t("skills.prevSlide", { defaultValue: "Previous skill" })}
            disabled={!canNavigate}
            className="absolute left-0 top-1/2 -translate-x-8 -translate-y-1/2 z-10
            w-12 h-12 rounded-full control-surface
            opacity-100 transition flex items-center justify-center
            disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft />
          </button>

          <button
            ref={nextRef}
            type="button"
            aria-label={t("skills.nextSlide", { defaultValue: "Next skill" })}
            disabled={!canNavigate}
            className="absolute right-0 top-1/2 translate-x-8 -translate-y-1/2 z-10
            w-12 h-12 rounded-full control-surface
            opacity-100 transition flex items-center justify-center
            disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronRight />
          </button>

          <div className="overflow-hidden rounded-3xl">
            <Swiper
              modules={[Autoplay, Navigation, EffectCoverflow, A11y, Keyboard]}
              effect="coverflow"
              centeredSlides
              grabCursor
              slidesPerView="auto"
              spaceBetween={16}
              coverflowEffect={{
                rotate: 26,
                stretch: 0,
                depth: 130,
                modifier: 1,
                slideShadows: false,
              }}
              autoplay={
                canNavigate
                  ? { delay: 2800, pauseOnMouseEnter: true, disableOnInteraction: false }
                  : false
              }
              keyboard={{ enabled: true, onlyInViewport: true }}
              a11y={{ enabled: true }}
              watchOverflow
              speed={650}
              loop={shouldLoop}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }}
              className="pb-14"
            >
              {filteredSkills.map((skill) => {
                const Icon = skill.icon;

                return (
                  <SwiperSlide key={skill.name} className="!w-[230px] sm:!w-[250px] lg:!w-[280px]">
                    <div
                      className="
                        glass-card relative h-60 rounded-2xl
                        flex flex-col items-center justify-center
                        shadow-xl transition-all duration-300
                      "
                    >
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-500/10 to-amber-500/10 opacity-100" />

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
        </div>

        <p className="mt-20 text-center text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          {t("skills.footer")}
        </p>
      </section>
    </>
  );
}

export default Skills;
