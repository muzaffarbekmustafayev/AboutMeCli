import React, { useState } from "react";
import { X, Github, ExternalLink, Download, CheckCircle2 } from "lucide-react";

const PortfolioModal = ({ project, onClose, t }) => {
  const [isDownloading, setIsDownloading] = useState(false);

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 sm:p-6 backdrop-blur-sm">
      <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 sm:rounded-[2.5rem]">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-white/50 p-2 text-slate-500 backdrop-blur-sm transition-colors hover:bg-slate-100 hover:text-slate-900 dark:bg-slate-900/50 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white sm:right-6 sm:top-6"
        >
          <X size={24} />
        </button>

        <div className="overflow-y-auto p-6 sm:p-10 lg:p-12">
          <div className="space-y-8 sm:space-y-10">
            <header>
              <div className="mb-3 flex items-center gap-3 sm:mb-4">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <span className="text-xs font-bold uppercase tracking-widest text-blue-500">Project Details</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                {t(`portfolio.items.${project.i18nKey ?? project.id}.title`, { defaultValue: project.title })}
              </h2>
            </header>

            <div className="aspect-video overflow-hidden rounded-2xl bg-slate-100 shadow-inner dark:bg-slate-800 sm:rounded-3xl">
              <img src={project.images?.[0]} alt="" className="h-full w-full object-cover" />
            </div>

            <div className="space-y-6 sm:space-y-8">
              <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
                {t(`portfolio.items.${project.i18nKey ?? project.id}.description`, { defaultValue: project.description })}
              </p>

              <div className="space-y-4 sm:space-y-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 sm:text-sm">
                  {t("portfolio.features")}
                </h3>
                <ul className="grid gap-3 text-sm text-slate-600 dark:text-slate-400 sm:grid-cols-2 sm:gap-4 sm:text-base">
                  {(t(`portfolio.items.${project.i18nKey ?? project.id}.features`, {
                    returnObjects: true,
                    defaultValue: project.features,
                  }) || []).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-blue-500 sm:mt-1 sm:size-5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4 sm:space-y-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 sm:text-sm">
                  {t("portfolio.technologies")}
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {project.technologies?.map((tech, idx) => (
                    <span key={idx} className="control-surface rounded-full px-4 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 sm:px-5 sm:py-2 sm:text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-50 pt-8 dark:border-slate-800 sm:flex-row sm:flex-wrap sm:gap-4 sm:pt-10">
              {project.links?.github && (
                <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 rounded-2xl bg-slate-900 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-slate-900/20 transition-all hover:-translate-y-0.5 dark:bg-white dark:text-slate-900 sm:justify-start sm:px-8 sm:py-4 sm:text-base">
                  <Github size={20} className="sm:size-[22px]" />
                  {t("portfolio.github")}
                </a>
              )}
              {project.links?.live && (
                <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-600/20 transition-all hover:-translate-y-0.5 sm:justify-start sm:px-8 sm:py-4 sm:text-base">
                  <ExternalLink size={20} className="sm:size-[22px]" />
                  {t("portfolio.liveDemo")}
                </a>
              )}
              {project.links?.zip && (
                <button
                  onClick={() => handleDownloadZip(project.links.zip, `${project.id}.zip`)}
                  disabled={isDownloading}
                  className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-100 bg-white px-6 py-3.5 text-sm font-bold text-slate-600 shadow-sm transition-colors hover:bg-slate-50 disabled:opacity-70 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 sm:w-auto sm:justify-start sm:px-8 sm:py-4 sm:text-base"
                >
                  {isDownloading ? (
                    <div className="size-5 sm:size-[22px] animate-spin rounded-full border-2 border-slate-400 border-t-transparent" />
                  ) : (
                    <Download size={20} className="sm:size-[22px]" />
                  )}
                  {isDownloading ? t("portfolio.downloading", "Yuklanmoqda...") : t("portfolio.downloadZip")}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioModal;
