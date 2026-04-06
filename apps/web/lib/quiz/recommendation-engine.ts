import { QuizSession, QuizResult, QuizOutcome } from "./types";
import { matchArchetype } from "./personality";
import type { Archetype } from "./types";
import {
  meilisearch,
  PRODUCTS_INDEX,
  SearchableProduct,
} from "../search/meilisearch";

// ── Performance ranges by intensity preference ────────────────────

const INTENSITY_RANGES: Record<string, { min: number; max: number }> = {
  light: { min: 1, max: 2.4 },
  moderate: { min: 2.5, max: 3.9 },
  bold: { min: 4.0, max: 5.0 },
};

// ── Occasion label mapping (quiz option id → Meilisearch value) ──

// ── Budget ranges (price in cents) ──────────────────────────────

const BUDGET_RANGES: Record<string, { min: number; max: number }> = {
  "under-100": { min: 0, max: 10000 },
  "100-175": { min: 10000, max: 17500 },
  "175-plus": { min: 17500, max: Infinity },
};

const OCCASION_MAP: Record<string, string> = {
  everyday: "Casual",
  work: "Office",
  "date-night": "Date Night",
  "special-event": "Special Event",
  outdoor: "Outdoor",
};

/**
 * Main entry point: given a completed quiz session, return the user's
 * scent personality archetype and personalized recommendations.
 *
 * Non-deterministic: uses weighted random sampling from top candidates
 * so the same inputs produce varied-but-relevant results.
 */
export async function getRecommendations(
  session: QuizSession
): Promise<QuizOutcome> {
  const archetype = matchArchetype(session.dimensions);

  // Fetch a broad candidate pool from Meilisearch
  const results = await meilisearch
    .index(PRODUCTS_INDEX)
    .search<SearchableProduct>("", { limit: 100 });

  const candidates = results.hits;
  if (candidates.length === 0) {
    return { archetype, results: [], dimensions: session.dimensions };
  }

  // Score every candidate
  const scored = candidates.map((product) => ({
    product,
    score: scoreProduct(session, archetype, product),
  }));

  // Filter out very low scores
  const minScore = 15;
  const viable = scored.filter((s) => s.score >= minScore);
  const pool = viable.length > 0 ? viable : scored;

  // Sort by score descending, take top 30 as selection pool
  pool.sort((a, b) => b.score - a.score);
  const topPool = pool.slice(0, 30);

  // Weighted random sample of 8 with brand diversity (max 2 per brand)
  const selected = weightedSample(topPool, 8, 2);

  // Generate results with explanations
  const quizResults: QuizResult[] = selected.map(({ product, score }) => ({
    productId: product.id,
    handle: product.handle,
    title: product.title,
    brand: product.brand,
    thumbnail: product.thumbnail,
    price: product.price,
    matchScore: Math.round(Math.min(score, 100)),
    explanation: generateExplanation(session, archetype, product),
    family: product.family,
    topAccords: (product.accords || []).slice(0, 3),
  }));

  return { archetype, results: quizResults, dimensions: session.dimensions };
}

// ── Multi-dimensional scoring ─────────────────────────────────────

function scoreProduct(
  session: QuizSession,
  archetype: Archetype,
  product: SearchableProduct
): number {
  let score = 0;

  // 1. Family affinity (0-30 pts) — proportional to archetype + user affinity
  const familyScore = getFamilyScore(session, archetype, product.family);
  score += familyScore * 30;

  // 2. Accord overlap (0-25 pts) — proportional match
  const accordScore = getAccordScore(session, archetype, product.accords || []);
  score += accordScore * 25;

  // 3. Intensity match (0-20 pts) — based on user's intensity preference
  if (session.intensity) {
    const range = INTENSITY_RANGES[session.intensity];
    if (range) {
      const longevity = product.longevity ?? 3;
      if (longevity >= range.min && longevity <= range.max) {
        score += 20;
      } else {
        // Partial credit for being close
        const distance = longevity < range.min
          ? range.min - longevity
          : longevity - range.max;
        score += Math.max(0, 20 - distance * 10);
      }
    }
  } else {
    score += 10; // no preference → baseline
  }

  // 4. Occasion overlap (0-15 pts) — proportional
  if (session.occasions.length > 0 && product.occasion) {
    const mappedOccasions = session.occasions.map((o) => OCCASION_MAP[o] || o);
    const overlap = mappedOccasions.filter((o) =>
      product.occasion.some((po) => po.toLowerCase() === o.toLowerCase())
    ).length;
    score += (overlap / session.occasions.length) * 15;
  } else {
    score += 7; // no preference → baseline
  }

  // 5. Season bonus (0-10 pts)
  const seasonAnswer = session.answers["season"];
  if (typeof seasonAnswer === "string" && product.season) {
    const seasonMap: Record<string, string> = {
      spring: "Spring",
      summer: "Summer",
      autumn: "Fall",
      winter: "Winter",
    };
    const userSeason = seasonMap[seasonAnswer];
    if (userSeason && product.season.some((s) => s === userSeason)) {
      score += 10;
    } else {
      score += 3;
    }
  } else {
    score += 5;
  }

  // 6. Budget match (0-10 pts) — rewards products in the user's price range
  if (session.budget && session.budget !== "flexible") {
    const range = BUDGET_RANGES[session.budget];
    if (range && product.price != null) {
      if (product.price >= range.min && product.price <= range.max) {
        score += 10;
      } else {
        // Partial credit for being within $50 (5000 cents) of range
        const distance = product.price < range.min
          ? range.min - product.price
          : product.price - range.max;
        score += Math.max(0, 10 - (distance / 5000) * 10);
      }
    }
  } else {
    score += 5; // no preference → neutral baseline
  }

  return score;
}

