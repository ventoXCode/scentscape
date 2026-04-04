interface IntensityStepProps {
  value: "light" | "moderate" | "bold" | null;
  occasions: string[];
  onChange: (
    intensity: "light" | "moderate" | "bold" | null,
    occasions: string[]
  ) => void;
  onNext: () => void;
  onBack: () => void;
}

const INTENSITIES = [
  {
    id: "light" as const,
    label: "Light",
    description: "Subtle and close to the skin — polite and understated",
    color: "bg-sky-100 border-sky-300",
  },
  {
    id: "moderate" as const,
    label: "Moderate",
    description: "Noticeable but not overwhelming — balanced projection",
    color: "bg-indigo-100 border-indigo-300",
  },
  {
    id: "bold" as const,
    label: "Bold",
    description: "Commanding presence — leaves a lasting trail",
    color: "bg-stone-100 border-stone-300",
  },
];

const OCCASIONS = [
  "Office",
  "Date Night",
  "Casual",
  "Special Event",
  "Outdoor",
];

export function IntensityStep({
  value,
  occasions,
  onChange,
  onNext,
  onBack,
}: IntensityStepProps) {
  const handleIntensitySelect = (intensity: "light" | "moderate" | "bold") => {
    onChange(intensity, occasions);
  };

  const toggleOccasion = (occasion: string) => {
    const updated = occasions.includes(occasion)
      ? occasions.filter((o) => o !== occasion)
      : [...occasions, occasion];
    onChange(value, updated);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">How strong do you like your fragrance?</h2>
      <p className="text-gray-600 mb-8">
        Choose an intensity and the occasions you&apos;ll wear it for
      </p>

      {/* Intensity selection */}
      <div className="flex flex-col gap-4 mb-8">
        {INTENSITIES.map((intensity) => (
          <button
            key={intensity.id}
            onClick={() => handleIntensitySelect(intensity.id)}
            className={`p-6 rounded-lg border-2 text-left transition-all ${
              value === intensity.id
                ? `${intensity.color} border-black`
                : "bg-white border-gray-200 hover:border-gray-400"
            }`}
          >
            <p className="font-semibold mb-1">{intensity.label}</p>
            <p className="text-sm text-gray-600">{intensity.description}</p>
          </button>
        ))}
      </div>

      {/* Occasion selection */}
      <div className="mb-8">
        <h3 className="font-semibold mb-3">Where will you wear it?</h3>
        <p className="text-sm text-gray-500 mb-4">Select all that apply</p>
        <div className="flex flex-wrap gap-3">
          {OCCASIONS.map((occasion) => (
            <button
              key={occasion}
              onClick={() => toggleOccasion(occasion)}
              className={`px-4 py-2 rounded-full border-2 text-sm transition-all ${
                occasions.includes(occasion)
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-500"
              }`}
            >
              {occasion}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button onClick={onBack} className="px-6 py-3 border rounded">
          Back
        </button>
        <button
          onClick={onNext}
          disabled={value === null}
          className="flex-1 px-6 py-3 bg-black text-white rounded disabled:opacity-50"
        >
          See My Matches
        </button>
      </div>
    </div>
  );
}
