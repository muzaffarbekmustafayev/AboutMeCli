import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
  { code: "uz", label: "UZ" },
];

// Default tilni aniqlash
const detectLanguage = () => {
  // 1️⃣ Agar user oldin tanlagan bo‘lsa — o‘sha
  const savedLang = localStorage.getItem("language");
  if (savedLang) return savedLang;

  // 2️⃣ Browser tiliga qaraymiz
  const browserLang = navigator.language || navigator.userLanguage;

  if (browserLang && browserLang.toLowerCase().startsWith("ru")) {
    return "ru";
  }

  // 3️⃣ Boshqa barcha holatlar
  return "en";
};

const LangToggle = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const lang = detectLanguage();

    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
      localStorage.setItem("language", lang);
    }
  }, [i18n]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };

  return (
    <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl p-1 shadow-inner">
      {languages.map((lang) => {
        const isActive = i18n.language === lang.code;

        return (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`
              px-3 py-1.5 text-sm font-semibold rounded-lg transition-all duration-300
              ${
                isActive
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }
            `}
            aria-label={`Change language to ${lang.label}`}
          >
            {lang.label}
          </button>
        );
      })}
    </div>
  );
};

export default LangToggle;
