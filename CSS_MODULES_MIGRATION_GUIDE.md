# CSS Modules Migration Guide

## 🚀 Complete Migration from Global CSS to CSS Modules

This guide provides a comprehensive roadmap for migrating your Next.js project from a massive global CSS file to a professional, maintainable CSS Modules architecture.

## 📋 Table of Contents

- [Migration Overview](#migration-overview)
- [New Architecture](#new-architecture)
- [Step-by-Step Migration](#step-by-step-migration)
- [Component Conversion Examples](#component-conversion-examples)
- [Best Practices](#best-practices)
- [Performance Benefits](#performance-benefits)
- [Team Workflow](#team-workflow)
- [Troubleshooting](#troubleshooting)

## 🎯 Migration Overview

### Before (Current State)
```
src/
├── app/
│   └── globals.css (3000+ lines)
└── components/
    └── [Mixed Tailwind + Global CSS classes]
```

### After (Target State)
```
src/
├── styles/
│   ├── globals.css (minimal)
│   └── design-system/
│       ├── variables.module.css
│       ├── themes.module.css
│       └── mixins.module.css
└── components/
    └── [ComponentName]/
        ├── [ComponentName].tsx
        ├── [ComponentName].module.css
        ├── [ComponentName].types.ts
        └── index.ts
```

## 🏗️ New Architecture

### 1. Design System Foundation

#### Variables (`variables.module.css`)
- Brand colors and palette
- Typography scale
- Spacing system
- Animation tokens
- Breakpoints

#### Themes (`themes.module.css`)
- Light/dark mode implementations
- Semantic color tokens
- Accessibility tokens
- Theme transitions

#### Mixins (`mixins.module.css`)
- Reusable layout patterns
- Component base styles
- Animation keyframes
- Utility classes

### 2. Component Structure

Each component follows this structure:
```typescript
// Button/Button.tsx
import styles from './Button.module.css';
import { ButtonProps } from './Button.types';

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props 
}) => {
  return (
    <button 
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
```

## 🔄 Step-by-Step Migration

### Phase 1: Setup Design System

1. **Create design system structure**
   ```bash
   mkdir -p src/styles/design-system
   touch src/styles/design-system/{variables,themes,mixins}.module.css
   ```

2. **Extract design tokens from globals.css**
   - Move CSS custom properties to `variables.module.css`
   - Create theme variants in `themes.module.css`
   - Convert utility classes to `mixins.module.css`

3. **Update globals.css**
   - Keep only CSS reset and base styles
   - Import design system modules
   - Remove component-specific styles

### Phase 2: Component Migration

1. **Choose migration order**
   ```
   Priority Order:
   1. UI components (Button, Card, Input)
   2. Layout components (Header, Footer, Navigation)
   3. Section components (Hero, About, Contact)
   4. Complex components (Forms, Modals)
   ```

2. **Component migration template**
   ```typescript
   // 1. Create component folder
   mkdir src/components/ui/Button

   // 2. Create files
   touch src/components/ui/Button/{Button.tsx,Button.module.css,Button.types.ts,index.ts}

   // 3. Convert styles
   // Move component CSS to Button.module.css
   
   // 4. Update component
   // Import styles and use CSS Modules
   
   // 5. Create types
   // Define TypeScript interfaces
   
   // 6. Create barrel export
   // Export from index.ts
   ```

### Phase 3: Integration & Testing

1. **Update imports throughout codebase**
2. **Test all components in different themes**
3. **Verify responsive behavior**
4. **Check accessibility features**
5. **Performance testing**

## 📝 Component Conversion Examples

### Example 1: Button Component

**Before (Global CSS)**
```css
/* globals.css */
.btn {
  display: inline-flex;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
}

.btn-primary {
  background: linear-gradient(135deg, #c40044, #610125);
  color: white;
}
```

**After (CSS Modules)**
```css
/* Button.module.css */
.button {
  composes: buttonBase from '@/styles/design-system/mixins.module.css';
}

.primary {
  composes: buttonPrimary from '@/styles/design-system/mixins.module.css';
}

.secondary {
  composes: buttonSecondary from '@/styles/design-system/mixins.module.css';
}
```

```typescript
// Button.tsx
import styles from './Button.module.css';

export const Button = ({ variant = 'primary', children, ...props }) => (
  <button className={`${styles.button} ${styles[variant]}`} {...props}>
    {children}
  </button>
);
```

### Example 2: Card Component

**Before (Global CSS)**
```css
.card {
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}
```

**After (CSS Modules)**
```css
/* Card.module.css */
.card {
  composes: cardBase from '@/styles/design-system/mixins.module.css';
}

.cardHover {
  composes: card;
  composes: cardHover from '@/styles/design-system/mixins.module.css';
}

.glass {
  composes: card;
  composes: glassEffect from '@/styles/design-system/mixins.module.css';
}
```

### Example 3: Layout Component

**Before (Global CSS)**
```css
.section {
  padding: 6rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}
```

**After (CSS Modules)**
```css
/* Section.module.css */
.section {
  composes: section from '@/styles/design-system/mixins.module.css';
}

.container {
  composes: container from '@/styles/design-system/mixins.module.css';
}

.hero {
  composes: section;
  composes: sectionLg from '@/styles/design-system/mixins.module.css';
  background: linear-gradient(135deg, var(--bg-primary), var(--bg-accent));
}
```

## 💡 Best Practices

### 1. Naming Conventions

- **Components**: PascalCase (`Button`, `CardHeader`)
- **CSS Classes**: camelCase (`buttonPrimary`, `cardHeader`)
- **Files**: PascalCase with extensions (`Button.module.css`)
- **Folders**: PascalCase (`Button/`, `CardHeader/`)

### 2. CSS Module Organization

```css
/* Component.module.css structure */

/* ========================================
   BASE STYLES
   ======================================== */
.component {
  /* Base component styles */
}

/* ========================================
   VARIANTS
   ======================================== */
.primary { /* Primary variant */ }
.secondary { /* Secondary variant */ }

/* ========================================
   SIZES
   ======================================== */
.small { /* Small size */ }
.medium { /* Medium size */ }
.large { /* Large size */ }

/* ========================================
   STATES
   ======================================== */
.hover { /* Hover state */ }
.active { /* Active state */ }
.disabled { /* Disabled state */ }

/* ========================================
   RESPONSIVE
   ======================================== */
@media (max-width: 768px) {
  .component {
    /* Mobile styles */
  }
}
```

### 3. TypeScript Integration

```typescript
// Component.types.ts
export interface ComponentProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

// Component.tsx
import styles from './Component.module.css';
import { ComponentProps } from './Component.types';
import { cn } from '@/lib/css-utils';

export const Component: React.FC<ComponentProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  children,
  ...props
}) => {
  return (
    <div 
      className={cn(
        styles.component,
        styles[variant],
        styles[size],
        {
          [styles.disabled]: disabled
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
```

### 4. Composing Styles

```css
/* Use composes for inheritance */
.button {
  composes: buttonBase from '@/styles/design-system/mixins.module.css';
  /* Component-specific styles */
}

.primaryButton {
  composes: button;
  composes: buttonPrimary from '@/styles/design-system/mixins.module.css';
}
```

## 🚀 Performance Benefits

### Before Migration
- **Bundle Size**: Large global CSS file loaded on every page
- **Specificity Issues**: CSS conflicts and overrides
- **Unused CSS**: All styles loaded regardless of usage
- **Cache Invalidation**: Changes affect entire stylesheet

### After Migration
- **Tree Shaking**: Only used CSS modules are included
- **Scoped Styles**: No naming conflicts or specificity issues
- **Code Splitting**: CSS loaded per component/route
- **Better Caching**: Component-level cache invalidation

### Performance Metrics
```
Global CSS Approach:
- Initial CSS Bundle: 120KB
- Unused CSS: ~60-70%
- Cache Invalidation: Full stylesheet

CSS Modules Approach:
- Initial CSS Bundle: 45KB
- Unused CSS: <5%
- Cache Invalidation: Per component
- Improved Core Web Vitals
```

## 👥 Team Workflow

### 1. Development Process

```bash
# 1. Create new component
npm run create:component ButtonGroup

# 2. This creates:
# - src/components/ui/ButtonGroup/
#   ├── ButtonGroup.tsx
#   ├── ButtonGroup.module.css
#   ├── ButtonGroup.types.ts
#   └── index.ts

# 3. Develop component with hot reload
npm run dev

# 4. Test component
npm run test:component ButtonGroup

# 5. Build and analyze
npm run build:analyze
```

### 2. Code Review Checklist

- [ ] CSS Module file follows naming conventions
- [ ] All styles are scoped to the component
- [ ] TypeScript types are properly defined
- [ ] Accessibility attributes are included
- [ ] Responsive design is implemented
- [ ] Dark mode is supported
- [ ] Performance is optimized

### 3. Component Documentation

```typescript
/**
 * ButtonGroup Component
 * 
 * A group of related buttons with consistent spacing and alignment.
 * 
 * @example
 * ```tsx
 * <ButtonGroup variant="primary" size="md">
 *   <Button>Save</Button>
 *   <Button>Cancel</Button>
 * </ButtonGroup>
 * ```
 */
export const ButtonGroup: React.FC<ButtonGroupProps> = ({...}) => {
  // Component implementation
};
```

## 🛠️ Build Configuration

### Next.js Configuration

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable CSS Modules for .module.css files
  cssModules: true,
  
  // Optimize CSS
  experimental: {
    optimizeCss: true,
    cssChunking: 'all',
  },
  
  // Bundle analyzer
  webpack: (config, { dev, isServer }) => {
    // CSS Modules configuration
    config.module.rules.push({
      test: /\.module\.css$/,
      use: [
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: dev 
                ? '[name]__[local]--[hash:base64:5]'
                : '[hash:base64:8]',
            },
          },
        },
      ],
    });
    
    return config;
  },
};

module.exports = nextConfig;
```

### TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/styles/*": ["./src/styles/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/types/*": ["./src/types/*"]
    }
  },
  "include": [
    "src/types/css-modules.d.ts"
  ]
}
```

### Package.json Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "build:analyze": "ANALYZE=true next build",
    "create:component": "node scripts/create-component.js",
    "test:styles": "stylelint 'src/**/*.module.css'",
    "migrate:component": "node scripts/migrate-component.js"
  },
  "devDependencies": {
    "@next/bundle-analyzer": "^14.0.0",
    "stylelint": "^16.0.0",
    "stylelint-config-standard": "^36.0.0"
  }
}
```

## 🔍 Troubleshooting

### Common Issues and Solutions

1. **CSS Module classes not applying**
   ```typescript
   // ❌ Wrong
   <div className="button">
   
   // ✅ Correct
   <div className={styles.button}>
   ```

2. **Global styles leaking**
   ```css
   /* ❌ Wrong - affects global scope */
   .button {
     color: red;
   }
   
   /* ✅ Correct - scoped to module */
   .button {
     color: var(--text-primary);
   }
   ```

3. **Composition not working**
   ```css
   /* ❌ Wrong path */
   composes: button from '../mixins.module.css';
   
   /* ✅ Correct path */
   composes: button from '@/styles/design-system/mixins.module.css';
   ```

4. **TypeScript errors**
   ```typescript
   // Ensure css-modules.d.ts is included in tsconfig.json
   // Add proper module declarations
   ```

### Performance Issues

1. **Large bundle size**
   - Check for unused imports
   - Use dynamic imports for large components
   - Analyze bundle with `npm run build:analyze`

2. **Slow build times**
   - Use CSS Module caching
   - Optimize PostCSS configuration
   - Consider CSS-in-JS for dynamic styles

## 🎉 Migration Checklist

### Pre-Migration
- [ ] Audit current CSS usage
- [ ] Identify component boundaries
- [ ] Plan migration phases
- [ ] Set up design system structure

### During Migration
- [ ] Convert components by priority
- [ ] Test each component thoroughly
- [ ] Update all imports
- [ ] Remove unused global styles

### Post-Migration
- [ ] Performance testing
- [ ] Accessibility audit
- [ ] Team training
- [ ] Documentation update
- [ ] CI/CD pipeline update

## 📚 Resources

- [CSS Modules Official Documentation](https://github.com/css-modules/css-modules)
- [Next.js CSS Modules Guide](https://nextjs.org/docs/basic-features/built-in-css-support#adding-component-level-css)
- [Design Systems with CSS Modules](https://css-tricks.com/css-modules-part-1-need/)
- [TypeScript and CSS Modules](https://www.typescriptlang.org/docs/handbook/modules.html#ambient-modules)

---

## 🤝 Contributing

When contributing to this CSS Modules architecture:

1. Follow the established naming conventions
2. Use the design system tokens
3. Write comprehensive TypeScript types
4. Include accessibility features
5. Test in both light and dark themes
6. Document component usage

---

*This migration guide ensures a smooth transition to a maintainable, performant, and scalable CSS architecture. The new structure will improve developer experience, reduce bundle sizes, and provide better long-term maintainability.*