import React from 'react';
import { useTranslation } from 'react-i18next';

const LoadingSpinner = () => {
  const { t } = useTranslation();
  
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-6">
      <div className="glass-card relative flex flex-col items-center justify-center rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
        {/* Ambient Glow */}
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-cyan-500/20 blur-xl opacity-70 animate-pulse" />
        
        {/* Dual Ring Spinner */}
        <div className="relative h-16 w-16">
          {/* Outer track */}
          <div className="absolute inset-0 rounded-full border-2 border-slate-200/50 dark:border-slate-800/80" />
          
          {/* Outer glowing spinning arc */}
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-blue-600 border-r-indigo-500 dark:border-t-blue-400 dark:border-r-indigo-400" />
          
          {/* Inner reverse spinning arc */}
          <div className="absolute inset-2 animate-spin rounded-full border-2 border-transparent border-b-cyan-500 border-l-blue-500 [animation-direction:reverse] [animation-duration:1.5s]" />
          
          {/* Center glowing dot / emblem */}
          <div className="absolute inset-0 m-auto h-3 w-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
        </div>

        <p className="mt-5 font-display text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 animate-pulse">
          {t("ui.loading", { defaultValue: "Yuklanmoqda..." })}
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
