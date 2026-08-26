import React, { useMemo, useEffect, useState } from "react";
import {
  ArrowRight,
  Briefcase,
  Code2,
  Compass,
  Github,
  Globe2,
  Linkedin,
  Mail,
  Rocket,
  Sparkles,
  Terminal,
  Youtube,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SEO from "../components/SEO";

import MyImageDark from "../assets/USERDark.png";
import MyImageLight from "../assets/USERLight.png";
import TelegramIcon from "../components/Icons/TelegramIcon";
import { socialMedias } from "../data/socialMedias";
import CVdownload from "../components/CVdownload";
import { projects } from "../data/projects";
import { SKILLS } from "../data/skillsData";
import { useTheme } from "../contexts/ThemeContext";
import GitHubActivity from "../components/GitHubActivity";

const socialLinks = [
  {
    href: socialMedias.github.path,
    label: "GitHub",
    tone: "text-slate-700 dark:text-slate-200",
    icon: <Github className="h-4 w-4" />,
  },
  {
    href: socialMedias.linkedin.path,
    label: "LinkedIn",
    tone: "text-blue-700 dark:text-blue-400",
    icon: <Linkedin className="h-4 w-4" />,
  },
  {
    href: socialMedias.telegram.path,
    label: "Telegram",
    tone: "text-sky-700 dark:text-sky-400",
    icon: <TelegramIcon size={16} color="currentColor" />,
  },
  {
    href: socialMedias.youtube.path,
    label: "YouTube",
    tone: "text-rose-700 dark:text-rose-400",
    icon: <Youtube className="h-4 w-4" />,
  },
];



function useTerminalTyping(lines) {
  const [displayed, setDisplayed] = useState([]);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    // If finished all lines, wait 4 seconds and restart loop
    if (lineIdx >= lines.length) {
      const resetTimeout = setTimeout(() => {
        setDisplayed([]);
        setLineIdx(0);
        setCharIdx(0);
      }, 4000);
      return () => clearTimeout(resetTimeout);
    }

    const currentItem = lines[lineIdx];
    const currentText = currentItem.text;

    if (charIdx < currentText.length) {
      const t = setTimeout(() => {
        setCharIdx((c) => c + 1);
      }, 22);
      return () => clearTimeout(t);
    }

    const nextLineTimeout = setTimeout(() => {
      setDisplayed((d) => [...d, currentItem]);
      setLineIdx((l) => l + 1);
      setCharIdx(0);
    }, 280);

    return () => clearTimeout(nextLineTimeout);
  }, [lineIdx, charIdx, lines]);

  const currentLineItem = lineIdx < lines.length ? lines[lineIdx] : null;
  const currentPartial = currentLineItem ? currentLineItem.text.slice(0, charIdx) : null;

  return { displayed, currentLineItem, currentPartial };
}

