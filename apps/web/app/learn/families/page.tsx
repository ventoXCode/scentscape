import Link from "next/link";
import type { Metadata } from "next";
import { FRAGRANCE_FAMILIES } from "@/lib/learn/families";
import { ScrollReveal } from "@/components/home/scroll-reveal";
import { FAMILIES, type FamilySlug } from "@/lib/fragrance/family-config";

export const metadata: Metadata = {
  title: "Fragrance Families Explained | ScentScape",
  description:
    "Understand the six major fragrance families — Fresh, Floral, Amber, Woody, Citrus, and Aromatic — and discover which ones resonate with you.",
  openGraph: {
    title: "Fragrance Families Explained | ScentScape",
    description:
      "Understand the six major fragrance families — Fresh, Floral, Amber, Woody, Citrus, and Aromatic.",
  },
};

export default function FamiliesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-text-muted mb-8" aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-text-primary transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/learn" className="hover:text-text-primary transition-colors">
              Learn
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-text-secondary">Fragrance Families</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-14">
        <p className="text-accent-primary font-medium text-sm uppercase tracking-wide mb-2">
          Deep Dive
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-text-primary mb-4">
          The Six Fragrance Families
        </h1>
        <p className="text-text-secondary text-lg leading-relaxed">
          Every fragrance in the world belongs to one of six broad families.
          Understanding them is the fastest shortcut to knowing what you love
          &mdash; and being able to ask for it.
        </p>
      </div>

      {/* Family Cards */}
      <div className="max-w-4xl mx-auto space-y-6">
        {FRAGRANCE_FAMILIES.map((family, i) => (
          <ScrollReveal key={family.slug} delay={i * 80}>
            <Link
              href={`/learn/families/${family.slug}`}
              className={`group block rounded-xl border-2 p-6 sm:p-8 shadow-card hover:shadow-card-hover transition-all duration-200 ${FAMILIES[family.color as FamilySlug]?.cardBorder ?? "bg-surface-subtle border-border-default"} ${FAMILIES[family.color as FamilySlug]?.pattern ?? ""}`}
            >
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <span
                  className="text-4xl sm:text-5xl flex-shrink-0"
                  aria-hidden="true"
                >
                  {family.emoji}
                </span>
                <div className="min-w-0">
                  <h2 className="font-display text-2xl font-bold text-text-primary group-hover:underline mb-1">
                    {family.name}
                  </h2>
                  <p className="text-sm text-text-muted mb-3">
                    {family.tagline}
                  </p>
                  <p className="text-text-secondary leading-relaxed mb-4">
                    {family.description.split(".").slice(0, 2).join(".") + "."}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {family.signatureNotes.slice(0, 5).map((note) => (
                      <span
                        key={note}
                        className="inline-block px-2.5 py-1 text-xs rounded-full bg-surface-elevated border border-border-default text-text-secondary"
                      >
                        {note}
                      </span>
                    ))}
                    {family.signatureNotes.length > 5 && (
                      <span className="inline-block px-2.5 py-1 text-xs text-text-muted">
                        +{family.signatureNotes.length - 5} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>

      {/* Quiz CTA */}
      <div className="max-w-2xl mx-auto text-center mt-16">
        <ScrollReveal>
          <h2 className="font-display text-xl font-bold text-text-primary mb-2">
            Not sure which family is yours?
          </h2>
          <p className="text-text-secondary mb-6">
            Our personality quiz figures it out for you — no fragrance knowledge
            required.
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center bg-accent-primary text-text-inverse px-8 py-3 rounded-lg font-medium hover:bg-accent-primary-hover transition-colors"
          >
            Take the Free Quiz
          </Link>
        </ScrollReveal>
      </div>
    </div>
  );
}
