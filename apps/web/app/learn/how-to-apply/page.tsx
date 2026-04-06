import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Apply Fragrance | ScentScape",
  description:
    "Learn where and how to apply fragrance for maximum effect — pulse points, layering, storage tips, and common mistakes to avoid.",
  openGraph: {
    title: "How to Apply Fragrance | ScentScape",
    description:
      "Learn where and how to apply fragrance for maximum effect — pulse points, layering, storage tips, and common mistakes to avoid.",
  },
};

const PULSE_POINTS = [
  {
    name: "Inner wrists",
    emoji: "🤲",
    tip: "The classic spot. Apply and let it dry naturally — don't rub your wrists together, as friction breaks down the top notes.",
  },
  {
    name: "Neck (sides and back)",
    emoji: "✨",
    tip: "Warmth from your pulse projects fragrance upward. The back of the neck creates a subtle scent trail as you move.",
  },
  {
    name: "Behind the ears",
    emoji: "👂",
    tip: "A warm, sheltered spot that keeps fragrance close and intimate — perfect for quieter scents.",
  },
  {
    name: "Inner elbows",
    emoji: "💪",
    tip: "An underrated pulse point. The crease traps warmth and keeps the scent alive throughout the day.",
  },
  {
    name: "Chest / collarbone",
    emoji: "🫁",
    tip: "Spraying on your chest lets fragrance rise through your collar and creates a personal 'scent bubble.'",
  },
  {
    name: "Behind the knees",
    emoji: "🦵",
    tip: "Heat rises. Applying here lets fragrance drift upward throughout the day — a technique borrowed from classic perfumery.",
  },
];

const COMMON_MISTAKES = [
  {
    mistake: "Rubbing wrists together",
    why: "Friction generates heat that breaks down delicate top notes prematurely. Spray and let it dry on its own.",
  },
  {
    mistake: "Spraying on clothes only",
    why: "Fragrance needs skin warmth to develop properly. Clothes can also be stained by perfume oils. Spray on skin first.",
  },
  {
    mistake: "Storing in the bathroom",
    why: "Heat and humidity degrade fragrance faster than anything else. Keep bottles in a cool, dark, dry place.",
  },
  {
    mistake: "Applying too much",
    why: "You become nose-blind to your own fragrance within minutes. If you can still smell it strongly, others are overwhelmed. Start with 2–3 sprays.",
  },
  {
    mistake: "Only testing on paper",
    why: "Paper strips show the top notes but miss how a fragrance develops with your body chemistry. Always test on skin.",
  },
];

const STORAGE_TIPS = [
  "Keep bottles away from direct sunlight — UV light breaks down fragrance molecules.",
  "Store at a consistent, cool temperature (ideally 15–20°C / 59–68°F).",
  "Keep the cap on when not in use to prevent oxidation.",
  "Don't shake the bottle — it introduces air bubbles that accelerate degradation.",
  "A bedroom drawer or closet shelf is ideal. Avoid bathrooms and windowsills.",
];

