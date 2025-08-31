'use client';

// Simple cn function
const cn = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};
import { HTMLAttributes, forwardRef } from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ variant = 'default', size = 'md', children, className, ...props }, ref) => {
    const variants = {
      default: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
      primary: 'bg-primary-pink-100 text-primary-pink-800 dark:bg-primary-pink-900/30 dark:text-primary-pink-200',
      secondary: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
      success: 'bg-accent-green/10 text-accent-green dark:bg-accent-green/20',
      warning: 'bg-primary-yellow-100 text-primary-yellow-800 dark:bg-primary-yellow-900/30 dark:text-primary-yellow-200',
      danger: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200',
      gradient: 'bg-gradient-to-r from-primary-pink-500 to-primary-yellow-500 text-white'
    };

    const sizes = {
      sm: 'px-2 py-1 text-xs font-medium',
      md: 'px-3 py-1 text-sm font-medium',
      lg: 'px-4 py-2 text-base font-semibold'
    };

    return (
      <div
        ref={ref}
        className={`badge ${variant === 'primary' ? 'badge-primary' : variant === 'success' ? 'badge-success' : variant === 'warning' ? 'badge-warning' : variant === 'error' ? 'badge-error' : ''} ${className || ''}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };