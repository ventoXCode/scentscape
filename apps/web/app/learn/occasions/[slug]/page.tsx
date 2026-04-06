import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  OCCASION_GUIDES,
  getOccasionGuideBySlug,
  getNotesForOccasion,
} from "@/lib/learn/occasion-guides";
import { ArticleJsonLd } from "@/components/seo/article-jsonld";
import {
  meilisearch,
  PRODUCTS_INDEX,
  type SearchableProduct,
} from "@/lib/search/meilisearch";
import { formatPrice } from "@/lib/utils/format";

export const revalidate = 300;

interface OccasionPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return OCCASION_GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: OccasionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getOccasionGuideBySlug(slug);
  if (!guide) return {};
  return {
    title: `${guide.title} | ScentScape`,
    description: guide.description.slice(0, 160),
    openGraph: {
      title: `${guide.title} | ScentScape`,
      description: guide.description.slice(0, 160),
    },
  };
}

async function getOccasionProducts(
  occasion: string
): Promise<SearchableProduct[]> {
  try {
    const results = await meilisearch
      .index(PRODUCTS_INDEX)
      .search<SearchableProduct>("", {
        filter: `occasion = "${occasion}"`,
        limit: 8,
      });
    return results.hits;
  } catch {
    return [];
  }
}

export default async function OccasionGuidePage({
  params,
}: OccasionPageProps) {
  const { slug } = await params;
  const guide = getOccasionGuideBySlug(slug);
  if (!guide) notFound();

  const notes = getNotesForOccasion(guide);
  const products = await getOccasionProducts(guide.searchFilter);

  const guideIndex = OCCASION_GUIDES.findIndex((g) => g.slug === slug);
  const prevGuide = OCCASION_GUIDES[guideIndex - 1];
  const nextGuide = OCCASION_GUIDES[guideIndex + 1];

  return (
    <div>
      <ArticleJsonLd
        title={guide.title}
        description={guide.description.slice(0, 160)}
        url={`/learn/occasions/${guide.slug}`}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Learn", url: "/learn" },
          { name: "Occasion Guides", url: "/learn" },
          { name: guide.occasion, url: `/learn/occasions/${guide.slug}` },
        ]}
      />

      {/* Hero */}
      <div
        className={`bg-gradient-to-b ${guide.heroGradient} pt-12 pb-8`}
      >
        <div className="container mx-auto px-4">
          <nav
            className="text-sm text-text-muted mb-8"
            aria-label="Breadcrumb"
          >
            <ol className="flex items-center gap-1.5">
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
                  href="/learn"
                  className="hover:text-text-primary transition-colors"
                >
                  Learn
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-text-secondary">{guide.occasion}</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <span className="text-5xl mb-4 block" aria-hidden="true">
              {guide.emoji}
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-text-primary mb-2">
              {guide.title}
            </h1>
            <p className="text-text-muted text-lg mb-4">{guide.tagline}</p>
            <p className="text-text-secondary text-lg leading-relaxed">
              {guide.description}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Why It Matters */}
          <section className="mb-14">
            <h2 className="font-display text-2xl font-bold text-text-primary mb-4">
              Why Your {guide.occasion} Fragrance Matters
            </h2>
            <p className="text-text-secondary leading-relaxed">
              {guide.whyItMatters}
            </p>
          </section>

          {/* Characteristics */}
          <section className="mb-14">
            <h2 className="font-display text-2xl font-bold text-text-primary mb-4">
              What to Look For
            </h2>
            <ul className="space-y-2">
              {guide.characteristics.map((char) => (
                <li
                  key={char}
                  className="flex items-start gap-3 text-text-secondary"
                >
                  <span className="text-accent-primary mt-1 shrink-0">
                    •
                  </span>
                  {char}
                </li>
              ))}
            </ul>
          </section>

          {/* Best Families */}
          <section className="mb-14">
            <h2 className="font-display text-2xl font-bold text-text-primary mb-4">
              Best Fragrance Families for {guide.occasion}
            </h2>
            <div className="space-y-3">
              {guide.bestFamilies.map((fam) => (
                <Link
                  key={fam.slug}
                  href={`/learn/families/${fam.slug}`}
                  className="block rounded-xl border border-border-default bg-surface-subtle p-5 hover:border-border-strong hover:shadow-card transition-all"
                >
                  <h3 className="font-display font-semibold text-text-primary mb-1">
                    {fam.name}
                  </h3>
                  <p className="text-sm text-text-secondary">{fam.why}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* Notes to Look For */}
          <section className="mb-14">
            <h2 className="font-display text-2xl font-bold text-text-primary mb-4">
              Notes to Look For
            </h2>
            <p className="text-text-secondary leading-relaxed mb-6">
              When shopping for {guide.occasion.toLowerCase()} fragrances,
              keep an eye out for these ingredients:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {notes.map((note) => (
                <Link
                  key={note.name}
                  href={`/learn/notes/${note.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="rounded-lg border border-border-default bg-surface-elevated p-4 hover:border-border-strong hover:shadow-card transition-all"
                >
                  <h3 className="font-medium text-text-primary text-sm mb-1">
                    {note.name}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {note.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* Wearing Tips */}
          <section className="mb-14">
            <h2 className="font-display text-2xl font-bold text-text-primary mb-4">
              How to Wear Fragrance for {guide.occasion}
            </h2>
            <div className="space-y-3">
              {guide.wearingTips.map((tip, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 text-text-secondary"
                >
                  <span className="shrink-0 w-7 h-7 rounded-full bg-accent-primary/10 text-accent-primary text-sm font-semibold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <p className="leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Scenarios */}
          <section className="mb-14">
            <h2 className="font-display text-2xl font-bold text-text-primary mb-4">
              {guide.occasion} Scenarios & What to Wear
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {guide.scenarios.map((scenario) => (
                <div
                  key={scenario.name}
                  className="rounded-xl border border-border-default bg-surface-subtle p-5"
                >
                  <span className="text-2xl mb-2 block" aria-hidden="true">
                    {scenario.emoji}
                  </span>
                  <h3 className="font-display font-semibold text-text-primary mb-1">
                    {scenario.name}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {scenario.suggestion}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Products — full width */}
        {products.length > 0 && (
          <section className="mb-14 max-w-5xl mx-auto">
            <h2 className="font-display text-2xl font-bold text-text-primary mb-2 text-center">
              {guide.emoji} Fragrances for {guide.occasion}
            </h2>
            <p className="text-text-secondary text-center mb-8 max-w-2xl mx-auto">
              These fragrances are well-suited for{" "}
              {guide.occasion.toLowerCase()} occasions from our catalog.
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.handle}`}
                  className="group block rounded-xl border border-border-default bg-surface-elevated overflow-hidden shadow-card hover:shadow-card-hover hover:border-border-strong transition-all duration-200"
                >
                  <div className="aspect-[3/4] relative bg-surface-subtle overflow-hidden">
                    {product.thumbnail ? (
                      <Image
                        src={product.thumbnail}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-text-muted text-4xl">
                        🧴
                      </div>
                    )}
                    {product.family && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 bg-surface-elevated/90 backdrop-blur-sm rounded-full text-xs text-text-secondary">
                        {product.family}
                      </span>
                    )}
                  </div>
                  <div className="p-3 sm:p-4">
                    {product.brand && (
                      <p className="text-[11px] text-text-muted uppercase tracking-wider mb-0.5">
                        {product.brand}
                      </p>
                    )}
                    <h3 className="font-display text-sm sm:text-base font-semibold text-text-primary leading-tight mb-1 group-hover:text-accent-primary transition-colors line-clamp-1">
                      {product.title}
                    </h3>
                    {product.price != null && (
                      <p className="text-sm text-accent-primary font-medium">
                        From {formatPrice(product.price)}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href={`/search?occasion=${encodeURIComponent(guide.searchFilter)}`}
                className="text-text-secondary hover:text-text-primary font-medium transition-colors"
              >
                See all {guide.occasion.toLowerCase()} fragrances &rarr;
              </Link>
            </div>
          </section>
        )}

        <div className="max-w-3xl mx-auto">
          {/* CTA */}
          <section className="rounded-xl bg-surface-subtle border border-border-default p-8 text-center mb-14">
            <h2 className="font-display text-xl font-bold text-text-primary mb-2">
              Find Your Perfect {guide.occasion} Scent
            </h2>
            <p className="text-text-secondary mb-6 max-w-md mx-auto">
              Take our personality quiz to discover fragrances matched to
              your style, or browse all{" "}
              {guide.occasion.toLowerCase()} picks.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center bg-accent-primary text-text-inverse px-8 py-3 rounded-lg font-medium hover:bg-accent-primary-hover transition-colors"
              >
                Take the Quiz
              </Link>
              <Link
                href={`/search?occasion=${encodeURIComponent(guide.searchFilter)}`}
                className="inline-flex items-center justify-center border border-border-default px-8 py-3 rounded-lg font-medium text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors"
              >
                Browse {guide.occasion} Scents
              </Link>
            </div>
          </section>

          {/* Prev/Next Navigation */}
          <nav className="flex items-center justify-between border-t border-border-default pt-8">
            {prevGuide ? (
              <Link
                href={`/learn/occasions/${prevGuide.slug}`}
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                &larr; {prevGuide.occasion}
              </Link>
            ) : (
              <span />
            )}
            <Link
              href="/learn"
              className="text-text-muted hover:text-text-primary transition-colors text-sm"
            >
              All Guides
            </Link>
            {nextGuide ? (
              <Link
                href={`/learn/occasions/${nextGuide.slug}`}
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                {nextGuide.occasion} &rarr;
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
