import Link from "next/link";

// Map accord names to fragrance family design tokens
const ACCORD_FAMILY_MAP: Record<string, string> = {
  Woody: "woody",
  Earthy: "woody",
  Oud: "woody",
  Sandalwood: "woody",
  Vetiver: "woody",
  Leathery: "woody",
  Smoky: "woody",
  Fresh: "fresh",
  Aquatic: "fresh",
  Green: "fresh",
  Floral: "floral",
  "Fresh Floral": "floral",
  Powdery: "floral",
  Musky: "floral",
  Amber: "amber",
  "Warm Spicy": "amber",
  "Fresh Spicy": "amber",
  Sweet: "amber",
  Vanilla: "amber",
  Incense: "amber",
  Citrus: "citrus",
  Fruity: "citrus",
  Coffee: "aromatic",
  Aromatic: "aromatic",
};

// Tailwind classes must be statically analyzable
const FAMILY_CLASSES: Record<
  string,
  { bg: string; text: string; dot: string; border: string }
> = {
  fresh: {
    bg: "bg-family-fresh-subtle",
    text: "text-family-fresh",
    dot: "bg-family-fresh",
    border: "border-family-fresh/20",
  },
  floral: {
    bg: "bg-family-floral-subtle",
    text: "text-family-floral",
    dot: "bg-family-floral",
    border: "border-family-floral/20",
  },
  amber: {
    bg: "bg-family-amber-subtle",
    text: "text-family-amber",
    dot: "bg-family-amber",
    border: "border-family-amber/20",
  },
  woody: {
    bg: "bg-family-woody-subtle",
    text: "text-family-woody",
    dot: "bg-family-woody",
    border: "border-family-woody/20",
  },
  citrus: {
    bg: "bg-family-citrus-subtle",
    text: "text-family-citrus",
    dot: "bg-family-citrus",
    border: "border-family-citrus/20",
  },
  aromatic: {
    bg: "bg-family-aromatic-subtle",
    text: "text-family-aromatic",
    dot: "bg-family-aromatic",
    border: "border-family-aromatic/20",
  },
};

function getAccordClasses(accord: string) {
  const family = ACCORD_FAMILY_MAP[accord] ?? "woody";
  return FAMILY_CLASSES[family] ?? FAMILY_CLASSES.woody;
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
