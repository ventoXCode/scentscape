import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  FRAGRANCE_FAMILIES,
  getFamilyBySlug,
  getNotesForFamily,
} from "@/lib/learn/families";
import { ArticleJsonLd } from "@/components/seo/article-jsonld";
import { FAMILIES, type FamilySlug } from "@/lib/fragrance/family-config";

interface FamilyPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return FRAGRANCE_FAMILIES.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: FamilyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const family = getFamilyBySlug(slug);
  if (!family) return {};
  return {
    title: `${family.name} Fragrances — What They Smell Like | ScentScape`,
    description: family.description.slice(0, 160),
    openGraph: {
      title: `${family.name} Fragrances — What They Smell Like | ScentScape`,
      description: family.description.slice(0, 160),
    },
  };
}

export default async function FamilyDetailPage({ params }: FamilyPageProps) {
  const { slug } = await params;
  const family = getFamilyBySlug(slug);
  if (!family) notFound();

  const notes = getNotesForFamily(family);
  const familyIndex = FRAGRANCE_FAMILIES.findIndex((f) => f.slug === slug);
  const prevFamily = FRAGRANCE_FAMILIES[familyIndex - 1];
  const nextFamily = FRAGRANCE_FAMILIES[familyIndex + 1];

  return (
    <div>
      <ArticleJsonLd
        title={`${family.name} Fragrances — What They Smell Like`}
        description={family.description.slice(0, 160)}
        url={`/learn/families/${family.slug}`}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Learn", url: "/learn" },
          { name: "Families", url: "/learn/families" },
          { name: family.name, url: `/learn/families/${family.slug}` },
        ]}
      />

      {/* Hero */}
      <div
        className={`bg-gradient-to-b ${FAMILIES[family.color as FamilySlug]?.heroGradient ?? "from-surface-subtle to-surface-primary"} ${FAMILIES[family.color as FamilySlug]?.pattern ?? ""} pt-12 pb-8`}
      >
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="text-sm text-text-muted mb-8" aria-label="Breadcrumb">
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
              <li>
                <Link
                  href="/learn/families"
                  className="hover:text-text-primary transition-colors"
                >
                  Families
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-text-secondary">{family.name}</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <span className="text-5xl mb-4 block" aria-hidden="true">
              {family.emoji}
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-text-primary mb-2">
              {family.name}
            </h1>
            <p className="text-text-muted text-lg mb-4">{family.tagline}</p>
            <p className="text-text-secondary text-lg leading-relaxed">
              {family.description}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* History */}
          <section className="mb-14">
            <h2 className="font-display text-2xl font-bold text-text-primary mb-4">
              History
            </h2>
            <p className="text-text-secondary leading-relaxed">
              {family.history}
            </p>
          </section>

          {/* Characteristics */}
          <section className="mb-14">
            <h2 className="font-display text-2xl font-bold text-text-primary mb-4">
              Characteristics
            </h2>
            <ul className="space-y-2">
              {family.characteristics.map((char) => (
                <li
                  key={char}
                  className="flex items-start gap-3 text-text-secondary"
                >
                  <span className="text-accent-primary mt-1 shrink-0">•</span>
                  {char}
                </li>
              ))}
            </ul>
          </section>

          {/* Signature Notes */}
          <section className="mb-14">
            <h2 className="font-display text-2xl font-bold text-text-primary mb-4">
              Signature Notes
            </h2>
            <p className="text-text-secondary leading-relaxed mb-6">
              These are the notes you&apos;ll encounter most often in{" "}
              {family.name.toLowerCase()} fragrances. Tap any note to learn what
              it smells like.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {notes.map((note) => (
                <div
                  key={note.name}
                  className="rounded-lg border border-border-default bg-surface-elevated p-4"
                >
                  <h3 className="font-medium text-text-primary text-sm mb-1">
                    {note.name}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {note.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Subfamilies */}
          <section className="mb-14">
            <h2 className="font-display text-2xl font-bold text-text-primary mb-4">
              Subfamilies
            </h2>
            <p className="text-text-secondary leading-relaxed mb-6">
              Within the {family.name.toLowerCase()} family, there are distinct
              subcategories that range in character:
            </p>
            <div className="space-y-3">
              {family.subfamilies.map((sub) => (
                <div
                  key={sub.name}
                  className="rounded-xl border border-border-default bg-surface-subtle p-5"
                >
                  <h3 className="font-display font-semibold text-text-primary mb-1">
                    {sub.name}
                  </h3>
                  <p className="text-sm text-text-secondary">{sub.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* When to Wear */}
          <section className="mb-14">
            <h2 className="font-display text-2xl font-bold text-text-primary mb-4">
              When to Wear
            </h2>
            <p className="text-text-secondary leading-relaxed">
              {family.whenToWear}
            </p>
          </section>

          {/* Personality */}
          <section className="mb-14">
            <h2 className="font-display text-2xl font-bold text-text-primary mb-4">
              The {family.name} Personality
            </h2>
            <p className="text-text-secondary leading-relaxed">
              {family.personality}
            </p>
          </section>

          {/* Browse this family */}
          <section className="rounded-xl bg-surface-subtle border border-border-default p-8 text-center mb-14">
            <h2 className="font-display text-xl font-bold text-text-primary mb-2">
              Explore {family.name} Fragrances
            </h2>
            <p className="text-text-secondary mb-6 max-w-md mx-auto">
              Browse our catalog filtered to {family.name.toLowerCase()}{" "}
              fragrances, or let the quiz find your perfect match.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href={`/search?family=${family.name}`}
                className="inline-flex items-center justify-center bg-accent-primary text-text-inverse px-8 py-3 rounded-lg font-medium hover:bg-accent-primary-hover transition-colors"
              >
                Browse {family.name} Scents
              </Link>
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center border border-border-default px-8 py-3 rounded-lg font-medium text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors"
              >
                Take the Quiz
              </Link>
            </div>
          </section>

          {/* Prev/Next Navigation */}
          <nav className="flex items-center justify-between border-t border-border-default pt-8">
            {prevFamily ? (
              <Link
                href={`/learn/families/${prevFamily.slug}`}
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                &larr; {prevFamily.name}
              </Link>
            ) : (
              <span />
            )}
            <Link
              href="/learn/families"
              className="text-text-muted hover:text-text-primary transition-colors text-sm"
            >
              All Families
            </Link>
            {nextFamily ? (
              <Link
                href={`/learn/families/${nextFamily.slug}`}
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                {nextFamily.name} &rarr;
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
