# CLAUDE.md - AI Assistant Guide

This document provides a comprehensive guide to the Next.js Sanity Starter codebase for AI assistants working on this project.

## Project Overview

This is a **Next.js 15 + Sanity CMS starter template** from the Schema UI project, designed for building content-driven websites with a visual page builder approach. It combines Next.js App Router with Sanity headless CMS and shadcn/ui components.

**Live Demo**: https://starter.schemaui.com
**Documentation**: https://schemaui.com/docs
**Repository Pattern**: Monorepo structure with integrated Sanity Studio

## Technology Stack

### Core Framework
- **Next.js 15.5.4** - React framework with App Router
- **React 19.1.1** - UI library
- **TypeScript 5.9.2** - Type safety
- **Node.js** - Runtime environment

### CMS & Data
- **Sanity 4.10.0** - Headless CMS
- **next-sanity 11.1.3** - Next.js integration for Sanity
- **GROQ** - Query language for Sanity data

### UI & Styling
- **Tailwind CSS 4.1.13** - Utility-first CSS framework
- **shadcn/ui** - Re-usable component system (New York style)
- **Radix UI** - Unstyled, accessible UI primitives
- **Lucide React** - Icon library
- **class-variance-authority** - Component variant management
- **next-themes** - Dark mode support

### Additional Libraries
- **@portabletext/react** - Rich text rendering
- **react-hook-form + zod** - Form handling and validation
- **framer-motion (motion)** - Animations
- **resend** - Email service for newsletter forms
- **prism-react-renderer** - Code syntax highlighting

## Directory Structure

```
/
├── app/                          # Next.js App Router
│   ├── (main)/                   # Main route group
│   │   ├── [slug]/              # Dynamic page routes
│   │   │   └── page.tsx
│   │   ├── blog/                # Blog routes
│   │   │   └── [slug]/
│   │   ├── layout.tsx           # Main layout with header/footer
│   │   └── page.tsx             # Homepage
│   ├── studio/                  # Sanity Studio routes
│   │   └── [[...tool]]/
│   │       └── page.tsx
│   ├── api/                     # API routes
│   │   ├── draft-mode/          # Draft mode endpoints
│   │   └── newsletter/          # Newsletter subscription
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles & Tailwind
│   ├── sitemap.ts               # Dynamic sitemap
│   └── robots.ts                # Robots.txt generation
│
├── components/                  # React components
│   ├── ui/                      # shadcn/ui components
│   ├── blocks/                  # Content block components
│   │   ├── hero/                # Hero variants
│   │   ├── split/               # Split section variants
│   │   ├── grid/                # Grid layouts
│   │   ├── carousel/            # Carousel components
│   │   ├── cta/                 # Call-to-action blocks
│   │   ├── forms/               # Form components
│   │   ├── logo-cloud/          # Logo cloud components
│   │   ├── timeline/            # Timeline components
│   │   ├── index.tsx            # Block component mapper
│   │   ├── section-header.tsx
│   │   ├── faqs.tsx
│   │   └── all-posts.tsx
│   └── header/                  # Header components
│
├── sanity/                      # Sanity CMS configuration
│   ├── schemas/                 # Sanity schema definitions
│   │   ├── documents/           # Document types
│   │   │   ├── page.ts          # Page schema
│   │   │   ├── post.ts          # Blog post schema
│   │   │   ├── author.ts
│   │   │   ├── category.ts
│   │   │   ├── faq.ts
│   │   │   ├── testimonial.ts
│   │   │   ├── navigation.ts
│   │   │   └── settings.ts      # Site settings (singleton)
│   │   ├── blocks/              # Block schema definitions
│   │   │   ├── shared/          # Shared objects
│   │   │   │   ├── block-content.ts
│   │   │   │   ├── link.ts
│   │   │   │   ├── color-variant.ts
│   │   │   │   ├── button-variant.ts
│   │   │   │   └── section-padding.ts
│   │   │   ├── hero/
│   │   │   ├── split/
│   │   │   ├── grid/
│   │   │   ├── carousel/
│   │   │   ├── cta/
│   │   │   ├── forms/
│   │   │   ├── logo-cloud/
│   │   │   └── timeline/
│   │   └── previews/            # Preview components
│   ├── queries/                 # GROQ queries
│   │   ├── page.ts
│   │   ├── post.ts
│   │   ├── navigation.ts
│   │   ├── settings.ts
│   │   ├── shared/              # Shared query fragments
│   │   └── [block-type]/        # Block-specific queries
│   ├── lib/                     # Sanity utilities
│   │   ├── client.ts            # Sanity client config
│   │   ├── fetch.ts             # Data fetching helpers
│   │   ├── image.ts             # Image URL builder
│   │   ├── live.ts              # Live preview setup
│   │   ├── metadata.ts          # Metadata generators
│   │   └── token.ts             # API token
│   ├── presentation/            # Presentation tool config
│   ├── env.ts                   # Environment variables
│   ├── schema.ts                # Schema registry
│   └── structure.ts             # Studio structure
│
├── lib/                         # Utility libraries
│   └── utils.ts                 # cn() helper (Tailwind merge)
│
├── types/                       # TypeScript type definitions
│
├── public/                      # Static assets
│   ├── images/                  # Images
│   └── sanity/preview/          # Block preview images
│
├── sanity.types.ts              # Generated Sanity types
├── schema.json                  # Extracted Sanity schema
├── components.json              # shadcn/ui config
├── next.config.mjs              # Next.js configuration
├── sanity.config.ts             # Sanity Studio config
├── tsconfig.json                # TypeScript config
└── tailwind.config.ts           # Tailwind configuration
```

