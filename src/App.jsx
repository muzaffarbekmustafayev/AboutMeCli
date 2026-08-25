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
  const [progress, setProgress] = useState(0);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setIsVisible(true);
    setProgress(30);

    const stepTimer = window.setTimeout(() => setProgress(75), 100);
    const completeTimer = window.setTimeout(() => setProgress(100), 280);
    const hideTimer = window.setTimeout(() => {
      setIsVisible(false);
      setProgress(0);
    }, 480);

    return () => {
      window.clearTimeout(stepTimer);
      window.clearTimeout(completeTimer);
      window.clearTimeout(hideTimer);
    };
  }, [location.pathname]);

  if (!isVisible) return null;

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 right-0 z-[100] h-[2.5px] overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 shadow-[0_0_12px_rgba(59,130,246,0.9)] transition-all duration-200 ease-out"
        style={{
          width: `${progress}%`,
          opacity: progress === 100 ? 0 : 1,
          transitionProperty: 'width, opacity',
        }}
      />
    </div>
  );
};

import TechBackground from './components/TechBackground';

const RouterShell = () => {
  return (
    <div className="app-shell min-h-screen transition-colors duration-500">
      <TechBackground />
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
