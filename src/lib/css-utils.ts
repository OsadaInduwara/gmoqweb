/**
 * CSS Module Utilities
 * Helper functions for working with CSS Modules and class names
 */

import { type ClassValue, clsx } from 'clsx';

// Utility type for CSS module class objects
type CSSModuleClasses = Record<string, string>;

// Conditional class names type
type ConditionalClass = string | undefined | null | false | 0 | '';

/**
 * Enhanced class name utility that works with CSS Modules
 * Combines clsx functionality with CSS Module support
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/**
 * Combine CSS Module classes with conditional logic
 * @param classes - CSS Module classes object
 * @param classNames - Object with boolean conditions
 * @returns Combined class string
 */
export function combineModuleClasses(
  classes: CSSModuleClasses,
  classNames: Record<string, boolean | ConditionalClass>
): string {
  const validClasses = Object.entries(classNames)
    .filter(([, condition]) => Boolean(condition))
    .map(([className]) => classes[className])
    .filter(Boolean);

  return validClasses.join(' ');
}

/**
 * Create a class name builder for a specific CSS Module
 * @param moduleClasses - CSS Module classes object
 * @returns Function to build class names from the module
 */
export function createClassBuilder(moduleClasses: CSSModuleClasses) {
  return function buildClasses(
    baseClass: string,
    conditionalClasses?: Record<string, boolean | ConditionalClass>,
    additionalClasses?: string
  ): string {
    const classes = [moduleClasses[baseClass]];
    
    if (conditionalClasses) {
      const conditional = combineModuleClasses(moduleClasses, conditionalClasses);
      if (conditional) classes.push(conditional);
    }
    
    if (additionalClasses) {
      classes.push(additionalClasses);
    }
    
    return classes.filter(Boolean).join(' ');
  };
}

/**
 * Generate responsive class names based on breakpoints
 * @param baseClass - Base CSS class
 * @param responsive - Responsive configuration
 * @returns Array of responsive classes
 */
export function createResponsiveClasses(
  baseClass: string,
  responsive: {
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
    '2xl'?: string;
  }
): string[] {
  const classes = [baseClass];
  
  Object.entries(responsive).forEach(([breakpoint, className]) => {
    if (className) {
      classes.push(`${breakpoint}:${className}`);
    }
  });
  
  return classes;
}

/**
 * Apply theme-specific classes
 * @param classes - CSS Module classes
 * @param theme - Current theme
 * @param variants - Theme variants
 * @returns Theme-specific class string
 */
export function applyThemeClasses(
  classes: CSSModuleClasses,
  theme: 'light' | 'dark' | 'auto',
  variants: {
    light?: string;
    dark?: string;
    base: string;
  }
): string {
  const themeClasses = [classes[variants.base]];
  
  if (theme === 'light' && variants.light) {
    themeClasses.push(classes[variants.light]);
  } else if (theme === 'dark' && variants.dark) {
    themeClasses.push(classes[variants.dark]);
  }
  
  return themeClasses.filter(Boolean).join(' ');
}

/**
 * Handle component size variants
 * @param classes - CSS Module classes
 * @param size - Component size
 * @param sizeMap - Size to class mapping
 * @returns Size-specific class string
 */
export function applySizeClasses(
  classes: CSSModuleClasses,
  size: string,
  sizeMap: Record<string, string>
): string {
  const sizeClass = sizeMap[size];
  return sizeClass ? classes[sizeClass] : '';
}

/**
 * Generate animation classes with timing
 * @param classes - CSS Module classes
 * @param animation - Animation configuration
 * @returns Animation class string with inline styles
 */
export function createAnimationClasses(
  classes: CSSModuleClasses,
  animation: {
    name: string;
    delay?: number;
    duration?: number;
    easing?: string;
  }
): { className: string; style: React.CSSProperties } {
  const className = classes[animation.name] || '';
  
  const style: React.CSSProperties = {};
  if (animation.delay) style.animationDelay = `${animation.delay}ms`;
  if (animation.duration) style.animationDuration = `${animation.duration}ms`;
  if (animation.easing) style.animationTimingFunction = animation.easing;
  
  return { className, style };
}

