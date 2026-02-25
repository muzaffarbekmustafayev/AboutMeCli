import React from 'react';
import { Helmet } from 'react-helmet-async';
import { config } from '../config';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image = '/vite.svg',
  type = 'website',
  path = ''
}) => {
  const fullTitle = title ? `${title} | ${config.app.title}` : config.app.title;
  const fullUrl = `${config.app.url}${path}`;
  const fullImage = image.startsWith('http') ? image : `${config.app.url}${image}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || config.app.description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || config.app.description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={fullImage} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || config.app.description} />
      <meta name="twitter:image" content={fullImage} />
      
      {/* Canonical */}
      <link rel="canonical" href={fullUrl} />
    </Helmet>
  );
};

export default SEO;
