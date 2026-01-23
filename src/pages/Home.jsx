import React, { useEffect, useState } from "react";
import { Github, Linkedin, Youtube } from "lucide-react";
import { useTranslation } from "react-i18next";

import MyImage from "../assets/USER.jpg";
import TelegramIcon from "../components/Icons/TelegramIcon";
import { socialMedias } from "../data/socialMedias";
import CVdownload from "../components/CVdownload";
import ThemeToggle from "../components/ThemeToggle";

function Home() {
  const { t } = useTranslation();
  const [rotation, setRotation] = useState(0);

  // Gradient rotation
  useEffect(() => {
    const id = setInterval(() => {
      setRotation((prev) => (prev + 1) % 360);
    }, 24);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="
        min-h-screen
        flex
        flex-col
        lg:flex-row
        items-center
        justify-center
        gap-8
        px-4
        sm:px-6
        md:px-10
        pt-24
        bg-gray-50
        dark:bg-gray-900
        transition-colors
        duration-500
      "
    >
      {/* ================= CONTENT CARD ================= */}
      <div
        className="
          w-full
          max-w-xl
          bg-white/80
          dark:bg-gray-800/80
          backdrop-blur-xl
          rounded-2xl
          p-6
          sm:p-8
          lg:p-10
          border
          border-gray-200
          dark:border-gray-700
          shadow-[0_0_40px_rgba(59,130,246,0.35)]
          dark:shadow-[0_0_50px_rgba(59,130,246,0.45)]
          transition-all
          duration-500
        "
      >
       

        {/* Title */}
        <h3
          className="
            typing-once
            text-xl
            sm:text-2xl
            md:text-3xl
            font-semibold
            text-gray-900
            dark:text-white
            mb-4
            text-center
            
            max-w-md
            mx-auto
            lg:mx-0
          "
        >
          {t("home.greeting")}
        </h3>

        {/* ===== MOBILE IMAGE (only < lg) ===== */}
        <div className="flex justify-center mb-6 lg:hidden">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32">
            <div
              className="
                absolute inset-0 rounded-full
                motion-reduce:animate-none
              "
              style={{
                background:
                  "conic-gradient(#4f46e5, #3b82f6, #8b5cf6, #4f46e5)",
                transform: `rotate(${rotation}deg)`,
              }}
            >
              <div className="absolute inset-1 bg-white dark:bg-gray-900 rounded-full" />
            </div>

            <div
              className="
                absolute
                inset-1
                sm:inset-2
                rounded-full
                overflow-hidden
                border
                border-white
                dark:border-gray-800
                shadow-lg
              "
            >
              <img
                src={MyImage}
                alt="Muzaffarbek Mustafayev"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>

     

        {/* Description (abzas bilan) */}
        <p
          className="
            text-gray-700
            dark:text-gray-300
            text-sm
            sm:text-base
            leading-relaxed
            text-left
            lg:text-justify
            mb-6
            [text-indent:1.25em]
            lg:[text-indent:1.75em]
          "
        >
          {t("home.description")}
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <CVdownload />

          <div className="flex gap-3">
            <a
              href={socialMedias.git_hub.path}
              target="_blank"
              rel="noreferrer"
              className="
                p-3 rounded-full
                bg-gray-200 dark:bg-gray-700
                shadow-md
                hover:-translate-y-1 hover:shadow-xl
                transition
              "
            >
              <Github className="w-5 h-5 text-gray-900 dark:text-gray-200" />
            </a>

            <a
              href={socialMedias.linkedin.path}
              target="_blank"
              rel="noreferrer"
              className="
                p-3 rounded-full
                bg-gray-200 dark:bg-gray-700
                shadow-md
                hover:-translate-y-1 hover:shadow-xl
                transition
              "
            >
              <Linkedin className="w-5 h-5 text-blue-700 dark:text-blue-400" />
            </a>

            <a
              href={socialMedias.youtube.path}
              target="_blank"
              rel="noreferrer"
              className="
                p-3 rounded-full
                bg-gray-200 dark:bg-gray-700
                shadow-md
                hover:-translate-y-1 hover:shadow-xl
                transition
              "
            >
              <Youtube className="w-5 h-5 text-red-600 dark:text-red-400" />
            </a>

            <a
              href={socialMedias.telegram.path}
              target="_blank"
              rel="noreferrer"
              className="
                p-3 rounded-full
                bg-gray-200 dark:bg-gray-700
                shadow-md
                hover:-translate-y-1 hover:shadow-xl
                transition
              "
            >
              <TelegramIcon size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* ================= DESKTOP IMAGE ================= */}
      <div className="relative hidden lg:block w-80 h-80 xl:w-96 xl:h-96">
        <div
          className="
            absolute inset-0 rounded-full
            motion-reduce:animate-none
          "
          style={{
            background:
              "conic-gradient(#4f46e5, #3b82f6, #8b5cf6, #4f46e5)",
            transform: `rotate(${rotation}deg)`,
          }}
        >
          <div className="absolute inset-1 bg-white dark:bg-gray-900 rounded-full shadow-inner" />
        </div>

        <div
          className="
            absolute
            inset-6
            rounded-full
            overflow-hidden
            border
            border-white
            dark:border-gray-800
            shadow-xl
          "
        >
          <img
            src={MyImage}
            alt="Muzaffarbek Mustafayev"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

export default Home;
