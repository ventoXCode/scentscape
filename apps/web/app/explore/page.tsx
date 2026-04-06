import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui";
import { FRAGRANCE_FAMILIES } from "@/lib/learn/families";

const FragranceWheel = dynamic(
  () =>
    import("@/components/discovery/fragrance-wheel").then(
      (mod) => mod.FragranceWheel
    ),
  {
    loading: () => (
      <Skeleton className="aspect-square max-w-md mx-auto rounded-full" />
    ),
  }
);

export const metadata: Metadata = {
  title: "Explore Fragrance Families | ScentScape",
  description:
    "Discover the world of fragrance through our interactive scent wheel. Explore 6 fragrance families — Fresh, Floral, Amber, Woody, Citrus, and Aromatic — and find the scents that match your personality.",
  openGraph: {
    title: "Explore Fragrance Families | ScentScape",
    description:
      "Discover the world of fragrance through our interactive scent wheel. Explore 6 fragrance families and find your perfect match.",
  },
};

export default function ExplorePage() {
  return (
    <main className="min-h-screen bg-surface-primary">
      {/* Hero */}
      <section className="py-12 md:py-16 text-center px-4">
        <nav className="text-sm text-text-muted mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-text-primary transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-text-secondary">Explore</span>
        </nav>

        <h1 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-3">
          The Fragrance Wheel
        </h1>
        <p className="text-text-secondary max-w-xl mx-auto text-lg leading-relaxed">
          Every fragrance belongs to a family. Explore the six major families to understand
          what you love — and discover new scents you never knew you&apos;d enjoy.
        </p>
      </section>

      {/* Interactive wheel */}
      <section className="px-4 pb-12 md:pb-16 max-w-3xl mx-auto">
        <FragranceWheel />
      </section>

      {/* Quick family grid for mobile */}
      <section className="px-4 pb-12 md:pb-16 max-w-5xl mx-auto md:hidden">
        <h2 className="font-display text-xl font-semibold text-text-primary mb-4 text-center">
          Browse by Family
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {FRAGRANCE_FAMILIES.map((family) => (
            <Link
              key={family.slug}
              href={`/search?family=${family.name}`}
              className="flex items-center gap-3 rounded-xl border border-border-default bg-surface-elevated p-4 hover:shadow-card-hover hover:border-border-strong transition-all"
            >
              <span className="text-2xl">{family.emoji}</span>
              <div>
                <p className="font-medium text-sm text-text-primary">{family.name}</p>
                <p className="text-xs text-text-muted">{family.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Discovery CTAs */}
      <section className="px-4 pb-16 md:pb-20 max-w-3xl mx-auto">
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/quiz"
            className="flex flex-col items-center text-center rounded-xl border border-border-default bg-surface-elevated p-6 hover:shadow-card-hover hover:border-border-strong transition-all group"
          >
            <span className="text-3xl mb-3">🔮</span>
            <h3 className="font-display text-lg font-semibold text-text-primary mb-1">
              Find Your Scent
            </h3>
            <p className="text-sm text-text-secondary">
              Take our personality quiz to discover which families match your style
            </p>
            <span className="mt-3 text-sm font-medium text-accent-primary group-hover:text-accent-primary-hover transition-colors">
              Start the quiz →
            </span>
          </Link>

          <Link
            href="/moods"
            className="flex flex-col items-center text-center rounded-xl border border-border-default bg-surface-elevated p-6 hover:shadow-card-hover hover:border-border-strong transition-all group"
          >
            <span className="text-3xl mb-3">🎭</span>
            <h3 className="font-display text-lg font-semibold text-text-primary mb-1">
              Browse by Mood
            </h3>
            <p className="text-sm text-text-secondary">
              Explore fragrances by vibe — from Quiet Luxury to Main Character Energy
            </p>
            <span className="mt-3 text-sm font-medium text-accent-primary group-hover:text-accent-primary-hover transition-colors">
              See all moods →
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
