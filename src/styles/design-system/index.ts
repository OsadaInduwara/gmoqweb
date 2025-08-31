/**
 * Design System Exports
 * Centralized access to design system modules
 */

// CSS Module imports for TypeScript
import variables from './variables.module.css';
import themes from './themes.module.css';
import mixins from './mixins.module.css';

// Export design system modules
export const designSystem = {
  variables,
  themes,
  mixins,
} as const;

// Type definitions for design system tokens
export interface DesignTokens {
  // Colors
  brandRed: string;
  brandDarkRed: string;
  brandYellow: string;
  
  // Spacing
  space1: string;
  space2: string;
  space3: string;
  space4: string;
  space6: string;
  space8: string;
  space12: string;
  space16: string;
  space24: string;
  space32: string;
  
  // Typography
  textXs: string;
  textSm: string;
  textBase: string;
  textLg: string;
  textXl: string;
  text2xl: string;
  text3xl: string;
  text4xl: string;
  text5xl: string;
  
  // Border Radius
  radiusSm: string;
  radiusMd: string;
  radiusLg: string;
  radiusXl: string;
  radius2xl: string;
  radius3xl: string;
  
  // Shadows
  shadowSm: string;
  shadowMd: string;
  shadowLg: string;
  shadowXl: string;
  shadow2xl: string;
  shadowBrand: string;
}

// Theme types
export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  bgPrimary: string;
  bgSecondary: string;
  bgTertiary: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  borderPrimary: string;
  borderSecondary: string;
}

// Component style types
export interface ComponentStyles {
  [key: string]: string;
}

// Utility functions for working with design tokens
export const getDesignToken = (token: keyof DesignTokens): string => {
  return `var(--${token.replace(/([A-Z])/g, '-$1').toLowerCase()})`;
};

export const applyTheme = (theme: ThemeMode): string => {
  return theme === 'dark' ? themes.darkTheme : themes.lightTheme;
};

// Common CSS class combinations
export const commonStyles = {
  // Layout
  container: mixins.container,
  flexCenter: mixins.flexCenter,
  flexBetween: mixins.flexBetween,
  
  // Cards
  card: mixins.cardBase,
  cardHover: `${mixins.cardBase} ${mixins.cardHover}`,
  
  // Typography
  heading1: mixins.heading1,
  heading2: mixins.heading2,
  heading3: mixins.heading3,
  textPrimary: mixins.textPrimary,
  textSecondary: mixins.textSecondary,
  textGradient: mixins.textGradientBrand,
  
  // Buttons
  buttonPrimary: mixins.buttonPrimary,
  buttonSecondary: mixins.buttonSecondary,
  
  // Animations
  fadeIn: mixins.fadeIn,
  fadeInUp: mixins.fadeInUp,
  scaleIn: mixins.scaleIn,
  
  // Spacing
  section: mixins.section,
  sectionLg: mixins.sectionLg,
} as const;

// Export default design system configuration
export default designSystem;