export interface Collection {
  slug: string;
  title: string;
  description: string;
  searchFilter: string;
  image?: string;
}

export const COLLECTIONS: Collection[] = [
  {
    slug: "date-night",
    title: "Date Night",
    description: "Alluring and memorable scents for romantic evenings",
    searchFilter: 'occasion = "Date Night"',
  },
  {
    slug: "office-safe",
    title: "Office Appropriate",
    description: "Sophisticated scents that won't overwhelm the conference room",
    searchFilter: 'occasion = "Office"',
  },
  {
    slug: "summer-fresh",
    title: "Summer Fresh",
    description: "Light, refreshing fragrances perfect for warm weather",
    searchFilter: 'season = "Summer" AND family = "Fresh"',
  },
  {
    slug: "cozy-winter",
    title: "Cozy Winter",
    description: "Warm, enveloping scents for cold days",
    searchFilter: 'season = "Winter" AND (family = "Amber" OR family = "Woody")',
  },
  {
    slug: "woody",
    title: "Woody Wonders",
    description: "Earthy, grounding scents with sandalwood, cedar, and vetiver",
    searchFilter: 'family = "Woody"',
  },
  {
    slug: "floral",
    title: "Floral Fantasies",
    description: "Elegant bouquets from rose to jasmine to tuberose",
    searchFilter: 'family = "Floral"',
  },
];

export function getCollectionBySlug(slug: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.slug === slug);
}
