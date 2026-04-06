import { NOTE_DESCRIPTIONS } from "@/lib/fragrance/note-descriptions";

export interface SeasonalGuide {
  slug: string;
  season: string;
  title: string;
  tagline: string;
  emoji: string;
  color: string; // fragrance family color token that best represents this season
  heroGradient: string;
  description: string;
  whyItMatters: string;
  characteristics: string[];
  bestFamilies: {
    name: string;
    slug: string;
    why: string;
  }[];
  notesToLookFor: string[];
  wearingTips: string[];
  occasions: {
    name: string;
    emoji: string;
    suggestion: string;
  }[];
  collectionSlug: string;
  searchFilter: string;
}

export const SEASONAL_GUIDES: SeasonalGuide[] = [
  {
    slug: "spring",
    season: "Spring",
    title: "Best Fragrances for Spring",
    tagline: "Fresh starts deserve fresh scents",
    emoji: "🌷",
    color: "floral",
    heroGradient: "from-family-floral-subtle to-surface-primary",
    description:
      "Spring is when the fragrance world comes alive. As temperatures warm and flowers bloom, lighter, greener, and more floral compositions feel right at home. This is the season for fragrances that mirror the energy of renewal — bright openings, soft floral hearts, and clean, airy finishes.",
    whyItMatters:
      "Temperature directly affects how fragrance performs on your skin. Spring's mild warmth is the sweet spot: warm enough to project your scent without the summer heat that can amplify heavy notes into something overwhelming. This makes spring ideal for experimenting — lighter concentrations like Eau de Toilette shine here, and notes that might feel timid in winter finally get room to breathe.",
    characteristics: [
      "Light to moderate projection — present without overwhelming",
      "Green and floral notes at the forefront",
      "Clean, airy drydowns that don't linger too heavily",
      "Versatile enough for office, outdoor brunch, and evening alike",
      "Often built on citrus openings that transition into soft florals",
    ],
    bestFamilies: [
      {
        name: "Fresh",
        slug: "fresh",
        why: "Clean aquatic and green notes mirror spring's renewal energy perfectly.",
      },
      {
        name: "Floral",
        slug: "floral",
        why: "The season of flowers calls for floral fragrances — lighter soliflores and airy bouquets are ideal.",
      },
      {
        name: "Citrus",
        slug: "citrus",
        why: "Bright bergamot, lemon, and grapefruit openings feel naturally suited to warming days.",
      },
    ],
    notesToLookFor: [
      "Lily of the Valley",
      "Peony",
      "Green Tea",
      "Bergamot",
      "Iris",
      "Grapefruit",
      "Violet",
      "Cucumber",
    ],
    wearingTips: [
      "Opt for Eau de Toilette or lighter concentrations — they project beautifully in mild warmth without overwhelming.",
      "Layer a light floral over a clean musk moisturizer for all-day softness.",
      "Apply to pulse points AND your hair — spring breezes carry scent wonderfully from freshly scented hair.",
      "Keep a travel spray in your bag for midday refreshing as spring temps fluctuate.",
      "Don't overspritz: 2-3 sprays is plenty when warmth helps your fragrance bloom naturally.",
    ],
    occasions: [
      {
        name: "Outdoor Brunch",
        emoji: "🥂",
        suggestion: "A citrus-floral that's bright without competing with the fresh air.",
      },
      {
        name: "First Dates",
        emoji: "💐",
        suggestion: "A soft floral with a clean musk base — approachable and memorable.",
      },
      {
        name: "Office & Meetings",
        emoji: "💼",
        suggestion: "A fresh green or light aromatic — professional and inoffensive.",
      },
      {
        name: "Weekend Walks",
        emoji: "🚶",
        suggestion: "An airy aquatic or green tea scent that moves naturally with you.",
      },
    ],
    collectionSlug: "spring-picks",
    searchFilter: "Spring",
  },
  {
    slug: "summer",
    season: "Summer",
    title: "Best Fragrances for Summer",
    tagline: "Stay cool when the temperature rises",
    emoji: "☀️",
    color: "fresh",
    heroGradient: "from-family-fresh-subtle to-surface-primary",
    description:
      "Summer is the ultimate test for any fragrance. Heat amplifies everything — notes project farther, sweetness intensifies, and heavy compositions can become cloying fast. The best summer fragrances work with the warmth, not against it: crisp aquatics, sparkling citruses, and transparent florals that stay refreshing even at peak heat.",
    whyItMatters:
      "High temperatures accelerate fragrance evaporation and amplify projection. A scent that feels moderate in your air-conditioned bathroom can become a loud announcement in summer heat. This is why summer demands the lightest touch: lower concentrations, fewer sprays, and compositions designed around volatility rather than longevity. The goal isn't to last 12 hours — it's to smell incredible for the moments that matter.",
    characteristics: [
      "Transparent and refreshing — no heavy sweetness or dense resins",
      "Aquatic, citrus, and green notes dominate the composition",
      "Quick-drying openings that don't become cloying in heat",
      "Moderate sillage that creates a personal aura, not a cloud",
      "Often feature synthetic 'cool' molecules like calone or ambroxan",
    ],
    bestFamilies: [
      {
        name: "Fresh",
        slug: "fresh",
        why: "Aquatic and ozonic notes were practically invented for summer — they evoke ocean breezes and cool water.",
      },
      {
        name: "Citrus",
        slug: "citrus",
        why: "Bright, zesty openings cut through heat instantly and deliver an immediate mood boost.",
      },
      {
        name: "Aromatic",
        slug: "aromatic",
        why: "Herbal notes like mint, basil, and lavender add natural freshness with Mediterranean flair.",
      },
    ],
    notesToLookFor: [
      "Sea Salt",
      "Lemon",
      "Coconut",
      "Lime",
      "Mint",
      "Grapefruit",
      "Cucumber",
      "Yuzu",
    ],
    wearingTips: [
      "Switch to Eau de Cologne or Eau Fraîche — their lighter concentration is perfect for heat.",
      "Apply right after a shower to clean, slightly damp skin for the best diffusion.",
      "Spray on clothes rather than skin for longer-lasting freshness without heat amplification.",
      "Keep fragrance stored in a cool, dark place — heat and sunlight degrade the formula.",
      "Reapply lightly rather than overspraying upfront; summer fragrances are meant to be refreshed.",
    ],
    occasions: [
      {
        name: "Beach Day",
        emoji: "🏖️",
        suggestion: "A salty aquatic or coconut-lime blend that complements sun and surf.",
      },
      {
        name: "Rooftop Evening",
        emoji: "🌃",
        suggestion: "A citrus-woody scent with just enough warmth for after-dark appeal.",
      },
      {
        name: "Travel & Vacation",
        emoji: "✈️",
        suggestion: "A versatile fresh scent that works across climates and won't offend in close quarters.",
      },
      {
        name: "Casual Friday",
        emoji: "👕",
        suggestion: "A clean aromatic or green tea scent — refreshing without trying too hard.",
      },
    ],
    collectionSlug: "summer-fresh",
    searchFilter: "Summer",
  },
  {
    slug: "fall",
    season: "Fall",
    title: "Best Fragrances for Fall",
    tagline: "Warm notes for cooling days",
    emoji: "🍂",
    color: "amber",
    heroGradient: "from-family-amber-subtle to-surface-primary",
    description:
      "Fall is when fragrance gets interesting. Cooler air and layered clothing create the perfect canvas for richer, more complex compositions. Spices emerge, woods deepen, and amber tones wrap around you like a favorite sweater. This is the season where fragrance transitions from accessory to identity — the scent that lingers in your scarf becomes part of who you are.",
    whyItMatters:
      "As temperatures drop, fragrance molecules move more slowly through the air, reducing natural projection. Heavier base notes — vanillas, resins, and woods — that would overwhelm in summer heat finally find their balance. Fall is the season to reach for those richer concentrations (Eau de Parfum, Parfum) and the compositions you've been waiting all year to wear. The cooler air also means your fragrance stays closer to your body, creating an intimate scent bubble that rewards closeness.",
    characteristics: [
      "Warm and enveloping without being heavy",
      "Spice and resinous notes come to the forefront",
      "Smooth transitions from bright openings to warm, lasting bases",
      "Excellent longevity in cooler temperatures",
      "Often feature gourmand or boozy accents (vanilla, coffee, whiskey)",
    ],
    bestFamilies: [
      {
        name: "Amber",
        slug: "amber",
        why: "Rich resins, vanilla, and warm spices are the quintessential fall fragrance family.",
      },
      {
        name: "Woody",
        slug: "woody",
        why: "Sandalwood, cedar, and patchouli add grounding depth that complements crisp autumn air.",
      },
      {
        name: "Aromatic",
        slug: "aromatic",
        why: "Herbaceous notes like sage and lavender bridge the warmth of amber with autumnal freshness.",
      },
    ],
    notesToLookFor: [
      "Cinnamon",
      "Vanilla",
      "Tonka Bean",
      "Saffron",
      "Sandalwood",
      "Amber",
      "Patchouli",
      "Cedar",
    ],
    wearingTips: [
      "Upgrade to Eau de Parfum — the richer concentration lasts longer in cool, dry autumn air.",
      "Apply to warm spots under layers: wrists, chest, and the crooks of your elbows diffuse beautifully through sweaters and scarves.",
      "Moisturize first — dry fall air reduces fragrance longevity on skin, so a good unscented moisturizer is your secret weapon.",
      "Don't be afraid to layer: a woody base with a spicier top fragrance creates a unique signature.",
      "This is the season to explore niche and complex compositions that would be too heavy for warmer months.",
    ],
    occasions: [
      {
        name: "Date Night",
        emoji: "🕯️",
        suggestion: "A spicy amber with vanilla depth — intimate, warm, and memorable.",
      },
      {
        name: "Cozy Gatherings",
        emoji: "🏠",
        suggestion: "A soft woody-gourmand scent that wraps around the room like a warm blanket.",
      },
      {
        name: "Crisp Morning Walk",
        emoji: "🍁",
        suggestion: "A fresh-spicy aromatic that plays off the cool air — invigorating and grounding.",
      },
      {
        name: "Professional Settings",
        emoji: "🖊️",
        suggestion: "A refined woody-amber — sophisticated without being overwhelming in heated offices.",
      },
    ],
    collectionSlug: "fall-favorites",
    searchFilter: "Fall",
  },
  {
    slug: "winter",
    season: "Winter",
    title: "Best Fragrances for Winter",
    tagline: "Scents that embrace the cold",
    emoji: "❄️",
    color: "woody",
    heroGradient: "from-family-woody-subtle to-surface-primary",
    description:
      "Winter is fragrance season. Cold air, warm interiors, and holiday gatherings create the perfect stage for the most opulent, long-lasting, and complex compositions in your collection. This is when oud, incense, and thick vanillas finally make sense — when fragrance becomes an event. The contrast between cold skin and warm notes creates a magnetic push-pull that lighter seasons can't replicate.",
    whyItMatters:
      "Cold temperatures significantly reduce fragrance projection, which means you can wear your most potent compositions without overwhelming a room. This is the season for Extrait de Parfum and Parfum concentrations — their density compensates for reduced volatility in cold air. Winter also brings unique wearing contexts: holiday parties, candlelit dinners, and celebrations where a statement fragrance is part of dressing up. The combination of cold outdoor air meeting warm indoor environments creates dynamic fragrance performance throughout the day.",
    characteristics: [
      "Rich, dense, and opulent compositions",
      "Heavy base notes dominate: oud, incense, amber, musk",
      "Exceptional longevity on cold-weather clothing",
      "Often include gourmand or boozy facets",
      "Project strongly in warm indoor environments",
    ],
    bestFamilies: [
      {
        name: "Amber",
        slug: "amber",
        why: "Winter's reigning family — vanilla, benzoin, and warm spices create instant comfort against the cold.",
      },
      {
        name: "Woody",
        slug: "woody",
        why: "Oud, sandalwood, and smoky woods are at their dramatic best in cold weather.",
      },
      {
        name: "Floral",
        slug: "floral",
        why: "Opulent white florals (tuberose, jasmine) anchored in heavy bases create striking winter florals.",
      },
    ],
    notesToLookFor: [
      "Oud",
      "Frankincense",
      "Vanilla",
      "Labdanum",
      "Benzoin",
      "Cinnamon",
      "Tonka Bean",
      "Amber",
    ],
    wearingTips: [
      "Go for Parfum or Extrait concentration — the cold demands it, and reduced volatility means even strong scents stay close.",
      "Spray on scarves and coat collars — cold-weather fabrics hold fragrance exceptionally well, often for days.",
      "Apply before dressing so warmth from your body diffuses the scent into your layers naturally.",
      "Layer boldly: a rich oud over a vanilla base creates a personalized signature that evolves throughout the day.",
      "Reapply before evening events — the transition from outdoor cold to heated venues brings base notes to life in spectacular fashion.",
    ],
    occasions: [
      {
        name: "Holiday Parties",
        emoji: "🎄",
        suggestion: "A festive spicy-amber with cinnamon and frankincense — seasonal and sophisticated.",
      },
      {
        name: "Gift Guide Pick",
        emoji: "🎁",
        suggestion: "A crowd-pleasing vanilla-woody scent makes a universally appreciated present.",
      },
      {
        name: "Romantic Evening",
        emoji: "❤️",
        suggestion: "An intimate oud or deep amber — magnetic, mysterious, and designed for closeness.",
      },
      {
        name: "Cozy Night In",
        emoji: "🔥",
        suggestion: "A comforting gourmand with vanilla and tonka bean — the fragrance equivalent of a warm drink by the fire.",
      },
    ],
    collectionSlug: "cozy-winter",
    searchFilter: "Winter",
  },
];

export function getSeasonalGuideBySlug(slug: string): SeasonalGuide | undefined {
  return SEASONAL_GUIDES.find((s) => s.slug === slug);
}

export function getNotesForSeason(
  guide: SeasonalGuide
): { name: string; description: string }[] {
  return guide.notesToLookFor
    .map((name) => ({
      name,
      description: NOTE_DESCRIPTIONS[name] || "",
    }))
    .filter((n) => n.description);
}
