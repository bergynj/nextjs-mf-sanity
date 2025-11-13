# Monorepo Migration Plan: Domain-Driven Frontend Modules with Nx

## Overview

This document outlines the plan to migrate the Schema UI Next.js + Sanity starter from a single application structure to a composable, domain-driven frontend modules monorepo using Nx.

## Target Architecture

### Workspace Structure

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
│   ├── sanity/                 # @schema-ui/sanity
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   ├── client.ts
│   │   │   │   ├── fetch.ts
│   │   │   │   ├── image.ts
│   │   │   │   ├── live.ts
│   │   │   │   ├── metadata.ts
│   │   │   │   └── token.ts
│   │   │   └── env.ts
│   │   └── project.json
│   │
│   ├── sanity-schemas/         # @schema-ui/sanity-schemas
│   │   ├── src/
│   │   │   ├── schemas/
│   │   │   │   ├── blocks/
│   │   │   │   ├── documents/
│   │   │   │   └── previews/
│   │   │   ├── schema.ts
│   │   │   └── structure.ts
│   │   └── project.json
│   │
│   ├── sanity-queries/         # @schema-ui/sanity-queries
│   │   ├── src/
│   │   │   └── queries/
│   │   └── project.json
│   │
│   ├── ui/                     # @schema-ui/ui
│   │   ├── src/
│   │   │   └── components/
│   │   │       └── ui/
│   │   └── project.json
│   │
│   ├── blocks/                 # @schema-ui/blocks
│   │   ├── src/
│   │   │   └── components/
│   │   │       └── blocks/
│   │   └── project.json
│   │
│   ├── layout/                 # @schema-ui/layout
│   │   ├── src/
│   │   │   └── components/
│   │   │       ├── header/
│   │   │       ├── footer.tsx
│   │   │       └── logo.tsx
│   │   └── project.json
│   │
│   ├── blog/                   # @schema-ui/blog
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── queries/
│   │   │   └── schemas/
│   │   └── project.json
│   │
│   ├── forms/                  # @schema-ui/forms
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── queries/
│   │   │   └── schemas/
│   │   └── project.json
│   │
│   └── studio/                 # @schema-ui/studio
│       ├── src/
│       │   ├── presentation/
│       │   └── studio/
│       └── project.json
│
├── nx.json
├── package.json
├── tsconfig.base.json
└── tailwind.config.js          # Shared Tailwind config
```

## Domain Module Breakdown

### 1. @schema-ui/shared
**Purpose**: Common utilities, types, and shared functionality
- `lib/utils.ts` - Utility functions (cn, etc.)
- `types/` - Shared TypeScript types
- **Dependencies**: None (base library)

### 2. @schema-ui/sanity
**Purpose**: Sanity CMS client and core utilities
- Client configuration
- Fetch utilities
- Image URL builder
- Live preview utilities
- Metadata generation
- Environment configuration
- **Dependencies**: `@schema-ui/shared`

### 3. @schema-ui/sanity-schemas
**Purpose**: Sanity schema definitions
- Document schemas (page, post, author, category, etc.)
- Block schemas (hero, grid, split, carousel, etc.)
- Shared object schemas (block-content, link, color-variant, etc.)
- Schema structure configuration
- **Dependencies**: `@schema-ui/shared`

### 4. @schema-ui/sanity-queries
**Purpose**: GROQ queries for Sanity
- Page queries
- Post queries
- Block-specific queries
- Navigation queries
- Settings queries
- **Dependencies**: `@schema-ui/shared`

### 5. @schema-ui/ui
**Purpose**: Reusable UI component library
- Radix UI wrappers (accordion, avatar, badge, etc.)
- Form components
- Layout components (section-container, card, etc.)
- **Dependencies**: `@schema-ui/shared`

### 6. @schema-ui/blocks
**Purpose**: Content block components
- Hero blocks
- Grid blocks
- Split blocks
- Carousel blocks
- Timeline blocks
- CTA blocks
- FAQ blocks
- Logo cloud blocks
- All posts block
- **Dependencies**: `@schema-ui/shared`, `@schema-ui/ui`, `@schema-ui/sanity-queries`

### 7. @schema-ui/layout
**Purpose**: Layout and navigation components
- Header (desktop and mobile navigation)
- Footer
- Logo component
- Menu toggle
- **Dependencies**: `@schema-ui/shared`, `@schema-ui/ui`, `@schema-ui/sanity-queries`

### 8. @schema-ui/blog
**Purpose**: Blog-specific functionality
- Post components (post-card, post-date, post-hero)
- Blog queries
- Blog schemas (if blog-specific)
- **Dependencies**: `@schema-ui/shared`, `@schema-ui/ui`, `@schema-ui/sanity-queries`, `@schema-ui/blocks`

### 9. @schema-ui/forms
**Purpose**: Form components and functionality
- Newsletter form component
- Form schemas
- Form queries
- API route handlers (if needed)
- **Dependencies**: `@schema-ui/shared`, `@schema-ui/ui`, `@schema-ui/sanity-queries`

### 10. @schema-ui/studio
**Purpose**: Sanity Studio configuration
- Studio configuration
- Presentation resolve
- Preview components
- **Dependencies**: `@schema-ui/shared`, `@schema-ui/sanity-schemas`

### 11. apps/web
**Purpose**: Next.js application
- App router pages
- API routes
- Global styles
- Next.js configuration
- **Dependencies**: All libraries

## Migration Tasks

### Phase 1: Nx Workspace Setup
1. Initialize Nx workspace with Next.js plugin
2. Configure nx.json with executors and task pipelines
3. Set up TypeScript base configuration (tsconfig.base.json)
4. Configure shared Tailwind CSS at workspace root
5. Update .gitignore for Nx cache

### Phase 2: Create Base Libraries
1. Create @schema-ui/shared library
2. Create @schema-ui/sanity library
3. Configure project.json files with build/test/lint targets

### Phase 3: Create Content Libraries
1. Create @schema-ui/sanity-schemas library
2. Create @schema-ui/sanity-queries library
3. Set up proper dependencies between content libraries

### Phase 4: Create Component Libraries
1. Create @schema-ui/ui library
2. Create @schema-ui/blocks library
3. Create @schema-ui/layout library
4. Create @schema-ui/blog library
5. Create @schema-ui/forms library
6. Create @schema-ui/studio library

### Phase 5: Create Application
1. Create apps/web Next.js application
2. Migrate app router pages
3. Migrate API routes
4. Migrate public assets
5. Configure Next.js for monorepo

### Phase 6: Update Imports and Dependencies
1. Update all import statements to use library paths
2. Configure TypeScript path mappings
3. Set up Nx dependency graph
4. Update component imports in blocks library

### Phase 7: Configuration and Build
1. Configure Tailwind CSS for each library
2. Update Next.js config for monorepo
3. Migrate Sanity typegen configuration
4. Update package.json scripts
5. Configure PostCSS for monorepo

### Phase 8: Testing and Documentation
1. Test build commands
2. Test dev server
3. Test type-checking
4. Update README with monorepo structure
5. Document development workflow

## Key Considerations

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
