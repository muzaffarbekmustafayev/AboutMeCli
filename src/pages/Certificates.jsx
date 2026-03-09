import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Award,
  Building2,
  CalendarDays,
  ExternalLink,
  Eye,
  FolderX,
  RefreshCw,
  Sparkles
} from "lucide-react";
import { useTranslation } from "react-i18next";
import ImageModal from "../components/ImageModal";
import SEO from "../components/SEO";

const CERTIFICATES_MANIFEST = "/certificates/certificates.json";
const IMAGE_EXTENSIONS = /\.(png|jpe?g|webp|avif|svg)$/i;

const toPublicCertificatePath = (value) => {
  if (!value || typeof value !== "string") return "";
  if (/^https?:\/\//i.test(value) || value.startsWith("/")) return value;
  return `/certificates/${value.replace(/^\/+/, "")}`;
};

const filenameToTitle = (path) => {
  const fileName = path.split("/").pop() || "certificate";
  const withoutExt = fileName.replace(/\.[^.]+$/, "");
  return withoutExt.replace(/[_-]+/g, " ").trim();
};

const parseDateTimestamp = (value) => {
  if (!value || typeof value !== "string") return 0;
  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? 0 : timestamp;
};

const extractYear = (value, timestamp) => {
  if (timestamp > 0) return String(new Date(timestamp).getFullYear());
  const yearMatch = String(value || "").match(/\b(19|20)\d{2}\b/);
  return yearMatch ? yearMatch[0] : "";
};

const normalizeCertificate = (item, index) => {
  const payload = typeof item === "string" ? { image: item } : item;
  if (!payload || typeof payload !== "object") return null;

  const image = toPublicCertificatePath(payload.image || payload.src || payload.file);
  if (!IMAGE_EXTENSIONS.test(image)) return null;

  const timestamp = parseDateTimestamp(payload.date);

  return {
    id: payload.id || `${image}-${index}`,
    image,
    title: payload.title || filenameToTitle(image),
    issuer: payload.issuer || "",
    date: payload.date || "",
    link: payload.link || payload.url || payload.credentialUrl || "",
    timestamp,
    year: extractYear(payload.date, timestamp),
  };
};

function Certificates() {
  const { t } = useTranslation();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchCertificates = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(CERTIFICATES_MANIFEST, { cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const raw = await response.json();
      const list = Array.isArray(raw) ? raw : raw.certificates;
      if (!Array.isArray(list)) throw new Error("Invalid format");
      const normalized = list
        .map(normalizeCertificate)
        .filter(Boolean)
        .sort((a, b) => b.timestamp - a.timestamp || a.title.localeCompare(b.title));
      setCertificates(normalized);
    } catch {
      setCertificates([]);
      setError(t("certificates.error"));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchCertificates();
  }, [fetchCertificates]);

  const totalIssuers = useMemo(() => new Set(certificates.map(c => c.issuer).filter(Boolean)).size, [certificates]);
  const latestYear = useMemo(() => {
    const years = certificates.map(c => c.year).filter(Boolean).sort((a, b) => Number(b) - Number(a));
    return years[0] || "N/A";
  }, [certificates]);

  return (
    <>
      <SEO title={t("certificates.title")} description={t("certificates.pageSubtitle")} path="/certificates" />
      
      {selectedImage && (
        <ImageModal 
          image={selectedImage.image} 
          title={selectedImage.title} 
          onClose={() => setSelectedImage(null)} 
        />
      )}

      <section className="section-shell min-h-screen px-4 pt-28 pb-20 text-slate-700 dark:text-slate-300 sm:px-6 sm:pt-32">
        <div className="mx-auto w-full max-w-7xl">
          
          {/* Header */}
          <header className="mb-16 space-y-4 text-center sm:text-left">
            <div className="hero-badge">
              <Sparkles size={14} />
              {t("certificates.eyebrow")}
            </div>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl lg:text-6xl">
              {t("certificates.title")} <span className="text-blue-600">{t("certificates.titleAccent")}</span>
            </h1>
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400 max-w-3xl">
              {t("certificates.pageSubtitle")}
            </p>

            {/* Stats */}
            <div className="mt-12 flex flex-wrap justify-center sm:justify-start gap-6">
              <StatCard label="Total" value={certificates.length} />
              <StatCard label="Issuers" value={totalIssuers} />
              <StatCard label="Latest" value={latestYear} />
            </div>
          </header>

          {/* Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            ) : error ? (
              <ErrorState title={error} onRetry={fetchCertificates} />
            ) : certificates.length === 0 ? (
              <EmptyState title={t("certificates.empty")} onRetry={fetchCertificates} />
            ) : (
              certificates.map((cert) => (
                <article key={cert.id} className="group relative overflow-hidden rounded-[2rem] border border-slate-100 bg-white p-4 transition-all hover:border-blue-200 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900/40">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-50 dark:bg-slate-800 shadow-inner">
                    <img src={cert.image} alt={cert.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/40 opacity-0 transition-opacity group-hover:opacity-100">
                      <button onClick={() => setSelectedImage(cert)} className="rounded-full bg-white/20 p-4 text-white backdrop-blur-md hover:bg-white/30 transition-colors">
                        <Eye size={24} />
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 line-clamp-2 leading-tight">
                        {cert.title}
                      </h3>
                      {cert.year && (
                        <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                          {cert.year}
                        </span>
                      )}
                    </div>

                    <div className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                      {cert.issuer && (
                        <div className="flex items-center gap-3">
                          <Building2 size={16} className="text-slate-400" />
                          <span className="truncate font-medium">{cert.issuer}</span>
                        </div>
                      )}
                      {cert.date && (
                        <div className="flex items-center gap-3">
                          <CalendarDays size={16} className="text-slate-400" />
                          <span className="font-medium">{cert.date}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-8 flex gap-3">
                      <a 
                        href={cert.link || cert.image} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-slate-100 bg-slate-50 py-3 text-xs font-bold uppercase tracking-widest text-slate-600 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-400 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 transition-colors shadow-sm"
                      >
                        {cert.link ? "Verify" : "View"}
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}

const StatCard = ({ label, value }) => (
  <div className="glass-card rounded-2xl px-8 py-4 dark:border-slate-800 shadow-sm min-w-[140px]">
    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{label}</p>
    <p className="text-3xl font-extrabold text-slate-900 dark:text-white">{value}</p>
  </div>
);

const SkeletonCard = () => (
  <div className="rounded-[2rem] border border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-900/40">
    <div className="aspect-[4/3] animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800" />
    <div className="p-6 space-y-5">
      <div className="h-6 w-3/4 animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
      <div className="h-4 w-1/2 animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
    </div>
  </div>
);

const ErrorState = ({ title, onRetry }) => (
  <div className="col-span-full py-32 text-center">
    <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-red-50 text-red-400 dark:bg-red-900/20">
      <AlertTriangle size={40} />
    </div>
    <p className="text-xl font-bold text-slate-900 dark:text-white">{title}</p>
    <button onClick={onRetry} className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-900 px-8 py-3 text-sm font-bold text-white dark:bg-white dark:text-slate-900">
      <RefreshCw size={18} /> Retry
    </button>
  </div>
);

const EmptyState = ({ title }) => (
  <div className="col-span-full py-32 text-center">
    <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-50 text-slate-300 dark:bg-slate-800/50">
      <FolderX size={40} />
    </div>
    <p className="text-xl text-slate-400">{title}</p>
  </div>
);

export default Certificates;
