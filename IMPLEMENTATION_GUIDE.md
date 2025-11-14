# Implementation Guide: Step-by-Step Migration

This guide provides detailed step-by-step instructions for migrating to the Nx monorepo structure.

## Prerequisites

- Node.js 18+ installed
- **pnpm 9+ installed** (required - enforced)
- Git repository initialized

### Install pnpm

```bash
npm install -g pnpm
# or use corepack (recommended)
corepack enable
corepack prepare pnpm@9.0.0 --activate
```

## Phase 1: Initialize Nx Workspace

### Step 1.1: Install Nx
```bash
npx create-nx-workspace@latest schema-ui-monorepo --preset=apps --packageManager=pnpm
# Or use existing directory:
npx nx@latest init --packageManager=pnpm
```

### Step 1.2: Configure pnpm Enforcement
1. Create `.npmrc` at root:
   ```
   engine-strict=true
   auto-install-peers=true
   strict-peer-dependencies=false
   shamefully-hoist=false
   ```

2. Update `package.json`:
   ```json
   {
     "packageManager": "pnpm@9.0.0",
     "engines": {
       "node": ">=18.0.0",
       "pnpm": ">=9.0.0"
     },
     "scripts": {
       "preinstall": "npx only-allow pnpm"
     }
   }
   ```

3. Install `only-allow`:
   ```bash
   pnpm add -D -w only-allow
   ```

### Step 1.3: Install Nx Plugins
```bash
pnpm add -D -w @nx/next @nx/react @nx/js @nx/node
```

### Step 1.4: Create nx.json Configuration
Create `nx.json` with appropriate executors and task pipelines:
```json
{
  "$schema": "./node_modules/nx/schemas/nx-schema.json",
  "cli": {
    "packageManager": "pnpm"
  },
  "defaultBase": "main",
  "namedInputs": {
    "default": ["{projectRoot}/**/*", "sharedGlobals"],
    "production": [
      "default",
      "!{projectRoot}/**/?(*.)+(spec|test).[jt]s?(x)?(.snap)",
      "!{projectRoot}/tsconfig.spec.json",
      "!{projectRoot}/.eslintrc.json"
    ],
    "sharedGlobals": []
  },
  "targetDefaults": {
    "build": {
      "dependsOn": ["^build"],
      "inputs": ["production", "^production"]
    },
    "lint": {
      "inputs": ["default", "{workspaceRoot}/.eslintrc.json"]
    },
    "test": {
      "inputs": ["default", "^production", "{workspaceRoot}/jest.preset.js"]
    }
  },
  "plugins": [
    {
      "plugin": "@nx/next/plugin",
      "options": {
        "buildTargetName": "build",
        "devTargetName": "dev",
        "startTargetName": "start",
        "serveStaticTargetName": "serve-static"
      }
    }
  ]
}
```

### Step 1.5: Create TypeScript Base Configuration
Create `tsconfig.base.json`:
```json
{
  "compileOnSave": false,
  "compilerOptions": {
    "rootDir": ".",
    "sourceMap": true,
    "declaration": false,
    "moduleResolution": "node",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "importHelpers": true,
    "target": "ES2017",
    "module": "esnext",
    "lib": ["ES2020", "dom"],
    "skipLibCheck": true,
    "skipDefaultLibCheck": true,
    "baseUrl": ".",
    "paths": {
      "@schema-ui/shared": ["libs/shared/src/index.ts"],
      "@schema-ui/sanity": ["libs/sanity/src/index.ts"],
      "@schema-ui/sanity-schemas": ["libs/sanity-schemas/src/index.ts"],
      "@schema-ui/sanity-queries": ["libs/sanity-queries/src/index.ts"],
      "@schema-ui/ui": ["libs/ui/src/index.ts"],
      "@schema-ui/blocks": ["libs/blocks/src/index.ts"],
      "@schema-ui/layout": ["libs/layout/src/index.ts"],
      "@schema-ui/blog": ["libs/blog/src/index.ts"],
      "@schema-ui/forms": ["libs/forms/src/index.ts"],
      "@schema-ui/studio": ["libs/studio/src/index.ts"]
    }
  },
  "exclude": ["node_modules", "tmp"]
}
```

## Phase 2: Create Base Libraries

### Step 2.1: Create @schema-ui/shared Library
```bash
pnpm nx generate @nx/js:library shared --directory=libs/shared --importPath=@schema-ui/shared --buildable --publishable
```

**Actions:**
1. Move `lib/utils.ts` → `libs/shared/src/lib/utils.ts`
2. Move `types/index.d.ts` → `libs/shared/src/types/index.d.ts`
3. Create `libs/shared/src/index.ts`:
   ```typescript
   export * from './lib/utils';
   export * from './types';
   ```
4. Create `libs/shared/project.json` with build target
5. Update `libs/shared/tsconfig.json` to extend `tsconfig.base.json`

### Step 2.2: Create @schema-ui/sanity Library
```bash
pnpm nx generate @nx/js:library sanity --directory=libs/sanity --importPath=@schema-ui/sanity --buildable --publishable
```

