# Simplified Monorepo Structure

## Analysis: Why 11 Libraries is Too Many

After analyzing the codebase, here's why we can consolidate:

1. **Sanity is one domain**: Client, schemas, queries, and studio config all serve the same purpose (CMS integration)
2. **All blocks are content blocks**: Hero, grid, split, carousel, forms, blog blocks - they're all rendered by the same component map
3. **Blog is not a separate domain**: Blog queries are just Sanity queries, blog blocks are just content blocks
4. **Forms are blocks**: The newsletter form is already in the blocks componentMap
5. **Layout is separate**: Header/footer are structural, not content blocks

## Recommended Structure: 5-6 Libraries

### Option A: Minimal (5 libraries)

```
libs/
├── shared/          # @schema-ui/shared
│   └── Utilities, types, common functions
│
├── sanity/          # @schema-ui/sanity
│   └── Client, schemas, queries, studio config (ALL Sanity-related)
│
├── ui/              # @schema-ui/ui
│   └── Reusable UI primitives (button, card, accordion, etc.)
│
├── blocks/          # @schema-ui/blocks
│   └── ALL content blocks (hero, grid, split, carousel, forms, blog blocks, etc.)
│
└── layout/          # @schema-ui/layout
    └── Header, footer, navigation, logo

apps/
└── web/             # Next.js application
```

**Rationale:**
- **Sanity** = One domain (CMS), so one library
- **Blocks** = All content blocks are composable and used together
- **Layout** = Structural components separate from content
- **UI** = Reusable primitives
- **Shared** = Base utilities

### Option B: Moderate (6 libraries) - If you want to separate concerns

```
libs/
├── shared/          # @schema-ui/shared
├── sanity/          # @schema-ui/sanity (client, schemas, queries)
├── studio/          # @schema-ui/studio (studio config, previews)
├── ui/              # @schema-ui/ui
├── blocks/          # @schema-ui/blocks
└── layout/          # @schema-ui/layout
```

**Rationale:** Only separates studio if you want to keep it isolated from core Sanity.

## Comparison

| Aspect | 11 Libraries | 5-6 Libraries |
|--------|--------------|---------------|
| **Complexity** | High | Low |
| **Dependencies** | Many to manage | Few, clear |
| **Build time** | Slower (more projects) | Faster |
| **Developer experience** | More to navigate | Simpler |
| **Domain clarity** | Over-segmented | Clear boundaries |
| **Reusability** | Same | Same |

## Domain Boundaries (5-Library Approach)

### 1. @schema-ui/shared
**Purpose**: Foundation utilities
- `lib/utils.ts`
- `types/`
- **Dependencies**: None

### 2. @schema-ui/sanity
**Purpose**: Complete CMS integration
- Client, fetch, image utilities
- ALL schemas (documents, blocks, shared objects)
- ALL queries (page, post, navigation, etc.)
- Studio configuration
- Presentation resolve
- **Dependencies**: `@schema-ui/shared`

### 3. @schema-ui/ui
**Purpose**: Reusable UI primitives
- Radix UI wrappers
- Form components
- Layout utilities (section-container)
- Portable text renderer
- Theme provider
- **Dependencies**: `@schema-ui/shared`

### 4. @schema-ui/blocks
**Purpose**: All content blocks
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

### 5. @schema-ui/layout
**Purpose**: Structural layout components
- Header (desktop/mobile nav)
- Footer
- Logo
- Menu toggle
- Draft mode utilities
- **Dependencies**: `@schema-ui/shared`, `@schema-ui/ui`, `@schema-ui/sanity`

## Why This Makes More Sense

1. **Sanity is cohesive**: Schemas, queries, and client are tightly coupled - they belong together
2. **Blocks are composable**: All blocks work together via the componentMap - splitting them adds complexity without benefit
3. **Blog is content**: Blog queries are Sanity queries, blog blocks are content blocks
4. **Forms are blocks**: Already integrated into the block system
5. **Clear separation**: UI (primitives) vs Blocks (composed content) vs Layout (structure)

## When to Split Further

Only split if:
- A library becomes too large (>100 files)
- You need to publish libraries separately
- Different teams own different domains
- You have multiple apps with different needs

## Recommendation

**Start with 5 libraries** (Option A). You can always split later if needed, but it's harder to merge once split.
