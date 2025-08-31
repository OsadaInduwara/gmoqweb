#!/usr/bin/env node
/**
 * Component Creation Script
 * Generates a new React component with CSS Modules, types, and barrel export
 * 
 * Usage: npm run create:component ComponentName [ui|layout|sections]
 */

const fs = require('fs');
const path = require('path');

// Get command line arguments
const componentName = process.argv[2];
const category = process.argv[3] || 'ui';

if (!componentName) {
  console.error('❌ Please provide a component name');
  console.log('Usage: npm run create:component ComponentName [ui|layout|sections]');
  process.exit(1);
}

// Validate component name
if (!/^[A-Z][A-Za-z0-9]*$/.test(componentName)) {
  console.error('❌ Component name must be PascalCase and start with a capital letter');
  process.exit(1);
}

// Define paths
const baseDir = path.join(process.cwd(), 'src', 'components', category, componentName);
const files = {
  component: path.join(baseDir, `${componentName}.tsx`),
  styles: path.join(baseDir, `${componentName}.module.css`),
  types: path.join(baseDir, `${componentName}.types.ts`),
  index: path.join(baseDir, 'index.ts'),
};

// Create component directory
if (fs.existsSync(baseDir)) {
  console.error(`❌ Component ${componentName} already exists at ${baseDir}`);
  process.exit(1);
}

fs.mkdirSync(baseDir, { recursive: true });

// Component template
const componentTemplate = `'use client';

import styles from './${componentName}.module.css';
import { ${componentName}Props } from './${componentName}.types';
import { cn } from '@/lib/css-utils';

export const ${componentName}: React.FC<${componentName}Props> = ({
  variant = 'default',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  return (
    <div 
      className={cn(
        styles.${componentName.toLowerCase()},
        styles[variant],
        styles[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default ${componentName};
`;

// Styles template
const stylesTemplate = `/**
 * ${componentName} Component Styles
 */

/* ========================================
   BASE STYLES
   ======================================== */
.${componentName.toLowerCase()} {
  /* Base styles for ${componentName} */
  position: relative;
  transition: var(--transition-all);
}

/* ========================================
   VARIANTS
   ======================================== */
.default {
  /* Default variant styles */
  background: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
}

.primary {
  composes: default;
  background: var(--brand-red);
  color: white;
  border-color: var(--brand-red);
}

.secondary {
  composes: default;
  background: var(--bg-secondary);
  color: var(--text-secondary);
  border-color: var(--border-secondary);
}

/* ========================================
   SIZES
   ======================================== */
.sm {
  padding: var(--space-2) var(--space-3);
  font-size: var(--text-sm);
}

.md {
  padding: var(--space-3) var(--space-4);
  font-size: var(--text-base);
}

.lg {
  padding: var(--space-4) var(--space-6);
  font-size: var(--text-lg);
}

/* ========================================
   STATES
   ======================================== */
.${componentName.toLowerCase()}:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.${componentName.toLowerCase()}:focus-visible {
  outline: 2px solid var(--border-focus);
  outline-offset: 2px;
}

.disabled {
  opacity: 0.5;
  pointer-events: none;
  cursor: not-allowed;
}

/* ========================================
   RESPONSIVE DESIGN
   ======================================== */
@media (max-width: 768px) {
  .${componentName.toLowerCase()} {
    /* Mobile styles */
  }
}

/* ========================================
   DARK MODE
   ======================================== */
:global(.dark) .default {
  background: var(--bg-secondary);
  color: var(--text-primary);
  border-color: var(--border-primary);
}

/* ========================================
   ACCESSIBILITY
   ======================================== */
@media (prefers-reduced-motion: reduce) {
  .${componentName.toLowerCase()} {
    transition: none;
  }
  
  .${componentName.toLowerCase()}:hover {
    transform: none;
  }
}

@media (prefers-contrast: high) {
  .default {
    border-width: 2px;
  }
}
`;

// Types template
const typesTemplate = `/**
 * ${componentName} Component Types
 */

import { HTMLAttributes, ReactNode } from 'react';

// Base props interface
export interface ${componentName}Props extends HTMLAttributes<HTMLDivElement> {
  /** Visual variant of the component */
  variant?: 'default' | 'primary' | 'secondary';
  
  /** Size variant of the component */
  size?: 'sm' | 'md' | 'lg';
  
  /** Whether the component is disabled */
  disabled?: boolean;
  
  /** Additional CSS class name */
  className?: string;
  
  /** Component children */
  children?: ReactNode;
}

// Extended props for advanced usage
export interface ${componentName}ExtendedProps extends ${componentName}Props {
  /** Loading state */
  loading?: boolean;
  
  /** Error state */
  error?: boolean;
  
  /** Success state */
  success?: boolean;
  
  /** Custom theme override */
  theme?: 'light' | 'dark' | 'auto';
  
  /** Animation configuration */
  animation?: {
    enabled?: boolean;
    duration?: number;
    easing?: string;
  };
}

// Event handler types
export interface ${componentName}EventHandlers {
  /** Triggered when component is clicked */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  
  /** Triggered when component receives focus */
  onFocus?: (event: React.FocusEvent<HTMLDivElement>) => void;
  
  /** Triggered when component loses focus */
  onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void;
  
  /** Triggered when mouse enters component */
  onMouseEnter?: (event: React.MouseEvent<HTMLDivElement>) => void;
  
  /** Triggered when mouse leaves component */
  onMouseLeave?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

// Style configuration type
export interface ${componentName}StyleConfig {
  /** Custom CSS variables */
  customProperties?: Record<string, string>;
  
  /** Animation overrides */
  animations?: {
    hover?: string;
    focus?: string;
    active?: string;
  };
  
  /** Responsive breakpoints */
  responsive?: {
    mobile?: Partial<${componentName}Props>;
    tablet?: Partial<${componentName}Props>;
    desktop?: Partial<${componentName}Props>;
  };
}

// Component ref type
export type ${componentName}Ref = HTMLDivElement;

export default ${componentName}Props;
`;

// Index template
const indexTemplate = `/**
 * ${componentName} Component Barrel Export
 */

export { ${componentName} } from './${componentName}';
export type {
  ${componentName}Props,
  ${componentName}ExtendedProps,
  ${componentName}EventHandlers,
  ${componentName}StyleConfig,
  ${componentName}Ref
} from './${componentName}.types';

// Default export for convenient importing
export { default } from './${componentName}';
`;

// Write files
try {
  fs.writeFileSync(files.component, componentTemplate);
  fs.writeFileSync(files.styles, stylesTemplate);
  fs.writeFileSync(files.types, typesTemplate);
  fs.writeFileSync(files.index, indexTemplate);

  console.log('✅ Component created successfully!');
  console.log('📁 Files created:');
  console.log(`   ${files.component}`);
  console.log(`   ${files.styles}`);
  console.log(`   ${files.types}`);
  console.log(`   ${files.index}`);
  console.log('');
  console.log('🚀 Next steps:');
  console.log('   1. Import and use your component:');
  console.log(`      import { ${componentName} } from '@/components/${category}/${componentName}';`);
  console.log('   2. Customize the styles in the .module.css file');
  console.log('   3. Update the TypeScript interfaces as needed');
  console.log('   4. Test your component in Storybook or your app');

} catch (error) {
  console.error('❌ Error creating component:', error.message);
  
  // Cleanup on error
  if (fs.existsSync(baseDir)) {
    fs.rmSync(baseDir, { recursive: true, force: true });
  }
  
  process.exit(1);
}
`;
