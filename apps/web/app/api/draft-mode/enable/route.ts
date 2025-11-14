import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client } from "@schema-ui/sanity";
import { token } from "@schema-ui/sanity";

export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token }),
});
