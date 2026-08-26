import React, { useEffect, useState, useMemo } from "react";
import { 
  GitBranch, 
  GitCommit, 
  ExternalLink, 
  RefreshCw, 
  Github, 
  FolderGit2, 
  CheckCircle2,
  Calendar,
  Sparkles
} from "lucide-react";
import { useTranslation } from "react-i18next";

const GITHUB_USERNAME = "muzaffarbekmustafayev";
const CONTRIBUTIONS_API = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}`;
const EVENTS_API = `https://api.github.com/users/${GITHUB_USERNAME}/events/public`;

const LEVEL_COLORS_DARK = [
  "bg-slate-900/90 border-slate-800/80", // Level 0 (no activity)
  "bg-blue-950/80 border-blue-900/60", // Level 1 (low activity)
  "bg-blue-700 border-blue-600", // Level 2 (medium activity)
  "bg-blue-500 border-sky-400 shadow-[0_0_6px_rgba(59,130,246,0.5)]", // Level 3 (high activity)
  "bg-sky-400 border-sky-300 shadow-[0_0_10px_rgba(56,189,248,0.8)]" // Level 4 (peak activity)
];

const LEVEL_COLORS_LIGHT = [
  "bg-slate-100 border-slate-200/80", // Level 0
  "bg-blue-100 border-blue-200", // Level 1
  "bg-blue-300 border-blue-400", // Level 2
  "bg-blue-500 border-blue-600 text-white shadow-[0_0_4px_rgba(59,130,246,0.3)]", // Level 3
  "bg-blue-600 border-blue-700 text-white shadow-[0_0_8px_rgba(37,99,235,0.4)]" // Level 4
];

