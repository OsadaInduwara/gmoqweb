/**
 * TypeScript declarations for CSS Modules
 * Provides type safety for CSS Module imports
 */

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// Design System Module Types
declare module '@/styles/design-system/variables.module.css' {
  export const brandColors: string;
  export const colorPalette: string;
  export const semanticColors: string;
  export const typography: string;
  export const spacing: string;
  export const sizing: string;
  export const animations: string;
  export const breakpoints: string;
}

declare module '@/styles/design-system/themes.module.css' {
  export const lightTheme: string;
  export const darkTheme: string;
  export const themeTransition: string;
  export const a11y: string;
}

declare module '@/styles/design-system/mixins.module.css' {
  // Layout
  export const container: string;
  export const flexCenter: string;
  export const flexBetween: string;
  export const flexStart: string;
  export const flexEnd: string;
  export const flexCol: string;
  export const flexColCenter: string;
  export const gridAuto: string;
  export const grid2: string;
  export const grid3: string;
  export const grid4: string;
  
  // Spacing
  export const section: string;
  export const sectionSm: string;
  export const sectionLg: string;
  export const sectionXl: string;
  export const marginAuto: string;
  
  // Typography
  export const textXs: string;
  export const textSm: string;
  export const textBase: string;
  export const textLg: string;
  export const textXl: string;
  export const text2xl: string;
  export const text3xl: string;
  export const text4xl: string;
  export const text5xl: string;
  export const text6xl: string;
  export const heading1: string;
  export const heading2: string;
  export const heading3: string;
  export const heading4: string;
  export const heading5: string;
  export const heading6: string;
  export const textPrimary: string;
  export const textSecondary: string;
  export const textTertiary: string;
  export const textMuted: string;
  export const textBrand: string;
  export const textGradientBrand: string;
  
  // Components
  export const cardBase: string;
  export const cardHover: string;
  export const glassEffect: string;
  export const buttonBase: string;
  export const buttonPrimary: string;
  export const buttonSecondary: string;
  
  // Animations
  export const fadeIn: string;
  export const fadeInUp: string;
  export const fadeInDown: string;
  export const scaleIn: string;
  export const slideInLeft: string;
  export const slideInRight: string;
  export const hoverLift: string;
  export const hoverScale: string;
  
  // Utilities
  export const focusRing: string;
  export const srOnly: string;
  export const aspectSquare: string;
  export const aspectVideo: string;
  export const aspectPhoto: string;
  export const objectCover: string;
  export const objectContain: string;
  export const truncate: string;
  export const lineClamp2: string;
  export const lineClamp3: string;
}

// Component CSS Module Types
interface ComponentCSSModules {
  readonly [key: string]: string;
}

// Utility type for combining CSS module classes
export type CSSModuleClasses<T extends Record<string, string>> = {
  readonly [K in keyof T]: string;
};

// Helper type for conditional classes
export type ConditionalClasses = string | undefined | null | false;

// Class name utility type
export type ClassNames = ConditionalClasses | ConditionalClasses[];

// CSS Variables type
export interface CSSVariables {
  [key: `--${string}`]: string | number;
}