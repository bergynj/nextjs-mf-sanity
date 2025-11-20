# Testing Setup for Vanilla Extract Migration

This document contains all configuration files and scripts needed for the testing infrastructure.

---

## 1. Package.json Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typegen": "rm -rf schema.json && sanity schema extract && sanity typegen generate",
    "typecheck": "tsc --noEmit",
    
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:run": "vitest run",
    
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "test-storybook": "test-storybook",
    "test-storybook:ci": "concurrently -k -s first -n \"SB,TEST\" -c \"magenta,blue\" \"npm run build-storybook && npx http-server storybook-static --port 6006 --silent\" \"wait-on tcp:6006 && npm run test-storybook\"",
    
    "chromatic": "chromatic",
    "chromatic:changes": "chromatic --only-changed",
    
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:headed": "playwright test --headed",
    "test:e2e:debug": "playwright test --debug",
    "test:e2e:report": "playwright show-report",
    "test:e2e:codegen": "playwright codegen",
    
    "test:a11y": "playwright test --grep @a11y",
    
    "analyze": "ANALYZE=true npm run build",
    "analyze:bundle": "vite-bundle-visualizer",
    
    "test:all": "npm run test:run && npm run test:e2e && npm run chromatic",
    
    "pre-migration": "npm run test:run && npm run chromatic && npm run analyze",
    "post-migration": "npm run test:run && npm run chromatic && npm run analyze && npm run compare-bundles",
    
    "compare-bundles": "node scripts/compare-bundles.js"
  }
}
```

---

## 2. Dependencies to Install

```bash
# Core testing
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event

# Storybook
npm install -D storybook @storybook/nextjs @storybook/react @storybook/addon-essentials @storybook/addon-interactions @storybook/addon-themes @storybook/builder-vite @storybook/test @storybook/test-runner

# Chromatic
npm install -D chromatic

# Playwright
npm install -D @playwright/test @axe-core/playwright

# Bundle analysis
npm install -D vite-bundle-visualizer

# Vanilla Extract
npm install @vanilla-extract/css @vanilla-extract/recipes
npm install -D @vanilla-extract/vite-plugin

# Utilities
npm install -D concurrently wait-on http-server
```

---

## 3. Vitest Configuration

### vitest.config.ts
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import path from 'path';

export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        '__tests__/',
        '**/*.stories.tsx',
        '**/*.config.*',
        '**/types/',
        '**/*.d.ts',
      ],
      all: true,
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80,
    },
    include: ['**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', 'dist', '.next', 'storybook-static'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});
```

### vitest.setup.ts
```typescript
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    pathname: '/',
    query: {},
    asPath: '/',
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock Next.js Image
vi.mock('next/image', () => ({
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock Next.js Link
vi.mock('next/link', () => ({
  default: ({ children, href }: any) => {
    return <a href={href}>{children}</a>;
  },
}));

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as any;

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
} as any;

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
```

---

## 4. Storybook Configuration

### .storybook/main.ts
```typescript
import type { StorybookConfig } from '@storybook/nextjs';
import path from 'path';

const config: StorybookConfig = {
  framework: '@storybook/nextjs',
  stories: ['../stories/**/*.stories.@(ts|tsx)', '../components/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-themes',
    '@storybook/addon-a11y',
  ],
  staticDirs: ['../public'],
  core: {
    builder: '@storybook/builder-vite',
  },
  async viteFinal(config) {
    const { mergeConfig } = await import('vite');
    const { vanillaExtractPlugin } = await import('@vanilla-extract/vite-plugin');

    return mergeConfig(config, {
      plugins: [vanillaExtractPlugin()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../'),
        },
      },
    });
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
};

export default config;
```

### .storybook/preview.tsx
```typescript
import type { Preview } from '@storybook/react';
import React from 'react';
import { ThemeProvider } from '../components/theme-provider';
import '../app/globals.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      disable: true,
    },
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
    chromatic: {
      // Delay for animations to complete
      delay: 300,
      // Viewports to capture
      viewports: [375, 768, 1280],
      // Modes for light/dark theme
      modes: {
        light: {
          theme: 'light',
        },
        dark: {
          theme: 'dark',
        },
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="min-h-screen bg-background text-foreground p-8">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
```

