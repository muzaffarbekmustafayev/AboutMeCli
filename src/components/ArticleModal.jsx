import React, { useEffect, useRef, useState } from "react";
import {
  Calendar,
  Check,
  Clock,
  Copy,
  ExternalLink,
  Send,
  Share2,
  Sparkles,
  Tag,
  User,
  X,
  ArrowRight,
  Bookmark
} from "lucide-react";
import { useToast } from "../contexts/ToastContext";
import { articles, getArticleCopy } from "../data/articlesData";

const categoryThemeMap = {
  ai: "from-purple-600 to-blue-600 text-white border-purple-400/30",
  architecture: "from-amber-600 to-orange-600 text-white border-amber-400/30",
  frontend: "from-emerald-600 to-teal-600 text-white border-emerald-400/30",
  bestPractices: "from-blue-600 to-indigo-600 text-white border-blue-400/30",
};

const formatDate = (value, language) => {
  try {
    return new Intl.DateTimeFormat(language, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(`${value}T00:00:00`));
  } catch {
    return value;
  }
};

const CodeBlock = ({ code, language = "code", t }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="relative my-4 overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-950 shadow-xl dark:border-slate-800">
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 py-2 text-xs text-slate-400">
        <span className="font-mono uppercase tracking-wider text-blue-400 font-semibold">{language}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800/80 px-2.5 py-1 text-xs font-medium text-slate-300 transition-all hover:bg-slate-700 hover:text-white active:scale-95"
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {copied ? (
            <>
              <Check size={13} className="text-emerald-400" />
              <span className="text-emerald-400">{t("articles.copiedCode", { defaultValue: "Copied!" })}</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span>{t("articles.copyCode", { defaultValue: "Copy" })}</span>
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-5 text-sm leading-relaxed text-slate-100 font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
};

const renderContentBlock = (block, index, t) => {
  if (typeof block === "string") {
    return (
      <p key={index} className="text-base leading-8 text-slate-700 dark:text-slate-300">
        {block}
      </p>
    );
  }

  if (block.type === "heading") {
    return (
      <h3
        key={index}
        className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 pt-4"
      >
        {block.text}
      </h3>
    );
  }

  if (block.type === "subheading") {
    return (
      <h4
        key={index}
        className="pt-3 font-display text-lg font-bold text-slate-900 dark:text-slate-100"
      >
        {block.text}
      </h4>
    );
  }

  if (block.type === "list") {
    return (
      <ul key={index} className="space-y-3.5 text-base leading-7 text-slate-700 dark:text-slate-300 my-2">
        {block.items.map((item, itemIdx) => (
          <li key={itemIdx} className="flex items-start gap-3">
            <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
            <span className="flex-1">{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (block.type === "quote") {
    return (
      <blockquote
        key={index}
        className="my-5 rounded-2xl border-l-4 border-blue-500 bg-blue-50/80 p-5 text-base font-medium leading-8 text-slate-800 shadow-sm dark:bg-blue-950/30 dark:text-slate-200"
      >
        <p className="italic">"{block.text}"</p>
      </blockquote>
    );
  }

  if (block.type === "code") {
    return (
      <CodeBlock
        key={index}
        code={block.code}
        language={block.language || "json"}
        t={t}
      />
    );
  }

  return null;
};

export default function ArticleModal({ article, onClose, onSelectArticle, t, language }) {
  const toast = useToast();
  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    if (article) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      setScrollProgress(0);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [article, onClose]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const total = scrollHeight - clientHeight;
    if (total > 0) {
      setScrollProgress((scrollTop / total) * 100);
    }
  };

  if (!article) return null;

  const copy = getArticleCopy(article, t, language);
  const titleId = `article-modal-title-${article.id}`;
  const badgeTheme =
    categoryThemeMap[article.categoryKey] ||
    "from-blue-600 to-indigo-600 text-white border-blue-400/30";

  // Next article in sequence
  const currentIndex = articles.findIndex((a) => a.id === article.id);
  const nextArticle =
    currentIndex >= 0 && currentIndex < articles.length - 1
      ? articles[currentIndex + 1]
      : articles[0];

  const shareUrl = `${window.location.origin}/articles#${article.id}`;

  const handleShareNative = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: copy.title,
          text: copy.description,
          url: shareUrl,
        });
        return;
      }
      await navigator.clipboard.writeText(shareUrl);
      toast.success(t("articles.copied", { defaultValue: "Article link copied" }));
    } catch {
      toast.info(t("articles.copyUnavailable", { defaultValue: "Copy is unavailable in this browser" }));
    }
  };

  const handleShareTelegram = () => {
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(copy.title)}`;
    window.open(telegramUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 lg:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label={t("articles.close", { defaultValue: "Close" })}
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="glass-card relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white/95 shadow-2xl dark:bg-slate-950/95">
        
        {/* Top Reading Progress Bar */}
        <div className="absolute left-0 top-0 z-30 h-1 w-full bg-slate-200/50 dark:bg-slate-800/50">
          <div
            className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Floating Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/90 text-slate-600 shadow-md backdrop-blur-md transition-all hover:bg-slate-100 hover:text-slate-900 active:scale-95 dark:bg-slate-900/90 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          aria-label={t("articles.close", { defaultValue: "Close" })}
        >
          <X size={20} />
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="overflow-y-auto p-5 sm:p-8 lg:p-10"
        >
          {/* Header Media */}
          <div className="image-zoom-frame relative mb-8 h-64 w-full overflow-hidden rounded-2xl bg-slate-100 sm:h-80 lg:h-96 dark:bg-slate-800 shadow-lg">
            <img src={article.image} alt={copy.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />
            
            <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-center justify-between gap-3">
              <span className={`inline-flex items-center gap-1.5 rounded-full border bg-gradient-to-r ${badgeTheme} px-4 py-1.5 text-xs font-semibold shadow-xl backdrop-blur-md`}>
                <Sparkles size={13} />
                {copy.category}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleShareTelegram}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-slate-950/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md transition-all hover:bg-sky-600 hover:border-transparent active:scale-95"
                  title="Telegram orqali ulashish"
                >
                  <Send size={12} />
                  <span>Telegram</span>
                </button>
                <button
                  type="button"
                  onClick={handleShareNative}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-slate-950/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md transition-all hover:bg-blue-600 hover:border-transparent active:scale-95"
                  title={t("articles.share", { defaultValue: "Share" })}
                >
                  <Share2 size={12} />
                  <span>{t("articles.share", { defaultValue: "Share" })}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Article Header Info */}
          <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-5 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                <User size={14} className="text-blue-500" />
                {article.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className="text-blue-500" />
                {formatDate(article.date, language)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-amber-500" />
                {copy.readTime}
              </span>
            </div>

            <h2
              id={titleId}
              className="font-display text-2xl font-extrabold leading-tight text-slate-900 dark:text-slate-100 sm:text-3xl lg:text-4xl"
            >
              {copy.title}
            </h2>

            <p className="text-base font-medium leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
              {copy.description}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-xl bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 transition-colors dark:bg-blue-900/30 dark:text-blue-300"
                >
                  <Tag size={11} className="opacity-70" />
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className="my-8 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-800" />

          {/* Main Article Body */}
          <div className="space-y-6">
            {copy.content.map((block, idx) => renderContentBlock(block, idx, t))}
          </div>

          {/* Next Article Recommendation */}
          {nextArticle && onSelectArticle && (
            <div className="mt-12 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-6 dark:border-slate-800/80 dark:bg-slate-900/60">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
                {t("articles.nextArticle", { defaultValue: "Next Read" })}
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h4 className="font-display text-lg font-bold text-slate-900 dark:text-slate-100">
                    {getArticleCopy(nextArticle, t, language).title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                    {getArticleCopy(nextArticle, t, language).description}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectArticle(nextArticle)}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95 shrink-0"
                >
                  <span>{t("articles.readNext", { defaultValue: "Read Next" })}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* Modal Footer */}
          <footer className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-6 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={handleShareNative}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-200 active:scale-95 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              <Share2 size={16} />
              {t("articles.share", { defaultValue: "Share" })}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700 active:scale-95 dark:bg-blue-500 dark:hover:bg-blue-400"
            >
              {t("articles.close", { defaultValue: "Close" })}
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}
