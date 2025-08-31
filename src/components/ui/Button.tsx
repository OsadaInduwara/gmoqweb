'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'gradient' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    children, 
    className,
    loading = false,
    fullWidth = false,
    disabled,
    ...props 
  }, ref) => {
    const variants = {
      primary: 'bg-gradient-to-r from-primary-pink-500 to-primary-purple-500 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95',
      secondary: 'glass-effect text-gray-900 dark:text-gray-100 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 border border-gray-200/20 dark:border-gray-700/20',
      ghost: 'bg-transparent text-gray-700 dark:text-gray-300 hover:glass-effect',
      gradient: 'bg-gradient-to-r from-primary-pink-500 via-primary-purple-500 to-primary-yellow-500 text-white shadow-xl hover:shadow-2xl',
      outline: 'border-2 border-primary-pink-500 text-primary-pink-500 hover:bg-primary-pink-500 hover:text-white glass-effect'
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm font-medium',
      md: 'px-6 py-3 text-base font-semibold',
      lg: 'px-8 py-4 text-lg font-semibold',
      xl: 'px-10 py-5 text-xl font-bold'
    };

    return (
      <button
        ref={ref}
        className={`btn ${variant === 'primary' ? 'btn-primary' : variant === 'secondary' ? 'btn-secondary' : variant === 'outline' ? 'btn-outline' : 'btn-ghost'} ${size === 'lg' ? 'btn-lg' : ''} ${fullWidth ? 'w-full' : ''} ${className || ''}`}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </>
        ) : (
          children
        )}
        
        {/* Hover effect overlay */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 translate-x-[-100%] hover:translate-x-[100%] transform transition-transform duration-700 ease-in-out" />
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };