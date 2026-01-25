import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

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
import ThemeToggle from "../components/ThemeToggle";
const SKILLS = [
  { name: "React.js", icon: Code, category: "frontend", level: "Expert", color: "text-blue-500" },
  { name: "JavaScript", icon: Code, category: "frontend", level: "Advanced", color: "text-yellow-500" },
  { name: "TypeScript", icon: Code, category: "frontend", level: "Intermediate", color: "text-blue-600" },
  { name: "Tailwind CSS", icon: Zap, category: "frontend", level: "Expert", color: "text-cyan-500" },
  { name: "Next.js", icon: Zap, category: "frontend", level: "Intermediate", color: "text-gray-700 dark:text-gray-200" },

  { name: "Node.js", icon: Database, category: "backend", level: "Advanced", color: "text-green-500" },
  { name: "Express.js", icon: Code, category: "backend", level: "Advanced", color: "text-gray-600 dark:text-gray-300" },
  { name: "REST API", icon: Zap, category: "backend", level: "Expert", color: "text-green-600" },
  { name: "JWT Auth", icon: Wrench, category: "backend", level: "Advanced", color: "text-purple-500" },

  { name: "MongoDB", icon: Database, category: "database", level: "Advanced", color: "text-green-600" },
  { name: "MySQL", icon: Database, category: "database", level: "Intermediate", color: "text-blue-600" },
  { name: "Firebase", icon: Zap, category: "database", level: "Intermediate", color: "text-yellow-500" },

  { name: "Git", icon: Wrench, category: "tools", level: "Advanced", color: "text-orange-500" },
  { name: "GitHub", icon: Wrench, category: "tools", level: "Expert", color: "text-gray-700 dark:text-gray-200" },
  { name: "Postman", icon: Wrench, category: "tools", level: "Advanced", color: "text-orange-400" },
  { name: "Vite", icon: Zap, category: "tools", level: "Intermediate", color: "text-purple-500" },
];

const categories = ["all", "frontend", "backend", "database", "tools"];

function Skills() {
  const [category, setCategory] = useState("all");
  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const filtered =
    category === "all"
      ? SKILLS
      : SKILLS.filter((s) => s.category === category);

  useEffect(() => {
    swiperRef.current?.slideToLoop(0);
  }, [category]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 text-gray-800 dark:text-gray-200">
      {/* <span className="hidden"><ThemeToggle /></span> */}

      {/* TITLE */}
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Skills & Technologies
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Tools and technologies I use to build scalable, modern web applications.
        </p>
      </div>

      {/* FILTER */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        <Filter className="w-5 h-5 text-gray-500 self-center" />
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              category === c
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {c.toUpperCase()}
          </button>
        ))}
      </div>

      {/* SLIDER */}
      <div className="relative group">

        {/* NAV BUTTONS */}
        <button
          ref={prevRef}
          className="absolute left-0 top-1/2 -translate-x-6 -translate-y-1/2 z-10
          w-11 h-11 rounded-full bg-white dark:bg-gray-800 shadow-lg
          opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
        >
          <ChevronLeft />
        </button>

        <button
          ref={nextRef}
          className="absolute right-0 top-1/2 translate-x-6 -translate-y-1/2 z-10
          w-11 h-11 rounded-full bg-white dark:bg-gray-800 shadow-lg
          opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
        >
          <ChevronRight />
        </button>
<Swiper
  modules={[Autoplay, Navigation, Pagination]}
  onSwiper={(swiper) => (swiperRef.current = swiper)}
  onBeforeInit={(swiper) => {
    swiper.params.navigation.prevEl = prevRef.current;
    swiper.params.navigation.nextEl = nextRef.current;
  }}
  autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
  pagination={{ clickable: true }}
  loop
  spaceBetween={30}
  breakpoints={{
    640: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    1024: { slidesPerView: 4 },
  }}
  className="pb-12"
>

          {filtered.map((skill, i) => {
            const Icon = skill.icon;
            return (
              <SwiperSlide key={i}>
                <div className="h-56 rounded-2xl border border-gray-200 dark:border-gray-700
                bg-white dark:bg-gray-900 flex flex-col items-center justify-center
                hover:scale-105 transition shadow-md">
                  <Icon className={`w-14 h-14 mb-4 ${skill.color}`} />
                  <h3 className="font-semibold text-lg">{skill.name}</h3>
                  <span className="text-sm text-gray-500">{skill.level}</span>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* FOOTER */}
      <p className="mt-20 text-center text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
        I value clean code, scalable architecture, and long-term solutions over short-lived hacks.
      </p>
    </section>
  );
}

export default Skills;
