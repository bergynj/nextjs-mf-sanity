# Nx Monorepo Migration PRD

## Overview

This document outlines the plan to migrate the Schema UI Next.js + Sanity starter from a single application structure to a composable, domain-driven frontend modules monorepo using Nx with pnpm enforcement.

## Documentation Structure

This PRD provides the high-level architecture and migration plan. For detailed implementation guidance, see the following documents in [`details/`](./details/):

- **[IMPLEMENTATION_GUIDE.md](./details/IMPLEMENTATION_GUIDE.md)** - Step-by-step implementation instructions with commands and actions
- **[MIGRATION_FILE_MAPPING.md](./details/MIGRATION_FILE_MAPPING.md)** - Detailed file mappings from current structure to monorepo structure
- **[PNPM_ENFORCEMENT.md](./details/PNPM_ENFORCEMENT.md)** - Complete pnpm enforcement configuration and setup
- **[MIGRATION_SUMMARY.md](./details/MIGRATION_SUMMARY.md)** - Quick reference guide with key commands and import paths

**How to use these documents:**
1. Start with this PRD to understand the architecture and rationale
2. Use **IMPLEMENTATION_GUIDE.md** for step-by-step migration execution
3. Reference **MIGRATION_FILE_MAPPING.md** when moving files
4. Follow **PNPM_ENFORCEMENT.md** for package manager setup
5. Keep **MIGRATION_SUMMARY.md** handy as a quick reference during migration

## Target Architecture

### Workspace Structure (5 Libraries)

```
workspace/
├── apps/
│   └── web/                    # Next.js application
│       ├── app/                # Next.js app router
│       ├── public/             # Static assets
│       └── next.config.mjs
│
├── libs/
│   ├── shared/                 # @schema-ui/shared
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   └── utils.ts
│   │   │   └── types/
│   │   └── project.json
│   │
│   ├── sanity/                 # @schema-ui/sanity (ALL Sanity functionality)
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   ├── client.ts
│   │   │   │   ├── fetch.ts
│   │   │   │   ├── image.ts
│   │   │   │   ├── live.ts
│   │   │   │   ├── metadata.ts
│   │   │   │   └── token.ts
│   │   │   ├── schemas/        # All schema definitions
│   │   │   ├── queries/        # All GROQ queries
│   │   │   ├── presentation/   # Studio presentation
│   │   │   ├── env.ts
│   │   │   ├── schema.ts
│   │   │   └── structure.ts
│   │   ├── sanity.config.ts
│   │   └── project.json
│   │
│   ├── ui/                     # @schema-ui/ui
│   │   ├── src/
│   │   │   └── components/
│   │   │       ├── ui/         # Reusable UI primitives
│   │   │       ├── portable-text-renderer.tsx
│   │   │       └── theme-provider.tsx
│   │   └── project.json
│   │
│   ├── blocks/                 # @schema-ui/blocks (ALL content blocks)
│   │   ├── src/
│   │   │   └── components/
│   │   │       └── blocks/
│   │   │           ├── hero/
│   │   │           ├── grid/
│   │   │           ├── split/
│   │   │           ├── carousel/
│   │   │           ├── timeline/
│   │   │           ├── cta/
│   │   │           ├── forms/   # Form blocks (newsletter)
│   │   │           ├── all-posts.tsx
│   │   │           ├── faqs.tsx
│   │   │           └── index.tsx
│   │   └── project.json
│   │
│   └── layout/                 # @schema-ui/layout
│       ├── src/
│       │   └── components/
│       │       ├── header/
│       │       ├── footer.tsx
│       │       ├── logo.tsx
│       │       └── menu-toggle.tsx
│       └── project.json
│
├── nx.json
├── package.json
├── tsconfig.base.json
└── tailwind.config.js          # Shared Tailwind config
```

## Rationale: Why 5 Libraries?

### Analysis of Original 11-Library Proposal

After analyzing the codebase, we consolidated from 11 to 5 libraries because:

1. **Sanity is one domain**: Client, schemas, queries, and studio config all serve the same purpose (CMS integration) and are tightly coupled
2. **All blocks are content blocks**: Hero, grid, split, carousel, forms, blog blocks - they're all rendered by the same `componentMap` in `components/blocks/index.tsx`
3. **Blog is not a separate domain**: Blog queries are just Sanity queries, blog blocks are just content blocks
4. **Forms are blocks**: The newsletter form is already in the blocks componentMap
5. **Layout is separate**: Header/footer are structural components, distinct from content blocks

### Comparison

| Aspect | 11 Libraries | 5 Libraries |
|--------|--------------|-------------|
| **Complexity** | High | Low |
| **Dependencies** | Many to manage | Few, clear |
| **Build time** | Slower (more projects) | Faster |
| **Developer experience** | More to navigate | Simpler |
| **Domain clarity** | Over-segmented | Clear boundaries |
| **Reusability** | Same | Same |

**Recommendation**: Start with 5 libraries. You can always split later if needed, but it's harder to merge once split.

## Domain Module Breakdown

### 1. @schema-ui/shared
**Purpose**: Foundation utilities and types
- `lib/utils.ts` - Utility functions (cn, etc.)
- `types/` - Shared TypeScript types
- **Dependencies**: None (base library)

### 2. @schema-ui/sanity
**Purpose**: Complete Sanity CMS integration (consolidated)
- Client configuration and utilities
- Fetch utilities
- Image URL builder
- Live preview utilities
- Metadata generation
- Environment configuration
- **ALL** schema definitions (documents, blocks, shared objects)
- **ALL** GROQ queries (page, post, navigation, settings, etc.)
- Studio configuration
- Presentation resolve
- Preview components
- **Dependencies**: `@schema-ui/shared`

