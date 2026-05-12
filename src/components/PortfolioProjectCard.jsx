import React, { useState } from "react";
import { Github, ExternalLink } from "lucide-react";

const ProjectImage = ({ src, alt, loadingLabel }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  return (
    <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-900" aria-busy={isImageLoading}>
      {isImageLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-50 dark:bg-slate-800/50">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-blue-500/80 border-t-transparent" />
          <span className="sr-only">{loadingLabel}</span>
        </div>
      )}

      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsImageLoading(false)}
        onError={() => setIsImageLoading(false)}
        className={`h-full w-full object-cover transition duration-700 ease-out group-hover:brightness-105 ${
          isImageLoading ? "opacity-0" : "opacity-100"
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
  );
};

const PortfolioProjectCard = ({ project, onClick, t }) => {
  const projectTitle = t(`portfolio.items.${project.i18nKey ?? project.id}.title`, { defaultValue: project.title });
  const projectDescription = t(`portfolio.items.${project.i18nKey ?? project.id}.description`, { defaultValue: project.description });

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-slate-100 bg-white transition-all duration-250 hover:-translate-y-1 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-500/10 dark:border-slate-800 dark:bg-slate-900/40">
      <ProjectImage
        src={project.images?.[0]}
        alt={projectTitle}
        loadingLabel={t("ui.loading", "Loading")}
      />

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="mb-3 flex items-center gap-2 sm:mb-4">
          <div className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.1)]" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 sm:text-xs">
            {t("portfolio.projectLabel")}
          </span>
        </div>

        <h3 className="mb-2 text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-slate-100 sm:mb-3 sm:text-xl">
          {projectTitle}
        </h3>

        <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:mb-8 sm:text-base">
          {projectDescription}
        </p>

        <div className="mb-6 flex flex-wrap gap-2 sm:mb-8">
          {project.technologies?.slice(0, 3).map((tech, idx) => (
            <span
              key={idx}
              className="rounded-xl bg-slate-50 px-3 py-1 text-[11px] font-bold text-slate-500 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-50 hover:text-blue-600 dark:bg-slate-800/50 dark:text-slate-400 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 sm:px-4 sm:py-1.5 sm:text-xs cursor-default"
            >
              {tech}
            </span>
          ))}
          {project.technologies?.length > 3 && (
            <span className="rounded-xl bg-blue-50 px-3 py-1 text-[11px] font-bold text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 sm:px-4 sm:py-1.5 sm:text-xs">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-slate-50 pt-5 dark:border-slate-800/50 sm:pt-6">
          <button
            onClick={() => onClick(project)}
            className="group/btn flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-blue-600 transition-all duration-200 hover:gap-2 hover:text-blue-700 dark:text-blue-400 sm:text-sm"
          >
            {t("portfolio.details")}
            <ExternalLink size={13} className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </button>

          <div className="flex gap-4 text-slate-400 sm:gap-5">
            {project.links?.github && (
              <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="transition-all duration-200 hover:-translate-y-0.5 hover:text-slate-900 dark:hover:text-white">
                <Github size={20} className="sm:size-[22px]" />
              </a>
            )}
            {project.links?.live && (
              <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="transition-all duration-200 hover:-translate-y-0.5 hover:text-blue-600">
                <ExternalLink size={20} className="sm:size-[22px]" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default PortfolioProjectCard;
