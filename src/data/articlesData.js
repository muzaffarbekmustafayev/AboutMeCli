const AUTHOR = "Muzaffarbek Mustafayev";
const SUPPORTED_ARTICLE_LANGUAGES = new Set(["uz", "en", "ru"]);

export const getArticleLanguage = (language = "uz") => {
  const baseLanguage = String(language).split("-")[0].toLowerCase();
  return SUPPORTED_ARTICLE_LANGUAGES.has(baseLanguage) ? baseLanguage : "en";
};

export const getArticleCopy = (article, t, language) => {
  const selectedLanguage = getArticleLanguage(language);

  return {
    title: t(`articles.items.${article.i18nKey}.title`, {
      defaultValue: article.defaultTitle,
    }),
    description: t(`articles.items.${article.i18nKey}.description`, {
      defaultValue: article.defaultDesc,
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
      article.content?.en ??
      article.content?.uz ??
      [],
  };
};

export const articles = [
  {
    id: "ai-agentic-architecture-2026",
    i18nKey: "aiAgentic",
    defaultTitle:
      "Sun'iy Intellekt va Agentic AI Arxitekturasi: Kelajak Dasturlash Yondashuvlari",
    defaultDesc:
      "LLM agentlari, avtonom vositalar va ularni real loyihalarga xavfsiz hamda samarali integratsiya qilish bo'yicha amaliy tajriba va tahlil.",
    category: "AI & ML",
    categoryKey: "ai",
    readTimeMinutes: 6,
    date: "2026-07-20",
    author: AUTHOR,
    image:
      "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80",
    tags: ["AI", "LLM", "Agentic Systems", "Architecture"],
    content: {
      uz: [
        {
          type: "heading",
          text: "Sun'iy intellekt va agentic tizimlar",
        },
        {
          type: "paragraph",
          text: "Bugungi LLM ilovalari faqat javob yozib beradigan chatdan ancha kengroq ishlay boshladi. Agentic AI yondashuvi modelga vazifani rejalashtirish, kerakli asboblarni chaqirish, natijani tekshirish va xatodan keyin qayta urinish imkonini beradi.",
        },
        {
          type: "subheading",
          text: "Amaliy arxitektura qismlari",
        },
        {
          type: "list",
          items: [
            "Planning: vazifa kichik, tekshiriladigan bosqichlarga bo'linadi.",
            "Tool calling: API, fayl tizimi, qidiruv yoki ma'lumotlar bazasi bilan nazoratli ishlash.",
            "Reflection: agent bajarilgan ishni baholab, kerak bo'lsa keyingi urinishni yaxshilaydi.",
          ],
        },
        {
          type: "paragraph",
          text: "Eng katta xavf agentni cheksiz erkin qo'yib yuborishdir. Ishonchli tizimlar ruxsatlar, audit loglar, idempotency va aniq bekor qilish mexanizmlari bilan loyihalanadi.",
        },
        {
          type: "quote",
          text: "AI agent ishlab chiquvchini almashtirmaydi; u yaxshi muhandislik intizomi bilan ishlatilganda mahsuldorlikni keskin oshiradi.",
        },
      ],
      en: [
        {
          type: "heading",
          text: "AI and agentic systems",
        },
        {
          type: "paragraph",
          text: "Modern LLM products are moving beyond simple chat interfaces. An agentic system can plan a task, call controlled tools, inspect the result, and retry with a better strategy when something fails.",
        },
        {
          type: "subheading",
          text: "Practical architecture pieces",
        },
        {
          type: "list",
          items: [
            "Planning: split the work into small, verifiable steps.",
            "Tool calling: use APIs, files, search, or databases through explicit permissions.",
            "Reflection: evaluate outputs and improve the next attempt when needed.",
          ],
        },
        {
          type: "paragraph",
          text: "The main risk is giving an agent unlimited freedom. Reliable systems use permissions, audit logs, idempotency, and clear cancellation paths.",
        },
        {
          type: "quote",
          text: "An AI agent does not replace the developer; with disciplined engineering, it becomes a powerful productivity layer.",
        },
      ],
      ru: [
        {
          type: "heading",
          text: "ИИ и агентные системы",
        },
        {
          type: "paragraph",
          text: "Современные LLM-продукты выходят за рамки обычного чата. Агентная система может планировать задачу, вызывать контролируемые инструменты, проверять результат и повторять попытку с более точной стратегией.",
        },
        {
          type: "subheading",
          text: "Практические части архитектуры",
        },
        {
          type: "list",
          items: [
            "Планирование: задача делится на небольшие проверяемые шаги.",
            "Вызов инструментов: API, файлы, поиск и базы данных используются через явные разрешения.",
            "Рефлексия: результат оценивается, а следующая попытка улучшается при необходимости.",
          ],
        },
        {
          type: "paragraph",
          text: "Главный риск - дать агенту неограниченную свободу. Надежные системы проектируются с правами доступа, audit log, idempotency и понятным механизмом остановки.",
        },
        {
          type: "quote",
          text: "AI-агент не заменяет разработчика; при инженерной дисциплине он становится сильным слоем продуктивности.",
        },
      ],
    },
  },
  {
    id: "financial-systems-scaling",
    i18nKey: "financialSystems",
    defaultTitle:
      "Moliya va Tranzaksiya Tizimlarida Ishonchlilik va Tranzaksiyalar Xavfsizligi",
    defaultDesc:
      "Moliyaviy ilovalarda ACID tamoyillari, tranzaksiyalar izolatsiyasi hamda Idempotency kalitlaridan to'g'ri foydalanish.",
    category: "Architecture",
    categoryKey: "architecture",
    readTimeMinutes: 8,
    date: "2026-06-15",
    author: AUTHOR,
    image:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
    tags: ["Financial Engineering", "Node.js", "PostgreSQL", "Idempotency"],
    content: {
      uz: [
        {
          type: "heading",
          text: "Tranzaksion tizimlarda ishonchlilik",
        },
        {
          type: "paragraph",
          text: "Moliya va to'lov tizimlarida tezlik muhim, lekin to'g'ri hisob undan ham muhimroq. Balans, to'lov yoki refund bilan ishlayotgan servis har bir holatni qayta tiklanadigan va tekshiriladigan qilib saqlashi kerak.",
        },
        {
          type: "subheading",
          text: "Asosiy standartlar",
        },
        {
          type: "list",
          items: [
            "Idempotent endpointlar bir xil so'rov ikki marta bajarilib ketishining oldini oladi.",
            "Transaction isolation balans va ledger yozuvlaridagi race conditionlarni kamaytiradi.",
            "Immutable audit log har bir pul harakatini izlash va tekshirish imkonini beradi.",
          ],
        },
        {
          type: "code",
          language: "json",
          code: `{
  "transaction_id": "tx_99812489",
  "idempotency_key": "idemp_abc123xyz",
  "status": "COMPLETED",
  "amount": 150000,
  "currency": "UZS"
}`,
        },
        {
          type: "paragraph",
          text: "Bunday tizimlarda retry, timeout va partial failure holatlari oldindan loyihalanadi. Aks holda xato kam ko'rinsa ham, zarar katta bo'lishi mumkin.",
        },
      ],
      en: [
        {
          type: "heading",
          text: "Reliability in transactional systems",
        },
        {
          type: "paragraph",
          text: "Speed matters in financial products, but correctness matters more. Any service touching balances, payments, or refunds should keep every state recoverable and auditable.",
        },
        {
          type: "subheading",
          text: "Core standards",
        },
        {
          type: "list",
          items: [
            "Idempotent endpoints prevent the same request from being processed twice.",
            "Transaction isolation reduces race conditions across balances and ledger rows.",
            "Immutable audit logs make every money movement traceable.",
          ],
        },
        {
          type: "code",
          language: "json",
          code: `{
  "transaction_id": "tx_99812489",
  "idempotency_key": "idemp_abc123xyz",
  "status": "COMPLETED",
  "amount": 150000,
  "currency": "UZS"
}`,
        },
        {
          type: "paragraph",
          text: "Retries, timeouts, and partial failures should be designed before production traffic. If they are ignored, even rare bugs can become expensive.",
        },
      ],
      ru: [
        {
          type: "heading",
          text: "Надежность транзакционных систем",
        },
        {
          type: "paragraph",
          text: "В финансовых продуктах важна скорость, но корректность важнее. Сервис, который работает с балансами, платежами или возвратами, должен хранить каждое состояние так, чтобы его можно было восстановить и проверить.",
        },
        {
          type: "subheading",
          text: "Ключевые стандарты",
        },
        {
          type: "list",
          items: [
            "Idempotent endpoints не дают обработать один и тот же запрос дважды.",
            "Transaction isolation снижает race condition в балансах и ledger-записях.",
            "Immutable audit log позволяет отследить каждое движение денег.",
          ],
        },
        {
          type: "code",
          language: "json",
          code: `{
  "transaction_id": "tx_99812489",
  "idempotency_key": "idemp_abc123xyz",
  "status": "COMPLETED",
  "amount": 150000,
  "currency": "UZS"
}`,
        },
        {
          type: "paragraph",
          text: "Retry, timeout и partial failure нужно проектировать заранее. Иначе даже редкая ошибка может стоить дорого.",
        },
      ],
    },
  },
  {
    id: "react-performance-optimization-2026",
    i18nKey: "reactPerformance",
    defaultTitle: "React.js 19 va Zamonaviy Web Unumdorligini Maksimallashtirish",
    defaultDesc:
      "Virtual DOM optimizatsiyasi, lazy loading, memoization va server components bilan chaqqon UI qurish usullari.",
    category: "Frontend",
    categoryKey: "frontend",
    readTimeMinutes: 5,
    date: "2026-05-28",
    author: AUTHOR,
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80",
    tags: ["React", "Performance", "Frontend", "JavaScript"],
    content: {
      uz: [
        {
          type: "heading",
          text: "React unumdorligini oshirish",
        },
        {
          type: "paragraph",
          text: "Tez ishlaydigan UI faqat framework tanlash bilan hal bo'lmaydi. React loyihasida state joylashuvi, render chegaralari, kod bo'linishi va data fetching strategiyasi umumiy tajribani belgilaydi.",
        },
        {
          type: "subheading",
          text: "Eng foydali yondashuvlar",
        },
        {
          type: "list",
          items: [
            "Lazy loading sahifa va og'ir komponentlarni kerak bo'lganda yuklaydi.",
            "Memoization faqat real profiling sekin joyni ko'rsatganda qo'llanadi.",
            "Server-side va client-side ish chegarasi aniq bo'lsa, bundle yengilroq bo'ladi.",
          ],
        },
        {
          type: "paragraph",
          text: "Performance ishlarida avval o'lchash kerak. React Profiler va Lighthouse aniq sababni ko'rsatmaguncha optimizatsiya taxmin bo'lib qoladi.",
        },
      ],
      en: [
        {
          type: "heading",
          text: "Improving React performance",
        },
        {
          type: "paragraph",
          text: "A fast UI is not solved by choosing a framework alone. In a React project, state placement, render boundaries, code splitting, and data fetching strategy define the experience.",
        },
        {
          type: "subheading",
          text: "Useful approaches",
        },
        {
          type: "list",
          items: [
            "Lazy loading keeps heavy pages and components out of the initial path.",
            "Memoization should be used when profiling shows a real bottleneck.",
            "Clear server and client boundaries reduce bundle weight.",
          ],
        },
        {
          type: "paragraph",
          text: "Performance work starts with measurement. Without React Profiler or Lighthouse evidence, optimization is mostly guesswork.",
        },
      ],
      ru: [
        {
          type: "heading",
          text: "Ускорение React-интерфейсов",
        },
        {
          type: "paragraph",
          text: "Быстрый UI не появляется только из-за выбора фреймворка. В React-проекте многое решают расположение state, границы рендера, code splitting и стратегия загрузки данных.",
        },
        {
          type: "subheading",
          text: "Полезные подходы",
        },
        {
          type: "list",
          items: [
            "Lazy loading убирает тяжелые страницы и компоненты из начальной загрузки.",
            "Memoization стоит применять после того, как profiling показывает реальное узкое место.",
            "Четкая граница server/client уменьшает вес bundle.",
          ],
        },
        {
          type: "paragraph",
          text: "Работа над производительностью начинается с измерения. Без React Profiler или Lighthouse оптимизация остается догадкой.",
        },
      ],
    },
  },
  {
    id: "clean-code-and-solid-in-practice",
    i18nKey: "cleanCode",
    defaultTitle: "SOLID Tamoyillari Amaliyotda: Nazariyadan Ishlaydigan Kodgacha",
    defaultDesc:
      "Bitta mas'uliyat tamoyili va interfeyslarni ajratishni real full-stack loyihalarda qo'llash sirlari.",
    category: "Best Practices",
    categoryKey: "bestPractices",
    readTimeMinutes: 7,
    date: "2026-04-10",
    author: AUTHOR,
    image:
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1200&q=80",
    tags: ["SOLID", "Clean Code", "Architecture", "Best Practices"],
    content: {
      uz: [
        {
          type: "heading",
          text: "Clean Code va SOLID amaliyotda",
        },
        {
          type: "paragraph",
          text: "SOLID tamoyillarini yodlab olish oson, lekin ularni ortiqcha abstraksiyasiz qo'llash tajriba talab qiladi. Maqsad kodni murakkablashtirish emas, o'zgarishga tayyor qilishdir.",
        },
        {
          type: "subheading",
          text: "Ishlaydigan belgilar",
        },
        {
          type: "list",
          items: [
            "Modulda bitta aniq mas'uliyat bor va u nomidan bilinadi.",
            "Yangi talab ko'p joyni buzmasdan qo'shiladi.",
            "Interface foydalanuvchiga kerak bo'lgan minimal imkoniyatni beradi.",
          ],
        },
        {
          type: "paragraph",
          text: "Clean code ko'pincha katta refaktor emas, kichik aniq qarorlar yig'indisidir: nomlash, chegarani ajratish, test yozish va keraksiz murakkablikni olib tashlash.",
        },
      ],
      en: [
        {
          type: "heading",
          text: "Clean Code and SOLID in practice",
        },
        {
          type: "paragraph",
          text: "It is easy to memorize SOLID principles, but applying them without unnecessary abstraction takes judgment. The goal is not to make code clever; it is to keep it ready for change.",
        },
        {
          type: "subheading",
          text: "Practical signals",
        },
        {
          type: "list",
          items: [
            "A module has one clear responsibility, visible from its name.",
            "A new requirement can be added without touching unrelated areas.",
            "An interface exposes only what its consumer actually needs.",
          ],
        },
        {
          type: "paragraph",
          text: "Clean code is usually not one big refactor. It is a collection of small decisions: naming, boundaries, tests, and removing unnecessary complexity.",
        },
      ],
      ru: [
        {
          type: "heading",
          text: "Clean Code и SOLID на практике",
        },
        {
          type: "paragraph",
          text: "Принципы SOLID легко выучить, но применять их без лишних абстракций сложнее. Цель не в том, чтобы сделать код хитрым, а в том, чтобы он спокойно переживал изменения.",
        },
        {
          type: "subheading",
          text: "Практические признаки",
        },
        {
          type: "list",
          items: [
            "У модуля есть одна понятная ответственность, которая видна из названия.",
            "Новое требование добавляется без изменений в несвязанных местах.",
            "Interface показывает только то, что реально нужно потребителю.",
          ],
        },
        {
          type: "paragraph",
          text: "Clean code чаще всего не один большой refactor. Это набор маленьких решений: названия, границы, тесты и удаление ненужной сложности.",
        },
      ],
    },
  },
];
