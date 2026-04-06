import Link from "next/link";
import { ACCORD_FAMILY_MAP, FAMILIES, type FamilySlug } from "@/lib/fragrance/family-config";

function getAccordClasses(accord: string) {
  const slug = (ACCORD_FAMILY_MAP[accord] ?? "woody") as FamilySlug;
  const family = FAMILIES[slug] ?? FAMILIES.woody;
  return {
    bg: family.classes.bgSubtle,
    text: family.classes.text,
    dot: family.classes.dot,
    border: `${family.classes.border}/20`,
  };
}

interface AccordsDisplayProps {
  accords: string[];
}

export function AccordsDisplay({ accords }: AccordsDisplayProps) {
  if (!accords || accords.length === 0) return null;

  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-3 text-text-primary">Main Accords</h3>
      <div className="flex flex-wrap gap-2">
        {accords.map((accord, i) => {
          const classes = getAccordClasses(accord);
          // First 3 accords are primary (larger), rest are secondary
          const isPrimary = i < 3;

          return (
            <Link
              key={accord}
              href={`/search?accords=${encodeURIComponent(accord)}`}
              className={`inline-flex items-center gap-1.5 rounded-lg border font-medium transition-all duration-200 hover:shadow-sm ${classes.bg} ${classes.text} ${classes.border} ${isPrimary ? "px-3.5 py-2 text-sm" : "px-2.5 py-1.5 text-xs"}`}
            >
              <span
                className={`rounded-full flex-shrink-0 ${classes.dot} ${isPrimary ? "w-2.5 h-2.5" : "w-2 h-2"}`}
                aria-hidden="true"
              />
              {accord}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
