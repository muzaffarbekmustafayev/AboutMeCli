import React from "react";
import { Calendar, Clock, ArrowUpRight, Bookmark, Tag } from "lucide-react";
import { useTranslation } from "react-i18next";

function Blog() {
  const { t } = useTranslation();

  const posts = t("blog.posts", { returnObjects: true });
  const topics = t("blog.topics", { returnObjects: true });

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-[#0b1120] pt-28 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <header className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-500 font-semibold">
            {t("blog.eyebrow")}
          </p>

          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white">
            {t("blog.title")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">
              {t("blog.titleAccent")}
            </span>
          </h1>

          <p className="mt-5 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t("blog.subtitle")}
          </p>
        </header>

        <div className="grid gap-10 lg:grid-cols-[2.2fr_1fr]">
          {/* POSTS */}
          <div className="space-y-8">
            {/* WEEKLY */}
            <div className="rounded-3xl bg-white dark:bg-gray-900/70 border p-8">
              <div className="flex justify-between items-center gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {t("blog.weekly.title")}
                  </h2>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    {t("blog.weekly.description")}
                  </p>
                </div>
                <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 text-white font-semibold">
                  {t("blog.weekly.cta")}
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </div>

            {/* POSTS LIST */}
            {posts.map((post, i) => (
              <article
                key={i}
                className="group rounded-3xl bg-white dark:bg-gray-900/70 border p-7 hover:shadow-xl transition"
              >
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/30">
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

                <h3 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600">
                  {post.title}
                </h3>

                <p className="mt-3 text-gray-600 dark:text-gray-400">
                  {post.excerpt}
                </p>

                <div className="mt-5 flex justify-between items-center gap-4">
                  <div className="flex gap-2 flex-wrap">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <button className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
                    {t("blog.readMore")}
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* SIDEBAR */}
          <aside className="space-y-6">
            <div className="rounded-3xl bg-white dark:bg-gray-900/70 border p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t("blog.topicsTitle")}
              </h3>

              <div className="mt-4 space-y-4">
                {topics.map((topic, i) => (
                  <div key={i} className="rounded-2xl border p-4">
                    <div className="flex justify-between">
                      <span className="text-xs font-semibold text-blue-600 uppercase">
                        {topic.badge}
                      </span>
                      <Bookmark size={16} />
                    </div>
                    <h4 className="mt-2 font-semibold text-gray-900 dark:text-white">
                      {topic.title}
                    </h4>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {topic.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* NEWSLETTER */}
            <div className="rounded-3xl bg-white dark:bg-gray-900/80 border p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t("blog.newsletter.title")}
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {t("blog.newsletter.description")}
              </p>
              <input
                placeholder={t("blog.newsletter.placeholder")}
                className="mt-4 w-full rounded-xl border px-4 py-2"
              />
              <button className="mt-3 w-full rounded-xl bg-blue-600 py-2 text-white font-semibold">
                {t("blog.newsletter.cta")}
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default Blog;
