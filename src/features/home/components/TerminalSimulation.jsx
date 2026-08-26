import React, { useState, useEffect, useMemo, memo } from "react";
import { useTranslation } from "react-i18next";
import { projects } from "../../../data/projects";
import { SKILLS } from "../../../data/skillsData";

function useTerminalTyping(lines) {
  const [displayed, setDisplayed] = useState([]);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    // If finished all lines, wait 4 seconds and restart loop
    if (lineIdx >= lines.length) {
      const resetTimeout = setTimeout(() => {
        setDisplayed([]);
        setLineIdx(0);
        setCharIdx(0);
      }, 4000);
      return () => clearTimeout(resetTimeout);
    }

    const currentItem = lines[lineIdx];
    const currentText = currentItem.text;

    if (charIdx < currentText.length) {
      const t = setTimeout(() => {
        setCharIdx((c) => c + 1);
      }, 22);
      return () => clearTimeout(t);
    }

    const nextLineTimeout = setTimeout(() => {
      setDisplayed((d) => [...d, currentItem]);
      setLineIdx((l) => l + 1);
      setCharIdx(0);
    }, 280);

    return () => clearTimeout(nextLineTimeout);
  }, [lineIdx, charIdx, lines]);

  const currentLineItem = lineIdx < lines.length ? lines[lineIdx] : null;
  const currentPartial = currentLineItem ? currentLineItem.text.slice(0, charIdx) : null;

  return { displayed, currentLineItem, currentPartial };
}

const TerminalSimulation = () => {
  const { t } = useTranslation();

  const TERMINAL_LINES = useMemo(() => [
    { prefix: "❯", text: t("home.terminal.npmRunDev", { defaultValue: "npm run dev" }), tone: "text-blue-400 font-bold", icon: null },
    { prefix: "⚡", text: t("home.terminal.compiling", { defaultValue: "compiling src..." }), tone: "text-amber-300 font-medium", icon: null },
    { prefix: "📦", text: `${projects.length} ${t("home.terminal.projectsLoaded", { defaultValue: "projects loaded" })}`, tone: "text-sky-300 font-semibold", icon: null },
    { prefix: "✨", text: `${SKILLS.length} ${t("home.terminal.skillsIndexed", { defaultValue: "skills indexed" })}`, tone: "text-indigo-300 font-semibold", icon: null },
    { prefix: "✓", text: t("home.terminal.ready", { defaultValue: "ready on localhost:5173" }), tone: "text-emerald-400 font-bold shadow-[0_0_12px_rgba(52,211,153,0.3)]", icon: null },
  ], [t]);

  const { displayed: termLines, currentLineItem, currentPartial } = useTerminalTyping(TERMINAL_LINES);

  return (
    <div className="mt-2.5 relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/95 p-4 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/90">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      {/* Terminal Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5 mb-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500/90 shadow-[0_0_6px_rgba(244,63,94,0.4)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/90 shadow-[0_0_6px_rgba(245,158,11,0.4)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/90 shadow-[0_0_6px_rgba(16,185,129,0.4)]" />
        </div>
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400">
          bash · {t("home.liveBuild", { defaultValue: "Live build" }).toLowerCase()}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)] animate-pulse" />
          <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-400">LIVE</span>
        </span>
      </div>

      {/* Terminal Output */}
      <div className="font-mono text-xs leading-relaxed space-y-1 min-h-[120px]" aria-live="polite">
        {termLines.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2 animate-fadeIn transition-all duration-300"
          >
            <span className="text-slate-500 select-none text-[11px] w-4 text-center">
              {item.prefix}
            </span>
            <span className={item.tone}>
              {item.text}
            </span>
          </div>
        ))}

        {/* Actively typing line */}
        {currentPartial !== null && currentLineItem && (
          <div className="flex items-center gap-2">
            <span className="text-slate-500 select-none text-[11px] w-4 text-center">
              {currentLineItem.prefix}
            </span>
            <span className={currentLineItem.tone}>
              {currentPartial}
              <span className="inline-block w-2 h-3.5 ml-0.5 bg-blue-400 align-middle animate-pulse" />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(TerminalSimulation);
