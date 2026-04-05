import { meilisearch, PRODUCTS_INDEX, type SearchableProduct } from "@/lib/search/meilisearch";
import { ProductCard } from "./product-card";

interface SimilarFragrancesProps {
  productId: string;
  family: string;
  accords: string[];
}

export async function SimilarFragrances({ productId, family, accords }: SimilarFragrancesProps) {
  let similar: SearchableProduct[] = [];

  try {
    // Search by accord keywords — Meilisearch ranks by relevance to the current product's character
    const accordQuery = accords.slice(0, 5).join(" ");
    const results = await meilisearch.index(PRODUCTS_INDEX).search<SearchableProduct>(accordQuery, {
      limit: 8,
    });

    similar = results.hits
      .filter((hit) => hit.id !== productId)
      .slice(0, 4);
  } catch {
    return null;
  }

  if (similar.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="font-display text-2xl font-bold text-text-primary mb-6">
        You Might Also Like
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {similar.map((hit) => (
          <ProductCard
            key={hit.id}
            product={{
              id: hit.id,
              handle: hit.handle,
              title: hit.title,
              thumbnail: hit.thumbnail,
              brand: hit.brand,
              family: hit.family,
              concentration: hit.concentration,
              topNote: hit.top_notes?.[0] || null,
              sillage: hit.sillage,
              longevity: hit.longevity,
              season: hit.season,
              variants: hit.price != null
                ? [{ prices: [{ amount: hit.price, currency_code: "usd" }] }]
                : [],
            }}
          />
        ))}
      </div>
    </section>
  );
}