**Actions:**
1. Move `sanity/env.ts` → `libs/sanity/src/env.ts`
2. Move `sanity/lib/*.ts` → `libs/sanity/src/lib/*.ts`
3. Create `libs/sanity/src/index.ts` with all exports
4. Update imports in moved files to use `@schema-ui/shared`
5. Add dependency on `@schema-ui/shared` in `project.json`

## Phase 3: Create Content Libraries

### Step 3.1: Create @schema-ui/sanity-schemas Library
```bash
pnpm nx generate @nx/js:library sanity-schemas --directory=libs/sanity-schemas --importPath=@schema-ui/sanity-schemas --buildable
```

**Actions:**
1. Move `sanity/schema.ts` → `libs/sanity-schemas/src/schema.ts`
2. Move `sanity/structure.ts` → `libs/sanity-schemas/src/structure.ts`
3. Move `sanity/schemas/` → `libs/sanity-schemas/src/schemas/`
4. Move `sanity.cli.ts` → `libs/sanity-schemas/sanity.cli.ts`
5. Move `sanity.config.ts` → `libs/sanity-schemas/sanity.config.ts`
6. Update imports to use `@schema-ui/shared`
7. Create `libs/sanity-schemas/src/index.ts`

### Step 3.2: Create @schema-ui/sanity-queries Library
```bash
pnpm nx generate @nx/js:library sanity-queries --directory=libs/sanity-queries --importPath=@schema-ui/sanity-queries --buildable
```

**Actions:**
1. Move `sanity/queries/` → `libs/sanity-queries/src/queries/`
2. Update imports to use `@schema-ui/shared`
3. Create `libs/sanity-queries/src/index.ts`

## Phase 4: Create Component Libraries

### Step 4.1: Create @schema-ui/ui Library
```bash
pnpm nx generate @nx/react:library ui --directory=libs/ui --importPath=@schema-ui/ui --buildable --publishable
```

**Actions:**
1. Move `components/ui/` → `libs/ui/src/components/ui/`
2. Move `components/portable-text-renderer.tsx` → `libs/ui/src/components/`
3. Move `components/theme-provider.tsx` → `libs/ui/src/components/`
4. Update imports to use `@schema-ui/shared`
5. Create `libs/ui/src/index.ts` with component exports
6. Configure Tailwind CSS for this library

### Step 4.2: Create @schema-ui/blocks Library
```bash
pnpm nx generate @nx/react:library blocks --directory=libs/blocks --importPath=@schema-ui/blocks --buildable --publishable
```

**Actions:**
1. Move `components/blocks/` → `libs/blocks/src/components/blocks/`
2. Update imports:
   - `@/lib/utils` → `@schema-ui/shared`
   - `@/components/ui/*` → `@schema-ui/ui`
   - `@/sanity/lib/*` → `@schema-ui/sanity`
   - `@/sanity/queries/*` → `@schema-ui/sanity-queries`
3. Create `libs/blocks/src/index.ts`
4. Add dependencies in `project.json`

### Step 4.3: Create @schema-ui/layout Library
```bash
pnpm nx generate @nx/react:library layout --directory=libs/layout --importPath=@schema-ui/layout --buildable --publishable
```

**Actions:**
1. Move `components/header/` → `libs/layout/src/components/header/`
2. Move `components/footer.tsx` → `libs/layout/src/components/`
3. Move `components/logo.tsx` → `libs/layout/src/components/`
4. Move `components/menu-toggle.tsx` → `libs/layout/src/components/`
5. Move `components/disable-draft-mode.tsx` → `libs/layout/src/components/`
6. Update imports
7. Create `libs/layout/src/index.ts`

### Step 4.4: Create @schema-ui/blog Library
```bash
pnpm nx generate @nx/react:library blog --directory=libs/blog --importPath=@schema-ui/blog --buildable
```

**Actions:**
1. Move `components/post-card.tsx` → `libs/blog/src/components/`
2. Move `components/post-date.tsx` → `libs/blog/src/components/`
3. Move `components/blocks/post-hero.tsx` → `libs/blog/src/components/`
4. Move `sanity/queries/post.ts` → `libs/blog/src/queries/`
5. Move `sanity/queries/all-posts.ts` → `libs/blog/src/queries/`
6. Update imports
7. Create `libs/blog/src/index.ts`

### Step 4.5: Create @schema-ui/forms Library
```bash
pnpm nx generate @nx/react:library forms --directory=libs/forms --importPath=@schema-ui/forms --buildable
```

**Actions:**
1. Move `components/blocks/forms/` → `libs/forms/src/components/forms/`
2. Move `sanity/queries/forms/` → `libs/forms/src/queries/`
3. Move `sanity/schemas/blocks/forms/` → `libs/forms/src/schemas/`
4. Update imports
5. Create `libs/forms/src/index.ts`

### Step 4.6: Create @schema-ui/studio Library
```bash
pnpm nx generate @nx/js:library studio --directory=libs/studio --importPath=@schema-ui/studio --buildable
```

**Actions:**
1. Move `sanity/presentation/` → `libs/studio/src/presentation/`
2. Move `sanity/schemas/previews/` → `libs/studio/src/previews/`
3. Update imports
4. Create `libs/studio/src/index.ts`

