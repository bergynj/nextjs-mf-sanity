# Vanilla Extract Migration Workflow

This document outlines the step-by-step workflow for migrating components from Tailwind CSS to Vanilla Extract.

---

## Pre-Migration Checklist

### 1. Environment Setup
- [ ] Install Vanilla Extract dependencies
- [ ] Configure Vite for Vanilla Extract
- [ ] Set up Storybook with VE support
- [ ] Configure Chromatic project
- [ ] Set up Vitest configuration
- [ ] Install Playwright
- [ ] Create baseline metrics

### 2. Documentation
- [ ] Read Vanilla Extract documentation
- [ ] Review testing plan
- [ ] Understand current architecture
- [ ] Document baseline metrics

---

## Component Migration Workflow

### Phase 1: Pre-Migration Analysis (Per Component)

#### Step 1: Analyze Current Component
```bash
# Review component file
code components/ui/button.tsx

# Identify:
# - Tailwind classes used
# - CVA variants
# - Dynamic classes
# - Theme-dependent styles
# - Responsive styles
# - Pseudo-classes (hover, focus, etc.)
# - Animation classes
```

#### Step 2: Create Storybook Story
```typescript
// stories/ui/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/ui/button';

// Create comprehensive stories covering:
// - All variants
// - All sizes
// - All states
// - Light/dark themes
// - Responsive viewports
```

#### Step 3: Capture Baseline
```bash
# Run Storybook locally to verify stories
npm run storybook

# Capture Chromatic baseline
npx chromatic --only-story-names="UI/Button/*"

# Save screenshot references
# Note baseline metrics
```

#### Step 4: Write Unit Tests
```typescript
// __tests__/ui/button.test.tsx

// Cover:
// - Rendering
// - Variants
// - States
// - Accessibility
// - Computed styles
```

---

### Phase 2: Vanilla Extract Migration

#### Step 1: Create Theme Tokens (First Time Only)
```typescript
// styles/theme.css.ts
import { createTheme, createThemeContract } from '@vanilla-extract/css';

export const vars = createThemeContract({
  color: {
    background: null,
    foreground: null,
    primary: null,
    primaryForeground: null,
    // ... all theme variables
  },
  spacing: {
    // ...
  },
  radius: {
    // ...
  },
});

export const lightTheme = createTheme(vars, {
  color: {
    background: 'oklch(1 0 0)',
    // ... map from globals.css
  },
});

export const darkTheme = createTheme(vars, {
  color: {
    background: 'oklch(0.13 0.028 261.692)',
    // ... map from globals.css
  },
});
```

#### Step 2: Convert Tailwind to Vanilla Extract
```typescript
// components/ui/button.css.ts
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@/styles/theme.css';

// Base styles
export const button = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
  whiteSpace: 'nowrap',
  borderRadius: '0.375rem',
  fontSize: '0.875rem',
  fontWeight: '500',
  transition: 'color 150ms, box-shadow 150ms',
  ':disabled': {
    pointerEvents: 'none',
    opacity: 0.5,
  },
  selectors: {
    '&:focus-visible': {
      outline: `1px solid ${vars.color.ring}`,
      outlineOffset: '0px',
      boxShadow: `0 0 0 4px ${vars.color.ring}10`,
    },
  },
});

// Recipe for variants
export const buttonRecipe = recipe({
  base: button,
  variants: {
    variant: {
      default: {
        backgroundColor: vars.color.primary,
        color: vars.color.primaryForeground,
        boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        ':hover': {
          backgroundColor: `${vars.color.primary}e6`, // 90% opacity
        },
      },
      destructive: {
        backgroundColor: vars.color.destructive,
        color: vars.color.destructiveForeground,
        ':hover': {
          backgroundColor: `${vars.color.destructive}e6`,
        },
      },
      // ... other variants
    },
    size: {
      default: {
        height: '2.25rem', // 36px = h-9
        paddingLeft: '1rem',
        paddingRight: '1rem',
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem',
      },
      sm: {
        height: '2rem', // 32px = h-8
        paddingLeft: '0.75rem',
        paddingRight: '0.75rem',
      },
      // ... other sizes
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});
```

