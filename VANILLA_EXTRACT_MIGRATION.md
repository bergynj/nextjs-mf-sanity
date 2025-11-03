# Vanilla Extract Migration Guide

This document describes the migration from Tailwind CSS to Vanilla Extract and how to use the new styling system.

## Overview

The project has been migrated from Tailwind CSS to Vanilla Extract, providing:

- **Token-driven design system**: All design values (colors, spacing, typography) are defined as tokens in a theme contract
- **Multi-brand theming**: Support for multiple themes (light/dark) with easy extensibility for additional brands
- **Zero-runtime performance**: All CSS is generated at build time, no runtime CSS-in-JS overhead
- **Type-safe styling**: Full TypeScript support for styles and theme tokens

## Architecture

### Theme System

#### Theme Contract (`styles/theme.css.ts`)
Defines the structure and type signature of all design tokens:
- Colors (background, foreground, primary, secondary, etc.)
- Spacing (0-96 scale)
- Typography (font sizes, weights, line heights)
- Border radius
- Shadows
- Breakpoints

#### Themes (`styles/themes/*.css.ts`)
- `light.css.ts`: Light theme implementation
- `dark.css.ts`: Dark theme implementation

Each theme implements the contract with actual values.

### Theme Provider (`components/theme-provider.tsx`)

The theme provider applies the correct theme class to the document root based on the user's preference or system setting. It integrates with `next-themes` for seamless dark mode support.

### Global Styles (`styles/global.css.ts`)

Contains:
- Base element styles (body, headings)
- Keyframe animations (accordionDown, accordionUp, fadeUp)
- Global resets

### Utilities (`styles/utils.css.ts`)

Reusable utility classes for:
- Container
- Flexbox layouts
- Grid layouts
- Typography
- Border radius
- Animation helpers

### Block Utilities (`styles/blocks.css.ts`)

Common patterns for block/page components:
- Hero sections
- Grid layouts
- Spacing utilities
- Animation delays
- Responsive helpers

## Using the System

### Applying Styles to Components

#### Using Style Objects
```tsx
import * as styles from './component.css';

export function Component() {
  return <div className={styles.container}>Content</div>;
}
```

#### Using Recipes (Variants)
```tsx
import { button } from './button.css';

export function Button({ variant, size }) {
  return (
    <button className={button({ variant, size })}>
      Click me
    </button>
  );
}
```

#### Combining Classes
```tsx
import { cn } from '@/lib/utils';
import * as styles from './component.css';

export function Component({ className }) {
  return (
    <div className={cn(styles.base, className)}>
      Content
    </div>
  );
}
```

### Creating New Styles

#### Simple Styles
```tsx
// component.css.ts
import { style } from '@vanilla-extract/css';
import { themeContract } from '@/styles/theme.css';

export const container = style({
  padding: themeContract.spacing[4],
  backgroundColor: themeContract.color.background,
  color: themeContract.color.foreground,
});
```

#### Recipes (Component Variants)
```tsx
// component.css.ts
import { recipe } from '@vanilla-extract/recipes';
import { themeContract } from '@/styles/theme.css';

export const myComponent = recipe({
  base: {
    padding: themeContract.spacing[4],
  },
  variants: {
    size: {
      sm: { fontSize: themeContract.fontSize.sm },
      md: { fontSize: themeContract.fontSize.base },
      lg: { fontSize: themeContract.fontSize.lg },
    },
    variant: {
      primary: { backgroundColor: themeContract.color.primary },
      secondary: { backgroundColor: themeContract.color.secondary },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'primary',
  },
});
```

#### Global Styles
```tsx
// component.css.ts
import { globalStyle, style } from '@vanilla-extract/css';
import { themeContract } from '@/styles/theme.css';

export const parent = style({
  padding: themeContract.spacing[4],
});

// Style children globally
globalStyle(`${parent} p`, {
  marginBottom: themeContract.spacing[2],
});
```

### Responsive Design

```tsx
import { style } from '@vanilla-extract/css';
import { themeContract } from '@/styles/theme.css';

export const responsive = style({
  fontSize: themeContract.fontSize.base,
  '@media': {
    '(min-width: 768px)': {
      fontSize: themeContract.fontSize.lg,
    },
    '(min-width: 1024px)': {
      fontSize: themeContract.fontSize.xl,
    },
  },
});
```

### Animations

```tsx
import { keyframes, style } from '@vanilla-extract/css';

const fadeIn = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

export const animated = style({
  animation: `${fadeIn} 0.3s ease-in-out`,
});
```

## Adding New Themes

To add a new brand theme:

1. Create a new theme file in `styles/themes/`:
```tsx
// styles/themes/brand-name.css.ts
import { createTheme } from '@vanilla-extract/css';
import { themeContract } from '../theme.css';

export const brandNameTheme = createTheme(themeContract, {
  color: {
    background: '#ffffff',
    foreground: '#000000',
    primary: '#0066cc',
    // ... implement all tokens from contract
  },
  // ... implement all other token categories
});
```

2. Update the theme provider to support the new theme:
```tsx
// components/theme-provider.tsx
import { brandNameTheme } from '@/styles/themes/brand-name.css';

// Add logic to apply brandNameTheme based on configuration
```

## Migrated Components

All UI components have been migrated:
- Button
- Card
- Input
- Badge
- Label
- Avatar
- Accordion
- Breadcrumb
- Section Container
- Tag Line
- Post Card
- Star Rating
- Copy Button
- Missing Sanity Page
- Breadcrumbs
- Form
- Sonner

Layout components:
- Header
- Footer

Block components:
- Hero-1 (example - others follow same pattern)

## Extending for Remaining Components

Block components not yet migrated can use the utilities in `styles/blocks.css.ts`:

```tsx
import { cn } from '@/lib/utils';
import { container } from '@/styles/utils.css';
import * as blockStyles from '@/styles/blocks.css';

export function MyBlockComponent() {
  return (
    <div className={cn(container, blockStyles.hero.container)}>
      <div className={blockStyles.hero.grid}>
        <h1 className={cn(
          blockStyles.hero.title,
          blockStyles.fadeUpAnimation,
          blockStyles.animationDelay[200]
        )}>
          Title
        </h1>
      </div>
    </div>
  );
}
```

## Performance Benefits

- **Zero runtime**: All CSS is generated at build time
- **Type safety**: Compilation errors for invalid styles
- **Tree shaking**: Unused styles are eliminated
- **Optimal bundle size**: Only used styles are included
- **No CSS-in-JS overhead**: Pure CSS output

## Resources

- [Vanilla Extract Documentation](https://vanilla-extract.style/)
- [Theme Contract](https://vanilla-extract.style/documentation/api/create-theme-contract/)
- [Recipes](https://vanilla-extract.style/documentation/packages/recipes/)
- [Global Styles](https://vanilla-extract.style/documentation/global-api/global-style/)
