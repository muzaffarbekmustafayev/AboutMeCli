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
  Sparkles,
  MessageSquare,
  ArrowRight
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

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = t("contact.errors.name");
    if (!formData.email.trim()) {
      newErrors.email = t("contact.errors.email");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("contact.errors.emailInvalid");
    }
    if (!formData.message.trim()) {
      newErrors.message = t("contact.errors.message");
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t("contact.errors.messageShort");
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      if (config.emailjs.serviceId && config.emailjs.templateId && config.emailjs.publicKey) {
        await emailjs.send(config.emailjs.serviceId, config.emailjs.templateId, {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        }, config.emailjs.publicKey);
        showSuccess(t("contact.success"));
      } else {
        await new Promise(r => setTimeout(r, 1500));
        showSuccess(t("contact.successDemo"));
      }
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      showError(t("contact.error"));
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = [
    { key: "telegram", href: socialMedias.telegram?.path, icon: <TelegramIcon />, label: "Telegram", color: "text-sky-500" },
    { key: "github", href: socialMedias.github?.path, icon: <Github size={20} />, label: "GitHub", color: "text-slate-700 dark:text-slate-200" },
    { key: "linkedin", href: socialMedias.linkedin?.path, icon: <Linkedin size={20} />, label: "LinkedIn", color: "text-blue-600" },
    { key: "youtube", href: socialMedias.youtube?.path, icon: <Youtube size={20} />, label: "YouTube", color: "text-red-600" },
    { key: "instagram", href: socialMedias.instagram?.path, icon: <InstagramIcon size={20} />, label: "Instagram", color: "text-pink-600" },
    { key: "facebook", href: socialMedias.facebook?.path, icon: <FacebookIcon size={20} />, label: "Facebook", color: "text-blue-700" }
  ];

  return (
    <>
      <SEO title={t("contact.title")} description={t("contact.subtitle")} path="/contact" />

      <section className="section-shell min-h-screen px-4 pt-28 pb-20 text-slate-700 dark:text-slate-300 sm:px-6 sm:pt-32">
        <div className="mx-auto w-full max-w-7xl">
          
          {/* Header */}
          <header className="mb-16 space-y-4 text-center sm:text-left">
            <div className="hero-badge">
              <Sparkles size={14} />
              Get In Touch
            </div>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl lg:text-6xl">
              {t("contact.title")}
            </h1>
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400 max-w-3xl">
              {t("contact.subtitle")}
            </p>
          </header>

          <div className="grid gap-16 lg:grid-cols-[1fr_420px] items-start">
            
            {/* Form */}
            <div className="order-2 lg:order-1">
              <div className="mb-10 flex items-center gap-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  <MessageSquare size={24} />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{t("contact.formTitle")}</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2.5">
                    <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">{t("contact.name")}</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t("contact.namePlaceholder")}
                      className="w-full border-b-2 border-slate-200 bg-transparent py-3 text-base outline-none transition-all focus:border-blue-500 dark:border-slate-800 dark:text-white dark:focus:border-blue-500"
                    />
                    {errors.name && <p className="text-xs font-medium text-red-500">{errors.name}</p>}
                  </div>
                  <div className="space-y-2.5">
                    <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">{t("contact.email")}</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t("contact.emailPlaceholder")}
                      className="w-full border-b-2 border-slate-200 bg-transparent py-3 text-base outline-none transition-all focus:border-blue-500 dark:border-slate-800 dark:text-white dark:focus:border-blue-500"
                    />
                    {errors.email && <p className="text-xs font-medium text-red-500">{errors.email}</p>}
                  </div>
                </div>

                <div className="space-y-2.5">
                  <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">{t("contact.message")}</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t("contact.messagePlaceholder")}
                    className="w-full resize-none border-b-2 border-slate-200 bg-transparent py-3 text-base outline-none transition-all focus:border-blue-500 dark:border-slate-800 dark:text-white dark:focus:border-blue-500"
                  />
                  {errors.message && <p className="text-xs font-medium text-red-500">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative flex items-center gap-4 overflow-hidden rounded-full bg-slate-900 px-10 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-blue-600 disabled:opacity-50 dark:bg-white dark:text-slate-900 dark:hover:bg-blue-500 dark:hover:text-white"
                >
                  {loading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  ) : (
                    <>
                      {t("contact.send")}
                      <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Sidebar info */}
            <div className="space-y-12 order-1 lg:order-2">
              {/* Direct Contact */}
              <div className="space-y-8">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{t("contact.sidebarTitle", { defaultValue: "Direct Details" })}</h3>
                <div className="space-y-10">
                  <ContactLink icon={<Mail size={20} />} label={t("contact.email")} value={socialMedias.email.path} href={`mailto:${socialMedias.email.path}`} />
                  <ContactLink icon={<Phone size={20} />} label={t("contact.phone")} value={socialMedias.phone.path} href={`tel:${socialMedias.phone.path.replace(/\s+/g, "")}`} />
                </div>
              </div>

              {/* Socials Grid */}
              <div className="space-y-8">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{t("contact.socialTitle", { defaultValue: "Social Connect" })}</h3>
                <div className="grid grid-cols-2 gap-6">
                  {socialLinks.map((social) => (
                    <a
                      key={social.key}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 transition-all"
                    >
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 transition-all group-hover:bg-blue-600 group-hover:text-white dark:bg-slate-800 ${social.color}`}>
                        {social.icon}
                      </div>
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-blue-600 transition-colors">{social.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

const ContactLink = ({ icon, label, value, href }) => (
  <div className="group space-y-3">
    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">{label}</p>
    <a href={href} className="flex items-center gap-4">
      <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-white text-blue-600 shadow-lg transition-all group-hover:bg-blue-600 group-hover:text-white dark:bg-slate-900 dark:group-hover:bg-blue-500">
        {React.cloneElement(icon, { size: 20 })}
      </div>
      <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 break-all leading-tight">{value}</span>
    </a>
  </div>
);

export default Contact;
