import Link from "next/link";
import type { Metadata } from "next";
import {
  CONCENTRATION_DESCRIPTIONS,
  FAMILY_DESCRIPTIONS,
  METRIC_DESCRIPTIONS,
} from "@/lib/fragrance/glossary";
import { FaqJsonLd } from "@/components/seo/faq-jsonld";

export const metadata: Metadata = {
  title: "Fragrance Glossary — Every Term Explained | ScentScape",
  description:
    "A comprehensive glossary of fragrance terminology — concentrations, scent families, performance metrics, and more.",
  openGraph: {
    title: "Fragrance Glossary — Every Term Explained | ScentScape",
    description:
      "A comprehensive glossary of fragrance terminology — concentrations, scent families, performance metrics, and more.",
  },
};

const GENERAL_TERMS: { term: string; definition: string }[] = [
  {
    term: "Accord",
    definition:
      "A blend of two or more notes that combine to create a single, unified scent impression — like a chord in music. For example, a 'leather accord' might combine birch tar, smoke, and vanilla to evoke the smell of leather.",
  },
  {
    term: "Base Notes",
    definition:
      "The deepest, longest-lasting layer of a fragrance. Base notes emerge after the top and heart notes fade (usually 2+ hours) and form the foundation of the scent. Common base notes include sandalwood, vanilla, musk, and amber.",
  },
  {
    term: "Blind Buy",
    definition:
      "Purchasing a fragrance without smelling it first — based on reviews, note descriptions, or recommendations. Risky but sometimes rewarding.",
  },
  {
    term: "Drydown",
    definition:
      "The final phase of a fragrance's development on your skin — what remains after the top and heart notes have faded. The drydown is often considered the 'true' character of a fragrance.",
  },
  {
    term: "Flanker",
    definition:
      "A variation of an existing fragrance, usually released as a limited edition or new interpretation. Example: the original might be 'Midnight' while the flanker is 'Midnight Intense' or 'Midnight Summer.'",
  },
  {
    term: "Fragrance Family",
    definition:
      "A classification system that groups fragrances by their dominant character: Fresh, Floral, Amber (Oriental), Woody, Citrus, or Aromatic. Most fragrances belong primarily to one family but may borrow from others.",
  },
  {
    term: "Gourmand",
    definition:
      "A fragrance sub-category featuring sweet, edible-smelling notes like vanilla, chocolate, caramel, coffee, and honey. Gourmand fragrances are often cozy and comforting.",
  },
  {
    term: "Heart Notes",
    definition:
      "The middle layer of a fragrance that emerges after the top notes fade (typically 15–30 minutes after application). Heart notes define the core character of the fragrance and last several hours. Florals and spices are common here.",
  },
  {
    term: "House",
    definition:
      "The brand or company that creates a fragrance. Examples: Dior, Tom Ford, Le Labo, Byredo. Also called a 'fragrance house' or 'perfume house.'",
  },
  {
    term: "Maceration",
    definition:
      "The aging process after a fragrance is mixed, where ingredients meld together over weeks or months. Like wine, fragrances often improve with time.",
  },
  {
    term: "Nose",
    definition:
      "The perfumer who creates fragrances. Also called a 'nez' (French for nose). Master perfumers train for years to develop the ability to distinguish and blend thousands of scent ingredients.",
  },
  {
    term: "Note",
    definition:
      "A single scent ingredient or recognizable smell within a fragrance. Notes are categorized as top, heart, or base depending on when they become noticeable during the fragrance's development.",
  },
  {
    term: "Nose Blindness",
    definition:
      "The phenomenon where you stop being able to smell your own fragrance after wearing it for 15–20 minutes. Your brain filters out constant stimuli. Others can still smell it clearly.",
  },
  {
    term: "Scent Pyramid",
    definition:
      "A visual representation of a fragrance's structure showing three layers: top notes (first impression), heart notes (core character), and base notes (lasting foundation).",
  },
  {
    term: "Skin Chemistry",
    definition:
      "The way your individual body chemistry (pH, oils, hormones, diet) interacts with fragrance molecules, causing the same perfume to smell slightly different on different people.",
  },
  {
    term: "Soliflore",
    definition:
      "A fragrance designed to highlight a single flower, such as a pure rose or jasmine scent. From the French 'single flower.'",
  },
  {
    term: "Top Notes",
    definition:
      "The first scent impression you get when you spray a fragrance — the lightest, most volatile molecules. Top notes typically last 15–30 minutes. Citrus, light herbs, and fresh accords are common top notes.",
  },
  {
    term: "Unisex",
    definition:
      "A fragrance marketed and designed to be worn by anyone, regardless of gender. Many modern fragrances are unisex, as scent preferences are personal rather than gendered.",
  },
];

