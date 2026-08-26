import React, { memo } from "react";

const StatCard = ({ icon, value, label }) => (
  <div className="group flex flex-col items-center justify-center p-6 text-center transition-all hover:scale-105">
    <div className="mb-4 inline-flex rounded-2xl bg-blue-500/10 p-4 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-500/20 dark:text-blue-400">
      {icon}
    </div>
    <div className="font-display text-3xl font-black text-slate-900 dark:text-slate-100">{value}</div>
    <div className="mt-2 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">{label}</div>
  </div>
);

export default memo(StatCard);
