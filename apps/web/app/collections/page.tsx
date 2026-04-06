import { COLLECTIONS } from "@/lib/collections";
import { ItemListJsonLd } from "@/components/seo/itemlist-jsonld";
import Link from "next/link";
import type { Metadata } from "next";
import { FAMILIES, type FamilySlug } from "@/lib/fragrance/family-config";

export const metadata: Metadata = {
  title: "Collections | ScentScape",
  description:
    "Browse our curated fragrance collections by mood, occasion, and season.",
  openGraph: {
    title: "Fragrance Collections | ScentScape",
    description:
      "Browse our curated fragrance collections by mood, occasion, and season.",
  },
};

const DEFAULT_STYLE = {
  card: "bg-surface-subtle border-border-default hover:border-border-strong",
  iconBg: "bg-surface-subtle",
  pattern: "",
};

export default function CollectionsPage() {
  return (
    <>
    <ItemListJsonLd
      name="Fragrance Collections"
      description="Curated fragrance collections by mood, occasion, and season."
      url="/collections"
      items={COLLECTIONS.map((c) => ({
        name: c.title,
        url: `/collections/${c.slug}`,
      }))}
    />
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="font-display text-3xl font-bold mb-4 text-text-primary">
          Collections
        </h1>
        <p className="text-text-secondary max-w-xl mx-auto">
          Explore fragrances curated by mood, occasion, and season &mdash; find
          the perfect scent for every moment.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {COLLECTIONS.map((collection) => {
          const family = FAMILIES[collection.familyColor as FamilySlug];
          const style = family
            ? { card: family.card, iconBg: family.cardIconBg, pattern: family.pattern }
            : DEFAULT_STYLE;
          return (
            <Link
              key={collection.slug}
              href={`/collections/${collection.slug}`}
              className={`group block rounded-xl border-2 p-8 shadow-card hover:shadow-card-hover transition-all duration-200 ${style.card} ${style.pattern}`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 ${style.iconBg}`}
                aria-hidden="true"
              >
                {collection.icon}
              </div>
              <h2 className="font-display text-xl font-semibold mb-1 text-text-primary group-hover:underline">
                {collection.title}
              </h2>
              <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-3">
                {collection.tagline}
              </p>
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
    </>
  );
}
