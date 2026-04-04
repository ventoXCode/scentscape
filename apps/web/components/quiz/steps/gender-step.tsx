interface GenderStepProps {
  value: "masculine" | "feminine" | "unisex" | null;
  onChange: (gender: "masculine" | "feminine" | "unisex") => void;
  onNext: () => void;
}

const GENDERS = [
  {
    id: "masculine" as const,
    label: "Masculine",
    description: "Bold, woody, and traditionally masculine",
    color: "bg-slate-100 border-slate-300",
  },
  {
    id: "feminine" as const,
    label: "Feminine",
    description: "Floral, soft, and traditionally feminine",
    color: "bg-rose-100 border-rose-300",
  },
  {
    id: "unisex" as const,
    label: "No Preference",
    description: "Show me everything — gender is just a starting point",
    color: "bg-purple-100 border-purple-300",
  },
];

export function GenderStep({ value, onChange, onNext }: GenderStepProps) {
  const handleSelect = (gender: "masculine" | "feminine" | "unisex") => {
    onChange(gender);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">What are you shopping for?</h2>
      <p className="text-gray-600 mb-8">
        This helps us narrow down initial recommendations
      </p>

      <div className="flex flex-col gap-4 mb-8">
        {GENDERS.map((gender) => (
          <button
            key={gender.id}
            onClick={() => handleSelect(gender.id)}
            className={`p-6 rounded-lg border-2 text-left transition-all ${
              value === gender.id
                ? `${gender.color} border-black`
                : "bg-white border-gray-200 hover:border-gray-400"
            }`}
          >
            <p className="font-semibold mb-1">{gender.label}</p>
            <p className="text-sm text-gray-600">{gender.description}</p>
          </button>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={value === null}
        className="w-full px-6 py-3 bg-black text-white rounded disabled:opacity-50"
      >
        Continue
      </button>
    </div>
  );
}
