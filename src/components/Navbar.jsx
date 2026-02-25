import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import ThemeToggle from "./ThemeToggle";
import LangToggle from "./LangToggle";
import { menuItems } from "../data/menuItems";

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
    <nav className="fixed top-0 left-0 z-50 w-full px-2 sm:px-4">
      <div
        className={`mx-auto mt-2 sm:mt-3 max-w-7xl rounded-2xl transition-all duration-500 ${
          scrolled
            ? "glass-card control-surface px-3 py-2 sm:px-4"
            : "bg-transparent px-1 py-2"
        }`}
      >
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 sm:gap-4">
          <Logo t={t} />

          <DesktopMenu t={t} isActive={isActive} />

          <div className="flex items-center justify-end gap-2 sm:gap-3 shrink-0">
            <div className="hidden lg:block">
              <LangToggle />
            </div>

            <ThemeToggle />
            <Burger open={menuOpen} toggle={() => setMenuOpen((prev) => !prev)} />
          </div>
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

const Logo = ({ t }) => (
  <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group">
    <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl border border-teal-500/30 bg-gradient-to-br from-teal-600 to-cyan-500 text-white shadow-lg shadow-teal-700/30">
      <span className="font-display text-sm font-bold">M</span>
      <span className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
    </div>

    <div className="leading-tight hidden sm:block">
      <p className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-slate-50">
        Muzaffarbek
      </p>
      <p className="text-[11px] text-slate-500 dark:text-slate-400 tracking-[0.12em] uppercase">
        {t("navbar.role")}
      </p>
    </div>
  </Link>
);

const DesktopMenu = ({ t, isActive }) => (
  <div className="hidden lg:flex items-center justify-center">
    <div className="control-surface rounded-full p-1.5 flex items-center gap-1">
      {menuItems.map(({ key, path }) => {
        const active = isActive(path);

        return (
          <Link
            key={key}
            to={path}
            className={`px-3 xl:px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              active
                ? "bg-gradient-to-r from-teal-600 to-cyan-500 text-white shadow-md"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700/60"
            }`}
          >
            {t(`menu.${key}`)}
          </Link>
        );
      })}
    </div>
  </div>
);

const Burger = ({ open, toggle }) => (
  <button
    onClick={toggle}
    aria-label="Toggle menu"
    aria-expanded={open}
    className="lg:hidden control-surface h-11 w-11 rounded-xl flex items-center justify-center text-slate-700 dark:text-slate-200"
  >
    <div className="space-y-1">
      <span
        className={`block h-0.5 w-5 bg-current transition ${open ? "translate-y-1.5 rotate-45" : ""}`}
      />
      <span
        className={`block h-0.5 w-5 bg-current transition ${open ? "opacity-0" : ""}`}
      />
      <span
        className={`block h-0.5 w-5 bg-current transition ${open ? "-translate-y-1.5 -rotate-45" : ""}`}
      />
    </div>
  </button>
);

const MobileMenu = ({ open, close, isActive, t }) => {
  if (!open) return null;

  return (
    <div className="lg:hidden mx-2 sm:mx-4 mt-2 rounded-2xl glass-card overflow-hidden">
      <div className="p-4 space-y-2 max-h-[calc(100dvh-6rem)] overflow-y-auto">
        {menuItems.map(({ key, path }) => {
          const active = isActive(path);

          return (
            <Link
              key={key}
              to={path}
              onClick={close}
              className={`flex items-center justify-between p-3.5 rounded-xl text-sm font-semibold transition-all ${
                active
                  ? "bg-gradient-to-r from-teal-600 to-cyan-500 text-white"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <span>{t(`menu.${key}`)}</span>
              <span aria-hidden="true">&gt;</span>
            </Link>
          );
        })}

        <div className="pt-3 border-t border-slate-200/70 dark:border-slate-700/80">
          <LangToggle />
        </div>
      </div>
    </div>
  );
};