function getFamilyScore(
  session: QuizSession,
  archetype: Archetype,
  productFamily: string
): number {
  const archetypeAffinity = archetype.familyAffinities[productFamily] ?? 0;
  const userAffinity = session.familyAffinities[productFamily] ?? 0;
  return Math.min(1, archetypeAffinity * 0.6 + Math.min(userAffinity, 1) * 0.4);
}

function getAccordScore(
  session: QuizSession,
  archetype: Archetype,
  productAccords: string[]
): number {
  if (productAccords.length === 0) return 0;

  const affinityAccords = new Set([
    ...archetype.accordAffinities,
    ...Object.entries(session.accordAffinities)
      .filter(([, count]) => count >= 2)
      .map(([accord]) => accord),
  ]);

  if (affinityAccords.size === 0) return 0.3;

  const matches = productAccords.filter((a) => affinityAccords.has(a)).length;
  return Math.min(1, matches / Math.min(affinityAccords.size, 4));
}

// ── Weighted random sampling with brand diversity ─────────────────

function weightedSample(
  pool: { product: SearchableProduct; score: number }[],
  count: number,
  maxPerBrand: number
): { product: SearchableProduct; score: number }[] {
  const selected: { product: SearchableProduct; score: number }[] = [];
  const brandCounts: Record<string, number> = {};
  const remaining = [...pool];

  while (selected.length < count && remaining.length > 0) {
    const weights = remaining.map((item) => {
      const brandCount = brandCounts[item.product.brand] ?? 0;
      if (brandCount >= maxPerBrand) return 0;
      // Superlinear weight favors higher scores while allowing lower-scored picks
      return Math.pow(item.score, 1.5);
    });

    const totalWeight = weights.reduce((sum, w) => sum + w, 0);
    if (totalWeight === 0) break;

    let random = Math.random() * totalWeight;
    let pickIndex = 0;
    for (let i = 0; i < weights.length; i++) {
      random -= weights[i];
      if (random <= 0) {
        pickIndex = i;
        break;
      }
    }

    const picked = remaining[pickIndex];
    selected.push(picked);
    brandCounts[picked.product.brand] = (brandCounts[picked.product.brand] ?? 0) + 1;
    remaining.splice(pickIndex, 1);
  }

  return selected.sort((a, b) => b.score - a.score);
}

// ── Natural language explanations ─────────────────────────────────

function generateExplanation(
  session: QuizSession,
  archetype: Archetype,
  product: SearchableProduct
): string {
  const parts: string[] = [];

  // Lead with personality connection
  const familyAffinity = archetype.familyAffinities[product.family];
  if (familyAffinity && familyAffinity >= 0.7) {
    parts.push(
      `As a ${archetype.name}, you're naturally drawn to ${product.family.toLowerCase()} fragrances`
    );
  }

  // Accord connection
  const matchingAccords = (product.accords || []).filter((a) =>
    archetype.accordAffinities.includes(a)
  );
  if (matchingAccords.length > 0) {
    const accordList = matchingAccords.slice(0, 2).join(" and ").toLowerCase();
    parts.push(`its ${accordList} character speaks to your taste`);
  }

  // Intensity match
  if (session.intensity) {
    const range = INTENSITY_RANGES[session.intensity];
    if (range && product.longevity >= range.min && product.longevity <= range.max) {
      const intensityLabel =
        session.intensity === "light" ? "subtle presence" :
        session.intensity === "bold" ? "commanding projection" :
        "balanced wear";
      parts.push(`it delivers the ${intensityLabel} you prefer`);
    }
  }

  // Occasion fit
  if (session.occasions.length > 0 && product.occasion) {
    const mappedOccasions = session.occasions.map((o) => OCCASION_MAP[o] || o);
    const matching = mappedOccasions.filter((o) =>
      product.occasion.some((po) => po.toLowerCase() === o.toLowerCase())
    );
    if (matching.length > 0) {
      parts.push(`perfect for ${matching[0].toLowerCase()}`);
    }
  }

  if (parts.length === 0) {
    return `A ${product.family.toLowerCase()} fragrance that complements your ${archetype.name} personality`;
  }

  const first = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
  if (parts.length === 1) return first;

  return first + " — " + parts.slice(1).join(", and ");
}
