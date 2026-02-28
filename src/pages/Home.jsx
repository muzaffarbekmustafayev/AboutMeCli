import React, { useMemo } from "react";
import {
  ArrowRight,
  Code2,
  Github,
  Globe2,
  Linkedin,
  Mail,
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
        icon: <Code2 className="h-4 w-4 text-teal-600 dark:text-teal-300" />,
        title: t("home.highlight.architecture", { defaultValue: "Clean Architecture" }),
        desc: t("home.highlight.architectureDesc", {
          defaultValue: "Scalable frontend and backend structure for long-term growth.",
        }),
      },
      {
        icon: <Globe2 className="h-4 w-4 text-cyan-600 dark:text-cyan-300" />,
        title: t("home.highlight.ux", { defaultValue: "User-Centered UX" }),
        desc: t("home.highlight.uxDesc", {
          defaultValue: "Fast, accessible interfaces with purposeful interaction patterns.",
        }),
      },
      {
        icon: <Rocket className="h-4 w-4 text-amber-600 dark:text-amber-300" />,
        title: t("home.highlight.delivery", { defaultValue: "Production Delivery" }),
        desc: t("home.highlight.deliveryDesc", {
          defaultValue: "From idea to deployment with performance and reliability in focus.",
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
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-teal-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-0 h-64 w-64 rounded-full bg-amber-400/20 blur-3xl" />

        <div className="mx-auto w-full max-w-7xl grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-300/50 bg-teal-100/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-teal-700 dark:border-teal-600/40 dark:bg-teal-500/20 dark:text-teal-200">
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

            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <CVdownload />

              <Link
                to="/contact"
                className="control-surface inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-slate-700 transition-all hover:-translate-y-0.5 dark:text-slate-200"
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
                  className="glass-card group flex items-center justify-between rounded-2xl px-4 py-3"
                  aria-label={link.label}
                >
                  <span className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                    <span className={link.tone}>{link.icon}</span>
                    {link.label}
                  </span>
                  <ArrowRight size={15} className="text-slate-500 transition-transform group-hover:translate-x-1" />
                </a>
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.title} className="glass-card rounded-2xl p-4">
                  <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
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
          </div>

          <div className="lg:col-span-5">
            <div className="relative mx-auto w-full max-w-md lg:ml-auto">
              <div className="absolute -inset-3 rounded-[2.2rem] bg-gradient-to-br from-teal-500/30 via-cyan-400/20 to-amber-400/30 blur-2xl" />

              <div className="glass-card relative rounded-[2.2rem] p-5 sm:p-6">
                <div className="relative overflow-hidden rounded-[1.7rem] border border-white/50 dark:border-slate-700/60">
                  <img
                    src={MyImage}
                    alt="Muzaffarbek Mustafayev"
                    className="h-[22rem] w-full object-cover sm:h-[28rem]"
                    loading="lazy"
                  />

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 via-slate-900/30 to-transparent p-5">
                    <p className="font-display text-xl font-semibold text-white">{t("home.role")}</p>
                    <p className="mt-1 text-sm text-slate-200">
                      {t("home.location", { defaultValue: "Based in Uzbekistan" })}
                    </p>
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
                      className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-teal-700 dark:text-teal-300"
                    >
                      <Mail size={14} />
                      {t("contact.email")}
                    </a>
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
