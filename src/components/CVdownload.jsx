import React from "react";
import { Download } from "lucide-react";
import { useTranslation } from "react-i18next";

function CVDownload() {
  const { t } = useTranslation();

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/cv/Muzaffarbek_Mustafayev_CV.pdf";
    link.download = "Muzaffarbek_Mustafayev_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="primary-cta inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
    >
      <Download size={20} />
      <span>{t("resume.download")}</span>
    </button>
  );
}

export default CVDownload;
