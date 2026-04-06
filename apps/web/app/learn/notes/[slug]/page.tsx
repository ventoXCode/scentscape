import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ALL_NOTES, getNoteBySlug, getNotesByFamily } from "@/lib/learn/notes";
import { NoteProducts } from "./note-products";

interface NotePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note) return {};
  return {
    title: `What Does ${note.name} Smell Like? | ScentScape Fragrance Notes`,
    description: `${note.name}: ${note.description}. Learn about this ${note.family.toLowerCase()} fragrance note and discover perfumes that feature it.`,
    openGraph: {
      title: `What Does ${note.name} Smell Like?`,
      description: `${note.name}: ${note.description}. Discover fragrances featuring ${note.name.toLowerCase()}.`,
    },
  };
}

export function generateStaticParams() {
  return ALL_NOTES.map((note) => ({ slug: note.slug }));
}

const FAMILY_BG: Record<string, string> = {
  fresh: "from-family-fresh/10 to-transparent",
  floral: "from-family-floral/10 to-transparent",
  amber: "from-family-amber/10 to-transparent",
  woody: "from-family-woody/10 to-transparent",
  citrus: "from-family-citrus/10 to-transparent",
  aromatic: "from-family-aromatic/10 to-transparent",
};

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note) notFound();

  // Get related notes from the same family
  const notesByFamily = getNotesByFamily();
  const relatedNotes = (notesByFamily[note.family] ?? [])
    .filter((n) => n.slug !== note.slug)
    .slice(0, 6);

  // Find prev/next for navigation
  const idx = ALL_NOTES.findIndex((n) => n.slug === slug);
  const prev = idx > 0 ? ALL_NOTES[idx - 1] : null;
  const next = idx < ALL_NOTES.length - 1 ? ALL_NOTES[idx + 1] : null;

  const gradientClass = FAMILY_BG[note.familySlug] ?? "from-surface-subtle to-transparent";

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
          <li>
            <Link href="/learn/notes" className="hover:text-text-primary transition-colors">Notes</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-text-secondary">{note.name}</li>
        </ol>
      </nav>

      <div className="max-w-4xl">
        {/* Hero */}
        <div className={`bg-gradient-to-b ${gradientClass} rounded-2xl p-8 md:p-12 mb-8`}>
          <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 bg-family-${note.familySlug}-subtle text-family-${note.familySlug}`}>
            {note.family}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-3">
            {note.name}
          </h1>
          <p className="text-xl text-text-secondary leading-relaxed">
            {note.description}
          </p>
        </div>

        {/* About section */}
        <section className="mb-10">
          <h2 className="text-xl font-bold font-display mb-3">
            What does {note.name.toLowerCase()} smell like?
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            {note.name} is a {note.family.toLowerCase()} note described as <strong>{note.description.toLowerCase()}</strong>.
            {" "}It belongs to the {note.family} family of fragrance ingredients and is commonly
            found in perfumes ranging from light eau de colognes to rich parfums.
          </p>
          <p className="text-text-secondary leading-relaxed">
            In a fragrance composition, {note.name.toLowerCase()} can appear as a top note
            (the first impression), a heart note (the main character), or a base note
            (the lasting foundation) — depending on how the perfumer uses it.
          </p>
        </section>

        {/* Fragrances featuring this note */}
        <section className="mb-10">
          <h2 className="text-xl font-bold font-display mb-4">
            Fragrances featuring {note.name.toLowerCase()}
          </h2>
          <NoteProducts noteName={note.name} />
        </section>

        {/* Related notes */}
        {relatedNotes.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold font-display mb-4">
              Related {note.family} notes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {relatedNotes.map((related) => (
                <Link
                  key={related.slug}
                  href={`/learn/notes/${related.slug}`}
                  className="flex items-start gap-3 p-3 rounded-lg border border-border-default hover:border-border-strong hover:shadow-card transition-all"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-family-${related.familySlug}`}
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-medium text-text-primary">{related.name}</h3>
                    <p className="text-sm text-text-muted line-clamp-2">
                      {related.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Learn more */}
        <section className="mb-10 p-6 bg-surface-subtle rounded-xl">
          <h2 className="font-display font-bold text-lg mb-2">
            Learn more about fragrance families
          </h2>
          <p className="text-text-secondary text-sm mb-4">
            {note.name} belongs to the {note.family} family. Explore what defines
            this family and discover more notes like it.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/learn/families/${note.familySlug}`}
              className="px-4 py-2 bg-accent-primary text-white rounded-lg text-sm font-medium hover:bg-accent-primary-hover transition-colors"
            >
              Explore {note.family.split(" ")[0]} Family
            </Link>
            <Link
              href="/learn/notes"
              className="px-4 py-2 border border-border-default text-text-secondary rounded-lg text-sm font-medium hover:border-border-strong transition-colors"
            >
              All Fragrance Notes
            </Link>
          </div>
        </section>

        {/* Prev/Next navigation */}
        <nav className="flex justify-between items-center pt-6 border-t border-border-default">
          {prev ? (
            <Link
              href={`/learn/notes/${prev.slug}`}
              className="text-sm text-text-muted hover:text-text-primary transition-colors"
            >
              &larr; {prev.name}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/learn/notes/${next.slug}`}
              className="text-sm text-text-muted hover:text-text-primary transition-colors"
            >
              {next.name} &rarr;
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </div>
  );
}
