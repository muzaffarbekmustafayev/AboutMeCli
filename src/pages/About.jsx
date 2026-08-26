import React, { useMemo } from "react";
import { 
  Briefcase, 
  GraduationCap, 
  ShieldCheck, 
  Sparkles, 
  Cpu, 
  Target, 
  MapPin,
  Code2,
  Layers,
  Zap,
  Bot,
  Globe2,
  ExternalLink,
  BookOpen,
  CheckCircle2,
  Radio,
  Server,
  Database,
  Smartphone,
  Wrench,
  Award,
  School,
  Trophy
} from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "../components/SEO";

function About() {
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

  const skillGroups = useMemo(() => [
    {
      category: "Frontend & Mobile",
      icon: <Smartphone className="h-5 w-5 text-sky-500" />,
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "React Native", "Expo", "HTML5/CSS3"]
    },
    {
      category: "Backend & Real-time",
      icon: <Server className="h-5 w-5 text-emerald-500" />,
      skills: ["Node.js", "Express.js", "FastAPI (Python)", "RESTful APIs", "WebSockets", "WebRTC", "Simple-Peer"]
    },
    {
      category: "Databases",
      icon: <Database className="h-5 w-5 text-amber-500" />,
      skills: ["MongoDB", "PostgreSQL", "SQLAlchemy", "Redis", "Mongoose"]
    },
    {
      category: lang === "ru" ? "Математика и Фундаментальные Науки" : lang === "en" ? "Mathematics & Foundations" : "Matematika & Fundamental Fanlar",
      icon: <Award className="h-5 w-5 text-indigo-500" />,
      skills: [
        "Differensial tenglamalar (ODE/PDE)", "Matematik analiz", "Chiziqli algebra", 
        "Ehtimollar nazariyasi & Statistika", "Diskret matematika & Graflar", "Fizika & Mexatronika dinamikasi"
      ]
    },
    {
      category: "AI, ML & ASR",
      icon: <Bot className="h-5 w-5 text-purple-500" />,
      skills: [
        "Speech-to-Text / ASR", "Whisper", "Wav2Vec 2.0", "VOSK",
        "Computer Vision", "MediaPipe", "TensorFlow.js",
        "LLM & Agents", "Gemini API", "Claude Code", "OpenRouter"
      ]
    },
    {
      category: "Robototexnika & Hardware",
      icon: <Cpu className="h-5 w-5 text-rose-500" />,
      skills: ["Mexatronika asoslari", "ESP32", "Raspberry Pi Zero 2 W", "Microcontroller interfacing", "Sensors & Actuators"]
    },
    {
      category: "DevOps & Server",
      icon: <Wrench className="h-5 w-5 text-cyan-500" />,
      skills: ["Linux (Ubuntu/Debian)", "Nginx", "Reverse Proxy", "SSL (Let's Encrypt)", "Git & GitHub", "CI/CD"]
    }
  ], [lang]);

  const projectsAndResearch = useMemo(() => [
    {
      title: lang === "ru" ? "Исследования ASR для узбекского языка (Speech-to-Text)" : lang === "en" ? "Uzbek ASR Research (Speech-to-Text)" : "O'zbek tili ASR tadqiqotlari (Speech-to-Text)",
      tag: "Research & Publication",
      desc: lang === "ru"
        ? "Сравнительный анализ моделей Whisper, Wav2Vec2 и VOSK на базе открытого датасета Mozilla Common Voice. Публикация научных статей и датасетов на платформе Zenodo."
        : lang === "en"
        ? "Comparative benchmark of Whisper, Wav2Vec2, and VOSK models for the Uzbek language using Mozilla Common Voice. Published research papers and open datasets on Zenodo."
        : "Mozilla Common Voice ochiq ma'lumotlar to'plami asosida Whisper, Wav2Vec2 va VOSK modellarining solishtirma tahlili. Ilmiy maqolalar va ochiq ma'lumotlar to'plamini Zenodo platformasida nashr etish.",
      doi: "10.5281/zenodo.21299321",
      doiUrl: "https://doi.org/10.5281/zenodo.21299321",
      icon: <BookOpen className="h-5 w-5 text-purple-500" />
    },
    {
      title: "Sammeet (Real-time Video-konferensiya tizimi)",
      tag: "WebRTC & WebSockets",
      desc: lang === "ru"
        ? "Система видеоконференций реального времени на базе WebRTC, Simple-Peer и WebSockets. Полностью развернута на Linux-сервере с Nginx reverse proxy и SSL-сертификатами."
        : lang === "en"
        ? "Real-time video conferencing platform built on WebRTC, Simple-Peer, and WebSockets. Deployed on Linux with Nginx reverse proxy and SSL encryption."
        : "WebRTC, Simple-Peer va WebSockets arxitekturasida real vaqtda audio/video oqimini uzatish. Linux serverida Nginx reverse proxy va SSL sertifikatlari bilan to'liq deploy qilingan.",
      icon: <Radio className="h-5 w-5 text-blue-500" />
    },
    {
      title: "Tourism for Everyone (Inklyuziv turizm platformasi)",
      tag: "Social Impact & Web",
      desc: lang === "ru"
        ? "Веб-платформа для людей с ограниченными возможностями здоровья, предоставляющая удобную инклюзивную маршрутизацию и интерактивные карты доступных объектов."
        : lang === "en"
        ? "Interactive accessibility platform offering specialized routing and barrier-free interactive maps for travelers with disabilities."
        : "Imkoniyati cheklangan shaxslar uchun qulay marshrutlash va interaktiv xaritalarni taqdim etuvchi veb-platforma.",
      icon: <Globe2 className="h-5 w-5 text-emerald-500" />
    },
    {
      title: "RuralDoc Connect (HealthTech loyihasi)",
      tag: "HealthTech / Telemedicine",
      desc: lang === "ru"
        ? "Система телемедицины для сельских районов и оптимизации маршрутов мобильных медицинских бригад (Участник акселератора Startup Wars)."
        : lang === "en"
        ? "Telemedicine platform optimizing mobile medical team routes and healthcare delivery in remote rural regions (Startup Wars accelerator participant)."
        : "Qishloq joylarida telemeditsina va tibbiy brigadalarning harakatlanish yo'nalishlarini optimallashtirish tizimi (Startup Wars ishtirokchisi).",
      icon: <ShieldCheck className="h-5 w-5 text-amber-500" />
    },
    {
      title: "AI & Telegram Avtomatlashtirish Botlari",
      tag: "AI Agents & Automation",
      desc: lang === "ru"
        ? "Интеллектуальные помощники на базе Node.js (grammY) и LLM API (Gemini, Claude, OpenRouter) для автоматического анализа документов (Word, тексты) и бизнес-процессов."
        : lang === "en"
        ? "Intelligent assistant bots powered by Node.js (grammY) and LLM APIs (Gemini, Claude, OpenRouter) for automated document analysis and business workflow automation."
        : "Node.js (grammY) va LLM API'lari asosida hujjatlarni (Word, matnlar) tahlil qiluvchi va avtomatlashtiruvchi intellektual yordamchilar.",
      icon: <Bot className="h-5 w-5 text-cyan-500" />
    }
  ], [lang]);

  const languages = useMemo(() => [
    { name: "O'zbek tili", level: "Ona tili / Native", badge: "Native" },
    { name: "Ingliz tili", level: "Professional working (CEFR B2)", badge: "CEFR B2" },
    { name: "Rus tili", level: "Professional working", badge: "Fluent" }
  ], []);

  return (
    <>
      <SEO
        title={t("about.title", { defaultValue: "Men haqimda" })}
        description="Muzaffarbek Mustafayev - Senior Software Engineer, AI & Speech Technologies Researcher"
        path="/about"
      />

      <div className="section-shell min-h-screen px-4 pt-28 pb-20 text-slate-700 dark:text-slate-300 sm:px-6 sm:pt-32 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          
          {/* Header Profile Hero */}
          <header className="mb-16 space-y-6 max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-blue-700 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-300">
              <Sparkles size={14} />
              Senior Software Engineer · AI & Systems Researcher
            </div>

            <h1 className="font-display text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl lg:text-6xl">
              Muzaffarbek Mustafayev
            </h1>

            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300 sm:text-xl">
              {t("about.intro")}
            </p>

            {/* Quick Meta Row */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200">
                <MapPin size={14} className="text-blue-500" />
                Samarqand, O'zbekiston · Tomsk, Rossiya
              </span>
              <a
                href="https://muzaffarbek.uz"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-blue-200/80 bg-blue-50/80 px-3.5 py-1.5 text-xs font-semibold text-blue-700 transition-colors hover:bg-blue-100 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-300"
              >
                <Globe2 size={14} />
                muzaffarbek.uz
                <ExternalLink size={12} />
              </a>
            </div>
          </header>

          <div className="grid gap-14 lg:grid-cols-12">
            
            {/* Main Column (8 cols) */}
            <div className="space-y-16 lg:col-span-8">
              
              {/* Ta'lim (Education) Section - Chronological Timeline */}
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
                    <div
                      key={idx}
                      className="relative group"
                    >
                      {/* Timeline Node Icon Indicator */}
                      <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-white shadow-md shadow-blue-600/30 dark:border-slate-950 dark:bg-blue-500">
                        {edu.icon}
                      </div>

                      {/* Card Body */}
                      <div className="glass-card rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500/30 hover:shadow-lg">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-slate-100">
                                {edu.school}
                              </h3>
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

                          <span className="font-mono text-xs font-semibold text-slate-500 dark:text-slate-400 shrink-0">
                            {edu.period}
                          </span>
                        </div>

                        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                          {edu.desc}
                        </p>

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
                          <span className="font-mono font-medium">
                            {edu.period}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Texnik Ko'nikmalar (Technical Skills) Section */}
              <section>
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/25 dark:bg-indigo-500">
                    <Code2 size={20} />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-slate-100">
                      {t("about.skills.title")}
                    </h2>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      {t("about.skills.subtitle")}
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  {skillGroups.map((group, idx) => (
                    <div
                      key={idx}
                      className="glass-card rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500/20"
                    >
                      <div className="flex items-center gap-2.5 mb-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 dark:bg-white/[0.06]">
                          {group.icon}
                        </div>
                        <h3 className="font-display text-sm font-bold text-slate-900 dark:text-slate-100">
                          {group.category}
                        </h3>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {group.skills.map((skill) => (
                          <span
                            key={skill}
                            className="inline-flex rounded-lg border border-slate-200/80 bg-white/80 px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-blue-400 hover:text-blue-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:border-blue-400 dark:hover:text-blue-400 cursor-default"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Asosiy Loyihalar va Ilmiy Faoliyat Section */}
              <section>
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-600 text-white shadow-lg shadow-purple-600/25 dark:bg-purple-500">
                    <Layers size={20} />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-slate-100">
                      {t("about.projects.title")}
                    </h2>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      {t("about.projects.subtitle")}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {projectsAndResearch.map((item, idx) => (
                    <div
                      key={idx}
                      className="glass-card rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-purple-500/30 hover:shadow-lg"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                            {item.icon}
                          </div>
                          <div>
                            <h3 className="font-display text-base font-bold text-slate-900 dark:text-slate-100">
                              {item.title}
                            </h3>
                            <span className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                              {item.tag}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        {item.desc}
                      </p>

                      {item.doi && (
                        <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-white/[0.06] flex items-center justify-between text-xs">
                          <span className="font-mono text-slate-500 dark:text-slate-400">
                            DOI: {item.doi}
                          </span>
                          <a
                            href={item.doiUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-semibold text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 transition-colors"
                          >
                            <span>{t("about.projects.zenodo")}</span>
                            <ExternalLink size={13} />
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

            </div>

            {/* Sidebar Column (4 cols) */}
            <aside className="space-y-8 lg:col-span-4">
              
              {/* Philosophy Card */}
              <div className="rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 p-7 text-white shadow-2xl shadow-blue-700/25">
                <div className="flex items-center gap-2 text-blue-200 text-xs font-bold uppercase tracking-wider">
                  <Target size={16} />
                  <span>{t("about.missionLabel")}</span>
                </div>
                <blockquote className="mt-5 font-display text-2xl font-bold leading-snug text-white">
                  "{t("about.quote")}"
                </blockquote>
                <p className="mt-5 text-sm leading-relaxed text-blue-100/85">
                  {t("about.mission")}
                </p>
              </div>

              {/* Tillar (Languages) Card */}
              <div className="glass-card rounded-3xl p-6 shadow-sm">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-5">
                  <Globe2 size={18} />
                  <h3 className="text-xs font-bold uppercase tracking-wider">{t("about.sidebar.languages")}</h3>
                </div>

                <div className="space-y-3">
                  {languages.map((l) => (
                    <div
                      key={l.name}
                      className="flex items-center justify-between rounded-xl border border-slate-200/60 bg-slate-50/60 p-3 dark:border-white/[0.06] dark:bg-white/[0.03]"
                    >
                      <div>
                        <span className="font-semibold text-sm text-slate-800 dark:text-slate-200 block">
                          {l.name}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {l.level}
                        </span>
                      </div>
                      <span className="inline-flex rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-bold text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                        {l.badge}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Focus Pillars Card */}
              <div className="glass-card rounded-3xl p-6 shadow-sm">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                  {t("about.sidebar.specialties")}
                </h3>
                <div className="space-y-3 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50/80 dark:bg-white/[0.03]">
                    <CheckCircle2 size={15} className="text-emerald-500" />
                    <span>Real-time WebRTC &amp; Audio/Video Streams</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50/80 dark:bg-white/[0.03]">
                    <CheckCircle2 size={15} className="text-purple-500" />
                    <span>Speech-to-Text &amp; ASR AI Engineering</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50/80 dark:bg-white/[0.03]">
                    <CheckCircle2 size={15} className="text-blue-500" />
                    <span>Full-Stack Architecture (React/Node/FastAPI)</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50/80 dark:bg-white/[0.03]">
                    <CheckCircle2 size={15} className="text-cyan-500" />
                    <span>Mexatronika &amp; Embedded Hardware</span>
                  </div>
                </div>
              </div>

            </aside>

          </div>
        </div>
      </div>
    </>
  );
}

export default About;
