import { Archetype, PersonalityDimensions } from "./types";

// 10 scent personality archetypes spread across the 4D personality space.
// Archetype matching uses Euclidean distance from user's accumulated dimensions.

export const ARCHETYPES: Archetype[] = [
  {
    id: "velvet-dusk",
    name: "Velvet Dusk",
    tagline: "Drawn to rich, enveloping warmth that feels like a beautiful secret",
    description:
      "You're captivated by depth and texture. Your ideal scent wraps around you like crushed velvet — warm amber, soft musk, and smoldering resins that reveal new facets as the hours pass. You don't need to announce yourself; your presence lingers naturally.",
    gradient: "from-purple-900 via-purple-800 to-amber-900",
    textColor: "text-purple-100",
    accentColor: "text-amber-300",
    dimensions: { warmthFreshness: 0.8, boldnessSubtlety: 0.5, classicAvantgarde: -0.3, intimateProjecting: -0.4 },
    familyAffinities: { Amber: 0.9, Oriental: 0.8, Woody: 0.5, Floral: 0.3 },
    accordAffinities: ["Vanilla", "Musk", "Amber", "Incense", "Resin", "Warm Spicy"],
  },
  {
    id: "morning-mist",
    name: "Morning Mist",
    tagline: "You gravitate toward clean, airy scents that feel effortlessly natural",
    description:
      "There's a clarity to your taste — you love the feeling of stepping outside on a crisp morning. Citrus zest, dewy greens, and transparent florals speak to you. Your scent is like a breath of fresh air that puts everyone around you at ease.",
    gradient: "from-sky-200 via-blue-100 to-cyan-200 dark:from-sky-900 dark:via-blue-900 dark:to-cyan-900",
    textColor: "text-sky-900 dark:text-sky-100",
    accentColor: "text-sky-600 dark:text-sky-300",
    dimensions: { warmthFreshness: -0.7, boldnessSubtlety: -0.6, classicAvantgarde: -0.2, intimateProjecting: 0.1 },
    familyAffinities: { Fresh: 0.9, Citrus: 0.8, Floral: 0.4, Aromatic: 0.3 },
    accordAffinities: ["Citrus", "Aquatic", "Green", "Ozonic", "Fresh", "Clean"],
  },
  {
    id: "gilded-ember",
    name: "Gilded Ember",
    tagline: "You command attention with rich, smoldering intensity",
    description:
      "You're drawn to power notes — oud, leather, dark spices that announce your arrival before you enter a room. Your fragrance is a statement piece, as intentional as a tailored suit. You appreciate craftsmanship, rarity, and scents with serious backbone.",
    gradient: "from-amber-800 via-orange-900 to-red-950",
    textColor: "text-amber-100",
    accentColor: "text-orange-300",
    dimensions: { warmthFreshness: 0.6, boldnessSubtlety: 0.9, classicAvantgarde: 0.4, intimateProjecting: 0.7 },
    familyAffinities: { Woody: 0.9, Oriental: 0.8, Amber: 0.6, Aromatic: 0.3 },
    accordAffinities: ["Oud", "Leather", "Spicy", "Smoky", "Woody", "Warm Spicy"],
  },
  {
    id: "silver-breeze",
    name: "Silver Breeze",
    tagline: "Modern freshness with an unexpected twist — never boring",
    description:
      "You appreciate innovation. While others reach for safe choices, you're intrigued by the unexpected — a metallic note, an unusual accord, freshness that feels futuristic rather than familiar. Your scent is conversation-worthy without being confrontational.",
    gradient: "from-slate-300 via-gray-200 to-zinc-300 dark:from-slate-800 dark:via-slate-700 dark:to-zinc-800",
    textColor: "text-slate-800 dark:text-slate-100",
    accentColor: "text-slate-600 dark:text-slate-300",
    dimensions: { warmthFreshness: -0.5, boldnessSubtlety: -0.3, classicAvantgarde: 0.6, intimateProjecting: -0.3 },
    familyAffinities: { Fresh: 0.7, Aromatic: 0.8, Woody: 0.4, Citrus: 0.3 },
    accordAffinities: ["Aromatic", "Aquatic", "Green", "Metallic", "Fresh", "Ozonic"],
  },
  {
    id: "crimson-bloom",
    name: "Crimson Bloom",
    tagline: "Lush, romantic scents that make an unforgettable entrance",
    description:
      "You love florals at their most intoxicating — not demure garden bouquets but headturning roses, jasmine at midnight, and tuberose that demands attention. Your fragrance is romantic, confident, and undeniably present.",
    gradient: "from-rose-800 via-pink-700 to-fuchsia-800",
    textColor: "text-rose-100",
    accentColor: "text-pink-300",
    dimensions: { warmthFreshness: 0.5, boldnessSubtlety: 0.4, classicAvantgarde: -0.3, intimateProjecting: 0.5 },
    familyAffinities: { Floral: 0.95, Oriental: 0.5, Amber: 0.4, Fresh: 0.2 },
    accordAffinities: ["Floral", "Rose", "Jasmine", "Sweet", "Musky", "Tuberose"],
  },
  {
    id: "jade-garden",
    name: "Jade Garden",
    tagline: "Natural, green elegance that feels grounded and authentic",
    description:
      "You find beauty in simplicity. Crushed leaves, herbal infusions, rain-soaked earth — your taste runs toward the organic and the real. Your scent feels like it grew from the ground, not from a laboratory. Understated but unmistakably refined.",
    gradient: "from-emerald-800 via-green-700 to-teal-800",
    textColor: "text-emerald-100",
    accentColor: "text-green-300",
    dimensions: { warmthFreshness: -0.4, boldnessSubtlety: -0.5, classicAvantgarde: -0.2, intimateProjecting: -0.5 },
    familyAffinities: { Fresh: 0.8, Woody: 0.5, Aromatic: 0.5, Citrus: 0.4 },
    accordAffinities: ["Green", "Herbal", "Citrus", "Tea", "Earthy", "Mossy"],
  },
  {
    id: "midnight-reverie",
    name: "Midnight Reverie",
    tagline: "Mysterious and complex — fragrance as self-expression",
    description:
      "You wear scent like art — layered, complex, and deeply personal. Incense smoke, dark woods, and resinous depth create an olfactory world that's uniquely yours. You don't follow trends; you set them. Your fragrance is an invitation to look closer.",
    gradient: "from-indigo-950 via-slate-900 to-violet-950",
    textColor: "text-indigo-200",
    accentColor: "text-violet-400",
    dimensions: { warmthFreshness: 0.3, boldnessSubtlety: 0.7, classicAvantgarde: 0.7, intimateProjecting: -0.2 },
    familyAffinities: { Oriental: 0.9, Woody: 0.8, Amber: 0.6, Aromatic: 0.3 },
    accordAffinities: ["Incense", "Oud", "Smoky", "Resin", "Dark", "Mystical"],
  },
  {
    id: "golden-hour",
    name: "Golden Hour",
    tagline: "Soft, radiant warmth that lingers — effortlessly memorable",
    description:
      "You're the golden light that makes everything look better. Your taste runs to soft ambers, creamy vanillas, and sun-kissed musks — scents that feel like a warm embrace. People lean in when you walk by, not because you're loud, but because you're irresistible.",
    gradient: "from-amber-300 via-yellow-200 to-orange-300 dark:from-amber-800 dark:via-yellow-900 dark:to-orange-900",
    textColor: "text-amber-900 dark:text-amber-100",
    accentColor: "text-orange-700 dark:text-orange-300",
    dimensions: { warmthFreshness: 0.6, boldnessSubtlety: -0.2, classicAvantgarde: -0.4, intimateProjecting: 0.3 },
    familyAffinities: { Amber: 0.8, Floral: 0.6, Oriental: 0.5, Fresh: 0.2 },
    accordAffinities: ["Amber", "Vanilla", "Powdery", "Soft", "Warm", "Musky"],
  },
  {
    id: "electric-noir",
    name: "Electric Noir",
    tagline: "Bold, modern, and unapologetic — you break the mold",
    description:
      "Rules? You rewrite them. You're drawn to scents that challenge expectations — sharp spices next to cool synthetics, leather with an electric edge. Your fragrance is a disruption in the best way, leaving people wondering what that was.",
    gradient: "from-zinc-900 via-neutral-800 to-cyan-950",
    textColor: "text-zinc-100",
    accentColor: "text-cyan-400",
    dimensions: { warmthFreshness: -0.3, boldnessSubtlety: 0.8, classicAvantgarde: 0.8, intimateProjecting: 0.6 },
    familyAffinities: { Aromatic: 0.8, Woody: 0.7, Fresh: 0.4, Oriental: 0.3 },
    accordAffinities: ["Spicy", "Leather", "Aromatic", "Synthetic", "Woody", "Metallic"],
  },
  {
    id: "silk-whisper",
    name: "Silk Whisper",
    tagline: "Delicate, powdery softness — a gentle embrace in scent form",
    description:
      "You appreciate the quietly beautiful. Your ideal scent is like cashmere against skin — soft musks, powdery iris, and delicate florals that feel almost like a second skin. You don't wear fragrance to impress; you wear it for the intimate pleasure of it.",
    gradient: "from-pink-200 via-rose-100 to-purple-200 dark:from-pink-900 dark:via-rose-900 dark:to-purple-900",
    textColor: "text-rose-900 dark:text-rose-100",
    accentColor: "text-pink-600 dark:text-pink-300",
    dimensions: { warmthFreshness: 0.4, boldnessSubtlety: -0.7, classicAvantgarde: -0.5, intimateProjecting: -0.6 },
    familyAffinities: { Floral: 0.8, Amber: 0.5, Fresh: 0.3, Oriental: 0.3 },
    accordAffinities: ["Powdery", "Musk", "Iris", "Rose", "Clean", "Soft"],
  },
];

/**
 * Find the closest archetype to the user's personality dimensions
 * using Euclidean distance in 4D space.
 */
export function matchArchetype(dimensions: PersonalityDimensions): Archetype {
  let bestMatch = ARCHETYPES[0];
  let bestDistance = Infinity;

  for (const archetype of ARCHETYPES) {
    const d = archetype.dimensions;
    const distance = Math.sqrt(
      (dimensions.warmthFreshness - d.warmthFreshness) ** 2 +
      (dimensions.boldnessSubtlety - d.boldnessSubtlety) ** 2 +
      (dimensions.classicAvantgarde - d.classicAvantgarde) ** 2 +
      (dimensions.intimateProjecting - d.intimateProjecting) ** 2
    );
    if (distance < bestDistance) {
      bestDistance = distance;
      bestMatch = archetype;
    }
  }

  return bestMatch;
}

/** Look up a static archetype definition by its ID. */
export function getArchetypeById(id: string): Archetype | undefined {
  return ARCHETYPES.find((a) => a.id === id);
}