**Rationale**: All Sanity-related functionality is one cohesive domain. Schemas, queries, and client are tightly coupled.

### 3. @schema-ui/ui
**Purpose**: Reusable UI component library
- Radix UI wrappers (accordion, avatar, badge, button, card, etc.)
- Form components
- Layout utilities (section-container)
- Portable text renderer
- Theme provider
- **Dependencies**: `@schema-ui/shared`

### 4. @schema-ui/blocks
**Purpose**: All content block components (consolidated)
- Hero blocks
- Grid blocks
- Split blocks
- Carousel blocks
- Timeline blocks
- CTA blocks
- FAQ blocks
- Logo cloud blocks
- Form blocks (newsletter)
- Blog blocks (all-posts, post-hero)
- Block renderer/index
- **Dependencies**: `@schema-ui/shared`, `@schema-ui/ui`, `@schema-ui/sanity`

**Rationale**: All blocks are composable and work together via componentMap. Blog and form blocks are just content blocks.

### 5. @schema-ui/layout
**Purpose**: Structural layout and navigation components
- Header (desktop and mobile navigation)
- Footer
- Logo component
- Menu toggle
- Draft mode utilities
- **Dependencies**: `@schema-ui/shared`, `@schema-ui/ui`, `@schema-ui/sanity`

**Rationale**: Layout is structural, separate from content blocks.

### 6. apps/web
**Purpose**: Next.js application
- App router pages
- API routes
- Global styles
- Next.js configuration
- **Dependencies**: All libraries

## Dependencies Graph

```
apps/web
  └── depends on all libraries

@schema-ui/blocks
  ├── @schema-ui/ui
  ├── @schema-ui/sanity
  └── @schema-ui/shared

@schema-ui/layout
  ├── @schema-ui/ui
  ├── @schema-ui/sanity
  └── @schema-ui/shared

@schema-ui/ui
  └── @schema-ui/shared

@schema-ui/sanity
  └── @schema-ui/shared
```

## Migration Phases

### Phase 1: Nx Workspace Setup
1. Initialize Nx workspace with Next.js plugin (using pnpm)
2. Configure pnpm enforcement (.npmrc, packageManager field, only-allow)
3. Configure nx.json with executors and task pipelines
4. Set up TypeScript base configuration (tsconfig.base.json)
5. Configure shared Tailwind CSS at workspace root
6. Update .gitignore for Nx cache

### Phase 2: Create Base Libraries
1. Create @schema-ui/shared library
2. Create @schema-ui/sanity library (consolidated: client, schemas, queries, studio)
3. Configure project.json files with build/test/lint targets

### Phase 3: Create Component Libraries
1. Create @schema-ui/ui library
2. Create @schema-ui/blocks library (all content blocks including forms and blog blocks)
3. Create @schema-ui/layout library

### Phase 4: Create Application
1. Create apps/web Next.js application
2. Migrate app router pages
3. Migrate API routes
4. Migrate public assets
5. Configure Next.js for monorepo

### Phase 5: Update Imports and Dependencies
1. Update all import statements to use library paths
2. Configure TypeScript path mappings
3. Set up Nx dependency graph
4. Update component imports in blocks library

### Phase 6: Configuration and Build
1. Configure Tailwind CSS for each library
2. Update Next.js config for monorepo
3. Migrate Sanity typegen configuration
4. Update package.json scripts
5. Configure PostCSS for monorepo

### Phase 7: Testing and Documentation
1. Test build commands
2. Test dev server
3. Test type-checking
4. Update README with monorepo structure
5. Document development workflow

## Key Considerations

### Package Manager (pnpm)
- **pnpm is enforced** via `packageManager` field in package.json
- `only-allow` package prevents npm/yarn usage
- `.npmrc` configures pnpm behavior for monorepo
- All commands use `pnpm` (e.g., `pnpm nx`, `pnpm install`)
- See [PNPM_ENFORCEMENT.md](./details/PNPM_ENFORCEMENT.md) for complete configuration

### TypeScript Configuration
- Use `tsconfig.base.json` for shared compiler options
- Each library should extend base config
- Use path mappings for clean imports

### Tailwind CSS
- Shared config at root
- Each library can extend base config
- Content paths must include all library source files

### Sanity Typegen
- Typegen should run from workspace root
- Generated types should be accessible to all libraries
- Consider creating a shared types library or placing in @schema-ui/shared

### Build Strategy
- Libraries should be buildable for distribution
- Use Nx affected commands for incremental builds
- Configure proper caching

### Dependency Management
- Libraries should only depend on what they need
- Avoid circular dependencies
- Use Nx dependency graph to visualize relationships

## Benefits of This Structure

1. **Modularity**: Each domain is isolated and can be developed independently
2. **Reusability**: Libraries can be shared across multiple applications
3. **Testability**: Each library can be tested in isolation
4. **Scalability**: Easy to add new applications or libraries
5. **Type Safety**: TypeScript ensures proper dependencies between modules
6. **Build Performance**: Nx caching and affected commands optimize builds
7. **Developer Experience**: Clear boundaries and dependencies

## Migration Strategy

1. **Incremental Migration**: Migrate one library at a time
2. **Maintain Functionality**: Ensure app continues to work after each step
3. **Test Frequently**: Run builds and type-checks after each migration
4. **Update Imports Gradually**: Use find/replace with careful verification

## Post-Migration Enhancements

1. Set up Nx code generation for consistent library structure
2. Configure ESLint rules per library
3. Set up testing infrastructure per library
4. Configure Storybook for component libraries
5. Set up CI/CD with Nx affected commands
6. Add library documentation generation

## When to Split Further

Only split if:
- A library becomes too large (>100 files)
- You need to publish libraries separately
- Different teams own different domains
- You have multiple apps with different needs
