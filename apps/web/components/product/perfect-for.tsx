interface PerfectForProps {
  seasons: string[];
  occasions: string[];
  gender: string;
  concentration: string;
}

const SEASON_META: Record<string, { icon: string; vibe: string }> = {
  Spring: { icon: "\ud83c\udf38", vibe: "Fresh blooms and mild days" },
  Summer: { icon: "\u2600\ufe0f", vibe: "Warm weather and sunshine" },
  Fall: { icon: "\ud83c\udf42", vibe: "Crisp air and cozy layers" },
  Winter: { icon: "\u2744\ufe0f", vibe: "Cold nights and warm gatherings" },
};

const OCCASION_META: Record<string, { icon: string; vibe: string }> = {
  Casual: { icon: "\ud83d\udc4b", vibe: "Relaxed everyday wear" },
  Office: { icon: "\ud83d\udcbc", vibe: "Professional settings" },
  "Date Night": { icon: "\ud83d\udc95", vibe: "Romantic evenings" },
  "Special Event": { icon: "\u2728", vibe: "Memorable occasions" },
  Outdoor: { icon: "\ud83c\udf3f", vibe: "Open-air activities" },
  Evening: { icon: "\ud83c\udf19", vibe: "After-dark occasions" },
  Formal: { icon: "\ud83c\udf29\ufe0f", vibe: "Black-tie events" },
};

// Concentration mapped to a wear-tip
const CONCENTRATION_TIP: Record<string, string> = {
  EDC: "Light and refreshing \u2014 reapply as needed throughout the day",
  EDT: "Versatile strength \u2014 perfect for daily wear",
  EDP: "Rich and lasting \u2014 a couple of sprays will carry you through",
  Parfum: "Concentrated and luxurious \u2014 one or two spritzes is all you need",
  Extrait: "Ultra-concentrated \u2014 a single dab on pulse points lasts all day",
};

export function PerfectFor({
  seasons,
  occasions,
  gender,
  concentration,
}: PerfectForProps) {
  const hasSeasons = seasons.length > 0;
  const hasOccasions = occasions.length > 0;
  if (!hasSeasons && !hasOccasions) return null;

  const tip = CONCENTRATION_TIP[concentration];

  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-4 text-text-primary">Perfect For</h3>

      <div className="grid grid-cols-2 gap-2">
        {hasSeasons &&
          seasons.map((s) => {
            const meta = SEASON_META[s];
            return (
              <div
                key={s}
                className="flex items-center gap-2.5 rounded-lg bg-surface-subtle px-3 py-2.5"
              >
                <span className="text-base" aria-hidden="true">
                  {meta?.icon ?? "\ud83d\udcc5"}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-text-primary">{s}</p>
                  {meta?.vibe && (
                    <p className="text-xs text-text-muted truncate">
                      {meta.vibe}
                    </p>
                  )}
                </div>
              </div>
            );
          })}

        {hasOccasions &&
          occasions.map((o) => {
            const meta = OCCASION_META[o];
            return (
              <div
                key={o}
                className="flex items-center gap-2.5 rounded-lg bg-surface-subtle px-3 py-2.5"
              >
                <span className="text-base" aria-hidden="true">
                  {meta?.icon ?? "\ud83c\udf1f"}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-text-primary">{o}</p>
                  {meta?.vibe && (
                    <p className="text-xs text-text-muted truncate">
                      {meta.vibe}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
      </div>

      {/* Wear tip based on concentration */}
      {tip && (
        <p className="mt-3 text-xs text-text-muted italic">
          {tip}
        </p>
      )}
    </div>
  );
}
