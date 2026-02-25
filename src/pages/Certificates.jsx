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

const toExternalLink = (value) => {
  if (!value || typeof value !== "string") return "";
  return /^https?:\/\//i.test(value.trim()) ? value.trim() : "";
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
    link: toExternalLink(payload.link || payload.url || payload.credentialUrl),
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
      if (!Array.isArray(list)) throw new Error("Manifest format is invalid");

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

  const hasCertificates = certificates.length > 0;
  const totalIssuers = useMemo(() => {
    return new Set(certificates.map((item) => item.issuer).filter(Boolean)).size;
  }, [certificates]);

  const latestYear = useMemo(() => {
    const years = certificates
      .map((item) => item.year)
      .filter(Boolean)
      .sort((a, b) => Number(b) - Number(a));

    return years[0] || t("certificates.unknownYear", { defaultValue: "N/A" });
  }, [certificates, t]);

  return (
    <section className="section-shell min-h-screen px-4 pt-28 pb-20">
      <SEO
        title={t("certificates.title")}
        description={t("certificates.pageSubtitle", { defaultValue: "Professional certificates and achievements." })}
        path="/certificates"
      />

      {selectedImage && (
        <ImageModal
          image={selectedImage.image}
          title={selectedImage.title}
          onClose={() => setSelectedImage(null)}
        />
      )}

      <div className="mx-auto max-w-6xl">
        <header className="text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-teal-300/60 bg-teal-100/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-teal-700 dark:border-teal-700/60 dark:bg-teal-900/30 dark:text-teal-200">
            <Award size={14} />
            {t("certificates.eyebrow")}
          </p>

          <h1 className="mt-5 font-display text-4xl font-extrabold text-slate-900 dark:text-slate-100 sm:text-5xl">
            {t("certificates.title")} <span className="brand-gradient">{t("certificates.titleAccent")}</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base text-slate-600 dark:text-slate-400 sm:text-lg">
            {t("certificates.pageSubtitle", { defaultValue: "Professional certificates and achievements." })}
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <StatCard
              label={t("certificates.stats.total", { defaultValue: "Total Certificates" })}
              value={String(certificates.length)}
            />
            <StatCard
              label={t("certificates.stats.issuers", { defaultValue: "Issuers" })}
              value={String(totalIssuers)}
            />
            <StatCard
              label={t("certificates.stats.latestYear", { defaultValue: "Latest Year" })}
              value={latestYear}
            />
          </div>

          <button
            type="button"
            onClick={fetchCertificates}
            className="primary-cta mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-semibold"
          >
            <RefreshCw size={16} />
            {t("certificates.refresh")}
          </button>
        </header>

        {loading && (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <article key={index} className="glass-card overflow-hidden rounded-3xl">
                <div className="aspect-[4/3] animate-pulse bg-slate-200/70 dark:bg-slate-800/70" />
                <div className="space-y-3 p-5">
                  <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200/70 dark:bg-slate-800/70" />
                  <div className="h-4 w-full animate-pulse rounded bg-slate-200/70 dark:bg-slate-800/70" />
                  <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200/70 dark:bg-slate-800/70" />
                </div>
              </article>
            ))}
          </div>
        )}

        {!loading && error && (
          <StatePanel
            icon={<AlertTriangle className="h-6 w-6" />}
            title={error}
            description={t("certificates.errorDescription", { defaultValue: "Please try refreshing the page." })}
            actionLabel={t("certificates.refresh", { defaultValue: "Refresh" })}
            onAction={fetchCertificates}
            danger
          />
        )}

        {!loading && !error && !hasCertificates && (
          <StatePanel
            icon={<FolderX className="h-6 w-6" />}
            title={t("certificates.empty")}
            description={t("certificates.emptyDescription", { defaultValue: "New certificates will appear here soon." })}
            actionLabel={t("certificates.refresh", { defaultValue: "Refresh" })}
            onAction={fetchCertificates}
          />
        )}

        {!loading && !error && certificates.length > 0 && (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((certificate) => (
              <article key={certificate.id} className="group glass-card overflow-hidden rounded-3xl">
                <button
                  type="button"
                  onClick={() => setSelectedImage(certificate)}
                  className="relative block w-full overflow-hidden text-left"
                >
                  <div className="aspect-[4/3] bg-slate-100 dark:bg-slate-900">
                    <img
                      src={certificate.image}
                      alt={certificate.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
                    />
                  </div>

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent px-4 py-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/25 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
                      <Award size={12} />
                      {t("certificates.certificate", { defaultValue: "Certificate" })}
                    </div>
                  </div>
                </button>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-lg font-bold text-slate-900 dark:text-slate-100">
                      {certificate.title}
                    </h3>

                    {certificate.year && (
                      <span className="inline-flex shrink-0 rounded-full border border-teal-300/60 bg-teal-100/70 px-2.5 py-1 text-xs font-semibold text-teal-700 dark:border-teal-700/60 dark:bg-teal-900/30 dark:text-teal-200">
                        {certificate.year}
                      </span>
                    )}
                  </div>

                  <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <p className="inline-flex items-center gap-2">
                      <Award size={15} className="text-teal-600 dark:text-teal-300" />
                      {t("certificates.certificate", { defaultValue: "Certificate" })}
                    </p>

                    {certificate.issuer && (
                      <p className="inline-flex items-center gap-2">
                        <Building2 size={15} className="text-cyan-600 dark:text-cyan-300" />
                        {certificate.issuer}
                      </p>
                    )}

                    {certificate.date && (
                      <p className="inline-flex items-center gap-2">
                        <CalendarDays size={15} className="text-amber-600 dark:text-amber-300" />
                        {certificate.date}
                      </p>
                    )}
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedImage(certificate)}
                      className="control-surface inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 transition hover:-translate-y-0.5 dark:text-slate-200"
                    >
                      <Eye size={14} />
                      {t("certificates.preview", { defaultValue: "Preview" })}
                    </button>

                    <a
                      href={certificate.link || certificate.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-teal-300/70 bg-teal-100/70 px-3 py-2 text-xs font-semibold text-teal-700 transition hover:-translate-y-0.5 dark:border-teal-700/60 dark:bg-teal-900/30 dark:text-teal-200"
                    >
                      {certificate.link
                        ? t("certificates.viewCredential", { defaultValue: "View credential" })
                        : t("certificates.viewImage", { defaultValue: "Open image" })}
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

const StatCard = ({ label, value }) => (
  <div className="glass-card rounded-2xl px-4 py-3 text-left">
    <p className="text-xs uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">{label}</p>
    <p className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-slate-100">{value}</p>
  </div>
);

const StatePanel = ({ icon, title, description, actionLabel, onAction, danger = false }) => (
  <div className="glass-card mt-10 rounded-3xl p-8 text-center sm:p-10">
    <div
      className={`mx-auto flex h-12 w-12 items-center justify-center rounded-xl ${
        danger
          ? "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-300"
          : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
      }`}
    >
      {icon}
    </div>

    <p className={`mt-4 text-lg font-semibold ${danger ? "text-red-600 dark:text-red-300" : "text-slate-800 dark:text-slate-100"}`}>
      {title}
    </p>
    <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600 dark:text-slate-400">{description}</p>

    <button
      type="button"
      onClick={onAction}
      className="primary-cta mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
    >
      <RefreshCw size={15} />
      {actionLabel}
    </button>
  </div>
);

export default Certificates;
