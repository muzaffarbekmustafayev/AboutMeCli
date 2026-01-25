import { useEffect, useLayoutEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const getInitialTheme = () => {
  const stored = localStorage.getItem("theme");
  if (stored === "light") return false;
  if (stored === "dark") return true;
  return true; // default DARK
};

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useLayoutEffect(() => {
    const initial = getInitialTheme();
    setIsDark(initial);

    document.documentElement.classList.toggle("dark", initial);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
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
