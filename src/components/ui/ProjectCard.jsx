import React, { memo } from "react";
import { ExternalLink } from "lucide-react";

const ProjectCard = ({ title, desc, label, link, className = "" }) => (
  <div className={`group glass-card rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 ${className}`}>
    <div className="flex items-start justify-between gap-4 mb-3">
      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {title}
      </h3>
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-500 transition-colors">
          <ExternalLink size={18} />
        </a>
      ) : (
        <ExternalLink size={18} className="text-slate-300 dark:text-slate-600 group-hover:text-blue-500 transition-colors" />
      )}
    </div>
    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{desc}</p>
    <div className="mt-5 inline-flex rounded-full bg-blue-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 border border-blue-500/20">
      {label}
    </div>
  </div>
);

export default memo(ProjectCard);
