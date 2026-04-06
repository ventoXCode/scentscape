export interface Guide {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  emoji: string;
  readTime: string;
  category: "beginner" | "practical" | "deep-dive";
}

export const GUIDES: Guide[] = [
  {
    slug: "fragrance-101",
    title: "Fragrance 101",
    tagline: "Everything you need to know to get started",
    description:
      "A complete beginner's guide to the world of fragrance — what the terms mean, how scents are structured, and how to find what you love.",
    emoji: "📖",
    readTime: "8 min read",
    category: "beginner",
  },
  {
    slug: "how-to-apply",
    title: "How to Apply Fragrance",
    tagline: "Get the most from every spray",
    description:
      "Practical tips on where and how to apply fragrance for maximum effect — pulse points, layering, storage, and common mistakes to avoid.",
    emoji: "💨",
    readTime: "5 min read",
    category: "practical",
  },
  {
    slug: "families",
    title: "Fragrance Families Explained",
    tagline: "The six scent families and what they mean",
    description:
      "Understand the six major fragrance families — Fresh, Floral, Amber, Woody, Citrus, and Aromatic — and discover which ones resonate with you.",
    emoji: "🎨",
    readTime: "6 min read",
    category: "deep-dive",
  },
  {
    slug: "glossary",
    title: "Fragrance Glossary",
    tagline: "Every term you'll encounter, explained",
    description:
      "A comprehensive reference for fragrance terminology — from accords and base notes to sillage and top notes.",
    emoji: "📚",
    readTime: "Reference",
    category: "deep-dive",
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
