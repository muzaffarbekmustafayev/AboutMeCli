import React, { memo } from "react";

const SocialIcon = ({ href, icon }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/80 bg-white text-slate-500 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-600 hover:shadow-md hover:shadow-blue-500/15 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:text-blue-400">
    {icon}
  </a>
);

export default memo(SocialIcon);
