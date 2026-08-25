import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { BookOpen, Filter, Search, Sparkles, Tag, X } from "lucide-react";
import SEO from "../components/SEO";
import ArticleCard from "../components/ArticleCard";
import ArticleModal from "../components/ArticleModal";
import { articles, getArticleCopy, getArticleLanguage } from "../data/articlesData";

export default function Articles() {
  const { t, i18n } = useTranslation();
  const currentLanguage = getArticleLanguage(i18n.resolvedLanguage || i18n.language);
  const [activeArticle, setActiveArticle] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTag, setSelectedTag] = useState("all");

  const allCategories = useMemo(
    () => ["all", ...Array.from(new Set(articles.map((article) => article.categoryKey)))],
    []
  );

  const allTags = useMemo(() => {
    const tags = new Set();
    articles.forEach((article) => article.tags?.forEach((tag) => tags.add(tag)));
    return ["all", ...Array.from(tags)];
  }, []);

  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.replace("#", ""));
    if (!hash) return;

    const article = articles.find((item) => item.id === hash);
    if (article) setActiveArticle(article);
  }, []);

  const filteredArticles = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return articles.filter((article) => {
      const copy = getArticleCopy(article, t, currentLanguage);
      const searchableText = [
        copy.title,
        copy.description,
        copy.category,
        article.tags.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = query === "" || searchableText.includes(query);
      const matchesCategory =
        selectedCategory === "all" || article.categoryKey === selectedCategory;
      const matchesTag = selectedTag === "all" || article.tags?.includes(selectedTag);

      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [searchTerm, selectedCategory, selectedTag, t, currentLanguage]);

  const getCategoryLabel = (categoryKey) =>
    categoryKey === "all"
      ? t("articles.allCategories")
      : t(`articles.categories.${categoryKey}`, { defaultValue: categoryKey });

  const openArticle = (article) => {
    setActiveArticle(article);
    window.history.replaceState(null, "", `#${encodeURIComponent(article.id)}`);
  };

  const closeArticle = () => {
    setActiveArticle(null);
    window.history.replaceState(null, "", window.location.pathname);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedTag("all");
  };

  const hasActiveFilters =
    searchTerm.trim() !== "" || selectedCategory !== "all" || selectedTag !== "all";

  return (
    <>
      <SEO
        title={t("articles.pageTitle")}
        description={t("articles.pageSubtitle")}
        path="/articles"
      />

      <section className="section-shell min-h-screen px-4 pb-20 pt-28 text-slate-700 dark:text-slate-300 sm:px-6 sm:pt-32">
        <div className="mx-auto w-full max-w-7xl">
          <header className="mb-12 max-w-3xl space-y-4 sm:mb-16">
            <div className="hero-badge">
              <Sparkles size={14} />
              {t("articles.badge")}
            </div>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl lg:text-6xl">
              {t("articles.pageTitle")}
            </h1>
            <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
              {t("articles.pageSubtitle")}
            </p>
          </header>

          <div className="mb-8 grid gap-4 lg:grid-cols-[1fr_auto_auto_auto] lg:items-center">
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <input
                type="search"
                placeholder={t("articles.search")}
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="form-control w-full rounded-2xl py-3 pl-12 pr-6 text-sm"
              />
            </div>

            <div className="relative">
              <Filter
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <select
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
                className="form-control w-full cursor-pointer appearance-none rounded-2xl py-3 pl-12 pr-10 text-sm lg:min-w-[210px]"
                aria-label={t("articles.categoryFilter", { defaultValue: "Filter by category" })}
              >
                {allCategories.map((categoryKey) => (
                  <option key={categoryKey} value={categoryKey}>
                    {getCategoryLabel(categoryKey)}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <Tag
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <select
                value={selectedTag}
                onChange={(event) => setSelectedTag(event.target.value)}
                className="form-control w-full cursor-pointer appearance-none rounded-2xl py-3 pl-12 pr-10 text-sm lg:min-w-[190px]"
                aria-label={t("articles.tagFilter", { defaultValue: "Filter by tag" })}
              >
                {allTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag === "all" ? t("articles.allTags") : tag}
                  </option>
                ))}
              </select>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-200 active:scale-95 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                <X size={16} />
                {t("articles.resetFilters", { defaultValue: "Reset" })}
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="mb-6 flex flex-wrap items-center gap-2">
            {allCategories.map((categoryKey) => {
              const active = selectedCategory === categoryKey;
              const count =
                categoryKey === "all"
                  ? articles.length
                  : articles.filter((a) => a.categoryKey === categoryKey).length;

              return (
                <button
                  type="button"
                  key={categoryKey}
                  onClick={() => setSelectedCategory(categoryKey)}
                  className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold transition-all duration-200 active:scale-95 ${
                    active
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/25"
                      : "control-surface text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                  }`}
                >
                  <span>{getCategoryLabel(categoryKey)}</span>
                  <span
                    className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${
                      active
                        ? "bg-white/25 text-white"
                        : "bg-slate-200/80 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mb-10 flex flex-wrap gap-2" aria-label={t("articles.tagFilter")}>
            {allTags.slice(0, 9).map((tag) => {
              const active = selectedTag === tag;

              return (
                <button
                  type="button"
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`rounded-2xl px-3 py-1.5 text-xs font-semibold transition-all active:scale-95 ${
                    active
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                      : "control-surface text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-300"
                  }`}
                >
                  {tag === "all" ? t("articles.allTags") : tag}
                </button>
              );
            })}
          </div>

          <div className="mb-8 flex items-center gap-3 sm:mb-10">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-slate-800 dark:text-blue-400">
              <BookOpen size={20} />
            </div>
            <div>
              <p className="mb-0.5 text-[10px] font-bold uppercase leading-none tracking-widest text-slate-400">
                {t("articles.resultsLabel", { defaultValue: "Articles & Insights" })}
              </p>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {t("articles.showing")} {filteredArticles.length} {t("articles.count")}
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
            {filteredArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                t={t}
                language={currentLanguage}
                onClick={openArticle}
              />
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="py-20 text-center sm:py-24">
              <p className="text-lg text-slate-400 sm:text-xl">
                {t("articles.noResults")}
              </p>
            </div>
          )}
        </div>

        <ArticleModal
          article={activeArticle}
          onClose={closeArticle}
          onSelectArticle={openArticle}
          t={t}
          language={currentLanguage}
        />
      </section>
    </>
  );
}
