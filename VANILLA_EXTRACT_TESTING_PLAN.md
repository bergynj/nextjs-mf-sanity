# Comprehensive Testing Plan: Tailwind CSS to Vanilla Extract Migration

## Overview
This testing plan outlines a systematic approach to migrate styling from Tailwind CSS v4 to Vanilla Extract while maintaining visual and functional parity. The project uses Radix UI components, class-variance-authority (CVA), and Next.js 15.

---

## Project Structure Analysis

### Components to Migrate
**Total Components: 60+**

#### UI Components (20 files)
- `accordion.tsx` - Radix Accordion wrapper
- `avatar.tsx` - Radix Avatar wrapper
- `badge.tsx` - Status/label component
- `breadcrumb.tsx` & `breadcrumbs.tsx` - Navigation components
- `button.tsx` - CVA-based button with 6 variants
- `card.tsx` - Card system (6 sub-components)
- `carousel.tsx` - Embla carousel wrapper
- `copy-button.tsx` - Interactive button
- `dropdown-menu.tsx` - Radix dropdown wrapper
- `form.tsx` - React Hook Form wrapper
- `input.tsx` - Form input
- `label.tsx` - Form label
- `missing-sanity-page.tsx` - Error state
- `post-card.tsx` - Content card
- `section-container.tsx` - Layout wrapper
- `sheet.tsx` - Radix Dialog wrapper
- `sonner.tsx` - Toast notifications
- `star-rating.tsx` - Interactive rating
- `tag-line.tsx` - Text component

#### Block Components (23 files)
- `all-posts.tsx` - Post listing
- `carousel-1.tsx` & `carousel-2.tsx` - Carousel variations
- `cta-1.tsx` - Call-to-action
- `faqs.tsx` - FAQ accordion
- `newsletter.tsx` - Form component
- `grid-card.tsx`, `grid-post.tsx`, `grid-row.tsx`, `pricing-card.tsx` - Grid system
- `hero-1.tsx` & `hero-2.tsx` - Hero sections
- `logo-cloud-1.tsx` - Logo display
- `post-hero.tsx` - Post header
- `section-header.tsx` - Section titles
- `split-*.tsx` (7 files) - Split layout system
- `timeline-1.tsx` & `timeline-row.tsx` - Timeline components

#### Layout Components (11 files)
- `404.tsx` - Error page
- `footer.tsx` - Site footer
- `header/` (3 files) - Navigation system
- `logo.tsx` - Brand logo
- `menu-toggle.tsx` - Mobile menu
- `portable-text-renderer.tsx` - Content renderer
- `post-date.tsx` - Date formatter
- `theme-provider.tsx` - Dark mode

### Current Styling Patterns
1. **CSS Variables**: Custom theme tokens (--color-*, --radius-*, --font-*)
2. **CVA Integration**: `class-variance-authority` for component variants
3. **Dark Mode**: CSS class-based (.dark)
4. **Custom Animations**: accordion, fade-up
5. **Responsive Design**: Mobile-first breakpoints
6. **Utility Classes**: Tailwind utilities throughout
7. **cn() Helper**: clsx + tailwind-merge utility

---

## Priority 1: Visual Regression Testing (HIGHEST)
**Goal**: Ensure pixel-perfect visual consistency across migration

### Setup Requirements
```json
{
  "devDependencies": {
    "@storybook/addon-essentials": "^8.5.0",
    "@storybook/addon-interactions": "^8.5.0",
    "@storybook/addon-themes": "^8.5.0",
    "@storybook/nextjs": "^8.5.0",
    "@storybook/react": "^8.5.0",
    "chromatic": "^12.0.0",
    "storybook": "^8.5.0"
  }
}
```

### 1.1 Storybook Configuration
**Test Files**: `.storybook/` configuration