#### Step 3: Update Component
```typescript
// components/ui/button.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { type RecipeVariants } from "@vanilla-extract/recipes";
import { buttonRecipe } from "./button.css";

type ButtonVariants = RecipeVariants<typeof buttonRecipe>;

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  ButtonVariants & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={buttonRecipe({ variant, size, className })}
      {...props}
    />
  );
}

export { Button, buttonRecipe };
```

---

### Phase 3: Validation

#### Step 1: Run Unit Tests
```bash
# Run component tests
npm run test -- button.test.tsx

# ✓ All tests should pass
# ✗ If failures: fix styles, re-test
```

#### Step 2: Visual Verification
```bash
# Start Storybook
npm run storybook

# Manually verify:
# - All variants render correctly
# - Hover states work
# - Focus states work
# - Animations work
# - Dark mode works
```

#### Step 3: Chromatic Comparison
```bash
# Run Chromatic for this component
npx chromatic --only-story-names="UI/Button/*"

# Review changes:
# - Accept if intentional improvements
# - Fix if regressions
# - Document any intended changes
```

#### Step 4: Computed Styles Verification
```typescript
// Add to test file
it('maintains exact computed styles', () => {
  render(<Button>Test</Button>);
  const button = screen.getByRole('button');
  const styles = window.getComputedStyle(button);
  
  // Compare with documented baseline
  expect(styles.height).toBe('36px');
  expect(styles.paddingLeft).toBe('16px');
  // ... etc
});
```

---

### Phase 4: Documentation

#### Step 1: Update Component Documentation
```markdown
## Button Component

### Migration Notes
- Migrated from Tailwind CSS to Vanilla Extract
- All variants maintained
- Focus ring styling preserved
- Chromatic tests: 0 regressions

### Changes
- None (visual parity maintained)

### Performance
- Bundle size: -2KB (decreased)
```

#### Step 2: Update Migration Tracker
```markdown
## Migration Progress

### Completed (1/60)
- [x] Button
  - Stories: ✓
  - Tests: ✓
  - Chromatic: ✓
  - Date: 2024-01-15

### In Progress (0/60)

### Pending (59/60)
- [ ] Card
- [ ] Input
- ...
```

---

## Component-by-Component Migration Order

### Tier 1: Foundation Components (Week 1)
These components are used by many others. Migrate first.

1. **Theme System** (Day 1)
   - [ ] Create theme.css.ts
   - [ ] Define all CSS variables
   - [ ] Create light/dark themes
   - [ ] Update ThemeProvider

2. **Utility Components** (Day 1)
   - [ ] Update cn() utility for VE
   - [ ] Create helper functions

3. **Core UI Components** (Days 2-5)
   - [ ] Button (most used)
   - [ ] Card
   - [ ] Input
   - [ ] Label
   - [ ] Badge

### Tier 2: Complex UI Components (Week 2)
4. **Radix Wrappers** (Days 1-3)
   - [ ] Accordion
   - [ ] Dropdown Menu
   - [ ] Sheet
   - [ ] Avatar

5. **Interactive Components** (Days 4-5)
   - [ ] Form
   - [ ] Copy Button
   - [ ] Star Rating

### Tier 3: Block Components (Week 2-3)
6. **Hero Blocks** (Day 1)
   - [ ] Hero-1
   - [ ] Hero-2

7. **Grid System** (Days 2-3)
   - [ ] Grid Row
   - [ ] Grid Card
   - [ ] Grid Post
   - [ ] Pricing Card

8. **Split Layout** (Days 4-5)
   - [ ] Split Row
   - [ ] Split Content
   - [ ] Split Image
   - [ ] Split Cards List
   - [ ] Split Info List

