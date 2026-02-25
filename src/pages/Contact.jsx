import React, { useState } from "react";
import {
  FacebookIcon,
  Github,
  InstagramIcon,
  Linkedin,
  Mail,
  Phone,
  Send,
  Youtube
} from "lucide-react";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";
import { config } from "../config";
import { useToast } from "../contexts/ToastContext";
import SEO from "../components/SEO";
import { socialMedias } from "../data/socialMedias";
import TelegramIcon from "../components/Icons/TelegramIcon";

const Contact = () => {
  const { t } = useTranslation();
  const { success: showSuccess, error: showError } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = t("contact.errors.name", { defaultValue: "Name is required" });
    }

    if (!formData.email.trim()) {
      newErrors.email = t("contact.errors.email", { defaultValue: "Email is required" });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("contact.errors.emailInvalid", { defaultValue: "Invalid email format" });
    }

    if (!formData.message.trim()) {
      newErrors.message = t("contact.errors.message", { defaultValue: "Message is required" });
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t("contact.errors.messageShort", { defaultValue: "Message too short" });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showError(t("contact.errors.validation", { defaultValue: "Please fix the errors" }));
      return;
    }

    setLoading(true);

    try {
      if (config.emailjs.serviceId && config.emailjs.templateId && config.emailjs.publicKey) {
        await emailjs.send(
          config.emailjs.serviceId,
          config.emailjs.templateId,
          {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
          },
          config.emailjs.publicKey
        );

        showSuccess(t("contact.success", { defaultValue: "Message sent successfully!" }));
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        showSuccess(t("contact.successDemo", { defaultValue: "Demo mode: Message received!" }));
      }

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Email send error:", error);
      showError(t("contact.error", { defaultValue: "Failed to send message. Please try again." }));
    } finally {
      setLoading(false);
    }
  };

  const emailAddress = socialMedias.email?.path || "your@email.com";
  const phoneNumber = socialMedias.phone?.path || "+998 90 123 45 67";
  const phoneHref = `tel:${phoneNumber.replace(/\s+/g, "")}`;

  const socialLinks = [
    {
      key: "telegram",
      href: socialMedias.telegram?.path || "#",
      icon: <TelegramIcon />,
      label: "Telegram",
      color: "text-sky-600 dark:text-sky-400",
      ring: "ring-sky-100 dark:ring-sky-900/30"
    },
    {
      key: "github",
      href: socialMedias.github?.path || "#",
      icon: <Github size={24} />,
      label: "GitHub",
      color: "text-gray-700 dark:text-gray-200",
      ring: "ring-gray-200 dark:ring-gray-700"
    },
    {
      key: "linkedin",
      href: socialMedias.linkedin?.path || "#",
      icon: <Linkedin size={24} />,
      label: "LinkedIn",
      color: "text-blue-700 dark:text-blue-400",
      ring: "ring-blue-100 dark:ring-blue-900/30"
    },
    {
      key: "youtube",
      href: socialMedias.youtube?.path || "#",
      icon: <Youtube size={24} />,
      label: "YouTube",
      color: "text-red-600 dark:text-red-400",
      ring: "ring-red-100 dark:ring-red-900/30"
    },
    {
      key: "instagram",
      href: socialMedias.instagram?.path || "#",
      icon: <InstagramIcon size={24} />,
      label: "Instagram",
      color: "text-pink-600 dark:text-pink-400",
      ring: "ring-pink-100 dark:ring-pink-900/30"
    },
    {
      key: "facebook",
      href: socialMedias.facebook?.path || "#",
      icon: <FacebookIcon size={24} />,
      label: "Facebook",
      color: "text-blue-700 dark:text-blue-400",
      ring: "ring-blue-100 dark:ring-blue-900/30"
    }
  ];

  return (
    <section className="section-shell min-h-screen px-4 pt-28 pb-20">
      <SEO
        title={t("contact.title")}
        description={t("contact.subtitle")}
        path="/contact"
      />

      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center sm:mb-14">
          <h1 className="text-4xl font-extrabold sm:text-5xl">
            <span className="font-display brand-gradient">
              {t("contact.title")}
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 dark:text-gray-400 sm:text-lg">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid items-start gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="glass-card rounded-2xl p-5 sm:rounded-3xl sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t("contact.formTitle", { defaultValue: "Send a Message" })}
            </h2>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t("contact.name", { defaultValue: "Name" })}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full rounded-xl border px-4 py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none transition-all duration-200 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 ${
                      errors.name ? "border-red-500 focus:ring-red-500/30 focus:border-red-500" : "border-gray-200 dark:border-gray-700"
                    }`}
                    placeholder={t("contact.namePlaceholder", { defaultValue: "Your name" })}
                  />
                  {errors.name && <p className="mt-1.5 text-sm text-red-500">{errors.name}</p>}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t("contact.email", { defaultValue: "Email" })}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full rounded-xl border px-4 py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none transition-all duration-200 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 ${
                      errors.email ? "border-red-500 focus:ring-red-500/30 focus:border-red-500" : "border-gray-200 dark:border-gray-700"
                    }`}
                    placeholder={t("contact.emailPlaceholder", { defaultValue: "your@email.com" })}
                  />
                  {errors.email && <p className="mt-1.5 text-sm text-red-500">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("contact.message", { defaultValue: "Message" })}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full resize-none rounded-xl border px-4 py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none transition-all duration-200 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 ${
                    errors.message ? "border-red-500 focus:ring-red-500/30 focus:border-red-500" : "border-gray-200 dark:border-gray-700"
                  }`}
                  placeholder={t("contact.messagePlaceholder", { defaultValue: "Your message..." })}
                />
                {errors.message && <p className="mt-1.5 text-sm text-red-500">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="primary-cta inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {t("contact.sending", { defaultValue: "Sending..." })}
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    {t("contact.send", { defaultValue: "Send Message" })}
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="space-y-6 sm:space-y-8">
            <div className="glass-card rounded-2xl p-5 sm:rounded-3xl sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t("contact.infoTitle", { defaultValue: "Contact Information" })}
              </h2>

              <div className="mt-6 space-y-4">
                <a
                  href={`mailto:${emailAddress}`}
                  className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50 dark:hover:bg-gray-800/70"
                >
                  <div className="rounded-lg bg-blue-100 p-3 text-blue-600 transition-transform group-hover:scale-110 dark:bg-blue-900/30 dark:text-blue-400">
                    <Mail className="text-blue-600 dark:text-blue-400" size={24} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                    <p className="font-semibold text-gray-900 dark:text-white break-all">{emailAddress}</p>
                  </div>
                </a>

                <a
                  href={phoneHref}
                  className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50 dark:hover:bg-gray-800/70"
                >
                  <div className="rounded-lg bg-green-100 p-3 text-green-600 transition-transform group-hover:scale-110 dark:bg-green-900/30 dark:text-green-400">
                    <Phone className="text-green-600 dark:text-green-400" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{phoneNumber}</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-5 sm:rounded-3xl sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t("contact.socialTitle", { defaultValue: "Follow Me" })}
              </h2>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.key}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-3 py-3 transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800 dark:bg-gray-900/50 ${social.ring}`}
                    aria-label={social.label}
                  >
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 transition-transform group-hover:scale-110 dark:bg-gray-800 ${social.color}`}>
                      {social.icon}
                    </div>
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {social.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
