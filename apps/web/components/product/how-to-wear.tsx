interface HowToWearProps {
  concentration: string;
  projection: number | null;
  seasons: string[];
}

const APPLICATION_TIPS: Record<string, string> = {
  EDC: "Eau de Cologne is light and refreshing. Apply generously to pulse points and reapply every 2\u20133 hours for a subtle scent cloud.",
  EDT: "Eau de Toilette has moderate staying power. Apply to warm pulse points for 4\u20136 hours of wear.",
  EDP: "Eau de Parfum is concentrated and long-lasting. Two to three sprays on pulse points is enough for all-day wear.",
  Parfum: "Parfum is highly concentrated \u2014 a single dab on each pulse point will last 8+ hours. Less is more.",
  Extrait: "Extrait de Parfum is the most concentrated form. Apply sparingly \u2014 a tiny dab on wrists and neck carries all day.",
};

const PULSE_POINTS = [
  { name: "Wrists", tip: "Spray and let dry \u2014 don\u2019t rub, as friction breaks down the molecules" },
  { name: "Neck", tip: "Apply to the sides where warmth helps diffuse the scent" },
  { name: "Behind ears", tip: "A warm spot that subtly releases fragrance up close" },
  { name: "Inner elbows", tip: "Creates a natural scent trail when you move your arms" },
];

export function HowToWear({ concentration, projection, seasons }: HowToWearProps) {
  const applicationTip = APPLICATION_TIPS[concentration] || APPLICATION_TIPS["EDP"];
  const isLowProjection = projection !== null && projection < 2.5;
  const isHighProjection = projection !== null && projection >= 4;

  return (
    <section className="mt-8">
      <h3 className="font-display text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
        <span className="text-xl" aria-hidden="true">&#x1F4A1;</span>
        How to Wear
      </h3>

      <div className="bg-surface-subtle rounded-xl p-5 space-y-4">
        <p className="text-text-secondary text-sm leading-relaxed">{applicationTip}</p>

        <div>
          <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2">
            Pulse Points
          </p>
          <div className="grid grid-cols-2 gap-2">
            {PULSE_POINTS.map((point) => (
              <div key={point.name} className="bg-surface-elevated rounded-lg p-3">
                <p className="text-sm font-medium text-text-primary">{point.name}</p>
                <p className="text-xs text-text-muted mt-0.5">{point.tip}</p>
              </div>
            ))}
          </div>
        </div>

        {isLowProjection && (
          <p className="text-xs text-text-muted italic">
            This fragrance sits close to the skin \u2014 apply to more pulse points or clothing for better presence.
          </p>
        )}
        {isHighProjection && (
          <p className="text-xs text-text-muted italic">
            This is a strong projector \u2014 go easy on the trigger. One or two sprays is plenty for most settings.
          </p>
        )}

        {seasons.length > 0 && (
          <p className="text-xs text-text-muted">
            Best worn in {seasons.join(" and ").toLowerCase()} \u2014 the temperature helps the fragrance bloom naturally.
          </p>
        )}
      </div>
    </section>
  );
}
