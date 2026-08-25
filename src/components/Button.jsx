import React from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  widthClass = "",
  className = "",
  disabled = false,
  loading = false,
  icon,
  iconPosition = "left",
  as: Component = "button", // default 'button', Link uchun 'as={Link}'
  to,
  onClick,
  ...props
}) => {
  const baseClasses =
    "relative inline-flex items-center justify-center font-medium rounded-2xl transition-all select-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 active:scale-95";

  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white",
    secondary:
      "bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white",
    outline:
      "border border-gray-400 text-gray-700 hover:bg-gray-100 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm sm:px-4 sm:py-1.5",
    md: "px-4 py-2 text-base sm:px-5 sm:py-2.5",
    lg: "px-5 py-3 text-lg sm:px-6 sm:py-3.5",
  };

  // type faqat native button/input uchun berilsin — Link (<a>) ga o'tmasligi kerak
  const nativeProps = Component === "button" ? { type } : {};

  return (
    <Component
      {...nativeProps}
      to={to}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}
                 disabled:opacity-60 disabled:cursor-not-allowed group relative`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {!loading && icon && iconPosition === "left" && (
        <span className="mr-2 transition-transform group-hover:translate-x-1">{icon}</span>
      )}

      <span className={`${loading ? "opacity-0" : "opacity-100"} transition-opacity`}>
        {children}
      </span>

      {!loading && icon && iconPosition === "right" && (
        <span className="ml-2 transition-transform group-hover:translate-x-1">{icon}</span>
      )}

      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Loading size={20} />
        </span>
      )}
    </Component>
  );
};

export default Button;