## Development Workflows

### Environment Setup

1. **Environment Variables** (`.env.local`):
   ```bash
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_SITE_ENV=development  # or "production"
   NEXT_PUBLIC_SANITY_API_VERSION=2024-10-31  # Use current date
   NEXT_PUBLIC_SANITY_PROJECT_ID=abc12345
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_READ_TOKEN=sk...
   RESEND_API_KEY=re_...          # Optional
   RESEND_AUDIENCE_ID=...         # Optional
   ```

2. **Development Server**:
   ```bash
   npm run dev         # or pnpm dev, yarn dev
   ```
   - Next.js app: http://localhost:3000
   - Sanity Studio: http://localhost:3000/studio

3. **Build & Deploy**:
   ```bash
   npm run build       # Production build
   npm run start       # Start production server
   npm run lint        # ESLint
   npm run typecheck   # TypeScript check
   ```

### Sanity Type Generation

**CRITICAL**: Run type generation after any schema changes:

```bash
npm run typegen
```

This runs two commands:
1. `sanity schema extract` - Creates `schema.json`
2. `sanity typegen generate` - Creates `sanity.types.ts`

**Always regenerate types when**:
- Adding/modifying schemas
- Adding/modifying GROQ queries
- Schema validation errors occur

## Key Architectural Patterns

### 1. Block-Based Content Architecture

This project uses a **block-based page builder** pattern:

#### Schema Layer (`sanity/schemas/`)
```typescript
// Document schema with blocks array
defineField({
  name: "blocks",
  type: "array",
  of: [
    { type: "hero-1" },
    { type: "split-row" },
    { type: "grid-row" },
    // ... more block types
  ],
})
```

#### Query Layer (`sanity/queries/`)
```typescript
// Page query fetches blocks
export const PAGE_QUERY = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    blocks[] {
      _type,
      _key,
      // ... block-specific fields
    }
  }
`;
```

#### Component Layer (`components/blocks/`)
```typescript
// Component mapper pattern
const componentMap = {
  "hero-1": Hero1,
  "split-row": SplitRow,
  // ... more mappings
};

// Dynamic rendering
blocks.map((block) => {
  const Component = componentMap[block._type];
  return <Component {...block} key={block._key} />;
});
```

### 2. Data Fetching Pattern

**Server-side fetching** using `sanityFetch`:

```typescript
// sanity/lib/fetch.ts exports helpers
export const fetchSanityPageBySlug = async ({ slug }) => {
  const { data } = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug },
  });
  return data;
};

