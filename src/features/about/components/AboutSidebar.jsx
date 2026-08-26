import React, { useMemo, memo } from "react";
import { useTranslation } from "react-i18next";
import { Target, Globe2, CheckCircle2 } from "lucide-react";

const AboutSidebar = () => {
  const { t } = useTranslation();

  const languages = useMemo(() => [
    { name: t("about.languages.uz.name", { defaultValue: "O'zbek tili" }), level: t("about.languages.uz.level", { defaultValue: "Ona tili / Native" }), badge: t("about.languages.uz.badge", { defaultValue: "Native" }) },
    { name: t("about.languages.en.name", { defaultValue: "Ingliz tili" }), level: t("about.languages.en.level", { defaultValue: "Professional working (CEFR B2)" }), badge: t("about.languages.en.badge", { defaultValue: "CEFR B2" }) },
    { name: t("about.languages.ru.name", { defaultValue: "Rus tili" }), level: t("about.languages.ru.level", { defaultValue: "Professional working" }), badge: t("about.languages.ru.badge", { defaultValue: "Fluent" }) }
  ], [t]);

  return (
    <aside className="space-y-8 lg:col-span-4">
      {/* Philosophy Card */}
      <div className="rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 p-7 text-white shadow-2xl shadow-blue-700/25">
        <div className="flex items-center gap-2 text-blue-200 text-xs font-bold uppercase tracking-wider">
          <Target size={16} />
          <span>{t("about.missionLabel")}</span>
        </div>
        <blockquote className="mt-5 font-display text-2xl font-bold leading-snug text-white">
          "{t("about.quote")}"
        </blockquote>
        <p className="mt-5 text-sm leading-relaxed text-blue-100/85">
          {t("about.mission")}
        </p>
      </div>

      {/* Tillar (Languages) Card */}
      <div className="glass-card rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-5">
          <Globe2 size={18} />
          <h3 className="text-xs font-bold uppercase tracking-wider">{t("about.sidebar.languages")}</h3>
        </div>

        <div className="space-y-3">
          {languages.map((l) => (
            <div key={l.name} className="flex items-center justify-between rounded-xl border border-slate-200/60 bg-slate-50/60 p-3 dark:border-white/[0.06] dark:bg-white/[0.03]">
              <div>
                <span className="font-semibold text-sm text-slate-800 dark:text-slate-200 block">{l.name}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">{l.level}</span>
              </div>
              <span className="inline-flex rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-bold text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">{l.badge}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Focus Pillars Card */}
      <div className="glass-card rounded-3xl p-6 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">{t("about.sidebar.specialties")}</h3>
        <div className="space-y-3 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50/80 dark:bg-white/[0.03]">
            <CheckCircle2 size={15} className="text-emerald-500" />
            <span>{t("about.focus.webrtc", { defaultValue: "Real-time WebRTC & Audio/Video Streams" })}</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50/80 dark:bg-white/[0.03]">
            <CheckCircle2 size={15} className="text-purple-500" />
            <span>{t("about.focus.asr", { defaultValue: "Speech-to-Text & ASR AI Engineering" })}</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50/80 dark:bg-white/[0.03]">
            <CheckCircle2 size={15} className="text-blue-500" />
            <span>{t("about.focus.architecture", { defaultValue: "Full-Stack Architecture (React/Node/FastAPI)" })}</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50/80 dark:bg-white/[0.03]">
            <CheckCircle2 size={15} className="text-cyan-500" />
            <span>{t("about.focus.hardware", { defaultValue: "Mechatronics & Embedded Hardware" })}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default memo(AboutSidebar);
