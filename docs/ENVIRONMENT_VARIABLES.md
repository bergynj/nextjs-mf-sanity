# Environment Variables

This project uses Zod for type-safe environment variable validation. All environment variables are centralized in `lib/env.ts`.

## Benefits

- **Type Safety**: Environment variables are validated at startup with proper TypeScript types
- **Fail Fast**: Application crashes at startup with clear error messages if required variables are missing or invalid
- **Single Source of Truth**: One centralized location (`lib/env.ts`) to manage all environment configuration
- **Documentation**: The Zod schema serves as self-documenting code for all required environment variables
- **Testing**: Easy to mock/override configuration in tests

## Required Environment Variables

### Site Configuration

- `NEXT_PUBLIC_SITE_URL` - Your website URL (e.g., `https://yourwebsite.com`)
  - Must be a valid URL
  - Must NOT have a trailing slash
  
- `NEXT_PUBLIC_SITE_ENV` - Environment type: `development` or `production`
  - Defaults to `development`
  - Affects SEO settings (development mode prevents search engine indexing)

### Sanity CMS Configuration

- `NEXT_PUBLIC_SANITY_API_VERSION` - Sanity API version in YYYY-MM-DD format (e.g., `2024-10-18`)
  - Defaults to `2024-10-31`
  - Use current date to target the latest API version

- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Your Sanity project ID (e.g., `abc12345`)
  - **Required**

- `NEXT_PUBLIC_SANITY_DATASET` - Your Sanity dataset name (e.g., `production` or `development`)
  - **Required**

- `SANITY_API_READ_TOKEN` - Sanity read token for Next.js to fetch data
  - **Required**
  - Server-side only (not exposed to client)

### Resend Configuration (Optional)

- `DISABLE_RESEND` - Set to `true` to disable Resend email integration
  - Defaults to `false`
  - Allows building the app without Resend credentials

- `RESEND_API_KEY` - Your Resend API key for the newsletter form
  - Optional (required only if Resend is enabled)

- `RESEND_AUDIENCE_ID` - Your Resend audience ID for storing newsletter contacts
  - Optional (required only if Resend is enabled)

## Usage

### In Your Code

Import the validated environment configuration from `lib/env.ts`:

```typescript
import { env, isProduction } from "@/lib/env";

// Use type-safe environment variables
const siteUrl = env.NEXT_PUBLIC_SITE_URL;
const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID;

// Use helper functions
if (isProduction) {
  // Production-specific logic
}
```

### Setting Up Environment Variables

1. Copy `.env.local.example` to `.env.local`
2. Fill in all required values
3. The application will validate all variables at startup
4. If any variable is missing or invalid, you'll get a clear error message

### Example Error Messages

If you forget to set a required variable:

```
❌ Environment variable validation failed:
  - NEXT_PUBLIC_SANITY_PROJECT_ID: String must contain at least 1 character(s)
```

If you provide an invalid URL:

```
❌ Environment variable validation failed:
  - NEXT_PUBLIC_SITE_URL: NEXT_PUBLIC_SITE_URL should not have a trailing slash
```

## Testing

In tests, you can easily mock the environment configuration:

```typescript
import { env } from "@/lib/env";

// Mock env for testing
jest.mock("@/lib/env", () => ({
  env: {
    NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
    NEXT_PUBLIC_SANITY_PROJECT_ID: "test-project",
    // ... other values
  },
  isProduction: false,
}));
```

## Adding New Environment Variables

To add a new environment variable:

1. Add it to the `envSchema` in `lib/env.ts`
2. Add validation rules using Zod
3. Update this documentation
4. Update `.env.local.example`

Example:

```typescript
const envSchema = z.object({
  // ... existing variables
  
  // New variable
  MY_NEW_VARIABLE: z
    .string()
    .min(1, "MY_NEW_VARIABLE is required"),
});
```

## Validation Rules

The following validation rules are enforced:

- **URLs**: Must be valid URLs without trailing slashes
- **Dates**: Must be in YYYY-MM-DD format
- **Required vs Optional**: Clear distinction between required and optional variables
- **Type Transformations**: Automatic conversion (e.g., string "true" → boolean true)
- **Defaults**: Sensible defaults for optional configuration
