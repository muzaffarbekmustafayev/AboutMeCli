import React, { memo } from "react";

const SectionHeader = ({ icon, title }) => (
  <div className="flex items-center gap-4 border-b border-slate-200/60 pb-3.5 dark:border-slate-800">
    <div className="text-blue-600 dark:text-blue-400">{icon}</div>
    <h2 className="text-base sm:text-lg font-extrabold uppercase tracking-widest text-slate-900 dark:text-slate-100">{title}</h2>
  </div>
);

export default memo(SectionHeader);