#### Stories to Create (60+ stories)
```
stories/
├── ui/
│   ├── Button.stories.tsx (6 variants × 4 sizes × 2 themes = 48 variants)
│   ├── Card.stories.tsx
│   ├── Input.stories.tsx
│   ├── Badge.stories.tsx
│   ├── Accordion.stories.tsx
│   ├── Avatar.stories.tsx
│   ├── Breadcrumbs.stories.tsx
│   ├── Carousel.stories.tsx
│   ├── CopyButton.stories.tsx
│   ├── DropdownMenu.stories.tsx
│   ├── Form.stories.tsx
│   ├── Label.stories.tsx
│   ├── Sheet.stories.tsx
│   ├── StarRating.stories.tsx
│   ├── TagLine.stories.tsx
│   └── PostCard.stories.tsx
├── blocks/
│   ├── Hero1.stories.tsx
│   ├── Hero2.stories.tsx
│   ├── Carousel1.stories.tsx
│   ├── Carousel2.stories.tsx
│   ├── CTA1.stories.tsx
│   ├── FAQs.stories.tsx
│   ├── Newsletter.stories.tsx
│   ├── GridCard.stories.tsx
│   ├── GridPost.stories.tsx
│   ├── GridRow.stories.tsx
│   ├── PricingCard.stories.tsx
│   ├── LogoCloud1.stories.tsx
│   ├── PostHero.stories.tsx
│   ├── SectionHeader.stories.tsx
│   ├── SplitRow.stories.tsx
│   ├── Timeline1.stories.tsx
│   └── TimelineRow.stories.tsx
├── layout/
│   ├── Header.stories.tsx
│   ├── Footer.stories.tsx
│   ├── Logo.stories.tsx
│   └── MenuToggle.stories.tsx
└── compositions/
    ├── HomePage.stories.tsx
    ├── BlogPage.stories.tsx
    └── PostPage.stories.tsx
```

### 1.2 Chromatic Visual Tests
**Test Count**: ~150 snapshots (components × variants × themes × viewports)

#### Test Matrix
```typescript
// Viewports to test
const viewports = [
  { name: 'mobile', width: 375, height: 667 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 800 },
  { name: 'wide', width: 1920, height: 1080 }
];

// Themes to test
const themes = ['light', 'dark'];

// States to test
const states = [
  'default',
  'hover',
  'focus',
  'active',
  'disabled',
  'error'
];
```

#### Critical UI Components Tests
**Priority: Must pass before migration sign-off**

1. **Button Component** (48 test cases)
   - ✓ 6 variants (default, destructive, outline, secondary, ghost, link)
   - ✓ 4 sizes (default, sm, lg, icon)
   - ✓ 2 themes (light, dark)
   - ✓ 5 states (default, hover, focus, active, disabled)
   - ✓ With/without icon
   - ✓ Focus ring styling
   - ✓ Shadow consistency

2. **Card Component** (24 test cases)
   - ✓ All sub-components (Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter)
   - ✓ Border radius consistency
   - ✓ Shadow rendering
   - ✓ Spacing (padding/gap)
   - ✓ Theme variants

3. **Input Component** (30 test cases)
   - ✓ Default state
   - ✓ Focus state (ring, outline)
   - ✓ Error state (aria-invalid)
   - ✓ Disabled state
   - ✓ With label/without label
   - ✓ Form validation states

4. **Accordion Component** (12 test cases)
   - ✓ Collapsed state
   - ✓ Expanded state
   - ✓ Animation (accordion-down/up)
   - ✓ Multiple items
   - ✓ Theme variants

5. **Dropdown Menu** (18 test cases)
   - ✓ Closed state
   - ✓ Open state
   - ✓ Item hover states
   - ✓ Keyboard focus indicators
   - ✓ Positioning

#### Block Components Tests
**Priority: High**

6. **Hero Components** (16 test cases)
   - ✓ Hero-1: Grid layout, image positioning, animations
   - ✓ Hero-2: Alternative layout
   - ✓ Responsive breakpoints (mobile → desktop)
   - ✓ Animation timing (fade-up delays)
   - ✓ Button group spacing

7. **Grid System** (24 test cases)
   - ✓ Grid-row: 2/3/4 column layouts
   - ✓ Grid-card: Content alignment
   - ✓ Grid-post: Image aspect ratios
   - ✓ Pricing-card: Border, shadow, hover states
   - ✓ Gap consistency

