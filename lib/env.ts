import { z } from "zod";

/**
 * Environment variable schema and validation
 * 
 * This centralizes all environment variable validation using Zod.
 * The app will fail fast at startup if required variables are missing or invalid.
 */

// Define the schema for environment variables
const envSchema = z.object({
  // Site Configuration
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .url("NEXT_PUBLIC_SITE_URL must be a valid URL")
    .refine((url) => !url.endsWith("/"), {
      message: "NEXT_PUBLIC_SITE_URL should not have a trailing slash",
    }),
  NEXT_PUBLIC_SITE_ENV: z
    .enum(["development", "production"])
    .default("development"),

  // Sanity Configuration
  NEXT_PUBLIC_SANITY_API_VERSION: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "NEXT_PUBLIC_SANITY_API_VERSION must be in YYYY-MM-DD format")
    .default("2024-10-31"),
  NEXT_PUBLIC_SANITY_PROJECT_ID: z
    .string()
    .min(1, "NEXT_PUBLIC_SANITY_PROJECT_ID is required"),
  NEXT_PUBLIC_SANITY_DATASET: z
    .string()
    .min(1, "NEXT_PUBLIC_SANITY_DATASET is required"),
  SANITY_API_READ_TOKEN: z
    .string()
    .min(1, "SANITY_API_READ_TOKEN is required"),

  // Resend Configuration (Optional)
  DISABLE_RESEND: z
    .string()
    .default("false")
    .transform((val) => val === "true"),
  RESEND_API_KEY: z.string().optional(),
  RESEND_AUDIENCE_ID: z.string().optional(),
});

// Parse and validate environment variables
const parseEnv = () => {
  try {
    return envSchema.parse({
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
      NEXT_PUBLIC_SITE_ENV: process.env.NEXT_PUBLIC_SITE_ENV,
      NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
      NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
      SANITY_API_READ_TOKEN: process.env.SANITY_API_READ_TOKEN,
      DISABLE_RESEND: process.env.DISABLE_RESEND,
      RESEND_API_KEY: process.env.RESEND_API_KEY,
      RESEND_AUDIENCE_ID: process.env.RESEND_AUDIENCE_ID,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("❌ Environment variable validation failed:");
      error.issues.forEach((issue) => {
        console.error(`  - ${issue.path.join(".")}: ${issue.message}`);
      });
      throw new Error("Invalid environment variables. Please check your .env.local file.");
    }
    throw error;
  }
};

// Export validated and typed environment variables
export const env = parseEnv();

// Type-safe helper to check if running in production
export const isProduction = env.NEXT_PUBLIC_SITE_ENV === "production";

// Type for the environment config (useful for testing/mocking)
export type Env = z.infer<typeof envSchema>;
