import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BottomNav } from "@/components/layout/bottom-nav";
import { getCustomer } from "@/lib/medusa/auth-actions";
import { SITE_URL } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "ScentScape - Discover Your Signature Fragrance",
  description: "Multi-brand fragrance discovery platform",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const customer = await getCustomer();

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "ScentScape",
              url: SITE_URL,
              description: "Discover your signature fragrance through personality-based matching",
              potentialAction: {
                "@type": "SearchAction",
                target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/search?q={search_term_string}` },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-body`}>
        <Providers>
          <Header customer={customer} />
          <main className="pb-16 md:pb-0">{children}</main>
          <Footer />
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}
