import React from "react";
import { useTranslation } from "react-i18next";

function About() {
  const { t } = useTranslation();

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-20 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300"
    >
      <div
        className="relative rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 w-full max-w-xl lg:max-w-3xl xl:max-w-4xl
               bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50
               shadow-[0_10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.3)]
               shadow-blue-500/10 dark:shadow-blue-500/20
               hover:shadow-[0_15px_50px_rgba(59,130,246,0.15)] dark:hover:shadow-[0_15px_50px_rgba(59,130,246,0.25)]
               transition-all duration-500 ease-out"
      >
        {/* TITLE */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            {t("about.title")}
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
        </div>

        {/* CONTENT */}
        <div className="space-y-6 md:space-y-8 text-base sm:text-lg leading-relaxed">

          {/* QUOTE */}
          <p
            className="text-lg sm:text-xl md:text-2xl font-light text-gray-800 dark:text-gray-200 italic
                     bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900
                     p-4 md:p-6 rounded-xl border-l-4 border-blue-600
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
            className="bg-gradient-to-br from-white to-blue-50/50 dark:from-gray-800 dark:to-blue-900/10
                       p-5 md:p-6 rounded-xl border border-blue-100 dark:border-blue-900/30
                       shadow-[0_5px_20px_rgba(59,130,246,0.1)]"
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
                       bg-gradient-to-r from-blue-600/10 via-white to-blue-600/10
                       dark:from-blue-900/20 dark:via-gray-900 dark:to-blue-900/20
                       border-2 border-blue-200/50 dark:border-blue-800/30
                       shadow-lg transition-all duration-500"
          >
            <div className="absolute -top-3 left-6 px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full">
              {t("about.missionLabel")}
            </div>
            <p className="text-lg font-medium text-gray-900 dark:text-gray-100 pt-2">
              {t("about.mission")}
            </p>
          </div>
        </div>

        {/* SKILLS */}
        <div className="mt-10 pt-8 border-t border-gray-200/50 dark:border-gray-700/50">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            <span className="text-blue-600">#</span>{" "}
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
  );
}

export default About;
