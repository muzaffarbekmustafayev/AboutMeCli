// src/components/LoadingSpinner.jsx

import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

const LoadingSpinner = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();
  
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="relative">    
        <div className={`w-16 h-16 border-4 ${isDark ? 'border-gray-700' : 'border-gray-200'} rounded-full`}></div>
        <div className={`absolute top-0 left-0 w-16 h-16 border-4 ${isDark ? 'border-blue-400' : 'border-blue-500'} rounded-full animate-spin border-t-transparent`}></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400 text-center">{t("ui.loading")}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
