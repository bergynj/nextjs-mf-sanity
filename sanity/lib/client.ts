import { createClient } from "next-sanity";
import { env } from "@/lib/env";

import { apiVersion, dataset, projectId, useCdn } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  perspective: "published",
  stega: {
    studioUrl: env.NEXT_PUBLIC_SITE_URL + "/studio",
  },
});