### Tier 4: Specialized Components (Week 3)
9. **Content Blocks** (Days 1-2)
   - [ ] All Posts
   - [ ] Post Hero
   - [ ] Post Card
   - [ ] Post Date

10. **Forms & Interactive** (Days 3-4)
    - [ ] Newsletter Form
    - [ ] FAQs
    - [ ] CTA

11. **Layout Components** (Day 5)
    - [ ] Header
    - [ ] Footer
    - [ ] Navigation

---

## Daily Workflow Example

### Morning (9:00 AM - 12:00 PM)
**Goal: Migrate 2-3 small components OR 1 large component**

```bash
# 1. Start of day setup (15 min)
git checkout -b migration/button
npm run storybook # in background
```

```typescript
// 2. Write stories (30 min)
// stories/ui/Button.stories.tsx
```

```bash
# 3. Capture baseline (15 min)
npx chromatic
```

```typescript
// 4. Write tests (1 hour)
// __tests__/ui/button.test.tsx
```

```bash
# 5. Run tests to establish baseline (15 min)
npm run test -- button.test.tsx
```

### Afternoon (1:00 PM - 3:00 PM)
**Goal: Complete migration**

```typescript
// 6. Create VE styles (1 hour)
// components/ui/button.css.ts
```

```typescript
// 7. Update component (30 min)
// components/ui/button.tsx
```

```bash
# 8. Run tests (15 min)
npm run test -- button.test.tsx
# Fix any failures
```

```bash
# 9. Check Storybook (15 min)
# Verify all stories render correctly
```

### Late Afternoon (3:00 PM - 5:00 PM)
**Goal: Validation & documentation**

```bash
# 10. Chromatic comparison (30 min)
npx chromatic
# Review and approve changes
```

```bash
# 11. Run full test suite (15 min)
npm run test
npm run test:e2e
```

```markdown
# 12. Update documentation (30 min)
# Update migration tracker
# Document any issues
```

```bash
# 13. Commit and push (15 min)
git add .
git commit -m "feat: migrate Button to Vanilla Extract"
git push origin migration/button
```

```bash
# 14. Create PR (30 min)
gh pr create --title "Migrate Button to Vanilla Extract" --body "..."
```

---

## Troubleshooting Guide

### Issue: Styles not applying

**Symptom**: Component renders but styles are missing

**Solutions**:
1. Check VE plugin is configured in vite.config.ts
2. Verify .css.ts file is imported in component
3. Check recipe is called correctly
4. Inspect browser DevTools for generated classes

### Issue: Chromatic shows regressions

**Symptom**: Visual differences in Chromatic

**Solutions**:
1. Compare side-by-side in Chromatic UI
2. Check for:
   - Spacing differences (padding/margin)
   - Color value differences
   - Border radius differences
   - Font size/weight differences
3. Use browser DevTools to compare computed styles
4. Adjust VE styles to match exactly

### Issue: Tests failing

**Symptom**: Unit tests fail after migration

**Solutions**:
1. Check className generation
2. Update test assertions for new class format
3. Verify computed styles in tests
4. Check for CSS-in-JS specificity issues

### Issue: Dark mode not working

**Symptom**: Dark theme doesn't apply

**Solutions**:
1. Verify dark theme is created
2. Check theme class is applied to html element
3. Verify theme variables are used in styles
4. Check theme provider is wrapping app

### Issue: Build errors

**Symptom**: Build fails with VE errors

**Solutions**:
1. Clear .next cache: `rm -rf .next`
2. Check for circular dependencies
3. Verify all imports are correct
4. Check VE plugin version compatibility

---

## Git Workflow

### Branch Naming
```bash
# Per component
migration/button
migration/card
migration/input

# Per feature group
migration/ui-components-batch-1
migration/hero-blocks

# For fixes
fix/migration-button-focus-ring
```

