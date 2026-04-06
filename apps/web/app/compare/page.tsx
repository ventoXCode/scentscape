import type { Metadata } from "next";
import { meilisearch, PRODUCTS_INDEX, type SearchableProduct } from "@/lib/search/meilisearch";
import { ComparePageClient } from "@/components/comparison/compare-page-client";

export const metadata: Metadata = {
  title: "Compare Fragrances | ScentScape",
  description:
    "Compare fragrances side by side — notes, accords, performance, price, and more. Find the perfect scent for you.",
};

interface ComparePageProps {
  searchParams: Promise<{ products?: string }>;
}

async function getProductsByHandles(handles: string[]): Promise<SearchableProduct[]> {
  if (handles.length === 0) return [];
  try {
    const index = meilisearch.index(PRODUCTS_INDEX);
    const results = await Promise.all(
      handles.map(async (handle) => {
        const res = await index.search<SearchableProduct>(handle, { limit: 5 });
        const match = res.hits.find((h) => h.handle === handle);
        return match ?? null;
      })
    );
    return results.filter((p): p is SearchableProduct => p !== null);
  } catch {
    return [];
  }
}

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const { products: productsParam } = await searchParams;
  const handles = productsParam
    ? productsParam.split(",").filter(Boolean).slice(0, 4)
    : [];

  const products = await getProductsByHandles(handles);

  return <ComparePageClient serverProducts={products} />;
}
