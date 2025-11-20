# Testing Examples for Vanilla Extract Migration

This document provides concrete examples of tests for the migration from Tailwind CSS to Vanilla Extract.

---

## 1. Visual Regression Test Examples (Storybook + Chromatic)

### Example 1: Button Component Story

```typescript
// stories/ui/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/ui/button';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    chromatic: {
      viewports: [375, 768, 1280],
      modes: {
        light: { theme: 'light' },
        dark: { theme: 'dark' },
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default variant stories
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default',
  },
};

export const DefaultWithIcon: Story = {
  args: {
    children: (
      <>
        <svg className="size-4" />
        Button
      </>
    ),
    variant: 'default',
  },
};

// All variants
export const Destructive: Story = {
  args: {
    children: 'Destructive',
    variant: 'destructive',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost',
    variant: 'ghost',
  },
};

export const Link: Story = {
  args: {
    children: 'Link',
    variant: 'link',
  },
};

// Size variants
export const Small: Story = {
  args: {
    children: 'Small',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    children: 'Large',
    size: 'lg',
  },
};

export const Icon: Story = {
  args: {
    children: <svg className="size-4" />,
    size: 'icon',
  },
};

// State stories
export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
};

export const FocusVisible: Story = {
  args: {
    children: 'Focus Visible',
  },
  parameters: {
    pseudo: { focusVisible: true },
  },
};

// Interaction story
export const WithInteraction: Story = {
  args: {
    children: 'Click Me',
  },
  play: async ({ canvasElement }) => {
    const { userEvent, within } = await import('@storybook/test');
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    
    // Test hover state
    await userEvent.hover(button);
    
    // Test focus
    await userEvent.tab();
    
    // Test click
    await userEvent.click(button);
  },
};

// Composition story showing all variants
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Button variant="default">Default</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
      <div className="flex gap-4">
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon">
          <svg className="size-4" />
        </Button>
      </div>
      <div className="flex gap-4">
        <Button disabled>Disabled</Button>
      </div>
    </div>
  ),
};
```

### Example 2: Card Component Story

```typescript
// stories/ui/Card.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    chromatic: {
      viewports: [375, 768, 1280],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here with some text.</p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button>Action</Button>
        <Button variant="outline">Cancel</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithLongContent: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Long Content Card</CardTitle>
        <CardDescription>
          This card has a lot of content to test spacing
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat.
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Full Width Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const MinimalCard: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardContent className="pt-6">
        <p>Minimal card with just content</p>
      </CardContent>
    </Card>
  ),
};
```

### Example 3: Hero Component Story

```typescript
// stories/blocks/Hero1.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import Hero1 from '@/components/blocks/hero/hero-1';

const meta = {
  title: 'Blocks/Hero1',
  component: Hero1,
  parameters: {
    layout: 'fullscreen',
    chromatic: {
      viewports: [375, 768, 1280, 1920],
      delay: 1000, // Wait for animations
    },
  },
} satisfies Meta<typeof Hero1>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tagLine: 'Welcome',
    title: 'Build amazing things with Schema UI',
    body: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'A beautiful, modern starter template for Next.js and Sanity.',
          },
        ],
      },
    ],
    links: [
      {
        title: 'Get Started',
        href: '/get-started',
        buttonVariant: 'default',
      },
      {
        title: 'Learn More',
        href: '/learn',
        buttonVariant: 'outline',
      },
    ],
    image: {
      _type: 'image',
      alt: 'Hero image',
      asset: {
        _id: 'test',
        url: 'https://picsum.photos/seed/hero/1920/1080',
        mimeType: 'image/jpeg',
        metadata: {
          dimensions: { width: 1920, height: 1080 },
          lqip: 'data:image/jpeg;base64,...',
        },
      },
    },
  },
};

export const WithAnimations: Story = {
  ...Default,
  parameters: {
    chromatic: { disable: false },
  },
};

export const Mobile: Story = {
  ...Default,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    chromatic: {
      viewports: [375],
    },
  },
};
```

---

## 2. Unit Test Examples (Vitest + RTL)

### Example 1: Button Component Tests