### Commit Messages
```bash
# Format
feat: migrate [Component] to Vanilla Extract

# Examples
feat: migrate Button to Vanilla Extract
feat: migrate Card and related components to VE
fix: button focus ring styling after migration
chore: update button tests for VE
```

### PR Template
```markdown
## Migration: [Component Name]

### Summary
Migrates [Component] from Tailwind CSS to Vanilla Extract.

### Changes
- Created `component.css.ts` with VE styles
- Updated `component.tsx` to use VE recipe
- Added comprehensive Storybook stories
- Added unit tests

### Testing
- [x] Unit tests pass
- [x] Storybook renders correctly
- [x] Chromatic shows 0 regressions
- [x] Dark mode works
- [x] Accessibility maintained

### Metrics
- Bundle size: [before] → [after] ([change])
- Visual regressions: 0
- Test coverage: [coverage]%

### Screenshots
[Attach Chromatic comparison link]

### Checklist
- [x] Stories created
- [x] Tests written and passing
- [x] Chromatic baseline captured
- [x] Visual parity maintained
- [x] Documentation updated
- [x] No console errors
```

---

## Rollback Plan

### If Migration Goes Wrong

#### Option 1: Revert Single Component
```bash
# Revert specific commit
git revert <commit-hash>

# Or restore old file
git checkout main -- components/ui/button.tsx
```

#### Option 2: Parallel Implementation
Keep both implementations during migration:

```typescript
// Use feature flag
import { Button as TailwindButton } from './button-tailwind';
import { Button as VEButton } from './button-ve';

export const Button = process.env.USE_VE ? VEButton : TailwindButton;
```

#### Option 3: Full Rollback
```bash
# If entire migration needs rollback
git checkout main
git branch -D migration/*
```

---

## Success Metrics

### Per Component
- [ ] 100% unit test pass rate
- [ ] 0 Chromatic visual regressions
- [ ] Bundle size delta < 5%
- [ ] No accessibility regressions
- [ ] No console errors/warnings

### Overall Migration
- [ ] All 60+ components migrated
- [ ] Total bundle size < baseline + 15%
- [ ] All E2E tests passing
- [ ] Lighthouse score maintained
- [ ] No TypeScript errors
- [ ] Documentation complete

---

## Timeline Checkpoints

### End of Week 1
- [ ] Theme system complete
- [ ] 5 core UI components migrated
- [ ] Workflow refined
- [ ] Team confident with process

### End of Week 2
- [ ] 20+ components migrated
- [ ] All Radix wrappers complete
- [ ] Block components 50% complete
- [ ] No major blockers

### End of Week 3
- [ ] All components migrated
- [ ] All tests passing
- [ ] Documentation complete
- [ ] Ready for final review

### Final Review (3-5 days)
- [ ] Full regression testing
- [ ] Performance validation
- [ ] Accessibility audit
- [ ] Bundle analysis
- [ ] Stakeholder approval

---

## Post-Migration

### Cleanup
- [ ] Remove Tailwind dependencies
- [ ] Remove old Tailwind config
- [ ] Update all documentation
- [ ] Archive baseline files
- [ ] Celebrate! 🎉

### Monitoring
- [ ] Monitor bundle size in CI
- [ ] Watch for performance regressions
- [ ] Gather developer feedback
- [ ] Document lessons learned

---

## Quick Reference

```bash
# Daily workflow
git checkout -b migration/[component]
npm run storybook
# Write stories
npx chromatic --only-story-names="[path]/*"
# Write tests
npm run test -- [component].test
# Migrate
# Test
npx chromatic
git commit -m "feat: migrate [component] to VE"
git push

# Helpful commands
npm run test:watch                    # Watch tests
npm run test:coverage                 # Check coverage
npm run storybook                     # Start Storybook
npx chromatic                         # Run Chromatic
npm run build && npm run analyze      # Check bundle
```
