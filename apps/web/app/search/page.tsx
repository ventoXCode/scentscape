import { meilisearch, PRODUCTS_INDEX, SearchableProduct } from "@/lib/search/meilisearch";
import { ProductCard } from "@/components/product/product-card";
import { SearchFacets } from "@/components/search/search-facets";
import { Suspense } from "react";

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
    family?: string;
    concentration?: string;
    gender?: string;
    accords?: string;
    season?: string;
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
    results = await meilisearch.index(PRODUCTS_INDEX).search<SearchableProduct>(query, {
      filter: filters.length ? filters.join(" AND ") : undefined,
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
    <div className="flex gap-8">
      <aside className="w-64 flex-shrink-0">
        <Suspense>
          <SearchFacets
            facetDistribution={results.facetDistribution as any}
            currentFilters={searchParams}
          />
        </Suspense>
      </aside>

      <main className="flex-1">
        {results.hits.length === 0 ? (
          <div className="text-center py-16 text-text-muted">
            No fragrances found{query ? ` for "${query}"` : ""}. Try adjusting your filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.hits.map((product) => (
              <ProductCard key={product.id} product={product as any} />
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
      <h1 className="text-2xl font-bold font-display mb-2">
        {query ? `Results for "${query}"` : "All Fragrances"}
      </h1>

      <Suspense fallback={<div className="animate-pulse h-4 w-32 bg-surface-subtle rounded mb-8" />}>
        <SearchResults searchParams={params} />
      </Suspense>
    </div>
  );
}
