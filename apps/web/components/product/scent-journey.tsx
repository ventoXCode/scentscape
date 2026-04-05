import { getNoteDescription } from "@/lib/fragrance/note-descriptions";

interface ScentJourneyProps {
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
}

const PHASES = [
  {
    key: "top",
    label: "Opening",
    time: "First 15\u201330 minutes",
    narrative: (notes: string[]) =>
      notes.length > 0
        ? `The fragrance opens with ${describeNotes(notes)}, creating a ${getOpeningMood(notes)} first impression.`
        : null,
    dotClass: "bg-family-citrus",
    lineClass: "bg-family-citrus/30",
  },
  {
    key: "heart",
    label: "Heart",
    time: "30 minutes \u2013 2 hours",
    narrative: (notes: string[]) =>
      notes.length > 0
        ? `As the opening fades, ${describeNotes(notes)} ${notes.length === 1 ? "emerges" : "emerge"} at the heart, adding ${getHeartMood(notes)} to the composition.`
        : null,
    dotClass: "bg-family-floral",
    lineClass: "bg-family-floral/30",
  },
  {
    key: "base",
    label: "Drydown",
    time: "2+ hours",
    narrative: (notes: string[]) =>
      notes.length > 0
        ? `The fragrance settles into ${describeNotes(notes)}, leaving a ${getBaseMood(notes)} trail that lingers on the skin.`
        : null,
    dotClass: "bg-family-woody",
    lineClass: "bg-family-woody/30",
  },
] as const;

function describeNotes(notes: string[]): string {
  // Use sensory descriptions where available, fall back to note names
  const described = notes.slice(0, 3).map((note) => {
    const desc = getNoteDescription(note);
    if (desc) {
      // Use just the note name in the narrative (descriptions shown elsewhere)
      return note.toLowerCase();
    }
    return note.toLowerCase();
  });

  if (described.length === 1) return described[0];
  if (described.length === 2) return `${described[0]} and ${described[1]}`;
  return `${described.slice(0, -1).join(", ")}, and ${described[described.length - 1]}`;
}

// Mood words derived from common note characteristics
function getOpeningMood(notes: string[]): string {
  const joined = notes.join(" ").toLowerCase();
  if (/bergamot|lemon|lime|grapefruit|citrus|yuzu|mandarin/.test(joined))
    return "bright and energizing";
  if (/rose|jasmine|violet|peony|floral/.test(joined))
    return "fresh and floral";
  if (/pepper|ginger|cardamom|saffron/.test(joined))
    return "warm and spicy";
  if (/lavender|mint|basil/.test(joined)) return "fresh and aromatic";
  return "captivating";
}

function getHeartMood(notes: string[]): string {
  const joined = notes.join(" ").toLowerCase();
  if (/rose|jasmine|tuberose|ylang|peony|orchid/.test(joined))
    return "richness and romance";
  if (/cinnamon|cardamom|clove|pepper|nutmeg/.test(joined))
    return "warmth and complexity";
  if (/iris|violet|heliotrope|powdery/.test(joined))
    return "elegance and softness";
  if (/geranium|lavender|neroli/.test(joined))
    return "freshness and depth";
  return "depth and character";
}

function getBaseMood(notes: string[]): string {
  const joined = notes.join(" ").toLowerCase();
  if (/vanilla|tonka|caramel|honey|chocolate/.test(joined))
    return "warm and comforting";
  if (/oud|leather|smoky|tobacco|birch/.test(joined))
    return "dark and mysterious";
  if (/sandalwood|cedar|vetiver|patchouli/.test(joined))
    return "smooth and woody";
  if (/musk|amber|benzoin|labdanum/.test(joined))
    return "sensual and enveloping";
  return "lasting and memorable";
}

export function ScentJourney({
  topNotes,
  heartNotes,
  baseNotes,
}: ScentJourneyProps) {
  const notesByKey = { top: topNotes, heart: heartNotes, base: baseNotes };
  const hasNotes = topNotes.length > 0 || heartNotes.length > 0 || baseNotes.length > 0;

  if (!hasNotes) return null;

  return (
    <div className="mb-8">
      <h3 className="font-semibold mb-4 text-text-primary font-display text-lg">
        The Scent Journey
      </h3>
      <div className="space-y-0">
        {PHASES.map((phase, i) => {
          const notes = notesByKey[phase.key as keyof typeof notesByKey];
          const narrative = phase.narrative(notes);
          if (!narrative) return null;

          const isLast = i === PHASES.length - 1;

          return (
            <div key={phase.key} className="flex gap-4">
              {/* Timeline column */}
              <div className="flex flex-col items-center flex-shrink-0 w-6">
                <div
                  className={`w-3 h-3 rounded-full ${phase.dotClass} flex-shrink-0 mt-1`}
                  aria-hidden="true"
                />
                {!isLast && (
                  <div
                    className={`w-0.5 flex-1 ${phase.lineClass}`}
                    aria-hidden="true"
                  />
                )}
              </div>

              {/* Content */}
              <div className={`pb-6 ${isLast ? "pb-0" : ""}`}>
                <div className="flex items-baseline gap-2 mb-1">
                  <p className="text-sm font-semibold text-text-primary">
                    {phase.label}
                  </p>
                  <p className="text-xs text-text-muted">{phase.time}</p>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {narrative}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
