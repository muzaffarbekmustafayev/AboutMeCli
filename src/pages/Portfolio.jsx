import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { projects } from "../data/projects";
import { Github, ExternalLink, Code2, X, Download, Search, Filter } from "lucide-react";
import SEO from "../components/SEO";

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
    <section className="min-h-screen pt-28 pb-24 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-[#0b1120] dark:to-[#0f172a] transition-colors duration-500">
      <SEO 
        title={t("portfolio.pageTitle")}
        description={t("portfolio.pageSubtitle")}
        path="/portfolio"
      />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              {t("portfolio.pageTitle")}
            </span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            {t("portfolio.pageSubtitle")}
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={t("portfolio.search", { defaultValue: "Search projects..." })}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={selectedTech}
              onChange={(e) => setSelectedTech(e.target.value)}
              className="pl-12 pr-8 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer min-w-[200px]"
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
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => {
            const projectTitle = t(`portfolio.items.${project.id}.title`, {
              defaultValue: project.title,
            });
            const projectDescription = t(`portfolio.items.${project.id}.description`, {
              defaultValue: project.description,
            });
            const projectFeatures = t(`portfolio.items.${project.id}.features`, {
              returnObjects: true,
              defaultValue: project.features,
            });

            return (
              <div
                key={project.id}
                className="group relative flex flex-col rounded-3xl overflow-hidden bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={project.images?.[0]}
                    alt={projectTitle}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>

                <div className="p-8 flex flex-col flex-grow relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <Code2 size={16} className="text-blue-500" />
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {t("portfolio.projectLabel")}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {projectTitle}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed line-clamp-3">
                    {projectDescription}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies?.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
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

                  <div className="mt-auto flex flex-wrap gap-3">
                    {project.links?.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:scale-105 transition-transform text-sm font-semibold"
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
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:scale-105 transition-transform text-sm font-semibold"
                      >
                        <ExternalLink size={16} />
                        {t("portfolio.liveDemo")}
                      </a>
                    )}

                    {project.links?.zip && (
                      <a
                        href={project.links.zip}
                        download
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-semibold"
                      >
                        <Download size={16} />
                        {t("portfolio.downloadZip")}
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => setActiveProject(project)}
                    className="mt-4 text-blue-600 dark:text-blue-400 font-semibold hover:underline text-sm"
                  >
                    {t("portfolio.details")} →
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl">
            <button
              onClick={() => setActiveProject(null)}
              className="sticky top-4 float-right mr-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="p-8">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
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
                    className="px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium"
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
                    className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white hover:scale-105 transition-transform font-semibold"
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
