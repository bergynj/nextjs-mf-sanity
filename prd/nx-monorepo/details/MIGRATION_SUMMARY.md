# Monorepo Migration Summary

## Overview

This repository will be migrated from a single Next.js application to a composable, domain-driven frontend modules monorepo using Nx.

## Quick Reference

### Documentation Files
- **[../README.md](../README.md)** - Complete PRD with architecture, rationale, and migration plan
- **[MIGRATION_FILE_MAPPING.md](./MIGRATION_FILE_MAPPING.md)** - Detailed file mappings and import paths
- **[IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)** - Step-by-step implementation instructions
- **[PNPM_ENFORCEMENT.md](./PNPM_ENFORCEMENT.md)** - pnpm enforcement configuration and setup
- **MIGRATION_SUMMARY.md** - This file (quick reference)

### Task List
See the TODO list in your workspace for all 20 migration tasks (simplified from original 26).

## Library Structure (Simplified - 5 Libraries)

```
libs/
├── shared/          # @schema-ui/shared - Utilities and types
├── sanity/          # @schema-ui/sanity - ALL Sanity (client, schemas, queries, studio)
├── ui/              # @schema-ui/ui - Reusable UI components
├── blocks/          # @schema-ui/blocks - ALL content blocks (including forms & blog)
└── layout/          # @schema-ui/layout - Layout and navigation

apps/
└── web/             # Next.js application
```

**Note**: See [../README.md](../README.md) for complete rationale on why 5 libraries instead of 11.

## Key Dependencies

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

1. **Phase 1**: Initialize Nx workspace
2. **Phase 2**: Create base libraries (shared, sanity - consolidated)
3. **Phase 3**: Create component libraries (ui, blocks, layout)
4. **Phase 4**: Create Next.js application
5. **Phase 5**: Update configurations
6. **Phase 6**: Testing and verification
7. **Phase 7**: Cleanup

## Import Path Changes

| Before | After |
|--------|-------|
| `@/lib/utils` | `@schema-ui/shared` |
| `@/sanity/lib/client` | `@schema-ui/sanity` |
| `@/sanity/schemas/*` | `@schema-ui/sanity` |
| `@/sanity/queries/*` | `@schema-ui/sanity` |
| `@/components/ui/button` | `@schema-ui/ui` |
| `@/components/blocks/hero-1` | `@schema-ui/blocks` |

## Key Commands (pnpm enforced)

```bash
# Initialize Nx (with pnpm)
npx nx@latest init --packageManager=pnpm

# Generate library
pnpm nx generate @nx/react:library <name> --directory=libs/<name> --importPath=@schema-ui/<name>
# For JS libraries (sanity, shared):
pnpm nx generate @nx/js:library <name> --directory=libs/<name> --importPath=@schema-ui/<name>

# Generate Next.js app
pnpm nx generate @nx/next:application web --directory=apps/web

# Install dependencies
pnpm install

# Add dependency to workspace root
pnpm add -w <package>

# Add dependency to specific library
pnpm add --filter @schema-ui/shared <package>

# Build all
pnpm nx run-many --target=build --all

# Type check all
pnpm nx run-many --target=typecheck --all

# Run dev server
pnpm nx dev web

# View dependency graph
pnpm nx graph
```

**Note**: pnpm is enforced via `packageManager` field and `only-allow` package. See [PNPM_ENFORCEMENT.md](./PNPM_ENFORCEMENT.md) for details.

## Critical Configuration Files

1. **.npmrc** - pnpm configuration and enforcement
2. **package.json** - packageManager field, engines, and preinstall script
3. **nx.json** - Nx workspace configuration (with pnpm specified)
4. **tsconfig.base.json** - Base TypeScript config with path mappings
5. **apps/web/next.config.mjs** - Next.js config with transpilePackages
6. **tailwind.config.js** - Shared Tailwind config at root

## Success Criteria

- ✅ All libraries build independently
- ✅ TypeScript compilation passes
- ✅ Development server runs without errors
- ✅ All imports resolve correctly
- ✅ Sanity Studio works
- ✅ All pages render correctly
- ✅ No circular dependencies
- ✅ Nx dependency graph is correct

## Next Steps

1. Review all documentation files
2. Start with Phase 1 (Nx workspace initialization)
3. Follow IMPLEMENTATION_GUIDE.md step-by-step
4. Verify each phase before proceeding
5. Test thoroughly before cleanup

## Support Resources

- [Nx Documentation](https://nx.dev)
- [Nx Next.js Plugin](https://nx.dev/packages/next)
- [Nx React Plugin](https://nx.dev/packages/react)
