import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BottomNav } from "@/components/layout/bottom-nav";
import { getCustomer } from "@/lib/medusa/auth-actions";

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