```typescript
// __tests__/ui/button.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button, buttonVariants } from '@/components/ui/button';

describe('Button', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button')).toHaveTextContent('Click me');
    });

    it('renders as a child component when asChild is true', () => {
      render(
        <Button asChild>
          <a href="/test">Link Button</a>
        </Button>
      );
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/test');
    });
  });

  describe('Variants', () => {
    it('applies default variant classes', () => {
      render(<Button variant="default">Default</Button>);
      const button = screen.getByRole('button');
      const classes = button.className;
      
      // Check for variant-specific classes
      expect(classes).toContain('bg-primary');
      expect(classes).toContain('text-primary-foreground');
    });

    it('applies destructive variant classes', () => {
      render(<Button variant="destructive">Destructive</Button>);
      const button = screen.getByRole('button');
      const classes = button.className;
      
      expect(classes).toContain('bg-destructive');
      expect(classes).toContain('text-destructive-foreground');
    });

    it('applies outline variant classes', () => {
      render(<Button variant="outline">Outline</Button>);
      const button = screen.getByRole('button');
      const classes = button.className;
      
      expect(classes).toContain('border');
      expect(classes).toContain('bg-background');
    });
  });

  describe('Sizes', () => {
    it('applies default size classes', () => {
      render(<Button size="default">Default Size</Button>);
      const button = screen.getByRole('button');
      
      expect(button.className).toContain('h-9');
    });

    it('applies small size classes', () => {
      render(<Button size="sm">Small</Button>);
      const button = screen.getByRole('button');
      
      expect(button.className).toContain('h-8');
    });

    it('applies large size classes', () => {
      render(<Button size="lg">Large</Button>);
      const button = screen.getByRole('button');
      
      expect(button.className).toContain('h-10');
    });
  });

  describe('States', () => {
    it('handles disabled state', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole('button');
      
      expect(button).toBeDisabled();
      expect(button.className).toContain('disabled:opacity-50');
    });

    it('handles click events', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      
      render(<Button onClick={handleClick}>Click</Button>);
      const button = screen.getByRole('button');
      
      await user.click(button);
      expect(handleClick).toHaveBeenCalledOnce();
    });

    it('does not call onClick when disabled', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      
      render(
        <Button onClick={handleClick} disabled>
          Disabled
        </Button>
      );
      const button = screen.getByRole('button');
      
      await user.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has data-slot attribute', () => {
      render(<Button>Test</Button>);
      const button = screen.getByRole('button');
      
      expect(button).toHaveAttribute('data-slot', 'button');
    });

    it('is keyboard accessible', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      
      render(<Button onClick={handleClick}>Test</Button>);
      const button = screen.getByRole('button');
      
      button.focus();
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalled();
    });

    it('shows focus ring on keyboard focus', async () => {
      const user = userEvent.setup();
      
      render(<Button>Test</Button>);
      const button = screen.getByRole('button');
      
      await user.tab(); // Focus via keyboard
      expect(button.className).toContain('focus-visible:ring-4');
    });
  });

  describe('Vanilla Extract Migration', () => {
    it('maintains consistent class structure', () => {
      const { rerender } = render(<Button>Test</Button>);
      const button = screen.getByRole('button');
      const classes = button.className;
      
      // Should contain core styling classes
      expect(classes).toContain('inline-flex');
      expect(classes).toContain('items-center');
      expect(classes).toContain('justify-center');
      
      // Should maintain spacing
      expect(classes).toContain('gap-2');
      
      // Should maintain border radius
      expect(classes).toContain('rounded-md');
    });

    it('maintains computed styles after migration', () => {
      render(<Button>Test</Button>);
      const button = screen.getByRole('button');
      const styles = window.getComputedStyle(button);
      
      // Verify critical computed styles
      expect(styles.display).toBe('inline-flex');
      expect(styles.alignItems).toBe('center');
      expect(styles.justifyContent).toBe('center');
      
      // These values should match pre-migration
      expect(styles.height).toBe('36px'); // h-9
      expect(styles.paddingLeft).toBe('16px'); // px-4
      expect(styles.paddingRight).toBe('16px'); // px-4
    });
  });
});
```

