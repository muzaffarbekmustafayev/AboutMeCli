import React, { memo } from "react";
import { Globe, Mail, Phone, Linkedin, Github, Youtube } from "lucide-react";
import { useTranslation } from "react-i18next";
import { socialMedias } from "../../../data/socialMedias";
import ContactItem from "../../../components/ui/ContactItem";
import SocialIcon from "../../../components/ui/SocialIcon";
import SkillSet from "../../../components/ui/SkillSet";
import LanguageProgress from "../../../components/ui/LanguageProgress";

const ResumeSidebar = () => {
  const { t } = useTranslation();

  return (
    <aside className="space-y-12">
      {/* Contact Information */}
      <section className="glass-card rounded-3xl p-6 sm:p-8 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">{t("menu.contact")}</h3>
        <div className="space-y-5">
          <ContactItem icon={<Globe size={18} />} label="Portfolio" value="muzaffarbek.uz" href="https://muzaffarbek.uz" />
          <ContactItem icon={<Mail size={18} />} label={t("contact.email")} value="muzaffarbekmustafayev@gmail.com" href="mailto:muzaffarbekmustafayev@gmail.com" />
          <ContactItem icon={<Phone size={18} />} label={t("contact.phone")} value={socialMedias.phone.path} href={`tel:${socialMedias.phone.path}`} />
          <div className="flex gap-3 pt-4 border-t border-slate-200/50 dark:border-white/[0.06]">
            <SocialIcon href={socialMedias.linkedin.path} icon={<Linkedin size={20} />} />
            <SocialIcon href={socialMedias.github.path} icon={<Github size={20} />} />
            <SocialIcon href={socialMedias.youtube.path} icon={<Youtube size={20} />} />
          </div>
        </div>
      </section>

      {/* Technical & Fundamental Skills Sidebar */}
      <section className="glass-card rounded-3xl p-6 sm:p-8 space-y-8">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">{t("resume.skills.title")}</h3>
        
        <SkillSet 
          title={t("resume.skills.math", { defaultValue: "Matematika & Fundamental Fanlar" })} 
          items={t("resume.skills.mathItems", { returnObjects: true, defaultValue: ["Differensial tenglamalar (ODE/PDE)", "Matematik analiz", "Chiziqli algebra", "Ehtimollar nazariyasi & Statistika", "Diskret matematika", "Fizika & Dinamika"] })} 
        />
        <SkillSet 
          title={t("resume.skills.ai")} 
          items={["Whisper ASR", "Wav2Vec 2.0", "VOSK", "MediaPipe", "TensorFlow.js", "Gemini API", "Claude Code", "OpenRouter"]} 
        />
        <SkillSet 
          title={t("resume.skills.frontend")} 
          items={["React", "Next.js", "TypeScript", "Tailwind CSS", "React Native", "Expo"]} 
        />
        <SkillSet 
          title={t("resume.skills.backend")} 
          items={["Node.js", "Express.js", "FastAPI (Python)", "REST APIs", "WebSockets", "WebRTC"]} 
        />
        <SkillSet 
          title={t("resume.skills.database")} 
          items={["MongoDB", "PostgreSQL", "SQLAlchemy", "Redis"]} 
        />
        <SkillSet 
          title={t("resume.skills.robotics")} 
          items={t("resume.skills.roboticsItems", { returnObjects: true, defaultValue: ["Mexatronika", "ESP32", "Raspberry Pi Zero 2 W"] })} 
        />
        <SkillSet 
          title={t("resume.skills.devops")} 
          items={["Linux (Ubuntu/Debian)", "Nginx", "Reverse Proxy", "SSL (Let's Encrypt)", "Git/GitHub"]} 
        />
      </section>

      {/* Languages */}
      <section className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">{t("resume.languages.title")}</h3>
        <div className="space-y-5">
          <LanguageProgress label={t("resume.languages.uz")} value="100%" />
          <LanguageProgress label={t("resume.languages.en")} value="85%" />
          <LanguageProgress label={t("resume.languages.ru")} value="80%" />
        </div>
      </section>
    </aside>
  );
};

export default memo(ResumeSidebar);
