import {
  meilisearch,
  PRODUCTS_INDEX,
  type SearchableProduct,
} from "@/lib/search/meilisearch";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils/format";

function getDayIndex(totalProducts: number): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor(
    (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );
  return dayOfYear % totalProducts;
}

export async function FragranceOfTheDay() {
  let product: SearchableProduct | null = null;

  try {
    const results = await meilisearch
      .index(PRODUCTS_INDEX)
      .search<SearchableProduct>("", { limit: 100 });

    if (!results.hits.length) return null;

    product = results.hits[getDayIndex(results.hits.length)];
  } catch {
    return null;
  }

  if (!product) return null;

  const price = product.price;
  const topNotes = product.top_notes?.slice(0, 3).join(", ");

  return (
    <section className="py-section bg-surface-primary">
      <div className="container mx-auto px-4 max-w-5xl">
        <p className="text-accent-primary font-medium text-sm uppercase tracking-wide text-center mb-2">
          Daily Discovery
        </p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary text-center mb-10">
          Fragrance of the Day
        </h2>

        <Link
          href={`/products/${product.handle}`}
          className="group block border border-border-default rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-200 md:flex"
        >
          <div className="md:w-1/2 aspect-square md:aspect-auto relative bg-surface-subtle overflow-hidden">
            {product.thumbnail ? (
              <Image
                src={product.thumbnail}
                alt={product.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="w-full h-full min-h-64 flex items-center justify-center text-text-muted text-6xl">
                &#128268;
              </div>
            )}
          </div>

          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            {product.brand && (
              <p className="text-xs text-text-muted uppercase tracking-wider mb-2">
                {product.brand}
              </p>
            )}
            <h3 className="font-display text-2xl md:text-3xl font-bold text-text-primary mb-3">
              {product.title}
            </h3>

            <div className="flex flex-wrap gap-2 mb-4">
              {product.family && (
                <span className="px-3 py-1 bg-surface-subtle rounded-full text-sm text-text-secondary">
                  {product.family}
                </span>
              )}
              {product.concentration && (
                <span className="px-3 py-1 bg-surface-subtle rounded-full text-sm text-text-secondary">
                  {product.concentration}
                </span>
              )}
            </div>

            {topNotes && (
              <p className="text-text-secondary mb-4">
                Opens with {topNotes}
              </p>
            )}

            {product.description && (
              <p className="text-text-muted text-sm leading-relaxed mb-6 line-clamp-3">
                {product.description}
              </p>
            )}

            <div className="flex items-center justify-between">
              {price != null && (
                <span className="text-lg font-semibold text-text-primary">
                  From {formatPrice(price)}
                </span>
              )}
              <span className="text-accent-primary font-medium group-hover:underline">
                Explore &rarr;
              </span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
