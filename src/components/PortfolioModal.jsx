import React, { useEffect, useState } from "react";
import { X, Github, ExternalLink, Download, CheckCircle2, Sparkles } from "lucide-react";

const PortfolioModal = ({ project, onClose, t }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [project, onClose]);

  const handleDownloadZip = async (url, filename) => {
    try {
      setIsDownloading(true);
      const response = await fetch(url);
      const blob = await response.blob();
      const objectUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = filename || "project.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(objectUrl);
    } catch (error) {
      console.error("Failed to download zip", error);
    } finally {
      setIsDownloading(false);
    }
  };

  if (!project) return null;

  const projectTitle = t(`portfolio.items.${project.i18nKey ?? project.id}.title`, { defaultValue: project.title });
  const projectDescription = t(`portfolio.items.${project.i18nKey ?? project.id}.description`, { defaultValue: project.description });
  const features = t(`portfolio.items.${project.i18nKey ?? project.id}.features`, {
    returnObjects: true,
    defaultValue: project.features || [],
  }) || [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 lg:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={projectTitle}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label={t("portfolio.close", { defaultValue: "Close" })}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Container - Native Fullscreen / Bottom-sheet on mobile */}
      <div className="relative flex h-[92dvh] sm:h-auto sm:max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl sm:rounded-3xl border-t sm:border border-slate-200/90 bg-white shadow-2xl backdrop-blur-2xl dark:border-slate-800/90 dark:bg-slate-950">
        
        {/* Mobile Pull Indicator Pill */}
        <div className="sm:hidden flex justify-center pt-2.5 pb-1 bg-white/95 dark:bg-slate-950/95">
          <div className="h-1.5 w-12 rounded-full bg-slate-300 dark:bg-slate-700" />
        </div>

        {/* Sticky Top Navigation Bar */}
        <div className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 py-3 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/95 sm:px-6">
          <div className="flex items-center gap-2 truncate pr-3">
            <span className="inline-flex items-center gap-1 rounded-full border border-blue-500/30 bg-blue-50 px-2.5 py-0.5 text-[11px] font-bold text-blue-700 dark:border-blue-400/20 dark:bg-blue-900/30 dark:text-blue-300 shrink-0">
              <Sparkles size={11} />
              {t("portfolio.projectLabel", { defaultValue: "Project" })}
            </span>
            <span className="truncate text-sm font-bold text-slate-800 dark:text-slate-200">
              {projectTitle}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200/80 bg-slate-100/80 text-slate-600 transition-all hover:bg-slate-200 active:scale-95 dark:border-slate-700/80 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:bg-slate-700"
            aria-label={t("portfolio.close", { defaultValue: "Close" })}
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="overflow-y-auto p-5 sm:p-8 lg:p-10 space-y-6 sm:space-y-8">
          <header>
            <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl lg:text-4xl">
              {projectTitle}
            </h2>
          </header>

          {/* Project Preview Image */}
          {project.images?.[0] && (
            <div className="aspect-video overflow-hidden rounded-2xl bg-slate-100 shadow-inner dark:bg-slate-900 sm:rounded-3xl border border-slate-200/60 dark:border-slate-800">
              <img
                src={project.images[0]}
                alt={projectTitle}
                loading="eager"
                className="h-full w-full object-cover"
              />
            </div>
          )}

          {/* Description */}
          <div className="space-y-6">
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base sm:leading-relaxed">
              {projectDescription}
            </p>

            {/* Features list */}
            {features.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 sm:text-sm">
                  {t("portfolio.features", { defaultValue: "Features" })}
                </h3>
                <ul className="grid gap-2.5 text-sm text-slate-700 dark:text-slate-300 sm:grid-cols-2 sm:gap-3">
                  {features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-blue-500" />
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack Pills */}
            {project.technologies?.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 sm:text-sm">
                  {t("portfolio.technologies", { defaultValue: "Technologies" })}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="rounded-xl border border-slate-200/80 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-100 dark:border-slate-800/80">
            {project.links?.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[46px] items-center justify-center gap-2.5 rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-slate-900/10 transition-all hover:-translate-y-0.5 active:scale-95 dark:bg-white dark:text-slate-900 sm:flex-1"
              >
                <Github size={18} />
                <span>{t("portfolio.github", { defaultValue: "GitHub" })}</span>
              </a>
            )}
            {project.links?.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[46px] items-center justify-center gap-2.5 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5 active:scale-95 sm:flex-1"
              >
                <ExternalLink size={18} />
                <span>{t("portfolio.liveDemo", { defaultValue: "Live Demo" })}</span>
              </a>
            )}
            {project.links?.zip && (
              <button
                type="button"
                onClick={() => handleDownloadZip(project.links.zip, `${project.id}.zip`)}
                disabled={isDownloading}
                className="flex min-h-[46px] items-center justify-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-6 py-3 text-sm font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-100 active:scale-95 disabled:opacity-70 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 sm:flex-1"
              >
                {isDownloading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-400 border-t-transparent" />
                ) : (
                  <Download size={18} />
                )}
                <span>
                  {isDownloading
                    ? t("portfolio.downloading", { defaultValue: "Downloading..." })
                    : t("portfolio.downloadZip", { defaultValue: "Download ZIP" })}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioModal;