### Example 2: Card Component Tests

```typescript
// __tests__/ui/card.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

describe('Card', () => {
  describe('Structure', () => {
    it('renders all sub-components correctly', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Title</CardTitle>
            <CardDescription>Description</CardDescription>
          </CardHeader>
          <CardContent>Content</CardContent>
          <CardFooter>Footer</CardFooter>
        </Card>
      );
      
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
      expect(screen.getByText('Footer')).toBeInTheDocument();
    });

    it('applies correct data-slot attributes', () => {
      const { container } = render(
        <Card>
          <CardHeader>
            <CardTitle>Title</CardTitle>
          </CardHeader>
        </Card>
      );
      
      expect(container.querySelector('[data-slot="card"]')).toBeInTheDocument();
      expect(container.querySelector('[data-slot="card-header"]')).toBeInTheDocument();
      expect(container.querySelector('[data-slot="card-title"]')).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('applies base card styles', () => {
      render(<Card>Content</Card>);
      const card = screen.getByText('Content').parentElement;
      
      expect(card?.className).toContain('bg-card');
      expect(card?.className).toContain('text-card-foreground');
      expect(card?.className).toContain('rounded-xl');
      expect(card?.className).toContain('border');
    });

    it('applies header spacing correctly', () => {
      render(
        <Card>
          <CardHeader>Header</CardHeader>
        </Card>
      );
      const header = screen.getByText('Header');
      
      expect(header.className).toContain('flex');
      expect(header.className).toContain('flex-col');
      expect(header.className).toContain('gap-1.5');
      expect(header.className).toContain('p-6');
    });

    it('applies content padding correctly', () => {
      render(
        <Card>
          <CardContent>Content</CardContent>
        </Card>
      );
      const content = screen.getByText('Content');
      
      expect(content.className).toContain('p-6');
      expect(content.className).toContain('pt-0');
    });

    it('applies footer styles correctly', () => {
      render(
        <Card>
          <CardFooter>Footer</CardFooter>
        </Card>
      );
      const footer = screen.getByText('Footer');
      
      expect(footer.className).toContain('flex');
      expect(footer.className).toContain('items-center');
      expect(footer.className).toContain('p-6');
      expect(footer.className).toContain('pt-0');
    });
  });

  describe('Vanilla Extract Migration', () => {
    it('maintains spacing hierarchy', () => {
      const { container } = render(
        <Card>
          <CardHeader>
            <CardTitle>Title</CardTitle>
          </CardHeader>
          <CardContent>Content</CardContent>
        </Card>
      );
      
      const header = container.querySelector('[data-slot="card-header"]');
      const content = container.querySelector('[data-slot="card-content"]');
      
      const headerStyles = window.getComputedStyle(header!);
      const contentStyles = window.getComputedStyle(content!);
      
      // Verify padding values match
      expect(headerStyles.padding).toBe('24px'); // p-6
      expect(contentStyles.paddingTop).toBe('0px'); // pt-0
      expect(contentStyles.paddingLeft).toBe('24px'); // p-6
    });

    it('maintains border and shadow values', () => {
      render(<Card>Content</Card>);
      const card = screen.getByText('Content').parentElement;
      const styles = window.getComputedStyle(card!);
      
      // Should have border
      expect(styles.borderWidth).not.toBe('0px');
      
      // Should have shadow
      expect(styles.boxShadow).not.toBe('none');
    });
  });
});
```

### Example 3: Theme Tests

