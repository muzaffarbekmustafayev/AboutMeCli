import React from "react";
import { ArrowRight, Calendar, Clock, Tag, Sparkles } from "lucide-react";
import { getArticleCopy } from "../data/articlesData";

const categoryThemeMap = {
  ai: "from-purple-600/90 to-blue-600/90 text-white border-purple-400/30",
  architecture: "from-amber-600/90 to-orange-600/90 text-white border-amber-400/30",
  frontend: "from-emerald-600/90 to-teal-600/90 text-white border-emerald-400/30",
  bestPractices: "from-blue-600/90 to-indigo-600/90 text-white border-blue-400/30",
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
  const copy = getArticleCopy(article, t, language);
  const badgeTheme =
    categoryThemeMap[article.categoryKey] ||
    "from-blue-600/90 to-indigo-600/90 text-white border-blue-400/30";

  const openArticle = () => onClick(article);

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
      className="card-glow-hover interactive-card group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white/85 backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent dark:border-slate-800/80 dark:bg-slate-900/70"
      aria-label={`${t("articles.openArticle", { defaultValue: "Open article" })}: ${copy.title}`}
    >
      <div className="image-zoom-frame relative h-52 w-full bg-slate-100 dark:bg-slate-800">
        <img
          src={article.image}
          alt={copy.title}
          className="image-zoom-media h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-90 transition-opacity group-hover:opacity-95" />

        <span
          className={`absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border bg-gradient-to-r ${badgeTheme} px-3 py-1 text-xs font-semibold shadow-lg backdrop-blur-md`}
        >
          <Sparkles size={11} className="opacity-90" />
          {copy.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between p-6">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} className="text-blue-500" />
              {formatDate(article.date, language)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} className="text-amber-500" />
              {copy.readTime}
            </span>
          </div>

          <h3 className="font-display text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-blue-400 sm:text-xl">
            {copy.title}
          </h3>

          <p className="line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {copy.description}
          </p>
        </div>

        <div className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-800/80">
          <div className="mb-4 flex flex-wrap gap-1.5">
            {article.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-xl bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600 transition-colors dark:bg-slate-800 dark:text-slate-300"
              >
                <Tag size={10} className="opacity-60 text-blue-500" />
                {tag}
              </span>
            ))}
          </div>

          <div className="inline-flex items-center gap-2 rounded-2xl text-xs font-bold uppercase tracking-wider text-blue-600 transition-all group-hover:gap-3 dark:text-blue-400">
            <span>{t("articles.readArticle", { defaultValue: "Read Article" })}</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </article>
  );
}
