import { COLLECTIONS } from "@/lib/collections";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collections | ScentScape",
  description: "Browse our curated fragrance collections by mood, occasion, and season.",
};

// Color accents per collection slug mapped to fragrance family tokens
const COLLECTION_COLORS: Record<string, string> = {
  "date-night": "bg-family-floral-subtle border-family-floral/20 hover:border-family-floral/40",
  "office-safe": "bg-surface-subtle border-border-default hover:border-border-strong",
  "summer-fresh": "bg-family-fresh-subtle border-family-fresh/20 hover:border-family-fresh/40",
  "cozy-winter": "bg-family-amber-subtle border-family-amber/20 hover:border-family-amber/40",
  woody: "bg-family-woody-subtle border-family-woody/20 hover:border-family-woody/40",
  floral: "bg-family-floral-subtle border-family-floral/20 hover:border-family-floral/40",
};

const DEFAULT_COLOR = "bg-surface-subtle border-border-default hover:border-border-strong";

export default function CollectionsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="font-display text-3xl font-bold mb-4 text-text-primary">Collections</h1>
        <p className="text-text-secondary max-w-xl mx-auto">
          Explore fragrances curated by mood, occasion, and season — find the perfect scent
          for every moment.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {COLLECTIONS.map((collection) => {
          const colorClass = COLLECTION_COLORS[collection.slug] ?? DEFAULT_COLOR;
          return (
            <Link
              key={collection.slug}
              href={`/collections/${collection.slug}`}
              className={`group block rounded-xl border-2 p-8 shadow-card hover:shadow-card-hover transition-all duration-200 ${colorClass}`}
            >
              <h2 className="font-display text-xl font-semibold mb-2 text-text-primary group-hover:underline">
                {collection.title}
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                {collection.description}
              </p>
              <span className="inline-block mt-4 text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors">
                Explore &rarr;
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
