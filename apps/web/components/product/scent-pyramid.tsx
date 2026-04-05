import { getNoteDescription } from "@/lib/fragrance/note-descriptions";

interface ScentPyramidProps {
  top: string[];
  heart: string[];
  base: string[];
}

const TIERS = [
  {
    key: "top" as const,
    label: "Top Notes",
    subtitle: "First impression \u00b7 fades in 15\u201330 minutes",
    widthClass: "w-[72%]",
    bgClass: "bg-family-citrus-subtle",
    chipBgClass:
      "bg-white/70 text-family-citrus border border-family-citrus/20",
    labelClass: "text-family-citrus",
    dotClass: "bg-family-citrus",
  },
  {
    key: "heart" as const,
    label: "Heart Notes",
    subtitle: "The heart \u00b7 emerges after 30 minutes",
    widthClass: "w-[86%]",
    bgClass: "bg-family-floral-subtle",
    chipBgClass:
      "bg-white/70 text-family-floral border border-family-floral/20",
    labelClass: "text-family-floral",
    dotClass: "bg-family-floral",
  },
  {
    key: "base" as const,
    label: "Base Notes",
    subtitle: "The foundation \u00b7 lingers for hours",
    widthClass: "w-full",
    bgClass: "bg-family-woody-subtle",
    chipBgClass: "bg-white/70 text-family-woody border border-family-woody/20",
    labelClass: "text-family-woody",
    dotClass: "bg-family-woody",
  },
] as const;

function NoteChip({ note, chipClass }: { note: string; chipClass: string }) {
  const description = getNoteDescription(note);

  return (
    <span className="relative group/note inline-flex">
      <span
        className={`px-2.5 py-1 rounded-lg text-sm font-medium cursor-default transition-shadow duration-200 group-hover/note:shadow-sm ${chipClass}`}
      >
        {note}
      </span>
      {description && (
        <span
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/note:opacity-100 pointer-events-none transition-opacity duration-200 bg-text-primary text-text-inverse text-xs rounded-lg px-3 py-2 w-48 text-center z-10 shadow-elevated whitespace-normal"
          role="tooltip"
        >
          {description}
          <span
            className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-text-primary"
            aria-hidden="true"
          />
        </span>
      )}
    </span>
  );
}

export function ScentPyramid({ top, heart, base }: ScentPyramidProps) {
  const notes = { top, heart, base };

  return (
    <div className="flex flex-col items-center gap-1.5">
      {TIERS.map((tier) => {
        const tierNotes = notes[tier.key];
        return (
          <div key={tier.key} className={`${tier.widthClass} mx-auto`}>
            <div className={`${tier.bgClass} rounded-xl px-5 py-4`}>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${tier.dotClass} flex-shrink-0`}
                  aria-hidden="true"
                />
                <p
                  className={`text-xs uppercase tracking-wider font-semibold ${tier.labelClass}`}
                >
                  {tier.label}
                </p>
              </div>
              <p className="text-[11px] text-text-muted mb-3 ml-3.5">
                {tier.subtitle}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {tierNotes.map((note) => (
                  <NoteChip
                    key={note}
                    note={note}
                    chipClass={tier.chipBgClass}
                  />
                ))}
                {tierNotes.length === 0 && (
                  <span className="text-sm text-text-muted italic">
                    &mdash;
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
