import type { Metadata } from "next";
import Link from "next/link";
import { SampleBoxSummary } from "@/components/samples/sample-box-summary";
import { SAMPLE_BOX_TIERS } from "@/lib/samples/config";
import { formatPrice } from "@/lib/utils/format";

export const metadata: Metadata = {
  title: "Sample Box — Try Before You Buy | ScentScape",
  description:
    "Build your own fragrance sample box. Get 2mL spray vials of your top picks delivered to your door. From $25 for 3 samples.",
  openGraph: {
    title: "Sample Box — Try Before You Buy | ScentScape",
    description:
      "Build your own fragrance sample box. Get 2mL spray vials of your top picks delivered to your door.",
  },
};

export default function SamplesPage() {
  return (
    <div className="min-h-screen bg-surface-primary">
      {/* Hero */}
      <section className="bg-gradient-to-br from-accent-primary/5 via-surface-primary to-surface-subtle">
        <div className="container mx-auto px-4 py-16 md:py-24">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-8 text-sm text-text-muted"
          >
            <Link href="/" className="hover:text-text-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-text-primary">Sample Box</span>
          </nav>

          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-text-primary">
              Try Before You Buy
            </h1>
            <p className="mt-4 text-lg text-text-secondary leading-relaxed">
              Not sure which fragrance is right for you? Build a sample box
              with 2mL spray vials of your top picks. Wear them for a few
              days, live with them, then choose your signature scent with
              confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: how it works + browse CTAs */}
          <div className="lg:col-span-2 space-y-10">
            {/* How it works */}
            <div>
              <h2 className="text-2xl font-display font-semibold text-text-primary mb-6">
                How It Works
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  {
                    step: "1",
                    emoji: "🧪",
                    title: "Pick Your Samples",
                    desc: "Add 3–5 fragrances to your sample box from product pages, quiz results, or browsing.",
                  },
                  {
                    step: "2",
                    emoji: "📦",
                    title: "Get Them Delivered",
                    desc: "Your curated 2mL spray vials arrive at your door, ready to wear and test.",
                  },
                  {
                    step: "3",
                    emoji: "✨",
                    title: "Find Your Signature",
                    desc: "Live with your samples for a few days. When you find the one, upgrade to a full bottle.",
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="relative rounded-xl border border-border-default bg-surface-elevated p-6"
                  >
                    <span className="absolute -top-3 -left-1 w-7 h-7 rounded-full bg-accent-primary text-white text-xs font-bold flex items-center justify-center">
                      {item.step}
                    </span>
                    <div className="text-3xl mb-3">{item.emoji}</div>
                    <h3 className="font-semibold text-text-primary mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing tiers */}
            <div>
              <h2 className="text-2xl font-display font-semibold text-text-primary mb-6">
                Pricing
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SAMPLE_BOX_TIERS.map((tier) => (
                  <div
                    key={tier.id}
                    className={`rounded-xl border p-6 ${
                      tier.id === "discovery"
                        ? "border-accent-primary bg-accent-primary/5"
                        : "border-border-default bg-surface-elevated"
                    }`}
                  >
                    {tier.id === "discovery" && (
                      <span className="inline-block mb-2 text-xs font-medium text-accent-primary bg-accent-primary/10 px-2 py-0.5 rounded-full">
                        Best Value
                      </span>
                    )}
                    <h3 className="text-lg font-semibold font-display text-text-primary">
                      {tier.name}
                    </h3>
                    <p className="text-sm text-text-secondary mt-1">
                      {tier.description}
                    </p>
                    <p className="mt-3 text-2xl font-display font-bold text-text-primary">
                      {formatPrice(tier.price, "usd")}
                    </p>
                    <p className="text-xs text-text-muted mt-1">
                      {formatPrice(
                        Math.round(tier.price / tier.sampleCount),
                        "usd",
                      )}{" "}
                      per sample
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Add samples CTAs */}
            <div>
              <h2 className="text-2xl font-display font-semibold text-text-primary mb-4">
                Start Building Your Box
              </h2>
              <p className="text-text-secondary mb-6">
                Browse fragrances and click &ldquo;Try Sample&rdquo; to add
                them to your box. Or take our quiz to get personalized picks.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/quiz"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent-primary text-white font-medium hover:bg-accent-primary-hover transition-colors"
                >
                  Take the Quiz
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center px-6 py-3 rounded-lg border border-border-default text-text-primary font-medium hover:border-border-strong transition-colors"
                >
                  Browse Fragrances
                </Link>
                <Link
                  href="/moods"
                  className="inline-flex items-center px-6 py-3 rounded-lg border border-border-default text-text-primary font-medium hover:border-border-strong transition-colors"
                >
                  Explore by Mood
                </Link>
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-2xl font-display font-semibold text-text-primary mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {[
                  {
                    q: "How big are the samples?",
                    a: "Each sample is a 2mL spray vial — enough for about 20 applications, so you can wear it for several days.",
                  },
                  {
                    q: "How long does shipping take?",
                    a: "Sample boxes typically ship within 2-3 business days and arrive within a week.",
                  },
                  {
                    q: "Can I apply sample credit toward a full bottle?",
                    a: "Our retail partners offer promotions where sample purchases can be credited toward full-size bottles. Check with the retailer for current offers.",
                  },
                  {
                    q: "What if I don't like any of my samples?",
                    a: "That's the point of sampling! You've saved yourself from a $100+ blind buy. Retake the quiz with different answers, or explore by mood to discover something new.",
                  },
                ].map((faq) => (
                  <details
                    key={faq.q}
                    className="group rounded-lg border border-border-default bg-surface-elevated"
                  >
                    <summary className="cursor-pointer px-5 py-4 text-sm font-medium text-text-primary list-none flex items-center justify-between">
                      {faq.q}
                      <svg
                        viewBox="0 0 24 24"
                        className="w-4 h-4 text-text-muted transition-transform group-open:rotate-180"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m19.5 8.25-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </summary>
                    <p className="px-5 pb-4 text-sm text-text-secondary">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar: sample box summary */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <SampleBoxSummary />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
