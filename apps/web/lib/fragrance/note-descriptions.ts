// Sensory descriptions for common fragrance notes, used in hover tooltips
export const NOTE_DESCRIPTIONS: Record<string, string> = {
  // Citrus
  Bergamot: "Bright and citrusy with a subtle floral undertone",
  Lemon: "Zesty, clean, and sparkling",
  Orange: "Sweet and juicy citrus",
  Grapefruit: "Tart, energizing citrus",
  Mandarin: "Sweet, soft citrus with a hint of floral",
  Lime: "Sharp, fresh, and green",
  Yuzu: "Delicate Japanese citrus, tart and aromatic",
  Neroli: "Bright, honeyed orange blossom distillate",
  "Blood Orange": "Rich, berry-tinged citrus",
  Petitgrain: "Fresh, green, slightly woody citrus leaf",

  // Floral
  Rose: "Rich, romantic, and velvety floral",
  Jasmine: "Heady, sweet, and intoxicating white floral",
  Iris: "Powdery, elegant, and subtly sweet",
  Violet: "Soft, powdery floral with green undertones",
  Tuberose: "Rich, creamy, intensely sweet floral",
  "Orange Blossom": "Sweet, honeyed, and delicately floral",
  "Lily of the Valley": "Fresh, green, and dewy floral",
  Peony: "Light, fresh, and softly sweet",
  Magnolia: "Creamy, lemony floral with velvet depth",
  "Ylang-Ylang": "Rich, tropical, and slightly spicy floral",
  Geranium: "Green, slightly rosy, with a minty edge",
  Freesia: "Light, peppery, and delicately sweet",
  Heliotrope: "Powdery, almond-like, subtly sweet",
  Orchid: "Exotic, velvety, and softly sweet",

  // Woody
  Sandalwood: "Creamy, warm, and softly woody",
  Cedar: "Dry, clean, pencil-like wood",
  Cedarwood: "Dry, clean, pencil-like wood",
  Vetiver: "Earthy, smoky, and subtly green",
  Patchouli: "Rich, earthy, with sweet and woody depth",
  Oud: "Deep, complex, smoky wood resin",
  Birch: "Smoky, leathery, with a rustic edge",
  "Guaiac Wood": "Smoky, slightly sweet, with tea-like nuances",
  Pine: "Fresh, resinous, and forest-green",
  Cypress: "Sharp, green, and slightly smoky",
  Teak: "Rich, warm, and slightly honeyed wood",

  // Spicy
  Cardamom: "Warm, aromatic, with a touch of sweetness",
  Cinnamon: "Warm, sweet, and spicy",
  "Black Pepper": "Sharp, warm, and peppery bite",
  "Pink Pepper": "Bright, spicy, with a fruity sparkle",
  Saffron: "Warm, leathery, with a subtle sweetness",
  Clove: "Warm, rich, and slightly numbing spice",
  Ginger: "Fresh, zesty warmth with a clean bite",
  Nutmeg: "Warm, sweet, and comforting spice",
  "Star Anise": "Sweet, licorice-like, and aromatic",
  Cumin: "Warm, earthy, with a musky edge",

  // Sweet / Gourmand
  Vanilla: "Warm, sweet, and enveloping",
  "Tonka Bean": "Sweet, warm, with almond and caramel nuances",
  Caramel: "Rich, buttery sweetness",
  Honey: "Golden, sweet, and slightly animalic",
  Chocolate: "Rich, bittersweet, and comforting",
  Coffee: "Rich, roasted, with bittersweet depth",
  Praline: "Nutty, caramelized, and sweet",
  "Brown Sugar": "Warm, molasses-tinged sweetness",

  // Amber / Resin
  Amber: "Warm, resinous, and sensual",
  Benzoin: "Sweet, balsamic vanilla-like resin",
  Frankincense: "Sacred, smoky, with citrus-like brightness",
  Myrrh: "Rich, balsamic, with earthy sweetness",
  Labdanum: "Dark, ambery, with leather undertones",
  Copal: "Bright, citrusy, and lightly smoky resin",
  Elemi: "Fresh, lemony resin with a hint of pepper",

  // Fresh / Green / Herbal
  Mint: "Cool, crisp, and refreshing",
  Basil: "Aromatic, green, slightly sweet herbal",
  Lavender: "Fresh, herbal, calming floral",
  Rosemary: "Herbal, camphoraceous, and invigorating",
  Tea: "Clean, green, subtly tannic",
  "Green Tea": "Light, clean, and gently astringent",
  "White Tea": "Delicate, airy, and softly sweet",
  Thyme: "Herbal, slightly medicinal, earthy",
  Sage: "Aromatic, slightly camphorous herbal",
  Chamomile: "Gentle, apple-like, herbal sweetness",

  // Animalic / Musky
  Musk: "Soft, warm, and skin-like",
  "White Musk": "Clean, soft, and powdery",
  Leather: "Rich, smoky, and slightly animalic",
  Ambergris: "Salty, marine, with a warm sweetness",
  Castoreum: "Leathery, warm, and animalic",
  Suede: "Soft, powdery, with a delicate texture",

  // Fruity
  Peach: "Soft, juicy, and velvety sweet",
  Apple: "Crisp, fresh, and slightly sweet",
  Raspberry: "Bright, tart, and berry-sweet",
  Plum: "Rich, dark, and sweetly juicy",
  Fig: "Green, milky, and subtly sweet",
  Coconut: "Tropical, creamy, and sweet",
  Pear: "Crisp, clean, and gently sweet",
  Blackcurrant: "Tart, fruity, with green undertones",
  Cherry: "Sweet, bright, and slightly tart",
  Apricot: "Soft, sweet, and subtly velvety",

  // Aquatic / Ozonic
  "Sea Salt": "Mineral, briny, and oceanic",
  "Ocean Breeze": "Fresh, salty, and airy",
  Ozone: "Clean, sharp, and electric freshness",

  // Smoky / Incense
  Incense: "Sacred, smoky, and meditative",
  Tobacco: "Rich, sweet, and warmly aromatic",
  Moss: "Earthy, green, and damp forest floor",
  "Oak Moss": "Earthy, green, and richly forest-like",
};

export function getNoteDescription(note: string): string | undefined {
  return NOTE_DESCRIPTIONS[note];
}