// Usage in page.tsx
const page = await fetchSanityPageBySlug({ slug });
```

**Key principles**:
- Use `sanityFetch` from `@/sanity/lib/live` (enables draft mode)
- Server components fetch data directly
- No client-side data fetching for content
- Types imported from `sanity.types.ts`

### 3. Route Group Structure

Uses Next.js route groups for organization:

```
app/
├── (main)/          # Main site routes (with header/footer)
│   ├── layout.tsx   # Contains Header + Footer
│   ├── [slug]/      # Dynamic pages
│   └── blog/
└── studio/          # Sanity Studio (separate layout)
```

### 4. Singleton Documents

Some documents are singletons (only one instance):

```typescript
// In sanity.config.ts
const singletonTypes = new Set(["settings"]);

// In sanity/structure.ts
S.listItem()
  .title("Settings")
  .child(
    S.editor()
      .id("settings")
      .schemaType("settings")
      .documentId("settings")  // Fixed document ID
  )
```

**Singleton documents**: `settings`, `navigation`

### 5. TypeScript Integration

Strong typing throughout:

```typescript
import { PAGE_QUERYResult } from "@/sanity.types";

type Block = NonNullable<
  NonNullable<PAGE_QUERYResult>["blocks"]
>[number];

const componentMap: {
  [K in Block["_type"]]: React.ComponentType<Extract<Block, { _type: K }>>;
} = { /* ... */ };
```

## Schema & Data Flow

### Adding a New Block Component

Follow this pattern when adding new blocks:

#### 1. Create Schema (`sanity/schemas/blocks/`)
```typescript
// sanity/schemas/blocks/my-block.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "my-block",
  type: "object",
  title: "My Block",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    // ... more fields
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return { title: title || "My Block" };
    },
  },
});
```

#### 2. Register Schema (`sanity/schema.ts`)
```typescript
import myBlock from "./schemas/blocks/my-block";

export const schema = {
  types: [
    // ...
    myBlock,
  ],
};
```

#### 3. Add to Page Schema (`sanity/schemas/documents/page.ts`)
```typescript
defineField({
  name: "blocks",
  type: "array",
  of: [
    // ...
    { type: "my-block" },
  ],
})
```

#### 4. Create GROQ Query (`sanity/queries/my-block.ts`)
```typescript
import { groq } from "next-sanity";

export const MY_BLOCK_FRAGMENT = groq`
  _type == "my-block" => {
    _type,
    _key,
    title,
    // ... fields
  }
`;
```

#### 5. Update Page Query (`sanity/queries/page.ts`)
```typescript
import { MY_BLOCK_FRAGMENT } from "./my-block";

export const PAGE_QUERY = groq`
  *[_type == "page" && slug.current == $slug][0] {
    // ...
    blocks[] {
      ${MY_BLOCK_FRAGMENT},
      // ... other fragments
    }
  }
`;
```

#### 6. Generate Types
```bash
npm run typegen
```

#### 7. Create Component (`components/blocks/my-block.tsx`)
```typescript
import { PAGE_QUERYResult } from "@/sanity.types";

type MyBlockProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "my-block" }
>;

export default function MyBlock({ title }: MyBlockProps) {
  return (
    <section>
      <h2>{title}</h2>
    </section>
  );
}
```

#### 8. Register Component (`components/blocks/index.tsx`)
```typescript
import MyBlock from "@/components/blocks/my-block";

const componentMap = {
  // ...
  "my-block": MyBlock,
};
```

#### 9. (Optional) Add Preview Image
Add preview to `public/sanity/preview/my-block.jpg` for visual block picker.

### Adding a New Document Type

#### 1. Create Schema (`sanity/schemas/documents/`)
```typescript
// sanity/schemas/documents/product.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "product",
  type: "document",
  title: "Product",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
    }),
    // ... more fields
  ],
});
```

#### 2. Register in Schema (`sanity/schema.ts`)
```typescript
import product from "./schemas/documents/product";

