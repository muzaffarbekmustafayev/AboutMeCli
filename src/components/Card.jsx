// src/components/Card.jsx
import React from 'react';

const Card = ({ 
  children, 
  className = '',
  hoverable = true,
  padding = 'md',
  rounded = 'lg',
  shadow = 'md',
  border = false,
  gradient = false,
  ...props 
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  
  const roundedClasses = {
    none: '',
    sm: 'rounded-xl',
    md: 'rounded-2xl',
    lg: 'rounded-2xl',
    xl: 'rounded-2xl',
    full: 'rounded-full',
  };
  
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };
  
  const borderClass = border 
    ? 'border border-gray-200 dark:border-gray-700' 
    : '';
  
  const gradientClass = gradient
    ? 'bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900'
    : 'bg-white dark:bg-gray-800';
  
  const hoverClass = hoverable 
    ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-[0.98] cursor-pointer'
    : '';
  
  return (
    <div
      className={`
        ${gradientClass}
        ${paddingClasses[padding]}
        ${roundedClasses[rounded]}
        ${shadowClasses[shadow]}
        ${borderClass}
        ${hoverClass}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

// Card Header komponenti
const CardHeader = ({ children, className = '', withDivider = false }) => (
  <div className={`${withDivider ? 'pb-4 mb-4 border-b border-gray-200 dark:border-gray-700' : ''} ${className}`}>
    {children}
  </div>
);

// Card Body komponenti
const CardBody = ({ children, className = '' }) => (
  <div className={className}>
    {children}
  </div>
);

// Card Footer komponenti
const CardFooter = ({ children, className = '', withDivider = false }) => (
  <div className={`${withDivider ? 'pt-4 mt-4 border-t border-gray-200 dark:border-gray-700' : ''} ${className}`}>
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