8. **Split Layout** (28 test cases)
   - ✓ Split-row: 2-column layouts
   - ✓ Split-content: Text positioning
   - ✓ Split-image: Image rendering
   - ✓ Split-cards-list: Card stacking
   - ✓ Split-info-list: List styling
   - ✓ No-gap variant

9. **Carousel Components** (20 test cases)
   - ✓ Carousel-1 & Carousel-2
   - ✓ Embla carousel integration
   - ✓ Navigation buttons
   - ✓ Dots indicator
   - ✓ Slide spacing
   - ✓ Overflow handling

10. **Forms** (16 test cases)
    - ✓ Newsletter form
    - ✓ Input styling
    - ✓ Button alignment
    - ✓ Error messages
    - ✓ Form validation states

#### Layout Components Tests
**Priority: Critical**

11. **Header/Navigation** (24 test cases)
    - ✓ Desktop nav: Link hover, active states
    - ✓ Mobile nav: Sheet/drawer open state
    - ✓ Menu toggle: Hamburger animation
    - ✓ Logo rendering
    - ✓ Sticky positioning
    - ✓ Theme switcher

12. **Footer** (8 test cases)
    - ✓ Layout structure
    - ✓ Link spacing
    - ✓ Copyright text
    - ✓ Responsive stacking

### 1.3 Test Execution Plan
```bash
# Pre-migration baseline
npx chromatic --project-token=<token> --branch-name=main

# During migration (per component)
npx chromatic --project-token=<token> --branch-name=migration/<component>

# Final validation
npx chromatic --project-token=<token> --branch-name=migration/final
```

#### Acceptance Criteria
- ✓ 0 visual regressions across all components
- ✓ All animations render identically
- ✓ Focus states match exactly
- ✓ Dark mode parity
- ✓ Responsive breakpoints consistent

---

## Priority 2: Unit Testing (MEDIUM)
**Goal**: Validate functional behavior and API consistency

### Setup Requirements
```json
{
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.1.0",
    "@testing-library/user-event": "^14.6.0",
    "@vitejs/plugin-react": "^4.3.4",
    "jsdom": "^26.0.0",
    "msw": "^2.8.0",
    "vitest": "^2.1.8"
  }
}
```

### 2.1 Component Behavior Tests

#### Test File Structure
```
__tests__/
├── ui/
│   ├── button.test.tsx
│   ├── card.test.tsx
│   ├── input.test.tsx
│   ├── accordion.test.tsx
│   ├── dropdown-menu.test.tsx
│   ├── form.test.tsx
│   ├── sheet.test.tsx
│   └── ...
├── blocks/
│   ├── hero-1.test.tsx
│   ├── grid-row.test.tsx
│   ├── split-row.test.tsx
│   └── ...
└── utils/
    ├── cn.test.ts
    └── theme.test.ts
```

#### Button Component Tests (button.test.tsx)
**Test Count**: 25 tests
```typescript
describe('Button', () => {
  describe('Variants', () => {
    it('renders default variant with correct classes', () => {});
    it('renders destructive variant with correct classes', () => {});
    it('renders outline variant with correct classes', () => {});
    it('renders secondary variant with correct classes', () => {});
    it('renders ghost variant with correct classes', () => {});
    it('renders link variant with correct classes', () => {});
  });

  describe('Sizes', () => {
    it('renders default size with correct classes', () => {});
    it('renders small size with correct classes', () => {});
    it('renders large size with correct classes', () => {});
    it('renders icon size with correct classes', () => {});
  });

  describe('States', () => {
    it('applies disabled styles when disabled', () => {});
    it('applies focus styles when focused', () => {});
    it('applies hover styles on mouse over', () => {});
  });

  describe('Composition', () => {
    it('renders as child component when asChild is true', () => {});
    it('merges custom className with variant classes', () => {});
    it('renders with icon and correct spacing', () => {});
  });

  describe('Accessibility', () => {
    it('is keyboard accessible', () => {});
    it('has correct ARIA attributes', () => {});
    it('shows focus ring on keyboard focus', () => {});
  });

  describe('Vanilla Extract Migration', () => {
    it('maintains same computed styles after migration', () => {});
    it('applies correct CSS custom properties', () => {});
    it('handles theme transitions correctly', () => {});
  });
});
```

