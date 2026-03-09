import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", label: "EN", labelKey: "ui.language.en" },
  { code: "ru", label: "RU", labelKey: "ui.language.ru" },
  { code: "uz", label: "UZ", labelKey: "ui.language.uz" }
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
      className="control-surface inline-flex items-center rounded-xl p-1"
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
              px-3 py-1.5 text-sm font-semibold rounded-lg transition-all duration-300
              ${
                isActive
                  ? "bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-700/70"
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
