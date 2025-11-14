import { BlockRenderer } from "@schema-ui/blocks";
import {
  fetchSanityPageBySlug,
  fetchSanityPagesStaticParams,
} from "@schema-ui/sanity";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@schema-ui/sanity";

export async function generateStaticParams() {
  const pages = await fetchSanityPagesStaticParams();

  return pages.map((page) => ({
    slug: page.slug?.current,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = await fetchSanityPageBySlug({ slug: params.slug });

  if (!page) {
    notFound();
  }

  return generatePageMetadata({ page, slug: params.slug });
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = await fetchSanityPageBySlug({ slug: params.slug });

  if (!page) {
    notFound();
  }

  return <BlockRenderer blocks={page?.blocks ?? []} />;
}
