interface ProductJsonLdProps {
  product: {
    title: string;
    description: string | null;
    handle: string;
    thumbnail: string | null;
    variants: Array<{
      prices: Array<{ amount: number; currency_code: string }>;
    }>;
    metadata?: Record<string, unknown> | null;
  };
}

import { SITE_URL } from "@/lib/constants";

export function ProductJsonLd({ product }: ProductJsonLdProps) {
  const price = product.variants?.[0]?.prices?.[0];
  const baseUrl = SITE_URL;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.thumbnail,
    url: `${baseUrl}/products/${product.handle}`,
    brand: product.metadata?.brand
      ? { "@type": "Brand", name: product.metadata.brand as string }
      : undefined,
    offers: price
      ? {
          "@type": "Offer",
          price: (price.amount / 100).toFixed(2),
          priceCurrency: price.currency_code.toUpperCase(),
          availability: "https://schema.org/InStock",
          url: `${baseUrl}/products/${product.handle}`,
        }
      : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
