import { notFound } from "next/navigation";
import { meilisearch, PRODUCTS_INDEX, SearchableProduct } from "@/lib/search/meilisearch";
import { getCollectionBySlug, COLLECTIONS } from "@/lib/collections";
import { ProductCard } from "@/components/product/product-card";
import Link from "next/link";
import type { Metadata } from "next";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return COLLECTIONS.map((collection) => ({
    slug: collection.slug,
  }));
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) return {};
  return {
    title: `${collection.title} | ScentScape`,
    description: collection.description,
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) notFound();

  let hits: SearchableProduct[] = [];
  try {
    const results = await meilisearch.index(PRODUCTS_INDEX).search<SearchableProduct>("", {
      filter: collection.searchFilter,
      limit: 50,
    });
    hits = results.hits;
  } catch {
    // Meilisearch may not be running yet; render empty state gracefully
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-text-muted mb-6">
        <Link href="/collections" className="hover:text-text-primary transition-colors">
          Collections
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text-primary">{collection.title}</span>
      </nav>

      <div className="text-center mb-12">
        <h1 className="font-display text-3xl font-bold mb-4 text-text-primary">{collection.title}</h1>
        <p className="text-text-secondary max-w-2xl mx-auto">{collection.description}</p>
        {hits.length > 0 && (
          <p className="text-sm text-text-muted mt-2">{hits.length} fragrances</p>
        )}
      </div>

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
  );
}
