import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { GraduationCap } from "lucide-react";
import SectionHeader from "../../../components/ui/SectionHeader";

const EducationBlock = () => {
  const { t } = useTranslation();

  return (
    <section>
      <SectionHeader icon={<GraduationCap size={24} />} title={t("resume.education.title")} />
      <div className="mt-8 space-y-6">
        
        {/* 1. TSU - Master */}
        <div className="group glass-card rounded-2xl p-6 transition-all hover:border-blue-500/30">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              {t("resume.education.tsu.school")}
            </h3>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 font-mono">
              {t("resume.education.tsu.period")}
            </span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-md bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-2 border border-emerald-500/20">
            {t("resume.education.tsu.degree")}
          </div>
          <p className="text-base text-slate-600 dark:text-slate-300">
            <span className="font-semibold text-slate-800 dark:text-slate-200">Yo'nalish / Направление:</span> {t("resume.education.tsu.major")}
          </p>
        </div>

        {/* 2. SamDU - Bachelor */}
        <div className="group glass-card rounded-2xl p-6 transition-all hover:border-blue-500/30">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              {t("resume.education.samdu.school")}
            </h3>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 font-mono">
              {t("resume.education.samdu.period")}
            </span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-md bg-blue-500/10 px-2.5 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-2 border border-blue-500/20">
            {t("resume.education.samdu.degree")}
          </div>
          <p className="text-base text-slate-600 dark:text-slate-300">
            <span className="font-semibold text-slate-800 dark:text-slate-200">Yo'nalish / Направление:</span> {t("resume.education.samdu.major")}
          </p>
        </div>

        {/* 3. SamDU Academic Lyceum */}
        <div className="group glass-card rounded-2xl p-6 transition-all hover:border-purple-500/30">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              {t("resume.education.lyceum.school")}
            </h3>
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 font-mono">
              {t("resume.education.lyceum.period")}
            </span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-md bg-purple-500/10 px-2.5 py-1 text-xs font-semibold text-purple-600 dark:text-purple-400 mb-2 border border-purple-500/20">
            {t("resume.education.lyceum.degree")}
          </div>
          <p className="text-base text-slate-600 dark:text-slate-300">
            <span className="font-semibold text-slate-800 dark:text-slate-200">Yo'nalish / Направление:</span> {t("resume.education.lyceum.major")}
          </p>
        </div>

        {/* 4. 38-General Secondary School */}
        <div className="group glass-card rounded-2xl p-6 transition-all hover:border-amber-500/30">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              {t("resume.education.school.school")}
            </h3>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 font-mono">
              {t("resume.education.school.period")}
            </span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-md bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400 mb-2 border border-amber-500/20">
            {t("resume.education.school.degree")}
          </div>
          <p className="text-base text-slate-600 dark:text-slate-300">
            <span className="font-semibold text-slate-800 dark:text-slate-200">Yo'nalish / Направление:</span> {t("resume.education.school.major")}
          </p>
        </div>

      </div>
    </section>
  );
};

export default memo(EducationBlock);
