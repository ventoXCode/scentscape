import Link from "next/link";
import { COLLECTIONS, type Collection } from "@/lib/collections";
import { FAMILIES, type FamilySlug } from "@/lib/fragrance/family-config";

// Curated selection: show editorially interesting collections, not all of them
const HIGHLIGHT_SLUGS = [
  "date-night",
  "best-for-beginners",
  "long-lasting-legends",
  "under-150",
  "woody",
  "floral",
];

function getHighlightedCollections(): Collection[] {
  return HIGHLIGHT_SLUGS.map((slug) =>
    COLLECTIONS.find((c) => c.slug === slug)
  ).filter((c): c is Collection => c != null);
}

export function CollectionHighlights() {
  const collections = getHighlightedCollections();

  return (
    <section className="py-section bg-surface-primary">
      <div className="container mx-auto px-4 max-w-5xl">
        <p className="text-accent-primary font-medium text-sm uppercase tracking-wide text-center mb-2">
          Curated for You
        </p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary text-center mb-4">
          Explore Collections
        </h2>
        <p className="text-text-secondary text-center mb-10 max-w-2xl mx-auto">
          Whether you&apos;re a beginner or a connoisseur, there&apos;s a
          collection that speaks to you.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {collections.map((collection) => {
            const family = FAMILIES[collection.familyColor as FamilySlug];
            const gradient = family?.collectionGradient ?? FAMILIES.fresh.collectionGradient;
            const pattern = family?.pattern ?? "";

            return (
              <Link
                key={collection.slug}
                href={`/collections/${collection.slug}`}
                className="group block rounded-xl border border-border-default overflow-hidden shadow-card hover:shadow-card-hover hover:border-border-strong transition-all duration-200"
              >
                <div
                  className={`bg-gradient-to-br ${gradient} ${pattern} p-6 sm:p-8`}
                >
                  <span
                    className="text-4xl block mb-3 group-hover:scale-110 transition-transform duration-200"
                    aria-hidden="true"
                  >
                    {collection.icon}
                  </span>
                  <h3 className="font-display text-lg sm:text-xl font-semibold text-text-primary mb-1">
                    {collection.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-3">
                    {collection.tagline}
                  </p>
                  <span className="text-sm text-accent-primary font-medium group-hover:underline">
                    Browse collection &rarr;
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/collections"
            className="text-text-secondary hover:text-text-primary font-medium transition-colors"
          >
            See all collections &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
