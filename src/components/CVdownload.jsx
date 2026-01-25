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
      onClick={handleDownload}
      className="flex items-center gap-2 px-6 py-3 rounded-lg 
                 bg-gradient-to-r from-blue-500 to-purple-500 
                 text-white font-medium 
                 hover:from-blue-600 hover:to-purple-600 
                 transition-all hover:shadow-lg"
    >
      <Download size={20} />
      <span>{t("resume.download")}</span>
    </button>
  );
}

export default CVDownload;
