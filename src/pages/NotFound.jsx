import { useTranslation } from "react-i18next";
import ThemeToggle from "../components/ThemeToggle";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div
      className="
        flex flex-col items-center justify-center min-h-screen
        bg-gray-100 dark:bg-gray-900
        transition-colors duration-300
        p-6 text-center
      "
    >
      <div className="w-full hidden flex justify-end pr-4">
        <ThemeToggle />
      </div>

      {/* 404 */}
      <h1
        className="
          text-7xl font-extrabold mb-4
          text-red-600 dark:text-red-500
          animate-pulse
        "
      >
        {t("notFound.code")}
      </h1>

      {/* Title */}
      <h2
        className="
          text-3xl font-semibold mb-3
          text-gray-800 dark:text-gray-200
        "
      >
        {t("notFound.title")}
      </h2>

      {/* Description */}
      <p
        className="
          max-w-md mb-8 leading-relaxed
          text-gray-600 dark:text-gray-400
        "
      >
        {t("notFound.description")}
      </p>

      {/* Back home */}
      <a
        href="/"
        className="
          px-6 py-3 rounded-xl font-medium
          bg-blue-600 hover:bg-blue-700
          dark:bg-blue-500 dark:hover:bg-blue-600
          text-white shadow-lg
          transition-all duration-300
          hover:scale-105 active:scale-95
        "
      >
        {t("notFound.backHome")}
      </a>
    </div>
  );
}
