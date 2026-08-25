import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { projects } from "../data/projects";
import { Search, Filter, Sparkles, FolderKanban } from "lucide-react";
import SEO from "../components/SEO";
import PortfolioProjectCard from "../components/PortfolioProjectCard";
import PortfolioModal from "../components/PortfolioModal";

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
      const title = t(`portfolio.items.${project.i18nKey ?? project.id}.title`, { defaultValue: project.title });
      const description = t(`portfolio.items.${project.i18nKey ?? project.id}.description`, { defaultValue: project.description });
      
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

      <section className="section-shell min-h-screen px-4 pb-20 pt-28 text-slate-700 dark:text-slate-300 sm:px-6 sm:pt-32">
        <div className="mx-auto w-full max-w-7xl">
          
          {/* Header */}
          <header className="mb-12 max-w-3xl space-y-4 sm:mb-16">
            <div className="hero-badge">
              <Sparkles size={14} />
              {t("portfolio.projectLabel")}
            </div>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl lg:text-6xl">
              {t("portfolio.pageTitle")}
            </h1>
            <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
              {t("portfolio.pageSubtitle")}
            </p>
          </header>

          {/* Controls */}
          <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder={t("portfolio.search")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control w-full rounded-2xl py-3 pl-12 pr-6 text-sm"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <select
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
                className="form-control w-full cursor-pointer appearance-none rounded-2xl py-3 pl-12 pr-10 text-sm sm:min-w-[220px]"
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
          <div className="mb-8 flex items-center gap-3 sm:mb-10">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-400 dark:bg-slate-800">
              <FolderKanban size={20} />
            </div>
            <div>
              <p className="mb-1 text-[10px] font-bold uppercase leading-none tracking-widest text-slate-400">Portfolio</p>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {t("portfolio.showing")} {filteredProjects.length} {t("portfolio.projects")}
              </p>
            </div>
          </div>

          {/* Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
            {filteredProjects.map((project) => (
              <PortfolioProjectCard 
                key={project.id} 
                project={project} 
                t={t} 
                onClick={setActiveProject} 
              />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="py-20 text-center sm:py-24">
              <p className="text-lg text-slate-400 sm:text-xl">{t("portfolio.noResults")}</p>
            </div>
          )}
        </div>

        <PortfolioModal 
          project={activeProject} 
          onClose={() => setActiveProject(null)} 
          t={t} 
        />
      </section>
    </>
  );
};

export default Portfolio;
