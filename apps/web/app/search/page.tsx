import { meilisearch, PRODUCTS_INDEX, SearchableProduct } from "@/lib/search/meilisearch";
import { ProductCard } from "@/components/product/product-card";
import { SearchFacets } from "@/components/search/search-facets";
import { FilterLayout } from "@/components/filters/filter-layout";
import { SortSelect } from "@/components/filters/sort-select";
import { Suspense } from "react";

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
    family?: string;
    concentration?: string;
    gender?: string;
    accords?: string;
    season?: string;
    sort?: string;
  }>;
}

async function SearchResults({ searchParams }: { searchParams: Awaited<SearchPageProps["searchParams"]> }) {
  const query = searchParams.q || "";

  const filters: string[] = [];
  if (searchParams.family) filters.push(`family = "${searchParams.family}"`);
  if (searchParams.concentration) filters.push(`concentration = "${searchParams.concentration}"`);
  if (searchParams.gender) filters.push(`gender = "${searchParams.gender}"`);
  if (searchParams.accords) filters.push(`accords = "${searchParams.accords}"`);
  if (searchParams.season) filters.push(`season = "${searchParams.season}"`);

  let results;
  try {
    const sort = searchParams.sort ? [searchParams.sort] : undefined;
    results = await meilisearch.index(PRODUCTS_INDEX).search<SearchableProduct>(query, {
      filter: filters.length ? filters.join(" AND ") : undefined,
      sort,
      facets: ["family", "concentration", "gender", "accords", "season"],
      limit: 50,
    });
  } catch {
    return (
      <div className="text-center py-16 text-text-muted">
        Search is not available right now. Please try again later.
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <FilterLayout>
        <Suspense>
          <SearchFacets
            facetDistribution={results.facetDistribution as Record<string, Record<string, number>> | undefined}
            currentFilters={searchParams}
          />
        </Suspense>
      </FilterLayout>

      <main className="flex-1">
        {results.hits.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-text-muted mb-6">
              No fragrances found{query ? ` for "${query}"` : ""}. Try adjusting your filters.
            </p>
            <div className="max-w-md mx-auto space-y-4">
              <p className="text-text-secondary text-sm">Not sure what to search for? Try these:</p>
              <div className="flex flex-wrap justify-center gap-2">
                <a href="/quiz" className="px-4 py-2 text-sm rounded-lg bg-accent-primary/10 text-accent-primary hover:bg-accent-primary/20 transition-colors font-medium">
                  Take the Scent Quiz
                </a>
                <a href="/moods" className="px-4 py-2 text-sm rounded-lg bg-surface-subtle border border-border-default text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors">
                  Browse by Mood
                </a>
                <a href="/learn/fragrance-101" className="px-4 py-2 text-sm rounded-lg bg-surface-subtle border border-border-default text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors">
                  Fragrance 101
                </a>
                <a href="/learn/families" className="px-4 py-2 text-sm rounded-lg bg-surface-subtle border border-border-default text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors">
                  Explore Families
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.hits.map((hit, i) => (
              <ProductCard
                key={hit.id}
                priority={i < 6}
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
        )}
      </main>
    </div>
  );
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || "";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold font-display">
          {query ? `Results for "${query}"` : "All Fragrances"}
        </h1>
        <Suspense>
          <SortSelect basePath="/search" currentSort={params.sort} />
        </Suspense>
      </div>

      <Suspense fallback={<div className="animate-pulse h-4 w-32 bg-surface-subtle rounded mb-8" />}>
        <SearchResults searchParams={params} />
      </Suspense>
    </div>
  );
}
