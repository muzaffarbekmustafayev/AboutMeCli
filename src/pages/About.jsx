import React from "react";
import { useTranslation } from "react-i18next";
import SEO from "../components/SEO";

function About() {
  const { t } = useTranslation();

  return (
    <>
      <SEO 
        title={t("about.title", { defaultValue: "About" })}
        description={t("about.description", { defaultValue: "Learn more about me" })}
        path="/about"
      />
    <section
      id="about"
      className="section-shell min-h-screen flex items-center justify-center px-4 sm:px-6 py-20 text-slate-700 dark:text-slate-300"
    >
      <div
        className="glass-card relative rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 w-full max-w-xl lg:max-w-3xl xl:max-w-4xl transition-all duration-500 ease-out"
      >
        {/* TITLE */}
        <div className="mb-6 md:mb-8">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold brand-gradient">
            {t("about.title")}
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-teal-600 to-cyan-500 rounded-full"></div>
        </div>

        {/* CONTENT */}
        <div className="space-y-6 md:space-y-8 text-base sm:text-lg leading-relaxed">

          {/* QUOTE */}
          <p
            className="text-lg sm:text-xl md:text-2xl font-light text-gray-800 dark:text-gray-200 italic
                     bg-gradient-to-r from-teal-50 to-white dark:from-slate-800 dark:to-slate-900
                     p-4 md:p-6 rounded-xl border-l-4 border-teal-600
                     shadow-sm"
          >
            “{t("about.quote")}”
          </p>

          {/* INTRO */}
          <div className="group p-4 md:p-5 rounded-lg transition-all duration-300
                       hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
            <p className="transition-transform duration-300 group-hover:translate-x-2">
              {t("about.intro")}
            </p>
          </div>

          {/* STACK */}
          <div
            className="bg-gradient-to-br from-white to-teal-50/60 dark:from-slate-800 dark:to-cyan-900/10
                       p-5 md:p-6 rounded-xl border border-teal-100 dark:border-cyan-900/30
                       shadow-[0_5px_20px_rgba(20,184,166,0.15)]"
          >
            <p>
              {t("about.stack")}
            </p>
          </div>

          {/* EXPERIENCE */}
          <div className="relative p-5 md:p-6 rounded-xl overflow-hidden">
            <p className="relative z-10">
              {t("about.experience")}
            </p>
          </div>

          {/* INTERESTS */}
          <div className="p-4 md:p-5 rounded-lg border border-gray-100 dark:border-gray-700 shadow-inner">
            <p>
              {t("about.interests")}
            </p>
          </div>

          {/* MISSION */}
          <div
            className="relative p-6 md:p-8 rounded-2xl
                       bg-gradient-to-r from-teal-600/10 via-white to-cyan-500/10
                       dark:from-teal-900/20 dark:via-slate-900 dark:to-cyan-900/20
                       border-2 border-teal-200/50 dark:border-cyan-800/30
                       shadow-lg transition-all duration-500"
          >
            <div className="absolute -top-3 left-6 px-3 py-1 bg-teal-600 text-white text-sm font-semibold rounded-full">
              {t("about.missionLabel")}
            </div>
            <p className="text-lg font-medium text-gray-900 dark:text-gray-100 pt-2">
              {t("about.mission")}
            </p>
          </div>
        </div>

        {/* SKILLS */}
        <div className="mt-10 pt-8 border-t border-gray-200/50 dark:border-gray-700/50">
          <h3 className="font-display text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            <span className="text-teal-600">#</span>{" "}
            {t("about.techTitle")}
          </h3>

          <div className="flex flex-wrap gap-2 md:gap-3">
            {[
              "React",
              "Node.js",
              "JavaScript",
              "TypeScript",
              "MongoDB",
              "Express.js",
              "Tailwind CSS",
              "Next.js",
              "Git",
              "REST APIs",
              "Redux",
              "Firebase"
            ].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 bg-white dark:bg-gray-800 rounded-full text-sm
                         border border-gray-200 dark:border-gray-700 shadow-sm text-gray-800 dark:text-gray-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

export default About;
