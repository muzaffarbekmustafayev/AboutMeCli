import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import ThemeToggle from "./ThemeToggle";
import LangToggle from "./LangToggle";
import { menuItems } from "../data/menuItems";

/* ================= NAVBAR ================= */

export default function Navbar() {
  const { t } = useTranslation();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`
        fixed top-0 left-0 z-50 w-full transition-all duration-500
        ${
          scrolled
            ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-md border-b border-gray-200/40 dark:border-gray-700/40 py-2"
            : "bg-transparent py-4"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-[auto_1fr_auto] items-center gap-4">

        <Logo t={t} />

        <DesktopMenu t={t} isActive={isActive} />

        <div className="flex items-center justify-end gap-3 shrink-0">
          <div className="hidden lg:block">
            <LangToggle />
          </div>

          <ThemeToggle />
          <Burger open={menuOpen} toggle={() => setMenuOpen(!menuOpen)} />
        </div>

      </div>

      <MobileMenu
        open={menuOpen}
        close={() => setMenuOpen(false)}
        isActive={isActive}
        t={t}
      />
    </nav>
  );
}

/* ================= LOGO ================= */

const Logo = ({ t }) => (
  <Link to="/" className="flex items-center gap-3 group">
    <div className="w-10 h-10 rounded-full flex items-center justify-center
      bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500
      text-white font-bold shadow-lg animate-pulse">
      M
    </div>

    <div className="leading-tight">
      <p className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
        Muzaffarbek
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400 tracking-wider">
        {t("navbar.role")}
      </p>
    </div>
  </Link>
);

/* ================= DESKTOP MENU ================= */

const DesktopMenu = ({ t, isActive }) => (
  <div className="hidden lg:flex items-center justify-center">
    {menuItems.map(({ key, path }) => (
      <Link key={key} to={path} className="relative px-4 py-2 group">
        <span
          className={`font-medium transition-colors ${
            isActive(path)
              ? "text-blue-600 dark:text-blue-400"
              : "text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
          }`}
        >
          {t(`menu.${key}`)}
        </span>

        {isActive(path) && (
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full
            bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" />
        )}
      </Link>
    ))}
  </div>
);

/* ================= BURGER ================= */

const Burger = ({ open, toggle }) => (
  <button
    onClick={toggle}
    aria-label="Toggle menu"
    className="lg:hidden w-12 h-12 rounded-xl flex items-center justify-center
      hover:bg-gray-100 dark:hover:bg-gray-800 transition"
  >
    <div className="space-y-1">
      <span className={`block w-6 h-0.5 bg-current transition ${open && "rotate-45 translate-y-1.5"}`} />
      <span className={`block w-6 h-0.5 bg-current transition ${open && "opacity-0"}`} />
      <span className={`block w-6 h-0.5 bg-current transition ${open && "-rotate-45 -translate-y-1.5"}`} />
    </div>
  </button>
);

/* ================= MOBILE MENU ================= */

const MobileMenu = ({ open, close, isActive, t }) => {
  if (!open) return null;

  return (
    <div className="lg:hidden absolute top-full left-0 right-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/40">
      <div className="p-6 space-y-3 max-h-[calc(100dvh-5rem)] overflow-y-auto">
        {menuItems.map(({ key, path }) => (
          <Link
            key={key}
            to={path}
            onClick={close}
            className={`flex items-center justify-between p-4 rounded-2xl transition ${
              isActive(path)
                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <span className="text-lg font-medium">
              {t(`menu.${key}`)}
            </span>
            <span>→</span>
          </Link>
        ))}

        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <LangToggle />
        </div>
      </div>
    </div>
  );
};