#### Card Component Tests (card.test.tsx)
**Test Count**: 18 tests
```typescript
describe('Card', () => {
  describe('Structure', () => {
    it('renders all sub-components correctly', () => {});
    it('applies correct spacing to CardHeader', () => {});
    it('applies correct spacing to CardContent', () => {});
    it('applies correct spacing to CardFooter', () => {});
  });

  describe('Styling', () => {
    it('applies border and shadow correctly', () => {});
    it('applies border-radius correctly', () => {});
    it('applies theme colors correctly', () => {});
  });

  describe('Composition', () => {
    it('accepts custom className', () => {});
    it('forwards all props correctly', () => {});
    it('maintains proper nesting structure', () => {});
  });

  describe('Vanilla Extract Migration', () => {
    it('maintains same padding values', () => {});
    it('maintains same gap values', () => {});
    it('maintains same border values', () => {});
    it('maintains same shadow values', () => {});
    it('applies correct theme variable references', () => {});
  });
});
```

#### Input Component Tests (input.test.tsx)
**Test Count**: 20 tests
```typescript
describe('Input', () => {
  describe('Basic Functionality', () => {
    it('renders input element', () => {});
    it('accepts and displays value', () => {});
    it('calls onChange handler', () => {});
    it('handles blur events', () => {});
  });

  describe('States', () => {
    it('applies focus styles when focused', () => {});
    it('applies disabled styles when disabled', () => {});
    it('applies error styles when aria-invalid', () => {});
    it('maintains placeholder styling', () => {});
  });

  describe('Focus Ring', () => {
    it('shows focus ring on keyboard focus', () => {});
    it('shows outline on focus', () => {});
    it('hides focus ring on aria-invalid', () => {});
  });

  describe('Vanilla Extract Migration', () => {
    it('maintains same border styling', () => {});
    it('maintains same height', () => {});
    it('maintains same padding', () => {});
    it('maintains same font size', () => {});
    it('maintains same focus ring styles', () => {});
    it('maintains same transition timing', () => {});
  });
});
```

#### Accordion Component Tests (accordion.test.tsx)
**Test Count**: 15 tests
```typescript
describe('Accordion', () => {
  describe('Animation', () => {
    it('animates with accordion-down keyframe', () => {});
    it('animates with accordion-up keyframe', () => {});
    it('respects animation duration', () => {});
    it('uses ease-out timing function', () => {});
  });

  describe('Vanilla Extract Migration', () => {
    it('maintains animation keyframes', () => {});
    it('maintains animation timing', () => {});
    it('correctly references Radix CSS variables', () => {});
  });
});
```

### 2.2 Utility Function Tests

#### cn() Helper Tests (cn.test.ts)
**Test Count**: 12 tests
```typescript
describe('cn utility', () => {
  describe('Class Merging', () => {
    it('merges multiple classes', () => {});
    it('handles conditional classes', () => {});
    it('removes duplicate classes', () => {});
  });

  describe('Vanilla Extract Integration', () => {
    it('merges Vanilla Extract style objects', () => {});
    it('handles recipe variants', () => {});
    it('prioritizes later classes in conflicts', () => {});
  });

  describe('Edge Cases', () => {
    it('handles undefined values', () => {});
    it('handles null values', () => {});
    it('handles empty strings', () => {});
    it('handles arrays of classes', () => {});
  });
});
```

### 2.3 Theme Tests

#### Theme Provider Tests (theme.test.tsx)
**Test Count**: 10 tests
```typescript
describe('Theme Provider', () => {
  describe('Theme Switching', () => {
    it('initializes with system preference', () => {});
    it('switches to dark theme', () => {});
    it('switches to light theme', () => {});
    it('persists theme selection', () => {});
  });

  describe('CSS Variables', () => {
    it('applies light theme variables', () => {});
    it('applies dark theme variables', () => {});
    it('updates variables on theme change', () => {});
  });

  describe('Vanilla Extract Migration', () => {
    it('maintains theme variable structure', () => {});
    it('applies theme class correctly', () => {});
  });
});
```

