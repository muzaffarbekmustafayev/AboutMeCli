// src/routes/AppRoutes.jsx

import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

// Lazy loading for better performance
const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Portfolio = lazy(() => import('../pages/Portfolio'));
const Skills = lazy(() => import('../pages/Skills'));
const Resume = lazy(() => import('../pages/Resume'));
const Certificates = lazy(() => import('../pages/Certificates'));
const Contact = lazy(() => import('../pages/Contact'));
const NotFound = lazy(() => import('../pages/NotFound'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