export default function GlossaryPage() {
  const faqQuestions = [
    ...Object.entries(CONCENTRATION_DESCRIPTIONS).map(([key, desc]) => ({
      question: `What does ${key} mean in fragrance?`,
      answer: desc,
    })),
    ...Object.entries(FAMILY_DESCRIPTIONS).map(([name, desc]) => ({
      question: `What is the ${name} fragrance family?`,
      answer: desc,
    })),
    ...Object.entries(METRIC_DESCRIPTIONS).map(([key, desc]) => ({
      question: `What is ${key} in fragrance?`,
      answer: desc,
    })),
    ...GENERAL_TERMS.map((entry) => ({
      question: `What does "${entry.term}" mean in perfumery?`,
      answer: entry.definition,
    })),
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <FaqJsonLd
        questions={faqQuestions}
        url="/learn/glossary"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Learn", url: "/learn" },
          { name: "Glossary", url: "/learn/glossary" },
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
          <li className="text-text-secondary">Glossary</li>
        </ol>
      </nav>

      <article className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <p className="text-accent-primary font-medium text-sm uppercase tracking-wide mb-2">
            Reference
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-text-primary mb-4">
            Fragrance Glossary
          </h1>
          <p className="text-text-secondary text-lg leading-relaxed">
            Every term you&apos;ll encounter in the world of fragrance,
            explained in plain language. Bookmark this page and come back
            whenever you hit a term you don&apos;t know.
          </p>
        </header>

        {/* Quick Jump */}
        <nav className="flex flex-wrap gap-2 mb-12" aria-label="Jump to section">
          <a
            href="#concentrations"
            className="px-3 py-1.5 text-sm rounded-lg border border-border-default bg-surface-elevated text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors"
          >
            Concentrations
          </a>
          <a
            href="#families"
            className="px-3 py-1.5 text-sm rounded-lg border border-border-default bg-surface-elevated text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors"
          >
            Fragrance Families
          </a>
          <a
            href="#performance"
            className="px-3 py-1.5 text-sm rounded-lg border border-border-default bg-surface-elevated text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors"
          >
            Performance Metrics
          </a>
          <a
            href="#general"
            className="px-3 py-1.5 text-sm rounded-lg border border-border-default bg-surface-elevated text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors"
          >
            General Terms
          </a>
        </nav>

        {/* Concentrations */}
        <section id="concentrations" className="mb-14 scroll-mt-24">
          <h2 className="font-display text-2xl font-bold text-text-primary mb-6">
            Concentrations
          </h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            The concentration tells you how much pure perfume oil is in the
            bottle. Higher concentration means longer wear time, stronger
            projection, and usually higher price.
          </p>
          <div className="space-y-3">
            {Object.entries(CONCENTRATION_DESCRIPTIONS).map(([key, desc]) => (
              <div
                key={key}
                className="flex gap-4 items-start rounded-lg border border-border-default bg-surface-elevated p-4"
              >
                <span className="font-display font-bold text-text-primary shrink-0 w-16">
                  {key}
                </span>
                <p className="text-sm text-text-secondary">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Families */}
        <section id="families" className="mb-14 scroll-mt-24">
          <h2 className="font-display text-2xl font-bold text-text-primary mb-6">
            Fragrance Families
          </h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            The six broad categories that all fragrances fall into.{" "}
            <Link
              href="/learn/families"
              className="text-accent-primary hover:underline"
            >
              Read our deep dive on each family &rarr;
            </Link>
          </p>
          <div className="space-y-3">
            {Object.entries(FAMILY_DESCRIPTIONS).map(([name, desc]) => (
              <Link
                key={name}
                href={`/learn/families/${name.toLowerCase()}`}
                className="group flex gap-4 items-start rounded-lg border border-border-default bg-surface-elevated p-4 hover:border-border-strong transition-colors"
              >
                <span className="font-display font-bold text-text-primary shrink-0 w-20 group-hover:underline">
                  {name}
                </span>
                <p className="text-sm text-text-secondary">{desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Performance Metrics */}
        <section id="performance" className="mb-14 scroll-mt-24">
          <h2 className="font-display text-2xl font-bold text-text-primary mb-6">
            Performance Metrics
          </h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            Three dimensions that describe how a fragrance behaves in the real
            world. We rate each on a 1–5 scale.
          </p>
          <div className="space-y-3">
            {Object.entries(METRIC_DESCRIPTIONS).map(([key, desc]) => (
              <div
                key={key}
                className="flex gap-4 items-start rounded-lg border border-border-default bg-surface-elevated p-4"
              >
                <span className="font-display font-bold text-text-primary shrink-0 w-24 capitalize">
                  {key}
                </span>
                <p className="text-sm text-text-secondary">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* General Terms */}
        <section id="general" className="mb-14 scroll-mt-24">
          <h2 className="font-display text-2xl font-bold text-text-primary mb-6">
            General Terms
          </h2>
          <div className="space-y-3">
            {GENERAL_TERMS.map((entry) => (
              <div
                key={entry.term}
                className="rounded-lg border border-border-default bg-surface-elevated p-4"
              >
                <h3 className="font-display font-semibold text-text-primary mb-1">
                  {entry.term}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {entry.definition}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-xl bg-surface-subtle border border-border-default p-8 text-center">
          <h2 className="font-display text-xl font-bold text-text-primary mb-2">
            Put your knowledge into practice
          </h2>
          <p className="text-text-secondary mb-6 max-w-md mx-auto">
            Take our free personality quiz and find fragrances that match who
            you are.
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