## Phase 5: Create Next.js Application

### Step 5.1: Generate Next.js App
```bash
pnpm nx generate @nx/next:application web --directory=apps/web
```

**Actions:**
1. Move `app/` → `apps/web/app/`
2. Move `public/` → `apps/web/public/`
3. Move `next.config.mjs` → `apps/web/next.config.mjs`
4. Update `next.config.mjs` to transpile all libraries:
   ```javascript
   const { composePlugins, withNx } = require('@nx/next');
   
   const nextConfig = {
     // ... existing config
     transpilePackages: [
       '@schema-ui/shared',
       '@schema-ui/sanity',
       '@schema-ui/sanity-schemas',
       '@schema-ui/sanity-queries',
       '@schema-ui/ui',
       '@schema-ui/blocks',
       '@schema-ui/layout',
       '@schema-ui/blog',
       '@schema-ui/forms',
       '@schema-ui/studio',
     ],
   };
   
   module.exports = composePlugins(withNx(), nextConfig);
   ```

### Step 5.2: Update App Imports
Update all imports in `apps/web/app/` to use library paths:
- `@/components/*` → `@schema-ui/*`
- `@/lib/*` → `@schema-ui/shared`
- `@/sanity/*` → `@schema-ui/sanity*`

## Phase 6: Configuration Updates

### Step 6.1: Update Root package.json
```json
{
  "name": "schema-ui-monorepo",
  "packageManager": "pnpm@9.0.0",
  "engines": {
    "node": ">=18.0.0",
    "pnpm": ">=9.0.0"
  },
  "scripts": {
    "preinstall": "npx only-allow pnpm",
    "dev": "pnpm nx dev web",
    "build": "pnpm nx build web",
    "start": "pnpm nx start web",
    "lint": "pnpm nx run-many --target=lint --all",
    "typecheck": "pnpm nx run-many --target=typecheck --all",
    "typegen": "pnpm nx run sanity-schemas:typegen",
    "test": "pnpm nx run-many --target=test --all"
  }
}
```

### Step 6.2: Configure Tailwind CSS
Create root `tailwind.config.js`:
```javascript
module.exports = {
  content: [
    './apps/web/**/*.{js,ts,jsx,tsx,mdx}',
    './libs/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Each library can extend this in its own `tailwind.config.js` if needed.

### Step 6.3: Update Sanity Typegen
Update typegen script in `libs/sanity-schemas/project.json`:
```json
{
  "targets": {
    "typegen": {
      "executor": "nx:run-commands",
      "options": {
        "command": "cd libs/sanity-schemas && rm -rf ../../schema.json && sanity schema extract && sanity typegen generate",
        "cwd": "{workspaceRoot}"
      }
    }
  }
}
```

### Step 6.4: Update .gitignore
Add Nx-specific entries:
```
# Nx
.nx/cache
.nx/workspace-data
dist/
```

## Phase 7: Testing and Verification

### Step 7.1: Verify TypeScript Compilation
```bash
pnpm nx run-many --target=typecheck --all
```

### Step 7.2: Verify Builds
```bash
pnpm nx run-many --target=build --all
```

### Step 7.3: Test Development Server
```bash
pnpm nx dev web
```

### Step 7.4: Verify Dependency Graph
```bash
pnpm nx graph
```

## Phase 8: Cleanup

### Step 8.1: Remove Old Files
After verifying everything works:
- Remove old `lib/`, `components/`, `sanity/` directories from root
- Keep only `apps/`, `libs/`, and configuration files at root

### Step 8.2: Update Documentation
- Update README.md with monorepo structure
- Document development workflow
- Add library-specific documentation

## Verification Checklist

- [ ] All libraries build successfully
- [ ] TypeScript compilation passes
- [ ] Development server starts without errors
- [ ] All imports resolve correctly
- [ ] Sanity Studio loads correctly
- [ ] All pages render correctly
- [ ] API routes work
- [ ] Typegen generates types correctly
- [ ] Nx dependency graph shows correct relationships
- [ ] Linting passes
- [ ] No circular dependencies

## Common Issues and Solutions

### Issue: pnpm not found or wrong version
**Solution**: 
```bash
corepack enable
corepack prepare pnpm@9.0.0 --activate
# Or install globally: npm install -g pnpm
```

### Issue: npm/yarn commands still work
**Solution**: Ensure `only-allow` is installed and `preinstall` script is in package.json. Try `npm install` - it should show an error.

### Issue: Import resolution errors
**Solution**: Verify `tsconfig.base.json` paths and library `tsconfig.json` files extend base config

### Issue: Tailwind styles not applying
**Solution**: Ensure `tailwind.config.js` content paths include all library source files

### Issue: Next.js build fails with module not found
**Solution**: Verify `transpilePackages` in `next.config.mjs` includes all libraries

### Issue: Sanity typegen fails
**Solution**: Ensure typegen runs from correct directory and paths are updated

### Issue: Circular dependencies
**Solution**: Use `nx graph` to visualize and refactor dependencies
