import type { Metadata } from "next";
import Link from "next/link";
import { getNotesByFamily } from "@/lib/learn/notes";

const FAMILY_COLORS: Record<string, string> = {
  fresh: "bg-family-fresh-subtle text-family-fresh",
  floral: "bg-family-floral-subtle text-family-floral",
  amber: "bg-family-amber-subtle text-family-amber",
  woody: "bg-family-woody-subtle text-family-woody",
  citrus: "bg-family-citrus-subtle text-family-citrus",
  aromatic: "bg-family-aromatic-subtle text-family-aromatic",
};

export const metadata: Metadata = {
  title: "Fragrance Notes Guide — What Does Each Note Smell Like? | ScentScape",
  description:
    "Explore 117 fragrance notes from bergamot to vanilla. Learn what each note smells like, which family it belongs to, and discover fragrances that feature it.",
  openGraph: {
    title: "Fragrance Notes Guide | ScentScape",
    description:
      "Explore 117 fragrance notes — learn what each one smells like and find fragrances that feature it.",
  },
};

export default function NotesIndexPage() {
  const notesByFamily = getNotesByFamily();

  return (
    <div className="container mx-auto px-4 py-8">
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-2 text-sm text-text-muted">
          <li>
            <Link href="/" className="hover:text-text-primary transition-colors">Home</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/learn" className="hover:text-text-primary transition-colors">Learn</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-text-secondary">Fragrance Notes</li>
        </ol>
      </nav>

      <div className="max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold font-display mb-4">
          Fragrance Notes Guide
        </h1>
        <p className="text-text-secondary text-lg mb-8 leading-relaxed">
          Every fragrance is built from individual notes — the raw materials and
          accords that create the scent you experience. Explore our guide to
          understand what each note smells like and how it contributes to a fragrance.
        </p>

        {/* Jump nav */}
        <div className="flex flex-wrap gap-2 mb-10">
          {Object.keys(notesByFamily).map((family) => {
            const firstNote = notesByFamily[family][0];
            return (
              <a
                key={family}
                href={`#${family.toLowerCase().replace(/\s+/g, "-")}`}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors hover:opacity-80 ${
                  FAMILY_COLORS[firstNote.familySlug] ?? "bg-surface-subtle text-text-secondary"
                }`}
              >
                {family}
              </a>
            );
          })}
        </div>

        {/* Notes by family */}
        {Object.entries(notesByFamily).map(([family, notes]) => (
          <section
            key={family}
            id={family.toLowerCase().replace(/\s+/g, "-")}
            className="mb-10"
          >
            <h2 className="text-xl font-bold font-display mb-4 pb-2 border-b border-border-default">
              {family}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {notes.map((note) => (
                <Link
                  key={note.slug}
                  href={`/learn/notes/${note.slug}`}
                  className="flex items-start gap-3 p-3 rounded-lg border border-border-default hover:border-border-strong hover:shadow-card transition-all"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-family-${note.familySlug}`}
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-medium text-text-primary">{note.name}</h3>
                    <p className="text-sm text-text-muted line-clamp-2">
                      {note.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <div className="mt-12 p-6 bg-surface-subtle rounded-xl text-center">
          <h2 className="font-display font-bold text-lg mb-2">
            Not sure where to start?
          </h2>
          <p className="text-text-secondary mb-4">
            Take our personality quiz to discover which notes suit you best.
          </p>
          <Link
            href="/quiz"
            className="inline-block px-6 py-3 bg-accent-primary text-white rounded-lg font-medium hover:bg-accent-primary-hover transition-colors"
          >
            Find Your Scent
          </Link>
        </div>
      </div>
    </div>
  );
}