```typescript
// __tests__/theme.test.tsx
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';

describe('Theme System', () => {
  beforeEach(() => {
    // Clear localStorage and reset theme
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  describe('Theme Provider', () => {
    it('provides theme context', () => {
      render(
        <ThemeProvider>
          <Button>Test</Button>
        </ThemeProvider>
      );
      
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('applies dark class when dark theme is set', () => {
      render(
        <ThemeProvider defaultTheme="dark">
          <Button>Test</Button>
        </ThemeProvider>
      );
      
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });
  });

  describe('CSS Variables', () => {
    it('has light theme variables', () => {
      render(
        <ThemeProvider defaultTheme="light">
          <Button>Test</Button>
        </ThemeProvider>
      );
      
      const styles = getComputedStyle(document.documentElement);
      
      // Check key variables exist
      expect(styles.getPropertyValue('--background')).toBeTruthy();
      expect(styles.getPropertyValue('--foreground')).toBeTruthy();
      expect(styles.getPropertyValue('--primary')).toBeTruthy();
    });

    it('has dark theme variables', () => {
      render(
        <ThemeProvider defaultTheme="dark">
          <Button>Test</Button>
        </ThemeProvider>
      );
      
      const styles = getComputedStyle(document.documentElement);
      
      // Variables should still exist in dark mode
      expect(styles.getPropertyValue('--background')).toBeTruthy();
      expect(styles.getPropertyValue('--foreground')).toBeTruthy();
    });
  });

  describe('Vanilla Extract Migration', () => {
    it('maintains theme variable structure', () => {
      render(
        <ThemeProvider>
          <Button>Test</Button>
        </ThemeProvider>
      );
      
      const styles = getComputedStyle(document.documentElement);
      const requiredVars = [
        '--background',
        '--foreground',
        '--card',
        '--card-foreground',
        '--primary',
        '--primary-foreground',
        '--secondary',
        '--secondary-foreground',
        '--muted',
        '--muted-foreground',
        '--accent',
        '--accent-foreground',
        '--destructive',
        '--border',
        '--input',
        '--ring',
      ];
      
      requiredVars.forEach((varName) => {
        expect(styles.getPropertyValue(varName)).toBeTruthy();
      });
    });
  });
});
```

---

## 3. Integration Test Examples (Playwright)

### Example 1: Homepage Visual Tests

```typescript
// e2e/visual/homepage-visual.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Homepage Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('matches homepage screenshot in light mode', async ({ page }) => {
    await expect(page).toHaveScreenshot('homepage-light.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('matches homepage screenshot in dark mode', async ({ page }) => {
    // Switch to dark mode
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
    });
    
    await expect(page).toHaveScreenshot('homepage-dark.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('matches hero section on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    const hero = page.locator('section').first();
    await expect(hero).toHaveScreenshot('hero-mobile.png');
  });

  test('matches hero section on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    
    const hero = page.locator('section').first();
    await expect(hero).toHaveScreenshot('hero-desktop.png');
  });

  test('animations complete and match final state', async ({ page }) => {
    // Wait for animations to complete
    await page.waitForTimeout(1000);
    
    await expect(page).toHaveScreenshot('homepage-after-animations.png', {
      fullPage: true,
    });
  });
});
```

### Example 2: Component Interaction Tests

```typescript
// e2e/components/navigation.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('desktop navigation renders correctly', async ({ page }) => {
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    
    // Check for navigation links
    await expect(nav.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Blog' })).toBeVisible();
  });

  test('mobile menu toggles correctly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Menu should be hidden initially
    const mobileMenu = page.locator('[data-slot="sheet"]');
    await expect(mobileMenu).not.toBeVisible();
    
    // Click hamburger
    await page.click('[data-slot="menu-toggle"]');
    
    // Menu should be visible
    await expect(mobileMenu).toBeVisible();
    
    // Take screenshot of open menu
    await expect(page).toHaveScreenshot('mobile-menu-open.png');
  });

  test('navigation maintains styling after migration', async ({ page }) => {
    const nav = page.locator('nav');
    
    // Check computed styles
    const styles = await nav.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        display: computed.display,
        padding: computed.padding,
        backgroundColor: computed.backgroundColor,
      };
    });
    
    // Verify key styles are present
    expect(styles.display).toBeTruthy();
    expect(styles.padding).toBeTruthy();
  });

  test('hover states work correctly', async ({ page }) => {
    const link = page.getByRole('link', { name: 'Blog' });
    
    // Hover over link
    await link.hover();
    
    // Take screenshot of hover state
    await expect(link).toHaveScreenshot('nav-link-hover.png');
  });

  test('focus states are visible', async ({ page }) => {
    // Tab to first link
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    
    // Should have visible focus ring
    await expect(focusedElement).toHaveScreenshot('nav-link-focus.png');
  });
});
```

