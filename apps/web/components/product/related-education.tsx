import Link from "next/link";
import { getNoteBySlug } from "@/lib/learn/notes";

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

export function RelatedEducation({
  family,
  concentration,
  topNotes,
  heartNotes,
  baseNotes,
}: RelatedEducationProps) {
  const familySlug = FAMILY_SLUG_MAP[family];

  // Pick up to 3 notable notes that have profile pages
  const allNotes = [...topNotes, ...heartNotes, ...baseNotes];
  const noteLinks = allNotes
    .map((name) => {
      const slug = toSlug(name);
      const profile = getNoteBySlug(slug);
      return profile ? { name, slug } : null;
    })
    .filter(Boolean)
    .slice(0, 3) as { name: string; slug: string }[];

  return (
    <div className="mt-8 p-5 bg-surface-subtle rounded-xl">
      <h3 className="font-semibold text-text-primary mb-3">
        Learn more about this fragrance
      </h3>
      <div className="flex flex-wrap gap-2">
        {familySlug && (
          <Link
            href={`/learn/families/${familySlug}`}
            className="px-3 py-1.5 bg-surface-elevated border border-border-default rounded-full text-sm text-text-secondary hover:border-border-strong hover:text-text-primary transition-colors"
          >
            What is {family}?
          </Link>
        )}
        {noteLinks.map((note) => (
          <Link
            key={note.slug}
            href={`/learn/notes/${note.slug}`}
            className="px-3 py-1.5 bg-surface-elevated border border-border-default rounded-full text-sm text-text-secondary hover:border-border-strong hover:text-text-primary transition-colors"
          >
            What is {note.name}?
          </Link>
        ))}
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
