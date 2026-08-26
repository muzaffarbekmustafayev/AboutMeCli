import React, { useMemo, memo } from "react";
import { useTranslation } from "react-i18next";
import { GraduationCap, Award, School, MapPin, Trophy } from "lucide-react";

const EducationTimeline = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || "uz";

  const education = useMemo(() => [
    {
      school: lang === "ru" ? "Томский государственный университет (ТГУ)" : lang === "en" ? "Tomsk State University (TSU)" : "Tomsk davlat universiteti (TSU)",
      location: lang === "ru" ? "Томск, Россия" : lang === "en" ? "Tomsk, Russia" : "Tomsk, Rossiya",
      field: lang === "ru" ? "Мехатроника и робототехника" : lang === "en" ? "Mechatronics and Robotics" : "Mexatronika va robototexnika",
      degree: lang === "ru" ? "Магистратура (Государственный грант / Бюджет)" : lang === "en" ? "Master's Degree (State Budget Grant)" : "Magistratura (Davlat granti / Budget)",
      period: "2026 – " + (lang === "ru" ? "наст. время" : lang === "en" ? "Present" : "hozirgacha"),
      desc: lang === "ru"
        ? "Обучение в магистратуре на бюджетной основе. Исследования в области мехатроники, автономных робототехнических комплексов и систем искусственного интеллекта."
        : lang === "en"
        ? "Master's degree on a full state budget grant. Research in mechatronics, autonomous robotics, embedded microcontrollers, and applied AI systems."
        : "Davlat granti (byudjet) asosida magistratura ta'limi. Mexatronika, robototexnika tizimlari, datchiklar va sun'iy intellekt integratsiyasi bo'yicha ilmiy tadqiqotlar.",
      current: true,
      badge: lang === "ru" ? "Магистратура · Грант" : lang === "en" ? "Master's · State Grant" : "Magistratura · Davlat granti",
      icon: <GraduationCap className="h-5 w-5 text-blue-500" />
    },
    {
      school: lang === "ru" ? "Самаркандский государственный университет им. Шарофа Рашидова (СамГУ)" : lang === "en" ? "Samarkand State University (SamDU)" : "Sharof Rashidov nomidagi Samarqand davlat universiteti (SamDU)",
      location: lang === "ru" ? "Самарканд, Узбекистан" : lang === "en" ? "Samarkand, Uzbekistan" : "Samarqand, O'zbekiston",
      field: lang === "ru" ? "Программная инженерия (Факультет ИИ и цифровых технологий)" : lang === "en" ? "Software Engineering (Faculty of AI & Digital Technologies)" : "Dasturiy injiniring (Sun'iy intellekt va raqamli texnologiyalar fakulteti)",
      degree: lang === "ru" ? "Бакалавр" : lang === "en" ? "Bachelor's Degree" : "Bakalavr",
      period: "2022 – 2026",
      desc: lang === "ru"
        ? "Углубленное изучение алгоритмов, распределенных систем и веб-архитектуры. Активное участие в республиканских и региональных олимпиадах по программированию и математике. Исследования в области ASR (распознавание речи)."
        : lang === "en"
        ? "Core studies in algorithms, distributed systems, and software engineering. Active participant in national and regional Olympiads in programming and mathematics. Published ASR speech recognition research."
        : "Algoritmlar, taqsimlangan tizimlar va dasturiy injiniring. Talabalik davomida dasturlash va matematika bo'yicha Respublika va viloyat fan olimpiadalarida faol ishtirok, o'zbek tili ASR ilmiy tadqiqotlari.",
      current: false,
      olympiad: lang === "ru" ? "Олимпиады по программированию и математике" : lang === "en" ? "Programming & Math Olympiad Participant" : "Dasturlash va matematika olimpiadalari ishtirokchisi",
      badge: lang === "ru" ? "Бакалавриат" : lang === "en" ? "Bachelor's Degree" : "Bakalavr",
      icon: <GraduationCap className="h-5 w-5 text-indigo-500" />
    },
    {
      school: lang === "ru" ? "Академический лицей СамГУ" : lang === "en" ? "Samarkand State University Academic Lyceum" : "Samarqand davlat universiteti Akademik litseyi",
      location: lang === "ru" ? "г. Самарканд, Узбекистан" : lang === "en" ? "Samarkand, Uzbekistan" : "Samarqand shahri, O'zbekiston",
      field: lang === "ru" ? "Точные науки (Математика и Физика)" : lang === "en" ? "Exact Sciences (Mathematics & Physics)" : "Aniq fanlar (Matematika va Fizika)",
      degree: lang === "ru" ? "Диплом академического лицея" : lang === "en" ? "Academic Lyceum" : "Akademik litsey ta'limi",
      period: "2020 – 2022",
      desc: lang === "ru"
        ? "Углубленная подготовка по точным наукам. Регулярное участие в олимпиадах по математике и физике, формирование фундаментального аналитического мышления."
        : lang === "en"
        ? "Advanced analytical curriculum focusing on Mathematics and Physics. Consistent participation in science Olympiads, building strong algorithmic logic."
        : "Aniq fanlar (Matematika, Fizika) bo'yicha chuqurlashtirilgan tayyorgarlik. O'qish davrida fan olimpiadalarida muntazam faol ishtirok etib, fundamental mantiqiy va analitik bilimlar bazasini shakllantirish.",
      current: false,
      olympiad: lang === "ru" ? "Олимпиады по точным наукам (Математика/Физика)" : lang === "en" ? "Exact Sciences Olympiads (Math & Physics)" : "Aniq fanlar (Matematika/Fizika) olimpiadalari",
      badge: lang === "ru" ? "Академический лицей" : lang === "en" ? "Academic Lyceum" : "Akademik litsey",
      icon: <Award className="h-5 w-5 text-purple-500" />
    },
    {
      school: lang === "ru" ? "38-я общеобразовательная средняя школа" : lang === "en" ? "Secondary School No. 38" : "38-umumiy o'rta ta'lim maktabi",
      location: lang === "ru" ? "Самаркандская область, Акдарьинский район" : lang === "en" ? "Oqdaryo district, Samarkand region" : "Samarqand viloyati, Oqdaryo tumani",
      field: lang === "ru" ? "Общее среднее образование" : lang === "en" ? "General Secondary Education" : "Umumiy o'rta ta'lim",
      degree: lang === "ru" ? "Аттестат о среднем образовании" : lang === "en" ? "Secondary Education" : "O'rta ta'lim",
      period: "2011 – 2019",
      desc: lang === "ru"
        ? "Базовое школьное образование. Участие и призовые места на олимпиадах по математике, физике и информатике, заложившие основу инженерного пути."
        : lang === "en"
        ? "Fundamental schooling. Active participant in school and district Olympiads in Mathematics, Physics, and Informatics, sparking passion for engineering."
        : "Fundamental maktab ta'limi. Matematika, fizika va informatika fanlari bo'yicha maktab va tuman olimpiadalari ishtirokchisi, muhandislik va texnologiyalarga ilk qiziqish poydevori.",
      current: false,
      olympiad: lang === "ru" ? "Олимпиады по математике, физике и информатике" : lang === "en" ? "Math, Physics & Informatics Olympiads" : "Matematika, fizika va informatika fan olimpiadalari",
      badge: lang === "ru" ? "Средняя школа" : lang === "en" ? "Secondary School" : "Maktab ta'limi",
      icon: <School className="h-5 w-5 text-amber-500" />
    }
  ], [lang]);

  return (
    <section>
      <div className="flex items-center gap-3 mb-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/25 dark:bg-blue-500">
          <GraduationCap size={20} />
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-slate-100">
            {t("about.education.title")}
          </h2>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {t("about.education.subtitle")}
          </p>
        </div>
      </div>

      <div className="relative border-l-2 border-blue-500/20 dark:border-blue-500/30 ml-4 sm:ml-5 pl-6 sm:pl-8 space-y-8">
        {education.map((edu, idx) => (
          <div key={idx} className="relative group">
            <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-white shadow-md shadow-blue-600/30 dark:border-slate-950 dark:bg-blue-500">
              {edu.icon}
            </div>

            <div className="glass-card rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500/30 hover:shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-lg font-bold text-slate-900 dark:text-slate-100">{edu.school}</h3>
                    {edu.current && (
                      <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                        {t("about.education.current")}
                      </span>
                    )}
                    <span className="inline-flex items-center rounded-lg bg-blue-50 px-2 py-0.5 text-[11px] font-bold text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                      {edu.badge}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-blue-600 dark:text-blue-400">
                    {edu.degree} · <span className="text-slate-700 dark:text-slate-300">{edu.field}</span>
                  </p>
                </div>
                <span className="font-mono text-xs font-semibold text-slate-500 dark:text-slate-400 shrink-0">{edu.period}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{edu.desc}</p>
              {edu.olympiad && (
                <div className="mt-3.5 inline-flex items-center gap-2 rounded-xl bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 text-xs font-semibold text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-300">
                  <Trophy size={13} className="text-amber-500" />
                  <span>{edu.olympiad}</span>
                </div>
              )}
              <div className="mt-4 pt-3.5 border-t border-slate-200/60 dark:border-white/[0.06] flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <MapPin size={12} className="text-blue-500" /> {edu.location}
                </span>
                <span className="font-mono font-medium">{edu.period}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default memo(EducationTimeline);
