import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Award, Building2, Calendar, ExternalLink, RefreshCw } from "lucide-react";
import { useTranslation } from "react-i18next";

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

const normalizeCertificate = (item, index) => {
  const payload = typeof item === "string" ? { image: item } : item;
  if (!payload || typeof payload !== "object") return null;

  const image = toPublicCertificatePath(payload.image || payload.src || payload.file);
  if (!IMAGE_EXTENSIONS.test(image)) return null;

  return {
    id: payload.id || `${image}-${index}`,
    image,
    title: payload.title || filenameToTitle(image),
    issuer: payload.issuer || "",
    date: payload.date || "",
  };
};

function Blog() {
  const { t } = useTranslation();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCertificates = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(CERTIFICATES_MANIFEST, { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const raw = await response.json();
      const list = Array.isArray(raw) ? raw : raw.certificates;
      if (!Array.isArray(list)) {
        throw new Error("Manifest format is invalid");
      }

      const normalized = list
        .map(normalizeCertificate)
        .filter(Boolean)
        .sort((a, b) => (a.date < b.date ? 1 : -1));

      setCertificates(normalized);
    } catch (_err) {
      setCertificates([]);
      setError(t("certificates.error"));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchCertificates();
  }, [fetchCertificates]);

  const hasCertificates = useMemo(() => certificates.length > 0, [certificates]);

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-[#0b1120] pt-28 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-500 font-semibold">
            {t("certificates.eyebrow")}
          </p>

          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white">
            {t("certificates.title")} {" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">
              {t("certificates.titleAccent")}
            </span>
          </h1>

          <p className="mt-5 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t("certificates.subtitle")}
          </p>

          <button
            type="button"
            onClick={fetchCertificates}
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 text-white font-semibold"
          >
            <RefreshCw size={18} />
            {t("certificates.refresh")}
          </button>
        </header>

        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-72 rounded-3xl bg-white dark:bg-gray-900/70 border animate-pulse" />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="rounded-3xl bg-white dark:bg-gray-900/70 border p-8 text-center">
            <p className="text-lg text-red-600 dark:text-red-400 font-semibold">{error}</p>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              {t("certificates.setupHint")}
            </p>
          </div>
        )}

        {!loading && !error && !hasCertificates && (
          <div className="rounded-3xl bg-white dark:bg-gray-900/70 border p-8 text-center">
            <p className="text-gray-700 dark:text-gray-300 font-semibold">{t("certificates.empty")}</p>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              {t("certificates.setupHint")}
            </p>
          </div>
        )}

        {!loading && !error && hasCertificates && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((certificate) => (
              <article
                key={certificate.id}
                className="group rounded-3xl bg-white dark:bg-gray-900/70 border overflow-hidden hover:shadow-xl transition"
              >
                <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-800 overflow-hidden">
                  <img
                    src={certificate.image}
                    alt={certificate.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-300"
                  />
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
                    {certificate.title}
                  </h3>

                  <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <p className="inline-flex items-center gap-2">
                      <Award size={15} />
                      {t("certificates.certificate")}
                    </p>

                    {certificate.issuer && (
                      <p className="inline-flex items-center gap-2">
                        <Building2 size={15} />
                        {certificate.issuer}
                      </p>
                    )}

                    {certificate.date && (
                      <p className="inline-flex items-center gap-2">
                        <Calendar size={15} />
                        {certificate.date}
                      </p>
                    )}
                  </div>

                  <a
                    href={certificate.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600"
                  >
                    {t("certificates.viewImage")}
                    <ExternalLink size={15} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Blog;
