import Link from "next/link";
import type { Metadata } from "next";
import { ArticleJsonLd } from "@/components/seo/article-jsonld";

export const metadata: Metadata = {
  title: "How to Find Your Signature Scent | ScentScape",
  description:
    "A step-by-step guide to discovering the fragrance that captures who you are — from understanding your preferences to testing like a pro.",
  openGraph: {
    title: "How to Find Your Signature Scent | ScentScape",
    description:
      "A step-by-step guide to discovering the fragrance that captures who you are — from understanding your preferences to testing like a pro.",
  },
};

const DISCOVERY_STEPS = [
  {
    number: 1,
    title: "Start with What You Already Love",
    emoji: "💡",
    description:
      "Your signature scent is already hiding in your everyday preferences. Think about what draws you in — the smell of fresh laundry, a cedar closet, a bakery, rain on pavement, a wood fire. These instinctive attractions map directly to fragrance families and notes.",
    tip: "Write down 3-5 scents from daily life that make you feel something. This is your personal scent compass.",
  },
  {
    number: 2,
    title: "Learn the Language",
    emoji: "📖",
    description:
      "Knowing the basics — scent families, concentration types, what \"notes\" mean — transforms fragrance shopping from overwhelming to exciting. You don't need to become an expert, but understanding that a fragrance unfolds in layers (top, heart, base) changes how you evaluate what you smell.",
    link: { href: "/learn/fragrance-101", label: "Read Fragrance 101" },
  },
  {
    number: 3,
    title: "Narrow by Family",
    emoji: "🎨",
    description:
      "The six major fragrance families — Fresh, Floral, Amber, Woody, Citrus, and Aromatic — each have a distinct character. Most people gravitate toward 1-2 families. If you love the outdoors, you might lean Woody or Fresh. If you prefer warmth and richness, Amber or Floral might be your territory.",
    link: { href: "/learn/families", label: "Explore the families" },
  },
  {
    number: 4,
    title: "Sample Widely, Then Deeply",
    emoji: "🧪",
    description:
      "The biggest mistake beginners make is buying a full bottle based on a single spray in a store. Fragrance needs time with your skin. Get samples of 5-10 candidates and wear each one for a full day. Your skin chemistry, body heat, and environment all change how a fragrance smells on you versus on a card.",
    tip: "Wear one fragrance per day on clean skin. Take notes on how it evolves — morning to evening. The ones you forget you're wearing (in a good way) are strong contenders.",
  },
  {
    number: 5,
    title: "Trust the Drydown",
    emoji: "⏳",
    description:
      "The first 15 minutes of a fragrance (the top notes) are designed to grab attention, but they're not what you'll smell for the next 6-8 hours. The heart and base notes — the drydown — are the true character. A fragrance you love at first spray but hate after an hour is wrong for you, and vice versa.",
  },
  {
    number: 6,
    title: "Match Your Lifestyle",
    emoji: "🌍",
    description:
      "Your signature scent should fit your actual life, not an aspirational version of it. Consider where you spend your time (office, outdoors, social settings), the climate you live in, and how close people typically are to you. A powerhouse projection fragrance is overwhelming in a quiet office; a subtle skin scent disappears in an outdoor setting.",
    link: { href: "/learn/how-to-apply", label: "Learn application techniques" },
  },
  {
    number: 7,
    title: "Listen to Compliments (But Don't Chase Them)",
    emoji: "💬",
    description:
      "When someone says \"you smell amazing,\" pay attention — but don't make compliments your only metric. The best signature scent is one that makes you feel like yourself, not one that performs for others. A fragrance that gives you quiet confidence every time you put it on is worth more than one that gets compliments but doesn't feel like you.",
  },
];

const COMMON_TRAPS = [
  {
    trap: "Buying based on brand or bottle",
    reality:
      "A beautiful bottle is marketing. Your nose doesn't care about packaging. Some of the best fragrances come from houses you've never heard of.",
  },
  {
    trap: "Only testing on paper strips",
    reality:
      "Paper strips are useful for a first pass, but they can't replicate your skin chemistry. Always wear a fragrance on skin before committing.",
  },
  {
    trap: "Shopping when your nose is fatigued",
    reality:
      "After smelling 3-4 fragrances, your nose stops differentiating. Limit store visits to 3 serious tests. Sniff coffee beans or your own sleeve to reset between samples.",
  },
  {
    trap: "Thinking you need just one",
    reality:
      "Many people have 2-3 signature scents — a fresh daily driver, something warmer for evenings, and a seasonal favorite. Your scent wardrobe can evolve.",
  },
  {
    trap: "Following trends over instinct",
    reality:
      "What's popular on social media may not be right for your chemistry. Trends come and go, but a true signature transcends them.",
  },
];

