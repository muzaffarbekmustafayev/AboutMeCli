import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import uz from "./locales/uz/translation.json";
import en from "./locales/en/translation.json";
import ru from "./locales/ru/translation.json";

const supportedLanguages = ["uz", "en", "ru"];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      uz: { translation: uz },
      en: { translation: en },
      ru: { translation: ru }
    },

    fallbackLng: "uz",
    supportedLngs: supportedLanguages,
    load: "languageOnly",
    cleanCode: true,

    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      lookupLocalStorage: "language",
      caches: ["localStorage"]
    },

    interpolation: {
      escapeValue: false
    },

    returnNull: false
  });

export default i18n;
