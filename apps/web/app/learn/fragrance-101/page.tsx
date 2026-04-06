import Link from "next/link";
import type { Metadata } from "next";
import {
  CONCENTRATION_DESCRIPTIONS,
  FAMILY_DESCRIPTIONS,
  METRIC_DESCRIPTIONS,
} from "@/lib/fragrance/glossary";
import { ArticleJsonLd } from "@/components/seo/article-jsonld";

export const metadata: Metadata = {
  title: "Fragrance 101: A Beginner's Guide | ScentScape",
  description:
    "Everything you need to know about fragrance — how scents are structured, what the terms mean, and how to find your signature scent.",
  openGraph: {
    title: "Fragrance 101: A Beginner's Guide | ScentScape",
    description:
      "Everything you need to know about fragrance — how scents are structured, what the terms mean, and how to find your signature scent.",
  },
};

const PYRAMID_TIERS = [
  {
    name: "Top Notes",
    emoji: "💨",
    duration: "First 15–30 minutes",
    description:
      "The first impression. These are the lightest, most volatile molecules — they hit your nose immediately but fade the fastest. Citrus, light fruits, and herbal notes typically live here.",
    examples: "Bergamot, lemon, grapefruit, mint, lavender, pink pepper",
  },
  {
    name: "Heart Notes",
    emoji: "💐",
    duration: "30 minutes – 3 hours",
    description:
      "The core of the fragrance. After the top notes fade, the heart emerges — these are the notes that define the fragrance's character. Florals, spices, and fruit notes are common here.",
    examples: "Rose, jasmine, cardamom, cinnamon, peach, iris",
  },
  {
    name: "Base Notes",
    emoji: "🪵",
    duration: "3+ hours (sometimes all day)",
    description:
      "The foundation. Base notes are the heaviest, longest-lasting molecules. They anchor the fragrance and give it depth and longevity. Woods, resins, musks, and vanilla typically form the base.",
    examples: "Sandalwood, vanilla, amber, musk, cedar, patchouli, oud",
  },
];

