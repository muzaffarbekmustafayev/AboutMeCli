import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { projects } from "../data/projects";
import { Github, ExternalLink, Code2, X, Download, Search, Filter } from "lucide-react";
import SEO from "../components/SEO";

const ProjectImage = ({ src, alt, loadingLabel }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleImageReady = () => {
    setIsImageLoading(false);
  };

  return (
    <div className="relative h-60 overflow-hidden bg-slate-100 dark:bg-slate-900" aria-busy={isImageLoading}>
      {isImageLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-200/70 dark:bg-slate-800/70">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-teal-500/80 border-t-transparent" />
          <span className="sr-only">{loadingLabel}</span>
        </div>
      )}

      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={handleImageReady}
        onError={handleImageReady}
        className={`h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110 ${
          isImageLoading ? "opacity-0" : "opacity-100"
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
    </div>
  );
};

const Portfolio = () => {
  const [activeProject, setActiveProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTech, setSelectedTech] = useState("all");
  const { t } = useTranslation();

  // Get all unique technologies
  const allTechnologies = useMemo(() => {
    const techs = new Set();
    projects.forEach(p => p.technologies?.forEach(t => techs.add(t)));
    return ["all", ...Array.from(techs)];
  }, []);

  // Filter projects
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
    <section className="section-shell min-h-screen px-4 pt-24 pb-16 transition-colors duration-500 sm:pt-28 sm:pb-24">
      <SEO 
        title={t("portfolio.pageTitle")}
        description={t("portfolio.pageSubtitle")}
        path="/portfolio"
      />

      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center sm:mb-12">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
            <span className="font-display brand-gradient">
              {t("portfolio.pageTitle")}
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 dark:text-gray-400 sm:mt-6 sm:text-lg">
            {t("portfolio.pageSubtitle")}
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={t("portfolio.search", { defaultValue: "Search projects..." })}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl glass-card focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>
          
          <div className="relative w-full sm:w-auto">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={selectedTech}
              onChange={(e) => setSelectedTech(e.target.value)}
              className="w-full min-w-0 cursor-pointer appearance-none rounded-xl glass-card py-3 pl-12 pr-8 outline-none focus:ring-2 focus:ring-teal-500 sm:min-w-[220px]"
            >
              {allTechnologies.map(tech => (
                <option key={tech} value={tech}>
                  {tech === "all" ? t("portfolio.allTech", { defaultValue: "All Technologies" }) : tech}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
          {t("portfolio.showing", { defaultValue: "Showing" })} {filteredProjects.length} {t("portfolio.projects", { defaultValue: "projects" })}
        </p>

        {/* Projects Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {filteredProjects.map((project) => {
            const projectTitle = t(`portfolio.items.${project.id}.title`, {
              defaultValue: project.title,
            });
            const projectDescription = t(`portfolio.items.${project.id}.description`, {
              defaultValue: project.description,
            });

            return (
              <div
                key={project.id}
                className="group glass-card relative flex flex-col rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal-500/20"
              >
                <ProjectImage
                  src={project.images?.[0]}
                  alt={projectTitle}
                  loadingLabel={t("ui.loading", { defaultValue: "Loading..." })}
                />

                <div className="relative z-10 flex flex-grow flex-col p-5 sm:p-6 lg:p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <Code2 size={16} className="text-teal-500" />
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {t("portfolio.projectLabel")}
                    </span>
                  </div>

                  <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
                    {projectTitle}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed line-clamp-3">
                    {projectDescription}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies?.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies?.length > 4 && (
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="mt-auto flex flex-wrap gap-2 sm:gap-3">
                    {project.links?.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-105 dark:bg-white dark:text-gray-900"
                      >
                        <Github size={16} />
                        {t("portfolio.github")}
                      </a>
                    )}

                    {project.links?.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-105"
                      >
                        <ExternalLink size={16} />
                        {t("portfolio.liveDemo")}
                      </a>
                    )}

                    {project.links?.zip && (
                      <a
                        href={project.links.zip}
                        download
                        className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold transition-colors hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800"
                      >
                        <Download size={16} />
                        {t("portfolio.downloadZip")}
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => setActiveProject(project)}
                    className="mt-4 text-teal-600 dark:text-teal-400 font-semibold hover:underline text-sm"
                  >
                    {t("portfolio.details")} {"->"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {t("portfolio.noResults", { defaultValue: "No projects found" })}
            </p>
          </div>
        )}
      </div>

      {/* Project Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-2 backdrop-blur-sm sm:items-center sm:p-4">
          <div className="glass-card relative max-h-[92dvh] w-full overflow-y-auto rounded-t-2xl shadow-2xl sm:max-w-4xl sm:rounded-2xl">
            <button
              onClick={() => setActiveProject(null)}
              className="sticky top-3 float-right mr-3 rounded-full bg-gray-200 p-2 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 sm:top-4 sm:mr-4"
            >
              <X size={20} />
            </button>

            <div className="p-5 pt-12 sm:p-8 sm:pt-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                {t(`portfolio.items.${activeProject.id}.title`, { defaultValue: activeProject.title })}
              </h2>

              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t(`portfolio.items.${activeProject.id}.description`, { defaultValue: activeProject.description })}
              </p>

              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                {t("portfolio.features", { defaultValue: "Features" })}
              </h3>
              <ul className="list-disc list-inside mb-6 space-y-2 text-gray-600 dark:text-gray-300">
                {(t(`portfolio.items.${activeProject.id}.features`, {
                  returnObjects: true,
                  defaultValue: activeProject.features,
                }) || []).map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                {t("portfolio.technologies", { defaultValue: "Technologies" })}
              </h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {activeProject.technologies?.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                {activeProject.links?.github && (
                  <a
                    href={activeProject.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:scale-105 transition-transform font-semibold"
                  >
                    <Github size={20} />
                    {t("portfolio.github")}
                  </a>
                )}

                {activeProject.links?.live && (
                  <a
                    href={activeProject.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-lg bg-teal-600 text-white hover:scale-105 transition-transform font-semibold"
                  >
                    <ExternalLink size={20} />
                    {t("portfolio.liveDemo")}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;

