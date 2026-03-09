import React, { useMemo } from "react";
import {
  ArrowRight,
  Briefcase,
  Code2,
  Compass,
  Github,
  Globe2,
  Linkedin,
  Mail,
  MoveRight,
  Rocket,
  Sparkles,
  Youtube,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SEO from "../components/SEO";

import MyImage from "../assets/USER.jpg";
import TelegramIcon from "../components/Icons/TelegramIcon";
import { socialMedias } from "../data/socialMedias";
import CVdownload from "../components/CVdownload";

function Home() {
  const { t } = useTranslation();

  const socialLinks = useMemo(
    () => [
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
    ],
    []
  );

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
        value: "5+",
        label: t("home.stat.projects", { defaultValue: "Shipping products" }),
      },
      {
        value: "24/7",
        label: t("home.stat.support", { defaultValue: "Async collaboration" }),
      },
      {
        value: "UX",
        label: t("home.stat.quality", { defaultValue: "Clarity before complexity" }),
      },
    ],
    [t]
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
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/70 bg-blue-50/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-200">
              <Sparkles size={14} />
              {t("home.availability", { defaultValue: "Available for new projects" })}
            </div>

            <h1 className="mt-5 font-display text-[2rem] leading-tight text-slate-900 dark:text-slate-100 sm:mt-6 sm:text-5xl xl:text-6xl">
              {t("home.greeting")}
              <span className="mt-2 block brand-gradient">
                {t("home.headline", { defaultValue: "I design systems that people enjoy using." })}
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
              {t("home.description")}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
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
                className="control-surface inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-slate-700 transition-all hover:-translate-y-0.5 dark:text-slate-100"
              >
                {t("home.contactCta", { defaultValue: "Start a conversation" })}
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
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

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
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

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
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

          <div className="lg:col-span-5">
            <div className="relative mx-auto w-full max-w-md lg:ml-auto">
              <div className="absolute inset-x-6 -top-2 h-24 rounded-[2rem] bg-blue-200/50 blur-2xl dark:bg-blue-500/10" />

              <div className="glass-card relative rounded-[2.2rem] p-5 sm:p-6">
                <div className="profile-frame">
                  <div className="profile-frame__glow" />
                  <div className="profile-frame__outline" />

                  <div className="relative overflow-hidden rounded-[1.7rem] border border-white/50 dark:border-slate-700/60">
                    <img
                      src={MyImage}
                      alt="Muzaffarbek Mustafayev"
                      className="h-[22rem] w-full object-cover sm:h-[28rem]"
                      loading="lazy"
                    />

                    <div className="profile-frame__corner" />

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 via-slate-900/30 to-transparent p-5">
                      <p className="font-display text-xl font-semibold text-white">{t("home.role")}</p>
                      <p className="mt-1 text-sm text-slate-200">
                        {t("home.location", { defaultValue: "Based in Uzbekistan" })}
                      </p>
                    </div>
                  </div>

                  <div className="profile-chip profile-chip--top">
                    <span className="profile-chip__dot" />
                    {t("home.availability", { defaultValue: "Available for new projects" })}
                  </div>

                  <div className="profile-chip profile-chip--bottom">
                    <span className="text-[11px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                      {t("home.focus", { defaultValue: "Focus" })}
                    </span>
                    <span className="mt-1 block font-display text-sm font-semibold text-slate-900 dark:text-slate-100">
                      UI + Full Stack
                    </span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-3 dark:border-slate-700/70 dark:bg-slate-900/70">
                    <p className="text-xs uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                      {t("home.focus", { defaultValue: "Focus" })}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-100">React + Node.js</p>
                  </div>

                  <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-3 dark:border-slate-700/70 dark:bg-slate-900/70">
                    <p className="text-xs uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                      {t("home.contact", { defaultValue: "Contact" })}
                    </p>
                    <a
                      href={`mailto:${socialMedias.email.path}`}
                      className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-blue-700 dark:text-blue-300"
                    >
                      <Mail size={14} />
                      {t("contact.email")}
                    </a>
                  </div>
                </div>

                <div className="mt-4 rounded-[1.6rem] border border-slate-200/70 bg-white/75 p-4 dark:border-slate-700/70 dark:bg-slate-900/70">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                        {t("home.currentMode", { defaultValue: "Current mode" })}
                      </p>
                      <p className="mt-1 font-display text-lg font-semibold text-slate-900 dark:text-slate-100">
                        {t("home.currentModeValue", { defaultValue: "Building thoughtful digital products" })}
                      </p>
                    </div>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-700 to-blue-500 text-white shadow-lg shadow-blue-600/20">
                      <MoveRight size={18} />
                    </span>
                  </div>
                </div>
              </div>

              <div className="glass-card absolute -left-6 bottom-8 hidden w-56 rounded-2xl p-3 lg:block">
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  {t("home.liveBuild", { defaultValue: "Live build" })}
                </p>
                <pre className="mt-2 overflow-hidden text-xs leading-relaxed text-slate-700 dark:text-slate-300">
{`> npm run dev
> building API routes...
> UI deployed successfully`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