### .storybook/test-runner.ts
```typescript
import type { TestRunnerConfig } from '@storybook/test-runner';
import { injectAxe, checkA11y } from 'axe-playwright';

const config: TestRunnerConfig = {
  async preVisit(page) {
    await injectAxe(page);
  },
  async postVisit(page) {
    await checkA11y(page, '#storybook-root', {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
    });
  },
};

export default config;
```

---

## 5. Playwright Configuration

### playwright.config.ts
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
  ],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 14 Pro'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
```

### e2e/fixtures.ts
```typescript
import { test as base } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

type Fixtures = {
  makeAxeBuilder: () => Promise<void>;
};

export const test = base.extend<Fixtures>({
  makeAxeBuilder: async ({ page }, use) => {
    await injectAxe(page);
    await use();
  },
});

export { expect } from '@playwright/test';
```

---

## 6. Chromatic Configuration

### chromatic.config.json
```json
{
  "projectToken": "YOUR_PROJECT_TOKEN",
  "buildScriptName": "build-storybook",
  "exitZeroOnChanges": false,
  "exitOnceUploaded": false,
  "autoAcceptChanges": false,
  "ignoreLastBuildOnBranch": "main",
  "onlyChanged": false,
  "externals": ["public/**"],
  "skip": false
}
```

---

## 7. Bundle Analysis Script

### scripts/compare-bundles.js
```javascript
const fs = require('fs');
const path = require('path');

const BASELINE_FILE = path.join(__dirname, '../baseline-stats.json');
const CURRENT_FILE = path.join(__dirname, '../.next/analyze/__bundle_analysis.json');

function formatBytes(bytes) {
  return (bytes / 1024).toFixed(2) + ' KB';
}

function calculateChange(baseline, current) {
  const diff = current - baseline;
  const percent = ((diff / baseline) * 100).toFixed(2);
  const sign = diff > 0 ? '+' : '';
  return `${sign}${formatBytes(diff)} (${sign}${percent}%)`;
}

function compareBundles() {
  if (!fs.existsSync(BASELINE_FILE)) {
    console.log('❌ Baseline file not found. Run `npm run analyze` first to create baseline.');
    return;
  }

  if (!fs.existsSync(CURRENT_FILE)) {
    console.log('❌ Current build stats not found. Run `npm run analyze` first.');
    return;
  }

  const baseline = JSON.parse(fs.readFileSync(BASELINE_FILE, 'utf-8'));
  const current = JSON.parse(fs.readFileSync(CURRENT_FILE, 'utf-8'));

  console.log('\n📊 Bundle Size Comparison\n');
  console.log('━'.repeat(60));
  console.log(`Total Size:     ${formatBytes(baseline.totals.size)} → ${formatBytes(current.totals.size)}`);
  console.log(`Change:         ${calculateChange(baseline.totals.size, current.totals.size)}`);
  console.log('━'.repeat(60));
  console.log(`CSS Size:       ${formatBytes(baseline.css.size)} → ${formatBytes(current.css.size)}`);
  console.log(`Change:         ${calculateChange(baseline.css.size, current.css.size)}`);
  console.log('━'.repeat(60));
  console.log(`JS Size:        ${formatBytes(baseline.js.size)} → ${formatBytes(current.js.size)}`);
  console.log(`Change:         ${calculateChange(baseline.js.size, current.js.size)}`);
  console.log('━'.repeat(60));

  // Check if within acceptable range
  const totalChange = ((current.totals.size - baseline.totals.size) / baseline.totals.size) * 100;
  
  if (totalChange > 15) {
    console.log('\n⚠️  WARNING: Bundle size increased by more than 15%');
    process.exit(1);
  } else if (totalChange > 5) {
    console.log('\n⚠️  NOTICE: Bundle size increased by more than 5%');
  } else if (totalChange < 0) {
    console.log('\n✅ GREAT: Bundle size decreased!');
  } else {
    console.log('\n✅ PASS: Bundle size within acceptable range');
  }
}

compareBundles();
```

### scripts/create-baseline.js
```javascript
const fs = require('fs');
const path = require('path');

const CURRENT_FILE = path.join(__dirname, '../.next/analyze/__bundle_analysis.json');
const BASELINE_FILE = path.join(__dirname, '../baseline-stats.json');

if (!fs.existsSync(CURRENT_FILE)) {
  console.log('❌ Build stats not found. Run `npm run analyze` first.');
  process.exit(1);
}

