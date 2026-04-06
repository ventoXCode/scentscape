import Link from "next/link";
import type { Metadata } from "next";
import type { StoreProductWithPrices } from "@/lib/medusa/types";
import { Suspense } from "react";
import { medusa } from "@/lib/medusa/client";
import { ProductCard } from "@/components/product/product-card";
import { HeroSection } from "@/components/home/hero-section";
import { ScrollReveal } from "@/components/home/scroll-reveal";
import { FragranceOfTheDay } from "@/components/home/fragrance-of-the-day";
import { SeasonalPicks } from "@/components/home/seasonal-picks";
import { CollectionHighlights } from "@/components/home/collection-highlights";
import { RecentlyViewed } from "@/components/home/recently-viewed";
import { MOODS } from "@/lib/discovery/moods";

export const metadata: Metadata = {
  title: "ScentScape — Discover Your Signature Fragrance",
  description:
    "Take our free personality-based quiz and get matched with fragrances you'll love. Explore 100+ premium scents with personalized recommendations.",
  openGraph: {
    title: "ScentScape — Discover Your Signature Fragrance",
    description:
      "Take our free personality-based quiz and get matched with fragrances you'll love.",
    type: "website",
  },
};

export const revalidate = 300;

const VALUE_STEPS = [
  {
    icon: "💬",
    title: "Tell Us About You",
    description:
      "Answer 8–10 fun questions about your personality, lifestyle, and sensory preferences — not a fragrance quiz, a you quiz.",
  },
  {
    icon: "✨",
    title: "We Analyze 100+ Scents",
    description:
      "Our engine scores every fragrance across family, accords, intensity, occasion, and season to find your best matches.",
  },
  {
    icon: "🎯",
    title: "Get Personalized Picks",
    description:
      "Receive a unique scent personality profile and 8 curated recommendations with natural language explanations.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "I never knew what I liked until ScentScape told me I was a 'Velvet Dusk.' Now I get compliments daily.",
    name: "Sarah M.",
    archetype: "Velvet Dusk",
  },
  {
    quote:
      "As a fragrance beginner, the quiz made me feel confident about my first purchase. It nailed my taste perfectly.",
    name: "James R.",
    archetype: "Silver Breeze",
  },
  {
    quote:
      "I've been into perfume for years and was still surprised by how accurate the recommendations were.",
    name: "Priya K.",
    archetype: "Crimson Bloom",
  },
];

const STATS = [
  { value: "10,000+", label: "Quiz Completions" },
  { value: "100+", label: "Fragrances Analyzed" },
  { value: "10", label: "Scent Personalities" },
  { value: "2 min", label: "Average Quiz Time" },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Personality, Not Preferences",
    description:
      "We ask about your world — environments, textures, music, seasons — to understand your sensory identity, not just what you think you like.",
  },
  {
    step: "02",
    title: "Multi-Dimensional Matching",
    description:
      "Each fragrance is scored across 5 dimensions: family affinity, accord overlap, intensity match, occasion fit, and seasonal relevance.",
  },
  {
    step: "03",
    title: "Intelligent Variation",
    description:
      "Our engine uses weighted random selection so your results feel fresh every time — same personality, new discoveries.",
  },
  {
    step: "04",
    title: "Your Scent Personality",
    description:
      "You'll receive a named archetype like 'Gilded Ember' or 'Morning Mist' that captures your fragrance identity across four personality axes.",
  },
];

