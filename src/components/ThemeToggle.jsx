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
        p-2.5 sm:p-3
        rounded-full
        bg-white dark:bg-gray-800
        text-gray-800 dark:text-yellow-300
        shadow-md hover:shadow-xl
        transition-all duration-300
        hover:scale-110 active:scale-95
      "
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
};

export default ThemeToggle;
