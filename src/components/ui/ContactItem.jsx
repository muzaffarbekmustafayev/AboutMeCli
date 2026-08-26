import React, { memo } from "react";

const ContactItem = ({ icon, label, value, href }) => (
  <div className="group space-y-1">
    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</p>
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="flex items-center gap-3 text-sm sm:text-base font-semibold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400 break-all">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 transition-all duration-200 group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-500/20 dark:text-blue-400">
        {icon}
      </div>
      <span>{value}</span>
    </a>
  </div>
);

export default memo(ContactItem);
