import { Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext";

const ThemeToggle = () => {
  const { t } = useTranslation();
  const { isDark, toggleTheme } = useTheme();

  const buttonLabel = isDark ? t("ui.theme.switchToLight") : t("ui.theme.switchToDark");

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={buttonLabel}
      title={buttonLabel}
      aria-pressed={isDark}
      className="
        flex items-center justify-center
        h-9 w-9 sm:h-10 sm:w-10 rounded-full
        bg-slate-200/60 dark:bg-white/[0.06]
        backdrop-blur-xl
        text-slate-700 dark:text-blue-300
        transition-all duration-300 hover:scale-105 hover:bg-slate-300/60 dark:hover:bg-white/[0.12]
        active:scale-95 shadow-sm
      "
    >
      {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
    </button>
  );
};

export default ThemeToggle;
