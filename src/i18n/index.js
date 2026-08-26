import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import uz from "./locales/uz/translation.json";
import en from "./locales/en/translation.json";
import ru from "./locales/ru/translation.json";

const LANGUAGE_STORAGE_KEY = "language";
const supportedLanguages = new Set(["uz", "en", "ru"]);
const COUNTRY_TO_LANGUAGE = {
  RU: "ru",
  UZ: "uz",
};
const DEFAULT_LANGUAGE = "en";

const getBaseLanguage = (value = "") => String(value).split("-")[0].toLowerCase();

const getStoredLanguage = () => {
  if (typeof window === "undefined") return "";
  const storedLanguage = getBaseLanguage(window.localStorage.getItem(LANGUAGE_STORAGE_KEY) || "");
  return supportedLanguages.has(storedLanguage) ? storedLanguage : "";
};

const detectLanguageFromCountry = async () => {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;

  try {
    const response = await fetch("https://ipapi.co/country/", { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const countryCode = (await response.text()).trim().toUpperCase();
    return COUNTRY_TO_LANGUAGE[countryCode] || DEFAULT_LANGUAGE;
  } catch {
    const browserLanguage = getBaseLanguage(window.navigator?.language || "");
    return supportedLanguages.has(browserLanguage) ? browserLanguage : DEFAULT_LANGUAGE;
  }
};

const persistLanguage = (language) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LANGUAGE_STORAGE_KEY, getBaseLanguage(language));
};

export const initializeI18n = async () => {
  if (i18n.isInitialized) return i18n;

  const initialLanguage = getStoredLanguage() || DEFAULT_LANGUAGE;

  await i18n.use(initReactI18next).init({
    resources: {
      uz: { translation: uz },
      en: { translation: en },
      ru: { translation: ru },
    },
    lng: initialLanguage,
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: Array.from(supportedLanguages),
    load: "languageOnly",
    cleanCode: true,
    interpolation: {
      escapeValue: false,
    },
    returnNull: false,
  });

  persistLanguage(initialLanguage);
  i18n.on("languageChanged", persistLanguage);

  return i18n;
};

export default i18n;