export default function Fragrance101Page() {
  return (
    <div className="container mx-auto px-4 py-12">
      <ArticleJsonLd
        title="Fragrance 101: A Beginner's Guide"
        description="Everything you need to know about fragrance — how scents are structured, what the terms mean, and how to find your signature scent."
        url="/learn/fragrance-101"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Learn", url: "/learn" },
          { name: "Fragrance 101", url: "/learn/fragrance-101" },
        ]}
      />

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
          <li className="text-text-secondary">Fragrance 101</li>
        </ol>
      </nav>

      <article className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <p className="text-accent-primary font-medium text-sm uppercase tracking-wide mb-2">
            Beginner&apos;s Guide
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-text-primary mb-4">
            Fragrance 101
          </h1>
          <p className="text-text-secondary text-lg leading-relaxed">
            You don&apos;t need to know a thing about fragrance to enjoy it. But
            a little knowledge transforms the experience from &ldquo;that smells
            nice&rdquo; to &ldquo;I understand why I love this.&rdquo;
            Here&apos;s everything you need to get started.
          </p>
          <p className="text-text-muted text-sm mt-3">8 min read</p>
        </header>

        {/* Section: How a fragrance is structured */}
        <section className="mb-14">
          <h2 className="font-display text-2xl font-bold text-text-primary mb-4">
            How a Fragrance Is Structured
          </h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            Every fragrance unfolds in three layers, called the{" "}
            <strong className="text-text-primary">scent pyramid</strong>. Each
            layer contains different &ldquo;notes&rdquo; — individual scent
            ingredients that evaporate at different rates.
          </p>

          <div className="space-y-4">
            {PYRAMID_TIERS.map((tier) => (
              <div
                key={tier.name}
                className="rounded-xl border border-border-default bg-surface-elevated p-5"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xl" aria-hidden="true">
                    {tier.emoji}
                  </span>
                  <div>
                    <h3 className="font-display font-semibold text-text-primary">
                      {tier.name}
                    </h3>
                    <p className="text-xs text-text-muted">{tier.duration}</p>
                  </div>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed mb-2">
                  {tier.description}
                </p>
                <p className="text-xs text-text-muted">
                  <span className="font-medium">Common examples:</span>{" "}
                  {tier.examples}
                </p>
              </div>
            ))}
          </div>

          <p className="text-text-secondary leading-relaxed mt-6">
            This is why a fragrance smells different 10 minutes after you spray
            it compared to 4 hours later — you&apos;re experiencing different
            layers of the pyramid. Always give a fragrance at least 30 minutes
            on skin before deciding if you like it.
          </p>
        </section>

        {/* Section: Concentrations */}
        <section className="mb-14">
          <h2 className="font-display text-2xl font-bold text-text-primary mb-4">
            Concentrations: EDT, EDP, and More
          </h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            The label on a fragrance bottle tells you how much pure perfume oil
            is dissolved in the alcohol base. Higher concentration means
            stronger projection and longer wear time — but also higher price.
          </p>

          <div className="space-y-3">
            {Object.entries(CONCENTRATION_DESCRIPTIONS).map(([key, desc]) => (
              <div
                key={key}
                className="flex gap-4 items-start rounded-lg border border-border-default bg-surface-subtle p-4"
              >
                <span className="font-display font-bold text-text-primary shrink-0 w-16">
                  {key}
                </span>
                <p className="text-sm text-text-secondary">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl bg-surface-subtle border border-border-default p-5">
            <p className="text-sm text-text-secondary leading-relaxed">
              <strong className="text-text-primary">Pro tip:</strong> Eau de
              Parfum (EDP) is the sweet spot for most people — strong enough to
              last through the day, affordable enough for everyday wear.
            </p>
          </div>
        </section>

        {/* Section: Fragrance Families */}
        <section className="mb-14">
          <h2 className="font-display text-2xl font-bold text-text-primary mb-4">
            The Six Fragrance Families
          </h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            Every fragrance belongs to one (or more) of six broad families. Learning
            these is the single fastest way to understand your preferences and
            communicate them to others.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(FAMILY_DESCRIPTIONS).map(([name, desc]) => (
              <Link
                key={name}
                href={`/learn/families/${name.toLowerCase()}`}
                className="group rounded-lg border border-border-default bg-surface-elevated p-4 hover:border-border-strong hover:shadow-card transition-all duration-200"
              >
                <h3 className="font-display font-semibold text-text-primary group-hover:underline mb-1">
                  {name}
                </h3>
                <p className="text-sm text-text-secondary">{desc}</p>
              </Link>
            ))}
          </div>

          <p className="text-text-secondary leading-relaxed mt-6">
            <Link
              href="/learn/families"
              className="text-accent-primary hover:underline font-medium"
            >
              Explore all families in depth &rarr;
            </Link>
          </p>
        </section>

        {/* Section: Performance metrics */}
        <section className="mb-14">
          <h2 className="font-display text-2xl font-bold text-text-primary mb-4">
            What Longevity, Sillage, and Projection Mean
          </h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            Three numbers that tell you how a fragrance performs in the real
            world. Understanding these helps you choose the right fragrance for
            the right occasion.
          </p>

          <div className="space-y-3">
            {Object.entries(METRIC_DESCRIPTIONS).map(([key, desc]) => (
              <div
                key={key}
                className="rounded-lg border border-border-default bg-surface-elevated p-4"
              >
                <h3 className="font-display font-semibold text-text-primary capitalize mb-1">
                  {key}
                </h3>
                <p className="text-sm text-text-secondary">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl bg-surface-subtle border border-border-default p-5">
            <p className="text-sm text-text-secondary leading-relaxed">
              <strong className="text-text-primary">For beginners:</strong>{" "}
              Start with fragrances that have moderate sillage (2–3 out of 5).
              They&apos;re noticeable without being overwhelming, giving you
              confidence while you learn what you like.
            </p>
          </div>
        </section>

        {/* Section: How to find your scent */}
        <section className="mb-14">
          <h2 className="font-display text-2xl font-bold text-text-primary mb-4">
            How to Find Your Signature Scent
          </h2>
          <div className="space-y-4 text-text-secondary leading-relaxed">
            <p>
              <strong className="text-text-primary">1. Know your preferences broadly.</strong>{" "}
              Do you gravitate toward warm, cozy scents or cool, clean ones?
              Sweet or dry? Heavy or light? You don&apos;t need precise answers —
              general leanings are enough.
            </p>
            <p>
              <strong className="text-text-primary">2. Sample on skin, not paper.</strong>{" "}
              Paper strips are useful for a first impression, but fragrance
              interacts with your body chemistry. Always test on your wrist and
              wait at least 30 minutes.
            </p>
            <p>
              <strong className="text-text-primary">3. Don&apos;t test more than three at once.</strong>{" "}
              Your nose fatigues quickly. Three fragrances per session is the
              maximum for meaningful comparison.
            </p>
            <p>
              <strong className="text-text-primary">4. Revisit before buying.</strong>{" "}
              Wear a sample for a full day before committing. A fragrance that
              delights at noon might bore you by dinner — or surprise you by
              becoming even better.
            </p>
            <p>
              <strong className="text-text-primary">5. Trust your instinct.</strong>{" "}
              No amount of note breakdowns or performance ratings matters if you
              don&apos;t love how it makes you feel. Fragrance is deeply personal.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-xl bg-surface-subtle border border-border-default p-8 text-center">
          <h2 className="font-display text-xl font-bold text-text-primary mb-2">
            Skip the guesswork
          </h2>
          <p className="text-text-secondary mb-6 max-w-md mx-auto">
            Our personality quiz analyzes your preferences across multiple
            dimensions and matches you with fragrances you&apos;ll love.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center bg-accent-primary text-text-inverse px-8 py-3 rounded-lg font-medium hover:bg-accent-primary-hover transition-colors"
            >
              Take the Free Quiz
            </Link>
            <Link
              href="/learn"
              className="text-text-secondary hover:text-text-primary font-medium transition-colors"
            >
              &larr; Back to Learn
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}
