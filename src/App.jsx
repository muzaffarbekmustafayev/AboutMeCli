// src/App.jsx

import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';
import { useTranslation } from 'react-i18next';

const App = () => {
  const { i18n } = useTranslation();

  // 🌍 GLOBAL TIL SOZLAMASI (SEO + Accessibility)
  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  // 🌙 Dark mode default
  useEffect(() => {
    localStorage.setItem("darkMode", "true");
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-500">
          <Navbar />
          <AppRoutes />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
