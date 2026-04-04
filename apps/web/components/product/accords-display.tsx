// Color map for common accord categories — falls back to neutral gray
const ACCORD_COLORS: Record<string, string> = {
  Woody: "bg-stone-100 text-stone-800",
  Earthy: "bg-stone-100 text-stone-800",
  Oud: "bg-stone-200 text-stone-900",
  Sandalwood: "bg-amber-50 text-amber-900",
  Vetiver: "bg-stone-100 text-stone-800",
  Fresh: "bg-cyan-50 text-cyan-800",
  Aquatic: "bg-cyan-100 text-cyan-900",
  Citrus: "bg-yellow-50 text-yellow-800",
  Green: "bg-green-50 text-green-800",
  Aromatic: "bg-teal-50 text-teal-800",
  Floral: "bg-pink-50 text-pink-800",
  "Fresh Floral": "bg-pink-50 text-pink-800",
  Amber: "bg-amber-100 text-amber-900",
  "Warm Spicy": "bg-orange-50 text-orange-800",
  "Fresh Spicy": "bg-orange-50 text-orange-800",
  Sweet: "bg-pink-100 text-pink-900",
  Vanilla: "bg-amber-50 text-amber-800",
  Musky: "bg-purple-50 text-purple-800",
  Powdery: "bg-purple-50 text-purple-800",
  Leathery: "bg-stone-200 text-stone-900",
  Smoky: "bg-gray-200 text-gray-900",
  Incense: "bg-gray-200 text-gray-800",
  Fruity: "bg-red-50 text-red-800",
  Coffee: "bg-amber-200 text-amber-900",
};

function getAccordColor(accord: string): string {
  return ACCORD_COLORS[accord] ?? "bg-gray-100 text-gray-700";
}

interface AccordsDisplayProps {
  accords: string[];
}

export function AccordsDisplay({ accords }: AccordsDisplayProps) {
  if (!accords || accords.length === 0) return null;

  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-2">Main Accords</h3>
      <div className="flex flex-wrap gap-2">
        {accords.map((accord) => (
          <span
            key={accord}
            className={`px-3 py-1 rounded-full text-sm font-medium ${getAccordColor(accord)}`}
          >
            {accord}
          </span>
        ))}
      </div>
    </div>
  );
}
