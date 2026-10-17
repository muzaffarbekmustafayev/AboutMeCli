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
      en: "Digitization Mechanisms of Regional Tourism Potential: Integration of Historical Objects in Navoiy Region into the Digital Ecosystem",
      ru: "Механизмы цифровизации регионального туристического потенциала: интеграция исторических объектов Навоийской области в цифровую экосистему",
    },
    descriptions: {
      uz: "Navoiy viloyatining Nurota, Qiziltepa va Xatirchi tumanlaridagi 42 ta tarixiy ob'ektni raqamlashtirish, WCAG 2.1 inklyuzivlik mezonlari, MapLibre GL JS geonavigatsiyasi va Schema.org semantik ekotizimi tahlili.",
      en: "An empirical investigation into regional tourism digitization, barrier-free accessibility guidelines (WCAG 2.1), MapLibre GL JS geonavigation, and semantic schema architectures across 42 historical monuments.",
      ru: "Комплексное исследование механизмов цифровизации регионального турпотенциала, стандартов безбарьерной среды WCAG 2.1, геокартографии MapLibre GL JS и семантической разметки для 42 объектов наследия.",
    },
    category: "Raqamlashtirish & Turizm",
    categoryKey: "digitization",
    badgeLabel: "Peer-Reviewed Journal",
    readTimeMinutes: 7,
    date: "2026-02-20",
    authors: "Asliddin Sayidqulov, Muzaffar Mustafayev",
    authorsList: [
      {
        name: "Asliddin Sayidqulov",
        role: "Muallif / Tadqiqotchi",
        affiliation: "Sharof Rashidov nomidagi Samarqand davlat universiteti",
      },
      {
        name: "Muzaffar Mustafayev",
        role: "Muallif / Dasturiy Arxitektor",
        affiliation: "Sharof Rashidov nomidagi Samarqand davlat universiteti",
        orcid: "0009-0000-8225-5370",
        orcidUrl: "https://orcid.org/0009-0000-8225-5370",
      },
    ],
    affiliation: "Sharof Rashidov nomidagi Samarqand davlat universiteti",
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
          text: "Annotatsiya va Muammoning Qo'yilishi",
        },
        {
          type: "paragraph",
          text: "Mazkur ilmiy tadqiqot Navoiy viloyatining Nurota, Qiziltepa va Xatirchi tumanlari misolida mintaqaviy turizm salohiyatini kompleks raqamlashtirish hamda yaxlit raqamli ekotizimni shakllantirish mexanizmlariga bag'ishlangan. Tadqiqotning asosiy maqsadi — harakatlanish imkoniyati cheklangan, ko'rish, eshitish va kognitiv sensor xususiyatlariga ega bo'lgan fuqarolar, keksalar va oilaviy sayyohlar uchun to'siqlardan xoli (accessible tourism) jozibador muhit yaratishdir.",
        },
        {
          type: "subheading",
          text: "WCAG 2.1 Standartlari va POUR Tamoyillari Asosidagi Arxitektura",
        },
        {
          type: "paragraph",
          text: "Platformaning dasturiy ta'minoti xalqaro veb-qulaylik qo'llanmasi (WCAG 2.1) mezonlariga qat'iy javob beruvchi to'rtta fundamental tamoyil asosida loyihalashtirildi:",
        },
        {
          type: "list",
          items: [
            "Perceivable (Idrok etiluvchanlik): Foydalanuvchilar axborotni turli sensor kanallar orqali qabul qila olishlari uchun har bir grafik elementga semantik matnli tavsif (alt tag), yuqori kontrastli rejim va audio giydlar joriy etildi.",
            "Operable (Boshqariluvchanlik): Sensorli ekranlar bilan bir qatorda klaviaturadan to'liq boshqaruv, kamida 48x48 piksel o'lchamdagi qulay teginish zonalari va ekran o'qish dasturlari (Screen Readers) bilan muammosiz ishlash kafolatlandi.",
            "Understandable (Tushunarlilik): Sayyohning kognitiv yuklamasini minimumga tushiruvchi intuitiv interfeys va soddalashtirilgan ko'p tilli axborot iyerarxiyasi qurildi.",
            "Robust (Barqarorlik): Mobil brauzerlardan tortib maxsus yordamchi texnologiyalargacha (assistive technologies) barcha qurilmalarda bir xil ishonchli ishlash ta'minlandi.",
          ],
        },
        {
          type: "subheading",
          text: "MapLibre GL JS Geonavigatsiyasi va Semantik JSON-LD",
        },
        {
          type: "paragraph",
          text: "Tizimga MapLibre GL JS ochiq manbali kutubxonasi negizida yuqori tezlikda ishlovchi vektorli xaritalash integratsiya qilindi. Bu orqali 42 ta madaniy meros ob'ektining relyef xususiyatlari, qiyalik burchaklari, panduslar mavjudligi va maxsus infratuzilma holati real vaqtda sayyoh ekranida jonli namoyon bo'ladi.",
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
          text: "42 ta tarixiy-madaniy meros ob'ektining fazoviy xaritalanishi natijasida hududda reabilitatsion va inklyuziv sayyohlik geografiyasi sezilarli darajada kengaydi. Bu esa mintaqaviy iqtisodiyotni diversifikatsiya qilish, mahalliy hunarmandlar va xizmat ko'rsatish sohalariga yangi sayyohlar oqimini jalb etish imkonini berdi.",
        },
        {
          type: "quote",
          text: "Raqamlashtirish — tarixiy merosni asrab-avaylash barobarida har bir inson uchun to'siqsiz madaniy muhit yaratishning eng samarali vositasidir.",
        },
      ],
      en: [
        {
          type: "heading",
          text: "Abstract & Problem Statement",
        },
        {
          type: "paragraph",
          text: "This scientific paper investigates the systematic digitization mechanisms of regional tourism potential and the deployment of an integrated digital ecosystem across the Nurota, Qiziltepa, and Xatirchi districts of the Navoiy region. The central objective is to eliminate environmental, physical, and informational barriers for individuals with motor, visual, auditory, and cognitive impairments, fostering fully inclusive regional tourism.",
        },
        {
          type: "subheading",
          text: "Software Architecture & WCAG 2.1 POUR Compliance",
        },
        {
          type: "list",
          items: [
            "Perceivable: Semantic markup with rich alt tags, high contrast visibility options, and multi-sensory assistive telemetry.",
            "Operable: Total keyboard operability, large 48x48px touch boundaries, and seamless screen reader integration.",
            "Understandable: Minimized cognitive overload through predictable UX paradigms and multilingual semantic clarity.",
            "Robust: Resilient client execution across varied browsers and assistive hardware devices.",
          ],
        },
        {
          type: "subheading",
          text: "MapLibre GL JS Geonavigation & Schema.org Metadata",
        },
        {
          type: "paragraph",
          text: "Vector geonavigation powered by MapLibre GL JS delivers real-time spatial orientation, ramp verification, and gradient inclination analysis across 42 surveyed cultural heritage landmarks.",
        },
        {
          type: "code",
          language: "json",
          code: `{
  "@context": "https://schema.org",
  "@type": "TouristAttraction",
  "name": "Chashma Historical Complex",
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 40.5614,
    "longitude": 65.6886
  },
  "amenityFeature": [{
    "@type": "LocationFeatureSpecification",
    "name": "Wheelchair Accessible Ramp",
    "value": true
  }]
}`,
        },
        {
          type: "subheading",
          text: "Socio-Economic Efficacy",
        },
        {
          type: "paragraph",
          text: "Empirical validation demonstrated that systematic digital mapping unlocks underserved visitor segments, spurs local community employment, and expands the reach of rehabilitational tourism in Uzbekistan.",
        },
      ],
      ru: [
        {
          type: "heading",
          text: "Аннотация и Актуальность Проблемы",
        },
        {
          type: "paragraph",
          text: "Научная работа посвящена механизмам цифровизации туристического потенциала Навоийской области (Нуратинский, Кызылтепинский и Хатырчинский районы). Основной акцент сделан на разработке безбарьерной среды для людей с особыми физическими и сенсорными потребностями в соответствии с международными нормами WCAG 2.1.",
        },
        {
          type: "subheading",
          text: "Архитектура и Принципы POUR",
        },
        {
          type: "list",
          items: [
            "Perceivable: Текстовые эквиваленты для графики, звуковые подсказки и контрастные темы.",
            "Operable: Доступность всех элементов с клавиатуры и сенсорные зоны от 48х48 px.",
            "Understandable: Минимизация когнитивной нагрузки и интуитивно понятная навигация.",
            "Robust: Надежная кроссплатформенная поддержка ассистивных технологий.",
          ],
        },
        {
          type: "subheading",
          text: "Геонавигация MapLibre GL JS и Schema.org",
        },
        {
          type: "paragraph",
          text: "Векторная интерактивная картография на MapLibre GL JS визуализирует доступность 42 исторических объектов в реальном времени, включая уклоны путей и наличие пандусов.",
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
      en: "The Role of Artificial Intelligence and Innovative Technologies in Developing Accessible Tourism: Automated Route Generation and Service Quality Optimization in Regional Ecosystems",
      ru: "Роль искусственного интеллекта и инновационных технологий в развитии инклюзивного туризма: автоматизированное построение маршрутов и оптимизация сервиса в региональных экосистемах",
    },
    descriptions: {
      uz: "IL-9124093892 davlat ilmiy loyihasi: Multi-Agent GeoAI, to'siqlarni aylanib o'tuvchi gibrid Dijkstra va A* algoritmlari, inson nazoratidagi tekshiruv hamda Node.js/MongoDB 2dsphere backend.",
      en: "State scientific grant IL-9124093892: Multi-agent geospatial AI (MAS GeoAI), hybrid Dijkstra & A* dynamic barrier-avoidance routing, Human-in-the-Loop verification, and sub-120ms MongoDB 2dsphere architecture.",
      ru: "Госпроект IL-9124093892: Мультиагентный GeoAI, гибридная маршрутизация Дейкстры и A* с динамическим обходом барьеров, модерация Human-in-the-Loop и производительный стек Node.js/MongoDB 2dsphere.",
    },
    category: "GeoAI & Multi-Agent Tizimlar",
    categoryKey: "geoai",
    badgeLabel: "State Grant IL-9124093892",
    grant: "IL-9124093892",
    grantTitle:
      "Navoiy viloyatining Qiziltepa, Nurota va Xatirchi tumanlari misolida inklyuziv turizmni tashkil etishning uslubiy asoslarini ishlab chiqish",
    readTimeMinutes: 8,
    date: "2026-03-01",
    authors: "Asliddin Sayidqulov, Muzaffar Mustafayev",
    authorsList: [
      {
        name: "Asliddin Sayidqulov",
        role: "Loyiha Rahbari / Muallif",
        affiliation: "Sharof Rashidov nomidagi Samarqand davlat universiteti",
      },
      {
        name: "Muzaffar Mustafayev",
        role: "Muallif / Bosh Muhandis",
        affiliation: "Sharof Rashidov nomidagi Samarqand davlat universiteti",
        orcid: "0009-0000-8225-5370",
        orcidUrl: "https://orcid.org/0009-0000-8225-5370",
      },
    ],
    affiliation: "Sharof Rashidov nomidagi Samarqand davlat universiteti",
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
          text: "Davlat Ilmiy Loyihasi IL-9124093892 Konteksti",
        },
        {
          type: "paragraph",
          text: "Ushbu tadqiqot O'zbekiston Respublikasi davlat ilmiy-texnik dasturlari doirasidagi IL-9124093892 raqamli innovatsion loyiha asosida amalga oshirildi. Ishning asosiy vazifasi — turli relyefga ega bo'lgan 42 ta madaniy meros yodgorliklari o'rtasida to'siqlardan xoli xavfsiz marshrutlarni avtomatlashtirilgan tarzda shakllantirish va xizmat ko'rsatish sifatini ko'p agentli sun'iy intellekt (MAS GeoAI) vositasida yangi bosqichga ko'tarishdan iborat.",
        },
        {
          type: "subheading",
          text: "Gibrid Dijkstra va A* Dinamik Marshrutlash Algoritmi",
        },
        {
          type: "paragraph",
          text: "Klassik marshrutlash algoritmlari faqat masofani qisqartirishga intiladi, ammo jismoniy imkoniyati cheklangan shaxslar uchun zinapoyalar, tik qiyaliklar va toshli yo'llar o'tib bo'lmas to'siq hisoblanadi. Biz ishlab chiqqan model Dijkstra algoritmining aniq qamrovini A* evristikasining tezkorligi bilan birlashtirib, yo'l qoplamasi va qiyalik burchagini inobatga oluvchi dinamik to'siqlarni chetlab o'tish mexanizmini yaratdi.",
        },
        {
          type: "subheading",
          text: "Algoritmik Xatoliklarni Bartaraf Etuvchi 'Human-in-the-Loop' Tizimi",
        },
        {
          type: "paragraph",
          text: "Sun'iy intellekt modellarining sun'iy gallyutsinatsiyasi (noto'g'ri xulosa chiqarishi) sayyohni xavfli vaziyatga solib qo'ymasligi uchun har bir avtomatlashtirilgan marshrut joylardagi sertifikatlangan gid-moderatorlar tomonidan tekshiriladi va tasdiqlanadi.",
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
          text: "Texnik Arxitektura va Yuqori Tezlik",
        },
        {
          type: "list",
          items: [
            "Tezkor Backend: Node.js va Express.js arxitekturasi yuklama ostida so'rovlarni 120 ms dan kam vaqtda qayta ishlaydi.",
            "Fazoviy Indekslash: MongoDB 2dsphere sferik trigonometriya indeksi millisekundlarda koordinatalar masofasini aniqlaydi.",
            "Inklyuziv Mobil Ilova: React Native asosidagi ilova ekran o'qish vositalari (VoiceOver, TalkBack) hamda shrift masshtablanishiga to'liq moslashtirilgan.",
          ],
        },
        {
          type: "subheading",
          text: "Empirik Natijalar va Iqtisodiy Samaradorlik",
        },
        {
          type: "paragraph",
          text: "Tizimning maydon sinovlari Nurota va Qiziltepa etno-qishloqlarida sayyohlarning o'rtacha qolish muddatini 1.2 kundan 2.8 kunga uzaytirdi. Natijada hududdagi xonadonlarning o'rtacha oylik daromadi 42.4% ga oshgani qayd etildi.",
        },
        {
          type: "quote",
          text: "GeoAI va inson nazorati uyg'unligi sayyohlik marshrutlarining xavfsizligi va ishonchliligini mutlaq kafolatlaydi.",
        },
      ],
      en: [
        {
          type: "heading",
          text: "State Scientific Grant IL-9124093892 & Objective",
        },
        {
          type: "paragraph",
          text: "Engineered under state scientific and technical grant IL-9124093892, this research tackles the spatial dispersion of 42 major historical monuments across challenging terrains. We deploy decentralized multi-agent geospatial artificial intelligence (MAS GeoAI) and on-device cognitive personalization to dissolve physical and information barriers.",
        },
        {
          type: "subheading",
          text: "Hybrid Dijkstra & A* Dynamic Routing",
        },
        {
          type: "paragraph",
          text: "Standard routing minimizes physical distance, ignoring wheelchair impassability. Our hybrid algorithm fuses the guaranteed optimality of Dijkstra with the heuristic velocity of A*, applying multi-parametric edge weights (slope angles, surface textures, tactile pavements).",
        },
        {
          type: "subheading",
          text: "Human-in-the-Loop Validation Pipeline",
        },
        {
          type: "paragraph",
          text: "To eliminate algorithmic hallucinations, all AI-generated routes are continuously verified by trained local moderators before field presentation, ensuring 100% navigational safety.",
        },
        {
          type: "code",
          language: "javascript",
          code: `// MongoDB 2dsphere spatial near query
const accessibleLandmarks = await Landmark.find({
  location: {
    $near: {
      $geometry: { type: "Point", coordinates: [lng, lat] },
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
          text: "Field deployments achieved sub-120ms API response latency under load. The average duration of tourist stays increased from 1.2 to 2.8 days, triggering a 42.4% rise in household revenues across pilot rural villages.",
        },
      ],
      ru: [
        {
          type: "heading",
          text: "Госгрант IL-9124093892 и Цель Исследования",
        },
        {
          type: "paragraph",
          text: "Исследование проведено в рамках государственного научного гранта IL-9124093892. Рассматривается решение проблемы пространственной разобщенности 42 памятников истории с помощью мультиагентного GeoAI и когнитивной адаптации.",
        },
        {
          type: "subheading",
          text: "Гибридный Алгоритм Дейкстры и A*",
        },
        {
          type: "paragraph",
          text: "Модель объединяет точность Дейкстры и скорость эвристики A*, динамически учитывая крутизну склонов и качество покрытия для инвалидных колясок.",
        },
        {
          type: "subheading",
          text: "Валидация Human-in-the-Loop",
        },
        {
          type: "paragraph",
          text: "Полевая модерация исключает галлюцинации алгоритмов и гарантирует полную безопасность сформированных маршрутов.",
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
      en: "Hybrid Geospatial Artificial Intelligence Models for Optimal Route Generation for Tourists with Disabilities",
      ru: "Гибридные геопространственные модели искусственного интеллекта для формирования оптимальных маршрутов для туристов с инвалидностью",
    },
    descriptions: {
      uz: "“Navoi Turism” (tourism-for-everyone.uz) platformasi: eng yaqin ob'ektni aniqlovchi geofazoviy algoritm va inson nazoratidagi moderatsiyani birlashtirgan gibrid model.",
      en: "Real-world implementation on the 'Navoi Tourism' platform (tourism-for-everyone.uz): Hybrid spatial proximity heuristics combined with human-in-the-loop verification.",
      ru: "Практическое внедрение на платформе «Navoi Tourism» (tourism-for-everyone.uz): Геопространственные алгоритмы близости объектов и модерация данных операторами.",
    },
    category: "Inklyuziv SI & Marshrutlash",
    categoryKey: "inclusiveAi",
    badgeLabel: "Zenodo Special Issue",
    readTimeMinutes: 6,
    date: "2026-07-10",
    authors: "Sayidqulov Asliddin, Mustafayev Muzaffar, Farruxov Davlatjon",
    authorsList: [
      {
        name: "Asliddin Sayidqulov",
        role: "Muallif / Tadqiqotchi",
        affiliation: "Sharof Rashidov nomidagi Samarqand davlat universiteti",
      },
      {
        name: "Muzaffar Mustafayev",
        role: "Muallif / Tizim Dasturchisi",
        affiliation: "Sharof Rashidov nomidagi Samarqand davlat universiteti",
        orcid: "0009-0000-8225-5370",
        orcidUrl: "https://orcid.org/0009-0000-8225-5370",
      },
      {
        name: "Davlatjon Farruxov",
        role: "Muallif / Tadqiqotchi",
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
          text: "Mazkur ilmiy maqolada inklyuziv turizmni rivojlantirishda sun’iy intellektga (SI) asoslangan geofazoviy tavsiya tizimlarining roli inson markazli loyihalash tamoyillari asosida o'rganiladi. Tadqiqot ob’ekti — Navoiy viloyatining Xatirchi, Nurota va Qiziltepa tumanlarida amaliyotga joriy etilgan “Navoi Turism” (`tourism-for-everyone.uz`) ommaviy platformasidir.",
        },
        {
          type: "subheading",
          text: "Eng Yaqin Madaniy Meros Nuqtasini Aniqlash Modeli",
        },
        {
          type: "paragraph",
          text: "Yechimning markaziy asosi — foydalanuvchi turgan joyga eng yaqin bo'lgan madaniy meros nuqtasini avtomatik aniqlovchi geofazoviy algoritm bilan kontentni inson nazoratidagi moderatsiyasini uyg'unlashtirgan gibrid modeldir. Tizim masofani hisoblashda sferik Haversine formulasidan hamda to'siqsizlik darajasini aniqlovchi ko'p mezonli tahlil usulidan foydalanadi.",
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
          text: "Human-in-the-Loop va Texnologik Adolat",
        },
        {
          type: "paragraph",
          text: "Natijalar sun'iy intellektning shaffof va inson nazoratidagi (“human-in-the-loop”) qo‘llanilishi nogironligi bo‘lgan sayyohlarning tarixiy resurslarga teng huquqli kirishini ta'minlashini ko‘rsatadi. Texnologik samaradorlik bilan ijtimoiy tenglikni muvozanatlovchi metodik yondashuv tavsiya etiladi.",
        },
        {
          type: "quote",
          text: "Texnologiya inson ehtiyojlariga xizmat qilgandagina uning ijtimoiy va ma'naviy qiymati to'liq namoyon bo'ladi.",
        },
      ],
      en: [
        {
          type: "heading",
          text: "Abstract & Background",
        },
        {
          type: "paragraph",
          text: "This paper analyzes the role of AI-driven geospatial recommendation systems in advancing inclusive tourism through human-centered design principles. The subject is the 'Navoi Tourism' platform (tourism-for-everyone.uz), deployed across the Khatirchi, Nurota, and Kyzyltepa districts.",
        },
        {
          type: "subheading",
          text: "Spatial Proximity & Accessibility Filtering",
        },
        {
          type: "paragraph",
          text: "The core innovation combines automated geospatial algorithms with expert human-in-the-loop content moderation to ensure verified, reliable wayfinding for travelers with diverse physical abilities.",
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
          text: "Balancing Efficiency with Social Equity",
        },
        {
          type: "paragraph",
          text: "The paper proposes a methodological bridge connecting algorithmic speed with social justice, providing an accessible tourism blueprint ready for nationwide replication.",
        },
      ],
      ru: [
        {
          type: "heading",
          text: "Аннотация и Введение",
        },
        {
          type: "paragraph",
          text: "В статье рассматривается роль рекомендательных геоинформационных систем на базе ИИ в развитии инклюзивного туризма на примере платформы «Navoi Tourism» (tourism-for-everyone.uz).",
        },
        {
          type: "subheading",
          text: "Гибридная Модель Поиска Объектов",
        },
        {
          type: "paragraph",
          text: "Сочетание математических расчетов близости (формула гаверсинусов) с экспертной проверкой гарантирует туристам с инвалидностью беспрепятственный доступ к культурным ценностям.",
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
      en: "Comparative Analysis and Effectiveness of Deep Learning Models in Uzbek Speech Recognition",
      ru: "Сравнительный анализ и эффективность моделей глубокого обучения в распознавании узбекской речи",
    },
    descriptions: {
      uz: "O'zbek tili nutqini tanib olish (ASR) bo'yicha chuqur o'rganish modellarining qiyosiy tahlili, Whisper, Wav2Vec 2.0 va VOSK arxitekturalarining samaradorligi hamda ochiq kodli GitHub ombori.",
      en: "Comprehensive benchmark and architectural evaluation of state-of-the-art ASR models (Whisper, Wav2Vec 2.0, VOSK) for the Uzbek language with an open-source GitHub reproducibility suite.",
      ru: "Сравнительный анализ и бенчмарк современных моделей распознавания речи (Whisper, Wav2Vec 2.0, VOSK) для узбекского языка с открытым репозиторием кода на GitHub.",
    },
    category: "Nutq SI & Chuqur O'rganish",
    categoryKey: "speechAi",
    badgeLabel: "TATU Conference",
    readTimeMinutes: 7,
    date: "2026-06-05",
    authors: "Yusupov Ozod (Muallif), Muzaffarbek Mustafayev (Editor)",
    authorsList: [
      {
        name: "Ozod Yusupov",
        role: "Tadqiqotchi / Muallif",
        affiliation: "Sharof Rashidov nomidagi Samarqand davlat universiteti",
        orcid: "0009-0003-7146-2106",
        orcidUrl: "https://orcid.org/0009-0003-7146-2106",
      },
      {
        name: "Muzaffarbek Mustafayev",
        role: "Muharrir & Ilmiy Maslahatchi",
        affiliation: "Sharof Rashidov nomidagi Samarqand davlat universiteti",
        orcid: "0009-0000-8225-5370",
        orcidUrl: "https://orcid.org/0009-0000-8225-5370",
      },
    ],
    affiliation: "Samarqand davlat universiteti (Sharof Rashidov nomidagi)",
    affiliationEn: "Samarkand State University named after Sharof Rashidov",
    journal:
      "TATU — Xalqaro Ilmiy-Texnik Konferensiya To'plami (Axborot-kommunikatsiya texnologiyalari, 143-145-betlar)",
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
          text: "Annotatsiya va Tadqiqotning Dolzarbligi",
        },
        {
          type: "paragraph",
          text: "Inson va kompyuter o'rtasidagi tabiiy ovozli muloqot zamonaviy sun'iy intellektning eng jadal rivojlanayotgan yo'nalishlaridan biridir. Ushbu ilmiy maqolada o'zbek tili nutqini avtomatik tanib olish (ASR) bo'yicha yetakchi chuqur o'rganish (Deep Learning) arxitekturalarining samaradorligi va xatolik ko'rsatkichlari solishtirma baholangan. Tadqiqot o'zbek tilining xalqaro axborot makoniga keng integratsiyalashuviga xizmat qiladi.",
        },
        {
          type: "subheading",
          text: "Taqqoslash Qamrovi: Whisper, Wav2Vec 2.0 va VOSK",
        },
        {
          type: "paragraph",
          text: "Eksperimentlar Mozilla Common Voice ochiq ma'lumotlar to'plamining o'zbek tili segmenti hamda turli dialektik audio yozuvlar asosida o'tkazildi:",
        },
        {
          type: "list",
          items: [
            "OpenAI Whisper: Ko'p tilli Transformer arxitekturasi; akustik shovqinlarga va noaniq talaffuzga yuqori chidamlilik ko'rsatib, kontekstual semantikani eng to'g'ri tiklaydi.",
            "Meta Wav2Vec 2.0: To'g'ridan-to'g'ri xom audio to'lqin shakllaridan (raw waveforms) akustik belgilarni o'rganuvchi self-supervised model; toza laboratoriya sharoitida minimal belgilar xatoligini (CER) qayd etdi.",
            "VOSK / Kaldi: HMM-DNN gibrid modeli; internet aloqasi talab etilmaydigan, kam quvvatli mikroservislar va mobil qurilmalarda tezkor (Real-Time Factor < 0.3) ishlashga eng mos yondashuv ekani tasdiqlandi.",
          ],
        },
        {
          type: "subheading",
          text: "Ochiq Manbali GitHub Repozitoriysi",
        },
        {
          type: "paragraph",
          text: "Ilmiy tadqiqot natijalarining takrorlanuvchanligi (reproducibility) va ochiq fan tamoyillariga sodiqlik sifatida, eksperiment skriptlari, audiolarni qayta ishlash pipeline'lari va evalyutsiya kodlari GitHub omborida ochiq e'lon qilingan.",
        },
        {
          type: "code",
          language: "python",
          code: `# O'zbek tili ASR WER/CER baholash pipeline namunasi
from transformers import pipeline
import evaluate

wer_metric = evaluate.load("wer")
cer_metric = evaluate.load("cer")

# Whisper modelini o'zbek tili uchun chaqirish
asr_pipe = pipeline("automatic-speech-recognition", model="openai/whisper-medium")
result = asr_pipe("sample_uzbek_voice.wav")["text"]

print("Transkripsiya:", result)
print("WER ko'rsatkichi:", wer_metric.compute(predictions=[result], references=[ground_truth]))`,
        },
        {
          type: "subheading",
          text: "Xulosa va Amaliy Tavsiyalar",
        },
        {
          type: "paragraph",
          text: "Qiyosiy tahlillar shuni ko'rsatdiki, davlat va bank xizmatlaridagi katta hajmli serverlar uchun Whisper modeli eng yuqori aniqlikni ta'minlaydi. Resurslari cheklangan qurilmalarda esa VOSK eng yaxshi unumdorlik beradi.",
        },
        {
          type: "quote",
          text: "O'zbek tili akustik modellarining takomillashtirilishi milliy raqamli suverenitetning texnologik ustunidir.",
        },
      ],
      en: [
        {
          type: "heading",
          text: "Abstract & Scope",
        },
        {
          type: "paragraph",
          text: "Speech recognition for low-to-medium resource languages requires rigorous comparative evaluation of contemporary neural network architectures. This paper presents an empirical benchmark of Transformer-based and self-supervised deep learning models tailored for the Uzbek phonological structure.",
        },
        {
          type: "subheading",
          text: "Evaluated Model Paradigms",
        },
        {
          type: "list",
          items: [
            "OpenAI Whisper: Multilingual sequence-to-sequence Transformer demonstrating superior robustness to conversational noise and dialectal variation.",
            "Meta Wav2Vec 2.0: Self-supervised acoustic representation learning yielding exceptional phonetic precision on clean speech.",
            "VOSK / Kaldi: Lightweight acoustic HMM-DNN pipeline optimized for low-latency offline edge inference.",
          ],
        },
        {
          type: "subheading",
          text: "Reproducibility via Open GitHub Repository",
        },
        {
          type: "paragraph",
          text: "All training configurations, evaluation scripts, and error rate metrics are openly hosted on GitHub, enabling peer researchers to replicate and build upon these findings.",
        },
        {
          type: "code",
          language: "python",
          code: `# Evaluation harness for Uzbek speech recognition
import evaluate

wer = evaluate.load("wer")
cer = evaluate.load("cer")
wer_score = wer.compute(predictions=preds, references=targets)
print(f"Evaluated WER: {wer_score:.2%}")`,
        },
        {
          type: "subheading",
          text: "Conclusion",
        },
        {
          type: "paragraph",
          text: "Whisper delivers superior contextual semantic accuracy for cloud deployments, while VOSK remains unrivaled for resource-constrained edge computing environments.",
        },
      ],
      ru: [
        {
          type: "heading",
          text: "Аннотация и Актуальность",
        },
        {
          type: "paragraph",
          text: "Статья посвящена глубокому сравнительному анализу архитектур автоматического распознавания речи (ASR) для узбекского языка. Оцениваются показатели Word Error Rate (WER) и Character Error Rate (CER) для моделей Whisper, Wav2Vec 2.0 и VOSK.",
        },
        {
          type: "subheading",
          text: "Исследуемые Архитектуры и Открытый Код",
        },
        {
          type: "paragraph",
          text: "Все скрипты оценки, пайплайн предобработки аудио и сравнительные тесты размещены в открытом доступе на GitHub.",
        },
      ],
    },
  },
];
