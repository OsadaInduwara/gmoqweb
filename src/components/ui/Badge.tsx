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
      default: 'bg-gray-100 text-gray-800',
      primary: 'bg-primary-pink-100 text-primary-pink-800',
      secondary: 'bg-gray-100 text-gray-700',
      success: 'bg-accent-green/10 text-accent-green',
      warning: 'bg-primary-yellow-100 text-primary-yellow-800',
      danger: 'bg-red-100 text-red-800',
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