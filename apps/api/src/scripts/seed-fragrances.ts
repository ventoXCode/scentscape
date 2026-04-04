import { ExecArgs } from "@medusajs/framework/types";
import { FRAGRANCE_MODULE } from "../modules/fragrance";

const SAMPLE_FRAGRANCES = [
  // ─── WOODY (6) ────────────────────────────────────────────────────────────
  {
    title: "Aventus",
    brand: "Creed",
    description:
      "A sophisticated, bold scent with notes of pineapple, birch, and musk. The quintessential power fragrance.",
    variants: [
      { title: "50mL EDP", price: 32500 },
      { title: "100mL EDP", price: 44500 },
    ],
    fragrance: {
      top_notes: ["Pineapple", "Bergamot", "Apple", "Blackcurrant"],
      heart_notes: ["Birch", "Jasmine", "Patchouli", "Rose"],
      base_notes: ["Musk", "Oak Moss", "Vanilla", "Ambergris"],
      accords: ["Woody", "Fruity", "Fresh Spicy"],
      family: "Woody" as const,
      sub_family: "Mossy Woods",
      concentration: "EDP" as const,
      longevity: 4.5,
      sillage: 4.2,
      projection: 4.0,
      gender: "Masculine" as const,
      season: ["Spring", "Fall"],
      occasion: ["Office", "Special Event"],
    },
  },
  {
    title: "Terre d'Hermès",
    brand: "Hermès",
    description:
      "A woody, mineral fragrance that evokes the earth's raw energy — silex, pepper, and vetiver.",
    variants: [
      { title: "75mL EDT", price: 14500 },
      { title: "150mL EDT", price: 21000 },
    ],
    fragrance: {
      top_notes: ["Grapefruit", "Orange", "Pepper"],
      heart_notes: ["Silex", "Flint", "Pelargonium"],
      base_notes: ["Vetiver", "Cedar", "Benzoin"],
      accords: ["Woody", "Earthy", "Citrus"],
      family: "Woody" as const,
      sub_family: "Dry Woods",
      concentration: "EDT" as const,
      longevity: 4.0,
      sillage: 3.5,
      projection: 3.8,
      gender: "Masculine" as const,
      season: ["Spring", "Summer", "Fall"],
      occasion: ["Office", "Casual"],
    },
  },
  {
    title: "Oud Wood",
    brand: "Tom Ford",
    description:
      "An exotic, rare oud wood blended with sandalwood, vetiver, and tonka bean.",
    variants: [
      { title: "50mL EDP", price: 24000 },
      { title: "100mL EDP", price: 38000 },
    ],
    fragrance: {
      top_notes: ["Oud Wood", "Rosewood", "Cardamom"],
      heart_notes: ["Sandalwood", "Vetiver", "Chinese Pepper"],
      base_notes: ["Amber", "Tonka Bean", "Vanilla"],
      accords: ["Oud", "Woody", "Warm Spicy"],
      family: "Woody" as const,
      sub_family: "Oud",
      concentration: "EDP" as const,
      longevity: 4.7,
      sillage: 4.3,
      projection: 4.1,
      gender: "Unisex" as const,
      season: ["Fall", "Winter"],
      occasion: ["Date Night", "Special Event"],
    },
  },
  {
    title: "Bleu de Chanel",
    brand: "Chanel",
    description:
      "A woody aromatic fragrance that embodies freedom. Cedar, labdanum, and sandalwood anchored in citrus.",
    variants: [
      { title: "50mL EDT", price: 11500 },
      { title: "100mL EDT", price: 16500 },
      { title: "150mL EDT", price: 22000 },
    ],
    fragrance: {
      top_notes: ["Citrus", "Grapefruit", "Mint", "Pink Pepper"],
      heart_notes: ["Ginger", "Nutmeg", "Jasmine", "Iso E Super"],
      base_notes: ["Cedar", "Labdanum", "Sandalwood", "Patchouli"],
      accords: ["Woody", "Aromatic", "Citrus", "Fresh Spicy"],
      family: "Woody" as const,
      sub_family: "Woody Aromatic",
      concentration: "EDT" as const,
      longevity: 4.0,
      sillage: 3.8,
      projection: 3.7,
      gender: "Masculine" as const,
      season: ["Spring", "Summer", "Fall"],
      occasion: ["Office", "Casual", "Date Night"],
    },
  },
  {
    title: "Santal 33",
    brand: "Le Labo",
    description:
      "A cult classic. Smoky sandalwood and cedarwood meet cardamom and violet in this iconic unisex scent.",
    variants: [
      { title: "50mL EDP", price: 19700 },
      { title: "100mL EDP", price: 29700 },
    ],
    fragrance: {
      top_notes: ["Cardamom", "Iris"],
      heart_notes: ["Violet", "Ambrette Seeds"],
      base_notes: ["Sandalwood", "Cedar", "Leather", "Musk"],
      accords: ["Woody", "Smoky", "Leathery"],
      family: "Woody" as const,
      sub_family: "Sandalwood",
      concentration: "EDP" as const,
      longevity: 4.3,
      sillage: 3.6,
      projection: 3.4,
      gender: "Unisex" as const,
      season: ["Fall", "Winter"],
      occasion: ["Casual", "Date Night"],
    },
  },
  {
    title: "Vetiver Extraordinaire",
    brand: "Frédéric Malle",
    description:
      "A masterful study in vetiver — earthy, smoky roots balanced with lemon and cedar.",
    variants: [
      { title: "50mL EDP", price: 27500 },
      { title: "100mL EDP", price: 41000 },
    ],
    fragrance: {
      top_notes: ["Lemon", "Bergamot"],
      heart_notes: ["Vetiver", "Nutmeg", "Cedar"],
      base_notes: ["Musk", "Sandalwood", "Amber"],
      accords: ["Woody", "Earthy", "Citrus"],
      family: "Woody" as const,
      sub_family: "Vetiver",
      concentration: "EDP" as const,
      longevity: 4.1,
      sillage: 3.4,
      projection: 3.2,
      gender: "Masculine" as const,
      season: ["Fall", "Winter", "Spring"],
      occasion: ["Office", "Special Event"],
    },
  },

  // ─── FRESH (6) ────────────────────────────────────────────────────────────
  {
    title: "Acqua di Gio",
    brand: "Giorgio Armani",
    description:
      "The Mediterranean sea captured in a bottle — marine, citrus, and wood in timeless balance.",
    variants: [
      { title: "50mL EDT", price: 7500 },
      { title: "100mL EDT", price: 10500 },
    ],
    fragrance: {
      top_notes: ["Calabrian Bergamot", "Lime", "Neroli", "Green Tangerine"],
      heart_notes: ["Rosemary", "Persimmon", "Marine Notes", "Jasmine"],
      base_notes: ["Cedarwood", "Patchouli", "White Musk"],
      accords: ["Aquatic", "Citrus", "Fresh"],
      family: "Fresh" as const,
      sub_family: "Aquatic",
      concentration: "EDT" as const,
      longevity: 3.5,
      sillage: 3.2,
      projection: 3.0,
      gender: "Masculine" as const,
      season: ["Spring", "Summer"],
      occasion: ["Casual", "Office"],
    },
  },
  {
    title: "Ck One",
    brand: "Calvin Klein",
    description:
      "The original unisex fragrance. Clean, fresh green tea and citrus for every day.",
    variants: [
      { title: "100mL EDT", price: 5500 },
      { title: "200mL EDT", price: 8000 },
    ],
    fragrance: {
      top_notes: ["Bergamot", "Cardamom", "Lemon", "Papaya"],
      heart_notes: ["Green Tea", "Violet", "Rose", "Jasmine", "Lily of the Valley"],
      base_notes: ["Amber", "Musk", "Sandalwood", "Cedar"],
      accords: ["Fresh", "Citrus", "Green"],
      family: "Fresh" as const,
      sub_family: "Green",
      concentration: "EDT" as const,
      longevity: 2.5,
      sillage: 2.8,
      projection: 2.6,
      gender: "Unisex" as const,
      season: ["Spring", "Summer"],
      occasion: ["Casual"],
    },
  },
  {
    title: "L'Eau d'Issey",
    brand: "Issey Miyake",
    description:
      "A revolutionary aquatic floral — lotus, cyclamen, and white cedar conjure pure water.",
    variants: [
      { title: "50mL EDT", price: 7900 },
      { title: "100mL EDT", price: 11500 },
    ],
    fragrance: {
      top_notes: ["Cyclamen", "Lotus", "Calone"],
      heart_notes: ["Lily", "Carnation", "Peony"],
      base_notes: ["Sandalwood", "Cedar", "Amber", "Musk"],
      accords: ["Aquatic", "Fresh Floral", "Powdery"],
      family: "Fresh" as const,
      sub_family: "Aquatic Floral",
      concentration: "EDT" as const,
      longevity: 3.2,
      sillage: 3.0,
      projection: 2.8,
      gender: "Feminine" as const,
      season: ["Spring", "Summer"],
      occasion: ["Office", "Casual"],
    },
  },
  {
    title: "Light Blue",
    brand: "Dolce & Gabbana",
    description:
      "Sparkling Sicilian citron and apple blossom — the essence of a Mediterranean summer.",
    variants: [
      { title: "50mL EDT", price: 8500 },
      { title: "100mL EDT", price: 12500 },
    ],
    fragrance: {
      top_notes: ["Sicilian Citron", "Apple Blossom", "Bellflower"],
      heart_notes: ["Bamboo", "Jasmine", "White Rose"],
      base_notes: ["Cedarwood", "Amber", "Musk"],
      accords: ["Citrus", "Fresh", "Aquatic"],
      family: "Fresh" as const,
      sub_family: "Citrus",
      concentration: "EDT" as const,
      longevity: 3.0,
      sillage: 3.1,
      projection: 2.9,
      gender: "Feminine" as const,
      season: ["Spring", "Summer"],
      occasion: ["Casual", "Date Night"],
    },
  },
  {
    title: "Neroli Portofino",
    brand: "Tom Ford",
    description:
      "The Italian Riviera in a flacon — neroli, citrus, and white flowers over soft musk.",
    variants: [
      { title: "50mL EDP", price: 24000 },
      { title: "100mL EDP", price: 37500 },
    ],
    fragrance: {
      top_notes: ["Bergamot", "Lemon", "Bitter Orange", "Mandarin"],
      heart_notes: ["Neroli", "Jasmine", "Pitosporum"],
      base_notes: ["Amber", "White Musk", "Cypress"],
      accords: ["Citrus", "Fresh", "Floral"],
      family: "Fresh" as const,
      sub_family: "Citrus Aromatic",
      concentration: "EDP" as const,
      longevity: 3.8,
      sillage: 3.3,
      projection: 3.2,
      gender: "Unisex" as const,
      season: ["Spring", "Summer"],
      occasion: ["Casual", "Office"],
    },
  },
  {
    title: "Eau Sauvage",
    brand: "Christian Dior",
    description:
      "The original fresh aromatic cologne — Hedione jasmine, citrus, and vetiver since 1966.",
    variants: [
      { title: "100mL EDT", price: 11000 },
      { title: "200mL EDT", price: 15500 },
    ],
    fragrance: {
      top_notes: ["Lemon", "Rosemary", "Calabrian Bergamot"],
      heart_notes: ["Hedione Jasmine", "Basil", "Caraway"],
      base_notes: ["Vetiver", "Oakmoss", "Amber"],
      accords: ["Citrus", "Aromatic", "Fresh"],
      family: "Fresh" as const,
      sub_family: "Aromatic Fougère",
      concentration: "EDT" as const,
      longevity: 3.6,
      sillage: 3.3,
      projection: 3.1,
      gender: "Masculine" as const,
      season: ["Spring", "Summer"],
      occasion: ["Casual", "Office"],
    },
  },

  // ─── FLORAL (5) ───────────────────────────────────────────────────────────
  {
    title: "Miss Dior",
    brand: "Christian Dior",
    description:
      "Rosy grasse peony and Grasse rose absolute balanced with patchouli — romantic femininity.",
    variants: [
      { title: "30mL EDP", price: 10500 },
      { title: "50mL EDP", price: 14500 },
      { title: "100mL EDP", price: 20500 },
    ],
    fragrance: {
      top_notes: ["Calabrian Bergamot", "Blood Orange", "Aldehydes"],
      heart_notes: ["Grasse Rose Absolute", "Peony", "Lily of the Valley"],
      base_notes: ["Patchouli", "Labdanum", "White Musk"],
      accords: ["Floral", "Powdery", "Fresh"],
      family: "Floral" as const,
      sub_family: "Floral Powdery",
      concentration: "EDP" as const,
      longevity: 4.0,
      sillage: 3.7,
      projection: 3.5,
      gender: "Feminine" as const,
      season: ["Spring", "Summer"],
      occasion: ["Date Night", "Special Event", "Office"],
    },
  },
  {
    title: "Chance",
    brand: "Chanel",
    description:
      "An unexpected floral — round and luminous with white musk, jasmine, and iris.",
    variants: [
      { title: "50mL EDT", price: 11500 },
      { title: "100mL EDT", price: 16000 },
    ],
    fragrance: {
      top_notes: ["Citrus", "Pink Pepper"],
      heart_notes: ["Jasmine", "Iris", "Hyacinth"],
      base_notes: ["White Musk", "Amber", "Vetiver", "Patchouli"],
      accords: ["Floral", "Citrus", "Powdery"],
      family: "Floral" as const,
      sub_family: "Soft Floral",
      concentration: "EDT" as const,
      longevity: 3.9,
      sillage: 3.5,
      projection: 3.4,
      gender: "Feminine" as const,
      season: ["Spring", "Summer", "Fall"],
      occasion: ["Office", "Casual", "Date Night"],
    },
  },
  {
    title: "Joy",
    brand: "Jean Patou",
    description:
      "The costliest perfume in the world — 10,600 jasmine flowers and 28 dozen roses per bottle.",
    variants: [
      { title: "30mL EDP", price: 16500 },
      { title: "75mL EDP", price: 31000 },
    ],
    fragrance: {
      top_notes: ["Aldehydes", "Ylang-Ylang", "Rose"],
      heart_notes: ["Grasse Rose", "Jasmine"],
      base_notes: ["Sandalwood", "Civet", "Musk"],
      accords: ["Floral", "Powdery"],
      family: "Floral" as const,
      sub_family: "Floral Aldehyde",
      concentration: "EDP" as const,
      longevity: 4.2,
      sillage: 3.8,
      projection: 3.6,
      gender: "Feminine" as const,
      season: ["Spring", "Summer"],
      occasion: ["Special Event", "Date Night"],
    },
  },
  {
    title: "Daisy",
    brand: "Marc Jacobs",
    description:
      "A light-hearted floral bouquet of violet, jasmine, and sandalwood — youthful and carefree.",
    variants: [
      { title: "50mL EDT", price: 9000 },
      { title: "100mL EDT", price: 13000 },
    ],
    fragrance: {
      top_notes: ["Wild Berries", "Violet Leaves", "Grapefruit"],
      heart_notes: ["Violet", "Jasmine", "Gardenia"],
      base_notes: ["Vanilla", "Sandalwood", "White Musk"],
      accords: ["Floral", "Fruity", "Powdery"],
      family: "Floral" as const,
      sub_family: "Fruity Floral",
      concentration: "EDT" as const,
      longevity: 3.4,
      sillage: 3.0,
      projection: 2.8,
      gender: "Feminine" as const,
      season: ["Spring", "Summer"],
      occasion: ["Casual", "Office"],
    },
  },
  {
    title: "Flower by Kenzo",
    brand: "Kenzo",
    description:
      "Radiant and powdery — a poetic red poppy in a concrete jungle, rose and white musk.",
    variants: [
      { title: "50mL EDP", price: 9500 },
      { title: "100mL EDP", price: 13500 },
    ],
    fragrance: {
      top_notes: ["Cassis", "Bulgar Rose"],
      heart_notes: ["Rose", "Violet"],
      base_notes: ["White Musk", "Vanilla"],
      accords: ["Floral", "Powdery", "Musky"],
      family: "Floral" as const,
      sub_family: "Floral Musky",
      concentration: "EDP" as const,
      longevity: 3.6,
      sillage: 3.2,
      projection: 3.0,
      gender: "Feminine" as const,
      season: ["Spring", "Fall"],
      occasion: ["Casual", "Office"],
    },
  },

  // ─── AMBER (5) ────────────────────────────────────────────────────────────
  {
    title: "Baccarat Rouge 540",
    brand: "Maison Francis Kurkdjian",
    description:
      "A poetic alchemy of jasmine, saffron, and cedarwood ambergris — crystalline and iconic.",
    variants: [
      { title: "35mL EDP", price: 19500 },
      { title: "70mL EDP", price: 32500 },
      { title: "200mL EDP", price: 62000 },
    ],
    fragrance: {
      top_notes: ["Saffron", "Jasmine"],
      heart_notes: ["Ambergris", "Amberwood"],
      base_notes: ["Fir Resin", "Cedar"],
      accords: ["Amber", "Warm Spicy", "Sweet"],
      family: "Amber" as const,
      sub_family: "Soft Amber",
      concentration: "EDP" as const,
      longevity: 4.8,
      sillage: 4.5,
      projection: 4.3,
      gender: "Unisex" as const,
      season: ["Fall", "Winter"],
      occasion: ["Date Night", "Special Event"],
    },
  },
  {
    title: "Black Opium",
    brand: "Yves Saint Laurent",
    description:
      "A rock-edged floriental — black coffee and vanilla laced with orange blossom and patchouli.",
    variants: [
      { title: "30mL EDP", price: 8500 },
      { title: "50mL EDP", price: 12000 },
      { title: "90mL EDP", price: 17500 },
    ],
    fragrance: {
      top_notes: ["Pink Pepper", "Orange Blossom", "Pear"],
      heart_notes: ["Coffee", "Bitter Almond", "Jasmine"],
      base_notes: ["Patchouli", "Vanilla", "White Musk", "Cedar"],
      accords: ["Amber", "Sweet", "Coffee"],
      family: "Amber" as const,
      sub_family: "Amber Floral",
      concentration: "EDP" as const,
      longevity: 4.3,
      sillage: 4.0,
      projection: 3.8,
      gender: "Feminine" as const,
      season: ["Fall", "Winter"],
      occasion: ["Date Night", "Casual"],
    },
  },
  {
    title: "Alien",
    brand: "Thierry Mugler",
    description:
      "Otherworldly white floral — luminous jasmine with woody amber and cashmeran.",
    variants: [
      { title: "30mL EDP", price: 9500 },
      { title: "60mL EDP", price: 14500 },
      { title: "90mL EDP", price: 19000 },
    ],
    fragrance: {
      top_notes: ["Jasmine Sambac"],
      heart_notes: ["Jasmine Absolute", "Heliotrope"],
      base_notes: ["White Amber", "Cashmeran", "Woody Notes"],
      accords: ["Amber", "Floral", "Woody"],
      family: "Amber" as const,
      sub_family: "Amber Woody",
      concentration: "EDP" as const,
      longevity: 4.6,
      sillage: 4.4,
      projection: 4.2,
      gender: "Feminine" as const,
      season: ["Fall", "Winter"],
      occasion: ["Special Event", "Date Night"],
    },
  },
  {
    title: "Opium",
    brand: "Yves Saint Laurent",
    description:
      "A legendary oriental spicy — incense, spices, and florals over a base of benzoin and vetiver.",
    variants: [
      { title: "30mL EDP", price: 8200 },
      { title: "50mL EDP", price: 11000 },
    ],
    fragrance: {
      top_notes: ["Mandarin", "Plum", "Bay Leaf", "Pepper"],
      heart_notes: ["Jasmine", "Rose", "Carnation", "Lily of the Valley"],
      base_notes: ["Incense", "Vetiver", "Sandalwood", "Benzoin", "Amber"],
      accords: ["Amber", "Warm Spicy", "Floral"],
      family: "Amber" as const,
      sub_family: "Oriental Spicy",
      concentration: "EDP" as const,
      longevity: 4.5,
      sillage: 4.3,
      projection: 4.1,
      gender: "Feminine" as const,
      season: ["Fall", "Winter"],
      occasion: ["Date Night", "Special Event"],
    },
  },
  {
    title: "Tobacco Vanille",
    brand: "Tom Ford",
    description:
      "Warm, rich, and deeply indulgent — tobacco leaf, spices, tonka, and vanilla absolute.",
    variants: [
      { title: "50mL EDP", price: 26500 },
      { title: "100mL EDP", price: 41000 },
    ],
    fragrance: {
      top_notes: ["Tobacco Leaf", "Spices"],
      heart_notes: ["Tobacco Blossom", "Jasmine", "Cacao"],
      base_notes: ["Dried Fruit", "Tonka Bean", "Vanilla", "Woody Notes"],
      accords: ["Amber", "Sweet", "Warm Spicy"],
      family: "Amber" as const,
      sub_family: "Warm Amber",
      concentration: "EDP" as const,
      longevity: 4.7,
      sillage: 4.2,
      projection: 4.0,
      gender: "Unisex" as const,
      season: ["Fall", "Winter"],
      occasion: ["Date Night", "Casual"],
    },
  },
];

export default async function seedFragrances({ container }: ExecArgs) {
  const productService = container.resolve("productModuleService");
  const fragranceService = container.resolve(FRAGRANCE_MODULE);

  console.log(`Seeding ${SAMPLE_FRAGRANCES.length} fragrances...`);

  for (const item of SAMPLE_FRAGRANCES) {
    const handle = item.title.toLowerCase().replace(/[\s'&]/g, "-").replace(/-+/g, "-");

    const product = await productService.createProducts({
      title: item.title,
      description: item.description,
      handle,
      status: "published",
      options: [{ title: "Size", values: item.variants.map((v) => v.title) }],
      variants: item.variants.map((v) => ({
        title: v.title,
        prices: [{ amount: v.price, currency_code: "usd" }],
        options: { Size: v.title },
      })),
      metadata: { brand: item.brand },
    });

    await fragranceService.upsertForProduct(product.id, item.fragrance);

    console.log(`  Seeded: ${item.brand} — ${item.title}`);
  }

  console.log("Done seeding fragrances.");
}