export const schema = {
  types: [
    product,
    // ...
  ],
};
```

#### 3. Add to Studio Structure (`sanity/structure.ts`)
```typescript
export const structure = (S: any) =>
  S.list()
    .title("Content")
    .items([
      // ...
      S.listItem()
        .title("Products")
        .schemaType("product")
        .child(S.documentTypeList("product")),
    ]);
```

#### 4. Create Query (`sanity/queries/product.ts`)
```typescript
export const PRODUCTS_QUERY = groq`
  *[_type == "product"] | order(_createdAt desc) {
    _id,
    title,
    slug,
  }
`;
```

#### 5. Create Fetch Helper (`sanity/lib/fetch.ts`)
```typescript
export const fetchProducts = async () => {
  const { data } = await sanityFetch({ query: PRODUCTS_QUERY });
  return data;
};
```

#### 6. Generate Types & Use
```bash
npm run typegen
```

## Component Patterns

### UI Components (shadcn/ui)

Located in `components/ui/`, these follow shadcn conventions:

```typescript
// Import with alias
import { Button } from "@/components/ui/button";

// Usage with variants
<Button variant="default" size="lg">
  Click me
</Button>
```

**Adding new shadcn components**: Use the CLI or manually add to `components/ui/`.

### Block Components

Block components receive typed props from Sanity:

```typescript
type HeroProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "hero-1" }
>;

export default function Hero1(props: HeroProps) {
  const { title, subtitle, colorVariant } = props;
  // ...
}
```

**Patterns**:
- Extract type from generated `PAGE_QUERYResult`
- Use `{ _type: "block-name" }` for discrimination
- Destructure props with TypeScript safety

### Portable Text (Rich Text)

Render rich text with `@portabletext/react`:

```typescript
import { PortableText } from "@portabletext/react";

<PortableText value={content} components={components} />
```

Components defined in `sanity/schemas/blocks/shared/block-content.ts`.

### Image Handling

Use Sanity's image URL builder:

```typescript
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

const imageUrl = urlFor(image)
  .width(800)
  .height(600)
  .quality(100)
  .url();

<Image src={imageUrl} alt={alt} width={800} height={600} />
```

**Note**: `next.config.mjs` has `unoptimized: true` and allows `cdn.sanity.io`.

## Styling Conventions

### Tailwind CSS

- **Config**: Custom configuration in `tailwind.config.ts`
- **Global styles**: `app/globals.css`
- **CSS variables**: Defined for theme colors
- **Dark mode**: Class-based (`class` strategy)

### Component Styling

```typescript
import { cn } from "@/lib/utils";

// Merge classes safely
<div className={cn("base-class", conditionalClass && "conditional")} />
```

**Best practices**:
- Use `cn()` for class merging
- Leverage Tailwind utilities
- Use CSS variables for theming
- Component variants via `class-variance-authority`

### Theme System

Dark mode via `next-themes`:

```typescript
// In app/layout.tsx
<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange
>
  {children}
</ThemeProvider>
```

Access theme in components:
```typescript
import { useTheme } from "next-themes";