### Example 3: Theme Switcher Tests

```typescript
// e2e/components/theme-switcher.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Theme Switcher', () => {
  test('toggles between light and dark themes', async ({ page }) => {
    await page.goto('/');
    
    // Start in light mode
    await expect(page.locator('html')).not.toHaveClass('dark');
    
    // Find and click theme toggle
    const themeToggle = page.locator('[data-testid="theme-toggle"]');
    await themeToggle.click();
    
    // Should switch to dark mode
    await expect(page.locator('html')).toHaveClass(/dark/);
    
    // Visual comparison
    await expect(page).toHaveScreenshot('dark-theme.png', {
      fullPage: true,
    });
  });

  test('persists theme selection', async ({ page, context }) => {
    await page.goto('/');
    
    // Switch to dark mode
    await page.locator('[data-testid="theme-toggle"]').click();
    await expect(page.locator('html')).toHaveClass(/dark/);
    
    // Reload page
    await page.reload();
    
    // Should still be dark mode
    await expect(page.locator('html')).toHaveClass(/dark/);
  });

  test('CSS variables update on theme change', async ({ page }) => {
    await page.goto('/');
    
    // Get light mode variables
    const lightVars = await page.evaluate(() => {
      const styles = getComputedStyle(document.documentElement);
      return {
        background: styles.getPropertyValue('--background'),
        foreground: styles.getPropertyValue('--foreground'),
      };
    });
    
    // Switch to dark mode
    await page.locator('[data-testid="theme-toggle"]').click();
    
    // Get dark mode variables
    const darkVars = await page.evaluate(() => {
      const styles = getComputedStyle(document.documentElement);
      return {
        background: styles.getPropertyValue('--background'),
        foreground: styles.getPropertyValue('--foreground'),
      };
    });
    
    // Variables should be different
    expect(lightVars.background).not.toBe(darkVars.background);
    expect(lightVars.foreground).not.toBe(darkVars.foreground);
  });
});
```

---

## 4. Bundle Analysis Examples

### Example 1: Bundle Size Test

```typescript
// __tests__/bundle/bundle-size.test.ts
import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Bundle Size Analysis', () => {
  const statsPath = path.join(process.cwd(), '.next/analyze/__bundle_analysis.json');
  
  it('bundle stats file exists', () => {
    expect(fs.existsSync(statsPath)).toBe(true);
  });

  it('total bundle size is within acceptable range', () => {
    const stats = JSON.parse(fs.readFileSync(statsPath, 'utf-8'));
    const totalSize = stats.totals.size;
    
    // Should be less than 500KB (adjust as needed)
    expect(totalSize).toBeLessThan(500 * 1024);
  });

  it('CSS bundle decreased or stayed same after migration', () => {
    // Compare with baseline
    const baselineStats = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), 'baseline-stats.json'), 'utf-8')
    );
    const currentStats = JSON.parse(fs.readFileSync(statsPath, 'utf-8'));
    
    const baselineCssSize = baselineStats.css.size;
    const currentCssSize = currentStats.css.size;
    
    // Current should be <= baseline
    expect(currentCssSize).toBeLessThanOrEqual(baselineCssSize);
  });

  it('no unused CSS in production build', () => {
    // This would require PurgeCSS or similar analysis
    // For Vanilla Extract, this should naturally be 0
    const stats = JSON.parse(fs.readFileSync(statsPath, 'utf-8'));
    
    // Vanilla Extract should have 0 unused CSS
    expect(stats.unusedCss || 0).toBe(0);
  });
});
```

### Example 2: Performance Test