export default function SignatureScentPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <ArticleJsonLd
        title="How to Find Your Signature Scent"
        description="A step-by-step guide to discovering the fragrance that captures who you are — from understanding your preferences to testing like a pro."
        url="/learn/signature-scent"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Learn", url: "/learn" },
          { name: "How to Find Your Signature Scent", url: "/learn/signature-scent" },
        ]}
      />

      <nav className="text-sm text-text-muted mb-8" aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-text-secondary transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/learn" className="hover:text-text-secondary transition-colors">
              Learn
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-text-secondary">How to Find Your Signature Scent</li>
        </ol>
      </nav>

      <article className="max-w-3xl mx-auto">
        <header className="mb-12">
          <p className="text-accent-primary font-medium text-sm uppercase tracking-wide mb-2">
            Practical Guide
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-text-primary mb-4">
            How to Find Your Signature Scent
          </h1>
          <p className="text-text-secondary text-lg leading-relaxed">
            A signature scent is more than a fragrance you like — it&apos;s the olfactory equivalent
            of your handwriting. It&apos;s the scent people associate with you, the one that feels
            like an extension of who you are. Here&apos;s how to find yours.
          </p>
          <p className="text-text-muted text-sm mt-3">7 min read</p>
        </header>

        {/* The 7 Steps */}
        <section className="mb-14">
          <h2 className="font-display text-2xl font-bold text-text-primary mb-6">
            7 Steps to Your Signature
          </h2>
          <div className="space-y-8">
            {DISCOVERY_STEPS.map((step) => (
              <div
                key={step.number}
                className="rounded-xl border border-border-default bg-surface-elevated p-5 sm:p-6"
              >
                <div className="flex items-start gap-3 mb-3">
                  <span
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-accent-primary/10 text-accent-primary font-bold text-sm flex-shrink-0"
                    aria-hidden="true"
                  >
                    {step.number}
                  </span>
                  <div>
                    <h3 className="font-display font-semibold text-text-primary text-lg">
                      <span className="mr-2" aria-hidden="true">
                        {step.emoji}
                      </span>
                      {step.title}
                    </h3>
                  </div>
                </div>
                <p className="text-text-secondary leading-relaxed ml-11">{step.description}</p>
                {step.tip && (
                  <div className="mt-3 ml-11 rounded-lg bg-surface-subtle border border-border-default p-3">
                    <p className="text-sm text-text-secondary leading-relaxed">
                      <strong className="text-text-primary">Tip:</strong> {step.tip}
                    </p>
                  </div>
                )}
                {step.link && (
                  <p className="mt-3 ml-11">
                    <Link
                      href={step.link.href}
                      className="text-sm text-accent-primary hover:text-accent-primary-hover font-medium transition-colors"
                    >
                      {step.link.label} &rarr;
                    </Link>
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Common Traps */}
        <section className="mb-14">
          <h2 className="font-display text-2xl font-bold text-text-primary mb-6">
            5 Traps to Avoid
          </h2>
          <div className="space-y-4">
            {COMMON_TRAPS.map((item) => (
              <div
                key={item.trap}
                className="rounded-xl border border-border-default bg-surface-elevated p-4"
              >
                <p className="font-medium text-text-primary mb-1">{item.trap}</p>
                <p className="text-sm text-text-secondary leading-relaxed">{item.reality}</p>
              </div>
            ))}
          </div>
        </section>

        {/* When You've Found It */}
        <section className="mb-14">
          <h2 className="font-display text-2xl font-bold text-text-primary mb-4">
            How You&apos;ll Know You&apos;ve Found It
          </h2>
          <div className="space-y-4 text-text-secondary leading-relaxed">
            <p>
              Your signature scent won&apos;t always be love at first spray. Sometimes it sneaks up
              on you — you realize after a full day of wearing it that you kept catching whiffs and
              smiling. Or you reach for the same sample three days in a row without thinking about
              it.
            </p>
            <p>
              The right fragrance feels effortless. It doesn&apos;t compete with your personality —
              it amplifies it. You stop thinking about what you&apos;re wearing and start just being
              it.
            </p>
            <p>
              And remember: your signature can evolve. The scent that defines your twenties might
              not be the one that defines your forties. Give yourself permission to grow.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-xl bg-surface-subtle border border-border-default p-8 text-center">
          <h2 className="font-display text-2xl font-bold text-text-primary mb-3">
            Ready to Start?
          </h2>
          <p className="text-text-secondary mb-6 max-w-md mx-auto">
            Our personality-based quiz matches you with fragrances based on who you are — not just
            what you think you like.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent-primary text-white rounded-lg font-medium hover:bg-accent-primary-hover transition-colors"
            >
              Take the Free Quiz
            </Link>
            <Link
              href="/samples"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border-default rounded-lg font-medium text-text-secondary hover:bg-surface-elevated transition-colors"
            >
              Try a Sample Box
            </Link>
          </div>
          <p className="mt-6">
            <Link
              href="/learn"
              className="text-sm text-text-muted hover:text-text-secondary transition-colors"
            >
              &larr; Back to Learn
            </Link>
          </p>
        </section>
      </article>
    </div>
  );
}