const { theme, setTheme } = useTheme();
```

## Metadata & SEO

### Page Metadata

Generated dynamically from Sanity content:

```typescript
// app/(main)/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const page = await fetchSanityPageBySlug({ slug: params.slug });
  return generatePageMetadata({ page, slug: params.slug });
}
```

Helper in `sanity/lib/metadata.ts` handles:
- Title templates
- Descriptions
- Open Graph images
- Robots meta (based on `NEXT_PUBLIC_SITE_ENV`)

### Sitemap & Robots

- `app/sitemap.ts`: Dynamic sitemap from Sanity pages
- `app/robots.ts`: Generated robots.txt
- Respects `NEXT_PUBLIC_SITE_ENV` for indexing

## API Routes

### Draft Mode

Enables preview of unpublished content:

```
GET /api/draft-mode/enable?slug=/page-slug
GET /api/draft-mode/disable
```

Used by Sanity Presentation Tool.

### Newsletter

```
POST /api/newsletter
```

Integrates with Resend for email collection.

## Common Development Tasks

### Running the Development Server

```bash
npm run dev
# Access:
# - Frontend: http://localhost:3000
# - Studio: http://localhost:3000/studio
```

### Importing Sample Data

```bash
npx sanity dataset import sample-data.tar.gz production --replace
```

### Type Generation Workflow

**Always run after schema/query changes**:

```bash
npm run typegen
```

If you encounter type errors:
1. Check `schema.json` was generated
2. Check `sanity.types.ts` has updated types
3. Restart TypeScript server in your editor

### Building for Production

```bash
npm run build
npm run typecheck  # Verify no type errors
npm run lint       # Verify no lint errors
```

### Deploying to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables from `.env.local`
4. Deploy

**Important**: Update CORS origins in Sanity project settings to include production URL.

## Important Conventions

### Path Aliases

TypeScript path mapping (`tsconfig.json`):

```typescript
import Component from "@/components/Component";
import { helper } from "@/lib/helper";
import { QUERY } from "@/sanity/queries/query";
```

All paths use `@/` prefix for root-relative imports.

### Naming Conventions

- **Files**: kebab-case (`hero-section.tsx`)
- **Components**: PascalCase (`HeroSection`)
- **Utilities**: camelCase (`fetchData`)
- **Schemas**: kebab-case (`hero-1`, `split-row`)
- **Types**: PascalCase from generated types

### Block Naming

Block types use descriptive names with variant numbers:
- `hero-1`, `hero-2` (different hero variants)
- `carousel-1`, `carousel-2`
- `cta-1`

This allows multiple design variations of the same concept.

### Schema Groups

Schemas use groups for organization:

```typescript
groups: [
  { name: "content", title: "Content" },
  { name: "seo", title: "SEO" },
  { name: "settings", title: "Settings" },
]
```

### Query Fragments

Use GROQ fragments for reusability:

```typescript
const LINK_FRAGMENT = groq`
  _type,
  text,
  url,
  internalLink->{ slug }
`;

const HERO_FRAGMENT = groq`
  _type == "hero-1" => {
    title,
    cta { ${LINK_FRAGMENT} }
  }
`;
```

### Component Props Typing

Always use extracted types from generated Sanity types:

```typescript
// ✅ Good
type Props = Extract<
  NonNullable<PAGE_QUERYResult["blocks"]>[number],
  { _type: "hero-1" }
>;

