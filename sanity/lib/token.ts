import "server-only";
import { env } from "@/lib/env";

export const token = env.SANITY_API_READ_TOKEN;
