import { QuizAnswers, QuizResult } from "./types";
import { meilisearch, PRODUCTS_INDEX, SearchableProduct } from "../search/meilisearch";

interface ScoringFactors {
  familyMatch: number;
  intensityMatch: number;
  occasionMatch: number;
  genderMatch: number;
  moodMatch: number;
}

const MOOD_TO_ACCORDS: Record<string, string[]> = {
  "confident": ["Woody", "Leather", "Spicy"],
  "romantic": ["Floral", "Sweet", "Musky"],
  "fresh": ["Citrus", "Aquatic", "Green"],
  "cozy": ["Amber", "Vanilla", "Woody"],
  "mysterious": ["Oud", "Incense", "Smoky"],
  "playful": ["Fruity", "Sweet", "Fresh"],
};

const INTENSITY_TO_PERFORMANCE: Record<string, { min: number; max: number }> = {
  light: { min: 1, max: 2.5 },
  moderate: { min: 2.5, max: 4 },
  bold: { min: 4, max: 5 },
};

export async function getRecommendations(answers: QuizAnswers): Promise<QuizResult[]> {
  // Build search filter based on answers
  const filters: string[] = [];

  if (answers.families.length > 0) {
    const familyFilter = answers.families
      .map((f) => `family = "${f}"`)
      .join(" OR ");
    filters.push(`(${familyFilter})`);
  }

  if (answers.gender && answers.gender !== "unisex") {
    filters.push(`(gender = "${answers.gender}" OR gender = "Unisex")`);
  }

  // Get candidate products
  const results = await meilisearch.index(PRODUCTS_INDEX).search<SearchableProduct>(
    "",
    {
      filter: filters.length ? filters.join(" AND ") : undefined,
      limit: 100,
    }
  );

  // Score each product
  const scored = results.hits.map((product) => {
    const { score, reasons } = calculateMatchScore(answers, product);
    return {
      productId: product.id,
      handle: product.handle,
      title: product.title,
      brand: product.brand,
      thumbnail: product.thumbnail,
      matchScore: score,
      matchReasons: reasons,
    };
  });

  // Sort by score and return top 10
  return scored
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 10);
}

function calculateMatchScore(
  answers: QuizAnswers,
  product: SearchableProduct
): { score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];

  // Family match (30 points)
  if (answers.families.includes(product.family)) {
    score += 30;
    reasons.push(`Matches your ${product.family.toLowerCase()} preference`);
  }

  // Intensity match (25 points)
  if (answers.intensity) {
    const range = INTENSITY_TO_PERFORMANCE[answers.intensity];
    if (product.longevity >= range.min && product.longevity <= range.max) {
      score += 25;
      reasons.push(`${answers.intensity} intensity as requested`);
    }
  }

  // Occasion match (20 points)
  const occasionOverlap = answers.occasions.filter((o) =>
    product.occasion?.includes(o)
  );
  if (occasionOverlap.length > 0) {
    score += 20;
    reasons.push(`Great for ${occasionOverlap.join(", ").toLowerCase()}`);
  }

  // Gender match (15 points)
  if (
    answers.gender === "unisex" ||
    product.gender === "Unisex" ||
    product.gender?.toLowerCase() === answers.gender
  ) {
    score += 15;
  }

  // Mood/accord match (10 points)
  const moodAccords = answers.moods.flatMap((m) => MOOD_TO_ACCORDS[m] || []);
  const accordOverlap = moodAccords.filter((a) =>
    product.accords?.includes(a)
  );
  if (accordOverlap.length > 0) {
    score += 10;
    reasons.push(`Has ${accordOverlap[0].toLowerCase()} notes you'll love`);
  }

  return { score, reasons };
}
