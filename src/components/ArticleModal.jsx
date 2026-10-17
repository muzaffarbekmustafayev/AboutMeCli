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
  Users,
  X,
  ArrowRight,
  FileDown,
  Building2,
  Award,
  BookOpen,
  Quote,
  Github
} from "lucide-react";
import { useToast } from "../contexts/ToastContext";
import { articles, getArticleCopy } from "../data/articlesData";

const categoryThemeMap = {
  digitization: "from-amber-600 to-orange-600 text-white border-amber-400/30",
  geoai: "from-purple-600 to-blue-600 text-white border-purple-400/30",
  inclusiveAi: "from-emerald-600 to-teal-600 text-white border-emerald-400/30",
  speechAi: "from-cyan-600 to-blue-600 text-white border-cyan-400/30",
  ai: "from-purple-600 to-blue-600 text-white border-purple-400/30",
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
  const [copiedCitationKey, setCopiedCitationKey] = useState(null);

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

  const handleCopyCitation = async (format = "apa") => {
    const citationText = article.citations?.[format] || article.citations?.apa || `${article.authors} (${article.date.split("-")[0]}). ${copy.title}. ${article.journal}. ${article.doiUrl}`;
    try {
      await navigator.clipboard.writeText(citationText);
      setCopiedCitationKey(format);
      toast.success(t("articles.citationCopied", { defaultValue: "Citation copied to clipboard!" }));
      setTimeout(() => setCopiedCitationKey(null), 2500);
    } catch {
      toast.info("Failed to copy citation");
    }
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
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
            
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
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200">
                <Users size={14} className="text-blue-500" />
                {article.authors}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className="text-blue-500" />
                {formatDate(article.date, language)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-amber-500" />
                {copy.readTime}
              </span>
              {article.grant && (
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs font-bold text-amber-700 dark:text-amber-300">
                  <Award size={13} />
                  <span>Grant: {article.grant}</span>
                </span>
              )}
            </div>

            <h2
              id={titleId}
              className="font-display text-2xl font-extrabold leading-tight text-slate-900 dark:text-slate-100 sm:text-3xl lg:text-4xl"
            >
              {copy.title}
            </h2>

            {/* Authors with ORCID details */}
            {article.authorsList && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {article.authorsList.map((author, aIdx) => (
                  <span
                    key={aIdx}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-800 dark:border-white/10 dark:bg-slate-900/90 dark:text-slate-200"
                  >
                    <Users size={13} className="text-blue-500 shrink-0" />
                    <span className="font-semibold">{author.name}</span>
                    {author.role && (
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">({author.role})</span>
                    )}
                    {author.orcid && (
                      <a
                        href={author.orcidUrl || `https://orcid.org/${author.orcid}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-400 hover:underline border border-emerald-300/40"
                        title={`ORCID: ${author.orcid}`}
                      >
                        <span className="font-extrabold">iD</span>
                        <span>{author.orcid}</span>
                      </a>
                    )}
                  </span>
                ))}
              </div>
            )}

            {/* Affiliation & Journal Row */}
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-slate-800/80 dark:bg-slate-900/60 space-y-2 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Building2 size={15} className="shrink-0 text-blue-500" />
                <span className="font-medium">
                  {language === "uz" ? article.affiliation : article.affiliationEn || article.affiliation}
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <BookOpen size={15} className="shrink-0 text-purple-500" />
                <span>{article.journal}</span>
              </div>
              {article.grantTitle && (
                <div className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                  • {article.grantTitle}
                </div>
              )}
            </div>

            {/* Quick Action Buttons for Science Articles */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              {article.pdfUrl && (
                <a
                  href={article.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-600/25 transition-all hover:from-blue-700 hover:to-indigo-700 active:scale-95"
                >
                  <FileDown size={15} />
                  <span>
                    {article.pdfUrl.includes(".docx") ? "Download Document (DOCX)" : t("articles.downloadPdf", { defaultValue: "Download PDF" })}
                  </span>
                </a>
              )}

              {article.githubUrl && (
                <a
                  href={article.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-900 hover:text-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white"
                >
                  <Github size={14} />
                  <span>GitHub Repository</span>
                </a>
              )}

              {article.doiUrl && (
                <a
                  href={article.doiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <ExternalLink size={14} className="text-blue-500" />
                  <span>DOI: {article.doi}</span>
                </a>
              )}

              {article.articleUrl && (
                <a
                  href={article.articleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <ExternalLink size={14} className="text-emerald-500" />
                  <span>{t("articles.officialPublication", { defaultValue: "Official Publication" })}</span>
                </a>
              )}

              <button
                type="button"
                onClick={() => handleCopyCitation("apa")}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                {copiedCitationKey === "apa" ? (
                  <>
                    <Check size={14} className="text-emerald-500" />
                    <span className="text-emerald-500 font-bold">{t("articles.copiedCode", { defaultValue: "Copied!" })}</span>
                  </>
                ) : (
                  <>
                    <Quote size={14} className="text-amber-500" />
                    <span>{t("articles.copyCitation", { defaultValue: "Cite (APA)" })}</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-base font-medium leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg pt-2">
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

          {/* Scientific Citation Card */}
          {article.citations && (
            <div className="mt-10 rounded-2xl border border-blue-200/80 bg-blue-50/50 p-6 dark:border-blue-900/40 dark:bg-blue-950/20">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <Quote size={18} className="text-blue-600 dark:text-blue-400" />
                  <h4 className="font-display text-base font-bold text-slate-900 dark:text-slate-100">
                    {t("articles.citationTitle", { defaultValue: "Iqtibos Keltirish Andozasi (Citation)" })}
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopyCitation("apa")}
                    className="inline-flex items-center gap-1 rounded-lg bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-200"
                  >
                    {copiedCitationKey === "apa" ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                    <span>APA</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCopyCitation("bibtex")}
                    className="inline-flex items-center gap-1 rounded-lg bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-200"
                  >
                    {copiedCitationKey === "bibtex" ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                    <span>BibTeX</span>
                  </button>
                </div>
              </div>
              <p className="font-mono text-xs leading-relaxed text-slate-700 dark:text-slate-300 bg-white/70 dark:bg-slate-900/70 p-3.5 rounded-xl border border-blue-200/50 dark:border-blue-900/30">
                {article.citations.apa}
              </p>
              
              {/* ORCID Researcher Identifier Row */}
              <div className="mt-3 pt-3 border-t border-blue-200/40 dark:border-blue-900/30 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                <span>Muallif / Tadqiqotchi ORCID:</span>
                <a
                  href="https://orcid.org/0009-0000-8225-5370"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
                >
                  <span className="font-bold">iD</span>
                  <span>0009-0000-8225-5370</span>
                  <ExternalLink size={11} />
                </a>
              </div>
            </div>
          )}

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
