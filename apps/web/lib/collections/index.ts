export interface Collection {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  editorial: string;
  icon: string;
  searchFilter: string;
  searchSort?: string[];
  image?: string;
  familyColor: string;
}

export const COLLECTIONS: Collection[] = [
  {
    slug: "date-night",
    title: "Date Night",
    tagline: "Make an impression that lingers",
    description: "Alluring and memorable scents for romantic evenings",
    editorial:
      "These fragrances are chosen for their magnetic quality \u2014 warm, sensual, and impossible to ignore. Each one tells a story of sophistication and intimacy, designed to leave a lasting impression.",
    icon: "\ud83d\udc95",
    searchFilter: 'occasion = "Date Night"',
    familyColor: "floral",
  },
  {
    slug: "office-safe",
    title: "Office Appropriate",
    tagline: "Sophisticated without overwhelming",
    description: "Sophisticated scents that won\u2019t overwhelm the conference room",
    editorial:
      "The art of office fragrance is in restraint. These selections project professionalism and polish \u2014 clean enough for close quarters, complex enough to feel personal.",
    icon: "\ud83d\udcbc",
    searchFilter: 'occasion = "Office"',
    familyColor: "fresh",
  },
  {
    slug: "summer-fresh",
    title: "Summer Fresh",
    tagline: "Sunshine in a bottle",
    description: "Light, refreshing fragrances perfect for warm weather",
    editorial:
      "When the temperature rises, reach for these \u2014 bright citrus openings, aquatic hearts, and clean finishes that feel like a breeze on bare skin.",
    icon: "\u2600\ufe0f",
    searchFilter: 'season = "Summer" AND family = "Fresh"',
    familyColor: "citrus",
  },
  {
    slug: "cozy-winter",
    title: "Cozy Winter",
    tagline: "Warmth you can wear",
    description: "Warm, enveloping scents for cold days",
    editorial:
      "These fragrances are like cashmere for your skin \u2014 rich amber, velvety woods, and gourmand touches that wrap around you like a favorite blanket.",
    icon: "\u2744\ufe0f",
    searchFilter:
      'season = "Winter" AND (family = "Amber" OR family = "Woody")',
    familyColor: "amber",
  },
  {
    slug: "woody",
    title: "Woody Wonders",
    tagline: "Grounded, earthy, timeless",
    description: "Earthy, grounding scents with sandalwood, cedar, and vetiver",
    editorial:
      "From the creamy warmth of sandalwood to the smoky depth of oud, woody fragrances are the backbone of perfumery. These selections showcase the family\u2019s remarkable range.",
    icon: "\ud83c\udf3f",
    searchFilter: 'family = "Woody"',
    familyColor: "woody",
  },
  {
    slug: "floral",
    title: "Floral Fantasies",
    tagline: "Nature\u2019s most beautiful bouquets",
    description: "Elegant bouquets from rose to jasmine to tuberose",
    editorial:
      "Florals are the heart of fragrance. From the delicate sweetness of peony to the heady intoxication of tuberose, this collection celebrates flowers in all their complexity.",
    icon: "\ud83c\udf3a",
    searchFilter: 'family = "Floral"',
    familyColor: "floral",
  },
  // ── Dynamic / Cross-cutting Collections ──────────────────────────
  {
    slug: "best-for-beginners",
    title: "Best for Beginners",
    tagline: "Gentle, approachable, crowd-pleasing",
    description: "Fragrances with gentle projection — perfect for your first signature scent",
    editorial:
      "Starting your fragrance journey? These are the ones we'd hand you first. Gentle sillage means they stay close to your skin, never overwhelming — letting you build confidence before going bolder.",
    icon: "🌱",
    searchFilter: "sillage <= 2.5",
    searchSort: ["sillage:asc"],
    familyColor: "fresh",
  },
  {
    slug: "long-lasting-legends",
    title: "Long-Lasting Legends",
    tagline: "One spray, all day",
    description: "Fragrances with exceptional longevity that last from morning to midnight",
    editorial:
      "These aren't just fragrances — they're commitments. Spray once in the morning and they'll still be turning heads at dinner. The secret? Rich base notes and concentrated formulations that refuse to fade.",
    icon: "⏳",
    searchFilter: "longevity >= 4",
    searchSort: ["longevity:desc"],
    familyColor: "amber",
  },
  {
    slug: "spring-picks",
    title: "Spring Picks",
    tagline: "Fresh starts, fresh scents",
    description: "Light, floral, and green fragrances that capture the spirit of spring",
    editorial:
      "As the world wakes up from winter, so should your fragrance. These picks channel blooming gardens, morning dew, and the crisp energy of renewal — the olfactory equivalent of throwing open the windows.",
    icon: "🌷",
    searchFilter: 'season = "Spring"',
    familyColor: "floral",
  },
  {
    slug: "under-150",
    title: "Under $150",
    tagline: "Great scents, friendly prices",
    description: "Quality fragrances that don't break the bank — all under $150",
    editorial:
      "Price doesn't determine quality in fragrance. These selections prove you can smell incredible without the luxury markup. Every one has been chosen for character and performance, not just affordability.",
    icon: "💎",
    searchFilter: "price <= 15000",
    familyColor: "citrus",
  },
];

export function getCollectionBySlug(slug: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.slug === slug);
}
