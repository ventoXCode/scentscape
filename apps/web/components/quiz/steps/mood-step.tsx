interface MoodStepProps {
  value: string[];
  onChange: (moods: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const MOODS = [
  {
    id: "confident",
    label: "Confident",
    description: "Bold and commanding — makes a statement",
    color: "bg-slate-100 border-slate-300",
  },
  {
    id: "romantic",
    label: "Romantic",
    description: "Sensual and alluring — warm and inviting",
    color: "bg-rose-100 border-rose-300",
  },
  {
    id: "fresh",
    label: "Fresh",
    description: "Clean and invigorating — like a breath of air",
    color: "bg-cyan-100 border-cyan-300",
  },
  {
    id: "cozy",
    label: "Cozy",
    description: "Warm and comforting — like a soft blanket",
    color: "bg-amber-100 border-amber-300",
  },
  {
    id: "mysterious",
    label: "Mysterious",
    description: "Dark and intriguing — leaves them wanting more",
    color: "bg-violet-100 border-violet-300",
  },
  {
    id: "playful",
    label: "Playful",
    description: "Bright and fun — light-hearted and cheerful",
    color: "bg-yellow-100 border-yellow-300",
  },
];

export function MoodStep({ value, onChange, onNext, onBack }: MoodStepProps) {
  const toggleMood = (moodId: string) => {
    if (value.includes(moodId)) {
      onChange(value.filter((m) => m !== moodId));
    } else {
      onChange([...value, moodId]);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">What mood do you want to project?</h2>
      <p className="text-gray-600 mb-8">Select all that resonate with you</p>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {MOODS.map((mood) => (
          <button
            key={mood.id}
            onClick={() => toggleMood(mood.id)}
            className={`p-6 rounded-lg border-2 text-left transition-all ${
              value.includes(mood.id)
                ? `${mood.color} border-black`
                : "bg-white border-gray-200 hover:border-gray-400"
            }`}
          >
            <p className="font-semibold mb-1">{mood.label}</p>
            <p className="text-sm text-gray-600">{mood.description}</p>
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
