import { notFound } from "next/navigation";
import {
  meilisearch,
  PRODUCTS_INDEX,
  SearchableProduct,
} from "@/lib/search/meilisearch";
import { getCollectionBySlug, COLLECTIONS } from "@/lib/collections";
import { ProductCard } from "@/components/product/product-card";
import Link from "next/link";
import type { Metadata } from "next";

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
  };
}

export default async function CollectionPage({
  params,
}: CollectionPageProps) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) notFound();

  let hits: SearchableProduct[] = [];
  try {
    const results = await meilisearch
      .index(PRODUCTS_INDEX)
      .search<SearchableProduct>("", {
        filter: collection.searchFilter,
        limit: 50,
      });
    hits = results.hits;
  } catch {
    // Meilisearch may not be running; render empty state gracefully
  }

  const heroBg = FAMILY_BG[collection.familyColor] ?? "bg-surface-subtle";

  return (
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
            <p className="mb-4">No fragrances in this collection yet.</p>
            <Link href="/products" className="text-text-primary underline">
              Browse all fragrances
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hits.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
