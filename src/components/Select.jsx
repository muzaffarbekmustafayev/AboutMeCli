// src/components/Select.jsx
import React, { forwardRef, useState, useRef, useEffect } from 'react';

const Select = forwardRef(({
  label,
  options = [],
  value,
  onChange,
  onBlur,
  error,
  helperText,
  icon,
  placeholder = "Tanlang...",
  fullWidth = true,
  size = 'md',
  className = '',
  containerClassName = '',
  required = false,
  disabled = false,
  loading = false,
  searchable = false,
  multiple = false,
  maxDisplay = 3,
  showCheckmark = true,
  clearable = false,
  ...props
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [internalValue, setInternalValue] = useState(multiple ? [] : '');
  const selectRef = useRef(null);
  const dropdownRef = useRef(null);

  // Sync internal value with external value prop
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target) &&
          dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const sizes = {
    sm: 'text-sm px-3 py-2',
    md: 'text-base px-4 py-3',
    lg: 'text-lg px-5 py-4',
  };

  const widthClass = fullWidth ? 'w-full' : '';
  
  const getStatusStyles = () => {
    if (disabled) return 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed border-gray-300 dark:border-gray-700';
    if (loading) return 'bg-gray-50 dark:bg-gray-800 cursor-wait border-gray-300 dark:border-gray-700';
    if (error) return 'bg-white dark:bg-gray-800 border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500 text-gray-900 dark:text-white';
    if (isOpen) return 'bg-white dark:bg-gray-800 border-blue-500 dark:border-blue-400 text-gray-900 dark:text-white';
    return 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 text-gray-900 dark:text-white';
  };

  const getIconColor = () => {
    if (error) return 'text-red-500 dark:text-red-400';
    if (disabled) return 'text-gray-400 dark:text-gray-500';
    if (loading) return 'text-gray-400 dark:text-gray-500';
    return 'text-gray-400 dark:text-gray-500';
  };

  const filteredOptions = searchable
    ? options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (option.value && option.value.toString().toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : options;

  const getDisplayText = () => {
    if (multiple) {
      if (internalValue.length === 0) return placeholder;
      
      const selectedLabels = options
        .filter(opt => internalValue.includes(opt.value))
        .map(opt => opt.label);
      
      if (selectedLabels.length === 0) return placeholder;
      
      if (selectedLabels.length <= maxDisplay) {
        return selectedLabels.join(', ');
      }
      
      return `${selectedLabels.slice(0, maxDisplay).join(', ')} +${selectedLabels.length - maxDisplay} ta`;
    }
    
    const selectedOption = options.find(opt => opt.value === internalValue);
    return selectedOption ? selectedOption.label : placeholder;
  };

  const isSelected = (optionValue) => {
    if (multiple) {
      return internalValue.includes(optionValue);
    }
    return internalValue === optionValue;
  };

  const handleSelect = (optionValue) => {
    let newValue;
    
    if (multiple) {
      newValue = internalValue.includes(optionValue)
        ? internalValue.filter(val => val !== optionValue)
        : [...internalValue, optionValue];
    } else {
      newValue = optionValue;
      setIsOpen(false);
      setSearchTerm('');
    }
    
    setInternalValue(newValue);
    
    // Trigger onChange event
    if (onChange) {
      const event = {
        target: {
          name: props.name,
          value: newValue
        }
      };
      onChange(event);
    }
  };

  const handleClear = (e) => {
    e.stopPropagation();
    const newValue = multiple ? [] : '';
    setInternalValue(newValue);
    setSearchTerm('');
    
    if (onChange) {
      const event = {
        target: {
          name: props.name,
          value: newValue
        }
      };
      onChange(event);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'Enter' && isOpen && filteredOptions.length > 0) {
      handleSelect(filteredOptions[0].value);
    } else if (e.key === 'ArrowDown' && !isOpen) {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  const hasValue = multiple ? internalValue.length > 0 : internalValue !== '';

  return (
    <div className={`${widthClass} ${containerClassName} relative`} ref={selectRef}>
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
        {/* Select trigger */}
        <div
          className={`
            ${sizes[size]}
            ${widthClass}
            ${getStatusStyles()}
            rounded-lg
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
            cursor-pointer
            flex items-center justify-between
            ${disabled ? 'cursor-not-allowed' : ''}
            ${className}
          `}
          onClick={() => !disabled && !loading && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          tabIndex={disabled ? -1 : 0}
          ref={ref}
        >
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {icon && (
              <div className={`flex-shrink-0 ${getIconColor()} ${disabled ? 'opacity-50' : ''}`}>
                {icon}
              </div>
            )}
            
            <span className={`truncate ${!hasValue ? 'text-gray-400 dark:text-gray-500' : ''}`}>
              {getDisplayText()}
            </span>
            
            {multiple && internalValue.length > 0 && (
              <span className="flex-shrink-0 ml-2 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded-full">
                {internalValue.length} ta
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2 ml-2">
            {clearable && hasValue && !disabled && (
              <button
                type="button"
                onClick={handleClear}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors focus:outline-none"
                aria-label="Tozalash"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            
            {loading && (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
            )}
            
            <svg 
              className={`w-5 h-5 text-gray-400 dark:text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${disabled ? 'opacity-50' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Dropdown */}
        {isOpen && !disabled && (
          <div 
            ref={dropdownRef}
            className={`
              absolute z-50 mt-1 ${widthClass}
              bg-white dark:bg-gray-800
              border border-gray-200 dark:border-gray-700
              rounded-lg shadow-xl
              max-h-64 overflow-y-auto
              animate-slideDown
            `}
          >
            {/* Search input for searchable select */}
            {searchable && (
              <div className="sticky top-0 p-3 border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Qidirish..."
                    className="w-full px-3 py-2 pl-9 text-sm bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    onClick={(e) => e.stopPropagation()}
                    autoFocus
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {/* Options list */}
            <div className="py-1">
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-3 text-center text-gray-500 dark:text-gray-400 text-sm">
                  Hech narsa topilmadi
                </div>
              ) : (
                filteredOptions.map((option, index) => {
                  const selected = isSelected(option.value);
                  const isDisabled = option.disabled || false;
                  
                  return (
                    <div
                      key={index}
                      className={`
                        px-4 py-3
                        flex items-center justify-between
                        cursor-pointer
                        transition-colors duration-150
                        ${selected 
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                        }
                        ${isDisabled 
                          ? 'opacity-50 cursor-not-allowed' 
                          : ''
                        }
                      `}
                      onClick={() => !isDisabled && handleSelect(option.value)}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        {multiple ? (
                          <div className={`
                            w-5 h-5 rounded border flex items-center justify-center
                            ${selected 
                              ? 'bg-blue-500 border-blue-500 dark:bg-blue-400 dark:border-blue-400' 
                              : 'border-gray-300 dark:border-gray-600'
                            }
                          `}>
                            {selected && (
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        ) : (
                          showCheckmark && selected && (
                            <svg className="w-5 h-5 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )
                        )}
                        
                        <div className="flex-1">
                          <div className="font-medium">{option.label}</div>
                          {option.description && (
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {option.description}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {option.badge && (
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          option.badgeColor === 'blue' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                          option.badgeColor === 'green' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
                          option.badgeColor === 'red' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
                          option.badgeColor === 'yellow' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' :
                          'bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400'
                        }`}>
                          {option.badge}
                        </span>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer with selected count for multiple select */}
            {multiple && filteredOptions.length > 0 && (
              <div className="sticky bottom-0 px-4 py-3 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    {internalValue.length} ta tanlangan
                  </span>
                  <button
                    type="button"
                    onClick={() => setInternalValue([])}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    Hammasini tozalash
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p className="mt-1 text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