export default function HowToApplyPage() {
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
          <li className="text-text-secondary">How to Apply</li>
        </ol>
      </nav>

      <article className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <p className="text-accent-primary font-medium text-sm uppercase tracking-wide mb-2">
            Practical Guide
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-text-primary mb-4">
            How to Apply Fragrance
          </h1>
          <p className="text-text-secondary text-lg leading-relaxed">
            The difference between a fragrance that fades in an hour and one that
            lasts all day often comes down to how and where you apply it. These
            tips will help you get the most from every spray.
          </p>
          <p className="text-text-muted text-sm mt-3">5 min read</p>
        </header>

        {/* How much to apply */}
        <section className="mb-14">
          <h2 className="font-display text-2xl font-bold text-text-primary mb-4">
            How Much to Apply
          </h2>
          <div className="space-y-4 text-text-secondary leading-relaxed">
            <p>
              Less is more. The goal is to create a{" "}
              <strong className="text-text-primary">scent bubble</strong> that
              people notice when they&apos;re close, not across the room.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-lg border border-border-default bg-surface-elevated p-4">
                <p className="font-medium text-text-primary text-sm mb-1">
                  EDC / EDT (lighter)
                </p>
                <p className="text-sm text-text-secondary">
                  3–5 sprays. These are designed to be applied more generously
                  and reapplied throughout the day.
                </p>
              </div>
              <div className="rounded-lg border border-border-default bg-surface-elevated p-4">
                <p className="font-medium text-text-primary text-sm mb-1">
                  EDP / Parfum (stronger)
                </p>
                <p className="text-sm text-text-secondary">
                  2–3 sprays. Higher concentration means each spray goes further
                  and lasts longer.
                </p>
              </div>
            </div>
            <p>
              Remember: you go nose-blind to your own fragrance within 15–20
              minutes. If you can barely smell it, that&apos;s usually perfect
              — others can still detect it clearly.
            </p>
          </div>
        </section>

        {/* Pulse Points */}
        <section className="mb-14">
          <h2 className="font-display text-2xl font-bold text-text-primary mb-4">
            Where to Apply: Pulse Points
          </h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            Pulse points are areas where blood vessels are close to the skin
            surface, generating warmth that helps fragrance diffuse naturally.
            You don&apos;t need to hit every point — choose 2–3 based on the
            occasion.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PULSE_POINTS.map((point) => (
              <div
                key={point.name}
                className="rounded-xl border border-border-default bg-surface-elevated p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg" aria-hidden="true">
                    {point.emoji}
                  </span>
                  <h3 className="font-display font-semibold text-text-primary text-sm">
                    {point.name}
                  </h3>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {point.tip}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Timing */}
        <section className="mb-14">
          <h2 className="font-display text-2xl font-bold text-text-primary mb-4">
            When to Apply
          </h2>
          <div className="space-y-4 text-text-secondary leading-relaxed">
            <p>
              <strong className="text-text-primary">After a shower</strong> is
              ideal. Clean, slightly damp skin holds fragrance better than dry
              skin. The warmth from the shower opens your pores, helping the
              fragrance absorb and last longer.
            </p>
            <p>
              <strong className="text-text-primary">Before getting dressed.</strong>{" "}
              Apply fragrance to bare skin, then let it dry for a minute before
              putting on clothes. This prevents staining and lets the fragrance
              bond with your skin.
            </p>
            <p>
              <strong className="text-text-primary">Moisturize first.</strong>{" "}
              Hydrated skin holds fragrance significantly longer than dry skin.
              Use an unscented moisturizer on your pulse points before spraying
              — it gives the fragrance molecules something to cling to.
            </p>
          </div>
        </section>

        {/* Layering */}
        <section className="mb-14">
          <h2 className="font-display text-2xl font-bold text-text-primary mb-4">
            Layering Fragrances
          </h2>
          <div className="space-y-4 text-text-secondary leading-relaxed">
            <p>
              Layering means wearing two or more fragrances together to create a
              unique scent that&apos;s entirely your own. It sounds advanced, but
              the principles are simple:
            </p>
            <ul className="space-y-2 ml-5 list-disc">
              <li>
                <strong className="text-text-primary">Start with a base.</strong>{" "}
                Apply the heavier, longer-lasting fragrance first (typically
                woody, amber, or musky).
              </li>
              <li>
                <strong className="text-text-primary">Add a lighter accent.</strong>{" "}
                Layer a lighter, brighter fragrance on top (citrus, fresh, or
                floral) on different pulse points.
              </li>
              <li>
                <strong className="text-text-primary">Match families or contrast them.</strong>{" "}
                Complementary families (woody + citrus, floral + amber) work
                well. Experiment to find combinations you love.
              </li>
              <li>
                <strong className="text-text-primary">Use matching products.</strong>{" "}
                Many fragrance lines offer body lotions, shower gels, and hair
                mists in the same scent. These are the easiest way to build
                layers.
              </li>
            </ul>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="mb-14">
          <h2 className="font-display text-2xl font-bold text-text-primary mb-4">
            Common Mistakes to Avoid
          </h2>
          <div className="space-y-3">
            {COMMON_MISTAKES.map((item) => (
              <div
                key={item.mistake}
                className="rounded-lg border border-border-default bg-surface-elevated p-4"
              >
                <h3 className="font-medium text-text-primary text-sm mb-1">
                  {item.mistake}
                </h3>
                <p className="text-sm text-text-secondary">{item.why}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Storage */}
        <section className="mb-14">
          <h2 className="font-display text-2xl font-bold text-text-primary mb-4">
            Storing Your Fragrances
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            A well-stored fragrance can last 3–5 years (sometimes longer).
            Heat, light, and air are the enemies.
          </p>
          <ul className="space-y-2">
            {STORAGE_TIPS.map((tip, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm text-text-secondary"
              >
                <span className="text-accent-primary mt-0.5 shrink-0">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <section className="rounded-xl bg-surface-subtle border border-border-default p-8 text-center">
          <h2 className="font-display text-xl font-bold text-text-primary mb-2">
            Find a fragrance worth applying perfectly
          </h2>
          <p className="text-text-secondary mb-6 max-w-md mx-auto">
            Take our free personality quiz to discover scents matched to who you
            are.
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
