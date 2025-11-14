import { BlockRenderer } from "@schema-ui/blocks";
import { fetchSanityPageBySlug } from "@schema-ui/sanity";
import { generatePageMetadata } from "@schema-ui/sanity";
import { MissingSanityPage } from "@schema-ui/ui";

export async function generateMetadata() {
  const page = await fetchSanityPageBySlug({ slug: "index" });

  return generatePageMetadata({ page, slug: "index" });
}

export default async function IndexPage() {
  const page = await fetchSanityPageBySlug({ slug: "index" });

  if (!page) {
    return <MissingSanityPage document="page" slug="index" />;
  }

  return <BlockRenderer blocks={page?.blocks ?? []} />;
}
