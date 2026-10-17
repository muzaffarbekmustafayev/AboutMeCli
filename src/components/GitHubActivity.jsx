import React, { useEffect, useState, useMemo, useCallback } from "react";
import { 
  GitBranch, 
  GitCommit, 
  ExternalLink, 
  RefreshCw, 
  Github, 
  FolderGit2, 
  Calendar,
  Sparkles,
  CheckCircle2
} from "lucide-react";
import { useTranslation } from "react-i18next";

const GITHUB_USERNAME = "muzaffarbekmustafayev";
const CONTRIBUTIONS_API = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}`;
const REPOS_API = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=6`;
const CACHE_TTL_MS = 1000 * 60 * 15; // 15 minutes cache

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

const FALLBACK_LATEST_COMMITS = [
  {
    repoName: "AboutMeCli",
    repoFullName: "muzaffarbekmustafayev/AboutMeCli",
    repoUrl: "https://github.com/muzaffarbekmustafayev/AboutMeCli",
    commitMsg: "feat(articles): elevate card/modal responsiveness on mobile, improve prose semantics, and enhance git activity",
    sha: "22acd59",
    date: new Date().toISOString(),
    commitUrl: "https://github.com/muzaffarbekmustafayev/AboutMeCli/commit/22acd59",
    branch: "main"
  },
  {
    repoName: "muzaffarbekmustafayev",
    repoFullName: "muzaffarbekmustafayev/muzaffarbekmustafayev",
    repoUrl: "https://github.com/muzaffarbekmustafayev/muzaffarbekmustafayev",
    commitMsg: "docs: meticulously align README.md with official muzaffarbek.uz portfolio data",
    sha: "c873ef0",
    date: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    commitUrl: "https://github.com/muzaffarbekmustafayev/muzaffarbekmustafayev",
    branch: "main"
  },
  {
    repoName: "uzbek-speech-recognition-model-comparison",
    repoFullName: "muzaffarbekmustafayev/uzbek-speech-recognition-model-comparison",
    repoUrl: "https://github.com/muzaffarbekmustafayev/uzbek-speech-recognition-model-comparison",
    commitMsg: "Initial benchmark scripts for Whisper and Wav2Vec2 on Uzbek Common Voice",
    sha: "6b2a8d1",
    date: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    commitUrl: "https://github.com/muzaffarbekmustafayev/uzbek-speech-recognition-model-comparison",
    branch: "main"
  }
];

// LocalStorage helpers with TTL
const getStorageItem = (key) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const item = JSON.parse(raw);
    return item;
  } catch {
    return null;
  }
};

const setStorageItem = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
  } catch {
    // Ignore storage quota errors
  }
};

