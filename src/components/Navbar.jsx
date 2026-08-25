import { useEffect, useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Home,
  User,
  Briefcase,
  Cpu,
  FileText,
  Award,
  BookOpen,
  Send,
  ChevronRight,
  Code2,
  ArrowUpRight
} from "lucide-react";

import ThemeToggle from "./ThemeToggle";
import LangToggle from "./LangToggle";
import { menuItems } from "../data/menuItems";
import { socialMedias } from "../data/socialMedias";

export default function Navbar() {
  const { t } = useTranslation();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isActive = (path) => {
    if (path === "/" && location.pathname !== "/") return false;
    return location.pathname.startsWith(path);
  };

  const getMenuIcon = (key) => {
    const icons = {
      home: <Home size={15} />,
      about: <User size={15} />,
      portfolio: <Briefcase size={15} />,
      skills: <Cpu size={15} />,
      resume: <FileText size={15} />,
      certificates: <Award size={15} />,
      articles: <BookOpen size={15} />,
      contact: <Send size={15} />,
    };
    return icons[key] || <Code2 size={15} />;
  };

  const navLinks = useMemo(() => menuItems.filter((item) => item.key !== "contact"), []);

  return (
    <header className="fixed top-0 left-0 z-50 w-full pointer-events-none">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 pt-4">
        <nav
          className={`pointer-events-auto flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500 ${
            scrolled
              ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
              : "bg-white/50 dark:bg-slate-950/40 backdrop-blur-xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-none"
          }`}
        >
          {/* LEFT — Brand Identity */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 text-white shadow-md shadow-blue-600/30 transition-transform duration-300 group-hover:scale-105">
              <span className="font-black text-sm tracking-tight">M</span>
              <span className="absolute inset-0 bg-gradient-to-tr from-white/25 to-transparent" />
            </div>
            <div className="hidden sm:block leading-none">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                  Muzaffarbek
                </span>
                <span className="relative flex h-1.5 w-1.5" title="Available">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
              </div>
              <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500">
                {t("navbar.role", { defaultValue: "Senior Software Engineer" })}
              </span>
            </div>
          </Link>

          {/* CENTER — Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map(({ key, path }) => {
              const active = isActive(path);
              return (
                <Link
                  key={key}
                  to={path}
                  className={`px-3.5 py-1.5 rounded-xl text-[13px] font-medium transition-all duration-150 ${
                    active
                      ? "bg-blue-600/10 text-blue-600 font-semibold dark:bg-blue-500/15 dark:text-blue-400"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-900/5 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/5"
                  }`}
                >
                  {t(`menu.${key}`)}
                </Link>
              );
            })}
          </div>

          {/* RIGHT — Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden xl:block">
              <LangToggle />
            </div>
            <ThemeToggle />
            <Link
              to="/contact"
              className={`hidden sm:inline-flex items-center gap-1 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all duration-150 active:scale-95 ${
                isActive("/contact")
                  ? "bg-blue-600 text-white"
                  : "bg-slate-900 text-white hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
              }`}
            >
              {t("menu.contact", { defaultValue: "Aloqa" })}
              <ArrowUpRight size={12} className="opacity-60" />
            </Link>
            <Burger open={menuOpen} toggle={() => setMenuOpen((v) => !v)} t={t} />
          </div>
        </nav>
      </div>

      {/* Mobile Drawer */}
      <MobileMenu
        open={menuOpen}
        close={() => setMenuOpen(false)}
        isActive={isActive}
        getMenuIcon={getMenuIcon}
        t={t}
      />
    </header>
  );
}

const Burger = ({ open, toggle, t }) => (
  <button
    onClick={toggle}
    aria-label={open
      ? t("ui.navigation.closeMenu", { defaultValue: "Close" })
      : t("ui.navigation.openMenu", { defaultValue: "Open" })}
    aria-expanded={open}
    className="lg:hidden flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900/5 hover:bg-slate-900/10 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 transition-all active:scale-95"
  >
    <div className="space-y-[5px]">
      <span className={`block h-px w-4 rounded-full bg-current origin-center transition-transform duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`} />
      <span className={`block h-px w-4 rounded-full bg-current transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
      <span className={`block h-px w-4 rounded-full bg-current origin-center transition-transform duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
    </div>
  </button>
);

const MobileMenu = ({ open, close, isActive, getMenuIcon, t }) => (
  <div
    className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
      open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
    }`}
    aria-hidden={!open}
  >
    {/* Backdrop */}
    <button
      type="button"
      className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
      onClick={close}
      aria-label={t("ui.navigation.closeMenu", { defaultValue: "Close" })}
      tabIndex={open ? 0 : -1}
    />

    {/* Drawer */}
    <div
      className={`absolute left-3 right-3 sm:left-6 sm:right-6 top-[4.5rem] rounded-2xl bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl p-4 shadow-2xl transition-all duration-300 ${
        open ? "translate-y-0 opacity-100 scale-100" : "-translate-y-3 opacity-0 scale-[0.98]"
      }`}
    >
      <div className="grid grid-cols-2 gap-1.5 mb-4">
        {menuItems.map(({ key, path }) => {
          const active = isActive(path);
          return (
            <Link
              key={key}
              to={path}
              onClick={close}
              tabIndex={open ? 0 : -1}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                active
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-600/25"
                  : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/[0.06]"
              }`}
            >
              <span className={`${active ? "text-white/80" : "text-slate-400 dark:text-slate-500"}`}>
                {getMenuIcon(key)}
              </span>
              {t(`menu.${key}`)}
            </Link>
          );
        })}
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-slate-200/60 dark:border-white/[0.06]">
        <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
          {t("ui.language.select", { defaultValue: "Til tanlang" })}
        </span>
        <LangToggle />
      </div>
      <div className="flex items-center justify-center gap-4 mt-3 text-[11px] font-medium text-slate-400 dark:text-slate-500">
        <a href="https://github.com/muzaffarbekmustafayev" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">GitHub</a>
        <span>·</span>
        <a href={socialMedias.linkedin.path} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">LinkedIn</a>
        <span>·</span>
        <a href={socialMedias.telegram.path} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">Telegram</a>
      </div>
    </div>
  </div>
);