### 2.4 Animation Tests

#### Animation Tests (animations.test.ts)
**Test Count**: 8 tests
```typescript
describe('Animations', () => {
  describe('Keyframes', () => {
    it('defines accordion-down keyframe', () => {});
    it('defines accordion-up keyframe', () => {});
    it('defines fade-up keyframe', () => {});
  });

  describe('Vanilla Extract Migration', () => {
    it('maintains keyframe definitions', () => {});
    it('maintains animation durations', () => {});
    it('maintains timing functions', () => {});
    it('applies animation delays correctly', () => {});
  });
});
```

### 2.5 MSW API Mocking (if needed)
**Test Count**: 5 tests (for newsletter form)
```typescript
describe('Newsletter Form', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('submits form successfully', async () => {});
  it('shows error on network failure', async () => {});
  it('disables button during submission', async () => {});
  it('maintains styling during states', async () => {});
});
```

### Total Unit Tests: ~200 tests

---

## Priority 3: Integration Testing (LOWER)
**Goal**: Validate component interactions and page-level behavior

### Setup Requirements
```json
{
  "devDependencies": {
    "@playwright/test": "^1.51.0",
    "@storybook/test-runner": "^0.21.0"
  }
}
```

### 3.1 Storybook Test Runner
**Test Count**: ~150 (all stories)
```bash
# Run interaction tests across all stories
npm run test-storybook
```

#### Tests Per Story
```typescript
// Auto-generated for each story
describe('Story: Button/Default', () => {
  it('renders without errors', () => {});
  it('passes accessibility checks', () => {});
  it('matches snapshot', () => {});
});
```

### 3.2 Playwright E2E Tests

#### Test File Structure
```
e2e/
├── pages/
│   ├── home.spec.ts
│   ├── blog.spec.ts
│   └── post.spec.ts
├── components/
│   ├── navigation.spec.ts
│   ├── forms.spec.ts
│   └── theme-switcher.spec.ts
└── visual/
    ├── homepage-visual.spec.ts
    ├── blog-visual.spec.ts
    └── post-visual.spec.ts
```

#### Homepage Tests (home.spec.ts)
**Test Count**: 15 tests
```typescript
describe('Homepage', () => {
  describe('Layout', () => {
    it('renders header correctly', async () => {});
    it('renders hero section', async () => {});
    it('renders all block components', async () => {});
    it('renders footer', async () => {});
  });

  describe('Interactions', () => {
    it('navigates via header links', async () => {});
    it('opens mobile menu', async () => {});
    it('submits newsletter form', async () => {});
    it('switches theme', async () => {});
  });

  describe('Visual Regression', () => {
    it('matches homepage screenshot (light)', async () => {});
    it('matches homepage screenshot (dark)', async () => {});
    it('matches mobile layout', async () => {});
    it('matches tablet layout', async () => {});
    it('matches desktop layout', async () => {});
  });
});
```

#### Navigation Tests (navigation.spec.ts)
**Test Count**: 12 tests
```typescript
describe('Navigation', () => {
  describe('Desktop Navigation', () => {
    it('highlights active page', async () => {});
    it('opens dropdown menus on hover', async () => {});
    it('navigates to pages', async () => {});
  });

  describe('Mobile Navigation', () => {
    it('opens mobile menu', async () => {});
    it('closes on navigation', async () => {});
    it('closes on overlay click', async () => {});
  });

  describe('Visual Consistency', () => {
    it('matches nav styling after migration', async () => {});
    it('maintains hover states', async () => {});
    it('maintains focus indicators', async () => {});
  });
});
```

#### Theme Switcher Tests (theme-switcher.spec.ts)
**Test Count**: 8 tests
```typescript
describe('Theme Switcher', () => {
  it('toggles between light and dark', async () => {});
  it('persists theme selection', async () => {});
  it('respects system preference', async () => {});
  it('updates all components', async () => {});
  it('maintains styling during transition', async () => {});
  it('applies correct CSS variables', async () => {});
});
```

