import React, { useState } from "react";
import { projects } from "../data/projects";
import {
  Github,
  ExternalLink,
  Image as ImageIcon,
  Code2,
  X,
  Download
} from "lucide-react";

const Portfolio = () => {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <section className="min-h-screen pt-28 pb-24 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-[#0b1120] dark:to-[#0f172a] transition-colors duration-500">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-4">
          <h1 className="text-xl sm:text-5xl font-extrabold tracking-tight">
            <span className="text-gray-900 dark:text-white">
              Mening{" "}
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Loyihalarim
            </span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            G‘oyadan amalga oshirilgan real loyihalar va amaliy texnologiyalar
          </p>
        </div>

        {/* GRID */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="
              group relative flex flex-col
              rounded-3xl overflow-hidden
              bg-white/70 dark:bg-white/5
              backdrop-blur-xl
              border border-white/20 dark:border-white/10
              shadow-lg hover:shadow-2xl
              hover:shadow-blue-500/20
              transition-all duration-500
              hover:-translate-y-2
              "
            >
              {/* IMAGE */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={project.images?.[0]}
                  alt={project.title}
                  className="w-full h-full object-cover
                  group-hover:scale-110
                  transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t 
                  from-black/60 via-black/20 to-transparent" />
              </div>

              {/* CONTENT */}
              <div className="p-8 flex flex-col flex-grow relative z-10">

                <div className="flex items-center gap-2 mb-3">
                  <Code2 size={16} className="text-blue-500" />
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Project
                  </span>
                </div>

                <h3 className="text-2xl font-bold mb-4 dark:text-white">
                  {project.title}
                </h3>

                {/* TECHNOLOGIES */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="
                      px-3 py-1 text-xs font-medium
                      rounded-full
                      bg-blue-100 text-blue-600
                      dark:bg-blue-900/30 dark:text-blue-400
                      "
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
                  {project.description}
                </p>

                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-8">
                  {project.features.slice(0, 3).map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* FOOTER */}
                <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-700/50 flex items-center justify-between">

                  <div className="flex gap-5">

                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                        title="GitHub"
                      >
                        <Github size={22} />
                      </a>
                    )}

                    {project.links.zip && (
                      <a
                        href={project.links.zip}
                        download
                        className="text-gray-500 hover:text-green-600 transition-colors"
                        title="Download ZIP"
                      >
                        <Download size={22} />
                      </a>
                    )}

                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-500 hover:text-blue-600 transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink size={22} />
                      </a>
                    )}

                  </div>

                  <button
                    onClick={() => setActiveProject(project)}
                    className="
                    relative flex items-center gap-2
                    px-6 py-3
                    rounded-2xl
                    bg-gradient-to-r from-blue-600 to-cyan-500
                    hover:from-blue-700 hover:to-cyan-600
                    text-white text-sm font-semibold
                    shadow-lg shadow-blue-500/30
                    transition-all duration-300
                    active:scale-95
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
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#0f172a] rounded-3xl max-w-2xl w-full p-8 relative shadow-2xl">

            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-5 right-5 text-gray-500 hover:text-black dark:hover:text-white"
            >
              <X size={22} />
            </button>

            <h2 className="text-3xl font-bold mb-6 dark:text-white">
              {activeProject.title}
            </h2>

            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {activeProject.description}
            </p>

          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
