const SUPPORTED_ARTICLE_LANGUAGES = new Set(["uz", "en", "ru"]);

export const getArticleLanguage = (language = "uz") => {
  const baseLanguage = String(language).split("-")[0].toLowerCase();
  return SUPPORTED_ARTICLE_LANGUAGES.has(baseLanguage) ? baseLanguage : "en";
};

export const getArticleCopy = (article, t, language) => {
  const selectedLanguage = getArticleLanguage(language);

  return {
    title: t(`articles.items.${article.i18nKey}.title`, {
      defaultValue: article.titles?.[selectedLanguage] || article.defaultTitle,
    }),
    description: t(`articles.items.${article.i18nKey}.description`, {
      defaultValue: article.descriptions?.[selectedLanguage] || article.defaultDesc,
    }),
    category: t(`articles.categories.${article.categoryKey}`, {
      defaultValue: article.category,
    }),
    readTime: t("articles.readTime", {
      count: article.readTimeMinutes,
      defaultValue: `${article.readTimeMinutes} min read`,
    }),
    content:
      article.content?.[selectedLanguage] ??
      article.content?.uz ??
      article.content?.en ??
      [],
  };
};

export const articles = [
  {
    id: "digitization-mechanisms-regional-tourism-navoiy",
    i18nKey: "tourismDigitizationNavoiy",
    defaultTitle:
      "DIGITIZATION MECHANISMS OF REGIONAL TOURISM POTENTIAL: INTEGRATION OF HISTORICAL OBJECTS IN NAVOIY REGION AND THE DIGITAL ECOSYSTEM",
    defaultDesc:
      "This scientific paper investigates the digitization mechanisms of regional tourism potential and the creation of an integrated digital ecosystem in the Navoiy region of Uzbekistan, focusing on the Nurota, Qiziltepa, and Xatirchi districts.",
    titles: {
      uz: "Mintaqaviy turizm salohiyatini raqamlashtirish mexanizmlari: Navoiy viloyati tarixiy ob'ektlarini raqamli ekotizimga integratsiyalash",
      en: "DIGITIZATION MECHANISMS OF REGIONAL TOURISM POTENTIAL: INTEGRATION OF HISTORICAL OBJECTS IN NAVOIY REGION AND THE DIGITAL ECOSYSTEM",
      ru: "Механизмы цифровизации регионального туристического потенциала: интеграция исторических объектов Навоийской области в цифровую экосистему",
    },
    descriptions: {
      uz: "Navoiy viloyatining Nurota, Qiziltepa va Xatirchi tumanlaridagi 42 ta tarixiy ob'ektni raqamlashtirish, WCAG 2.1 inklyuzivlik tamoyillari, MapLibre GL JS geonavigatsiyasi va Schema.org semantik ekotizimi.",
      en: "Investigating digitization mechanisms of regional tourism potential, WCAG 2.1 accessibility, MapLibre GL JS geonavigation, and Schema.org metadata across 42 historical attractions in Navoiy region.",
      ru: "Исследование механизмов цифровизации регионального турпотенциала, доступности по WCAG 2.1, геонавигации на MapLibre GL JS и семантической разметки Schema.org на примере 42 объектов Навоийской области.",
    },
    category: "Raqamlashtirish & Turizm",
    categoryKey: "digitization",
    readTimeMinutes: 7,
    date: "2026-02-20",
    authors: "Asliddin Sayidqulov, Muzaffar Mustafayev",
    authorsList: [
      {
        name: "Asliddin Sayidqulov",
        affiliation: "Sharof Rashidov nomidagi Samarqand davlat universiteti",
      },
      {
        name: "Muzaffar Mustafayev",
        affiliation: "Sharof Rashidov nomidagi Samarqand davlat universiteti",
        orcid: "0009-0000-8225-5370",
        orcidUrl: "https://orcid.org/0009-0000-8225-5370",
      },
    ],
    affiliation: "Samarqand davlat universiteti (Sharof Rashidov nomidagi)",
    affiliationEn: "Samarkand State University named after Sharof Rashidov",
    journal: "Science and Innovation (International Scientific Journal, ISSN: 2181-3337)",
    doi: "10.5281/zenodo.22027878",
    doiUrl: "https://doi.org/10.5281/zenodo.22027878",
    articleUrl: "https://scientists.uz/article/id/10919",
    pdfUrl: "https://scientists.uz/uploads/202602/article_1787222722.pdf",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80",
    tags: [
      "Accessible Tourism",
      "MapLibre GL JS",
      "WCAG 2.1",
      "Schema.org",
      "Digital Ecosystem",
      "Navoiy Region",
      "Rehabilitational Tourism",
    ],
    citations: {
      apa: "Sayidqulov, A., & Mustafayev, M. (2026). DIGITIZATION MECHANISMS OF REGIONAL TOURISM POTENTIAL: INTEGRATION OF HISTORICAL OBJECTS IN NAVOIY REGION AND THE DIGITAL ECOSYSTEM. Science and Innovation, International Scientific Journal, ISSN: 2181-3337. https://doi.org/10.5281/zenodo.22027878",
      bibtex: `@article{sayidqulov2026digitization,
  title={DIGITIZATION MECHANISMS OF REGIONAL TOURISM POTENTIAL: INTEGRATION OF HISTORICAL OBJECTS IN NAVOIY REGION AND THE DIGITAL ECOSYSTEM},
  author={Sayidqulov, Asliddin and Mustafayev, Muzaffar},
  journal={Science and Innovation},
  issn={2181-3337},
  year={2026},
  doi={10.5281/zenodo.22027878},
  url={https://doi.org/10.5281/zenodo.22027878}
}`,
    },
    content: {
      uz: [
        {
          type: "heading",
          text: "Annotatsiya va Tadqiqot Dolzarbligi",
        },
        {
          type: "paragraph",
          text: "Ushbu ilmiy maqolada O'zbekistonning Navoiy viloyatidagi Nurota, Qiziltepa va Xatirchi tumanlari misolida mintaqaviy turizm salohiyatini raqamlashtirish mexanizmlari va integratsiyalashgan raqamli ekotizim yaratish masalalari chuqur tahlil qilingan. Jismoniy, ko'rish, eshitish va kognitiv cheklovlarga ega bo'lgan shaxslar, keksalar hamda oilaviy sayyohlar uchun to'siqsiz turizm (accessible tourism) muhitini yaratish bo'yicha WCAG 2.1 va POUR tamoyillariga asoslangan raqamli yechimlar ishlab chiqilgan.",
        },
        {
          type: "subheading",
          text: "Arxitektura va WCAG 2.1 POUR Tamoyillari",
        },
        {
          type: "paragraph",
          text: "Raqamli platformaning dasturiy ta'minot arxitekturasi barcha toifadagi foydalanuvchilar uchun qulaylikni ta'minlashga qaratilgan:",
        },
        {
          type: "list",
          items: [
            "Perceivable (Idrok etiluvchi): Har bir media va tasvir uchun aniq muqobil matnlar (alt tags), ovozli tavsiflar hamda yuqori kontrastli interfeys rejimlari.",
            "Operable (Boshqariluvchi): Klaviaturadan to'liq boshqarish imkoniyati, qulay sensorli teginish zonalari (minimum 48x48px) va ekranni o'quvchi vositalar (Screen Readers) bilan to'liq uyg'unlik.",
            "Understandable (Tushunarli): Intuitiv navigatsiya, barqaror vizual arxitektura va soddalashtirilgan kognitiv tushunish qatlamlari.",
            "Robust (Barqaror): Har qanday qurilma, brauzer va yordamchi texnologiyalar (assistive technologies) bilan uzluksiz integratsiya.",
          ],
        },
        {
          type: "subheading",
          text: "Geonavigatsiya va Semantik Metadata",
        },
        {
          type: "paragraph",
          text: "Tizimda MapLibre GL JS yordamida interaktiv vektorli xaritalash joriy etildi. Bu foydalanuvchining joylashuvini real vaqtda aniqlab, 42 ta tarixiy-madaniy ob'ektning kirish yo'llari, panduslar holati va sanitariya-gigiyena punktlarining mosligini interaktiv xaritada ko'rsatadi.",
        },
        {
          type: "code",
          language: "json",
          code: `{
  "@context": "https://schema.org",
  "@type": "TouristAttraction",
  "name": "Chashma Tarixiy-Me'moriy Majmuasi",
  "description": "Nurota tumanidagi qadimiy chashma va me'moriy yodgorlik",
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 40.5614,
    "longitude": 65.6886
  },
  "isAccessibleForFree": true,
  "publicAccess": true,
  "amenityFeature": [
    {
      "@type": "LocationFeatureSpecification",
      "name": "Wheelchair Accessible Ramp",
      "value": true
    }
  ]
}`,
        },
        {
          type: "subheading",
          text: "Empirik Natijalar va Ijtimoiy-Iqtisodiy Samaradorlik",
        },
        {
          type: "paragraph",
          text: "42 ta tarixiy ob'ektni xaritalashtirish natijasida raqamli ekotizim nafaqat inklyuzivlikni oshirdi, balki mintaqaviy iqtisodiy diversifikatsiyaga, mahalliy hamjamiyatlarni jalb qilishga hamda reabilitatsion turizmning fazoviy geografiyasini kengaytirishga xizmat qilishi isbotlandi.",
        },
        {
          type: "quote",
          text: "Raqamli ekotizim madaniy meros ob'ektlariga teng huquqli kirish imkonini ta'minlab, mintaqaviy turizm salohiyatini yangi bosqichga olib chiqadi.",
        },
      ],
      en: [
        {
          type: "heading",
          text: "Abstract & Research Context",
        },
        {
          type: "paragraph",
          text: "This scientific paper investigates the digitization mechanisms of regional tourism potential and the creation of an integrated digital ecosystem in the Navoiy region of Uzbekistan, focusing on the Nurota, Qiziltepa, and Xatirchi districts. To ensure accessible, barrier-free tourism for individuals with physical, visual, auditory, and cognitive impairments, seniors, and family travelers, digital solutions based on international Web Content Accessibility Guidelines (WCAG 2.1) and POUR principles were developed.",
        },
        {
          type: "subheading",
          text: "Software Architecture & POUR Accessibility",
        },
        {
          type: "list",
          items: [
            "Perceivable: Semantic markup with rich alt tags, multi-sensory feedback, and high contrast visibility options.",
            "Operable: Keyboard-accessible UI controls with minimum 48x48px touch targets and full screen reader compatibility.",
            "Understandable: Clear visual hierarchy, multilingual cognitive clarity, and error recovery guidance.",
            "Robust: Strict HTML5/ARIA semantic compliance ensuring reliable support across assistive technologies.",
          ],
        },
        {
          type: "subheading",
          text: "Geonavigation & Schema.org Semantic Data",
        },
        {
          type: "paragraph",
          text: "High-performance vector geonavigation was implemented with MapLibre GL JS, allowing real-time spatial orientation across 42 surveyed cultural heritage landmarks with accessibility telemetry, ramps, and pathway slope gradients.",
        },
        {
          type: "code",
          language: "json",
          code: `{
  "@context": "https://schema.org",
  "@type": "TouristAttraction",
  "name": "Chashma Historical Architectural Complex",
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 40.5614,
    "longitude": 65.6886
  },
  "amenityFeature": [
    {
      "@type": "LocationFeatureSpecification",
      "name": "Wheelchair Accessible Ramp",
      "value": true
    }
  ]
}`,
        },
        {
          type: "subheading",
          text: "Socio-Economic Efficacy",
        },
        {
          type: "paragraph",
          text: "Field mapping across 42 historical sites demonstrated the viability of the digital ecosystem in empowering local communities, diversifying rural economic streams, and expanding the spatial footprint of rehabilitational tourism in Uzbekistan.",
        },
      ],
      ru: [
        {
          type: "heading",
          text: "Аннотация и Актуальность Исследования",
        },
        {
          type: "paragraph",
          text: "В данной научной статье исследуются механизмы цифровизации регионального туристического потенциала и создание интегрированной цифровой экосистемы в Навоийской области Узбекистана (на примере Нуратинского, Кызылтепинского и Хатырчинского районов). Разработаны цифровые решения на основе международных рекомендаций WCAG 2.1 и принципов POUR для обеспечения безбарьерного туризма.",
        },
        {
          type: "subheading",
          text: "Принципы POUR и Программная Архитектура",
        },
        {
          type: "list",
          items: [
            "Perceivable (Воспринимаемость): Наличие текстовых альтернатив для любого нетекстового контента и режим высокой контрастности.",
            "Operable (Управляемость): Полная поддержка управления с клавиатуры и совместимость со скринридерами.",
            "Understandable (Понятность): Логичная навигация, понятный интерфейс и адаптация когнитивной нагрузки.",
            "Robust (Надежность): Надежная работа на мобильных и десктопных устройствах с поддержкой ассистивных технологий.",
          ],
        },
        {
          type: "subheading",
          text: "Геонавигация MapLibre GL JS и Schema.org",
        },
        {
          type: "paragraph",
          text: "Интерактивная картография на базе MapLibre GL JS в реальном времени отображает доступность маршрутов, наличие пандусов и уклонов для 42 памятников культурного наследия региона.",
        },
      ],
    },
  },
  {
    id: "ai-innovative-technologies-accessible-tourism",
    i18nKey: "aiAccessibleTourism",
    defaultTitle:
      "THE ROLE OF ARTIFICIAL INTELLIGENCE AND INNOVATIVE TECHNOLOGIES IN DEVELOPING ACCESSIBLE TOURISM: AUTOMATED ROUTE GENERATION AND SERVICE QUALITY OPTIMIZATION IN REGIONAL ECOSYSTEMS",
    defaultDesc:
      "The article was prepared on the basis of an innovative project within the framework of state scientific and technical programs IL-9124093892 on the topic 'Development of methodological foundations for organizing inclusive tourism'.",
    titles: {
      uz: "Inklyuziv turizmni rivojlantirishda sun'iy intellekt va innovatsion texnologiyalarning roli: avtomatlashtirilgan marshrut tuzish va regional ekotizimlarda xizmat sifatini optimallashtirish",
      en: "THE ROLE OF ARTIFICIAL INTELLIGENCE AND INNOVATIVE TECHNOLOGIES IN DEVELOPING ACCESSIBLE TOURISM: AUTOMATED ROUTE GENERATION AND SERVICE QUALITY OPTIMIZATION IN REGIONAL ECOSYSTEMS",
      ru: "Роль искусственного интеллекта и инновационных технологий в развитии инклюзивного туризма: автоматизированное построение маршрутов и оптимизация сервиса в региональных экосистемах",
    },
    descriptions: {
      uz: "IL-9124093892 davlat granti: Multi-Agent GeoAI tizimi, gibrid Dijkstra va A* to'siqlarni dinamik aylanib o'tish marshrutlash algoritmi, Human-in-the-Loop moderatsiyasi, Node.js va MongoDB 2dsphere backend.",
      en: "State research grant IL-9124093892: Multi-agent geospatial AI (MAS GeoAI), hybrid Dijkstra & A* dynamic barrier-avoidance routing, Human-in-the-Loop verification, Node.js/MongoDB 2dsphere backend.",
      ru: "Госпроект IL-9124093892: Мультиагентный GeoAI, гибридная маршрутизация Дейкстры и A* с динамическим обходом барьеров, валидация Human-in-the-Loop, бэкенд Node.js и MongoDB 2dsphere.",
    },
    category: "GeoAI & Multi-Agent Tizimlar",
    categoryKey: "geoai",
    grant: "IL-9124093892",
    grantTitle:
      "Navoiy viloyatining Qiziltepa, Nurota va Xatirchi tumanlari misolida inklyuziv turizmni tashkil etishning uslubiy asoslarini ishlab chiqish",
    readTimeMinutes: 8,
    date: "2026-03-01",
    authors: "Asliddin Sayidqulov, Muzaffar Mustafayev",
    authorsList: [
      {
        name: "Asliddin Sayidqulov",
        affiliation: "Sharof Rashidov nomidagi Samarqand davlat universiteti",
      },
      {
        name: "Muzaffar Mustafayev",
        affiliation: "Sharof Rashidov nomidagi Samarqand davlat universiteti",
        orcid: "0009-0000-8225-5370",
        orcidUrl: "https://orcid.org/0009-0000-8225-5370",
      },
    ],
    affiliation: "Samarqand davlat universiteti (Sharof Rashidov nomidagi)",
    affiliationEn: "Samarkand State University named after Sharof Rashidov",
    journal: "Science and Innovation (International Scientific Journal, ISSN: 2181-3337)",
    doi: "10.5281/zenodo.22028185",
    doiUrl: "https://doi.org/10.5281/zenodo.22028185",
    articleUrl: "https://scientists.uz/article/id/10921",
    pdfUrl: "https://scientists.uz/uploads/202603/article_1787224687.pdf",
    image:
      "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=80",
    tags: [
      "GeoAI",
      "Multi-Agent Systems",
      "Dijkstra & A*",
      "Human-in-the-Loop",
      "MongoDB 2dsphere",
      "Accessible Tourism",
      "Edge-AI",
      "State Grant IL-9124093892",
    ],
    citations: {
      apa: "Sayidqulov, A., & Mustafayev, M. (2026). THE ROLE OF ARTIFICIAL INTELLIGENCE AND INNOVATIVE TECHNOLOGIES IN DEVELOPING ACCESSIBLE TOURISM: AUTOMATED ROUTE GENERATION AND SERVICE QUALITY OPTIMIZATION IN REGIONAL ECOSYSTEMS. Science and Innovation, International Scientific Journal, ISSN: 2181-3337. https://doi.org/10.5281/zenodo.22028185",
      bibtex: `@article{sayidqulov2026roleofai,
  title={THE ROLE OF ARTIFICIAL INTELLIGENCE AND INNOVATIVE TECHNOLOGIES IN DEVELOPING ACCESSIBLE TOURISM: AUTOMATED ROUTE GENERATION AND SERVICE QUALITY OPTIMIZATION IN REGIONAL ECOSYSTEMS},
  author={Sayidqulov, Asliddin and Mustafayev, Muzaffar},
  journal={Science and Innovation},
  issn={2181-3337},
  year={2026},
  note={Prepared under state scientific project IL-9124093892},
  doi={10.5281/zenodo.22028185},
  url={https://doi.org/10.5281/zenodo.22028185}
}`,
    },
    content: {
      uz: [
        {
          type: "heading",
          text: "Davlat Ilmiy Loyihasi IL-9124093892 va Annotatsiya",
        },
        {
          type: "paragraph",
          text: "Ushbu ilmiy maqola IL-9124093892 raqamli 'Navoiy viloyatining Qiziltepa, Nurota va Xatirchi tumanlari misolida inklyuziv turizmni tashkil etishning uslubiy asoslarini ishlab chiqish' mavzusidagi davlat ilmiy-texnik dasturlari doirasida bajarilgan innovatsion loyiha asosida tayyorlangan. Tadqiqot markazida markazlashtirilmagan ko'p agentli geofazoviy sun'iy intellekt (MAS GeoAI) va qurilmaning o'zida ishlovchi (on-device) kognitiv shaxsiylashtirish algoritmlari yotadi.",
        },
        {
          type: "subheading",
          text: "Gibrid Dijkstra va A* Marshrutlash Modeli",
        },
        {
          type: "paragraph",
          text: "Tadqiqotning bosh muhandislik masalasi — Navoiy viloyatining murakkab relyefli Nurota, Qiziltepa va Xatirchi tumanlarida 42 ta yirik madaniy meros ob'ektlarining tarqoq joylashganligidir. Jismoniy, sensor va kognitiv to'siqlarni bartaraf etish uchun Dijkstra va A* algoritmlarining to'siqlarni dinamik aylanib o'tish bilan uyg'unlashtirilgan gibrid matematik modeli yaratildi.",
        },
        {
          type: "subheading",
          text: "Human-in-the-Loop Moderatsiyasi",
        },
        {
          type: "paragraph",
          text: "Sun'iy intellekt tavsiya tizimlarida eng xavfli jihat — algoritmik gallyutsinatsiyalar tufayli nogironligi bo'lgan shaxsni o'tib bo'lmaydigan to'siq yoki zinapoyaga yo'naltirish xavfidir. Shu sababli tizimga doimiy ravishda joylardagi moderatorlar tomonidan yo'l holati va to'siqlarni tasdiqlab turuvchi 'Human-in-the-Loop' tekshiruv mexanizmi kiritildi.",
        },
        {
          type: "code",
          language: "javascript",
          code: `// MongoDB 2dsphere sferik geofazoviy yaqinlik so'rovi
const accessibleLandmarks = await Landmark.find({
  location: {
    $near: {
      $geometry: {
        type: "Point",
        coordinates: [userLongitude, userLatitude]
      },
      $maxDistance: 25000 // 25 km radius
    }
  },
  "accessibility.hasWheelchairRamp": true,
  "accessibility.maxInclinePercent": { $lte: 8 },
  "moderation.isVerifiedByHuman": true
}).limit(10);`,
        },
        {
          type: "subheading",
          text: "Texnologik Stak va Arxitektura",
        },
        {
          type: "list",
          items: [
            "Backend: Node.js va Express.js arxitekturasi, yuqori parallel so'rovlarni <120ms ichida bajarish.",
            "Geofazoviy ma'lumotlar bazasi: MongoDB 2dsphere sferik koordinatalar indeksi va koordinatalar geometriyasi.",
            "Veb-portal va Mobil Ilova: React.js veb-platformasi va ekranni o'qish vositalari (VoiceOver, TalkBack) hamda dinamik shrift masshtablanishiga optimallashtirilgan React Native mobil ilovasi.",
          ],
        },
        {
          type: "subheading",
          text: "Empirik Natijalar va Iqtisodiy Samaradorlik",
        },
        {
          type: "paragraph",
          text: "Maydon sinovlari natijasida ekotizim sayyohlar oqimini samarali qayta taqsimlashga erishdi: pilot etno-qishloqlarda sayyohlarning o'rtacha qolish muddati 1.2 kundan 2.8 kunga uzaydi. Bu esa mahalliy qishloq xonadonlarining o'rtacha daromadlarini 42.4% ga oshirdi.",
        },
        {
          type: "quote",
          text: "Yuqori yuklamada <120ms kechikish bilan ishlovchi gibrid GeoAI marshrutlash modeli inklyuziv turizmning global barqaror andozasini yaratadi.",
        },
      ],
      en: [
        {
          type: "heading",
          text: "State Scientific Project IL-9124093892 & Abstract",
        },
        {
          type: "paragraph",
          text: "Prepared within state scientific and technical grant IL-9124093892 ('Development of methodological foundations for organizing inclusive tourism'), this paper investigates regional tourism potential through decentralized multi-agent geospatial artificial intelligence (MAS GeoAI) and on-device cognitive personalization across the Nurota, Qiziltepa, and Xatirchi districts of the Navoiy region.",
        },
        {
          type: "subheading",
          text: "Hybrid Dijkstra & A* Dynamic Routing",
        },
        {
          type: "paragraph",
          text: "To overcome physical, sensory, and cognitive barriers across 42 widely dispersed cultural heritage monuments, a modified hybrid model combining Dijkstra and A* algorithms with dynamic obstacle avoidance was engineered.",
        },
        {
          type: "subheading",
          text: "Human-in-the-Loop Validation Mechanism",
        },
        {
          type: "paragraph",
          text: "A Human-in-the-Loop validation pipeline was incorporated to prevent algorithmic routing hallucinations and guarantee that routes recommended to travelers with mobility challenges are continuously verified by on-site moderators.",
        },
        {
          type: "code",
          language: "javascript",
          code: `// MongoDB 2dsphere spherical geospatial proximity query
const accessibleLandmarks = await Landmark.find({
  location: {
    $near: {
      $geometry: {
        type: "Point",
        coordinates: [userLongitude, userLatitude]
      },
      $maxDistance: 25000
    }
  },
  "accessibility.hasWheelchairRamp": true,
  "moderation.isVerifiedByHuman": true
}).limit(10);`,
        },
        {
          type: "subheading",
          text: "Empirical Results",
        },
        {
          type: "paragraph",
          text: "Field deployment demonstrated successful tourist flow redistribution, increasing average tourist stays from 1.2 to 2.8 days and lifting rural household incomes by 42.4% in pilot ethno-villages.",
        },
      ],
      ru: [
        {
          type: "heading",
          text: "Государственный Научный Проект IL-9124093892 и Аннотация",
        },
        {
          type: "paragraph",
          text: "Статья подготовлена в рамках государственного научного гранта IL-9124093892 «Разработка методологических основ организации инклюзивного туризма (на примере Кызылтепинского, Нуратинского и Хатырчинского районов Навоийской области)». Исследуется оптимизация регионального турпотенциала на базе мультиагентного GeoAI и когнитивной персонализации.",
        },
        {
          type: "subheading",
          text: "Гибридный Алгоритм Маршрутизации Дейкстры и A*",
        },
        {
          type: "paragraph",
          text: "Для пространственно распределенных 42 памятников истории разработана математическая модель, объединяющая достоинства алгоритмов Дейкстры и A* с динамическим обходом физических барьеров.",
        },
        {
          type: "subheading",
          text: "Механизм Human-in-the-Loop",
        },
        {
          type: "paragraph",
          text: "Интегрирован модуль валидации с участием операторов на местах, предотвращающий галлюцинации алгоритма и гарантирующий точность безбарьерных путей для туристов с инвалидностью.",
        },
      ],
    },
  },
  {
    id: "hybrid-geospatial-ai-models-accessible-tourism",
    i18nKey: "hybridGeoAi",
    defaultTitle:
      "NOGIRONLIGI BO‘LGAN SAYYOHLAR UCHUN OPTIMAL MARSHRUTLARNI SHAKLLANTIRISHDA GIBRID GEOFAZOVIY SUN’IY INTELLEKT MODELLARI",
    defaultDesc:
      "Maqolada inklyuziv turizmni rivojlantirishda sun’iy intellektga (SI) asoslangan geofazoviy tavsiya tizimlarining roli inson markazli loyihalash tamoyillari asosida tahlil qilinadi.",
    titles: {
      uz: "NOGIRONLIGI BO‘LGAN SAYYOHLAR UCHUN OPTIMAL MARSHRUTLARNI SHAKLLANTIRISHDA GIBRID GEOFAZOVIY SUN’IY INTELLEKT MODELLARI",
      en: "HYBRID GEOSPATIAL ARTIFICIAL INTELLIGENCE MODELS FOR OPTIMAL ROUTE GENERATION FOR TOURISTS WITH DISABILITIES",
      ru: "ГИБРИДНЫЕ ГЕОПРОСТРАНСТВЕННЫЕ МОДЕЛИ ИСКУССТВЕННОГО ИНТЕЛЛЕКТА ДЛЯ ФОРМИРОВАНИЯ ОПТИМАЛЬНЫХ МАРШРУТОВ ДЛЯ ТУРИСТОВ С ИНВАЛИДНОСТЬЮ",
    },
    descriptions: {
      uz: "“Navoi Turism” (tourism-for-everyone.uz) platformasi tajribasi: eng yaqin madaniy meros nuqtasini avtomatik aniqlovchi geofazoviy algoritm va kontentni inson nazoratidagi moderatsiyasini birlashtirgan gibrid model.",
      en: "Navoi Tourism (tourism-for-everyone.uz) platform case study: Hybrid geospatial algorithms automatically detecting nearest heritage landmarks combined with human-in-the-loop content moderation.",
      ru: "Кейс платформы Navoi Tourism (tourism-for-everyone.uz): Гибридные геопространственные алгоритмы поиска ближайших объектов культурного наследия в сочетании с модерацией Human-in-the-Loop.",
    },
    category: "Inklyuziv SI & Marshrutlash",
    categoryKey: "inclusiveAi",
    readTimeMinutes: 6,
    date: "2026-07-10",
    authors: "Sayidqulov Asliddin, Mustafayev Muzaffar, Farruxov Davlatjon",
    authorsList: [
      {
        name: "Asliddin Sayidqulov",
        affiliation: "Sharof Rashidov nomidagi Samarqand davlat universiteti",
      },
      {
        name: "Muzaffar Mustafayev",
        affiliation: "Sharof Rashidov nomidagi Samarqand davlat universiteti",
        orcid: "0009-0000-8225-5370",
        orcidUrl: "https://orcid.org/0009-0000-8225-5370",
      },
      {
        name: "Davlatjon Farruxov",
        affiliation: "Sharof Rashidov nomidagi Samarqand davlat universiteti",
      },
    ],
    affiliation: "Sharof Rashidov nomidagi Samarqand davlat universiteti",
    affiliationEn: "Samarkand State University named after Sharof Rashidov",
    journal: "Zenodo / Maxsus son №34",
    doi: "10.5281/zenodo.21299321",
    doiUrl: "https://doi.org/10.5281/zenodo.21299321",
    articleUrl: "https://zenodo.org/records/21299321",
    pdfUrl: "https://zenodo.org/records/21299321/files/M-Maxsus%20son-34.pdf",
    image:
      "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=1200&q=80",
    tags: [
      "Geospatial AI",
      "Optimal Routing",
      "Human-in-the-Loop",
      "Accessible Tourism",
      "Zenodo",
      "tourism-for-everyone.uz",
      "Samarkand State University",
    ],
    citations: {
      apa: "Sayidqulov, A., Mustafayev, M., & Farruxov, D. (2026). NOGIRONLIGI BO‘LGAN SAYYOHLAR UCHUN OPTIMAL MARSHRUTLARNI SHAKLLANTIRISHDA GIBRID GEOFAZOVIY SUN’IY INTELLEKT MODELLARI. Zenodo. https://doi.org/10.5281/zenodo.21299321",
      bibtex: `@article{sayidqulov2026hybridgeoai,
  title={NOGIRONLIGI BO‘LGAN SAYYOHLAR UCHUN OPTIMAL MARSHRUTLARNI SHAKLLANTIRISHDA GIBRID GEOFAZOVIY SUN’IY INTELLEKT MODELLARI},
  author={Sayidqulov, Asliddin and Mustafayev, Muzaffar and Farruxov, Davlatjon},
  journal={Zenodo},
  number={Maxsus son-34},
  year={2026},
  doi={10.5281/zenodo.21299321},
  url={https://doi.org/10.5281/zenodo.21299321}
}`,
    },
    content: {
      uz: [
        {
          type: "heading",
          text: "Annotatsiya va Kirish",
        },
        {
          type: "paragraph",
          text: "Maqolada inklyuziv turizmni rivojlantirishda sun’iy intellektga (SI) asoslangan geofazoviy tavsiya tizimlarining roli inson markazli loyihalash tamoyillari asosida tahlil qilinadi. Tadqiqot ob’ekti — Navoiy viloyatining Xatirchi, Nurota va Qiziltepa tumanlarida joriy etilgan “Navoi Turism” platformasi (tourism-for-everyone.uz).",
        },
        {
          type: "subheading",
          text: "Eng Yaqin Madaniy Meros Nuqtasini Aniqlash",
        },
        {
          type: "paragraph",
          text: "Uning markaziy yechimi — foydalanuvchi ob’ektiga eng yaqin madaniy meros nuqtasini avtomatik aniqlovchi geofazoviy algoritm va kontentni inson nazoratidagi moderatsiyasini birlashtirgan gibrid modeldir. Tizim masofani aniqlashda Haversine formulasi hamda relyefning qiyalik darajalarini inobatga oluvchi ko'p mezonli qaror qabul qilish (MCDM) usulidan foydalanadi.",
        },
        {
          type: "code",
          language: "javascript",
          code: `// Geofazoviy Haversine va to'siqsizlik filtri
function calculateAccessibleRoute(userCoords, landmarks, profile) {
  return landmarks
    .filter(lm => lm.slopeAngle <= profile.maxSlope && !lm.hasStairs)
    .map(lm => ({
      ...lm,
      distanceKm: haversineDistance(userCoords, lm.coordinates),
      score: computeAccessibilityScore(lm, profile)
    }))
    .sort((a, b) => b.score - a.score);
}`,
        },
        {
          type: "subheading",
          text: "Human-in-the-Loop va Shaffoflik",
        },
        {
          type: "paragraph",
          text: "Natijalar SI’ning shaffof va inson nazoratidagi (“human-in-the-loop”) qo‘llanilishi nogironligi bo‘lgan sayyohlarning turizm resurslariga teng kirishini oshirishini ko‘rsatadi. Avtomatlashtirilgan sun'iy intellekt xulosalari mahalliy gidlarning tekshiruvidan o'tib, xavfsizlik 100% kafolatlanadi.",
        },
        {
          type: "subheading",
          text: "Texnologik Samaradorlik va Ijtimoiy Tenglik Balansi",
        },
        {
          type: "paragraph",
          text: "Tadqiqot doirasida texnologik samaradorlik bilan ijtimoiy tenglikni muvozanatlovchi metodik yondashuv taklif etiladi. Mazkur model butun respublika va xalqaro miqyosdagi inklyuziv sayohat tizimlarida tatbiq etishga to'liq tayyor.",
        },
        {
          type: "quote",
          text: "Sun'iy intellekt inson markazli tamoyillar va jamoat nazorati bilan birlashgandagina chinakam inklyuziv jamiyat qurilishiga xizmat qiladi.",
        },
      ],
      en: [
        {
          type: "heading",
          text: "Abstract & Background",
        },
        {
          type: "paragraph",
          text: "This paper analyzes the role of AI-driven geospatial recommendation systems in developing inclusive tourism through human-centered design principles. The research subject is the 'Navoi Tourism' platform (tourism-for-everyone.uz), deployed across the Khatirchi, Nurota, and Kyzyltepa districts of the Navoi region.",
        },
        {
          type: "subheading",
          text: "Geospatial Proximity & Accessibility Filtering",
        },
        {
          type: "paragraph",
          text: "Its core contribution is a hybrid model integrating geospatial algorithms that automatically pinpoint the nearest accessible cultural landmark with human-in-the-loop content moderation.",
        },
        {
          type: "code",
          language: "javascript",
          code: `// Geospatial Haversine & Barrier-Free Filter
function calculateAccessibleRoute(userCoords, landmarks, profile) {
  return landmarks
    .filter(lm => lm.slopeAngle <= profile.maxSlope && !lm.hasStairs)
    .map(lm => ({
      ...lm,
      distanceKm: haversineDistance(userCoords, lm.coordinates),
      score: computeAccessibilityScore(lm, profile)
    }))
    .sort((a, b) => b.score - a.score);
}`,
        },
        {
          type: "subheading",
          text: "Human-in-the-Loop Transparency",
        },
        {
          type: "paragraph",
          text: "Empirical findings show that transparent, human-in-the-loop AI application substantially widens equal access to regional tourism resources for travelers with disabilities.",
        },
        {
          type: "subheading",
          text: "Balancing Efficiency with Social Equity",
        },
        {
          type: "paragraph",
          text: "A structured methodological framework balancing technological performance with social equity is proposed, ready for broad deployment across national and international accessible tourism systems.",
        },
      ],
      ru: [
        {
          type: "heading",
          text: "Аннотация и Введение",
        },
        {
          type: "paragraph",
          text: "В статье исследуется роль геопространственных рекомендательных систем на базе искусственного интеллекта (ИИ) в развитии инклюзивного туризма на принципах человеко-ориентированного проектирования. Объект исследования — платформа «Navoi Tourism» (tourism-for-everyone.uz), внедренная в Хатырчинском, Нуратинском и Кызылтепинском районах.",
        },
        {
          type: "subheading",
          text: "Поиск Ближайших Объектов и Гибридная Модель",
        },
        {
          type: "paragraph",
          text: "Центральным решением выступает гибридная модель, сочетающая геопространственные алгоритмы автоматического определения ближайших объектов культурного наследия с экспертной модерацией контента оператором.",
        },
      ],
    },
  },
  {
    id: "uzbek-speech-recognition-deep-learning-comparison",
    i18nKey: "uzbekSpeechRecognition",
    defaultTitle:
      "OʻZBEK TILI NUTQINI TANIB OLISHDA CHUQUR OʻRGANISH MODELLARINING QIYOSIY TAHLILI VA SAMARADORLIGI",
    defaultDesc:
      "This paper presents a comparative analysis and evaluation of the effectiveness of deep learning-based speech recognition (ASR) models for the Uzbek language. Includes benchmark repository on GitHub.",
    titles: {
      uz: "Oʻzbek tili nutqini tanib olishda chuqur oʻrganish modellarining qiyosiy tahlili va samaradorligi",
      en: "COMPARATIVE ANALYSIS AND EFFECTIVENESS OF DEEP LEARNING MODELS IN UZBEK SPEECH RECOGNITION",
      ru: "Сравнительный анализ и эффективность моделей глубокого обучения в распознавании узбекской речи",
    },
    descriptions: {
      uz: "O'zbek tili nutqini tanib olish (ASR) bo'yicha chuqur o'rganish modellarining qiyosiy tahlili, Whisper, Wav2Vec2 va VOSK modellarining samaradorligi hamda ochiq kodli GitHub ombori.",
      en: "Comparative analysis and evaluation of deep learning-based speech recognition (ASR) models for the Uzbek language, benchmark methodology, and open-source GitHub code repository.",
      ru: "Сравнительный анализ и оценка эффективности моделей глубокого обучения (ASR) для узбекского языка, бенчмарк архитектур и открытый репозиторий кода на GitHub.",
    },
    category: "Speech AI & Deep Learning",
    categoryKey: "speechAi",
    readTimeMinutes: 7,
    date: "2026-06-05",
    authors: "Yusupov Ozod (Muallif), Muzaffarbek Mustafayev (Editor)",
    authorsList: [
      {
        name: "Ozod Yusupov",
        role: "Muallif",
        affiliation: "Sharof Rashidov nomidagi Samarqand davlat universiteti",
        orcid: "0009-0003-7146-2106",
        orcidUrl: "https://orcid.org/0009-0003-7146-2106",
      },
      {
        name: "Muzaffarbek Mustafayev",
        role: "Editor / Muharrir & Tadqiqotchi",
        affiliation: "Sharof Rashidov nomidagi Samarqand davlat universiteti",
        orcid: "0009-0000-8225-5370",
        orcidUrl: "https://orcid.org/0009-0000-8225-5370",
      },
    ],
    affiliation: "Samarqand davlat universiteti (Sharof Rashidov nomidagi)",
    affiliationEn: "Samarkand State University named after Sharof Rashidov",
    journal:
      "TATU — International Scientific-Technical Conference on Information and Communication Technologies (pp. 143-145)",
    doi: "10.5281/zenodo.20558514",
    doiUrl: "https://doi.org/10.5281/zenodo.20558514",
    articleUrl: "https://zenodo.org/records/20558514",
    pdfUrl: "https://zenodo.org/records/20558514/files/1_Yusupov.docx?download=1",
    githubUrl:
      "https://github.com/muzaffarbekmustafayev/uzbek-speech-recognition-model-comparison",
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80",
    tags: [
      "Speech Recognition",
      "ASR",
      "Deep Learning",
      "Uzbek Language",
      "Whisper",
      "Wav2Vec2",
      "GitHub",
      "Zenodo",
      "TATU Conference",
    ],
    citations: {
      apa: "Yusupov, O. (2026). OʻZBEK TILI NUTQINI TANIB OLISHDA CHUQUR OʻRGANISH MODELLARINING QIYOSIY TAHLILI VA SAMARADORLIGI (M. Mustafayev, Ed.). International Scientific-Technical Conference on Information and Communication Technologies (TATU), 143-145. https://doi.org/10.5281/zenodo.20558514",
      bibtex: `@article{yusupov2026uzbekspeech,
  title={OʻZBEK TILI NUTQINI TANIB OLISHDA CHUQUR OʻRGANISH MODELLARINING QIYOSIY TAHLILI VA SAMARADORLIGI},
  author={Yusupov, Ozod},
  editor={Mustafayev, Muzaffarbek},
  journal={International Scientific-Technical Conference on Information and Communication Technologies (TATU)},
  pages={143--145},
  year={2026},
  doi={10.5281/zenodo.20558514},
  url={https://doi.org/10.5281/zenodo.20558514}
}`,
    },
    content: {
      uz: [
        {
          type: "heading",
          text: "Annotatsiya va Tadqiqot Maqsadi",
        },
        {
          type: "paragraph",
          text: "Ushbu ilmiy ishda o'zbek tili nutqini avtomatik tanib olish (Automatic Speech Recognition — ASR) sohasida zamonaviy chuqur o'rganish (Deep Learning) arxitekturalarining qiyosiy tahlili va samaradorligi tadqiq qilingan. Inson va kompyuter o'rtasida tabiiy til orqali muloqot qilishning ahamiyati ortib borayotgan bugungi kunda, o'zbek tilini global raqamli tizimlarga integratsiya qilish hamda xalqaro maqomini mustahkamlash dolzarb vazifadir.",
        },
        {
          type: "subheading",
          text: "Tadqiq qilingan ASR Modellari va Arxitekturalar",
        },
        {
          type: "paragraph",
          text: "Tadqiqot doirasida o'zbek tili nutq korpusi (Mozilla Common Voice va maxsus yozuvlar) asosida uchta yetakchi ASR yondashuvi tahlil qilindi:",
        },
        {
          type: "list",
          items: [
            "OpenAI Whisper (Transformer-based Encoder-Decoder): Katta hajmdagi ko'p tilli ma'lumotlarda o'qitilgan, fonetik noaniqliklar va shovqinga chidamli arxitektura.",
            "Meta Wav2Vec 2.0 (Self-Supervised Contrastive Learning): Xom audio to'lqin shakllaridan (raw waveform) to'g'ridan-to'g'ri akustik tasvirlarni o'rganuvchi va o'zbek tili uchun fine-tune qilingan model.",
            "Kaldi / VOSK (HMM-DNN Gibrid Akustik Model): Resurs tejamkor, offline va cheklangan quvvatli server hamda mobil qurilmalarda real vaqt rejimida ishlovchi yengil arxitektura.",
          ],
        },
        {
          type: "subheading",
          text: "Ochiq Kodli GitHub Ombori va Qiyosiy Benchmark",
        },
        {
          type: "paragraph",
          text: "Tadqiqotning amaliy kodi va benchmark skriptlari jamoatchilik uchun ochiq holda GitHub'da taqdim etilgan bo'lib, har bir modelning Word Error Rate (WER), Character Error Rate (CER) va real vaqt omili (RTF — Real-Time Factor) ko'rsatkichlari solishtirilgan.",
        },
        {
          type: "code",
          language: "python",
          code: `# Whisper va Wav2Vec2 o'zbek tili evalyutsiya pipeline namunasi
from transformers import pipeline
import evaluate

wer_metric = evaluate.load("wer")
cer_metric = evaluate.load("cer")

# Whisper-medium fine-tuned for Uzbek
asr_pipe = pipeline("automatic-speech-recognition", model="openai/whisper-medium")
transcription = asr_pipe("sample_uzbek_audio.wav")["text"]

wer_score = wer_metric.compute(predictions=[transcription], references=[ground_truth])
print(f"Uzbek ASR Word Error Rate (WER): {wer_score:.2%}")`,
        },
        {
          type: "subheading",
          text: "Natijalar va Xulosa",
        },
        {
          type: "paragraph",
          text: "Eksperiment natijalari ko'rsatadiki, akustik shovqinsiz laboratoriya sharoitida Wav2Vec 2.0 yuqori aniqlik (eng past CER) ko'rsatgan bo'lsa, real dialogik nutqda va dialektik o'ziga xosliklarda Whisper modeli yuqori kontekstual semantik aniqlikni namoyon qildi. VOSK esa server resurslari cheklangan mikroservislar uchun eng optimal tanlov ekani aniqlandi.",
        },
        {
          type: "quote",
          text: "O'zbek tili akustik modellarining sifatini oshirish milliy sun'iy intellekt ekotizimining eng muhim poydevorlaridan biridir.",
        },
      ],
      en: [
        {
          type: "heading",
          text: "Abstract & Research Scope",
        },
        {
          type: "paragraph",
          text: "This paper presents a rigorous comparative analysis and evaluation of deep learning-based speech recognition (ASR) architectures for the Uzbek language. With human-computer voice interaction advancing rapidly, native language integration into modern conversational AI frameworks is crucial for digital sovereignty and accessibility.",
        },
        {
          type: "subheading",
          text: "Investigated Deep Learning Architectures",
        },
        {
          type: "list",
          items: [
            "OpenAI Whisper: Multilingual sequence-to-sequence Transformer demonstrating robust noise resilience and vocabulary richness.",
            "Meta Wav2Vec 2.0: Self-supervised representation learning from raw waveform audio, fine-tuned on the Uzbek Common Voice subset.",
            "VOSK / Kaldi: Offline, lightweight acoustic HMM-DNN pipeline engineered for low-latency edge deployment.",
          ],
        },
        {
          type: "subheading",
          text: "Open-Source Benchmark Repository",
        },
        {
          type: "paragraph",
          text: "To ensure full reproducibility, the inference scripts, preprocessing pipeline, and model comparison harnesses are openly published on GitHub.",
        },
        {
          type: "code",
          language: "python",
          code: `# Evaluation snippet for Uzbek ASR benchmarking
import evaluate
wer = evaluate.load("wer")

# Benchmark inference across test audio set
wer_result = wer.compute(predictions=predictions, references=ground_truths)
print(f"Benchmark WER: {wer_result:.2%}")`,
        },
        {
          type: "subheading",
          text: "Findings & Recommendations",
        },
        {
          type: "paragraph",
          text: "Empirical results demonstrate that fine-tuned Wav2Vec 2.0 achieves top phonetic fidelity in clean acoustic settings, while Whisper excels at contextual understanding and dialect variance. VOSK remains the preferred solution for resource-constrained edge computing.",
        },
      ],
      ru: [
        {
          type: "heading",
          text: "Аннотация и Цель Исследования",
        },
        {
          type: "paragraph",
          text: "В данной работе представлен сравнительный анализ и оценка эффективности моделей автоматического распознавания речи (ASR) на базе глубокого обучения для узбекского языка. Исследованы архитектуры Whisper, Wav2Vec 2.0 и VOSK.",
        },
        {
          type: "subheading",
          text: "Исследованные Модели и Открытый Репозиторий",
        },
        {
          type: "paragraph",
          text: "Практический пайплайн оценки и скрипты тестирования выложены в открытый доступ на GitHub для воспроизводимости научных результатов.",
        },
        {
          type: "code",
          language: "python",
          code: `# Пример оценки качества распознавания узбекской речи
from transformers import pipeline
import evaluate
wer = evaluate.load("wer")
score = wer.compute(predictions=preds, references=targets)`,
        },
        {
          type: "subheading",
          text: "Результаты",
        },
        {
          type: "paragraph",
          text: "Wav2Vec 2.0 продемонстрировал наименьший уровень ошибок на чистом звуке, тогда как Whisper показал наилучшую устойчивость к шумам и акцентам. VOSK оптимален для автономных и встраиваемых систем.",
        },
      ],
    },
  },
];
