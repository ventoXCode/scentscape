import { notFound } from "next/navigation";
import {
  meilisearch,
  PRODUCTS_INDEX,
  SearchableProduct,
} from "@/lib/search/meilisearch";
import { getCollectionBySlug, COLLECTIONS } from "@/lib/collections";
import { ProductCard } from "@/components/product/product-card";
import { SwipeableProductCard } from "@/components/product/swipeable-product-card";
import { PullToRefresh } from "@/components/ui/pull-to-refresh";
import Link from "next/link";
import type { Metadata } from "next";

const PAGE_SIZE = 24;

const FAMILY_BG: Record<string, string> = {
  fresh: "bg-family-fresh-subtle",
  floral: "bg-family-floral-subtle",
  amber: "bg-family-amber-subtle",
  woody: "bg-family-woody-subtle",
  citrus: "bg-family-citrus-subtle",
  aromatic: "bg-family-aromatic-subtle",
};

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateStaticParams() {
  return COLLECTIONS.map((collection) => ({
    slug: collection.slug,
  }));
}

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) return {};
  return {
    title: `${collection.title} | ScentScape`,
    description: collection.description,
    openGraph: {
      title: `${collection.title} | ScentScape`,
      description: collection.description,
    },
  };
}

export default async function CollectionPage({
  params,
  searchParams,
}: CollectionPageProps) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const collection = getCollectionBySlug(slug);

  if (!collection) notFound();

  const currentPage = Math.max(1, parseInt(pageParam || "1", 10) || 1);
  const offset = (currentPage - 1) * PAGE_SIZE;

  let hits: SearchableProduct[] = [];
  let totalHits = 0;
  try {
    const results = await meilisearch
      .index(PRODUCTS_INDEX)
      .search<SearchableProduct>("", {
        filter: collection.searchFilter,
        sort: collection.searchSort,
        limit: PAGE_SIZE,
        offset,
      });
    hits = results.hits;
    totalHits = results.estimatedTotalHits ?? results.hits.length;
  } catch {
    // Meilisearch may not be running
  }

  const totalPages = Math.ceil(totalHits / PAGE_SIZE);
  const heroBg = FAMILY_BG[collection.familyColor] ?? "bg-surface-subtle";

  function pageUrl(page: number) {
    return page === 1
      ? `/collections/${slug}`
      : `/collections/${slug}?page=${page}`;
  }

  return (
    <PullToRefresh>
    <div>
      {/* Hero section */}
      <div className={`${heroBg} py-16`}>
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
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
                  href="/collections"
                  className="hover:text-text-primary transition-colors"
                >
                  Collections
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-text-secondary">{collection.title}</li>
            </ol>
          </nav>

          <div className="max-w-2xl">
            <span className="text-4xl mb-4 block" aria-hidden="true">
              {collection.icon}
            </span>
            <h1 className="font-display text-4xl font-bold mb-2 text-text-primary">
              {collection.title}
            </h1>
            <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-4">
              {collection.tagline}
            </p>
            <p className="text-text-secondary leading-relaxed text-lg">
              {collection.editorial}
            </p>
            {totalHits > 0 && (
              <p className="text-sm text-text-muted mt-4">
                {totalHits} fragrance{totalHits !== 1 ? "s" : ""}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="container mx-auto px-4 py-12">
        {hits.length === 0 ? (
          <div className="text-center py-16 text-text-muted">
            <p className="mb-4">No fragrances in this collection yet.</p>
            <Link href="/products" className="text-text-primary underline">
              Browse all fragrances
            </Link>
          </div>
        ) : (
          <>
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
                      variants: hit.price != null
                        ? [{ prices: [{ amount: hit.price, currency_code: "usd" }] }]
                        : [],
                    }}
                  />
                </SwipeableProductCard>
              ))}
            </div>

            {totalPages > 1 && (
              <nav
                aria-label="Collection pagination"
                className="flex justify-center items-center gap-2 mt-12"
              >
                {currentPage > 1 && (
                  <Link
                    href={pageUrl(currentPage - 1)}
                    className="px-4 py-2 border border-border-default rounded-lg hover:bg-surface-subtle transition-colors text-text-secondary"
                  >
                    Previous
                  </Link>
                )}
                <span className="text-sm text-text-secondary px-4">
                  Page {currentPage} of {totalPages}
                </span>
                {currentPage < totalPages && (
                  <Link
                    href={pageUrl(currentPage + 1)}
                    className="px-4 py-2 border border-border-default rounded-lg hover:bg-surface-subtle transition-colors text-text-secondary"
                  >
                    Next
                  </Link>
                )}
              </nav>
            )}
          </>
        )}
      </div>
    </div>
    </PullToRefresh>
  );
}