### 3.3 Accessibility Tests
**Test Count**: 20 tests
```typescript
describe('Accessibility', () => {
  it('passes axe accessibility tests on homepage', async () => {});
  it('passes axe on blog page', async () => {});
  it('has proper heading hierarchy', async () => {});
  it('has proper landmark regions', async () => {});
  it('has keyboard navigation', async () => {});
  it('has visible focus indicators', async () => {});
  it('has proper ARIA labels', async () => {});
  it('has proper color contrast', async () => {});
});
```

### Total Integration Tests: ~75 tests

---

## Priority 4: Build & Bundle Testing (LOWEST)
**Goal**: Ensure bundle size and build performance

### Setup Requirements
```json
{
  "devDependencies": {
    "vite-bundle-visualizer": "^1.2.1",
    "vite-plugin-compression": "^0.5.1"
  }
}
```

### 4.1 Bundle Analysis

#### Metrics to Track
```typescript
interface BundleMetrics {
  // Pre-migration baseline
  baseline: {
    totalSize: number;        // Total bundle size
    cssSize: number;          // CSS bundle size
    jsSize: number;           // JS bundle size
    chunkCount: number;       // Number of chunks
    unusedCss: number;        // Unused CSS (via PurgeCSS)
  };
  
  // Post-migration target
  target: {
    totalSize: number;        // Should be similar or smaller
    cssSize: number;          // Expected to decrease
    jsSize: number;           // May slightly increase (VE runtime)
    chunkCount: number;       // Should remain similar
    unusedCss: number;        // Should be 0 (atomic CSS)
  };
  
  // Comparison
  delta: {
    totalSize: string;        // % change
    cssSize: string;          // % change
    jsSize: string;           // % change
  };
}
```

#### Bundle Tests (bundle.test.ts)
**Test Count**: 10 tests
```typescript
describe('Bundle Analysis', () => {
  describe('Size Comparison', () => {
    it('total bundle size is within 10% of baseline', () => {});
    it('CSS bundle size decreased or stayed same', () => {});
    it('JS bundle size increased by < 15%', () => {});
  });

  describe('Code Splitting', () => {
    it('maintains proper code splitting', () => {});
    it('generates route-level chunks', () => {});
    it('generates vendor chunk', () => {});
  });

  describe('Tree Shaking', () => {
    it('removes unused Vanilla Extract styles', () => {});
    it('removes unused utility functions', () => {});
  });

  describe('Critical CSS', () => {
    it('inlines critical styles', () => {});
    it('defers non-critical styles', () => {});
  });
});
```

### 4.2 Build Performance

#### Build Tests (build.test.ts)
**Test Count**: 5 tests
```typescript
describe('Build Performance', () => {
  it('completes build in reasonable time', () => {});
  it('generates all required assets', () => {});
  it('minifies CSS correctly', () => {});
  it('minifies JS correctly', () => {});
  it('generates source maps', () => {});
});
```

### 4.3 Runtime Performance

#### Performance Tests (performance.test.ts)
**Test Count**: 8 tests
```typescript
describe('Runtime Performance', () => {
  it('First Contentful Paint < 1.5s', async () => {});
  it('Largest Contentful Paint < 2.5s', async () => {});
  it('Time to Interactive < 3.5s', async () => {});
  it('Total Blocking Time < 300ms', async () => {});
  it('Cumulative Layout Shift < 0.1', async () => {});
  it('CSS parsing time similar to baseline', async () => {});
  it('Theme switching performance < 100ms', async () => {});
});
```

### Total Build Tests: ~25 tests

---

## Test Execution Strategy

### Phase 1: Pre-Migration (Baseline)
```bash
# 1. Create all Storybook stories
npm run storybook

# 2. Capture Chromatic baseline
npx chromatic --project-token=<token>

# 3. Write unit tests for current implementation
npm run test

# 4. Run E2E tests for baseline
npm run test:e2e

# 5. Generate bundle report
npm run build
npm run analyze
```