fs.copyFileSync(CURRENT_FILE, BASELINE_FILE);
console.log('✅ Baseline created at baseline-stats.json');
```

---

## 8. GitHub Actions CI

### .github/workflows/test.yml
```yaml
name: Test Suite

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run unit tests
        run: npm run test:run
      
      - name: Upload coverage
        uses: codecov/codecov-action@v4
        with:
          files: ./coverage/lcov.info

  visual-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run Chromatic
        uses: chromaui/action@latest
        with:
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
          token: ${{ secrets.GITHUB_TOKEN }}

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install Playwright
        run: npx playwright install --with-deps
      
      - name: Run E2E tests
        run: npm run test:e2e
      
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/

  bundle-analysis:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build and analyze
        run: npm run analyze
      
      - name: Compare bundles
        run: npm run compare-bundles
```

---

## 9. TypeScript Configuration Updates

### tsconfig.json (add to compilerOptions)
```json
{
  "compilerOptions": {
    "types": ["vitest/globals", "@testing-library/jest-dom"],
    "paths": {
      "@/*": ["./*"],
      "*.css": ["*.css.ts"]
    }
  },
  "include": [
    "**/*.test.ts",
    "**/*.test.tsx",
    "**/*.spec.ts",
    "**/*.spec.tsx",
    "vitest.setup.ts",
    "**/*.css.ts"
  ]
}
```

---

## 10. Git Ignore Updates

### .gitignore (add these lines)
```
# Testing
coverage/
test-results/
playwright-report/
.nyc_output/
storybook-static/

# Chromatic
chromatic-build/
build-storybook.log

# Baseline
baseline-stats.json

# Vitest
.vitest/
```

---

## 11. VS Code Settings (Optional)

### .vscode/settings.json
```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "vitest.enable": true,
  "vitest.commandLine": "npm run test",
  "testing.automaticallyOpenPeekView": "never",
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### .vscode/extensions.json
```json
{
  "recommendations": [
    "vitest.explorer",
    "ms-playwright.playwright",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "csstools.postcss"
  ]
}
```

---

## Setup Instructions

### Step 1: Install Dependencies
```bash
# Install all testing dependencies
npm install

# Install Playwright browsers
npx playwright install --with-deps
```

### Step 2: Initialize Storybook
```bash
# Initialize Storybook
npx storybook@latest init

# Start Storybook to verify
npm run storybook
```

### Step 3: Setup Chromatic
```bash
# Login to Chromatic
npx chromatic --project-token=YOUR_TOKEN

# Or set up via GitHub integration
# Visit: https://www.chromatic.com/
```

### Step 4: Create Baseline
```bash
# Build and create baseline
npm run build
npm run analyze
node scripts/create-baseline.js
```

### Step 5: Verify Setup
```bash
# Run all tests
npm run test:run
npm run storybook
npm run test:e2e
```

---

## Useful Commands Cheat Sheet

```bash
# Development
npm run dev                           # Start dev server
npm run storybook                     # Start Storybook

# Testing
npm run test                          # Run tests (watch mode)
npm run test:run                      # Run tests (once)
npm run test:coverage                 # With coverage
npm run test:e2e                      # E2E tests
npm run test:a11y                     # A11y tests only
npm run test:all                      # All tests

# Visual Testing
npm run chromatic                     # Run Chromatic
npm run chromatic:changes             # Only changed stories

# Bundle Analysis
npm run analyze                       # Build and analyze
npm run compare-bundles               # Compare with baseline

# Migration Helpers
npm run pre-migration                 # Before starting
npm run post-migration                # After completing
```

---

## Troubleshooting Setup

### Issue: Vitest not finding tests
**Solution**: Ensure vitest.config.ts includes correct test patterns

### Issue: Storybook not loading styles
**Solution**: Verify VE plugin in .storybook/main.ts

### Issue: Playwright tests timing out
**Solution**: Increase timeout in playwright.config.ts

### Issue: Chromatic upload failing
**Solution**: Check project token and network connection

---

## Next Steps

After setup is complete:
1. ✅ Verify all commands work
2. ✅ Create first component story
3. ✅ Capture Chromatic baseline
4. ✅ Write first test
5. ✅ Begin migration!

Refer to `MIGRATION_WORKFLOW.md` for detailed migration steps.
