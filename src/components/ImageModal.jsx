import React, { useEffect, useState } from "react";
import { Download, ExternalLink, X } from "lucide-react";

const ImageModal = ({ image, title, onClose }) => {
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = image;
    link.download = title || "certificate";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-0 sm:p-4 md:p-6 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title || "Certificate preview"}
    >
      <div
        className="relative flex h-full w-full max-w-5xl flex-col overflow-hidden sm:h-auto sm:max-h-[92vh] sm:rounded-3xl border-0 sm:border border-slate-700/60 bg-slate-900 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-800 bg-slate-950/80 px-4 py-3 backdrop-blur-md sm:px-6">
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-sm sm:text-base font-bold text-slate-100">
              {title || "Certificate"}
            </p>
            <p className="text-[11px] text-slate-400">
              <span className="hidden sm:inline">Press ESC or tap outside to close</span>
              <span className="sm:hidden">Tap outside or X to close</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={image}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 text-slate-200 transition hover:bg-slate-700 active:scale-95"
              title="Open full resolution"
              aria-label="Open full resolution"
            >
              <ExternalLink size={18} />
            </a>

            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 text-slate-200 transition hover:bg-slate-700 active:scale-95"
              title="Download image"
              aria-label="Download image"
            >
              <Download size={18} />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 text-slate-200 transition hover:bg-slate-700 active:scale-95"
              title="Close"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Image viewport */}
        <div className="flex-1 overflow-auto bg-slate-950/60 p-2 sm:p-6 flex items-center justify-center">
          <div className="relative max-h-full max-w-full">
            {imageLoading && (
              <div className="absolute inset-0 z-10 flex min-h-[200px] items-center justify-center rounded-2xl bg-slate-900/60">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-blue-400 border-t-transparent" />
                <span className="sr-only">Loading image</span>
              </div>
            )}

            <img
              src={image}
              alt={title || "Certificate"}
              onLoad={() => setImageLoading(false)}
              onError={() => setImageLoading(false)}
              className={`max-h-[80vh] w-auto max-w-full rounded-xl sm:rounded-2xl object-contain shadow-2xl transition-opacity duration-300 ${
                imageLoading ? "opacity-0" : "opacity-100"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
