import React, { useState } from "react";
import { FacebookIcon, InstagramIcon, Mail, Phone, Send } from "lucide-react";
import { useTranslation } from "react-i18next";
import Button from "../components/Button";
import { socialMedias } from "../data/socialMedias";

import TelegramIcon from "../components/Icons/TelegramIcon";
import { Github, Linkedin, Youtube } from "lucide-react";

const Contact = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    if (success) {
      setSuccess(false);
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;

    const hasEmptyFields = Object.values(formData).some((value) => !value.trim());
    if (hasEmptyFields) return;

    setLoading(true);
    setSuccess(false);

    // demo submit (backend bo‘lsa shu yerda bo‘ladi)
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });
    }, 1500);
  };

  const socialLinks = [
    {
      key: "telegram",
      href: socialMedias.telegram.path,
      label: "Telegram",
      icon: <TelegramIcon size={20} />,
      iconClass: "text-sky-600 dark:text-sky-400"
    },
    {
      key: "github",
      href: socialMedias.git_hub.path,
      label: "GitHub",
      icon: <Github className="w-5 h-5" />,
      iconClass: "text-gray-900 dark:text-gray-200"
    },
    {
      key: "linkedin",
      href: socialMedias.linkedin.path,
      label: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      iconClass: "text-blue-700 dark:text-blue-400"
    },
    {
      key: "instagram",
      href: socialMedias.instagram.path,
      label: "Instagram",
      icon: <InstagramIcon size={20} />,
      iconClass: "text-pink-600 dark:text-pink-400"
    },
    {
      key: "facebook",
      href: socialMedias.facebook.path,
      label: "Facebook",
      icon: <FacebookIcon size={20} />,
      iconClass: "text-blue-600 dark:text-blue-400"
    },
    {
      key: "youtube",
      href: socialMedias.youtube.path,
      label: "YouTube",
      icon: <Youtube className="w-5 h-5" />,
      iconClass: "text-red-600 dark:text-red-400"
    }
  ];

  return (
    <div className="min-h-screen pt-20 px-4 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 dark:text-gray-200">
            {t("contact.title")}
          </h1>
          <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-5">
            <ContactItem
              icon={<Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
              label={t("contact.email")}
              value={socialMedias.email.path}
              href={`mailto:${socialMedias.email.path}`}
            />

            <ContactItem
              icon={<Phone className="w-5 h-5 text-green-600 dark:text-green-400" />}
              label={t("contact.phone")}
              value={socialMedias.phone.path}
              href={`tel:${socialMedias.phone.path.replace(/\s+/g, "")}`}
            />

            <div className="flex flex-wrap gap-3 pt-2">
              {socialLinks.map(({ key, href, label, icon, iconClass }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className={`p-3 rounded-full bg-gray-200 dark:bg-gray-700 shadow-md hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition ${iconClass}`}
                >
                  {icon}
                </a>
              ))}
            </div>

          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
              {t("contact.formTitle")}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t("contact.name")}
                autoComplete="name"
              />

              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t("contact.emailPlaceholder")}
                autoComplete="email"
              />

              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t("contact.message")}
                minLength={10}
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                disabled={
                  loading ||
                  Object.values(formData).some((value) => !value.trim()) ||
                  formData.message.trim().length < 10
                }
                className="w-full"
                icon={<Send size={18} />}
              >
                {t("contact.send")}
              </Button>

              {success && (
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl" role="status">
                  <p className="text-green-700 dark:text-green-400">
                    {t("contact.success")}
                  </p>
                </div>
              )}
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;

/* ====== SMALL COMPONENTS ====== */

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

const Input = ({ type = "text", ...props }) => (
  <input
    type={type}
    required
    className="w-full px-4 py-3 rounded-xl border
               border-gray-300 dark:border-gray-600
               bg-gray-50 dark:bg-gray-700
               text-gray-800 dark:text-gray-100
               placeholder-gray-500 dark:placeholder-gray-400
               focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
               transition"
    {...props}
  />
);

const Textarea = (props) => (
  <textarea
    rows="4"
    required
    className="w-full px-4 py-3 rounded-xl border
               border-gray-300 dark:border-gray-600
               bg-gray-50 dark:bg-gray-700
               text-gray-800 dark:text-gray-100
               placeholder-gray-500 dark:placeholder-gray-400
               focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
               transition"
    {...props}
  />
);
