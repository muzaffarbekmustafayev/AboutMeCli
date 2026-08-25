import { useTranslation } from "react-i18next";

const languages = [
  { code: "uz", label: "UZ", labelKey: "ui.language.uz" },
  { code: "en", label: "EN", labelKey: "ui.language.en" },
  { code: "ru", label: "RU", labelKey: "ui.language.ru" }
];

const getBaseLanguage = (lang = "") => lang.split("-")[0].toLowerCase();

const LangToggle = () => {
  const { t, i18n } = useTranslation();
  const activeLanguage = getBaseLanguage(i18n.resolvedLanguage || i18n.language || "uz");

  const changeLanguage = (lng) => {
    if (activeLanguage !== lng) {
      i18n.changeLanguage(lng);
    }
  };

  return (
    <div
      role="group"
      aria-label={t("ui.language.select")}
      className="inline-flex items-center rounded-full bg-slate-200/60 p-1 backdrop-blur-xl dark:bg-white/[0.06]"
    >
      {languages.map((lang) => {
        const isActive = activeLanguage === lang.code;
        const languageName = t(lang.labelKey);

        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => changeLanguage(lang.code)}
            aria-label={t("ui.language.switchTo", { language: languageName })}
            aria-pressed={isActive}
            title={languageName}
            className={`
              rounded-full px-2.5 py-1 text-xs font-bold transition-all duration-200
              ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              }
            `}
          >
            {lang.label}
          </button>
        );
      })}
    </div>
  );
};

export default LangToggle;