export default function GitHubActivity() {
  const { t } = useTranslation();
  const [selectedYear, setSelectedYear] = useState("last");

  // Pre-hydrate state immediately from cache if available (0ms render time)
  const [contributionsData, setContributionsData] = useState(() => {
    const cached = getStorageItem(`gh_contrib_v2_last`);
    return cached?.data?.contributions || null;
  });

  const [totalCount, setTotalCount] = useState(() => {
    const cached = getStorageItem(`gh_contrib_v2_last`);
    return cached?.data?.total || 0;
  });

  const [recentCommits, setRecentCommits] = useState(() => {
    const cached = getStorageItem(`gh_commits_v2`);
    if (cached?.data && Array.isArray(cached.data) && cached.data.length >= 3) {
      return cached.data;
    }
    return FALLBACK_LATEST_COMMITS;
  });

  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncedTime, setLastSyncedTime] = useState(() => {
    const cached = getStorageItem(`gh_contrib_v2_last`);
    return cached?.timestamp || null;
  });
  const [tooltip, setTooltip] = useState(null);

  // Fetch Contributions with timeout and graceful fallback
  const fetchContributions = useCallback(async (year = "last", force = false) => {
    const cacheKey = `gh_contrib_v2_${year}`;
    const cached = getStorageItem(cacheKey);

    if (!force && cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      setContributionsData(cached.data.contributions);
      setTotalCount(cached.data.total);
      return cached.data;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    try {
      const res = await fetch(`${CONTRIBUTIONS_API}?y=${year}`, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!res.ok) throw new Error("Contributions API response not OK");
      const data = await res.json();
      
      const contribs = data.contributions || [];
      const total = typeof data.total === "number" ? data.total : data.total?.[year] || contribs.reduce((acc, curr) => acc + curr.count, 0);

      setContributionsData(contribs);
      setTotalCount(total);
      setLastSyncedTime(Date.now());
      setStorageItem(cacheKey, { contributions: contribs, total });
      return { contributions: contribs, total };
    } catch (err) {
      clearTimeout(timeoutId);
      console.warn("Contributions background sync note:", err.message);
      // Retain existing cache if available
      if (cached?.data) {
        setContributionsData(cached.data.contributions);
        setTotalCount(cached.data.total);
      }
    }
  }, []);

  // Fetch Latest 3 Commits Across User's Top Repositories
  const fetchLatestCommits = useCallback(async (force = false) => {
    const cacheKey = "gh_commits_v2";
    const cached = getStorageItem(cacheKey);

    if (!force && cached && Date.now() - cached.timestamp < CACHE_TTL_MS && cached.data.length >= 3) {
      setRecentCommits(cached.data);
      return cached.data;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    try {
      const reposRes = await fetch(REPOS_API, {
        headers: { Accept: "application/vnd.github.v3+json" },
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!reposRes.ok) throw new Error("Repos API not OK");
      const repos = await reposRes.json();

      if (!Array.isArray(repos) || repos.length === 0) {
        setRecentCommits(FALLBACK_LATEST_COMMITS);
        return FALLBACK_LATEST_COMMITS;
      }

      // Query the top 3 most recently pushed repositories in parallel
      const topRepos = repos.slice(0, 3);
      const commitPromises = topRepos.map(async (repo) => {
        try {
          const commitRes = await fetch(
            `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/commits?per_page=1`,
            { headers: { Accept: "application/vnd.github.v3+json" } }
          );
          if (!commitRes.ok) {
            return {
              repoName: repo.name,
              repoFullName: repo.full_name,
              repoUrl: repo.html_url,
              commitMsg: `Updated repository ${repo.name}`,
              sha: null,
              date: repo.pushed_at || repo.updated_at,
              commitUrl: repo.html_url,
              branch: repo.default_branch || "main"
            };
          }
          const commitData = await commitRes.json();
          const first = Array.isArray(commitData) && commitData[0] ? commitData[0] : null;

          return {
            repoName: repo.name,
            repoFullName: repo.full_name,
            repoUrl: repo.html_url,
            commitMsg: first?.commit?.message || `Updated repository ${repo.name}`,
            sha: first?.sha ? first.sha.substring(0, 7) : null,
            date: first?.commit?.author?.date || repo.pushed_at,
            commitUrl: first?.html_url || repo.html_url,
            branch: repo.default_branch || "main"
          };
        } catch {
          return {
            repoName: repo.name,
            repoFullName: repo.full_name,
            repoUrl: repo.html_url,
            commitMsg: `Updated repository ${repo.name}`,
            sha: null,
            date: repo.pushed_at,
            commitUrl: repo.html_url,
            branch: repo.default_branch || "main"
          };
        }
      });

      const fetched = await Promise.all(commitPromises);
      const valid = fetched.filter(Boolean);
      const finalCommits = valid.length >= 3 ? valid.slice(0, 3) : FALLBACK_LATEST_COMMITS;
      setRecentCommits(finalCommits);
      setStorageItem(cacheKey, finalCommits);
      return finalCommits;
    } catch (err) {
      clearTimeout(timeoutId);
      console.warn("Commits background sync note:", err.message);
      if (cached?.data && cached.data.length >= 3) {
        setRecentCommits(cached.data);
      } else {
        setRecentCommits(FALLBACK_LATEST_COMMITS);
      }
    }
  }, []);

  // Background sync on mount or year change
  useEffect(() => {
    setIsSyncing(true);
    Promise.allSettled([
      fetchContributions(selectedYear, false),
      fetchLatestCommits(false)
    ]).finally(() => {
      setIsSyncing(false);
    });
  }, [selectedYear, fetchContributions, fetchLatestCommits]);

  // Manual force refresh
  const handleManualRefresh = () => {
    if (isSyncing) return;
    setIsSyncing(true);
    Promise.allSettled([
      fetchContributions(selectedYear, true),
      fetchLatestCommits(true)
    ]).finally(() => {
      setIsSyncing(false);
    });
  };

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
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const diffSec = Math.floor((Date.now() - date.getTime()) / 1000);

    if (diffSec < 60) return t("github.time.justNow", { defaultValue: "hozirgina" });
    const min = Math.floor(diffSec / 60);
    if (min < 60) return t("github.time.minsAgo", { count: min, defaultValue: `${min}m ago` });
    const hrs = Math.floor(min / 60);
    if (hrs < 24) return t("github.time.hrsAgo", { count: hrs, defaultValue: `${hrs}h ago` });
    const days = Math.floor(hrs / 24);
    if (days < 30) return t("github.time.daysAgo", { count: days, defaultValue: `${days}d ago` });
    return date.toLocaleDateString();
  };

  return (
    <section className="section-shell px-4 pb-24 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        
        {/* Section Header */}
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-blue-600 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-300">
              <span className={`h-2 w-2 rounded-full ${isSyncing ? "bg-amber-400 animate-spin" : "bg-sky-400 animate-pulse"} shadow-[0_0_8px_rgba(56,189,248,0.8)]`} />
              <span>{isSyncing ? t("github.syncing", { defaultValue: "Sinxronlanmoqda..." }) : t("github.liveSync", { defaultValue: "Live GitHub Sync" })}</span>
            </div>
            
            <h2 className="mt-4 font-display text-3xl font-extrabold text-slate-900 dark:text-slate-100 sm:text-4xl">
              {t("github.title", { defaultValue: "GitHub Faoliyati & Jonli Grafigi" })}
            </h2>
            
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
              {t("github.description", { defaultValue: "Real vaqtda GitHub hisobidan olinadigan faoliyat matritsasi va oxirgi repozitoriy o'zgarishlari." })}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleManualRefresh}
              disabled={isSyncing}
              className="inline-flex min-h-[2.75rem] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm backdrop-blur-md transition-all hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800 active:scale-95 disabled:opacity-50"
              title="Yangilash"
            >
              <RefreshCw size={14} className={isSyncing ? "animate-spin text-blue-500" : ""} />
              <span>{isSyncing ? t("github.syncing", { defaultValue: "Yuklanmoqda..." }) : t("github.refresh", { defaultValue: "Yangilash" })}</span>
            </button>

            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[2.75rem] items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 active:scale-95"
            >
              <Github size={16} />
              <span>{t("github.profile", { defaultValue: "GitHub Profil" })}</span>
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
                  {totalCount > 0 ? (
                    `${totalCount} ${t("github.contributions", { defaultValue: "ta contribution" })}`
                  ) : (
                    <span className="inline-block h-5 w-32 rounded bg-slate-200 dark:bg-slate-800 animate-pulse align-middle" />
                  )}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 block">
                  {selectedYear === "last" ? t("github.lastYear", { defaultValue: "Oxirgi 1 yilda" }) : t("github.inYear", { year: selectedYear, defaultValue: `${selectedYear}-yilda` })}
                </span>
              </div>
            </div>

            {/* Year Selector Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {["last", "2026", "2025", "2024", "2023"].map((y) => (
                <button
                  key={y}
                  onClick={() => setSelectedYear(y)}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all shrink-0 active:scale-95 ${
                    selectedYear === y
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/20 dark:bg-blue-500"
                      : "border border-slate-200/80 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:bg-white/[0.08]"
                  }`}
                >
                  {y === "last" ? t("github.last1YearTab", { defaultValue: "So'nggi 1 yil" }) : y}
                </button>
              ))}
            </div>
          </div>

          {/* Heatmap Grid Overflow Scroll */}
          <div className="overflow-x-auto pb-4 scrollbar-thin">
            <div className="min-w-[760px]">
              
              {/* If data is ready, render the interactive calendar */}
              {weeks.length > 0 ? (
                <>
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
                                    text: `${day.count} ${t("github.contributions", { defaultValue: "contributions" })} · ${day.date}`,
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
                </>
              ) : (
                /* Ultra-realistic pulsing skeleton matching exact calendar dimensions */
                <div className="animate-pulse space-y-3">
                  <div className="h-4 w-64 rounded bg-slate-200/70 dark:bg-slate-800/70 ml-8" />
                  <div className="flex gap-2">
                    <div className="flex flex-col justify-between text-[10px] font-mono text-slate-300 dark:text-slate-700 py-1 pr-1 select-none h-[106px]">
                      <span>Mon</span>
                      <span>Wed</span>
                      <span>Fri</span>
                    </div>
                    <div className="flex gap-[3.5px]">
                      {Array.from({ length: 52 }).map((_, cIdx) => (
                        <div key={cIdx} className="flex flex-col gap-[3.5px]">
                          {Array.from({ length: 7 }).map((_, rIdx) => (
                            <div
                              key={rIdx}
                              className="h-3 w-3 rounded-[2.5px] bg-slate-200/80 dark:bg-slate-800/80"
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Footer: Legend & Info */}
              <div className="mt-5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-200/50 dark:border-white/[0.05]">
                <a
                  href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/why-are-my-contributions-not-showing-up-on-my-profile"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline text-[11px] text-slate-400 hover:text-blue-500"
                >
                  {t("github.rules", { defaultValue: "Contributions hisoblash qoidalari" })}
                </a>

                <div className="flex items-center gap-1.5 text-[11px] font-mono">
                  <span>{t("github.less", { defaultValue: "Kam" })}</span>
                  {[0, 1, 2, 3, 4].map((lvl) => (
                    <span
                      key={lvl}
                      className={`h-2.5 w-2.5 rounded-[2px] border dark:${LEVEL_COLORS_DARK[lvl]} ${LEVEL_COLORS_LIGHT[lvl]}`}
                    />
                  ))}
                  <span>{t("github.more", { defaultValue: "Ko'p" })}</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* 2. Latest 3 Repositories Changes (So'nggi 3 ta o'zgarish) */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                <GitCommit size={18} />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-slate-900 dark:text-slate-100">
                  {t("github.latestCommits", { defaultValue: "So'nggi 3 ta Repozitoriy O'zgarishi" })}
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {t("github.latestReposDesc", { defaultValue: "Aynan qaysi repolarda so'nggi commitlar va yangilanishlar bo'lgani" })}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1.5 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-900/40">
                <span className={`h-1.5 w-1.5 rounded-full ${isSyncing ? "bg-amber-400" : "bg-emerald-500"} animate-pulse shadow-[0_0_6px_rgba(16,185,129,0.8)]`} />
                {isSyncing ? "Updating..." : "Live GitHub Sync"}
              </span>
            </div>
          </div>

          {/* Grid with Exactly 3 Cards */}
          <div className="grid gap-5 md:grid-cols-3">
            {recentCommits.slice(0, 3).map((item, idx) => (
              <div
                key={item.repoName || idx}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/5 dark:border-slate-800/80 dark:bg-slate-900/80"
              >
                {/* Accent line top */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 opacity-80" />

                <div>
                  {/* Top Header: Repo Tag and Time */}
                  <div className="flex items-center justify-between gap-2 mb-3.5 pt-1">
                    <a
                      href={item.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50/90 px-3 py-1 font-mono text-xs font-bold text-blue-700 transition-colors hover:bg-blue-600 hover:text-white dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-300 dark:hover:bg-blue-600 dark:hover:text-white"
                      title={item.repoFullName}
                    >
                      <FolderGit2 size={13} className="shrink-0" />
                      <span className="truncate max-w-[150px] font-semibold">{item.repoName}</span>
                    </a>

                    <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 shrink-0">
                      {formatRelativeTime(item.date)}
                    </span>
                  </div>

                  {/* Commit Message */}
                  <p className="font-mono text-sm font-semibold leading-relaxed text-slate-800 dark:text-slate-200 line-clamp-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.commitMsg}
                  </p>
                </div>

                {/* Footer with Branch, SHA and Direct Commit Link */}
                <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <span className="inline-flex items-center gap-1 text-[11px]">
                      <GitBranch size={11} className="text-blue-500" />
                      {item.branch || "main"}
                    </span>
                    {item.sha && (
                      <span className="text-[11px] text-slate-400 dark:text-slate-500">
                        • {item.sha}
                      </span>
                    )}
                  </div>

                  <a
                    href={item.commitUrl || item.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                  >
                    <span>{t("github.repo", { defaultValue: "Repo" })}</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            ))}
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
