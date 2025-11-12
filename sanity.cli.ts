/**
 * This configuration file lets you run `$ sanity [command]` in this folder
 * Go to https://www.sanity.io/docs/cli to learn more.
 **/
import { defineCliConfig } from "sanity/cli";
import { env } from "@/lib/env";

export default defineCliConfig({ 
  api: { 
    projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID, 
    dataset: env.NEXT_PUBLIC_SANITY_DATASET 
  } 
});
