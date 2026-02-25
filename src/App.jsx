import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './contexts/ToastContext';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import BackToTop from './components/BackToTop';
import AppRoutes from './routes/AppRoutes';
import { useTranslation } from 'react-i18next';

const App = () => {
  const { i18n } = useTranslation();
  const currentLanguage = (i18n.resolvedLanguage || i18n.language || "uz").split("-")[0];

  useEffect(() => {
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider>
          <ToastProvider>
            <Router>
              <div className="app-shell min-h-screen transition-colors duration-500">
                <Navbar />
                <AppRoutes />
                <BackToTop />
              </div>
            </Router>
          </ToastProvider>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;
