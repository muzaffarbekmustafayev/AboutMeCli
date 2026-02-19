import React, { useState } from "react";
import {
  Mail,
  Phone,
  Send,
  Github,
  Linkedin,
  Youtube,
  Facebook,
  Instagram,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import Button from "../components/Button";
import { socialMedias } from "../data/socialMedias";
import TelegramIcon from "../components/Icons/TelegramIcon";

const Contact = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setSuccess(false);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <section className="min-h-screen pt-20 md:pt-24 px-4 sm:px-6 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-6xl mx-auto pb-12 md:pb-16">
        {/* HEADER */}
        <div className="text-center mb-10 md:mb-14">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100">
            {t("contact.title")}
          </h1>
          <p className="mt-4 text-sm sm:text-base text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-start">
          {/* LEFT – INFO */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            <ContactItem
              icon={<Mail className="w-5 h-5 text-blue-500" />}
              label={t("contact.email")}
              value={socialMedias.email.path}
              href={`mailto:${socialMedias.email.path}`}
            />

            <ContactItem
              icon={<Phone className="w-5 h-5 text-green-500" />}
              label={t("contact.phone")}
              value={socialMedias.phone.path}
            />

            {/* SOCIALS */}
            <div className="pt-2 sm:pt-4">
              <p className="mb-3 text-sm text-gray-600 dark:text-gray-300">
                Social platforms
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <SocialLink href={socialMedias.telegram.path}>
                  <TelegramIcon size={20} />
                </SocialLink>
                <SocialLink href={socialMedias.git_hub.path}>
                  <Github />
                </SocialLink>
                <SocialLink href={socialMedias.linkedin.path}>
                  <Linkedin />
                </SocialLink>
                <SocialLink href={socialMedias.instagram.path}>
                  <Instagram />
                </SocialLink>
                <SocialLink href={socialMedias.facebook.path}>
                  <Facebook />
                </SocialLink>
                <SocialLink href={socialMedias.youtube.path}>
                  <Youtube className="text-red-500" />
                </SocialLink>
              </div>
            </div>
          </div>

          {/* RIGHT – FORM */}
          <div className="relative rounded-2xl sm:rounded-3xl p-[1px] bg-gradient-to-br from-blue-600 to-purple-600 shadow-xl">
            <div className="rounded-[calc(1rem-1px)] sm:rounded-[1.45rem] bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-5 sm:mb-6">
                {t("contact.formTitle")}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t("contact.name")}
                />

                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t("contact.emailPlaceholder")}
                />

                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t("contact.message")}
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={loading}
                  disabled={loading}
                  className="w-full"
                  icon={<Send size={18} />}
                >
                  {t("contact.send")}
                </Button>

                {success && (
                  <div className="mt-4 p-4 rounded-xl bg-green-100 dark:bg-green-900/30">
                    <p className="text-green-800 dark:text-green-300 text-sm font-medium">
                      {t("contact.success")}
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

/* ====== SMALL COMPONENTS ====== */

const ContactItem = ({ icon, label, value, href }) => (
  <div className="flex items-start sm:items-center gap-3 sm:gap-4 rounded-2xl bg-white dark:bg-gray-800 p-4 sm:p-5 shadow-lg hover:shadow-xl transition">
    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center shrink-0">
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-sm text-gray-600 dark:text-gray-300">{label}</p>
      {href ? (
        <a
          href={href}
          className="block font-medium text-gray-900 dark:text-gray-100 hover:underline break-all"
        >
          {value}
        </a>
      ) : (
        <p className="font-medium text-gray-900 dark:text-gray-100 break-all">{value}</p>
      )}
    </div>
  </div>
);

const SocialLink = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="
      w-10 h-10 sm:w-11 sm:h-11 rounded-full
      bg-gray-200 dark:bg-gray-700
      text-gray-700 dark:text-gray-200
      flex items-center justify-center
      shadow-md hover:shadow-xl
      hover:-translate-y-1
      transition
    "
  >
    {children}
  </a>
);

const Input = ({ type = "text", ...props }) => (
  <input
    type={type}
    required
    className="
      w-full px-4 py-3 rounded-xl
      border border-gray-300 dark:border-gray-600
      bg-gray-50 dark:bg-gray-700
      text-gray-900 dark:text-gray-100
      placeholder-gray-500 dark:placeholder-gray-300
      focus:ring-2 focus:ring-blue-500
      focus:border-transparent
      transition
    "
    {...props}
  />
);

const Textarea = (props) => (
  <textarea
    rows="4"
    required
    className="
      w-full px-4 py-3 rounded-xl
      border border-gray-300 dark:border-gray-600
      bg-gray-50 dark:bg-gray-700
      text-gray-900 dark:text-gray-100
      placeholder-gray-500 dark:placeholder-gray-300
      focus:ring-2 focus:ring-blue-500
      focus:border-transparent
      transition
    "
    {...props}
  />
);
