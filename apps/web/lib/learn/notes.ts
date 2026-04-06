import { NOTE_DESCRIPTIONS } from "@/lib/fragrance/note-descriptions";

export interface NoteProfile {
  slug: string;
  name: string;
  description: string;
  family: string;
  familySlug: string;
}

const NOTE_FAMILIES: Record<string, { family: string; familySlug: string }> = {};

// Map each note to its family based on the groupings in note-descriptions.ts
const familyMappings: [string[], string, string][] = [
  [["Bergamot", "Lemon", "Orange", "Grapefruit", "Mandarin", "Lime", "Yuzu", "Neroli", "Blood Orange", "Petitgrain"], "Citrus", "citrus"],
  [["Rose", "Jasmine", "Iris", "Violet", "Tuberose", "Orange Blossom", "Lily of the Valley", "Peony", "Magnolia", "Ylang-Ylang", "Geranium", "Freesia", "Heliotrope", "Orchid"], "Floral", "floral"],
  [["Sandalwood", "Cedar", "Cedarwood", "Vetiver", "Patchouli", "Oud", "Birch", "Guaiac Wood", "Pine", "Cypress", "Teak"], "Woody", "woody"],
  [["Cardamom", "Cinnamon", "Black Pepper", "Pink Pepper", "Saffron", "Clove", "Ginger", "Nutmeg", "Star Anise", "Cumin"], "Spicy", "aromatic"],
  [["Vanilla", "Tonka Bean", "Caramel", "Honey", "Chocolate", "Coffee", "Praline", "Brown Sugar"], "Sweet & Gourmand", "amber"],
  [["Amber", "Benzoin", "Frankincense", "Myrrh", "Labdanum", "Copal", "Elemi"], "Amber & Resin", "amber"],
  [["Mint", "Basil", "Lavender", "Rosemary", "Tea", "Green Tea", "White Tea", "Thyme", "Sage", "Chamomile"], "Fresh & Herbal", "fresh"],
  [["Musk", "White Musk", "Leather", "Ambergris", "Castoreum", "Suede"], "Animalic & Musky", "amber"],
  [["Peach", "Apple", "Raspberry", "Plum", "Fig", "Coconut", "Pear", "Blackcurrant", "Cherry", "Apricot"], "Fruity", "fresh"],
  [["Sea Salt", "Ocean Breeze", "Ozone"], "Aquatic & Ozonic", "fresh"],
  [["Incense", "Tobacco", "Moss", "Oak Moss"], "Smoky & Earthy", "woody"],
];

for (const [notes, family, familySlug] of familyMappings) {
  for (const note of notes) {
    NOTE_FAMILIES[note] = { family, familySlug };
  }
}

function toSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export const ALL_NOTES: NoteProfile[] = Object.entries(NOTE_DESCRIPTIONS)
  .map(([name, description]) => ({
    slug: toSlug(name),
    name,
    description,
    family: NOTE_FAMILIES[name]?.family ?? "Other",
    familySlug: NOTE_FAMILIES[name]?.familySlug ?? "amber",
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

export function getNoteBySlug(slug: string): NoteProfile | undefined {
  return ALL_NOTES.find((n) => n.slug === slug);
}

/** Group notes by their scent family */
export function getNotesByFamily(): Record<string, NoteProfile[]> {
  const grouped: Record<string, NoteProfile[]> = {};
  for (const note of ALL_NOTES) {
    if (!grouped[note.family]) grouped[note.family] = [];
    grouped[note.family].push(note);
  }
  return grouped;
}
