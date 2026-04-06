import { SITE_URL } from "@/lib/constants";

interface ProductJsonLdProps {
  product: {
    title: string;
    description: string | null;
    handle: string;
    thumbnail: string | null;
    variants: Array<{
      id?: string;
      title?: string | null;
      prices: Array<{ amount: number; currency_code: string }>;
    }>;
    metadata?: Record<string, unknown> | null;
  };
  fragranceData?: {
    family: string;
    concentration: string;
    accords: string[];
    top_notes: string[];
    heart_notes: string[];
    base_notes: string[];
    gender: string;
    season: string[];
    longevity: number | null;
    sillage: number | null;
  } | null;
}

export function ProductJsonLd({ product, fragranceData }: ProductJsonLdProps) {
  const baseUrl = SITE_URL;
  const productUrl = `${baseUrl}/products/${product.handle}`;

  // Build offers for all variants (AggregateOffer when multiple)
  const allPrices = product.variants?.flatMap(
    (v) => v.prices?.map((p) => ({ amount: p.amount, currency: p.currency_code })) ?? []
  ) ?? [];
  const usdPrices = allPrices.filter((p) => p.currency === "usd");
  const prices = usdPrices.length > 0 ? usdPrices : allPrices;

  let offers: Record<string, unknown> | undefined;
  if (prices.length > 1) {
    const amounts = prices.map((p) => p.amount / 100);
    offers = {
      "@type": "AggregateOffer",
      lowPrice: Math.min(...amounts).toFixed(2),
      highPrice: Math.max(...amounts).toFixed(2),
      priceCurrency: (prices[0].currency).toUpperCase(),
      offerCount: product.variants.length,
      availability: "https://schema.org/InStock",
      url: productUrl,
    };
  } else if (prices.length === 1) {
    offers = {
      "@type": "Offer",
      price: (prices[0].amount / 100).toFixed(2),
      priceCurrency: prices[0].currency.toUpperCase(),
      availability: "https://schema.org/InStock",
      url: productUrl,
    };
  }

  // Fragrance-specific structured properties
  const additionalProperties: Record<string, unknown>[] = [];
  if (fragranceData) {
    additionalProperties.push(
      { "@type": "PropertyValue", name: "Fragrance Family", value: fragranceData.family },
      { "@type": "PropertyValue", name: "Concentration", value: fragranceData.concentration },
      { "@type": "PropertyValue", name: "Gender", value: fragranceData.gender },
    );
    if (fragranceData.top_notes.length > 0) {
      additionalProperties.push({
        "@type": "PropertyValue", name: "Top Notes", value: fragranceData.top_notes.join(", "),
      });
    }
    if (fragranceData.heart_notes.length > 0) {
      additionalProperties.push({
        "@type": "PropertyValue", name: "Heart Notes", value: fragranceData.heart_notes.join(", "),
      });
    }
    if (fragranceData.base_notes.length > 0) {
      additionalProperties.push({
        "@type": "PropertyValue", name: "Base Notes", value: fragranceData.base_notes.join(", "),
      });
    }
    if (fragranceData.accords.length > 0) {
      additionalProperties.push({
        "@type": "PropertyValue", name: "Accords", value: fragranceData.accords.join(", "),
      });
    }
    if (fragranceData.season.length > 0) {
      additionalProperties.push({
        "@type": "PropertyValue", name: "Best Seasons", value: fragranceData.season.join(", "),
      });
    }
    if (fragranceData.longevity != null) {
      additionalProperties.push({
        "@type": "PropertyValue", name: "Longevity", value: `${fragranceData.longevity}/5`,
      });
    }
    if (fragranceData.sillage != null) {
      additionalProperties.push({
        "@type": "PropertyValue", name: "Sillage", value: `${fragranceData.sillage}/5`,
      });
    }
  }

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": productUrl,
    name: product.title,
    description: product.description,
    image: product.thumbnail,
    url: productUrl,
    brand: product.metadata?.brand
      ? { "@type": "Brand", name: product.metadata.brand as string }
      : undefined,
    category: fragranceData
      ? `Fragrances > ${fragranceData.family}`
      : "Fragrances",
    offers,
    ...(additionalProperties.length > 0 && {
      additionalProperty: additionalProperties,
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