### Phase 2: During Migration (Component-by-Component)
```bash
# For each component:

# 1. Convert Tailwind to Vanilla Extract
# 2. Run unit tests
npm run test -- button.test.tsx

# 3. Check Storybook rendering
npm run storybook

# 4. Run Chromatic for visual comparison
npx chromatic --only-changed

# 5. Verify no regressions
```

### Phase 3: Post-Migration (Validation)
```bash
# 1. Run full unit test suite
npm run test

# 2. Run full Chromatic comparison
npx chromatic

# 3. Run E2E tests
npm run test:e2e

# 4. Run accessibility tests
npm run test:a11y

# 5. Generate final bundle report
npm run build
npm run analyze

# 6. Compare metrics
npm run compare-bundles
```

---

## Migration Checklist

### Pre-Migration Setup
- [ ] Install Vanilla Extract dependencies
- [ ] Configure Vite for Vanilla Extract
- [ ] Set up Storybook with Vanilla Extract support
- [ ] Configure Chromatic project
- [ ] Set up Vitest + React Testing Library
- [ ] Configure Playwright
- [ ] Create baseline bundle report
- [ ] Document current bundle metrics

### Component Migration Workflow
For each component:
- [ ] Create Storybook story (if not exists)
- [ ] Capture Chromatic baseline
- [ ] Write unit tests for current behavior
- [ ] Convert Tailwind classes to Vanilla Extract
- [ ] Update imports (cn → VE styles)
- [ ] Run unit tests → verify passing
- [ ] Check Storybook → verify rendering
- [ ] Run Chromatic → verify no visual changes
- [ ] Document any breaking changes
- [ ] Mark component as migrated

### Post-Migration Validation
- [ ] All Chromatic tests passing (0 regressions)
- [ ] All unit tests passing
- [ ] All E2E tests passing
- [ ] Accessibility tests passing
- [ ] Bundle size within acceptable range
- [ ] Build performance acceptable
- [ ] Runtime performance maintained
- [ ] Dark mode working correctly
- [ ] Theme switching working correctly
- [ ] Animations working correctly
- [ ] Focus states working correctly
- [ ] All responsive breakpoints working

---

## Tooling Configuration

### Vite Config
```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
});
```

### Storybook Config
```typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  framework: '@storybook/nextjs',
  stories: ['../stories/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-themes',
  ],
  core: {
    builder: '@storybook/builder-vite',
  },
  viteFinal: async (config) => {
    const { mergeConfig } = await import('vite');
    const { vanillaExtractPlugin } = await import('@vanilla-extract/vite-plugin');
    
    return mergeConfig(config, {
      plugins: [vanillaExtractPlugin()],
    });
  },
};

export default config;
```

### Playwright Config
```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'mobile', use: { ...devices['iPhone 14 Pro'] } },
  ],
  webServer: {
    command: 'npm run dev',
    port: 3000,
  },
});
```

---

## Success Criteria

### Critical (Must Pass)
- ✓ 100% Chromatic visual tests passing (0 regressions)
- ✓ 100% unit tests passing
- ✓ All UI components render identically
- ✓ Dark mode functionality maintained
- ✓ Focus states match exactly
- ✓ Animations work correctly

### Important (Should Pass)
- ✓ 100% E2E tests passing
- ✓ Accessibility tests passing
- ✓ Bundle size within 15% of baseline
- ✓ Build time within 20% of baseline
- ✓ No console errors/warnings

### Nice to Have
- ✓ Bundle size decreased
- ✓ Build time improved
- ✓ Better tree-shaking
- ✓ Improved TypeScript support

---

## Estimated Timeline

1. **Setup Phase** (1-2 days)
   - Configure tooling
   - Create Storybook stories
   - Capture baselines

2. **Migration Phase** (2-3 weeks)
   - Week 1: UI components (20 files)
   - Week 2: Block components (23 files)
   - Week 3: Layout components, cleanup

3. **Validation Phase** (3-5 days)
   - Run full test suites
   - Fix any regressions
   - Performance testing
   - Documentation

