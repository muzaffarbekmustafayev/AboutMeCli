import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { Briefcase, ChevronRight } from "lucide-react";
import SectionHeader from "../../../components/ui/SectionHeader";

const ExperienceTimeline = () => {
  const { t } = useTranslation();

  return (
    <section>
      <SectionHeader icon={<Briefcase size={24} />} title={t("resume.experience.title")} />
      <div className="mt-8 space-y-10">
        <div className="relative pl-8 pb-4">
          <div className="absolute left-0 top-2 h-full w-0.5 bg-blue-500/20 dark:bg-blue-500/30" />
          <div className="absolute -left-[5px] top-2 h-3 w-3 rounded-full bg-blue-500 shadow-[0_0_0_6px_rgba(59,130,246,0.2)]" />
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{t("resume.experience.role")}</h3>
            <span className="inline-flex rounded-full bg-blue-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 border border-blue-500/20">{t("resume.experience.period")}</span>
          </div>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">{t("resume.experience.company")}</p>
          
          <ul className="space-y-3.5">
            {t("resume.experience.tasks", { returnObjects: true }).map((item, i) => (
              <li key={i} className="flex items-start gap-3.5 text-base leading-relaxed text-slate-600 dark:text-slate-300">
                <ChevronRight size={18} className="mt-1 text-blue-500 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default memo(ExperienceTimeline);
