import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Code,
  ExternalLink,
  Download,
  Linkedin,
  Github,
  Award,
  Calendar,
  ChevronRight,
  Youtube
} from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "../components/SEO";
import ThemeToggle from "../components/ThemeToggle";
import { socialMedias } from "../data/socialMedias";
import CVDownload from "../components/CVdownload";
const Resume = () => {
  const { t } = useTranslation();

  const downloadResume = () => {
    alert(t("resume.downloadAlert"));
  };

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">

      {/* <div className="w-full hidden flex justify-end pr-4">
        <ThemeToggle />
      </div> */}

      <div className="max-w-4xl mx-auto mt-12 px-4 py-8 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Muzaffarbek Mustafayev
              </h1>

              <div className="flex items-center gap-2 text-lg text-gray-600 dark:text-gray-400 mb-4">
                <Briefcase size={20} />
                <span>{t("resume.role")}</span>
                <span className="mx-2">•</span>
                <Code size={20} />
                <span>{t("resume.stack")}</span>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="mailto:muzaffarbekmustafayev@gmail.com"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
                >
                  <Mail size={18} />
                  <span className="text-sm">muzaffarbekmustafayev@gmail.com</span>
                </a>

                <a
                  href={`tel:${socialMedias.phone.path}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
                >
                  <Phone size={18} />
                  <span className="text-sm">{socialMedias.phone.path}</span>
                </a>

                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
                  <MapPin size={18} />
                  <span className="text-sm">{t("resume.location")}</span>
                </div>
              </div>
            </div>

           < CVDownload/>
          </div>

          {/* SOCIAL */}
          <div className="flex gap-4">
            <a
              href={socialMedias.linkedin.path}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
            >
              <Linkedin size={18} />
              <span className="text-sm">LinkedIn</span>
            </a>

            <a
              href={socialMedias.github.path}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
            >
              <Github size={18} />
              <span className="text-sm">GitHub</span>
            </a>

            <a
              href={socialMedias.youtube.path}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
            >
              <Youtube size={18} />
              <span className="text-sm">YouTube</span>
            </a>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-8">

            {/* SUMMARY */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <Award size={24} className="text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold">
                  {t("resume.summary.title")}
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {t("resume.summary.text")}
              </p>
            </section>

            {/* EXPERIENCE */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                  <Briefcase size={24} className="text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-bold">
                  {t("resume.experience.title")}
                </h2>
              </div>

              <div className="relative pl-8">
                <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-blue-500"></div>
                <div className="absolute left-[7px] top-6 w-0.5 h-full bg-gradient-to-b from-blue-500 to-transparent"></div>

                <h3 className="text-xl font-semibold mb-1">
                  {t("resume.experience.role")}
                </h3>

                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-blue-600 dark:text-blue-400 font-medium">
                    {t("resume.experience.company")}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <Calendar size={14} />
                    {t("resume.experience.period")}
                  </span>
                </div>

                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  {t("resume.experience.tasks", { returnObjects: true }).map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <ChevronRight size={16} className="text-blue-500 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* PROJECTS */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                  <Code size={24} className="text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold">
                  {t("resume.projects.title")}
                </h2>
              </div>

              <div className="space-y-6">
                <Project
                  title="AI Chat Platform"
                  desc={t("resume.projects.ai")}
                />
                <Project
                  title="Face ID Login System"
                  desc={t("resume.projects.face")}
                />
              </div>
            </section>
          </div>

          {/* RIGHT */}
          <div className="space-y-8">

            {/* SKILLS */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30">
                  <Code size={24} className="text-orange-600 dark:text-orange-400" />
                </div>
                <h2 className="text-2xl font-bold">
                  {t("resume.skills.title")}
                </h2>
              </div>

              <SkillGroup title="Frontend" items={["React","Redux","React Router","TailwindCSS","TypeScript"]} />
              <SkillGroup title="Backend" items={["Node.js","Express","MongoDB","MySQL","REST API"]} />
            </section>

            {/* EDUCATION */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                  <GraduationCap size={24} className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <h2 className="text-2xl font-bold">
                  {t("resume.education.title")}
                </h2>
              </div>

              <h3 className="text-lg font-semibold mb-1">
                {t("resume.education.degree")}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t("resume.education.school")} • 2022 – Present
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                {t("resume.education.desc")}
              </p>
            </section>

            {/* LANGUAGES */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-2xl font-bold mb-6">
                {t("resume.languages.title")}
              </h2>

              <LangBar label={t("resume.languages.uz")} value="100%" />
              <LangBar label={t("resume.languages.en")} value="80%" />
              <LangBar label={t("resume.languages.ru")} value="75%" />
            </section>
          </div>
        </div>

        <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-500 dark:text-gray-400 text-sm">
          © {new Date().getFullYear()} Muzaffarbek Mustafayev. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Resume;

/* ===== HELPERS (DIZAYNGA TEGILMAGAN) ===== */

const Project = ({ title, desc }) => (
  <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 transition-colors">
    <div className="flex justify-between items-start mb-3">
      <h3 className="text-lg font-semibold">{title}</h3>
      <span className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400">
        Live <ExternalLink size={14} />
      </span>
    </div>
    <p className="text-gray-600 dark:text-gray-300">{desc}</p>
  </div>
);

const SkillGroup = ({ title, items }) => (
  <div className="mb-6">
    <h3 className="font-semibold mb-3 text-lg">{title}</h3>
    <div className="flex flex-wrap gap-2">
      {items.map((i) => (
        <span
          key={i}
          className="px-3 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
        >
          {i}
        </span>
      ))}
    </div>
  </div>
);

const LangBar = ({ label, value }) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1">
      <span className="font-medium">{label}</span>
      <span className="text-gray-500 dark:text-gray-400">{value}</span>
    </div>
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
      <div className="bg-blue-600 h-2 rounded-full" style={{ width: value }} />
    </div>
  </div>
);