export default async function HomePage() {
  let products: StoreProductWithPrices[] = [];

  try {
    const result = await medusa.store.product.list({ limit: 4 });
    products = (result.products || []) as StoreProductWithPrices[];
  } catch {
    // Backend may not be running; render without featured products
  }

  return (
    <>
      <HeroSection />

      {/* Value Proposition */}
      <section className="py-section bg-surface-primary">
        <div className="container mx-auto px-4 max-w-5xl">
          <ScrollReveal>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary text-center mb-4">
              How the Quiz Works
            </h2>
            <p className="text-text-secondary text-center mb-14 max-w-2xl mx-auto">
              Not sure where to start? We&apos;ll help — for free. Our
              personality-based quiz matches you with scents you&apos;ll
              actually love.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUE_STEPS.map((step, i) => (
              <ScrollReveal key={step.title} delay={i * 120}>
                <div className="text-center group">
                  <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-surface-subtle flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-200">
                    {step.icon}
                  </div>
                  <h3 className="font-display text-xl font-semibold text-text-primary mb-2">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Fragrances */}
      {products.length > 0 && (
        <section className="py-section bg-surface-subtle/50">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="flex items-end justify-between mb-10">
                <div>
                  <p className="text-accent-primary font-medium text-sm uppercase tracking-wide mb-2">
                    Editor&apos;s Picks
                  </p>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary">
                    Featured Fragrances
                  </h2>
                </div>
                <Link
                  href="/products"
                  className="hidden sm:inline-flex text-text-secondary hover:text-text-primary font-medium transition-colors"
                >
                  View All &rarr;
                </Link>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product, i) => (
                <ScrollReveal key={product.id} delay={i * 100}>
                  <ProductCard product={{ ...product, handle: product.handle ?? null, variants: product.variants ?? undefined }} />
                </ScrollReveal>
              ))}
            </div>

            <div className="sm:hidden mt-8 text-center">
              <Link
                href="/products"
                className="text-text-secondary hover:text-text-primary font-medium transition-colors"
              >
                View All Fragrances &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Fragrance of the Day */}
      <Suspense>
        <FragranceOfTheDay />
      </Suspense>

      {/* Seasonal Picks */}
      <Suspense>
        <SeasonalPicks />
      </Suspense>

      {/* Recently Viewed */}
      <RecentlyViewed />

      {/* Explore by Mood */}
      <section className="py-section bg-surface-subtle/50">
        <div className="container mx-auto px-4 max-w-5xl">
          <ScrollReveal>
            <p className="text-accent-primary font-medium text-sm uppercase tracking-wide text-center mb-2">
              New Way to Browse
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary text-center mb-4">
              Explore by Mood
            </h2>
            <p className="text-text-secondary text-center mb-10 max-w-2xl mx-auto">
              Skip the technical jargon. Browse fragrances by how you want to
              feel.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {MOODS.slice(0, 4).map((mood, i) => (
              <ScrollReveal key={mood.slug} delay={i * 80}>
                <Link
                  href={`/moods/${mood.slug}`}
                  className={`group block rounded-xl border border-border-default overflow-hidden shadow-card hover:shadow-card-hover hover:border-border-strong transition-all duration-200 bg-gradient-to-br ${mood.gradient} p-5 text-center`}
                >
                  <span
                    className="text-3xl block mb-2 group-hover:scale-110 transition-transform duration-200"
                    aria-hidden="true"
                  >
                    {mood.emoji}
                  </span>
                  <h3 className="font-display text-sm sm:text-base font-semibold text-text-primary mb-0.5">
                    {mood.title}
                  </h3>
                  <p className="text-xs text-text-muted hidden sm:block">
                    {mood.tagline}
                  </p>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="text-center mt-8">
              <Link
                href="/moods"
                className="text-text-secondary hover:text-text-primary font-medium transition-colors"
              >
                See all moods &rarr;
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Learn About Fragrance */}
      <section className="py-section bg-surface-primary">
        <div className="container mx-auto px-4 max-w-5xl">
          <ScrollReveal>
            <p className="text-accent-primary font-medium text-sm uppercase tracking-wide text-center mb-2">
              New to Fragrance?
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary text-center mb-4">
              Learn the Basics
            </h2>
            <p className="text-text-secondary text-center mb-10 max-w-2xl mx-auto">
              You don&apos;t need to be an expert to find a scent you love. But
              a little knowledge goes a long way.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <ScrollReveal delay={0}>
              <Link
                href="/learn/fragrance-101"
                className="group block rounded-xl border border-border-default bg-surface-elevated p-6 shadow-card hover:shadow-card-hover hover:border-border-strong transition-all duration-200 text-center"
              >
                <span className="text-3xl block mb-3" aria-hidden="true">
                  📖
                </span>
                <h3 className="font-display font-semibold text-text-primary group-hover:underline mb-1">
                  Fragrance 101
                </h3>
                <p className="text-sm text-text-secondary">
                  The complete beginner&apos;s guide
                </p>
              </Link>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <Link
                href="/learn/how-to-apply"
                className="group block rounded-xl border border-border-default bg-surface-elevated p-6 shadow-card hover:shadow-card-hover hover:border-border-strong transition-all duration-200 text-center"
              >
                <span className="text-3xl block mb-3" aria-hidden="true">
                  💨
                </span>
                <h3 className="font-display font-semibold text-text-primary group-hover:underline mb-1">
                  How to Apply
                </h3>
                <p className="text-sm text-text-secondary">
                  Get the most from every spray
                </p>
              </Link>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <Link
                href="/learn/families"
                className="group block rounded-xl border border-border-default bg-surface-elevated p-6 shadow-card hover:shadow-card-hover hover:border-border-strong transition-all duration-200 text-center"
              >
                <span className="text-3xl block mb-3" aria-hidden="true">
                  🎨
                </span>
                <h3 className="font-display font-semibold text-text-primary group-hover:underline mb-1">
                  Scent Families
                </h3>
                <p className="text-sm text-text-secondary">
                  Discover what you&apos;re drawn to
                </p>
              </Link>
            </ScrollReveal>
          </div>

          <ScrollReveal>
            <div className="text-center mt-8">
              <Link
                href="/learn"
                className="text-text-secondary hover:text-text-primary font-medium transition-colors"
              >
                See all guides &rarr;
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Collection Highlights */}
      <ScrollReveal>
        <CollectionHighlights />
      </ScrollReveal>

      {/* Social Proof */}
      <section className="py-section bg-surface-primary">
        <div className="container mx-auto px-4 max-w-5xl">
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display text-3xl sm:text-4xl font-bold text-accent-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-text-muted text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary text-center mb-10">
              What People Are Saying
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 120}>
                <div className="bg-surface-elevated border border-border-default rounded-xl p-6 shadow-card">
                  <p className="text-text-secondary leading-relaxed mb-4 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-surface-subtle flex items-center justify-center text-text-muted font-medium text-sm">
                      {t.name[0]}
                    </div>
                    <div>
                      <div className="text-text-primary font-medium text-sm">
                        {t.name}
                      </div>
                      <div className="text-text-muted text-xs">
                        {t.archetype}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works — Deeper Explanation */}
      <section className="py-section bg-surface-subtle/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <ScrollReveal>
            <p className="text-accent-primary font-medium text-sm uppercase tracking-wide text-center mb-2">
              Behind the Scenes
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary text-center mb-4">
              Smarter Than a Filter
            </h2>
            <p className="text-text-secondary text-center mb-14 max-w-2xl mx-auto">
              Most fragrance quizzes ask what notes you like. Ours figures out
              who you are — then matches scents to your sensory identity.
            </p>
          </ScrollReveal>

          <div className="space-y-8">
            {HOW_IT_WORKS.map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 100}>
                <div className="flex gap-6 items-start">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-accent-primary/10 flex items-center justify-center">
                    <span className="font-display text-lg font-bold text-accent-primary">
                      {item.step}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-text-primary mb-1">
                      {item.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-section bg-surface-primary">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              Ready to Find Your Scent?
            </h2>
            <p className="text-text-secondary text-lg mb-8 leading-relaxed">
              It takes two minutes, it&apos;s completely free, and you might
              just discover your new signature fragrance.
            </p>
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center bg-accent-primary text-text-inverse px-10 py-4 rounded-lg font-medium text-lg hover:bg-accent-primary-hover transition-colors shadow-elevated"
            >
              Take the Quiz
            </Link>
            <p className="text-text-muted text-sm mt-4">
              No account required &middot; Always free
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
