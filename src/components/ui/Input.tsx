'use client';

import { InputHTMLAttributes, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'filled' | 'ghost';
  inputSize?: 'sm' | 'md' | 'lg';
  error?: boolean;
  label?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    variant = 'default', 
    inputSize = 'md', 
    error = false,
    label,
    helperText,
    className,
    ...props 
  }, ref) => {
    const variants = {
      default: 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:ring-primary-pink-500 focus:border-primary-pink-500',
      filled: 'bg-gray-50 dark:bg-gray-900 border border-transparent focus:ring-primary-pink-500 focus:border-primary-pink-500 focus:bg-white dark:focus:bg-gray-800',
      ghost: 'bg-transparent border-b-2 border-gray-300 dark:border-gray-600 rounded-none focus:ring-0 focus:border-primary-pink-500'
    };

    const sizes = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-6 py-4 text-lg'
    };

    const inputId = props.id || props.name;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`input ${error ? 'error' : ''} ${className || ''}`}
          {...props}
        />
        {helperText && (
          <p className={error ? 'input-error' : 'text-muted'}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };