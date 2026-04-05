interface FamilyStepProps {
  value: string[];
  onChange: (families: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const FAMILIES = [
  {
    id: "Fresh",
    name: "Fresh",
    description: "Citrus, aquatic, and green notes",
    color: "bg-cyan-100 border-cyan-300",
  },
  {
    id: "Floral",
    name: "Floral",
    description: "Rose, jasmine, and flower bouquets",
    color: "bg-pink-100 border-pink-300",
  },
  {
    id: "Amber",
    name: "Amber",
    description: "Warm, sweet, and resinous",
    color: "bg-amber-100 border-amber-300",
  },
  {
    id: "Woody",
    name: "Woody",
    description: "Sandalwood, cedar, and vetiver",
    color: "bg-stone-100 border-stone-300",
  },
];

export function FamilyStep({ value, onChange, onNext, onBack }: FamilyStepProps) {
  const toggleFamily = (familyId: string) => {
    if (value.includes(familyId)) {
      onChange(value.filter((f) => f !== familyId));
    } else {
      onChange([...value, familyId]);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">What scent families appeal to you?</h2>
      <p className="text-gray-600 mb-8">Select all that interest you</p>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {FAMILIES.map((family) => (
          <button
            key={family.id}
            onClick={() => toggleFamily(family.id)}
            className={`p-6 rounded-lg border-2 text-left transition-all ${
              value.includes(family.id)
                ? `${family.color} border-black`
                : "bg-white border-gray-200 hover:border-gray-400"
            }`}
          >
            <p className="font-semibold mb-1">{family.name}</p>
            <p className="text-sm text-gray-600">{family.description}</p>
          </button>
        ))}
      </div>

      <div className="flex gap-4">
        <button onClick={onBack} className="px-6 py-3 border rounded">
          Back
        </button>
        <button
          onClick={onNext}
          disabled={value.length === 0}
          className="flex-1 px-6 py-3 bg-black text-white rounded disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
