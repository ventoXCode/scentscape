import Link from "next/link";
import type { Metadata } from "next";
import { GUIDES } from "@/lib/learn/guides";
import { FRAGRANCE_FAMILIES } from "@/lib/learn/families";
import { SEASONAL_GUIDES } from "@/lib/learn/seasonal-guides";
import { ScrollReveal } from "@/components/home/scroll-reveal";
import { FAMILIES, type FamilySlug } from "@/lib/fragrance/family-config";

export const metadata: Metadata = {
  title: "Learn About Fragrance | ScentScape",
  description:
    "Your guide to the world of fragrance. Learn about scent families, how to apply perfume, fragrance terminology, and more.",
  openGraph: {
    title: "Learn About Fragrance | ScentScape",
    description:
      "Your guide to the world of fragrance. Learn about scent families, how to apply perfume, fragrance terminology, and more.",
  },
};

export default function LearnPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <p className="text-accent-primary font-medium text-sm uppercase tracking-wide mb-2">
          Fragrance Education
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-text-primary mb-4">
          Learn About Fragrance
        </h1>
        <p className="text-text-secondary text-lg leading-relaxed">
          Whether you&apos;re buying your first bottle or building a collection,
          understanding fragrance makes the experience richer. Start anywhere
          &mdash; there&apos;s no wrong door.
        </p>
      </div>

      {/* Guides */}
      <section className="max-w-4xl mx-auto mb-20">
        <ScrollReveal>
          <h2 className="font-display text-2xl font-bold text-text-primary mb-8">
            Guides
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {GUIDES.map((guide, i) => (
            <ScrollReveal key={guide.slug} delay={i * 80}>
              <Link
                href={`/learn/${guide.slug}`}
                className="group block rounded-xl border border-border-default bg-surface-elevated p-6 shadow-card hover:shadow-card-hover hover:border-border-strong transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <span
                    className="text-3xl flex-shrink-0"
                    aria-hidden="true"
                  >
                    {guide.emoji}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-display text-lg font-semibold text-text-primary group-hover:underline">
                        {guide.title}
                      </h3>
                    </div>
                    <p className="text-xs text-text-muted mb-2">
                      {guide.readTime}
                    </p>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {guide.description}
                    </p>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Fragrance Notes */}
      <section className="max-w-4xl mx-auto mb-20">
        <ScrollReveal>
          <Link
            href="/learn/notes"
            className="group block rounded-xl border border-border-default bg-surface-elevated p-6 shadow-card hover:shadow-card-hover hover:border-border-strong transition-all duration-200"
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl flex-shrink-0" aria-hidden="true">
                🧪
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-lg font-semibold text-text-primary group-hover:underline mb-1">
                  Fragrance Notes Guide
                </h3>
                <p className="text-xs text-text-muted mb-2">Reference</p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Explore 117 individual fragrance notes — what each one smells like,
                  which family it belongs to, and which perfumes feature it.
                </p>
              </div>
            </div>
          </Link>
        </ScrollReveal>
      </section>

      {/* Fragrance Families Quick Nav */}
      <section className="max-w-4xl mx-auto mb-20">
        <ScrollReveal>
          <h2 className="font-display text-2xl font-bold text-text-primary mb-3">
            Explore Fragrance Families
          </h2>
          <p className="text-text-secondary mb-8">
            Every fragrance belongs to a family. Understanding them is the
            fastest way to discover what you love.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {FRAGRANCE_FAMILIES.map((family, i) => (
            <ScrollReveal key={family.slug} delay={i * 60}>
              <Link
                href={`/learn/families/${family.slug}`}
                className={`group block rounded-xl border p-5 text-center transition-all duration-200 shadow-card hover:shadow-card-hover ${FAMILIES[family.color as FamilySlug]?.card ?? "bg-surface-subtle border-border-default hover:border-border-strong"} ${FAMILIES[family.color as FamilySlug]?.pattern ?? ""}`}
              >
                <span
                  className="text-3xl block mb-2 group-hover:scale-110 transition-transform duration-200"
                  aria-hidden="true"
                >
                  {family.emoji}
                </span>
                <h3 className="font-display font-semibold text-text-primary mb-0.5">
                  {family.name}
                </h3>
                <p className="text-xs text-text-muted">{family.tagline}</p>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Seasonal Guides */}
      <section className="max-w-4xl mx-auto mb-20">
        <ScrollReveal>
          <h2 className="font-display text-2xl font-bold text-text-primary mb-3">
            Seasonal Fragrance Guides
          </h2>
          <p className="text-text-secondary mb-8">
            What you wear should change with the weather. These guides help
            you pick the right fragrance for every time of year.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {SEASONAL_GUIDES.map((guide, i) => (
            <ScrollReveal key={guide.slug} delay={i * 60}>
              <Link
                href={`/learn/seasonal/${guide.slug}`}
                className="group block rounded-xl border border-border-default bg-surface-elevated p-5 text-center shadow-card hover:shadow-card-hover hover:border-border-strong transition-all duration-200"
              >
                <span
                  className="text-3xl block mb-2 group-hover:scale-110 transition-transform duration-200"
                  aria-hidden="true"
                >
                  {guide.emoji}
                </span>
                <h3 className="font-display font-semibold text-text-primary mb-0.5">
                  {guide.season}
                </h3>
                <p className="text-xs text-text-muted">{guide.tagline}</p>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-2xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="font-display text-2xl font-bold text-text-primary mb-3">
            Ready to put your knowledge to the test?
          </h2>
          <p className="text-text-secondary mb-6">
            Take our free personality quiz and discover which scents match who
            you are.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center bg-accent-primary text-text-inverse px-8 py-3 rounded-lg font-medium hover:bg-accent-primary-hover transition-colors"
            >
              Take the Scent Quiz
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center border border-border-default px-8 py-3 rounded-lg font-medium text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors"
            >
              Browse Fragrances
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
