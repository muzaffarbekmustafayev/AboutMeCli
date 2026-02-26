import React, { useEffect, useState } from "react";
import { Download, ExternalLink, X } from "lucide-react";

const ImageModal = ({ image, title, onClose }) => {
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = image;
    link.download = title || "certificate";
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 p-2 backdrop-blur-sm sm:p-6" onClick={onClose}>
      <div
        className="mx-auto flex h-full w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-slate-200/20 bg-slate-900/85 shadow-2xl sm:rounded-3xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b border-slate-700/70 px-4 py-3 sm:px-5">
          <div className="min-w-0">
            <p className="truncate font-display text-base font-semibold text-slate-100 sm:text-lg">
              {title || "Certificate"}
            </p>
            <p className="text-xs text-slate-400">Press ESC to close</p>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <a
              href={image}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-600 bg-slate-800 text-slate-200 transition hover:bg-slate-700"
              title="Open in new tab"
            >
              <ExternalLink size={16} />
            </a>

            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-600 bg-slate-800 text-slate-200 transition hover:bg-slate-700"
              title="Download image"
            >
              <Download size={16} />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-600 bg-slate-800 text-slate-200 transition hover:bg-slate-700"
              title="Close"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_62%)] p-3 sm:p-5">
          <div className="mx-auto max-w-5xl rounded-2xl border border-slate-600/70 bg-slate-950/70 p-2 sm:p-3">
            <div className="relative">
              {imageLoading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-slate-900/65">
                  <div className="h-10 w-10 animate-spin rounded-full border-2 border-teal-400 border-t-transparent" />
                  <span className="sr-only">Loading image</span>
                </div>
              )}

              <img
                src={image}
                alt={title || "Certificate"}
                onLoad={() => setImageLoading(false)}
                onError={() => setImageLoading(false)}
                className={`h-auto w-full rounded-xl object-contain transition-opacity duration-300 ${
                  imageLoading ? "opacity-0" : "opacity-100"
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