// ❌ Avoid manual typing
interface Props {
  title?: string;
  subtitle?: string;
}
```

## Git Workflow

### Branches

This project uses the following branch strategy:
- **Main branch**: Production-ready code
- **Feature branches**: Use `claude/` prefix for AI-generated work

### Commits

Follow conventional commit format:
```
feat: add new hero variant
fix: resolve navigation link bug
docs: update README
refactor: simplify query structure
```

### Common Git Tasks

When asked to create commits:
1. Review changes with `git status` and `git diff`
2. Stage relevant files
3. Create descriptive commit messages
4. Verify with `git log`

When creating PRs:
1. Ensure on correct branch
2. Push to remote with `git push -u origin branch-name`
3. Use `gh pr create` for PR creation

## Troubleshooting

### Type Errors After Schema Changes

**Problem**: TypeScript errors about missing properties or wrong types.

**Solution**:
```bash
npm run typegen
# Restart TypeScript server in editor
```

### Images Not Loading

**Problem**: Images from Sanity not displaying.

**Solution**:
1. Verify `cdn.sanity.io` in `next.config.mjs` remote patterns
2. Check image URL with `urlFor(image).url()`
3. Ensure image exists in Sanity

### Draft Mode Not Working

**Problem**: Preview not showing unpublished content.

**Solution**:
1. Verify `SANITY_API_READ_TOKEN` in environment
2. Check Presentation Tool configuration in `sanity.config.ts`
3. Ensure draft mode endpoint is accessible

### Studio Not Loading

**Problem**: `/studio` route shows error.

**Solution**:
1. Verify all Sanity environment variables
2. Check `sanity.config.ts` for configuration errors
3. Clear `.next` cache: `rm -rf .next && npm run dev`

### Build Failures

**Problem**: `npm run build` fails.

**Solution**:
1. Run `npm run typecheck` to identify type errors
2. Run `npm run typegen` to regenerate types
3. Check for missing environment variables
4. Verify all imports resolve correctly

### Missing Block Components

**Problem**: Warning "No component implemented for block type".

**Solution**:
1. Create component in `components/blocks/`
2. Add to `componentMap` in `components/blocks/index.tsx`
3. Verify `_type` matches schema name exactly

## Environment-Specific Behavior

### Development vs Production

`NEXT_PUBLIC_SITE_ENV` controls:
- **Robots meta**: `development` = noindex, `production` = index
- **Error reporting**: More verbose in development
- **Caching**: Disabled in development for Sanity queries

### Sanity Datasets

Typical setup:
- **Development**: `development` dataset for local work
- **Production**: `production` dataset for live site
- **Staging**: Optional separate dataset

## Best Practices for AI Assistants

### When Adding Features

1. **Understand the block pattern**: Most features are implemented as blocks
2. **Follow the schema → query → component flow**
3. **Always run `npm run typegen` after schema changes**
4. **Use existing patterns**: Reference similar blocks for consistency
5. **Type safety**: Use generated types, don't create manual interfaces
6. **Test in Studio**: Verify new schemas appear correctly in Sanity Studio

### When Fixing Bugs

1. **Check type generation**: Many issues stem from outdated types
2. **Verify data flow**: Schema → Query → Type → Component
3. **Use TypeScript errors**: They often point to the root cause
4. **Test both draft and published modes**: Content may behave differently

### When Refactoring

1. **Preserve type safety**: Don't break TypeScript contracts
2. **Update queries with schemas**: Keep them in sync
3. **Test all block components**: Ensure renders still work
4. **Regenerate types**: After any schema changes

### Code Quality

1. **Use path aliases**: `@/` for all imports
2. **Follow naming conventions**: As documented above
3. **Leverage utilities**: `cn()`, `urlFor()`, existing helpers
4. **Maintain consistency**: Match existing code style
5. **Comment complex logic**: Especially GROQ queries

## Additional Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Sanity Docs**: https://www.sanity.io/docs
- **GROQ Docs**: https://www.sanity.io/docs/groq
- **shadcn/ui Docs**: https://ui.shadcn.com
- **Tailwind Docs**: https://tailwindcss.com/docs
- **Schema UI Docs**: https://schemaui.com/docs

## Quick Reference

### Common Commands
```bash
npm run dev           # Start dev server
npm run build         # Production build
npm run typegen       # Generate Sanity types
npm run typecheck     # Check TypeScript
npm run lint          # Run ESLint
```

### Key Files to Know
- `app/layout.tsx` - Root layout
- `app/(main)/[slug]/page.tsx` - Dynamic page template
- `components/blocks/index.tsx` - Block component mapper
- `sanity/schema.ts` - Schema registry
- `sanity/queries/page.ts` - Main page query
- `sanity.types.ts` - Generated types (don't edit manually)

### Environment Variables Checklist
- [ ] `NEXT_PUBLIC_SITE_URL`
- [ ] `NEXT_PUBLIC_SITE_ENV`
- [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID`
- [ ] `NEXT_PUBLIC_SANITY_DATASET`
- [ ] `NEXT_PUBLIC_SANITY_API_VERSION`
- [ ] `SANITY_API_READ_TOKEN`
- [ ] `RESEND_API_KEY` (optional)
- [ ] `RESEND_AUDIENCE_ID` (optional)

---

**Last Updated**: 2025-11-14
**Project Version**: 1.4.0
**Codebase State**: Clean working tree on `claude/claude-md-mhye36fgl22yp8pv-01MqnTGM2wqzt6cC9GCX5wjj`