/**
 * Create CSS custom properties for dynamic theming
 * @param tokens - Design tokens
 * @returns CSS custom properties object
 */
export function createCSSCustomProperties(
  tokens: Record<string, string | number>
): React.CSSProperties {
  const cssProperties: React.CSSProperties = {};
  
  Object.entries(tokens).forEach(([key, value]) => {
    const cssVarName = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
    cssProperties[cssVarName as keyof React.CSSProperties] = String(value);
  });
  
  return cssProperties;
}

/**
 * Generate focus ring classes for accessibility
 * @param classes - CSS Module classes
 * @param variant - Focus ring variant
 * @returns Focus ring class string
 */
export function createFocusClasses(
  classes: CSSModuleClasses,
  variant: 'default' | 'brand' | 'error' | 'none' = 'default'
): string {
  const focusMap = {
    default: 'focusRing',
    brand: 'focusRingBrand',
    error: 'focusRingError',
    none: ''
  };
  
  const focusClass = focusMap[variant];
  return focusClass ? classes[focusClass] || '' : '';
}

/**
 * Handle state-based classes (hover, active, disabled, etc.)
 * @param classes - CSS Module classes
 * @param states - State configuration
 * @returns State-based class string
 */
export function applyStateClasses(
  classes: CSSModuleClasses,
  states: {
    hover?: boolean;
    active?: boolean;
    disabled?: boolean;
    loading?: boolean;
    error?: boolean;
    success?: boolean;
  }
): string {
  const stateClasses: string[] = [];
  
  Object.entries(states).forEach(([state, isActive]) => {
    if (isActive && classes[state]) {
      stateClasses.push(classes[state]);
    }
  });
  
  return stateClasses.join(' ');
}

/**
 * Create grid and layout helper classes
 * @param classes - CSS Module classes
 * @param layout - Layout configuration
 * @returns Layout class string
 */
export function createLayoutClasses(
  classes: CSSModuleClasses,
  layout: {
    display?: 'flex' | 'grid' | 'block' | 'inline' | 'inline-flex';
    direction?: 'row' | 'column';
    justify?: 'start' | 'center' | 'end' | 'between' | 'around';
    align?: 'start' | 'center' | 'end' | 'stretch';
    gap?: 'sm' | 'md' | 'lg' | 'xl';
    columns?: number;
  }
): string {
  const layoutClasses: string[] = [];
  
  if (layout.display) {
    const displayClass = classes[layout.display];
    if (displayClass) layoutClasses.push(displayClass);
  }
  
  if (layout.direction) {
    const directionClass = classes[`${layout.display}${layout.direction.charAt(0).toUpperCase() + layout.direction.slice(1)}`];
    if (directionClass) layoutClasses.push(directionClass);
  }
  
  if (layout.justify) {
    const justifyClass = classes[`justify${layout.justify.charAt(0).toUpperCase() + layout.justify.slice(1)}`];
    if (justifyClass) layoutClasses.push(justifyClass);
  }
  
  if (layout.align) {
    const alignClass = classes[`align${layout.align.charAt(0).toUpperCase() + layout.align.slice(1)}`];
    if (alignClass) layoutClasses.push(alignClass);
  }
  
  if (layout.gap) {
    const gapClass = classes[`gap${layout.gap.charAt(0).toUpperCase() + layout.gap.slice(1)}`];
    if (gapClass) layoutClasses.push(gapClass);
  }
  
  if (layout.columns) {
    const columnsClass = classes[`grid${layout.columns}`];
    if (columnsClass) layoutClasses.push(columnsClass);
  }
  
  return layoutClasses.filter(Boolean).join(' ');
}

/**
 * Development helper to log CSS Module class mappings
 * @param moduleName - Name of the CSS Module
 * @param classes - CSS Module classes object
 */
export function debugCSSModule(
  moduleName: string,
  classes: CSSModuleClasses
): void {
  if (process.env.NODE_ENV === 'development') {
    console.group(`🎨 CSS Module: ${moduleName}`);
    console.table(classes);
    console.groupEnd();
  }
}