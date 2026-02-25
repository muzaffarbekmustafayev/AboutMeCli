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
        h-11 w-11 rounded-xl
        control-surface
        text-slate-700 dark:text-amber-300
        transition-all duration-300 hover:-translate-y-0.5
        active:scale-95
      "
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
};

export default ThemeToggle;