```typescript
// e2e/performance/metrics.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Performance Metrics', () => {
  test('homepage loads within performance budget', async ({ page }) => {
    const metrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const navigation = entries[0] as PerformanceNavigationTiming;
          
          resolve({
            fcp: performance.getEntriesByName('first-contentful-paint')[0]?.startTime,
            lcp: performance.getEntriesByName('largest-contentful-paint')[0]?.startTime,
            cls: 0, // Would need proper CLS calculation
            domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
            loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
          });
        }).observe({ entryTypes: ['navigation', 'paint'] });
        
        // Navigate to trigger observation
        window.location.reload();
      });
    });
    
    // Performance budgets
    expect(metrics.fcp).toBeLessThan(1500); // FCP < 1.5s
    expect(metrics.lcp).toBeLessThan(2500); // LCP < 2.5s
    expect(metrics.domContentLoaded).toBeLessThan(1000); // DOM load < 1s
  });

  test('theme switching is performant', async ({ page }) => {
    await page.goto('/');
    
    const startTime = Date.now();
    await page.locator('[data-testid="theme-toggle"]').click();
    const endTime = Date.now();
    
    // Should complete in less than 100ms
    expect(endTime - startTime).toBeLessThan(100);
  });

  test('CSS parsing time is acceptable', async ({ page }) => {
    await page.goto('/');
    
    const cssParseTime = await page.evaluate(() => {
      const resources = performance.getEntriesByType('resource');
      const cssResources = resources.filter((r: any) => 
        r.name.endsWith('.css')
      );
      
      return cssResources.reduce((total: number, r: any) => {
        return total + (r.responseEnd - r.fetchStart);
      }, 0);
    });
    
    // Total CSS parse time should be < 200ms
    expect(cssParseTime).toBeLessThan(200);
  });
});
```

---

## 5. Accessibility Test Examples

```typescript
// e2e/a11y/accessibility.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
  test('homepage has no accessibility violations', async ({ page }) => {
    await page.goto('/');
    
    const results = await new AxeBuilder({ page }).analyze();
    
    expect(results.violations).toEqual([]);
  });

  test('all interactive elements are keyboard accessible', async ({ page }) => {
    await page.goto('/');
    
    // Tab through all focusable elements
    const focusableElements = [];
    let previousElement = null;
    
    for (let i = 0; i < 20; i++) {
      await page.keyboard.press('Tab');
      const currentElement = await page.evaluate(() => {
        const el = document.activeElement;
        return {
          tag: el?.tagName,
          role: el?.getAttribute('role'),
          text: el?.textContent?.slice(0, 50),
        };
      });
      
      if (JSON.stringify(currentElement) === JSON.stringify(previousElement)) {
        break; // Tabbed through all elements
      }
      
      focusableElements.push(currentElement);
      previousElement = currentElement;
    }
    
    // Should have multiple focusable elements
    expect(focusableElements.length).toBeGreaterThan(5);
  });

  test('focus indicators are visible', async ({ page }) => {
    await page.goto('/');
    
    // Tab to first focusable element
    await page.keyboard.press('Tab');
    
    const focusedElement = page.locator(':focus');
    const outline = await focusedElement.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        outline: styles.outline,
        boxShadow: styles.boxShadow,
        outlineOffset: styles.outlineOffset,
      };
    });
    
    // Should have either outline or box-shadow (focus ring)
    const hasFocusIndicator = 
      outline.outline !== 'none' || 
      outline.boxShadow !== 'none';
    
    expect(hasFocusIndicator).toBe(true);
  });

  test('color contrast meets WCAG standards', async ({ page }) => {
    await page.goto('/');
    
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .analyze();
    
    const contrastViolations = results.violations.filter((v) =>
      v.id.includes('color-contrast')
    );
    
    expect(contrastViolations).toEqual([]);
  });
});
```

---

## Quick Reference: Test Commands

```bash
# Unit Tests
npm run test                    # Run all unit tests
npm run test:watch             # Watch mode
npm run test:coverage          # With coverage
npm run test -- button.test    # Run specific test

# Visual Tests
npm run storybook              # Start Storybook
npx chromatic                  # Run Chromatic
npm run test-storybook         # Run story tests

# E2E Tests
npm run test:e2e               # Run all E2E tests
npm run test:e2e:ui            # With UI
npm run test:e2e -- homepage   # Run specific test

# Accessibility
npm run test:a11y              # Run a11y tests

# Bundle Analysis
npm run build                  # Build for production
npm run analyze                # Analyze bundle
```
