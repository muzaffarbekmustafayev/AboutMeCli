import React, { memo } from "react";

const SkillSet = ({ title, items }) => (
  <div className="space-y-3">
    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 tracking-wide uppercase">{title}</h4>
    <div className="flex flex-wrap gap-2">
      {items.map(item => (
        <span key={item} className="inline-flex rounded-lg border border-slate-200/80 bg-white/70 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 shadow-sm transition-all duration-200 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 cursor-default">
          {item}
        </span>
      ))}
    </div>
  </div>
);

export default memo(SkillSet);
