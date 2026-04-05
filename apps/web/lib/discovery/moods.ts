export interface Mood {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  editorial: string;
  emoji: string;
  gradient: string;
  searchFilter: string;
  sortBy?: string;
}

export const MOODS: Mood[] = [
  {
    slug: "main-character-energy",
    title: "Main Character Energy",
    tagline: "For days when you want to be noticed",
    description: "Bold fragrances that project confidence and command attention",
    editorial:
      "These are the fragrances that enter a room before you do. Powerful projection, magnetic sillage, and an unmistakable presence that lingers in memory long after you've gone.",
    emoji: "\u2728",
    gradient: "from-amber-50 to-orange-50",
    searchFilter: "",
    sortBy: "sillage:desc",
  },
  {
    slug: "quiet-luxury",
    title: "Quiet Luxury",
    tagline: "Understated elegance, close to the skin",
    description: "Intimate scents that reward closeness",
    editorial:
      "The fragrance equivalent of cashmere — felt only by those close enough to matter. These scents whisper rather than shout, creating an aura of effortless refinement.",
    emoji: "\uD83E\uDD0D",
    gradient: "from-stone-50 to-zinc-50",
    searchFilter: "",
    sortBy: "sillage:asc",
  },
  {
    slug: "sunday-morning",
    title: "Sunday Morning",
    tagline: "Relaxed, warm, and unhurried",
    description: "Easy-going scents for laid-back days",
    editorial:
      "Sunlight through curtains, coffee in hand, nowhere to be. These fragrances capture that feeling of unhurried contentment — soft, approachable, and completely at ease.",
    emoji: "\u2615",
    gradient: "from-amber-50 to-yellow-50",
    searchFilter: 'occasion = "Casual"',
  },
  {
    slug: "after-dark",
    title: "After Dark",
    tagline: "Mysterious, magnetic, unforgettable",
    description: "Evening fragrances that leave an impression",
    editorial:
      "When the sun sets, the rules change. These fragrances are built for candlelit dinners, rooftop conversations, and moments that deserve a scent as memorable as the night itself.",
    emoji: "\uD83C\uDF19",
    gradient: "from-indigo-50 to-purple-50",
    searchFilter: 'occasion = "Date Night"',
    sortBy: "sillage:desc",
  },
  {
    slug: "fresh-start",
    title: "Fresh Start",
    tagline: "Clean slate energy",
    description: "Crisp, invigorating scents that wake up the senses",
    editorial:
      "Like stepping outside after rain or diving into cool water. These fragrances are pure energy — bright citrus, ocean air, and green vitality that makes everything feel possible.",
    emoji: "\uD83C\uDF0A",
    gradient: "from-cyan-50 to-sky-50",
    searchFilter: 'family = "Fresh" OR family = "Citrus"',
  },
  {
    slug: "free-spirit",
    title: "Free Spirit",
    tagline: "Earthy, natural, untamed",
    description: "Grounding scents inspired by the outdoors",
    editorial:
      "For those who feel most alive surrounded by nature. Cedar forests, rain-soaked earth, wild herbs — these fragrances carry the essence of the outdoors wherever you go.",
    emoji: "\uD83C\uDF3F",
    gradient: "from-emerald-50 to-green-50",
    searchFilter: 'family = "Woody" OR family = "Aromatic"',
  },
  {
    slug: "sweet-escape",
    title: "Sweet Escape",
    tagline: "Indulgent and comforting",
    description: "Warm, enveloping scents like a cashmere blanket",
    editorial:
      "Vanilla, amber, tonka, and spice — these fragrances are pure comfort. They're the olfactory equivalent of a warm embrace, perfect for when you want to feel wrapped in something beautiful.",
    emoji: "\uD83C\uDF6F",
    gradient: "from-orange-50 to-amber-50",
    searchFilter: 'family = "Amber"',
  },
  {
    slug: "new-to-fragrance",
    title: "New to Fragrance",
    tagline: "Start your scent journey here",
    description: "Approachable, versatile scents perfect for beginners",
    editorial:
      "Not sure where to start? These fragrances are crowd-pleasers — easy to wear, universally appealing, and gentle enough to ease you into the world of fragrance without overwhelming your senses.",
    emoji: "\uD83C\uDF1F",
    gradient: "from-violet-50 to-fuchsia-50",
    searchFilter: "",
    sortBy: "sillage:asc",
  },
];

export function getMoodBySlug(slug: string): Mood | undefined {
  return MOODS.find((m) => m.slug === slug);
}