export default function GitHubActivity() {
  const { t, i18n } = useTranslation();
  const [selectedYear, setSelectedYear] = useState("last");
  const [availableYears, setAvailableYears] = useState(["last", "2026", "2025", "2024", "2023"]);
  const [contributionsData, setContributionsData] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tooltip, setTooltip] = useState(null);

  // Fetch Contributions
  const fetchContributions = async (year = "last") => {
    try {
      const cacheKey = `gh_contrib_${year}`;
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached);
        setContributionsData(parsed.contributions);
        setTotalCount(parsed.total || 0);
        return;
      }

      const res = await fetch(`${CONTRIBUTIONS_API}?y=${year}`);
      if (!res.ok) throw new Error("Failed to fetch contributions");
      const data = await res.json();
      
      const contribs = data.contributions || [];
      const total = typeof data.total === "number" ? data.total : data.total?.[year] || contribs.reduce((acc, curr) => acc + curr.count, 0);
      
      setContributionsData(contribs);
      setTotalCount(total);
      sessionStorage.setItem(cacheKey, JSON.stringify({ contributions: contribs, total }));
    } catch (err) {
      console.warn("Contributions fetch error:", err);
    }
  };

  // Fetch Recent Events / Commits
  const fetchEvents = async () => {
    try {
      const res = await fetch(EVENTS_API, {
        headers: { Accept: "application/vnd.github.v3+json" }
      });
      if (!res.ok) throw new Error("Failed to fetch events");
      const data = await res.json();
      const pushEvents = data
        .filter((e) => e.type === "PushEvent" || e.type === "CreateEvent")
        .slice(0, 6);
      setEvents(pushEvents);
    } catch (err) {
      console.warn("Events fetch error:", err);
      // Fallback
      setEvents([
        {
          id: "fb-1",
          repo: { name: "muzaffarbekmustafayev/meet_platform_frontend" },
          payload: {
            ref: "refs/heads/main",
            commits: [{ message: "feat: WebRTC real-time audio/video streaming optimization", sha: "dd519b2" }]
          },
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
        },
        {
          id: "fb-2",
          repo: { name: "muzaffarbekmustafayev/AboutMeCli" },
          payload: {
            ref: "refs/heads/main",
            commits: [{ message: "feat: Real-time GitHub contribution heatmap & activity widget", sha: "c87df10" }]
          },
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 16).toISOString()
        },
        {
          id: "fb-3",
          repo: { name: "muzaffarbekmustafayev/uzbek_asr_whisper" },
          payload: {
            ref: "refs/heads/main",
            commits: [{ message: "research: Whisper & Wav2Vec2 Common Voice benchmark dataset", sha: "4b92ec3" }]
          },
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString()
        }
      ]);
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchContributions(selectedYear), fetchEvents()]).finally(() => {
      setLoading(false);
    });
  }, [selectedYear]);

  // Group contributions into 7-day columns (weeks)
  const { weeks, monthLabels } = useMemo(() => {
    if (!contributionsData || contributionsData.length === 0) return { weeks: [], monthLabels: [] };

    const weeksArr = [];
    let currentWeek = [];

    // Align start of first week by weekday
    const firstDate = new Date(contributionsData[0].date);
    const firstDayOfWeek = firstDate.getDay(); // 0 is Sunday
    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push(null);
    }

    contributionsData.forEach((item) => {
      currentWeek.push(item);
      if (currentWeek.length === 7) {
        weeksArr.push(currentWeek);
        currentWeek = [];
      }
    });

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeksArr.push(currentWeek);
    }

    // Generate month header labels
    const months = [];
    let lastMonth = -1;
    weeksArr.forEach((week, weekIdx) => {
      const firstValidDay = week.find((d) => d !== null);
      if (firstValidDay) {
        const d = new Date(firstValidDay.date);
        const m = d.getMonth();
        if (m !== lastMonth) {
          months.push({
            name: d.toLocaleString("en-US", { month: "short" }),
            weekIdx
          });
          lastMonth = m;
        }
      }
    });

    return { weeks: weeksArr, monthLabels: months };
  }, [contributionsData]);

  const formatRelativeTime = (dateStr) => {
    const date = new Date(dateStr);
    const diffSec = Math.floor((Date.now() - date.getTime()) / 1000);
    const lang = i18n.language || "uz";

    if (diffSec < 60) return t("github.time.justNow");
    const min = Math.floor(diffSec / 60);
    if (min < 60) return t("github.time.minsAgo", { count: min });
    const hrs = Math.floor(min / 60);
    if (hrs < 24) return t("github.time.hrsAgo", { count: hrs });
    const days = Math.floor(hrs / 24);
    if (days < 30) return t("github.time.daysAgo", { count: days });
    return date.toLocaleDateString();
  };

  return (
    <section className="section-shell px-4 pb-24 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        
        {/* Section Header */}
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-blue-600 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-300">
              <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
              {t("github.liveSync")}
            </div>
            
            <h2 className="mt-4 font-display text-3xl font-extrabold text-slate-900 dark:text-slate-100 sm:text-4xl">
              {t("github.title")}
            </h2>
            
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
              {t("github.description")}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[2.75rem] items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500"
            >
              <Github size={16} />
              <span>{t("github.profile")}</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* 1. Contribution Graph Heatmap Container */}
        <div className="relative rounded-3xl border border-slate-200/80 bg-white/90 p-5 sm:p-7 shadow-xl backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/80 mb-12">
          
          {/* Header Row with Total and Year Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-5 border-b border-slate-200/60 dark:border-white/[0.08]">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                <Calendar size={18} />
              </div>
              <div>
                <span className="font-display text-lg font-bold text-slate-900 dark:text-slate-100">
                  {totalCount} {t("github.contributions")}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 block">
                  {selectedYear === "last" ? t("github.lastYear") : t("github.inYear", { year: selectedYear })}
                </span>
              </div>
            </div>

            {/* Year Selector Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {["last", "2026", "2025", "2024", "2023"].map((y) => (
                <button
                  key={y}
                  onClick={() => setSelectedYear(y)}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                    selectedYear === y
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/20 dark:bg-blue-500"
                      : "border border-slate-200/80 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:bg-white/[0.08]"
                  }`}
                >
                  {y === "last" ? t("github.last1YearTab") : y}
                </button>
              ))}
            </div>
          </div>

          {/* Heatmap Grid Overflow Scroll */}
          <div className="overflow-x-auto pb-4 scrollbar-thin">
            <div className="min-w-[760px]">
              
              {/* Months Header Labels */}
              <div className="flex text-[11px] font-mono text-slate-400 mb-2 pl-8 relative h-4">
                {monthLabels.map((m, idx) => (
                  <span
                    key={idx}
                    className="absolute"
                    style={{ left: `${m.weekIdx * 14.5 + 32}px` }}
                  >
                    {m.name}
                  </span>
                ))}
              </div>

              {/* Grid: 7 Rows (Sun -> Sat) with Mon/Wed/Fri labels on left */}
              <div className="flex gap-2">
                {/* Weekday labels */}
                <div className="flex flex-col justify-between text-[10px] font-mono text-slate-400 py-1 pr-1 select-none h-[106px]">
                  <span className="opacity-0">Sun</span>
                  <span>Mon</span>
                  <span className="opacity-0">Tue</span>
                  <span>Wed</span>
                  <span className="opacity-0">Thu</span>
                  <span>Fri</span>
                  <span className="opacity-0">Sat</span>
                </div>

                {/* Grid Columns */}
                <div className="flex gap-[3.5px]">
                  {weeks.map((week, wIdx) => (
                    <div key={wIdx} className="flex flex-col gap-[3.5px]">
                      {week.map((day, dIdx) => {
                        if (!day) {
                          return (
                            <div
                              key={dIdx}
                              className="h-3 w-3 rounded-[2.5px] bg-transparent"
                            />
                          );
                        }

                        const level = Math.min(day.level || 0, 4);
                        return (
                          <div
                            key={day.date || dIdx}
                            onMouseEnter={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              setTooltip({
                                text: `${day.count} ${t("github.contributions")} · ${day.date}`,
                                x: rect.left + rect.width / 2,
                                y: rect.top - 32
                              });
                            }}
                            onMouseLeave={() => setTooltip(null)}
                            className={`h-3 w-3 rounded-[2.5px] border transition-all duration-150 hover:scale-125 cursor-pointer dark:${LEVEL_COLORS_DARK[level]} ${LEVEL_COLORS_LIGHT[level]}`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer: Legend & Info */}
              <div className="mt-5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-200/50 dark:border-white/[0.05]">
                <a
                  href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/why-are-my-contributions-not-showing-up-on-my-profile"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline text-[11px] text-slate-400 hover:text-blue-500"
                >
                  {t("github.rules")}
                </a>

                <div className="flex items-center gap-1.5 text-[11px] font-mono">
                  <span>{t("github.less")}</span>
                  {[0, 1, 2, 3, 4].map((lvl) => (
                    <span
                      key={lvl}
                      className={`h-2.5 w-2.5 rounded-[2px] border dark:${LEVEL_COLORS_DARK[lvl]} ${LEVEL_COLORS_LIGHT[lvl]}`}
                    />
                  ))}
                  <span>{t("github.more")}</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* 2. Latest Commits Section (Underneath the Heatmap) */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                <GitCommit size={18} />
              </div>
              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-slate-100">
                {t("github.latestCommits")}
              </h3>
            </div>
            <span className="font-mono text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse shadow-[0_0_6px_rgba(56,189,248,0.8)]" />
              Live GitHub REST API
            </span>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event, idx) => {
              const repoName = event.repo?.name ? event.repo.name.replace(`${GITHUB_USERNAME}/`, "") : "project";
              const repoUrl = `https://github.com/${event.repo?.name || GITHUB_USERNAME}`;
              const commit = event.payload?.commits?.[0];
              const commitMsg = commit?.message || (event.type === "CreateEvent" ? "Created repository / branch" : "Updated project repository");
              const branch = event.payload?.ref ? event.payload.ref.replace("refs/heads/", "") : "main";
              const sha = commit?.sha ? commit.sha.substring(0, 7) : null;

              return (
                <div
                  key={event.id || idx}
                  className="group glass-card rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/5 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Badges */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2 font-mono text-xs">
                        <span className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200/80 bg-blue-50/80 px-2.5 py-1 font-semibold text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-300">
                          <FolderGit2 size={13} className="text-blue-500" />
                          <span className="truncate max-w-[130px]">{repoName}</span>
                        </span>
                        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500">
                          <GitBranch size={11} /> {branch}
                        </span>
                      </div>

                      <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 shrink-0 font-mono">
                        {formatRelativeTime(event.created_at)}
                      </span>
                    </div>

                    {/* Commit Message */}
                    <p className="font-mono text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed line-clamp-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {commitMsg}
                    </p>
                  </div>

                  {/* Bottom Repo Link */}
                  <div className="mt-5 pt-4 border-t border-slate-200/60 dark:border-white/[0.06] flex items-center justify-between text-xs">
                    {sha ? (
                      <span className="font-mono text-slate-400 dark:text-slate-500 flex items-center gap-1">
                        <GitCommit size={13} className="text-blue-500" />
                        {sha}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                        <CheckCircle2 size={13} /> {t("github.active")}
                      </span>
                    )}

                    <a
                      href={repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                    >
                      <span>{t("github.repo")}</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Floating Hover Tooltip */}
      {tooltip && (
        <div
          className="pointer-events-none fixed z-[99999] -translate-x-1/2 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-mono text-white shadow-xl dark:bg-slate-800 border border-slate-700"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.text}
        </div>
      )}
    </section>
  );
}
