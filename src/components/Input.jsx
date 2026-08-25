// src/components/Input.jsx
import React, { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  error,
  helperText,
  icon,
  iconPosition = 'left',
  fullWidth = true,
  size = 'md',
  className = '',
  containerClassName = '',
  required = false,
  disabled = false,
  loading = false,
  success = false,
  ...props
}, ref) => {
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg',
  };
  
  const iconPadding = icon ? (iconPosition === 'left' ? 'pl-10' : 'pr-10') : '';
  const widthClass = fullWidth ? 'w-full' : '';
  
  const getStatusStyles = () => {
    if (disabled) return 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed';
    if (loading) return 'bg-gray-50 dark:bg-gray-800 cursor-wait';
    if (error) return 'border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500 focus:ring-red-500 dark:focus:ring-red-500';
    if (success) return 'border-green-500 dark:border-green-500 focus:border-green-500 dark:focus:border-green-500 focus:ring-green-500 dark:focus:ring-green-500';
    return 'border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400';
  };
  
  const getIconColor = () => {
    if (error) return 'text-red-500 dark:text-red-400';
    if (success) return 'text-green-500 dark:text-green-400';
    if (disabled) return 'text-gray-400 dark:text-gray-500';
    return 'text-gray-400 dark:text-gray-500';
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
        {icon && iconPosition === 'left' && (
          <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${getIconColor()} ${disabled ? 'opacity-50' : ''}`}>
            {icon}
          </div>
        )}
        
        <input
          ref={ref}
          disabled={disabled || loading}
          className={`
            ${sizes[size]}
            ${iconPadding}
            ${widthClass}
            ${getStatusStyles()}
            border
            bg-white dark:bg-gray-800
            rounded-2xl
            transition-all duration-200
            placeholder:text-gray-400 dark:placeholder:text-gray-500
            focus:outline-none focus:ring-2
            disabled:cursor-not-allowed
            ${className}
          `}
          {...props}
        />
        
        {icon && iconPosition === 'right' && (
          <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${getIconColor()} ${disabled ? 'opacity-50' : ''}`}>
            {icon}
          </div>
        )}
        
        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
          </div>
        )}
        
        {success && !loading && !icon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 dark:text-green-400">
            ✓
          </div>
        )}
      </div>
      
      {/* Helper text below input */}
      {helperText && error && (
        <p className="mt-1 text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
