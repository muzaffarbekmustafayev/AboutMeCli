import React, { useState } from "react";
import { projects } from "../data/projects";
import {
  Github,
  ExternalLink,
  Image as ImageIcon,
  Code2
} from "lucide-react";

const Portfolio = () => {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <section className="min-h-screen pt-28 pb-20 px-4 bg-gray-50 dark:bg-[#0b1120] transition-colors duration-500">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-10">
         
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Mening{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Loyihalarim
            </span>
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            G‘oyadan amalga oshirilgan real loyihalar va amaliy texnologiyalar
          </p>
        </div>

        {/* GRID */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="
                group relative flex flex-col
                bg-white dark:bg-gray-800/40
                border border-gray-200 dark:border-gray-700/50
                rounded-[2rem] overflow-hidden
                shadow-sm hover:shadow-2xl hover:shadow-blue-500/10
                transition-all duration-500 hover:-translate-y-3
              "
            >
              {/* IMAGE */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={project.images?.[0]}
                  alt={project.title}
                  className="w-full h-full object-cover
                             group-hover:scale-110 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* TECHNOLOGIES */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="
                        px-3 py-1 text-[10px] font-bold uppercase
                        bg-white/10 backdrop-blur-md
                        border border-white/20 text-white
                        rounded-full
                      "
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-3">
                  <Code2 size={16} className="text-blue-500" />
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Project
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 mb-5 line-clamp-3">
                  {project.description}
                </p>

                {/* FEATURES */}
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
                  {project.features.slice(0, 3).map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* FOOTER */}
                <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-700/50 flex items-center justify-between">
                  <div className="flex gap-4">
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                      >
                        <Github size={22} />
                      </a>
                    )}

                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-500 hover:text-blue-600 transition-colors"
                      >
                        <ExternalLink size={22} />
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => setActiveProject(project)}
                    className="
                      flex items-center gap-2
                      px-5 py-2.5
                      bg-blue-600 hover:bg-blue-700
                      text-white text-sm font-bold
                      rounded-xl
                      shadow-lg shadow-blue-500/20
                      transition-all active:scale-95
                    "
                  >
                    Batafsil
                    <ImageIcon size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </section>
  );
};

export default Portfolio;
