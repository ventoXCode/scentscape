interface PerformanceRatingsProps {
  longevity: number | null;
  sillage: number | null;
  projection: number | null;
}

function RatingBar({ label, value }: { label: string; value: number | null }) {
  const percentage = value ? (value / 5) * 100 : 0;

  return (
    <div className="flex items-center gap-4">
      <span id={`rating-${label.toLowerCase()}`} className="w-24 text-sm text-gray-600 flex-shrink-0">{label}</span>
      <div
        className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={value ?? undefined}
        aria-valuemin={0}
        aria-valuemax={5}
        aria-labelledby={`rating-${label.toLowerCase()}`}
      >
        <div
          className="h-full bg-black rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="w-8 text-sm text-gray-600 text-right flex-shrink-0" aria-hidden="true">
        {value != null ? value.toFixed(1) : "—"}
      </span>
    </div>
  );
}

export function PerformanceRatings({
  longevity,
  sillage,
  projection,
}: PerformanceRatingsProps) {
  return (
    <div className="my-6">
      <h3 className="font-semibold mb-3">Performance</h3>
      <div className="space-y-3">
        <RatingBar label="Longevity" value={longevity} />
        <RatingBar label="Sillage" value={sillage} />
        <RatingBar label="Projection" value={projection} />
      </div>
    </div>
  );
}
