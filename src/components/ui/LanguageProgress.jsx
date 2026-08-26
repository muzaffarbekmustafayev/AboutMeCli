import React, { useEffect, useRef, useState } from "react";

const LanguageProgress = ({ label, value }) => {
  const [width, setWidth] = useState("0%");
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWidth(value);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div className="space-y-2.5" ref={ref}>
      <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
        <span className="text-slate-600 dark:text-slate-300">{label}</span>
        <span className="text-blue-600 dark:text-blue-400 font-mono">{value}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200/60 dark:bg-slate-800 shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-[width] duration-1000 ease-out"
          style={{ width }}
        />
      </div>
    </div>
  );
};

export default LanguageProgress;
