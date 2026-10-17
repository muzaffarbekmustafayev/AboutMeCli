import React, { useState } from "react";
import {
  ArrowRight,
  Calendar,
  Clock,
  Tag,
  Sparkles,
  Users,
  FileDown,
  ExternalLink,
  Award,
  Github,
  BookOpen
} from "lucide-react";
import { getArticleCopy } from "../data/articlesData";

const categoryThemeMap = {
  digitization: "from-amber-600/95 to-orange-600/95 text-white border-amber-400/40 shadow-amber-500/20",
  geoai: "from-purple-600/95 to-blue-600/95 text-white border-purple-400/40 shadow-purple-500/20",
  inclusiveAi: "from-emerald-600/95 to-teal-600/95 text-white border-emerald-400/40 shadow-emerald-500/20",
  speechAi: "from-cyan-600/95 to-blue-600/95 text-white border-cyan-400/40 shadow-cyan-500/20",
  ai: "from-purple-600/95 to-blue-600/95 text-white border-purple-400/40 shadow-purple-500/20",
};

const formatDate = (value, language) => {
  try {
    return new Intl.DateTimeFormat(language, {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(`${value}T00:00:00`));
  } catch {
    return value;
  }
};

export default function ArticleCard({ article, t, language, onClick }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const copy = getArticleCopy(article, t, language);
  const badgeTheme =
    categoryThemeMap[article.categoryKey] ||
    "from-blue-600/95 to-indigo-600/95 text-white border-blue-400/40 shadow-blue-500/20";

  const openArticle = () => onClick(article);

  const handlePdfClick = (e) => {
    e.stopPropagation();
    window.open(article.pdfUrl, "_blank", "noopener,noreferrer");
  };

  const handleDoiClick = (e) => {
    e.stopPropagation();
    window.open(article.doiUrl, "_blank", "noopener,noreferrer");
  };

  const handleGithubClick = (e) => {
    e.stopPropagation();
    window.open(article.githubUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={openArticle}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openArticle();
        }
      }}
      className="card-glow-hover interactive-card group relative flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-white/90 shadow-md backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-slate-800/90 dark:bg-slate-900/80"
      aria-label={`${t("articles.openArticle", { defaultValue: "Open article" })}: ${copy.title}`}
    >
      {/* Top Banner & Image Frame */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        {!imageLoaded && (
          <div className="absolute inset-0 z-0 bg-slate-200/80 dark:bg-slate-800/90 animate-pulse" />
        )}
        <img
          src={article.image}
          alt={copy.title}
          onLoad={() => setImageLoaded(true)}
          className={`h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
            imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

        {/* Floating Top Header Badges */}
        <div className="absolute left-3 right-3 top-3 flex flex-wrap items-center justify-between gap-2 sm:left-4 sm:right-4 sm:top-4">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border bg-gradient-to-r ${badgeTheme} px-3 py-1 text-[11px] font-bold shadow-lg backdrop-blur-md sm:text-xs`}
          >
            <Sparkles size={11} className="opacity-90" />
            <span className="truncate max-w-[170px] sm:max-w-none">{copy.category}</span>
          </span>

          <div className="flex items-center gap-1.5">
            {article.doi && (
              <button
                type="button"
                onClick={handleDoiClick}
                className="inline-flex min-h-[30px] items-center gap-1 rounded-full border border-white/25 bg-slate-950/75 px-3 py-1 font-mono text-[11px] font-semibold text-white shadow-md backdrop-blur-md transition-all hover:bg-blue-600 hover:border-transparent active:scale-95"
                title={`DOI: ${article.doi}`}
              >
                <span>DOI</span>
                <ExternalLink size={10} className="opacity-90" />
              </button>
            )}
          </div>
        </div>

        {/* Floating Bottom Info on Image */}
        <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between text-white/90 text-xs">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 font-medium text-[11px] sm:text-xs bg-slate-950/60 px-2.5 py-0.5 rounded-lg backdrop-blur-sm">
              <Calendar size={12} className="text-blue-400" />
              {formatDate(article.date, language)}
            </span>
            <span className="flex items-center gap-1.5 font-medium text-[11px] sm:text-xs bg-slate-950/60 px-2.5 py-0.5 rounded-lg backdrop-blur-sm">
              <Clock size={12} className="text-amber-400" />
              {copy.readTime}
            </span>
          </div>

          {article.grant && (
            <span className="hidden sm:inline-flex items-center gap-1 rounded-lg bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-300 border border-amber-400/30 backdrop-blur-sm">
              <Award size={10} />
              {article.grant}
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
        <div className="space-y-3">
          {/* Authors Line */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <Users size={14} className="shrink-0 text-blue-500" />
            <span className="truncate">{article.authors}</span>
          </div>

          {/* Title */}
          <h3 className="font-display text-base font-bold leading-snug text-slate-900 transition-colors group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-blue-400 sm:text-lg line-clamp-2">
            {copy.title}
          </h3>

          {/* Description */}
          <p className="line-clamp-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300 sm:text-sm">
            {copy.description}
          </p>

          {/* Journal / Venue Reference */}
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500 italic">
            <BookOpen size={12} className="shrink-0 opacity-70" />
            <span className="line-clamp-1">{article.journal}</span>
          </div>
        </div>

        {/* Card Footer */}
        <div className="mt-5 border-t border-slate-100 pt-4 dark:border-slate-800/80">
          {/* Tags */}
          <div className="mb-4 flex flex-wrap gap-1.5">
            {article.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-lg bg-slate-100/90 px-2.5 py-1 text-[11px] font-medium text-slate-600 transition-colors dark:bg-slate-800/90 dark:text-slate-300"
              >
                <Tag size={10} className="opacity-60 text-blue-500" />
                {tag}
              </span>
            ))}
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between gap-2">
            <div className="inline-flex items-center gap-1.5 rounded-xl py-1 text-xs font-bold uppercase tracking-wider text-blue-600 transition-all group-hover:gap-2.5 dark:text-blue-400">
              <span>{t("articles.readArticle", { defaultValue: "Read Article" })}</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </div>

            <div className="flex items-center gap-2">
              {article.githubUrl && (
                <button
                  type="button"
                  onClick={handleGithubClick}
                  className="inline-flex min-h-[34px] items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-100/80 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-900 hover:text-white dark:border-slate-700/80 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-slate-700 dark:hover:text-white active:scale-95"
                  title="GitHub Repository"
                >
                  <Github size={13} />
                  <span>Code</span>
                </button>
              )}

              {article.pdfUrl && (
                <button
                  type="button"
                  onClick={handlePdfClick}
                  className="inline-flex min-h-[34px] items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm shadow-blue-600/20 transition-all hover:from-blue-700 hover:to-indigo-700 active:scale-95"
                  title={t("articles.downloadPdf", { defaultValue: "Download PDF" })}
                >
                  <FileDown size={13} />
                  <span>{article.pdfUrl.endsWith(".docx") || article.pdfUrl.includes(".docx") ? "Doc" : "PDF"}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
