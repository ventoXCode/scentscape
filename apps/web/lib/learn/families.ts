import { NOTE_DESCRIPTIONS } from "@/lib/fragrance/note-descriptions";

export interface FragranceFamily {
  slug: string;
  name: string;
  tagline: string;
  emoji: string;
  color: string; // design token family name (e.g., "fresh")
  description: string;
  history: string;
  characteristics: string[];
  whenToWear: string;
  personality: string;
  signatureNotes: string[];
  subfamilies: { name: string; description: string }[];
}

export const FRAGRANCE_FAMILIES: FragranceFamily[] = [
  {
    slug: "fresh",
    name: "Fresh",
    tagline: "Clean, invigorating, and alive",
    emoji: "🌊",
    color: "fresh",
    description:
      "Fresh fragrances evoke the feeling of a cool breeze, ocean spray, or a rain-washed garden. They're the scent equivalent of a deep breath of clean air — instantly energizing and uplifting. This family encompasses everything from aquatic and ozonic notes to crisp green accords and clean musks.",
    history:
      "The fresh family rose to prominence in the 1990s with the 'clean fragrance' movement. Aquatic notes like calone (discovered in 1966 but popularized decades later) revolutionized perfumery by capturing the smell of sea air in a bottle. Today, fresh fragrances dominate the market as everyday, approachable choices.",
    characteristics: [
      "Clean and uplifting",
      "Light to moderate projection",
      "Best in warm weather",
      "Universally appealing",
      "Great for daytime and office",
    ],
    whenToWear:
      "Fresh fragrances shine in spring and summer, during daytime activities, at the office, or anytime you want to feel clean and put-together without overwhelming those around you.",
    personality:
      "If you're drawn to fresh scents, you likely value clarity, energy, and a sense of openness. You might be the person who throws open the windows first thing in the morning or feels most alive near water.",
    signatureNotes: [
      "Bergamot",
      "Lemon",
      "Sea Salt",
      "Green Tea",
      "Mint",
      "Grapefruit",
      "Cucumber",
      "Ocean Breeze",
    ],
    subfamilies: [
      {
        name: "Aquatic",
        description:
          "Ocean-inspired scents with marine, salty, and ozonic notes that evoke the seaside.",
      },
      {
        name: "Green",
        description:
          "Leaf-like, vegetal freshness — think crushed leaves, fresh-cut grass, and garden herbs.",
      },
      {
        name: "Citrus-Fresh",
        description:
          "Where fresh and citrus overlap — sparkling clean scents built on citrus foundations.",
      },
    ],
  },
  {
    slug: "floral",
    name: "Floral",
    tagline: "Nature's most beautiful expression",
    emoji: "🌹",
    color: "floral",
    description:
      "Floral fragrances are the heart of perfumery, built around the scent of flowers in all their variety — from the delicate sweetness of lily of the valley to the heady, intoxicating power of tuberose. This is the largest and most diverse fragrance family, ranging from light and airy to rich and opulent.",
    history:
      "Flowers have been the foundation of perfumery since antiquity. The ancient Egyptians used rose and lotus in sacred oils. The modern floral fragrance was revolutionized in 1921 when Chanel No. 5 introduced aldehydes to amplify floral bouquets, creating the 'abstract floral' concept that dominates to this day.",
    characteristics: [
      "Romantic and elegant",
      "Ranges from delicate to powerful",
      "Versatile across seasons",
      "Can be feminine, masculine, or unisex",
      "Often forms the 'heart' of complex compositions",
    ],
    whenToWear:
      "Lighter florals work beautifully in spring and daytime settings. Heavier florals like tuberose and jasmine come alive in the evening. Floral fragrances are appropriate for virtually any occasion.",
    personality:
      "Floral lovers tend to appreciate beauty, romance, and emotional depth. You might be drawn to art, nature, and meaningful connections. Floral preferences often reflect a desire for both elegance and authenticity.",
    signatureNotes: [
      "Rose",
      "Jasmine",
      "Iris",
      "Tuberose",
      "Peony",
      "Orange Blossom",
      "Violet",
      "Lily of the Valley",
    ],
    subfamilies: [
      {
        name: "Soliflore",
        description:
          "Focused on a single flower, like a pure rose or jasmine — showcasing one bloom's full complexity.",
      },
      {
        name: "Floral Bouquet",
        description:
          "A blend of multiple flowers creating a lush, garden-like composition.",
      },
      {
        name: "White Floral",
        description:
          "Heady, intoxicating blossoms like jasmine, tuberose, and gardenia — rich and opulent.",
      },
    ],
  },
  {
    slug: "amber",
    name: "Amber",
    tagline: "Warm, rich, and enveloping",
    emoji: "✨",
    color: "amber",
    description:
      "Amber fragrances (also called Oriental) are the warmest, most sensual family in perfumery. Built on a foundation of resins, vanilla, and exotic spices, they create a cocooning effect — like wrapping yourself in something rich and luxurious. These are the fragrances that people describe as 'intoxicating.'",
    history:
      "The amber/oriental family traces its roots to the exotic trade routes that brought spices, resins, and precious materials from the East. Shalimar (1925) by Guerlain is often credited as the archetype — a lavish blend of vanilla, incense, and bergamot that shocked and delighted the world.",
    characteristics: [
      "Warm and sensual",
      "Typically long-lasting",
      "Strong projection",
      "Best in cool weather",
      "Evening and special occasion favorites",
    ],
    whenToWear:
      "Amber fragrances truly shine in autumn and winter, where the warmth of resins and spices harmonizes with cold air. They're natural choices for evening events, date nights, and any occasion where you want to leave a memorable impression.",
    personality:
      "If you're drawn to amber scents, you likely have a taste for the luxurious and the dramatic. You appreciate depth, complexity, and experiences that engage all the senses. You might be the person who loves candlelit dinners and rich fabrics.",
    signatureNotes: [
      "Vanilla",
      "Amber",
      "Tonka Bean",
      "Benzoin",
      "Cinnamon",
      "Frankincense",
      "Saffron",
      "Labdanum",
    ],
    subfamilies: [
      {
        name: "Soft Amber",
        description:
          "Gentle warmth with vanilla and powdery notes — cozy without being heavy.",
      },
      {
        name: "Spicy Amber",
        description:
          "Cinnamon, cardamom, and saffron add heat and complexity to the amber base.",
      },
      {
        name: "Resinous",
        description:
          "Frankincense, myrrh, and benzoin create a meditative, incense-like depth.",
      },
    ],
  },
  {
    slug: "woody",
    name: "Woody",
    tagline: "Earthy, grounding, and timeless",
    emoji: "🌲",
    color: "woody",
    description:
      "Woody fragrances are the strong, silent type of the fragrance world — grounding, sophisticated, and endlessly versatile. From the creamy warmth of sandalwood to the smoky depth of oud, this family offers remarkable range. Woody notes often form the backbone of both masculine and feminine compositions.",
    history:
      "Wood has been used in perfumery since the earliest incense traditions. Sandalwood, one of the most prized perfumery ingredients, has been traded for over 4,000 years. The modern woody fragrance was shaped by the discovery of synthetic musks and the popularization of vetiver and patchouli in the 20th century.",
    characteristics: [
      "Grounding and sophisticated",
      "Excellent longevity",
      "Versatile across genders",
      "Works in all seasons",
      "Often used as a fragrance 'base'",
    ],
    whenToWear:
      "Woody fragrances are year-round performers. Lighter woods (cedar, birch) work well in warmer months, while heavier woods (oud, sandalwood) excel in winter. Their grounding quality makes them excellent for professional settings.",
    personality:
      "Woody fragrance lovers tend to be grounded, confident, and appreciate quality over flash. You might value nature, craftsmanship, and understated elegance. There's often a quiet strength in people drawn to this family.",
    signatureNotes: [
      "Sandalwood",
      "Cedar",
      "Vetiver",
      "Patchouli",
      "Oud",
      "Birch",
      "Pine",
      "Cypress",
    ],
    subfamilies: [
      {
        name: "Dry Woods",
        description:
          "Clean, arid character — cedar, cypress, and birch with a crisp edge.",
      },
      {
        name: "Creamy Woods",
        description:
          "Smooth and enveloping — sandalwood, cashmeran, and mysore-style warmth.",
      },
      {
        name: "Smoky Woods",
        description:
          "Dark and intense — oud, guaiac wood, and birch tar with campfire-like depth.",
      },
    ],
  },
  {
    slug: "citrus",
    name: "Citrus",
    tagline: "Bright, energizing, and joyful",
    emoji: "🍋",
    color: "citrus",
    description:
      "Citrus fragrances capture the instant burst of energy you get from peeling an orange or squeezing a lemon. They're the most immediately recognizable and universally loved scents — bright, uplifting, and impossible to dislike. Citrus notes are also among the most ancient ingredients in perfumery.",
    history:
      "Citrus fruits arrived in European perfumery via Arab traders, and Eau de Cologne (created in 1709 in Cologne, Germany) established citrus as a cornerstone of fragrance. For centuries, citrus-based colognes were considered the pinnacle of refined grooming. Today, citrus remains essential — virtually every fragrance includes at least one citrus note in its opening.",
    characteristics: [
      "Instantly uplifting",
      "Universally appealing",
      "Typically shorter-lasting",
      "Perfect for layering",
      "Energizing and mood-boosting",
    ],
    whenToWear:
      "Citrus fragrances are at their best in spring and summer, during active daytime hours. They're perfect for brunch, outdoor activities, or anytime you need an instant mood lift. Their inoffensive nature makes them ideal for close-quarters situations.",
    personality:
      "Citrus lovers are often optimistic, energetic, and social. You might be the person who lights up a room, values spontaneity, and finds joy in simple pleasures. There's a refreshing directness to people who gravitate toward citrus.",
    signatureNotes: [
      "Bergamot",
      "Lemon",
      "Orange",
      "Grapefruit",
      "Mandarin",
      "Lime",
      "Yuzu",
      "Blood Orange",
    ],
    subfamilies: [
      {
        name: "Hesperidic",
        description:
          "Classic citrus — bergamot, lemon, and orange in their purest, zestiest form.",
      },
      {
        name: "Aromatic Citrus",
        description:
          "Citrus blended with herbs like basil, rosemary, or thyme for Mediterranean flair.",
      },
      {
        name: "Citrus Gourmand",
        description:
          "Sweet citrus meets vanilla, caramel, or honey — fruit-forward and delicious.",
      },
    ],
  },
  {
    slug: "aromatic",
    name: "Aromatic",
    tagline: "Herbal, fresh, and naturally elegant",
    emoji: "🌿",
    color: "aromatic",
    description:
      "Aromatic fragrances draw their character from herbs and aromatic plants — lavender, sage, rosemary, thyme, and more. They bridge the gap between fresh and woody, offering a natural sophistication that feels effortlessly refined. This family has deep roots in Mediterranean grooming traditions.",
    history:
      "Aromatic herbs have been used in fragrance since ancient Greece and Rome, where lavender was added to bathwater (the word 'lavender' comes from the Latin lavare, meaning 'to wash'). The fougère accord — a blend of lavender, coumarin, and oakmoss created in 1882 — became one of the most influential structures in modern perfumery.",
    characteristics: [
      "Natural and herbaceous",
      "Clean but complex",
      "Excellent versatility",
      "Moderate projection",
      "Sophisticated without trying",
    ],
    whenToWear:
      "Aromatic fragrances are remarkably versatile — they work from boardroom to barbecue. They're particularly suited to spring and early fall, and their natural character makes them excellent daily signatures.",
    personality:
      "If you're drawn to aromatic scents, you likely appreciate authenticity, nature, and understated sophistication. You might enjoy cooking with fresh herbs, spending time outdoors, or finding beauty in simplicity.",
    signatureNotes: [
      "Lavender",
      "Rosemary",
      "Sage",
      "Basil",
      "Thyme",
      "Chamomile",
      "Mint",
      "Tea",
    ],
    subfamilies: [
      {
        name: "Fougère",
        description:
          "The classic lavender-coumarin-oakmoss structure — the backbone of traditional men's fragrance.",
      },
      {
        name: "Herbal Green",
        description:
          "Garden herbs in their freshest form — basil, thyme, and sage with green vitality.",
      },
      {
        name: "Aromatic Woody",
        description:
          "Herbs meeting woods — lavender with cedar, sage with sandalwood — natural depth.",
      },
    ],
  },
];

export function getFamilyBySlug(slug: string): FragranceFamily | undefined {
  return FRAGRANCE_FAMILIES.find((f) => f.slug === slug);
}

export function getNotesForFamily(family: FragranceFamily): { name: string; description: string }[] {
  return family.signatureNotes
    .map((name) => ({
      name,
      description: NOTE_DESCRIPTIONS[name] || "",
    }))
    .filter((n) => n.description);
}