function Home() {
  const { t, i18n } = useTranslation();
  const { isDark } = useTheme();
  const MyImage = isDark ? MyImageDark : MyImageLight;

  const expertCount = useMemo(() => SKILLS.filter((s) => s.level === "expert").length, []);
  const advancedCount = useMemo(() => SKILLS.filter((s) => s.level === "advanced").length, []);

  const TERMINAL_LINES = useMemo(() => [
    { prefix: "❯", text: t("home.terminal.npmRunDev", { defaultValue: "npm run dev" }), tone: "text-blue-400 font-bold", icon: null },
    { prefix: "⚡", text: t("home.terminal.compiling", { defaultValue: "compiling src..." }), tone: "text-amber-300 font-medium", icon: null },
    { prefix: "📦", text: `${projects.length} ${t("home.terminal.projectsLoaded", { defaultValue: "projects loaded" })}`, tone: "text-sky-300 font-semibold", icon: null },
    { prefix: "✨", text: `${SKILLS.length} ${t("home.terminal.skillsIndexed", { defaultValue: "skills indexed" })}`, tone: "text-indigo-300 font-semibold", icon: null },
    { prefix: "✓", text: t("home.terminal.ready", { defaultValue: "ready on localhost:5173" }), tone: "text-emerald-400 font-bold shadow-[0_0_12px_rgba(52,211,153,0.3)]", icon: null },
  ], [t]);

  const { displayed: termLines, currentLineItem, currentPartial } = useTerminalTyping(TERMINAL_LINES);

  const highlights = useMemo(
    () => [
      {
        icon: <Code2 className="h-4 w-4 text-blue-600 dark:text-blue-300" />,
        title: t("home.highlight.architecture", { defaultValue: "Clean Architecture" }),
        desc: t("home.highlight.architectureDesc", {
          defaultValue: "Scalable frontend and backend structure for long-term growth.",
        }),
      },
      {
        icon: <Globe2 className="h-4 w-4 text-sky-600 dark:text-sky-300" />,
        title: t("home.highlight.ux", { defaultValue: "User-Centered UX" }),
        desc: t("home.highlight.uxDesc", {
          defaultValue: "Fast, accessible interfaces with purposeful interaction patterns.",
        }),
      },
      {
        icon: <Rocket className="h-4 w-4 text-orange-500 dark:text-orange-300" />,
        title: t("home.highlight.delivery", { defaultValue: "Production Delivery" }),
        desc: t("home.highlight.deliveryDesc", {
          defaultValue: "From idea to deployment with performance and reliability in focus.",
        }),
      },
    ],
    [t]
  );

  const quickStats = useMemo(
    () => [
      {
        value: `${projects.length}+`,
        label: t("home.stat.projects", { defaultValue: "Shipped projects" }),
      },
      {
        value: `${SKILLS.length}`,
        label: t("home.stat.skills", { defaultValue: "Technologies" }),
      },
      {
        value: `${expertCount + advancedCount}`,
        label: t("home.stat.quality", { defaultValue: "Expert & Advanced skills" }),
      },
    ],
    [t, expertCount, advancedCount]
  );

  const focusCards = useMemo(
    () => [
      {
        icon: <Briefcase className="h-4 w-4" />,
        title: t("home.focusCard.build", { defaultValue: "Product-minded build" }),
        desc: t("home.focusCard.buildDesc", {
          defaultValue: "Interfaces that connect business goals with clean delivery.",
        }),
      },
      {
        icon: <Compass className="h-4 w-4" />,
        title: t("home.focusCard.direction", { defaultValue: "Clear technical direction" }),
        desc: t("home.focusCard.directionDesc", {
          defaultValue: "Strong foundations, calmer UX, and fewer fragile decisions.",
        }),
      },
    ],
    [t]
  );

  return (
    <>
      <SEO
        title={t("home.title", { defaultValue: "Home" })}
        description={t("home.description", { defaultValue: "Full Stack Developer Portfolio" })}
        path="/"
      />

      <section className="section-shell relative min-h-screen overflow-hidden px-4 pt-24 pb-14 sm:px-6 sm:pt-28 sm:pb-16 lg:px-8 lg:pt-32">
        <div className="mx-auto w-full max-w-7xl grid gap-8 lg:grid-cols-12 lg:gap-10">

          {/* Left Hero Column */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/70 bg-blue-50/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-200">
              <Sparkles size={14} />
              {t("home.availability", { defaultValue: "Available for new projects" })}
            </div>

            <h1 className="mt-5 font-display text-[2.25rem] leading-[1.15] text-slate-900 dark:text-slate-100 sm:mt-6 sm:text-5xl xl:text-6xl">
              {t("home.greeting")}
              <span className="mt-2 block brand-gradient">
                {t("home.headline", { defaultValue: "I design systems that people enjoy using." })}
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
              {t("home.description")}
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap">
              {quickStats.map((item) => (
                <div key={item.label} className="metric-pill">
                  <span className="metric-pill__value">{item.value}</span>
                  <span className="metric-pill__label">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <CVdownload />

              <Link
                to="/contact"
                className="control-surface inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-slate-700 transition-all hover:-translate-y-0.5 dark:text-slate-100"
              >
                {t("home.contactCta", { defaultValue: "Start a conversation" })}
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="mt-8 grid gap-3 grid-cols-1 sm:grid-cols-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-card social-link-card group flex items-center justify-between rounded-2xl px-4 py-3"
                  aria-label={link.label}
                >
                  <span className="flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-100">
                    <span className={`social-link-card__icon ${link.tone}`}>{link.icon}</span>
                    <span>
                      <span className="block">{link.label}</span>
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        {t("home.socialCta", { defaultValue: "Open profile" })}
                      </span>
                    </span>
                  </span>
                  <ArrowRight size={15} className="text-slate-500 transition-transform group-hover:translate-x-1" />
                </a>
              ))}
            </div>

            <div className="mt-8 grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.title} className="glass-card feature-panel rounded-2xl p-4">
                  <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-500/10">
                    {item.icon}
                  </div>
                  <h3 className="font-display text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 grid gap-3 grid-cols-1 sm:grid-cols-2">
              {focusCards.map((item) => (
                <div key={item.title} className="editorial-card rounded-[1.7rem] p-5">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-white dark:bg-blue-500">
                    {item.icon}
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Profile & Tech Column */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto w-full max-w-md lg:ml-auto">
              <div>
                <img
                  src={MyImage}
                  alt="Muzaffarbek Mustafayev"
                  className="h-[22rem] w-full object-cover sm:h-[28rem] select-none"
                  width={480}
                  height={448}
                  fetchPriority="high"
                  style={{
                    WebkitMaskImage: "radial-gradient(ellipse 50% 50% at 50% 50%, black 65%, transparent 100%)",
                    maskImage: "radial-gradient(ellipse 50% 50% at 50% 50%, black 65%, transparent 100%)",
                  }}
                />
              </div>

              {/* Stats row */}
              <div className="mt-5 grid grid-cols-2 gap-2.5">
                <div className="group relative overflow-hidden rounded-2xl border border-slate-200/50 bg-white/60 px-4 py-3.5 dark:border-white/[0.06] dark:bg-white/[0.03]">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                    {t("home.focus", { defaultValue: "Stack" })}
                  </p>
                  <p className="mt-1.5 font-mono text-sm font-semibold text-slate-800 dark:text-slate-100">
                    React · Node.js
                  </p>
                </div>

                <div className="group relative overflow-hidden rounded-2xl border border-slate-200/50 bg-white/60 px-4 py-3.5 dark:border-white/[0.06] dark:bg-white/[0.03]">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                    {t("home.contact", { defaultValue: "Contact" })}
                  </p>
                  <a
                    href={`mailto:${socialMedias.email.path}`}
                    className="mt-1.5 inline-flex items-center gap-1.5 font-mono text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    <Mail size={12} />
                    Email
                  </a>
                </div>
              </div>

              {/* Current mode */}
              <div className="mt-2.5 relative overflow-hidden rounded-2xl border border-slate-200/50 bg-white/60 px-4 py-4 dark:border-white/[0.06] dark:bg-white/[0.03]">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                        {t("home.currentMode", { defaultValue: "Current mode" })}
                      </p>
                    </div>
                    <p className="font-display text-sm font-semibold leading-snug text-slate-800 dark:text-slate-100">
                      {t("home.currentModeValue", { defaultValue: "Building thoughtful digital products" })}
                    </p>
                  </div>
                  <span className="shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600/10 text-blue-500 dark:bg-blue-500/10 dark:text-blue-400">
                    <Zap size={16} />
                  </span>
                </div>
              </div>

              {/* Top stack */}
              <div className="mt-2.5 relative overflow-hidden rounded-2xl border border-slate-200/50 bg-white/60 px-4 py-3.5 dark:border-white/[0.06] dark:bg-white/[0.03]">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
                <div className="flex items-center gap-2 mb-2.5">
                  <Terminal size={11} className="text-slate-400 dark:text-slate-500" />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                    {t("home.topStack", { defaultValue: "Top stack" })}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {SKILLS.filter((s) => s.level === "expert").slice(0, 6).map((s) => (
                    <span
                      key={s.name}
                      className="inline-flex items-center rounded-md border border-blue-200/60 bg-blue-50/80 px-2.5 py-1 font-mono text-[11px] font-semibold text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-300"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Live Build Developer Terminal */}
              <div className="mt-2.5 relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/95 p-4 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/90">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

                {/* Terminal Header */}
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5 mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500/90 shadow-[0_0_6px_rgba(244,63,94,0.4)]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500/90 shadow-[0_0_6px_rgba(245,158,11,0.4)]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/90 shadow-[0_0_6px_rgba(16,185,129,0.4)]" />
                  </div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    bash · {t("home.liveBuild", { defaultValue: "Live build" }).toLowerCase()}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)] animate-pulse" />
                    <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-400">LIVE</span>
                  </span>
                </div>

                {/* Terminal Output */}
                <div className="font-mono text-xs leading-relaxed space-y-1 min-h-[120px]" aria-live="polite">
                  {termLines.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 animate-fadeIn transition-all duration-300"
                    >
                      <span className="text-slate-500 select-none text-[11px] w-4 text-center">
                        {item.prefix}
                      </span>
                      <span className={item.tone}>
                        {item.text}
                      </span>
                    </div>
                  ))}

                  {/* Actively typing line */}
                  {currentPartial !== null && currentLineItem && (
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 select-none text-[11px] w-4 text-center">
                        {currentLineItem.prefix}
                      </span>
                      <span className={currentLineItem.tone}>
                        {currentPartial}
                        <span className="inline-block w-2 h-3.5 ml-0.5 bg-blue-400 align-middle animate-pulse" />
                      </span>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Real-time GitHub Activity Section */}
      <GitHubActivity />
    </>
  );
}

export default Home;
