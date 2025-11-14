import { Header, Footer } from "@schema-ui/layout";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center">
        <div className="container text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl">Page not found</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
