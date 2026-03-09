import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { projects } from "../data/projects";
import { Github, ExternalLink, Code2, X, Download, Search, Filter, Sparkles, FolderKanban, CheckCircle2 } from "lucide-react";
import SEO from "../components/SEO";

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
        className={`h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105 ${
          isImageLoading ? "opacity-0" : "opacity-100"
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
  );
};

const Portfolio = () => {
  const [activeProject, setActiveProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTech, setSelectedTech] = useState("all");
  const { t } = useTranslation();

  const allTechnologies = useMemo(() => {
    const techs = new Set();
    projects.forEach(p => p.technologies?.forEach(t => techs.add(t)));
    return ["all", ...Array.from(techs)];
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const title = t(`portfolio.items.${project.id}.title`, { defaultValue: project.title });
      const description = t(`portfolio.items.${project.id}.description`, { defaultValue: project.description });
      
      const matchesSearch = searchTerm === "" || 
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTech = selectedTech === "all" || 
        project.technologies?.includes(selectedTech);
      
      return matchesSearch && matchesTech;
    });
  }, [searchTerm, selectedTech, t]);

  return (
    <>
      <SEO 
        title={t("portfolio.pageTitle")}
        description={t("portfolio.pageSubtitle")}
        path="/portfolio"
      />

      <section className="section-shell min-h-screen px-4 pt-28 pb-20 text-slate-700 dark:text-slate-300 sm:px-6 sm:pt-32">
        <div className="mx-auto w-full max-w-7xl">
          
          {/* Header */}
          <header className="mb-16 space-y-4 max-w-3xl">
            <div className="hero-badge">
              <Sparkles size={14} />
              {t("portfolio.projectLabel")}
            </div>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl lg:text-6xl">
              {t("portfolio.pageTitle")}
            </h1>
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              {t("portfolio.pageSubtitle")}
            </p>
          </header>

          {/* Controls */}
          <div className="mb-12 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder={t("portfolio.search")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-full border border-slate-100 bg-white py-3.5 pl-12 pr-6 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-200 shadow-sm"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <select
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
                className="w-full min-w-[220px] cursor-pointer appearance-none rounded-full border border-slate-100 bg-white py-3.5 pl-12 pr-10 text-sm outline-none focus:border-blue-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-200 shadow-sm"
              >
                {allTechnologies.map(tech => (
                  <option key={tech} value={tech}>
                    {tech === "all" ? t("portfolio.allTech") : tech}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-10 flex items-center gap-3">
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400">
              <FolderKanban size={20} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 leading-none mb-1">Portfolio</p>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {t("portfolio.showing")} {filteredProjects.length} {t("portfolio.projects")}
              </p>
            </div>
          </div>

          {/* Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => {
              const projectTitle = t(`portfolio.items.${project.id}.title`, { defaultValue: project.title });
              const projectDescription = t(`portfolio.items.${project.id}.description`, { defaultValue: project.description });

              return (
                <article
                  key={project.id}
                  className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-slate-100 bg-white transition-all hover:border-blue-200 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900/40"
                >
                  <ProjectImage
                    src={project.images?.[0]}
                    alt={projectTitle}
                    loadingLabel={t("ui.loading")}
                  />

                  <div className="flex flex-1 flex-col p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.1)]" />
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                        {t("portfolio.projectLabel")}
                      </span>
                    </div>

                    <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
                      {projectTitle}
                    </h3>

                    <p className="mb-8 line-clamp-3 text-base leading-relaxed text-slate-500 dark:text-slate-400">
                      {projectDescription}
                    </p>

                    <div className="mb-8 flex flex-wrap gap-2">
                      {project.technologies?.slice(0, 3).map((tech, idx) => (
                        <span
                          key={idx}
                          className="rounded-xl bg-slate-50 px-4 py-1.5 text-xs font-bold text-slate-500 dark:bg-slate-800/50 dark:text-slate-400"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies?.length > 3 && (
                        <span className="rounded-xl bg-blue-50 px-4 py-1.5 text-xs font-bold text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-50 dark:border-slate-800/50">
                      <button
                        onClick={() => setActiveProject(project)}
                        className="text-sm font-bold uppercase tracking-wider text-blue-600 hover:text-blue-700 dark:text-blue-400"
                      >
                        {t("portfolio.details")}
                      </button>
                      
                      <div className="flex gap-5 text-slate-400">
                        {project.links?.github && (
                          <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                            <Github size={22} />
                          </a>
                        )}
                        {project.links?.live && (
                          <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                            <ExternalLink size={22} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {filteredProjects.length === 0 && (
            <div className="py-24 text-center">
              <p className="text-xl text-slate-400">{t("portfolio.noResults")}</p>
            </div>
          )}
        </div>

        {/* Modal */}
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
            <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-2xl dark:border-slate-800 dark:bg-slate-900 sm:p-12">
              <button
                onClick={() => setActiveProject(null)}
                className="absolute right-8 top-8 rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <X size={28} />
              </button>

              <div className="space-y-10">
                <header>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                    <span className="text-xs font-bold uppercase tracking-widest text-blue-500">Project Details</span>
                  </div>
                  <h2 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {t(`portfolio.items.${activeProject.id}.title`, { defaultValue: activeProject.title })}
                  </h2>
                </header>

                <div className="aspect-video overflow-hidden rounded-3xl bg-slate-100 dark:bg-slate-800 shadow-inner">
                  <img src={activeProject.images?.[0]} alt="" className="h-full w-full object-cover" />
                </div>

                <div className="space-y-8">
                  <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                    {t(`portfolio.items.${activeProject.id}.description`, { defaultValue: activeProject.description })}
                  </p>

                  <div className="space-y-5">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                      {t("portfolio.features")}
                    </h3>
                    <ul className="grid gap-4 text-base text-slate-600 dark:text-slate-400 sm:grid-cols-2">
                      {(t(`portfolio.items.${activeProject.id}.features`, {
                        returnObjects: true,
                        defaultValue: activeProject.features,
                      }) || []).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 size={20} className="mt-1 text-blue-500 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-5">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                      {t("portfolio.technologies")}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {activeProject.technologies?.map((tech, idx) => (
                        <span key={idx} className="control-surface rounded-full px-5 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-10 border-t border-slate-50 dark:border-slate-800">
                  {activeProject.links?.github && (
                    <a href={activeProject.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl bg-slate-900 px-8 py-4 text-base font-bold text-white transition-transform hover:scale-105 dark:bg-white dark:text-slate-900 shadow-xl shadow-slate-900/20">
                      <Github size={22} />
                      {t("portfolio.github")}
                    </a>
                  )}
                  {activeProject.links?.live && (
                    <a href={activeProject.links.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl bg-blue-600 px-8 py-4 text-base font-bold text-white transition-transform hover:scale-105 shadow-xl shadow-blue-600/20">
                      <ExternalLink size={22} />
                      {t("portfolio.liveDemo")}
                    </a>
                  )}
                  {activeProject.links?.zip && (
                    <a href={activeProject.links.zip} download className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-8 py-4 text-base font-bold text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 shadow-sm">
                      <Download size={22} />
                      {t("portfolio.downloadZip")}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Portfolio;
