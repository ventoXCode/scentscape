import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  meilisearch,
  PRODUCTS_INDEX,
  type SearchableProduct,
} from "@/lib/search/meilisearch";
import { getMoodBySlug, MOODS } from "@/lib/discovery/moods";
import { ProductCard } from "@/components/product/product-card";
import { SwipeableProductCard } from "@/components/product/swipeable-product-card";
import { PullToRefresh } from "@/components/ui/pull-to-refresh";

export const revalidate = 300;

interface MoodPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return MOODS.map((mood) => ({ slug: mood.slug }));
}

export async function generateMetadata({
  params,
}: MoodPageProps): Promise<Metadata> {
  const { slug } = await params;
  const mood = getMoodBySlug(slug);
  if (!mood) return {};
  return {
    title: `${mood.title} Fragrances | ScentScape`,
    description: mood.description,
    openGraph: {
      title: `${mood.title} Fragrances | ScentScape`,
      description: mood.description,
    },
  };
}

export default async function MoodPage({ params }: MoodPageProps) {
  const { slug } = await params;
  const mood = getMoodBySlug(slug);

  if (!mood) notFound();

  let hits: SearchableProduct[] = [];
  try {
    const results = await meilisearch
      .index(PRODUCTS_INDEX)
      .search<SearchableProduct>("", {
        filter: mood.searchFilter || undefined,
        sort: mood.sortBy ? [mood.sortBy] : undefined,
        limit: 50,
      });
    hits = results.hits;
  } catch {
    // Meilisearch may not be running
  }

  return (
    <PullToRefresh>
    <div>
      {/* Hero */}
      <div className={`bg-gradient-to-br ${mood.gradient} py-16`}>
        <div className="container mx-auto px-4">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-text-muted">
              <li>
                <Link
                  href="/"
                  className="hover:text-text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href="/moods"
                  className="hover:text-text-primary transition-colors"
                >
                  Moods
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-text-secondary">{mood.title}</li>
            </ol>
          </nav>

          <div className="max-w-2xl">
            <span className="text-4xl mb-4 block" aria-hidden="true">
              {mood.emoji}
            </span>
            <h1 className="font-display text-4xl font-bold mb-2 text-text-primary">
              {mood.title}
            </h1>
            <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-4">
              {mood.tagline}
            </p>
            <p className="text-text-secondary leading-relaxed text-lg">
              {mood.editorial}
            </p>
            {hits.length > 0 && (
              <p className="text-sm text-text-muted mt-4">
                {hits.length} fragrance{hits.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="container mx-auto px-4 py-12">
        {hits.length === 0 ? (
          <div className="text-center py-16 text-text-muted">
            <p className="mb-4">
              No fragrances matched this mood. Try exploring other moods.
            </p>
            <Link href="/moods" className="text-text-primary underline">
              Browse all moods
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hits.map((hit, i) => (
              <SwipeableProductCard
                key={hit.id}
                product={{
                  id: hit.id,
                  handle: hit.handle,
                  title: hit.title,
                  thumbnail: hit.thumbnail,
                  brand: hit.brand,
                  family: hit.family,
                  description: hit.description,
                  concentration: hit.concentration,
                  longevity: hit.longevity,
                  sillage: hit.sillage,
                  price: hit.price,
                }}
              >
                <ProductCard
                  priority={i < 4}
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
                    variants:
                      hit.price != null
                        ? [
                            {
                              prices: [
                                { amount: hit.price, currency_code: "usd" },
                              ],
                            },
                          ]
                        : [],
                  }}
                />
              </SwipeableProductCard>
            ))}
          </div>
        )}
      </div>
    </div>
    </PullToRefresh>
  );
}
