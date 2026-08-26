import React, { useMemo, memo } from "react";
import { useTranslation } from "react-i18next";
import { Layers, BookOpen, Radio, Globe2, ShieldCheck, Bot, ExternalLink } from "lucide-react";

const ProjectsResearch = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || "uz";

  const projectsAndResearch = useMemo(() => [
    {
      title: lang === "ru" ? "Исследования ASR для узбекского языка (Speech-to-Text)" : lang === "en" ? "Uzbek ASR Research (Speech-to-Text)" : "O'zbek tili ASR tadqiqotlari (Speech-to-Text)",
      tag: "Research & Publication",
      desc: lang === "ru"
        ? "Сравнительный анализ моделей Whisper, Wav2Vec2 и VOSK на базе открытого датасета Mozilla Common Voice. Публикация научных статей и датасетов на платформе Zenodo."
        : lang === "en"
        ? "Comparative benchmark of Whisper, Wav2Vec2, and VOSK models for the Uzbek language using Mozilla Common Voice. Published research papers and open datasets on Zenodo."
        : "Mozilla Common Voice ochiq ma'lumotlar to'plami asosida Whisper, Wav2Vec2 va VOSK modellarining solishtirma tahlili. Ilmiy maqolalar va ochiq ma'lumotlar to'plamini Zenodo platformasida nashr etish.",
      doi: "10.5281/zenodo.21299321",
      doiUrl: "https://doi.org/10.5281/zenodo.21299321",
      icon: <BookOpen className="h-5 w-5 text-purple-500" />
    },
    {
      title: "Sammeet (Real-time Video-konferensiya tizimi)",
      tag: "WebRTC & WebSockets",
      desc: lang === "ru"
        ? "Система видеоконференций реального времени на базе WebRTC, Simple-Peer и WebSockets. Полностью развернута на Linux-сервере с Nginx reverse proxy и SSL-сертификатами."
        : lang === "en"
        ? "Real-time video conferencing platform built on WebRTC, Simple-Peer, and WebSockets. Deployed on Linux with Nginx reverse proxy and SSL encryption."
        : "WebRTC, Simple-Peer va WebSockets arxitekturasida real vaqtda audio/video oqimini uzatish. Linux serverida Nginx reverse proxy va SSL sertifikatlari bilan to'liq deploy qilingan.",
      icon: <Radio className="h-5 w-5 text-blue-500" />
    },
    {
      title: "Tourism for Everyone (Inklyuziv turizm platformasi)",
      tag: "Social Impact & Web",
      desc: lang === "ru"
        ? "Веб-платформа для людей с ограниченными возможностями здоровья, предоставляющая удобную инклюзивную маршрутизацию и интерактивные карты доступных объектов."
        : lang === "en"
        ? "Interactive accessibility platform offering specialized routing and barrier-free interactive maps for travelers with disabilities."
        : "Imkoniyati cheklangan shaxslar uchun qulay marshrutlash va interaktiv xaritalarni taqdim etuvchi veb-platforma.",
      icon: <Globe2 className="h-5 w-5 text-emerald-500" />
    },
    {
      title: "RuralDoc Connect (HealthTech loyihasi)",
      tag: "HealthTech / Telemedicine",
      desc: lang === "ru"
        ? "Система телемедицины для сельских районов и оптимизации маршрутов мобильных медицинских бригад (Участник акселератора Startup Wars)."
        : lang === "en"
        ? "Telemedicine platform optimizing mobile medical team routes and healthcare delivery in remote rural regions (Startup Wars accelerator participant)."
        : "Qishloq joylarida telemeditsina va tibbiy brigadalarning harakatlanish yo'nalishlarini optimallashtirish tizimi (Startup Wars ishtirokchisi).",
      icon: <ShieldCheck className="h-5 w-5 text-amber-500" />
    },
    {
      title: "AI & Telegram Avtomatlashtirish Botlari",
      tag: "AI Agents & Automation",
      desc: lang === "ru"
        ? "Интеллектуальные помощники на базе Node.js (grammY) и LLM API (Gemini, Claude, OpenRouter) для автоматического анализа документов (Word, тексты) и бизнес-процессов."
        : lang === "en"
        ? "Intelligent assistant bots powered by Node.js (grammY) and LLM APIs (Gemini, Claude, OpenRouter) for automated document analysis and business workflow automation."
        : "Node.js (grammY) va LLM API'lari asosida hujjatlarni (Word, matnlar) tahlil qiluvchi va avtomatlashtiruvchi intellektual yordamchilar.",
      icon: <Bot className="h-5 w-5 text-cyan-500" />
    }
  ], [lang]);

  return (
    <section>
      <div className="flex items-center gap-3 mb-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-600 text-white shadow-lg shadow-purple-600/25 dark:bg-purple-500">
          <Layers size={20} />
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-slate-100">
            {t("about.projects.title")}
          </h2>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {t("about.projects.subtitle")}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {projectsAndResearch.map((item, idx) => (
          <div key={idx} className="glass-card rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-purple-500/30 hover:shadow-lg">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-slate-900 dark:text-slate-100">{item.title}</h3>
                  <span className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">{item.tag}</span>
                </div>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.desc}</p>
            {item.doi && (
              <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-white/[0.06] flex items-center justify-between text-xs">
                <span className="font-mono text-slate-500 dark:text-slate-400">DOI: {item.doi}</span>
                <a href={item.doiUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 transition-colors">
                  <span>{t("about.projects.zenodo")}</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default memo(ProjectsResearch);
