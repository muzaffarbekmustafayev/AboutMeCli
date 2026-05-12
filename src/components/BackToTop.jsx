import React from 'react';
import { ArrowUp } from 'lucide-react';
import { useTranslation } from "react-i18next";
import { useScrollToTop } from '../hooks/useScrollToTop';

const BackToTop = () => {
  const { t } = useTranslation();
  const { isVisible, scrollToTop } = useScrollToTop();

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-40 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all hover:-translate-y-1"
      aria-label={t("ui.navigation.backToTop")}
    >
      <ArrowUp size={24} />
    </button>
  );
};

export default BackToTop;
