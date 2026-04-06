import { NOTE_DESCRIPTIONS } from "@/lib/fragrance/note-descriptions";

export interface OccasionGuide {
  slug: string;
  occasion: string;
  title: string;
  tagline: string;
  emoji: string;
  color: string;
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
  scenarios: {
    name: string;
    emoji: string;
    suggestion: string;
  }[];
  searchFilter: string;
}

export const OCCASION_GUIDES: OccasionGuide[] = [
  {
    slug: "date-night",
    occasion: "Date Night",
    title: "Best Fragrances for Date Night",
    tagline: "Make a lasting impression",
    emoji: "🕯️",
    color: "amber",
    heroGradient: "from-family-amber-subtle to-surface-primary",
    description:
      "Date night fragrance is about creating an invisible pull — something that makes the person across from you lean in a little closer. The best date scents are warm, slightly mysterious, and deeply personal. They shouldn't announce your arrival from across the restaurant; they should reward proximity. Think intimate projection, sensual base notes, and a composition that evolves throughout the evening.",
    whyItMatters:
      "Fragrance is one of the strongest triggers of emotional memory. The scent you wear on a memorable date becomes permanently linked to that experience in your partner's mind. This is why date night deserves more thought than your everyday signature — you're not just wearing a fragrance, you're creating a sense memory. Warm, skin-close scents with amber, vanilla, and musk bases are scientifically shown to trigger feelings of comfort and attraction.",
    characteristics: [
      "Intimate projection — noticeable only up close, not across the room",
      "Warm, skin-hugging base notes that invite closeness",
      "Evolving compositions that reveal new facets throughout the evening",
      "A balance of confidence and approachability",
      "Rich but not heavy — alluring without overwhelming in close quarters",
    ],
    bestFamilies: [
      {
        name: "Amber",
        slug: "amber",
        why: "Vanilla, benzoin, and warm spices are the gold standard for romantic scents — they mimic the warmth of skin and evoke comfort.",
      },
      {
        name: "Woody",
        slug: "woody",
        why: "Sandalwood and oud create a grounding, magnetic presence that feels sophisticated and self-assured.",
      },
      {
        name: "Floral",
        slug: "floral",
        why: "Opulent white florals like jasmine and tuberose are classically seductive, especially when anchored in warm bases.",
      },
    ],
    notesToLookFor: [
      "Vanilla",
      "Amber",
      "Sandalwood",
      "Jasmine",
      "Musk",
      "Tonka Bean",
      "Rose",
      "Oud",
    ],
    wearingTips: [
      "Apply 1-2 hours before the date so the scent settles into your drydown — the most intimate, skin-close phase of the fragrance.",
      "Focus on pulse points that generate warmth in close contact: inner wrists, behind the ears, and the base of the throat.",
      "Less is genuinely more — 2-3 sprays maximum. You want your date to discover your scent, not be hit by it.",
      "Avoid freshly applying right before you meet; the alcohol blast of a fresh spray dissipates into something much more appealing after 30-60 minutes.",
      "If you're unsure about intensity, spray once on your chest under your shirt — body heat will diffuse the scent gradually and intimately.",
    ],
    scenarios: [
      {
        name: "First Date",
        emoji: "💫",
        suggestion:
          "Something approachable yet distinctive — a soft amber or clean musk that says 'interesting' without shouting.",
      },
      {
        name: "Anniversary Dinner",
        emoji: "🥂",
        suggestion:
          "Your most special bottle — a rich oud or opulent floral that marks the occasion as extraordinary.",
      },
      {
        name: "Casual Drinks",
        emoji: "🍷",
        suggestion:
          "A lighter woody-vanilla blend that works in the close quarters of a dimly lit bar.",
      },
      {
        name: "Outdoor Date",
        emoji: "🌙",
        suggestion:
          "A warm aromatic with gentle projection — something that catches on evening breezes without fading immediately.",
      },
    ],
    searchFilter: "Date Night",
  },
  {
    slug: "office",
    occasion: "Office",
    title: "Best Fragrances for the Office",
    tagline: "Professional polish, subtle presence",
    emoji: "💼",
    color: "fresh",
    heroGradient: "from-family-fresh-subtle to-surface-primary",
    description:
      "Office fragrance walks a fine line: you want to smell polished and put-together without triggering headaches in your open-plan neighbors. The best work scents project quiet confidence — clean, refined compositions with moderate sillage that create a professional aura without dominating shared spaces. Think of it as the olfactory equivalent of a well-tailored blazer: noticeable up close, never loud.",
    whyItMatters:
      "Scent shapes how others perceive you in professional settings. Research shows that clean, subtle fragrances are associated with competence and attention to detail. But the line between 'polished' and 'overwhelming' is thin in climate-controlled offices where scent molecules have nowhere to dissipate. Choosing the right office fragrance is about respect for shared space as much as personal expression. Light concentrations and moderate notes are your allies here.",
    characteristics: [
      "Low to moderate sillage — present in your personal space, not beyond it",
      "Clean, well-blended compositions without jarring transitions",
      "Nothing overtly sweet, smoky, or polarizing",
      "Works in air-conditioned environments without becoming stale",
      "Professional enough for client meetings, pleasant enough for daily wear",
    ],
    bestFamilies: [
      {
        name: "Fresh",
        slug: "fresh",
        why: "Aquatic and green notes read as 'clean' and 'composed' — universally inoffensive and confidence-boosting.",
      },
      {
        name: "Aromatic",
        slug: "aromatic",
        why: "Herbal notes like lavender, rosemary, and sage convey sophistication without demanding attention.",
      },
      {
        name: "Citrus",
        slug: "citrus",
        why: "Bright bergamot and grapefruit openings energize morning starts and fade gracefully into soft, professional drydowns.",
      },
    ],
    notesToLookFor: [
      "Bergamot",
      "White Tea",
      "Iris",
      "Cedar",
      "Lavender",
      "Green Tea",
      "Vetiver",
      "Musk",
    ],
    wearingTips: [
      "Stick to Eau de Toilette or lighter concentrations — they project less aggressively in enclosed office environments.",
      "Apply a single spray to your chest or inner wrist. In an office, one spray is often sufficient.",
      "Avoid reapplying at your desk — if you need a refresh, step into the restroom.",
      "Steer clear of gourmand (foody) or heavy oud fragrances; they tend to fill small rooms quickly.",
      "Keep a different, lighter fragrance at your desk for days when client-facing or close-quarters meetings are expected.",
    ],
    scenarios: [
      {
        name: "Daily Office Wear",
        emoji: "🖥️",
        suggestion:
          "A clean fresh or light aromatic — your reliable daily signature that never offends.",
      },
      {
        name: "Client Presentation",
        emoji: "📊",
        suggestion:
          "A crisp citrus-woody blend that conveys competence and attention to detail.",
      },
      {
        name: "After-Work Drinks",
        emoji: "🍸",
        suggestion:
          "Layer a warmer spray over your office scent to transition from professional to social seamlessly.",
      },
      {
        name: "Job Interview",
        emoji: "🤝",
        suggestion:
          "Your cleanest, most universally pleasant scent at minimal application — the goal is 'well-groomed', not 'memorable fragrance'.",
      },
    ],
    searchFilter: "Office",
  },
  {
    slug: "casual",
    occasion: "Casual",
    title: "Best Fragrances for Everyday Wear",
    tagline: "Your effortless daily signature",
    emoji: "☀️",
    color: "citrus",
    heroGradient: "from-family-citrus-subtle to-surface-primary",
    description:
      "Your everyday fragrance is the one that becomes synonymous with you — the scent friends and family associate with your presence. It should feel as natural as your favorite t-shirt: comfortable, effortless, and unmistakably yours. The best casual fragrances are versatile crowd-pleasers that work from morning errands to evening hangouts without needing to be swapped out.",
    whyItMatters:
      "Most of your life isn't special occasions — it's the in-between. Running errands, weekend coffee, grocery shopping, hanging out with friends. Your everyday fragrance is the one people actually remember you by because they encounter it the most. This makes it arguably the most important scent in your collection. It needs to be versatile, easy to wear, and something you genuinely love smelling on yourself day after day.",
    characteristics: [
      "Versatile enough for any casual setting without feeling out of place",
      "Moderate longevity — lasts through your day without needing constant reapplication",
      "Crowd-pleasing but not generic — has personality without being polarizing",
      "Comfortable in any weather with slight seasonal flexibility",
      "The kind of scent that draws compliments naturally, not forcefully",
    ],
    bestFamilies: [
      {
        name: "Fresh",
        slug: "fresh",
        why: "Clean aquatic and green notes are the ultimate everyday companions — uplifting, easygoing, and universally pleasant.",
      },
      {
        name: "Citrus",
        slug: "citrus",
        why: "Bright and energizing without trying too hard. Citrus-forward scents are the t-shirt and jeans of the fragrance world.",
      },
      {
        name: "Aromatic",
        slug: "aromatic",
        why: "Herbal blends add just enough character to distinguish your scent from generic 'clean' without demanding attention.",
      },
    ],
    notesToLookFor: [
      "Bergamot",
      "Lemon",
      "Sea Salt",
      "White Musk",
      "Grapefruit",
      "Cucumber",
      "Green Tea",
      "Lavender",
    ],
    wearingTips: [
      "Apply right after your shower when your skin is clean and slightly warm — this is when everyday scents perform best.",
      "Two to three sprays is the sweet spot for casual wear. Enough to be noticed when someone hugs you, not when they enter the room.",
      "Rotate between 2-3 everyday scents to prevent nose blindness — your own nose stops registering a scent you wear daily.",
      "A travel-size spray in your bag lets you refresh before unexpected plans without over-applying in the morning.",
      "Don't overthink it — the best everyday fragrance is the one you reach for without hesitation.",
    ],
    scenarios: [
      {
        name: "Weekend Errands",
        emoji: "🛒",
        suggestion:
          "A light citrus or clean musk — something that makes you feel put-together without any effort.",
      },
      {
        name: "Coffee with Friends",
        emoji: "☕",
        suggestion:
          "A soft aromatic or tea-based scent — pleasant in close conversation, never overpowering.",
      },
      {
        name: "Outdoor Activities",
        emoji: "🌳",
        suggestion:
          "A fresh green or aquatic blend that works with fresh air and movement.",
      },
      {
        name: "Lazy Sunday",
        emoji: "📖",
        suggestion:
          "A cozy, skin-close musk or soft vanilla — comfort in a bottle.",
      },
    ],
    searchFilter: "Casual",
  },
  {
    slug: "special-event",
    occasion: "Special Event",
    title: "Best Fragrances for Special Events",
    tagline: "Dress up your scent for the occasion",
    emoji: "✨",
    color: "floral",
    heroGradient: "from-family-floral-subtle to-surface-primary",
    description:
      "Special events call for special fragrances — the ones that feel like an event in themselves. Whether it's a wedding, gala, milestone birthday, or holiday celebration, these occasions deserve a scent that matches the significance of the moment. Think bold, memorable compositions with excellent longevity: the kind of fragrance that people remember weeks later and ask you about.",
    whyItMatters:
      "Our strongest scent memories are tied to significant life events. The fragrance you wear to a wedding, graduation, or landmark celebration becomes permanently woven into that memory. This is why reaching for something distinctive — not your everyday scent — elevates the experience. Special event fragrances should be statement-making, long-lasting, and emotionally resonant. This is the time to reach for the good stuff.",
    characteristics: [
      "Statement-making presence that matches the grandeur of the occasion",
      "Exceptional longevity — lasts through hours of celebration",
      "Complex, multi-layered compositions that evolve and surprise",
      "Distinctive enough to be remembered, not just noticed",
      "Rich base notes that leave a lasting impression on everyone you embrace",
    ],
    bestFamilies: [
      {
        name: "Floral",
        slug: "floral",
        why: "Grand florals — rose, tuberose, jasmine — are the classic celebration scents. Opulent, joyful, and inherently festive.",
      },
      {
        name: "Amber",
        slug: "amber",
        why: "Rich vanillas, warm resins, and incense create a luxurious aura perfect for black-tie and evening celebrations.",
      },
      {
        name: "Woody",
        slug: "woody",
        why: "Oud and sandalwood compositions convey sophistication and gravitas worthy of milestone moments.",
      },
    ],
    notesToLookFor: [
      "Rose",
      "Jasmine",
      "Oud",
      "Saffron",
      "Vanilla",
      "Tuberose",
      "Frankincense",
      "Iris",
    ],
    wearingTips: [
      "Use Eau de Parfum or Parfum concentration — events are long, and you need staying power without reapplication.",
      "Apply to warm pulse points AND your outfit's inner lining for a scent that lasts through hours of dancing and celebration.",
      "Don't debut a brand-new fragrance at an important event — wear it at least twice beforehand to know how it develops on your skin.",
      "Spray your hair lightly (or a scarf) for a soft scent trail as you move through the room and greet guests.",
      "If the event spans day to evening (like a wedding), apply in the morning and add a single supplementary spray before the evening portion.",
    ],
    scenarios: [
      {
        name: "Wedding Guest",
        emoji: "💒",
        suggestion:
          "An opulent floral-amber that's celebratory and elegant — rose and oud is a failsafe combination.",
      },
      {
        name: "Black Tie Gala",
        emoji: "🎩",
        suggestion:
          "Your most luxurious oud or incense-based fragrance — this is the occasion it was made for.",
      },
      {
        name: "Birthday Celebration",
        emoji: "🎂",
        suggestion:
          "Something joyful and effervescent — a sparkling floral or warm gourmand that matches the festive energy.",
      },
      {
        name: "Holiday Party",
        emoji: "🎉",
        suggestion:
          "A spicy amber with festive notes like cinnamon or frankincense — seasonal and sophisticated.",
      },
    ],
    searchFilter: "Special Event",
  },
  {
    slug: "outdoor",
    occasion: "Outdoor",
    title: "Best Fragrances for the Outdoors",
    tagline: "Scents that breathe with you",
    emoji: "🌿",
    color: "aromatic",
    heroGradient: "from-family-aromatic-subtle to-surface-primary",
    description:
      "Outdoor fragrances need to work with nature, not against it. Whether you're hiking a trail, hosting a garden party, or spending the day at an outdoor market, the right scent complements fresh air rather than competing with it. The best outdoor fragrances are built on green, herbal, and earthy notes that feel like a natural extension of the environment — present enough to be enjoyed, light enough to let the world in.",
    whyItMatters:
      "Outdoor settings are uniquely challenging for fragrance. Wind disperses scent quickly, sun amplifies sweetness, and you're often moving — so heavy base notes can feel suffocating during physical activity. At the same time, the abundance of natural scents around you (grass, trees, flowers, earth) means your fragrance needs to harmonize, not clash. This is where herbal, green, and woody-fresh compositions shine: they extend the natural world rather than masking it.",
    characteristics: [
      "Light to moderate projection that carries on a breeze without overwhelming",
      "Green, herbal, and earthy notes that harmonize with natural surroundings",
      "Refreshing qualities that stay pleasant during physical activity",
      "Not overly sweet or heavy — nothing that attracts insects or feels cloying in sun",
      "Clean drydowns that don't turn sour with perspiration",
    ],
    bestFamilies: [
      {
        name: "Aromatic",
        slug: "aromatic",
        why: "Lavender, sage, rosemary, and thyme feel completely at home in the outdoors — nature's own fragrance palette.",
      },
      {
        name: "Fresh",
        slug: "fresh",
        why: "Aquatic and green notes complement open air perfectly, adding crispness without competing with natural surroundings.",
      },
      {
        name: "Woody",
        slug: "woody",
        why: "Vetiver, cedar, and cypress add a grounded, earthy quality that blends seamlessly with outdoor environments.",
      },
    ],
    notesToLookFor: [
      "Vetiver",
      "Lavender",
      "Cedar",
      "Mint",
      "Cypress",
      "Green Tea",
      "Grapefruit",
      "Pine",
    ],
    wearingTips: [
      "Choose Eau de Toilette or Eau de Cologne — lighter concentrations work best when you're moving and generating body heat.",
      "Apply to your torso and back of neck rather than wrists — arm movement disperses scent more naturally in open air.",
      "Bring a travel spray for reapplication — outdoor scents fade faster due to air circulation, but that's by design.",
      "Avoid anything with strong vanilla or heavy amber for active outdoor activities — sweetness amplifies unpleasantly with sweat.",
      "Spray your hat or bandana for a gentle diffusion that moves with you without sitting directly on sweating skin.",
    ],
    scenarios: [
      {
        name: "Morning Hike",
        emoji: "🥾",
        suggestion:
          "A crisp green or herbal aromatic that energizes your stride and harmonizes with the trail.",
      },
      {
        name: "Garden Party",
        emoji: "🌸",
        suggestion:
          "A light floral-green blend that mingles with garden flowers rather than competing with them.",
      },
      {
        name: "Beach Walk",
        emoji: "🌊",
        suggestion:
          "A salty aquatic or coconut-citrus blend — nothing heavy, just sun and sea in a bottle.",
      },
      {
        name: "Farmers Market",
        emoji: "🧺",
        suggestion:
          "A gentle herbal or tea-based scent — pleasant for close interactions at stalls without dominating the aroma of fresh produce.",
      },
    ],
    searchFilter: "Outdoor",
  },
];

export function getOccasionGuideBySlug(
  slug: string
): OccasionGuide | undefined {
  return OCCASION_GUIDES.find((g) => g.slug === slug);
}

export function getNotesForOccasion(
  guide: OccasionGuide
): { name: string; description: string }[] {
  return guide.notesToLookFor
    .map((name) => ({
      name,
      description: NOTE_DESCRIPTIONS[name] || "",
    }))
    .filter((n) => n.description);
}
