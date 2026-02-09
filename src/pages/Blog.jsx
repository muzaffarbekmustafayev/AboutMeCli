import React from "react";
import {
  Calendar,
  Clock,
  ArrowUpRight,
  Bookmark,
  Tag
} from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "React komponentlarini tizimli qurish",
    excerpt:
      "Komponentlarni toza, qayta ishlatiladigan va oson sinovdan o‘tkaziladigan qilib tuzish bo‘yicha amaliy yondashuvlar.",
    date: "2024-11-02",
    readTime: "6 daqiqa",
    category: "React",
    tags: ["Hooks", "Architecture"]
  },
  {
    id: 2,
    title: "Vite bilan tezkor Frontend workflow",
    excerpt:
      "HMR, optimallashtirilgan build va zamonaviy tooling yordamida tezkor ishlab chiqish jarayoni.",
    date: "2024-10-18",
    readTime: "5 daqiqa",
    category: "Tooling",
    tags: ["Vite", "Performance"]
  },
  {
    id: 3,
    title: "Portfolio saytingizni SEOga tayyorlash",
    excerpt:
      "Meta taglar, semantik HTML va ma’lumot tuzilmasi orqali ko‘rinuvchanlikni oshirish usullari.",
    date: "2024-09-30",
    readTime: "7 daqiqa",
    category: "SEO",
    tags: ["Accessibility", "Best practices"]
  }
];

const featuredTopics = [
  {
    title: "Front-end checklist",
    description: "Har bir loyiha uchun eng muhim tekshiruvlar ro‘yxati.",
    badge: "Qo‘llanma"
  },
  {
    title: "Tailwind CSS bilan dizayn tizimi",
    description: "Tokenlar, rang palitrasi va komponentlar uyg‘unligi.",
    badge: "Dizayn"
  },
  {
    title: "React performance tips",
    description: "Re-renderlarni kamaytirish va UXni tezlashtirish.",
    badge: "Performance"
  }
];

function Blog() {
  return (
    <section className="min-h-screen bg-gray-50 dark:bg-[#0b1120] pt-28 pb-20 px-4 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-500 font-semibold">
            Blog
          </p>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white">
            Fikrlar, tajribalar va{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">
              amaliy yechimlar
            </span>
          </h1>
          <p className="mt-5 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Front-end, dizayn va ishlab chiqish jarayoni bo‘yicha yangi maqolalar,
            mini qo‘llanmalar va real tajribalar.
          </p>
        </header>

        <div className="grid gap-10 lg:grid-cols-[2.2fr_1fr]">
          <div className="space-y-8">
            <div className="rounded-3xl bg-white dark:bg-gray-900/70 border border-gray-200/70 dark:border-gray-700/60 p-8 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Haftalik yangiliklar
                  </h2>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Eng ommabop mavzular, yangi maqolalar va qisqa tavsiyalar.
                  </p>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 text-white font-semibold shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-colors"
                >
                  Obuna bo‘lish
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </div>

            <div className="grid gap-6">
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  className="group rounded-3xl bg-white dark:bg-gray-900/70 border border-gray-200/70 dark:border-gray-700/60 p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-200 font-medium">
                      <Tag size={14} />
                      {post.category}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Calendar size={14} />
                      {post.date}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Clock size={14} />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex gap-2 flex-wrap">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
                    >
                      O‘qishni davom ettirish
                      <ArrowUpRight size={16} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl bg-white dark:bg-gray-900/70 border border-gray-200/70 dark:border-gray-700/60 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Tavsiya etilgan mavzular
              </h3>
              <div className="mt-4 space-y-4">
                {featuredTopics.map((topic) => (
                  <div
                    key={topic.title}
                    className="rounded-2xl border border-gray-200/60 dark:border-gray-700/60 p-4 hover:border-blue-500/70 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                        {topic.badge}
                      </span>
                      <Bookmark size={16} className="text-gray-400" />
                    </div>
                    <h4 className="mt-2 text-base font-semibold text-gray-900 dark:text-white">
                      {topic.title}
                    </h4>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {topic.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 p-[1px] shadow-lg shadow-blue-500/20">
              <div className="rounded-[1.4rem] bg-white dark:bg-gray-900/80 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Newsletter
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Haftasiga bir marta qisqa, foydali kontent yuboramiz.
                </p>
                <div className="mt-4 space-y-3">
                  <input
                    type="email"
                    placeholder="Email manzilingiz"
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
                  />
                  <button
                    type="button"
                    className="w-full rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
                  >
                    Ro‘yxatdan o‘tish
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default Blog;
