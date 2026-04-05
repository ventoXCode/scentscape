import { COLLECTIONS } from "@/lib/collections";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collections | ScentScape",
  description: "Browse our curated fragrance collections by mood, occasion, and season.",
};

// Color accents per collection slug for visual variety
const COLLECTION_COLORS: Record<string, string> = {
  "date-night": "bg-rose-50 border-rose-200 hover:border-rose-400",
  "office-safe": "bg-slate-50 border-slate-200 hover:border-slate-400",
  "summer-fresh": "bg-cyan-50 border-cyan-200 hover:border-cyan-400",
  "cozy-winter": "bg-amber-50 border-amber-200 hover:border-amber-400",
  woody: "bg-stone-50 border-stone-200 hover:border-stone-400",
  floral: "bg-pink-50 border-pink-200 hover:border-pink-400",
};

const DEFAULT_COLOR = "bg-gray-50 border-gray-200 hover:border-gray-400";

export default function CollectionsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Collections</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
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
              className={`group block rounded-xl border-2 p-8 transition-all ${colorClass}`}
            >
              <h2 className="text-xl font-semibold mb-2 group-hover:underline">
                {collection.title}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                {collection.description}
              </p>
              <span className="inline-block mt-4 text-sm font-medium text-gray-800 group-hover:text-black">
                Explore &rarr;
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
