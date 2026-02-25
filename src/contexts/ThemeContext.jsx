import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext(null);

const THEME_KEY = "theme";
const SYSTEM = "system";
const DARK_QUERY = "(prefers-color-scheme: dark)";

const isThemeValue = (value) => value === "light" || value === "dark" || value === SYSTEM;

const normalizeTheme = (value) => (isThemeValue(value) ? value : SYSTEM);

const getSystemTheme = () => {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
};

const getInitialTheme = () => {
  if (typeof window === "undefined") {
    return SYSTEM;
  }

  return normalizeTheme(window.localStorage.getItem(THEME_KEY));
};

const resolveTheme = (theme) => (theme === SYSTEM ? getSystemTheme() : theme);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);
  const [resolvedTheme, setResolvedTheme] = useState(() => resolveTheme(getInitialTheme()));

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia(DARK_QUERY);

    const applyTheme = () => {
      const nextResolvedTheme = resolveTheme(theme);
      setResolvedTheme(nextResolvedTheme);
      document.documentElement.classList.toggle("dark", nextResolvedTheme === "dark");
      document.documentElement.dataset.theme = nextResolvedTheme;
      document.documentElement.style.colorScheme = nextResolvedTheme;
    };

    applyTheme();

    const handleSystemThemeChange = () => {
      if (theme === SYSTEM) {
        applyTheme();
      }
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleSystemThemeChange);
      return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
    }

    mediaQuery.addListener(handleSystemThemeChange);
    return () => mediaQuery.removeListener(handleSystemThemeChange);
  }, [theme]);

  const setThemeMode = useCallback((nextTheme) => {
    setTheme(normalizeTheme(nextTheme));
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((currentTheme) => (resolveTheme(currentTheme) === "dark" ? "light" : "dark"));
  }, []);

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      isDark: resolvedTheme === "dark",
      setTheme: setThemeMode,
      toggleTheme
    }),
    [theme, resolvedTheme, setThemeMode, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
};
