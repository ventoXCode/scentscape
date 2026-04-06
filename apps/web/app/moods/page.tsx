import Link from "next/link";
import type { Metadata } from "next";
import { MOODS } from "@/lib/discovery/moods";
import { ItemListJsonLd } from "@/components/seo/itemlist-jsonld";
import { ScrollReveal } from "@/components/home/scroll-reveal";

export const metadata: Metadata = {
  title: "Explore by Mood | ScentScape",
  description:
    "Browse fragrances by mood and vibe. Find scents for confidence, romance, relaxation, and more.",
  openGraph: {
    title: "Explore Fragrances by Mood | ScentScape",
    description:
      "Browse fragrances by mood and vibe. Find scents for confidence, romance, relaxation, and more.",
  },
};

export default function MoodsPage() {
  return (
    <>
    <ItemListJsonLd
      name="Explore Fragrances by Mood"
      description="Browse fragrances by mood and vibe — confidence, romance, relaxation, and more."
      url="/moods"
      items={MOODS.map((m) => ({
        name: m.title,
        url: `/moods/${m.slug}`,
      }))}
    />
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="font-display text-4xl font-bold text-text-primary mb-4">
          Explore by Mood
        </h1>
        <p className="text-text-secondary text-lg leading-relaxed">
          Not sure what fragrance family or notes you want? Start with how you
          want to feel. Each mood maps to fragrances that match the vibe.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {MOODS.map((mood, i) => (
          <ScrollReveal key={mood.slug} delay={i * 80}>
            <Link
              href={`/moods/${mood.slug}`}
              className={`group block rounded-xl border border-border-default overflow-hidden shadow-card hover:shadow-card-hover hover:border-border-strong transition-all duration-200 bg-gradient-to-br ${mood.gradient}`}
            >
              <div className="p-6 text-center">
                <span
                  className="text-4xl block mb-3 group-hover:scale-110 transition-transform duration-200"
                  aria-hidden="true"
                >
                  {mood.emoji}
                </span>
                <h2 className="font-display text-lg font-semibold text-text-primary mb-1">
                  {mood.title}
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {mood.tagline}
                </p>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>

      {/* Beginner callout */}
      <div className="max-w-2xl mx-auto mt-16 text-center">
        <ScrollReveal>
          <p className="text-text-muted mb-3">
            Not sure where to start?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/moods/new-to-fragrance"
              className="inline-flex items-center gap-2 px-6 py-3 bg-surface-subtle border border-border-default rounded-lg font-medium text-text-primary hover:bg-surface-elevated hover:border-border-strong transition-all"
            >
              <span aria-hidden="true">{"\uD83C\uDF1F"}</span>
              Start Here — Beginner Guide
            </Link>
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent-primary text-text-inverse rounded-lg font-medium hover:bg-accent-primary-hover transition-colors"
            >
              Take the Scent Quiz
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
    </>
  );
}
