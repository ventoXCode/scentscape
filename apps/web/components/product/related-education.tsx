import Link from "next/link";
import { getNoteBySlug } from "@/lib/learn/notes";
import { getNoteDescription } from "@/lib/fragrance/note-descriptions";

interface RelatedEducationProps {
  family: string;
  concentration: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
}

function toSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}

const FAMILY_SLUG_MAP: Record<string, string> = {
  Fresh: "fresh",
  Floral: "floral",
  Amber: "amber",
  Woody: "woody",
  Citrus: "citrus",
  Aromatic: "aromatic",
};

const TIER_LABELS: Record<string, string> = {
  top: "Top note",
  heart: "Heart note",
  base: "Base note",
};

interface NoteCard {
  name: string;
  slug: string;
  description: string;
  tier: string;
  hasProfile: boolean;
}

export function RelatedEducation({
  family,
  concentration,
  topNotes,
  heartNotes,
  baseNotes,
}: RelatedEducationProps) {
  const familySlug = FAMILY_SLUG_MAP[family];

  // Build expandable note cards from all tiers
  const noteCards: NoteCard[] = [];
  const seen = new Set<string>();

  for (const [tier, notes] of [
    ["top", topNotes],
    ["heart", heartNotes],
    ["base", baseNotes],
  ] as const) {
    for (const name of notes) {
      if (seen.has(name)) continue;
      seen.add(name);
      const description = getNoteDescription(name);
      if (!description) continue;
      const slug = toSlug(name);
      noteCards.push({
        name,
        slug,
        description,
        tier,
        hasProfile: !!getNoteBySlug(slug),
      });
    }
  }

  return (
    <div className="mt-8 p-5 bg-surface-subtle rounded-xl">
      <h3 className="font-semibold text-text-primary mb-3">
        Learn more about this fragrance
      </h3>

      {/* Expandable note cards */}
      {noteCards.length > 0 && (
        <div className="space-y-2 mb-4">
          {noteCards.slice(0, 6).map((note) => (
            <details
              key={note.slug}
              className="group bg-surface-elevated border border-border-default rounded-lg overflow-hidden"
            >
              <summary className="flex items-center justify-between px-4 py-2.5 cursor-pointer select-none hover:bg-surface-subtle transition-colors list-none [&::-webkit-details-marker]:hidden">
                <span className="text-sm font-medium text-text-primary">
                  What is {note.name}?
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-xs text-text-muted">
                    {TIER_LABELS[note.tier]}
                  </span>
                  <svg
                    className="w-4 h-4 text-text-muted transition-transform group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <div className="px-4 pb-3 pt-0">
                <p className="text-sm text-text-secondary">
                  {note.description}
                </p>
                {note.hasProfile && (
                  <Link
                    href={`/learn/notes/${note.slug}`}
                    className="inline-block mt-2 text-xs text-accent-primary hover:text-accent-primary-hover font-medium transition-colors"
                  >
                    Learn more about {note.name} &rarr;
                  </Link>
                )}
              </div>
            </details>
          ))}
        </div>
      )}

      {/* Quick links */}
      <div className="flex flex-wrap gap-2">
        {familySlug && (
          <Link
            href={`/learn/families/${familySlug}`}
            className="px-3 py-1.5 bg-surface-elevated border border-border-default rounded-full text-sm text-text-secondary hover:border-border-strong hover:text-text-primary transition-colors"
          >
            What is {family}?
          </Link>
        )}
        <Link
          href="/learn/fragrance-101"
          className="px-3 py-1.5 bg-surface-elevated border border-border-default rounded-full text-sm text-text-secondary hover:border-border-strong hover:text-text-primary transition-colors"
        >
          What is {concentration}?
        </Link>
      </div>
    </div>
  );
}
