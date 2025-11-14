import { Header, Footer, DisableDraftMode } from "@schema-ui/layout";
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";
import { SanityLive } from "@schema-ui/sanity";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <SanityLive />
      {(await draftMode()).isEnabled && (
        <>
          <DisableDraftMode />
          <VisualEditing />
        </>
      )}
      <Footer />
    </>
  );
}
