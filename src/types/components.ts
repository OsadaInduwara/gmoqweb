import { ReactNode } from 'react';

// Navigation Types
export interface NavItem {
  name: string;
  href: string;
}

// Footer Types
export interface FooterLink {
  name: string;
  href: string;
}

export interface SocialLink {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

export interface FooterLinks {
  services: FooterLink[];
  company: FooterLink[];
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
}

// Component Props
export interface FooterProps {
  contactInfo?: ContactInfo;
  footerLinks?: FooterLinks;
  socialLinks?: SocialLink[];
  className?: string;
}

export interface NavigationProps {
  navItems?: NavItem[];
  className?: string;
}

// Error Boundary Types
export interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

// Loading States
export interface LoadingStateProps {
  message?: string;
  className?: string;
}

// Image Props with Error Handling
export interface SafeImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fallback?: ReactNode;
  onError?: () => void;
}