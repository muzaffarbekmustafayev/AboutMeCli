import React, { useState } from "react";
import {
  FacebookIcon,
  Github,
  InstagramIcon,
  Linkedin,
  Mail,
  Phone,
  Send,
  Youtube,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import Button from "../components/Button";
import Input from "../components/Input";
import Textarea from "../components/TextArea";
import TelegramIcon from "../components/Icons/TelegramIcon";
import { socialMedias } from "../data/socialMedias";

const SOCIAL_ICON_CLASS =
  "p-3 rounded-full bg-gray-200 dark:bg-gray-700 shadow-md hover:-translate-y-1 hover:shadow-xl transition";

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const contactItems = [
    {
      icon: <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      label: t("contact.email"),
      value: socialMedias.email.path,
      href: `mailto:${socialMedias.email.path}`,
    },
    {
      icon: <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />,
      label: t("contact.phone"),
      value: socialMedias.phone.path,
      href: `tel:${socialMedias.phone.path.replace(/\s+/g, "")}`,
    },
  ];

  const socialLinks = [
    {
      key: "telegram",
      href: socialMedias.telegram.path,
      label: "Telegram",
      icon: <TelegramIcon size={20} />,
    },
    {
      key: "github",
      href: socialMedias.git_hub.path,
      label: "GitHub",
      icon: <Github className="w-5 h-5 text-gray-900 dark:text-gray-200" />,
    },
    {
      key: "linkedin",
      href: socialMedias.linkedin.path,
      label: "LinkedIn",
      icon: <Linkedin className="w-5 h-5 text-blue-700 dark:text-blue-400" />,
    },
    {
      key: "instagram",
      href: socialMedias.instagram.path,
      label: "Instagram",
      icon: <InstagramIcon size={20} />,
    },
    {
      key: "facebook",
      href: socialMedias.facebook.path,
      label: "Facebook",
      icon: <FacebookIcon size={20} />,
    },
    {
      key: "youtube",
      href: socialMedias.youtube.path,
      label: "YouTube",
      icon: <Youtube className="w-5 h-5 text-red-600 dark:text-red-400" />,
    },
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (success) {
      setSuccess(false);
    }
  };

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
    <section className="min-h-screen pt-28 pb-16 px-4 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 dark:text-gray-200">
            {t("contact.title")}
          </h1>
          <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <aside className="space-y-5 lg:sticky lg:top-28">
            {contactItems.map((item) => (
              <ContactItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                value={item.value}
                href={item.href}
              />
            ))}

            <div className="flex flex-wrap gap-3 pt-2">
              {socialLinks.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className={SOCIAL_ICON_CLASS}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </aside>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
              {t("contact.formTitle")}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t("contact.name")}
                autoComplete="name"
                aria-label={t("contact.name")}
              />

              <Input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t("contact.emailPlaceholder")}
                autoComplete="email"
                aria-label={t("contact.emailPlaceholder")}
              />

              <Textarea
                required
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t("contact.message")}
                aria-label={t("contact.message")}
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
                <div
                  role="status"
                  aria-live="polite"
                  className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl"
                >
                  <p className="text-green-700 dark:text-green-400">{t("contact.success")}</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

const ContactItem = ({ icon, label, value, href }) => (
  <div className="flex items-center gap-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
    <div className="w-11 h-11 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      {href ? (
        <a href={href} className="font-medium text-gray-800 dark:text-gray-200">
          {value}
        </a>
      ) : (
        <p className="font-medium text-gray-800 dark:text-gray-200">{value}</p>
      )}
    </div>
  </div>
);