4. **Contingency** (2-3 days)
   - Buffer for unexpected issues

**Total**: 3-4 weeks

---

## Risk Mitigation

### Risk 1: Visual Regressions
**Mitigation**: Chromatic catches all visual changes before merge

### Risk 2: Breaking Behavioral Changes
**Mitigation**: Comprehensive unit tests verify behavior

### Risk 3: Bundle Size Increase
**Mitigation**: Bundle analysis at each step, rollback if exceeds threshold

### Risk 4: Performance Degradation
**Mitigation**: Performance tests in CI, Lighthouse audits

### Risk 5: Incomplete Migration
**Mitigation**: Component-by-component approach, checklist tracking

---

## Documentation Requirements

### Migration Guide
- [ ] Vanilla Extract setup instructions
- [ ] Migration patterns for common cases
- [ ] CVA to Vanilla Extract recipes
- [ ] Theme token mapping
- [ ] Animation conversion guide

### Testing Guide
- [ ] Running Storybook locally
- [ ] Running Chromatic tests
- [ ] Running unit tests
- [ ] Running E2E tests
- [ ] Interpreting test results

### Troubleshooting Guide
- [ ] Common migration issues
- [ ] CSS specificity conflicts
- [ ] Theme variable issues
- [ ] Build errors
- [ ] Test failures

---

## Notes

1. **Incremental Migration**: Migrate component by component, not all at once
2. **Parallel Styling**: Can temporarily support both Tailwind and VE during migration
3. **Type Safety**: Vanilla Extract provides better TypeScript support than Tailwind
4. **Bundle Optimization**: VE generates optimal CSS, eliminating unused styles
5. **Developer Experience**: VE provides better IDE support and autocomplete
6. **Theme System**: Map current CSS variables to VE theme tokens
7. **CVA Migration**: Convert CVA recipes to Vanilla Extract recipes
8. **Animation Keyframes**: Define keyframes in VE, reference in components
9. **Focus Management**: Ensure focus rings maintained for accessibility
10. **Dark Mode**: Use VE's built-in theme contracts for theme switching

---

## Total Test Count Summary

| Category | Test Count | Priority |
|----------|-----------|----------|
| Visual Regression (Chromatic) | ~150 | Highest |
| Unit Tests (Vitest + RTL) | ~200 | Medium |
| Integration Tests (Playwright) | ~75 | Lower |
| Build & Bundle Tests | ~25 | Lowest |
| **Total** | **~450 tests** | |

---

## Dependencies to Install

```json
{
  "dependencies": {
    "@vanilla-extract/css": "^1.16.2",
    "@vanilla-extract/recipes": "^0.6.0",
    "@vanilla-extract/vite-plugin": "^4.0.17"
  },
  "devDependencies": {
    "@playwright/test": "^1.51.0",
    "@storybook/addon-essentials": "^8.5.0",
    "@storybook/addon-interactions": "^8.5.0",
    "@storybook/addon-themes": "^8.5.0",
    "@storybook/builder-vite": "^8.5.0",
    "@storybook/nextjs": "^8.5.0",
    "@storybook/react": "^8.5.0",
    "@storybook/test-runner": "^0.21.0",
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.1.0",
    "@testing-library/user-event": "^14.6.0",
    "@vitejs/plugin-react": "^4.3.4",
    "chromatic": "^12.0.0",
    "jsdom": "^26.0.0",
    "msw": "^2.8.0",
    "storybook": "^8.5.0",
    "vite-bundle-visualizer": "^1.2.1",
    "vitest": "^2.1.8"
  }
}
```

---

## Quick Start Commands

```bash
# Setup
npm install
npm run setup-testing

# Development
npm run storybook              # Start Storybook
npm run test                   # Run unit tests
npm run test:watch             # Watch mode
npm run test:e2e               # Run E2E tests

# Visual Testing
npx chromatic                  # Run Chromatic
npm run test-storybook         # Run story tests

# Build & Analysis
npm run build                  # Production build
npm run analyze                # Bundle analysis

# Full Test Suite
npm run test:all               # Run all tests
```
