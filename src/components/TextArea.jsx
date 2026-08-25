// src/components/Textarea.jsx
import React, { forwardRef } from 'react';

const Textarea = forwardRef(({
  label,
  error,
  helperText,
  fullWidth = true,
  size = 'md',
  rows = 4,
  className = '',
  containerClassName = '',
  required = false,
  disabled = false,
  loading = false,
  maxLength,
  showCount = false,
  ...props
}, ref) => {
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  const getStatusStyles = () => {
    if (disabled) return 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed';
    if (loading) return 'bg-gray-50 dark:bg-gray-800 cursor-wait';
    if (error) return 'border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500 focus:ring-red-500 dark:focus:ring-red-500';
    return 'border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400';
  };

  return (
    <div className={`${widthClass} ${containerClassName}`}>
      {label && (
        <div className="flex items-center justify-between mb-2">
          <label className={`block text-sm font-medium ${
            disabled 
              ? 'text-gray-400 dark:text-gray-500' 
              : 'text-gray-700 dark:text-gray-300'
          }`}>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          
          {helperText && !error && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {helperText}
            </span>
          )}
          
          {error && (
            <span className="text-xs text-red-600 dark:text-red-400">
              {error}
            </span>
          )}
        </div>
      )}
      
      <div className="relative">
        <textarea
          ref={ref}
          rows={rows}
          disabled={disabled || loading}
          maxLength={maxLength}
          className={`
            ${sizes[size]}
            ${widthClass}
            ${getStatusStyles()}
            border
            bg-white dark:bg-gray-800
            rounded-2xl
            transition-all duration-200
            placeholder:text-gray-400 dark:placeholder:text-gray-500
            focus:outline-none focus:ring-2
            resize-none
            disabled:cursor-not-allowed
            ${className}
          `}
          {...props}
        />
        
        {loading && (
          <div className="absolute right-3 top-3">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
          </div>
        )}
        
        {showCount && maxLength && (
          <div className="absolute bottom-2 right-2 text-xs text-gray-500 dark:text-gray-400">
            {props.value?.length || 0} / {maxLength}
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
