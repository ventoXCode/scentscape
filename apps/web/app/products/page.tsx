import type { Metadata } from "next";
import { medusa } from "@/lib/medusa/client";
import { meilisearch, PRODUCTS_INDEX, type SearchableProduct } from "@/lib/search/meilisearch";
import { ProductCard } from "@/components/product/product-card";
import { SwipeableProductCard } from "@/components/product/swipeable-product-card";
import { ProductFilters } from "@/components/filters/product-filters";
import { FilterLayout } from "@/components/filters/filter-layout";
import { SortSelect } from "@/components/filters/sort-select";
import { PullToRefresh } from "@/components/ui/pull-to-refresh";
import { ItemListJsonLd } from "@/components/seo/itemlist-jsonld";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Browse All Fragrances | ScentScape",
  description:
    "Explore our curated collection of 100+ fragrances. Filter by scent family, concentration, and price. Find your perfect fragrance match.",
  openGraph: {
    title: "Browse All Fragrances | ScentScape",
    description:
      "Explore our curated collection of 100+ fragrances. Filter by scent family, concentration, and price.",
  },
};

export const revalidate = 300;

const PAGE_SIZE = 24;

interface ProductsPageProps {
  searchParams: Promise<{
    family?: string;
    concentration?: string;
    price?: string;
    sort?: string;
    page?: string;
  }>;
}

function buildMeilisearchFilter(params: {
  family?: string;
  concentration?: string;
  price?: string;
}): string[] {
  const filters: string[] = [];
  if (params.family) filters.push(`family = "${params.family}"`);
  if (params.concentration) filters.push(`concentration = "${params.concentration}"`);
  if (params.price) {
    switch (params.price) {
      case "under-100": filters.push("price < 10000"); break;
      case "100-200": filters.push("price >= 10000 AND price <= 20000"); break;
      case "200-400": filters.push("price >= 20000 AND price <= 40000"); break;
      case "over-400": filters.push("price > 40000"); break;
    }
  }
  return filters;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page || "1", 10) || 1);
  const hasFilters = params.family || params.concentration || params.price;

  let products: any[] = [];
  let totalProducts = 0;
  let facetDistribution: Record<string, Record<string, number>> | undefined;
  let error = false;

  try {
    // Always prefer Meilisearch — gives us enriched fragrance data and facet counts
    const filters = buildMeilisearchFilter(params);
    const sort = params.sort ? [params.sort] : undefined;
    const results = await meilisearch.index(PRODUCTS_INDEX).search<SearchableProduct>("", {
      filter: filters.length ? filters : undefined,
      sort,
      limit: PAGE_SIZE,
      offset: (currentPage - 1) * PAGE_SIZE,
      facets: ["family", "concentration"],
    });
    products = results.hits.map((hit) => ({
      id: hit.id,
      handle: hit.handle,
      title: hit.title,
      thumbnail: hit.thumbnail,
      brand: hit.brand,
      family: hit.family,
      concentration: hit.concentration,
      description: hit.description,
      topNote: hit.top_notes?.[0] || null,
      sillage: hit.sillage,
      longevity: hit.longevity,
      season: hit.season,
      price: hit.price,
      metadata: { brand: hit.brand },
      variants: hit.price != null ? [{ prices: [{ amount: hit.price, currency_code: "usd" }] }] : [],
    }));
    totalProducts = results.estimatedTotalHits ?? results.hits.length;
    facetDistribution = results.facetDistribution;
  } catch {
    // Meilisearch unavailable — fall back to Medusa
    try {
      const result = await medusa.store.product.list({
        limit: PAGE_SIZE,
        offset: (currentPage - 1) * PAGE_SIZE,
      });
      products = result.products || [];
      totalProducts = result.count ?? products.length;
    } catch {
      error = true;
    }
  }

  const totalPages = Math.max(1, Math.ceil(totalProducts / PAGE_SIZE));

  function pageUrl(page: number) {
    const p = new URLSearchParams();
    if (params.family) p.set("family", params.family);
    if (params.concentration) p.set("concentration", params.concentration);
    if (params.price) p.set("price", params.price);
    if (params.sort) p.set("sort", params.sort);
    if (page > 1) p.set("page", String(page));
    const qs = p.toString();
    return `/products${qs ? `?${qs}` : ""}`;
  }

  return (
    <PullToRefresh>
    {!error && products.length > 0 && (
      <ItemListJsonLd
        name="All Fragrances"
        description="Browse our curated collection of 100+ fragrances."
        url="/products"
        items={products.map((p, i) => ({
          name: p.title,
          url: `/products/${p.handle}`,
          image: p.thumbnail ?? undefined,
          position: (currentPage - 1) * PAGE_SIZE + i + 1,
        }))}
      />
    )}
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold text-text-primary">All Fragrances</h1>
        <Suspense>
          <SortSelect basePath="/products" currentSort={params.sort} />
        </Suspense>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <FilterLayout>
          <ProductFilters currentFilters={params} facets={facetDistribution} />
        </FilterLayout>

        <main className="flex-1">
          {error ? (
            <div className="text-center py-16">
              <p className="text-text-secondary mb-4">
                Something went wrong loading fragrances. Please try again later.
              </p>
              <Link href="/products" className="text-text-primary underline">
                Reload
              </Link>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-3xl mb-3" aria-hidden="true">🔍</p>
              <p className="text-text-secondary mb-2 font-medium">
                {hasFilters
                  ? "No fragrances match your filters."
                  : "No fragrances available right now."}
              </p>
              <p className="text-text-muted text-sm mb-6">
                {hasFilters
                  ? "Try adjusting your filters or explore another way."
                  : "Check back soon — or discover your perfect scent another way."}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {hasFilters && (
                  <Link href="/products" className="px-5 py-2.5 bg-text-primary text-text-inverse rounded-lg text-sm font-medium hover:bg-text-secondary transition-colors">
                    Clear filters
                  </Link>
                )}
                <Link href="/quiz" className="px-5 py-2.5 bg-accent-primary text-text-inverse rounded-lg text-sm font-medium hover:bg-accent-primary-hover transition-colors">
                  Take the Quiz
                </Link>
                <Link href="/moods" className="text-sm text-text-secondary hover:text-text-primary transition-colors underline">
                  Browse by Mood
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product, i) => (
                  <SwipeableProductCard
                    key={product.id}
                    product={{
                      id: product.id,
                      handle: product.handle || "",
                      title: product.title,
                      thumbnail: product.thumbnail ?? null,
                      brand: product.brand ?? null,
                      family: product.family ?? null,
                      description: product.description ?? null,
                      concentration: product.concentration ?? null,
                      longevity: product.longevity ?? null,
                      sillage: product.sillage ?? null,
                      price: product.price ?? null,
                    }}
                  >
                    <ProductCard product={product} priority={i < 6} />
                  </SwipeableProductCard>
                ))}
              </div>

              {totalPages > 1 && (
                <nav aria-label="Product listing pagination" className="flex justify-center items-center gap-2 mt-12">
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
        </main>
      </div>
    </div>
    </PullToRefresh>
  );
}
