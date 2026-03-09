import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './contexts/ToastContext';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import BackToTop from './components/BackToTop';
import MouseTrail from './components/MouseTrail';
import AppRoutes from './routes/AppRoutes';
import { useTranslation } from 'react-i18next';

const RouteTransitionLoader = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setIsVisible(true);
    setIsActive(true);

    const finishTimer = window.setTimeout(() => setIsActive(false), 380);
    const hideTimer = window.setTimeout(() => setIsVisible(false), 580);

    return () => {
      window.clearTimeout(finishTimer);
      window.clearTimeout(hideTimer);
    };
  }, [location.pathname]);

  if (!isVisible) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[70] transition-opacity duration-200 ${isActive ? 'opacity-100' : 'opacity-0'}`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-slate-950/8 backdrop-blur-[1px] dark:bg-slate-950/25" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="glass-card rounded-2xl px-5 py-3 shadow-xl">
          <div className="h-2 w-40 overflow-hidden rounded-full bg-slate-200/80 dark:bg-slate-700/70">
            <div className="route-loading-bar h-full w-1/2 rounded-full bg-gradient-to-r from-blue-700 to-blue-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

const RouterShell = () => {
  return (
    <div className="app-shell min-h-screen transition-colors duration-500">
      <RouteTransitionLoader />
      <MouseTrail />
      <Navbar />
      <AppRoutes />
      <BackToTop />
    </div>
  );
};

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
              <RouterShell />
            </Router>
          </ToastProvider>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;
