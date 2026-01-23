import React from "react";
import { Download } from "lucide-react";

function CVDownload() {
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
      className="
        flex items-center justify-center gap-2
        px-5 sm:px-6 md:px-7
        py-2.5 sm:py-3
        bg-gradient-to-r from-blue-600 to-indigo-600
        text-white font-semibold
        rounded-xl
        shadow-md hover:shadow-xl
        transition-all duration-300
        active:scale-95
        text-sm sm:text-base
        focus:outline-none
        focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
      "
    >
      <Download size={20} />
      <span>Download CV</span>
    </button>
  );
}

export default CVDownload;
