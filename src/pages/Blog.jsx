import React from "react";
import {
  Calendar,
  Clock,
  ArrowUpRight,
  Bookmark,
  Tag
} from "lucide-react";
import { useTranslation } from "react-i18next";

function Blog() {
  const { t } = useTranslation();
  const blogPosts = t("blog.posts", { returnObjects: true });
  const featuredTopics = t("blog.topics", { returnObjects: true });

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-[#0b1120] pt-28 pb-20 px-4 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
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
          <div className="space-y-8">
            <div className="rounded-3xl bg-white dark:bg-gray-900/70 border border-gray-200/70 dark:border-gray-700/60 p-8 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {t("blog.weekly.title")}
                  </h2>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    {t("blog.weekly.description")}
                  </p>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 text-white font-semibold shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-colors"
                >
                  {t("blog.weekly.cta")}
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </div>

            <div className="grid gap-6">
              {blogPosts.map((post, index) => (
                <article
                  key={`${post.title}-${index}`}
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
                      {t("blog.readMore")}
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
                {t("blog.topicsTitle")}
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
                  {t("blog.newsletter.title")}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {t("blog.newsletter.description")}
                </p>
                <div className="mt-4 space-y-3">
                  <input
                    type="email"
                    placeholder={t("blog.newsletter.placeholder")}
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
                  />
                  <button
                    type="button"
                    className="w-full rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
                  >
                    {t("blog.newsletter.cta")}
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
