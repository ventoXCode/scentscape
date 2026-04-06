/**
 * Auto-generated fragrance seed data with images.
 * Source: Parfumo TidyTuesday dataset + Unsplash/Pexels images
 * Generated: 2026-04-05
 * Count: 100 fragrances
 */

export interface SeedFragrance {
  title: string;
  brand: string;
  description: string;
  concentration: string;
  thumbnail: string | null;
  images: string[];
  variants: Array<{ title: string; price: number }>;
  fragrance: {
    top_notes: string[];
    heart_notes: string[];
    base_notes: string[];
    accords: string[];
    family: "Fresh" | "Floral" | "Amber" | "Woody";
    sub_family: string;
    concentration: "EDC" | "EDT" | "EDP" | "Parfum" | "Extrait";
    longevity: number;
    sillage: number;
    projection: number;
    gender: "Masculine" | "Feminine" | "Unisex";
    season: string[];
    occasion: string[];
  };
}

export const SEED_FRAGRANCES: SeedFragrance[] = 
[
  {
    "title": "Aventus",
    "brand": "Creed",
    "description": "A fresh fruity fragrance by Creed",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Apple",
        "Bergamot",
        "Blackcurrant",
        "Lemon",
        "Pink pepper"
      ],
      "heart_notes": [
        "Pineapple",
        "Indonesian patchouli",
        "Jasmine"
      ],
      "base_notes": [
        "Birch",
        "Ambergris",
        "Cedarwood",
        "Musk",
        "Oakmoss"
      ],
      "accords": [
        "Fresh",
        "Fruity",
        "Citrus",
        "Woody",
        "Smoky"
      ],
      "family": "Fresh",
      "sub_family": "Fresh",
      "concentration": "EDP",
      "longevity": 3.6,
      "sillage": 3.4,
      "projection": 3.2,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Office",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Green Irish Tweed",
    "brand": "Creed",
    "description": "A fresh green fragrance by Creed",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Vervain",
        "Bergamot",
        "Galbanum",
        "Lemon",
        "Peppermint"
      ],
      "heart_notes": [
        "Lavender",
        "Violet",
        "Violet leaf",
        "Egyptian geranium"
      ],
      "base_notes": [
        "Ambergris",
        "Cedarwood",
        "Oakmoss",
        "Indian sandalwood"
      ],
      "accords": [
        "Green",
        "Fresh",
        "Aquatic",
        "Woody",
        "Spicy"
      ],
      "family": "Fresh",
      "sub_family": "Green",
      "concentration": "EDP",
      "longevity": 3.3,
      "sillage": 3.1,
      "projection": 2.9,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Outdoor",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Sauvage",
    "brand": "Dior",
    "description": "A fresh spicy fragrance by Dior",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Nutmeg",
        "Cardamom",
        "Cinnamon",
        "Grapefruit"
      ],
      "heart_notes": [
        "Provençal lavender",
        "Coumarin"
      ],
      "base_notes": [
        "Liquorice",
        "Ambroxan",
        "Patchouli",
        "Woods",
        "Haitian vetiver"
      ],
      "accords": [
        "Spicy",
        "Woody",
        "Sweet",
        "Fresh",
        "Synthetic"
      ],
      "family": "Fresh",
      "sub_family": "Spicy",
      "concentration": "EDP",
      "longevity": 3.6,
      "sillage": 3.4,
      "projection": 3.2,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1760860992203-85ca32536788?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxEaW9yJTIwU2F1dmFnZSUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4OXww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1760860992203-85ca32536788?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxEaW9yJTIwU2F1dmFnZSUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4OXww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Bleu de Chanel",
    "brand": "Chanel",
    "description": "A fresh spicy fragrance by Chanel",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Citrus notes",
        "Pink pepper",
        "Vetiver"
      ],
      "heart_notes": [
        "Grapefruit",
        "Cedar",
        "Labdanum"
      ],
      "base_notes": [
        "Ginger",
        "Sandalwood",
        "Frankincense"
      ],
      "accords": [
        "Spicy",
        "Woody",
        "Fresh",
        "Aquatic",
        "Fruity"
      ],
      "family": "Fresh",
      "sub_family": "Spicy",
      "concentration": "EDP",
      "longevity": 3.5,
      "sillage": 3.3,
      "projection": 3.1,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Outdoor",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1731855315921-7be11aa1879d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxDaGFuZWwlMjBwZXJmdW1lfGVufDB8Mnx8fDE3NzU0MDQ0OTF8MA&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1731855315921-7be11aa1879d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxDaGFuZWwlMjBwZXJmdW1lfGVufDB8Mnx8fDE3NzU0MDQ0OTF8MA&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Acqua di Gio",
    "brand": "Giorgio Armani",
    "description": "A fresh floral fragrance by Giorgio Armani",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Mint",
        "Lemon",
        "Pink pepper"
      ],
      "heart_notes": [
        "Jasmine"
      ],
      "base_notes": [
        "Cashmeran",
        "Sugar",
        "Cedarwood"
      ],
      "accords": [
        "Fresh",
        "Floral",
        "Aquatic",
        "Sweet",
        "Citrus"
      ],
      "family": "Fresh",
      "sub_family": "Fresh",
      "concentration": "EDP",
      "longevity": 3.3,
      "sillage": 3.1,
      "projection": 2.9,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Outdoor",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Le Male",
    "brand": "Jean Paul Gaultier",
    "description": "A fresh spicy fragrance by Jean Paul Gaultier",
    "concentration": "EDT",
    "variants": [
      {
        "title": "75mL EDT",
        "price": 8500
      },
      {
        "title": "125mL EDT",
        "price": 11000
      }
    ],
    "fragrance": {
      "top_notes": [
        "Mint",
        "Lavender",
        "Bergamot",
        "Cardamom"
      ],
      "heart_notes": [
        "Orange Blossom",
        "Cinnamon",
        "Cumin"
      ],
      "base_notes": [
        "Vanilla",
        "Tonka Bean",
        "Sandalwood",
        "Cedar",
        "Amber"
      ],
      "accords": [
        "Fresh",
        "Sweet",
        "Aromatic",
        "Amber",
        "Powdery"
      ],
      "family": "Fresh",
      "sub_family": "Aromatic",
      "concentration": "EDT",
      "longevity": 3.5,
      "sillage": 3.3,
      "projection": 3.0,
      "gender": "Masculine",
      "season": [
        "Fall",
        "Winter",
        "Spring"
      ],
      "occasion": [
        "Casual",
        "Date Night"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1703681036028-b4dbb8811230?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxKZWFuJTIwUGF1bCUyMEdhdWx0aWVyJTIwTGUlMjBNYWxlJTIwcGVyZnVtZSUyMGJvdHRsZXxlbnwwfDJ8fHwxNzc1NDA0NDk0fDA&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1703681036028-b4dbb8811230?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxKZWFuJTIwUGF1bCUyMEdhdWx0aWVyJTIwTGUlMjBNYWxlJTIwcGVyZnVtZSUyMGJvdHRsZXxlbnwwfDJ8fHwxNzc1NDA0NDk0fDA&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "1 Million",
    "brand": "Paco Rabanne",
    "description": "A spicy leather fragrance by Paco Rabanne",
    "concentration": "EDT",
    "variants": [
      {
        "title": "50mL EDT",
        "price": 8500
      },
      {
        "title": "100mL EDT",
        "price": 11500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Grapefruit",
        "Mint",
        "Blood Mandarin"
      ],
      "heart_notes": [
        "Rose",
        "Cinnamon",
        "Spicy Notes"
      ],
      "base_notes": [
        "Leather",
        "Amber",
        "Woody Notes",
        "Patchouli"
      ],
      "accords": [
        "Spicy",
        "Sweet",
        "Leather",
        "Amber",
        "Fresh"
      ],
      "family": "Amber",
      "sub_family": "Warm Spicy",
      "concentration": "EDT",
      "longevity": 3.5,
      "sillage": 3.5,
      "projection": 3.3,
      "gender": "Masculine",
      "season": [
        "Fall",
        "Winter"
      ],
      "occasion": [
        "Date Night",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1772191399367-91ed8d95664b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxhbWJlciUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ5N3ww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1772191399367-91ed8d95664b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxhbWJlciUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Eros",
    "brand": "Versace",
    "description": "A fresh sweet fragrance by Versace",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Mandarin orange",
        "Chinotto",
        "Lemon",
        "Madagascar pepper",
        "Rosemary"
      ],
      "heart_notes": [
        "Pepperwood™",
        "Rose",
        "Geranium"
      ],
      "base_notes": [
        "Tonka bean",
        "Vanilla",
        "Patchouli",
        "Sandalwood",
        "Texas cedar",
        "Haitian vetiver"
      ],
      "accords": [
        "Sweet",
        "Spicy",
        "Citrus",
        "Fruity",
        "Synthetic"
      ],
      "family": "Fresh",
      "sub_family": "Sweet",
      "concentration": "EDP",
      "longevity": 3.6,
      "sillage": 3.4,
      "projection": 3.2,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "The One",
    "brand": "Dolce & Gabbana",
    "description": "A floral fruity fragrance by Dolce & Gabbana",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Mandarin orange",
        "Blackcurrant",
        "Pink grapefruit"
      ],
      "heart_notes": [
        "Rose",
        "Lychee",
        "Lily",
        "Peony"
      ],
      "base_notes": [
        "Vanilla",
        "Amber",
        "Musk"
      ],
      "accords": [
        "Floral",
        "Fruity",
        "Sweet",
        "Fresh",
        "Powdery"
      ],
      "family": "Floral",
      "sub_family": "Floral",
      "concentration": "EDP",
      "longevity": 3.6,
      "sillage": 3.4,
      "projection": 3.2,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=800&q=80"
    ]
  },
  {
    "title": "Spicebomb",
    "brand": "Viktor & Rolf",
    "description": "A amber spicy fragrance by Viktor & Rolf",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Pink pepper",
        "Bergamot",
        "Grapefruit"
      ],
      "heart_notes": [
        "Cinnamon",
        "Chili",
        "Saffron"
      ],
      "base_notes": [
        "Tobacco",
        "Leather",
        "Vetiver"
      ],
      "accords": [
        "Spicy",
        "Sweet",
        "Oriental",
        "Woody",
        "Gourmand"
      ],
      "family": "Amber",
      "sub_family": "Spicy",
      "concentration": "EDP",
      "longevity": 3.9,
      "sillage": 3.7,
      "projection": 3.5,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1636730431099-20607b24ded9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxWaWt0b3IlMjAlMjYlMjBSb2xmJTIwU3BpY2Vib21iJTIwcGVyZnVtZSUyMGJvdHRsZXxlbnwwfDJ8fHwxNzc1NDA0NTAyfDA&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1636730431099-20607b24ded9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxWaWt0b3IlMjAlMjYlMjBSb2xmJTIwU3BpY2Vib21iJTIwcGVyZnVtZSUyMGJvdHRsZXxlbnwwfDJ8fHwxNzc1NDA0NTAyfDA&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Dylan Blue",
    "brand": "Versace",
    "description": "A fresh fruity fragrance by Versace",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Granny Smith apple",
        "Shisolia®",
        "Blackcurrant sorbet",
        "Clover",
        "Forget-me-not"
      ],
      "heart_notes": [
        "Rosyfolia®",
        "Peach",
        "Petalia®",
        "Eglantine rose",
        "Jasmine sambac"
      ],
      "base_notes": [
        "Musk",
        "Blond woods",
        "Patchouli",
        "Styrax"
      ],
      "accords": [
        "Fruity",
        "Floral",
        "Fresh",
        "Synthetic",
        "Sweet"
      ],
      "family": "Fresh",
      "sub_family": "Fruity",
      "concentration": "EDP",
      "longevity": 3.6,
      "sillage": 3.4,
      "projection": 3.2,
      "gender": "Feminine",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Terre d'Hermès",
    "brand": "Hermès",
    "description": "A fresh citrus fragrance by Hermès",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Citrus fruits",
        "Orange",
        "Aquatic notes"
      ],
      "heart_notes": [
        "Geranium"
      ],
      "base_notes": [
        "Cedar",
        "Woody notes",
        "Patchouli"
      ],
      "accords": [
        "Citrus",
        "Fresh",
        "Woody",
        "Spicy",
        "Fruity"
      ],
      "family": "Fresh",
      "sub_family": "Citrus",
      "concentration": "EDP",
      "longevity": 3.5,
      "sillage": 3.3,
      "projection": 3.1,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Y",
    "brand": "Yves Saint Laurent",
    "description": "A fresh synthetic fragrance by Yves Saint Laurent",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Calabrian bergamot",
        "Bergamot leaf"
      ],
      "heart_notes": [
        "Tunisian orange blossom absolute"
      ],
      "base_notes": [
        "Ambrofix",
        "Woods",
        "Indonesian patchouli"
      ],
      "accords": [
        "Fresh",
        "Synthetic",
        "Woody",
        "Sweet",
        "Floral"
      ],
      "family": "Fresh",
      "sub_family": "Fresh",
      "concentration": "EDP",
      "longevity": 3.6,
      "sillage": 3.4,
      "projection": 3.2,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1666769474689-39ef79f4bceb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxZdmVzJTIwU2FpbnQlMjBMYXVyZW50JTIwWSUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDUwN3ww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1666769474689-39ef79f4bceb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxZdmVzJTIwU2FpbnQlMjBMYXVyZW50JTIwWSUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDUwN3ww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Explorer",
    "brand": "Montblanc",
    "description": "A fresh citrus fragrance by Montblanc",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Italian bergamot",
        "Pink pepper",
        "Sage"
      ],
      "heart_notes": [
        "Haitian vetiver",
        "Leather"
      ],
      "base_notes": [
        "Ambroxan",
        "Akigalawood®",
        "Indonesian patchouli",
        "Cocoa"
      ],
      "accords": [
        "Fresh",
        "Citrus",
        "Woody",
        "Fruity",
        "Synthetic"
      ],
      "family": "Fresh",
      "sub_family": "Fresh",
      "concentration": "EDP",
      "longevity": 3.5,
      "sillage": 3.3,
      "projection": 3.1,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Office",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "L'Homme",
    "brand": "Yves Saint Laurent",
    "description": "A fresh citrus fragrance by Yves Saint Laurent",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Aldehydes",
        "Bergamot",
        "Vervain"
      ],
      "heart_notes": [
        "Cardamom",
        "Elemi resin"
      ],
      "base_notes": [
        "Cedar",
        "Amber"
      ],
      "accords": [
        "Citrus",
        "Fresh",
        "Woody",
        "Spicy",
        "Synthetic"
      ],
      "family": "Fresh",
      "sub_family": "Citrus",
      "concentration": "EDP",
      "longevity": 3.5,
      "sillage": 3.3,
      "projection": 3.1,
      "gender": "Masculine",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1666769474689-39ef79f4bceb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxZdmVzJTIwU2FpbnQlMjBMYXVyZW50JTIwcGVyZnVtZXxlbnwwfDJ8fHwxNzc1NDA0NTEyfDA&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1666769474689-39ef79f4bceb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxZdmVzJTIwU2FpbnQlMjBMYXVyZW50JTIwcGVyZnVtZXxlbnwwfDJ8fHwxNzc1NDA0NTEyfDA&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Invictus",
    "brand": "Paco Rabanne",
    "description": "A fresh aquatic fragrance by Paco Rabanne",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Yuzu zest",
        "Grapefruit zest",
        "Pink pepper"
      ],
      "heart_notes": [
        "Marine notes",
        "Violet leaf"
      ],
      "base_notes": [
        "Ambergris",
        "Gaiac wood",
        "Woods"
      ],
      "accords": [
        "Fresh",
        "Aquatic",
        "Synthetic",
        "Citrus",
        "Sweet"
      ],
      "family": "Fresh",
      "sub_family": "Fresh",
      "concentration": "EDP",
      "longevity": 3.3,
      "sillage": 3.1,
      "projection": 2.9,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Outdoor"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Allure Homme Sport",
    "brand": "Chanel",
    "description": "A fresh citrus fragrance by Chanel",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Sicilian mandarin orange"
      ],
      "heart_notes": [
        "Lovage",
        "Elemi resin"
      ],
      "base_notes": [
        "White musk",
        "Cedarwood",
        "Amber"
      ],
      "accords": [
        "Citrus",
        "Fresh",
        "Fruity",
        "Green",
        "Spicy"
      ],
      "family": "Fresh",
      "sub_family": "Citrus",
      "concentration": "EDP",
      "longevity": 3.3,
      "sillage": 3.1,
      "projection": 2.9,
      "gender": "Masculine",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1731855315921-7be11aa1879d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxDaGFuZWwlMjBBbGx1cmUlMjBIb21tZSUyMFNwb3J0JTIwcGVyZnVtZSUyMGJvdHRsZXxlbnwwfDJ8fHwxNzc1NDA0NTE1fDA&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1731855315921-7be11aa1879d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxDaGFuZWwlMjBBbGx1cmUlMjBIb21tZSUyMFNwb3J0JTIwcGVyZnVtZSUyMGJvdHRsZXxlbnwwfDJ8fHwxNzc1NDA0NTE1fDA&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Cool Water",
    "brand": "Davidoff",
    "description": "A fresh aquatic fragrance by Davidoff",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Melon",
        "Water lily",
        "Lotus",
        "Citrus notes",
        "Bergamot",
        "Blackcurrant"
      ],
      "heart_notes": [
        "Water lily",
        "Lotus",
        "Hawthorn",
        "Lily of the valley",
        "May rose",
        "Honey"
      ],
      "base_notes": [
        "Musk",
        "Amber",
        "Blackberry",
        "Iris",
        "Peach",
        "Sandalwood"
      ],
      "accords": [
        "Aquatic",
        "Fresh",
        "Fruity",
        "Citrus",
        "Floral"
      ],
      "family": "Fresh",
      "sub_family": "Aquatic",
      "concentration": "EDP",
      "longevity": 3.3,
      "sillage": 3.1,
      "projection": 2.9,
      "gender": "Masculine",
      "season": [
        "Spring",
        "Summer"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Outdoor",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Luna Rossa",
    "brand": "Prada",
    "description": "A floral sweet fragrance by Prada",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Angelica",
        "Bergamot"
      ],
      "heart_notes": [
        "Coumarin",
        "Patchouli"
      ],
      "base_notes": [
        "Amber"
      ],
      "accords": [
        "Sweet",
        "Powdery",
        "Spicy",
        "Creamy",
        "Woody"
      ],
      "family": "Floral",
      "sub_family": "Sweet",
      "concentration": "EDP",
      "longevity": 3.8,
      "sillage": 3.6,
      "projection": 3.4,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Spring",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1716009181989-66b12044b744?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxQcmFkYSUyMHBlcmZ1bWV8ZW58MHwyfHx8MTc3NTQwNDUxOXww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1716009181989-66b12044b744?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxQcmFkYSUyMHBlcmZ1bWV8ZW58MHwyfHx8MTc3NTQwNDUxOXww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Ombre Leather",
    "brand": "Tom Ford",
    "description": "A woody leather fragrance by Tom Ford",
    "concentration": "EDP",
    "variants": [
      {
        "title": "50mL EDP",
        "price": 15000
      },
      {
        "title": "100mL EDP",
        "price": 22000
      }
    ],
    "fragrance": {
      "top_notes": [
        "Cardamom",
        "Violet Leaf"
      ],
      "heart_notes": [
        "Jasmine Sambac",
        "Leather"
      ],
      "base_notes": [
        "Patchouli",
        "Vetiver",
        "Amber",
        "Moss"
      ],
      "accords": [
        "Leather",
        "Woody",
        "Smoky",
        "Amber",
        "Dark"
      ],
      "family": "Woody",
      "sub_family": "Leather",
      "concentration": "EDP",
      "longevity": 4.3,
      "sillage": 4.0,
      "projection": 3.8,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Winter"
      ],
      "occasion": [
        "Date Night",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1647507653704-bde7f2d6dbf0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHx3b29keSUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDUyMnww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1647507653704-bde7f2d6dbf0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHx3b29keSUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDUyMnww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Coco Mademoiselle",
    "brand": "Chanel",
    "description": "A fresh citrus fragrance by Chanel",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Citrus fruits"
      ],
      "heart_notes": [
        "Jasmine",
        "Rose"
      ],
      "base_notes": [
        "Oriental notes"
      ],
      "accords": [
        "Citrus",
        "Fresh",
        "Floral",
        "Fruity",
        "Oriental"
      ],
      "family": "Fresh",
      "sub_family": "Citrus",
      "concentration": "EDP",
      "longevity": 3.6,
      "sillage": 3.4,
      "projection": 3.2,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1731855315921-7be11aa1879d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxDaGFuZWwlMjBDb2NvJTIwTWFkZW1vaXNlbGxlJTIwcGVyZnVtZSUyMGJvdHRsZXxlbnwwfDJ8fHwxNzc1NDA0NTIzfDA&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1731855315921-7be11aa1879d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxDaGFuZWwlMjBDb2NvJTIwTWFkZW1vaXNlbGxlJTIwcGVyZnVtZSUyMGJvdHRsZXxlbnwwfDJ8fHwxNzc1NDA0NTIzfDA&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "J'adore",
    "brand": "Dior",
    "description": "A floral sweet fragrance by Dior",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Jasmine",
        "May rose"
      ],
      "heart_notes": [
        "Tonka bean",
        "Vanilla absolute"
      ],
      "base_notes": [
        "Labdanum",
        "Amber",
        "Patchouli"
      ],
      "accords": [
        "Floral",
        "Sweet",
        "Oriental",
        "Powdery",
        "Gourmand"
      ],
      "family": "Floral",
      "sub_family": "Floral",
      "concentration": "EDP",
      "longevity": 3.9,
      "sillage": 3.7,
      "projection": 3.5,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1760860992203-85ca32536788?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxEaW9yJTIwcGVyZnVtZXxlbnwwfDJ8fHwxNzc1NDA0NTI1fDA&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1760860992203-85ca32536788?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxEaW9yJTIwcGVyZnVtZXxlbnwwfDJ8fHwxNzc1NDA0NTI1fDA&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "La Vie Est Belle",
    "brand": "Lancôme",
    "description": "A floral fruity fragrance by Lancôme",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Raspberry",
        "Bergamot",
        "Pink pepper"
      ],
      "heart_notes": [
        "Rosa centifolia",
        "Ylang-ylang"
      ],
      "base_notes": [
        "Gourmand notes",
        "Patchouli",
        "Iris pallida"
      ],
      "accords": [
        "Fruity",
        "Sweet",
        "Floral",
        "Gourmand",
        "Powdery"
      ],
      "family": "Floral",
      "sub_family": "Fruity",
      "concentration": "EDP",
      "longevity": 3.8,
      "sillage": 3.6,
      "projection": 3.4,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1595425964072-537c688e5258?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1595425964072-537c688e5258?w=800&q=80"
    ]
  },
  {
    "title": "Black Opium",
    "brand": "Yves Saint Laurent",
    "description": "A floral sweet fragrance by Yves Saint Laurent",
    "concentration": "Parfum",
    "variants": [
      {
        "title": "30mL Parfum",
        "price": 15000
      },
      {
        "title": "50mL Parfum",
        "price": 22500
      },
      {
        "title": "100mL Parfum",
        "price": 35000
      }
    ],
    "fragrance": {
      "top_notes": [
        "Calabrian green mandarin orange",
        "Cinnamon",
        "Pear"
      ],
      "heart_notes": [
        "Jasmine sambac",
        "Orange blossom"
      ],
      "base_notes": [
        "Bourbon vanilla",
        "Bourbon vanilla absolute",
        "Coffee",
        "Tahitian vanilla absolute",
        "Madagascan vanilla orchid absolute",
        "Indonesian patchouli"
      ],
      "accords": [
        "Sweet",
        "Gourmand",
        "Creamy",
        "Spicy",
        "Floral"
      ],
      "family": "Floral",
      "sub_family": "Sweet",
      "concentration": "Parfum",
      "longevity": 4.3,
      "sillage": 4.1,
      "projection": 3.9,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1666769474689-39ef79f4bceb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxZdmVzJTIwU2FpbnQlMjBMYXVyZW50JTIwQmxhY2slMjBPcGl1bSUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDUyOHww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1666769474689-39ef79f4bceb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxZdmVzJTIwU2FpbnQlMjBMYXVyZW50JTIwQmxhY2slMjBPcGl1bSUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDUyOHww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Good Girl",
    "brand": "Carolina Herrera",
    "description": "A floral sweet fragrance by Carolina Herrera",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Almond",
        "Pink pepper"
      ],
      "heart_notes": [
        "Orange blossom",
        "Tuberose"
      ],
      "base_notes": [
        "Patchouli",
        "Sandalwood",
        "Tonka bean",
        "Vanilla"
      ],
      "accords": [
        "Sweet",
        "Oriental",
        "Floral",
        "Spicy",
        "Powdery"
      ],
      "family": "Floral",
      "sub_family": "Sweet",
      "concentration": "EDP",
      "longevity": 3.9,
      "sillage": 3.7,
      "projection": 3.5,
      "gender": "Feminine",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&q=80"
    ]
  },
  {
    "title": "Flowerbomb",
    "brand": "Viktor & Rolf",
    "description": "A floral sweet fragrance by Viktor & Rolf",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Bergamot",
        "Pear"
      ],
      "heart_notes": [
        "Iris",
        "Rose"
      ],
      "base_notes": [
        "Musk",
        "Woody notes"
      ],
      "accords": [
        "Floral",
        "Sweet",
        "Powdery",
        "Creamy",
        "Synthetic"
      ],
      "family": "Floral",
      "sub_family": "Floral",
      "concentration": "EDP",
      "longevity": 3.8,
      "sillage": 3.6,
      "projection": 3.4,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1595425964072-537c688e5258?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1595425964072-537c688e5258?w=800&q=80"
    ]
  },
  {
    "title": "Miss Dior",
    "brand": "Dior",
    "description": "A amber floral fragrance by Dior",
    "concentration": "Parfum",
    "variants": [
      {
        "title": "30mL Parfum",
        "price": 15000
      },
      {
        "title": "50mL Parfum",
        "price": 22500
      },
      {
        "title": "100mL Parfum",
        "price": 35000
      }
    ],
    "fragrance": {
      "top_notes": [
        "Mandarin orange",
        "Citrus notes"
      ],
      "heart_notes": [
        "Turkish rose",
        "Damask rose"
      ],
      "base_notes": [
        "Amber",
        "Patchouli",
        "Vanilla"
      ],
      "accords": [
        "Floral",
        "Sweet",
        "Fruity",
        "Oriental",
        "Spicy"
      ],
      "family": "Amber",
      "sub_family": "Floral",
      "concentration": "Parfum",
      "longevity": 4.5,
      "sillage": 4.2,
      "projection": 4.0,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1760860992203-85ca32536788?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxEaW9yJTIwcGVyZnVtZXxlbnwwfDJ8fHwxNzc1NDA0NTI1fDA&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1760860992203-85ca32536788?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxEaW9yJTIwcGVyZnVtZXxlbnwwfDJ8fHwxNzc1NDA0NTI1fDA&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Light Blue",
    "brand": "Dolce & Gabbana",
    "description": "A fresh citrus fragrance by Dolce & Gabbana",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Granny Smith apple",
        "Coconut water",
        "Italian lemon",
        "Ozonic notes"
      ],
      "heart_notes": [
        "Frangipani",
        "Jasmine",
        "White rose"
      ],
      "base_notes": [
        "Bourbon vanilla",
        "White musk",
        "Cedarwood",
        "Amber"
      ],
      "accords": [
        "Fresh",
        "Citrus",
        "Sweet",
        "Fruity",
        "Creamy"
      ],
      "family": "Fresh",
      "sub_family": "Fresh",
      "concentration": "EDP",
      "longevity": 3.5,
      "sillage": 3.3,
      "projection": 3.1,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Chance",
    "brand": "Chanel",
    "description": "A fresh floral fragrance by Chanel",
    "concentration": "Parfum",
    "variants": [
      {
        "title": "30mL Parfum",
        "price": 15000
      },
      {
        "title": "50mL Parfum",
        "price": 22500
      },
      {
        "title": "100mL Parfum",
        "price": 35000
      }
    ],
    "fragrance": {
      "top_notes": [
        "Pink pepper",
        "Iris",
        "Hyacinth",
        "Pineapple"
      ],
      "heart_notes": [
        "Citrus fruits",
        "Jasmine"
      ],
      "base_notes": [
        "Musk",
        "Patchouli",
        "Vanilla",
        "Vetiver"
      ],
      "accords": [
        "Floral",
        "Citrus",
        "Fruity",
        "Fresh",
        "Green"
      ],
      "family": "Fresh",
      "sub_family": "Floral",
      "concentration": "Parfum",
      "longevity": 3.8,
      "sillage": 3.6,
      "projection": 3.4,
      "gender": "Unisex",
      "season": [
        "Spring",
        "Summer"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1731855315921-7be11aa1879d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxDaGFuZWwlMjBwZXJmdW1lfGVufDB8Mnx8fDE3NzU0MDQ0OTF8MA&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1731855315921-7be11aa1879d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxDaGFuZWwlMjBwZXJmdW1lfGVufDB8Mnx8fDE3NzU0MDQ0OTF8MA&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Libre",
    "brand": "Yves Saint Laurent",
    "description": "A fresh green fragrance by Yves Saint Laurent",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Citrus notes"
      ],
      "heart_notes": [
        "Green notes"
      ],
      "base_notes": [
        "Woody notes"
      ],
      "accords": [
        "Green",
        "Citrus",
        "Fresh",
        "Chypre",
        "Spicy"
      ],
      "family": "Fresh",
      "sub_family": "Green",
      "concentration": "EDP",
      "longevity": 3.3,
      "sillage": 3.1,
      "projection": 2.9,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1666769474689-39ef79f4bceb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxZdmVzJTIwU2FpbnQlMjBMYXVyZW50JTIwcGVyZnVtZXxlbnwwfDJ8fHwxNzc1NDA0NTEyfDA&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1666769474689-39ef79f4bceb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxZdmVzJTIwU2FpbnQlMjBMYXVyZW50JTIwcGVyZnVtZXxlbnwwfDJ8fHwxNzc1NDA0NTEyfDA&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Mon Paris",
    "brand": "Yves Saint Laurent",
    "description": "A fresh sweet fragrance by Yves Saint Laurent",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Grapefruit",
        "Lychee",
        "Raspberry",
        "Bergamot",
        "Mandarin orange"
      ],
      "heart_notes": [
        "White peony",
        "Rose",
        "Orange blossom",
        "Rosebud",
        "Datura"
      ],
      "base_notes": [
        "White musk",
        "Ambrox",
        "Patchouli"
      ],
      "accords": [
        "Sweet",
        "Floral",
        "Fruity",
        "Fresh",
        "Synthetic"
      ],
      "family": "Fresh",
      "sub_family": "Sweet",
      "concentration": "EDP",
      "longevity": 3.6,
      "sillage": 3.4,
      "projection": 3.2,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1666769474689-39ef79f4bceb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxZdmVzJTIwU2FpbnQlMjBMYXVyZW50JTIwcGVyZnVtZXxlbnwwfDJ8fHwxNzc1NDA0NTEyfDA&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1666769474689-39ef79f4bceb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxZdmVzJTIwU2FpbnQlMjBMYXVyZW50JTIwcGVyZnVtZXxlbnwwfDJ8fHwxNzc1NDA0NTEyfDA&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Si",
    "brand": "Giorgio Armani",
    "description": "A floral powdery fragrance by Giorgio Armani",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Lime",
        "Common elder"
      ],
      "heart_notes": [
        "Almond",
        "Wheat",
        "Jasmine"
      ],
      "base_notes": [
        "Benzoin",
        "Rosewood"
      ],
      "accords": [
        "Floral",
        "Powdery",
        "Sweet",
        "Woody",
        "Oriental"
      ],
      "family": "Floral",
      "sub_family": "Floral",
      "concentration": "EDP",
      "longevity": 3.9,
      "sillage": 3.7,
      "projection": 3.5,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1595425964072-537c688e5258?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1595425964072-537c688e5258?w=800&q=80"
    ]
  },
  {
    "title": "Angel",
    "brand": "Mugler",
    "description": "A amber sweet fragrance by Mugler",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Lily of the valley",
        "Water lily",
        "Fruits",
        "Hyacinth"
      ],
      "heart_notes": [
        "Honey",
        "Nutmeg",
        "Caraway"
      ],
      "base_notes": [
        "Patchouli",
        "Vanilla",
        "Amber"
      ],
      "accords": [
        "Sweet",
        "Floral",
        "Gourmand",
        "Oriental",
        "Fruity"
      ],
      "family": "Amber",
      "sub_family": "Sweet",
      "concentration": "EDP",
      "longevity": 3.9,
      "sillage": 3.7,
      "projection": 3.5,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1772191399367-91ed8d95664b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxhbWJlciUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ5N3ww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1772191399367-91ed8d95664b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxhbWJlciUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Alien",
    "brand": "Mugler",
    "description": "A floral sweet fragrance by Mugler",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Ginger",
        "Cinnamon"
      ],
      "heart_notes": [
        "Orange blossom",
        "Tuberose"
      ],
      "base_notes": [
        "White amber",
        "Vanilla"
      ],
      "accords": [
        "Floral",
        "Sweet",
        "Spicy",
        "Oriental",
        "Powdery"
      ],
      "family": "Floral",
      "sub_family": "Floral",
      "concentration": "EDP",
      "longevity": 3.9,
      "sillage": 3.7,
      "projection": 3.5,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&q=80"
    ]
  },
  {
    "title": "Hypnotic Poison",
    "brand": "Dior",
    "description": "A floral sweet fragrance by Dior",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Jasmine"
      ],
      "heart_notes": [
        "Glycyrrhiza glabra",
        "Star anise"
      ],
      "base_notes": [
        "Vanilla"
      ],
      "accords": [
        "Sweet",
        "Oriental",
        "Gourmand",
        "Powdery",
        "Floral"
      ],
      "family": "Floral",
      "sub_family": "Sweet",
      "concentration": "EDP",
      "longevity": 3.9,
      "sillage": 3.7,
      "projection": 3.5,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1760860992203-85ca32536788?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxEaW9yJTIwcGVyZnVtZXxlbnwwfDJ8fHwxNzc1NDA0NTI1fDA&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1760860992203-85ca32536788?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxEaW9yJTIwcGVyZnVtZXxlbnwwfDJ8fHwxNzc1NDA0NTI1fDA&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Daisy",
    "brand": "Marc Jacobs",
    "description": "A fresh floral fragrance by Marc Jacobs",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Grapefruit",
        "Violet leaf",
        "Yuzu"
      ],
      "heart_notes": [
        "Kumquat",
        "Jasmine",
        "Violet"
      ],
      "base_notes": [
        "Musk",
        "Pamplewood®",
        "Vanilla"
      ],
      "accords": [
        "Fresh",
        "Floral",
        "Powdery",
        "Citrus",
        "Sweet"
      ],
      "family": "Fresh",
      "sub_family": "Fresh",
      "concentration": "EDP",
      "longevity": 3.5,
      "sillage": 3.3,
      "projection": 3.1,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Chloe",
    "brand": "Chloe",
    "description": "A floral powdery fragrance by Chloe",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 7500
      },
      {
        "title": "50mL EDP",
        "price": 10500
      },
      {
        "title": "75mL EDP",
        "price": 13500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Peony",
        "Lychee",
        "Freesia"
      ],
      "heart_notes": [
        "Rose",
        "Lily of the Valley",
        "Magnolia"
      ],
      "base_notes": [
        "Cedarwood",
        "Amber",
        "Musk"
      ],
      "accords": [
        "Floral",
        "Powdery",
        "Rose",
        "Fresh",
        "Woody"
      ],
      "family": "Floral",
      "sub_family": "Soft Floral",
      "concentration": "EDP",
      "longevity": 3.5,
      "sillage": 3.2,
      "projection": 3.0,
      "gender": "Feminine",
      "season": [
        "Spring",
        "Summer"
      ],
      "occasion": [
        "Office",
        "Casual"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&q=80"
    ]
  },
  {
    "title": "Nomade",
    "brand": "Chloé",
    "description": "A floral fruity fragrance by Chloé",
    "concentration": "Parfum",
    "variants": [
      {
        "title": "30mL Parfum",
        "price": 15000
      },
      {
        "title": "50mL Parfum",
        "price": 22500
      },
      {
        "title": "100mL Parfum",
        "price": 35000
      }
    ],
    "fragrance": {
      "top_notes": [
        "Mirabelle plum"
      ],
      "heart_notes": [
        "Oakmoss",
        "Davana"
      ],
      "base_notes": [
        "Sandalwood",
        "Musk"
      ],
      "accords": [
        "Fruity",
        "Woody",
        "Floral",
        "Spicy",
        "Sweet"
      ],
      "family": "Floral",
      "sub_family": "Fruity",
      "concentration": "Parfum",
      "longevity": 4.3,
      "sillage": 4.1,
      "projection": 3.9,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1595425964072-537c688e5258?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1595425964072-537c688e5258?w=800&q=80"
    ]
  },
  {
    "title": "Very Good Girl",
    "brand": "Carolina Herrera",
    "description": "A floral fruity fragrance by Carolina Herrera",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Black cherry",
        "Bitter almond"
      ],
      "heart_notes": [
        "Rose water",
        "Lily"
      ],
      "base_notes": [
        "Bourbon vanilla",
        "Vetiver"
      ],
      "accords": [
        "Fruity",
        "Sweet",
        "Floral",
        "Synthetic",
        "Creamy"
      ],
      "family": "Floral",
      "sub_family": "Fruity",
      "concentration": "EDP",
      "longevity": 3.8,
      "sillage": 3.6,
      "projection": 3.4,
      "gender": "Feminine",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=800&q=80"
    ]
  },
  {
    "title": "Baccarat Rouge 540",
    "brand": "Maison Francis Kurkdjian",
    "description": "An amber sweet fragrance by Maison Francis Kurkdjian",
    "concentration": "EDP",
    "variants": [
      {
        "title": "35mL EDP",
        "price": 19500
      },
      {
        "title": "70mL EDP",
        "price": 32500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Saffron",
        "Jasmine"
      ],
      "heart_notes": [
        "Ambergris",
        "Cedar"
      ],
      "base_notes": [
        "Fir Resin",
        "Cedar"
      ],
      "accords": [
        "Amber",
        "Sweet",
        "Warm Spicy",
        "Woody"
      ],
      "family": "Amber",
      "sub_family": "Soft Amber",
      "concentration": "EDP",
      "longevity": 4.8,
      "sillage": 4.5,
      "projection": 4.3,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Winter"
      ],
      "occasion": [
        "Date Night",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1772191399367-91ed8d95664b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxhbWJlciUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ5N3ww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1772191399367-91ed8d95664b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxhbWJlciUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Tobacco Vanille",
    "brand": "Tom Ford",
    "description": "An amber tobacco fragrance by Tom Ford",
    "concentration": "EDP",
    "variants": [
      {
        "title": "50mL EDP",
        "price": 27500
      },
      {
        "title": "100mL EDP",
        "price": 40000
      }
    ],
    "fragrance": {
      "top_notes": [
        "Tobacco Leaf",
        "Spicy Notes"
      ],
      "heart_notes": [
        "Vanilla",
        "Cacao",
        "Tonka Bean",
        "Tobacco Blossom"
      ],
      "base_notes": [
        "Dried Fruits",
        "Woody Notes"
      ],
      "accords": [
        "Sweet",
        "Tobacco",
        "Vanilla",
        "Warm Spicy",
        "Woody"
      ],
      "family": "Amber",
      "sub_family": "Soft Amber",
      "concentration": "EDP",
      "longevity": 4.6,
      "sillage": 4.2,
      "projection": 4.0,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Winter"
      ],
      "occasion": [
        "Date Night",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1772191399367-91ed8d95664b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxhbWJlciUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ5N3ww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1772191399367-91ed8d95664b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxhbWJlciUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Black Orchid",
    "brand": "Tom Ford",
    "description": "A amber floral fragrance by Tom Ford",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Black truffle",
        "Blackcurrant",
        "Bergamot",
        "Ylang-ylang"
      ],
      "heart_notes": [
        "Gardenia",
        "Black pepper",
        "Lily",
        "Black orchid",
        "Black plum",
        "Honeysuckle"
      ],
      "base_notes": [
        "Milk",
        "Balsam",
        "Cinnamon",
        "Sandalwood",
        "Fruity notes",
        "Patchouli"
      ],
      "accords": [
        "Floral",
        "Oriental",
        "Spicy",
        "Sweet",
        "Fruity"
      ],
      "family": "Amber",
      "sub_family": "Floral",
      "concentration": "EDP",
      "longevity": 3.9,
      "sillage": 3.7,
      "projection": 3.5,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1772191399367-91ed8d95664b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxhbWJlciUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ5N3ww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1772191399367-91ed8d95664b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxhbWJlciUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Lost Cherry",
    "brand": "Tom Ford",
    "description": "A fresh fragrance by Tom Ford",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Black cherry",
        "Bitter almond",
        "Cherry liqueur"
      ],
      "heart_notes": [
        "Griotte syrup",
        "Jasmine sambac",
        "Turkish rose"
      ],
      "base_notes": [
        "Roasted tonka bean",
        "Peru balsam",
        "Cedar",
        "Sandalwood",
        "Vetiver"
      ],
      "accords": [],
      "family": "Fresh",
      "sub_family": "Fresh",
      "concentration": "EDP",
      "longevity": 3.8,
      "sillage": 3.6,
      "projection": 3.4,
      "gender": "Unisex",
      "season": [
        "Spring",
        "Fall"
      ],
      "occasion": [
        "Casual"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Oud Wood",
    "brand": "Tom Ford",
    "description": "A fresh green fragrance by Tom Ford",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Green notes",
        "Dust"
      ],
      "heart_notes": [
        "Tomato leaf",
        "Basil",
        "Chlorine"
      ],
      "base_notes": [
        "Metallic notes",
        "Star anise",
        "Zorplox"
      ],
      "accords": [
        "Green",
        "Fresh",
        "Synthetic",
        "Fruity",
        "Spicy"
      ],
      "family": "Fresh",
      "sub_family": "Green",
      "concentration": "EDP",
      "longevity": 3.5,
      "sillage": 3.3,
      "projection": 3.1,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Neroli Portofino",
    "brand": "Tom Ford",
    "description": "A fresh fragrance by Tom Ford",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Bergamot",
        "Lemon",
        "Clorpt"
      ],
      "heart_notes": [
        "Chamomile",
        "Iris",
        "Orange blossom",
        "Violet",
        "Ylang-ylang"
      ],
      "base_notes": [
        "Musk",
        "Patchouli",
        "Sandalwood",
        "Tonka bean",
        "Vanilla",
        "Vetiver"
      ],
      "accords": [],
      "family": "Fresh",
      "sub_family": "Fresh",
      "concentration": "EDP",
      "longevity": 3.8,
      "sillage": 3.6,
      "projection": 3.4,
      "gender": "Unisex",
      "season": [
        "Spring",
        "Fall"
      ],
      "occasion": [
        "Casual"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Santal 33",
    "brand": "Le Labo",
    "description": "A fresh fragrance by Le Labo",
    "concentration": "Parfum",
    "variants": [
      {
        "title": "30mL Parfum",
        "price": 15000
      },
      {
        "title": "50mL Parfum",
        "price": 22500
      },
      {
        "title": "100mL Parfum",
        "price": 35000
      }
    ],
    "fragrance": {
      "top_notes": [
        "Tobacco",
        "Whisky",
        "Noxiousness"
      ],
      "heart_notes": [
        "Cinnamon",
        "Coriander",
        "Vanilla",
        "Putridity"
      ],
      "base_notes": [
        "Leather",
        "Oud",
        "Patchouli",
        "Sandalwood"
      ],
      "accords": [],
      "family": "Fresh",
      "sub_family": "Fresh",
      "concentration": "Parfum",
      "longevity": 4.3,
      "sillage": 4.1,
      "projection": 3.9,
      "gender": "Unisex",
      "season": [
        "Spring",
        "Fall"
      ],
      "occasion": [
        "Casual"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Rose 31",
    "brand": "Le Labo",
    "description": "A floral woody fragrance by Le Labo",
    "concentration": "EDP",
    "variants": [
      {
        "title": "50mL EDP",
        "price": 21000
      },
      {
        "title": "100mL EDP",
        "price": 31000
      }
    ],
    "fragrance": {
      "top_notes": [
        "Rose",
        "Cumin"
      ],
      "heart_notes": [
        "Cedar",
        "Vetiver",
        "Amber"
      ],
      "base_notes": [
        "Musk",
        "Guaiac Wood",
        "Olibanum"
      ],
      "accords": [
        "Floral",
        "Woody",
        "Aromatic",
        "Amber"
      ],
      "family": "Floral",
      "sub_family": "Floral Amber",
      "concentration": "EDP",
      "longevity": 4.2,
      "sillage": 3.8,
      "projection": 3.5,
      "gender": "Unisex",
      "season": [
        "Spring",
        "Fall"
      ],
      "occasion": [
        "Office",
        "Date Night"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1595425964072-537c688e5258?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1595425964072-537c688e5258?w=800&q=80"
    ]
  },
  {
    "title": "Another 13",
    "brand": "Le Labo",
    "description": "A musky woody fragrance by Le Labo",
    "concentration": "EDP",
    "variants": [
      {
        "title": "50mL EDP",
        "price": 21000
      },
      {
        "title": "100mL EDP",
        "price": 31000
      }
    ],
    "fragrance": {
      "top_notes": [
        "Pear"
      ],
      "heart_notes": [
        "Ambroxan",
        "Ambrette Seeds"
      ],
      "base_notes": [
        "Musk",
        "Moss",
        "Woody Amber"
      ],
      "accords": [
        "Musky",
        "Woody",
        "Amber",
        "Clean"
      ],
      "family": "Woody",
      "sub_family": "Mossy Woods",
      "concentration": "EDP",
      "longevity": 4.5,
      "sillage": 4.0,
      "projection": 3.8,
      "gender": "Unisex",
      "season": [
        "Spring",
        "Fall"
      ],
      "occasion": [
        "Office",
        "Casual"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1647507653704-bde7f2d6dbf0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHx3b29keSUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDUyMnww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1647507653704-bde7f2d6dbf0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHx3b29keSUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDUyMnww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Gypsy Water",
    "brand": "Byredo",
    "description": "A amber spicy fragrance by Byredo",
    "concentration": "Parfum",
    "variants": [
      {
        "title": "30mL Parfum",
        "price": 15000
      },
      {
        "title": "50mL Parfum",
        "price": 22500
      },
      {
        "title": "100mL Parfum",
        "price": 35000
      }
    ],
    "fragrance": {
      "top_notes": [
        "Juniper berry",
        "Lemon",
        "Bergamot",
        "Pepper"
      ],
      "heart_notes": [
        "Pine needle",
        "Iris",
        "Frankincense"
      ],
      "base_notes": [
        "Vanilla",
        "Sandalwood",
        "Amber"
      ],
      "accords": [
        "Spicy",
        "Sweet",
        "Resinous",
        "Woody",
        "Fresh"
      ],
      "family": "Amber",
      "sub_family": "Spicy",
      "concentration": "Parfum",
      "longevity": 4.3,
      "sillage": 4.1,
      "projection": 3.9,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1772191399367-91ed8d95664b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxhbWJlciUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ5N3ww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1772191399367-91ed8d95664b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxhbWJlciUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Bal d'Afrique",
    "brand": "Byredo",
    "description": "A fresh fruity fragrance by Byredo",
    "concentration": "Parfum",
    "variants": [
      {
        "title": "30mL Parfum",
        "price": 15000
      },
      {
        "title": "50mL Parfum",
        "price": 22500
      },
      {
        "title": "100mL Parfum",
        "price": 35000
      }
    ],
    "fragrance": {
      "top_notes": [
        "Tagetes",
        "Bergamot",
        "Buchu",
        "Lemon",
        "Neroli"
      ],
      "heart_notes": [
        "Cyclamen",
        "Jasmine",
        "Violet"
      ],
      "base_notes": [
        "Musk",
        "Vetiver",
        "Amber",
        "Atlas cedar"
      ],
      "accords": [
        "Fruity",
        "Fresh",
        "Floral",
        "Creamy",
        "Green"
      ],
      "family": "Fresh",
      "sub_family": "Fruity",
      "concentration": "Parfum",
      "longevity": 4.0,
      "sillage": 3.8,
      "projection": 3.6,
      "gender": "Unisex",
      "season": [
        "Spring",
        "Summer"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Mojave Ghost",
    "brand": "Byredo",
    "description": "A fresh fragrance by Byredo",
    "concentration": "Parfum",
    "variants": [
      {
        "title": "30mL Parfum",
        "price": 15000
      },
      {
        "title": "50mL Parfum",
        "price": 22500
      },
      {
        "title": "100mL Parfum",
        "price": 35000
      }
    ],
    "fragrance": {
      "top_notes": [
        "Sapote",
        "Ambrette"
      ],
      "heart_notes": [
        "Violet",
        "Sandalwood",
        "Magnolia"
      ],
      "base_notes": [
        "Musk",
        "Amber",
        "Cedarwood",
        "Vetiver"
      ],
      "accords": [],
      "family": "Fresh",
      "sub_family": "Fresh",
      "concentration": "Parfum",
      "longevity": 4.3,
      "sillage": 4.1,
      "projection": 3.9,
      "gender": "Unisex",
      "season": [
        "Spring",
        "Fall"
      ],
      "occasion": [
        "Casual"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Layton",
    "brand": "Parfums de Marly",
    "description": "A amber sweet fragrance by Parfums de Marly",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Apple",
        "Lavender",
        "Bergamot",
        "Mandarin orange"
      ],
      "heart_notes": [
        "Geranium",
        "Jasmine",
        "Violet"
      ],
      "base_notes": [
        "Vanilla",
        "Cardamom",
        "Gaiac wood",
        "Sandalwood",
        "Patchouli",
        "Pink pepper"
      ],
      "accords": [
        "Sweet",
        "Spicy",
        "Fruity",
        "Woody",
        "Oriental"
      ],
      "family": "Amber",
      "sub_family": "Sweet",
      "concentration": "EDP",
      "longevity": 3.9,
      "sillage": 3.7,
      "projection": 3.5,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1772191399367-91ed8d95664b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxhbWJlciUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ5N3ww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1772191399367-91ed8d95664b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxhbWJlciUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Delina",
    "brand": "Parfums de Marly",
    "description": "A floral sweet fragrance by Parfums de Marly",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Lychee",
        "Pear",
        "Grapefruit"
      ],
      "heart_notes": [
        "Turkish damask rose",
        "Frankincense",
        "Vetiver"
      ],
      "base_notes": [
        "Vanilla",
        "Evernyl",
        "Musk"
      ],
      "accords": [
        "Floral",
        "Sweet",
        "Fruity",
        "Creamy",
        "Powdery"
      ],
      "family": "Floral",
      "sub_family": "Floral",
      "concentration": "EDP",
      "longevity": 3.8,
      "sillage": 3.6,
      "projection": 3.4,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1595425964072-537c688e5258?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1595425964072-537c688e5258?w=800&q=80"
    ]
  },
  {
    "title": "Sedley",
    "brand": "Parfums de Marly",
    "description": "A fresh citrus fragrance by Parfums de Marly",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Spearmint",
        "Aquatic notes",
        "Bergamot",
        "Hivernal®"
      ],
      "heart_notes": [
        "Bourbon geranium",
        "Lavender",
        "Solar note"
      ],
      "base_notes": [
        "Cedarwood",
        "Sandalwood",
        "White musk",
        "Frankincense"
      ],
      "accords": [
        "Fresh",
        "Citrus",
        "Aquatic",
        "Woody",
        "Spicy"
      ],
      "family": "Fresh",
      "sub_family": "Fresh",
      "concentration": "EDP",
      "longevity": 3.3,
      "sillage": 3.1,
      "projection": 2.9,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Outdoor",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Rehab",
    "brand": "Initio",
    "description": "A woody aromatic fragrance by Initio",
    "concentration": "EDP",
    "variants": [
      {
        "title": "90mL EDP",
        "price": 29500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Lavender",
        "Nutmeg"
      ],
      "heart_notes": [
        "Geranium",
        "Tobacco"
      ],
      "base_notes": [
        "Musk",
        "Sandalwood",
        "Cashmeran"
      ],
      "accords": [
        "Aromatic",
        "Woody",
        "Warm Spicy",
        "Musky"
      ],
      "family": "Woody",
      "sub_family": "Aromatic",
      "concentration": "EDP",
      "longevity": 4.3,
      "sillage": 4.0,
      "projection": 3.8,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Winter",
        "Spring"
      ],
      "occasion": [
        "Office",
        "Casual"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1647507653704-bde7f2d6dbf0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHx3b29keSUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDUyMnww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1647507653704-bde7f2d6dbf0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHx3b29keSUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDUyMnww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Side Effect",
    "brand": "Initio",
    "description": "An amber vanilla fragrance by Initio",
    "concentration": "EDP",
    "variants": [
      {
        "title": "90mL EDP",
        "price": 29500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Rum",
        "Cinnamon"
      ],
      "heart_notes": [
        "Tobacco",
        "Vanilla"
      ],
      "base_notes": [
        "Benzoin",
        "Musk",
        "Hedione"
      ],
      "accords": [
        "Sweet",
        "Vanilla",
        "Warm Spicy",
        "Tobacco",
        "Boozy"
      ],
      "family": "Amber",
      "sub_family": "Soft Amber",
      "concentration": "EDP",
      "longevity": 4.5,
      "sillage": 4.2,
      "projection": 4.0,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Winter"
      ],
      "occasion": [
        "Date Night",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1772191399367-91ed8d95664b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxhbWJlciUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ5N3ww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1772191399367-91ed8d95664b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxhbWJlciUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Oud for Greatness",
    "brand": "Initio",
    "description": "A woody oud fragrance by Initio",
    "concentration": "EDP",
    "variants": [
      {
        "title": "90mL EDP",
        "price": 32500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Saffron",
        "Nutmeg",
        "Galbanum"
      ],
      "heart_notes": [
        "Agarwood (Oud)",
        "Patchouli"
      ],
      "base_notes": [
        "Musk",
        "Sandalwood"
      ],
      "accords": [
        "Oud",
        "Woody",
        "Warm Spicy",
        "Smoky"
      ],
      "family": "Woody",
      "sub_family": "Oud",
      "concentration": "EDP",
      "longevity": 4.8,
      "sillage": 4.5,
      "projection": 4.2,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Winter"
      ],
      "occasion": [
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1647507653704-bde7f2d6dbf0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHx3b29keSUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDUyMnww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1647507653704-bde7f2d6dbf0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHx3b29keSUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDUyMnww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Hacivat",
    "brand": "Nishane",
    "description": "A fresh fruity fragrance by Nishane",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Pineapple",
        "Grapefruit",
        "Bergamot"
      ],
      "heart_notes": [
        "Cedarwood",
        "Patchouli",
        "Jasmine"
      ],
      "base_notes": [
        "Oakmoss",
        "Clearwood™",
        "Dry woods"
      ],
      "accords": [
        "Fruity",
        "Fresh",
        "Citrus",
        "Woody",
        "Green"
      ],
      "family": "Fresh",
      "sub_family": "Fruity",
      "concentration": "EDP",
      "longevity": 3.3,
      "sillage": 3.1,
      "projection": 2.9,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Office",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Ani",
    "brand": "Nishane",
    "description": "A fresh sweet fragrance by Nishane",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Honeydew melon",
        "Lemon",
        "Aquatic notes",
        "Bergamot",
        "Pink pepper",
        "Blue ginger"
      ],
      "heart_notes": [
        "Blackcurrant",
        "Green apple",
        "Patchouli",
        "Rose",
        "Sage",
        "Lavender"
      ],
      "base_notes": [
        "Cashmere wood",
        "Vanilla",
        "White musk",
        "Sandalwood",
        "Ambergris",
        "Cedarwood"
      ],
      "accords": [
        "Sweet",
        "Citrus",
        "Fruity",
        "Creamy",
        "Spicy"
      ],
      "family": "Fresh",
      "sub_family": "Sweet",
      "concentration": "EDP",
      "longevity": 3.6,
      "sillage": 3.4,
      "projection": 3.2,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Erba Pura",
    "brand": "Xerjoff",
    "description": "A fresh fruity fragrance by Xerjoff",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Calabrian bergamot",
        "Sicilian lemon",
        "Sicilian orange"
      ],
      "heart_notes": [
        "Fruity notes"
      ],
      "base_notes": [
        "White musk",
        "Amber",
        "Bourbon vanilla"
      ],
      "accords": [
        "Fruity",
        "Sweet",
        "Fresh",
        "Synthetic",
        "Floral"
      ],
      "family": "Fresh",
      "sub_family": "Fruity",
      "concentration": "EDP",
      "longevity": 3.6,
      "sillage": 3.4,
      "projection": 3.2,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Naxos",
    "brand": "Xerjoff",
    "description": "A fresh sweet fragrance by Xerjoff",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Lavender",
        "Bergamot",
        "Lemon"
      ],
      "heart_notes": [
        "Honey",
        "Cashmere",
        "Cinnamon",
        "Jasmine sambac"
      ],
      "base_notes": [
        "Tobacco",
        "Tonka bean",
        "Vanilla"
      ],
      "accords": [
        "Sweet",
        "Spicy",
        "Gourmand",
        "Creamy",
        "Citrus"
      ],
      "family": "Fresh",
      "sub_family": "Sweet",
      "concentration": "EDP",
      "longevity": 3.6,
      "sillage": 3.4,
      "projection": 3.2,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "BR540 Extrait",
    "brand": "Maison Francis Kurkdjian",
    "description": "An amber sweet fragrance by Maison Francis Kurkdjian",
    "concentration": "Extrait",
    "variants": [
      {
        "title": "35mL Extrait",
        "price": 32500
      },
      {
        "title": "70mL Extrait",
        "price": 52500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Saffron",
        "Jasmine",
        "Bitter Almond"
      ],
      "heart_notes": [
        "Ambergris",
        "Cedar"
      ],
      "base_notes": [
        "Fir Balsam",
        "Cedar",
        "Musk"
      ],
      "accords": [
        "Amber",
        "Sweet",
        "Warm Spicy",
        "Woody",
        "Balsamic"
      ],
      "family": "Amber",
      "sub_family": "Soft Amber",
      "concentration": "Extrait",
      "longevity": 4.9,
      "sillage": 4.7,
      "projection": 4.5,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Winter"
      ],
      "occasion": [
        "Date Night",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1772191399367-91ed8d95664b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxhbWJlciUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ5N3ww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1772191399367-91ed8d95664b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxhbWJlciUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Grand Soir",
    "brand": "Maison Francis Kurkdjian",
    "description": "An amber balsamic fragrance by Maison Francis Kurkdjian",
    "concentration": "EDP",
    "variants": [
      {
        "title": "35mL EDP",
        "price": 15500
      },
      {
        "title": "70mL EDP",
        "price": 24500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Amber",
        "Cinnamon"
      ],
      "heart_notes": [
        "Benzoin",
        "Vanilla"
      ],
      "base_notes": [
        "Tonka Bean",
        "Styrax",
        "Labdanum"
      ],
      "accords": [
        "Amber",
        "Sweet",
        "Balsamic",
        "Vanilla",
        "Warm Spicy"
      ],
      "family": "Amber",
      "sub_family": "Soft Amber",
      "concentration": "EDP",
      "longevity": 4.5,
      "sillage": 4.0,
      "projection": 3.8,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Winter"
      ],
      "occasion": [
        "Date Night",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1772191399367-91ed8d95664b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxhbWJlciUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ5N3ww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1772191399367-91ed8d95664b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxhbWJlciUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Gentle Fluidity Gold",
    "brand": "Maison Francis Kurkdjian",
    "description": "A sweet vanilla fragrance by Maison Francis Kurkdjian",
    "concentration": "EDP",
    "variants": [
      {
        "title": "35mL EDP",
        "price": 15500
      },
      {
        "title": "70mL EDP",
        "price": 24500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Juniper Berry",
        "Nutmeg",
        "Coriander"
      ],
      "heart_notes": [
        "Musks",
        "Vanilla",
        "Amber"
      ],
      "base_notes": [
        "Sandalwood",
        "Cedar",
        "Tolu Balsam"
      ],
      "accords": [
        "Sweet",
        "Vanilla",
        "Woody",
        "Amber",
        "Musky"
      ],
      "family": "Amber",
      "sub_family": "Sweet",
      "concentration": "EDP",
      "longevity": 4.0,
      "sillage": 3.8,
      "projection": 3.5,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Winter",
        "Spring"
      ],
      "occasion": [
        "Office",
        "Casual"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1772191399367-91ed8d95664b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxhbWJlciUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ5N3ww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1772191399367-91ed8d95664b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxhbWJlciUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Reflection Man",
    "brand": "Amouage",
    "description": "A floral fresh fragrance by Amouage",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Bitter orange leaf",
        "Red pepper",
        "Rosemary"
      ],
      "heart_notes": [
        "Neroli",
        "Jasmine",
        "Iris",
        "Ylang-ylang"
      ],
      "base_notes": [
        "Sandalwood",
        "Haitian vetiver",
        "Virginia cedar",
        "Patchouli"
      ],
      "accords": [
        "Floral",
        "Fresh",
        "Sweet",
        "Powdery",
        "Woody"
      ],
      "family": "Floral",
      "sub_family": "Floral",
      "concentration": "EDP",
      "longevity": 3.6,
      "sillage": 3.4,
      "projection": 3.2,
      "gender": "Masculine",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1595425964072-537c688e5258?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1595425964072-537c688e5258?w=800&q=80"
    ]
  },
  {
    "title": "Interlude Man",
    "brand": "Amouage",
    "description": "A amber smoky fragrance by Amouage",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Oregano",
        "Pimento",
        "Bergamot"
      ],
      "heart_notes": [
        "Frankincense",
        "Opoponax",
        "Amber",
        "Cistus"
      ],
      "base_notes": [
        "Leather",
        "Oud",
        "Patchouli",
        "Sandalwood"
      ],
      "accords": [
        "Smoky",
        "Spicy",
        "Oriental",
        "Woody",
        "Resinous"
      ],
      "family": "Amber",
      "sub_family": "Smoky",
      "concentration": "EDP",
      "longevity": 4.2,
      "sillage": 4.0,
      "projection": 3.9,
      "gender": "Masculine",
      "season": [
        "Fall",
        "Winter"
      ],
      "occasion": [
        "Date Night",
        "Office",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1772191399367-91ed8d95664b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxhbWJlciUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ5N3ww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1772191399367-91ed8d95664b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxhbWJlciUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Portrait of a Lady",
    "brand": "Frederic Malle",
    "description": "A floral spicy fragrance by Frederic Malle",
    "concentration": "EDP",
    "variants": [
      {
        "title": "50mL EDP",
        "price": 27500
      },
      {
        "title": "100mL EDP",
        "price": 40000
      }
    ],
    "fragrance": {
      "top_notes": [
        "Rose",
        "Raspberry",
        "Clove"
      ],
      "heart_notes": [
        "Patchouli",
        "Cinnamon",
        "Sandalwood"
      ],
      "base_notes": [
        "Frankincense",
        "Benzoin",
        "Musk",
        "Amber"
      ],
      "accords": [
        "Floral",
        "Spicy",
        "Woody",
        "Rose",
        "Amber"
      ],
      "family": "Floral",
      "sub_family": "Floral Amber",
      "concentration": "EDP",
      "longevity": 4.6,
      "sillage": 4.3,
      "projection": 4.0,
      "gender": "Feminine",
      "season": [
        "Fall",
        "Winter"
      ],
      "occasion": [
        "Date Night",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&q=80"
    ]
  },
  {
    "title": "Musc Ravageur",
    "brand": "Frederic Malle",
    "description": "An amber musky fragrance by Frederic Malle",
    "concentration": "EDP",
    "variants": [
      {
        "title": "50mL EDP",
        "price": 27500
      },
      {
        "title": "100mL EDP",
        "price": 40000
      }
    ],
    "fragrance": {
      "top_notes": [
        "Lavender",
        "Bergamot"
      ],
      "heart_notes": [
        "Musk",
        "Vanilla",
        "Cinnamon"
      ],
      "base_notes": [
        "Sandalwood",
        "Amber",
        "Gaiac Wood",
        "Cedar"
      ],
      "accords": [
        "Amber",
        "Musky",
        "Warm Spicy",
        "Vanilla",
        "Woody"
      ],
      "family": "Amber",
      "sub_family": "Warm Spicy",
      "concentration": "EDP",
      "longevity": 4.5,
      "sillage": 4.2,
      "projection": 4.0,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Winter"
      ],
      "occasion": [
        "Date Night",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1772191399367-91ed8d95664b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxhbWJlciUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ5N3ww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1772191399367-91ed8d95664b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxhbWJlciUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Dior Homme Intense",
    "brand": "Dior",
    "description": "A floral powdery fragrance by Dior",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Florentine iris absolute"
      ],
      "heart_notes": [
        "Ecuadorian ambrette seed"
      ],
      "base_notes": [
        "Virginia cedar"
      ],
      "accords": [
        "Powdery",
        "Sweet",
        "Woody",
        "Spicy",
        "Gourmand"
      ],
      "family": "Floral",
      "sub_family": "Powdery",
      "concentration": "EDP",
      "longevity": 3.8,
      "sillage": 3.6,
      "projection": 3.4,
      "gender": "Masculine",
      "season": [
        "Fall",
        "Spring",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1760860992203-85ca32536788?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxEaW9yJTIwcGVyZnVtZXxlbnwwfDJ8fHwxNzc1NDA0NTI1fDA&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1760860992203-85ca32536788?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxEaW9yJTIwcGVyZnVtZXxlbnwwfDJ8fHwxNzc1NDA0NTI1fDA&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Valentino Uomo Intense",
    "brand": "Valentino",
    "description": "A floral powdery fragrance by Valentino",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Nutmeg",
        "Mandarin orange"
      ],
      "heart_notes": [
        "Sage",
        "Juniper berry"
      ],
      "base_notes": [
        "Iris",
        "Tonka bean",
        "Vanilla",
        "Leather",
        "Patchouli"
      ],
      "accords": [
        "Powdery",
        "Sweet",
        "Leathery",
        "Spicy",
        "Creamy"
      ],
      "family": "Floral",
      "sub_family": "Powdery",
      "concentration": "EDP",
      "longevity": 3.8,
      "sillage": 3.6,
      "projection": 3.4,
      "gender": "Masculine",
      "season": [
        "Fall",
        "Spring",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&q=80"
    ]
  },
  {
    "title": "Stronger With You",
    "brand": "Emporio Armani",
    "description": "A sweet spicy fragrance by Emporio Armani",
    "concentration": "EDT",
    "variants": [
      {
        "title": "30mL EDT",
        "price": 6500
      },
      {
        "title": "50mL EDT",
        "price": 8500
      },
      {
        "title": "100mL EDT",
        "price": 12000
      }
    ],
    "fragrance": {
      "top_notes": [
        "Cardamom",
        "Pink Pepper",
        "Violet Leaf"
      ],
      "heart_notes": [
        "Sage",
        "Meringue"
      ],
      "base_notes": [
        "Vanilla",
        "Chestnut",
        "Suede",
        "Cedar"
      ],
      "accords": [
        "Sweet",
        "Warm Spicy",
        "Vanilla",
        "Aromatic"
      ],
      "family": "Amber",
      "sub_family": "Sweet",
      "concentration": "EDT",
      "longevity": 3.8,
      "sillage": 3.5,
      "projection": 3.3,
      "gender": "Masculine",
      "season": [
        "Fall",
        "Winter"
      ],
      "occasion": [
        "Date Night",
        "Casual"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1772191399367-91ed8d95664b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxhbWJlciUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ5N3ww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1772191399367-91ed8d95664b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxhbWJlciUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Scandal",
    "brand": "Jean Paul Gaultier",
    "description": "A floral sweet fragrance by Jean Paul Gaultier",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Honey"
      ],
      "heart_notes": [
        "Pear"
      ],
      "base_notes": [
        "Jasmine"
      ],
      "accords": [
        "Sweet",
        "Fruity",
        "Floral",
        "Gourmand",
        "Synthetic"
      ],
      "family": "Floral",
      "sub_family": "Sweet",
      "concentration": "EDP",
      "longevity": 3.8,
      "sillage": 3.6,
      "projection": 3.4,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=800&q=80"
    ]
  },
  {
    "title": "Born in Roma",
    "brand": "Valentino",
    "description": "A fresh sweet fragrance by Valentino",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Vanilla",
        "Ginger"
      ],
      "heart_notes": [
        "Provençal lavender",
        "Nutmeg"
      ],
      "base_notes": [
        "Haitian vetiver"
      ],
      "accords": [
        "Sweet",
        "Synthetic",
        "Fresh",
        "Fruity",
        "Woody"
      ],
      "family": "Fresh",
      "sub_family": "Sweet",
      "concentration": "EDP",
      "longevity": 3.6,
      "sillage": 3.4,
      "projection": 3.2,
      "gender": "Masculine",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Dolce & Gabbana The One",
    "brand": "Dolce & Gabbana",
    "description": "An amber spicy fragrance by Dolce & Gabbana",
    "concentration": "EDP",
    "variants": [
      {
        "title": "50mL EDP",
        "price": 8500
      },
      {
        "title": "100mL EDP",
        "price": 12500
      },
      {
        "title": "150mL EDP",
        "price": 16000
      }
    ],
    "fragrance": {
      "top_notes": [
        "Grapefruit",
        "Coriander",
        "Basil"
      ],
      "heart_notes": [
        "Cardamom",
        "Ginger",
        "Orange Blossom"
      ],
      "base_notes": [
        "Amber",
        "Cedar",
        "Labdanum",
        "Tobacco"
      ],
      "accords": [
        "Amber",
        "Warm Spicy",
        "Woody",
        "Sweet"
      ],
      "family": "Amber",
      "sub_family": "Warm Spicy",
      "concentration": "EDP",
      "longevity": 3.5,
      "sillage": 3.2,
      "projection": 3.0,
      "gender": "Masculine",
      "season": [
        "Fall",
        "Winter"
      ],
      "occasion": [
        "Date Night",
        "Office"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1772191399367-91ed8d95664b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxhbWJlciUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ5N3ww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1772191399367-91ed8d95664b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxhbWJlciUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Eros Flame",
    "brand": "Versace",
    "description": "A fresh sweet fragrance by Versace",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Mandarin orange",
        "Chinotto",
        "Lemon",
        "Madagascar pepper",
        "Rosemary"
      ],
      "heart_notes": [
        "Pepperwood™",
        "Rose",
        "Geranium"
      ],
      "base_notes": [
        "Tonka bean",
        "Vanilla",
        "Patchouli",
        "Sandalwood",
        "Texas cedar",
        "Haitian vetiver"
      ],
      "accords": [
        "Sweet",
        "Spicy",
        "Citrus",
        "Fruity",
        "Synthetic"
      ],
      "family": "Fresh",
      "sub_family": "Sweet",
      "concentration": "EDP",
      "longevity": 3.6,
      "sillage": 3.4,
      "projection": 3.2,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Nautica Voyage",
    "brand": "Nautica",
    "description": "A fresh aquatic fragrance by Nautica",
    "concentration": "EDT",
    "variants": [
      {
        "title": "50mL EDT",
        "price": 2500
      },
      {
        "title": "100mL EDT",
        "price": 3500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Green Leaf",
        "Apple"
      ],
      "heart_notes": [
        "Lotus",
        "Mimosa",
        "Drenched Cedarwood"
      ],
      "base_notes": [
        "Musk",
        "Moss",
        "Amber",
        "Woody Notes"
      ],
      "accords": [
        "Fresh",
        "Aquatic",
        "Green",
        "Woody"
      ],
      "family": "Fresh",
      "sub_family": "Aquatic",
      "concentration": "EDT",
      "longevity": 2.8,
      "sillage": 2.5,
      "projection": 2.3,
      "gender": "Masculine",
      "season": [
        "Spring",
        "Summer"
      ],
      "occasion": [
        "Casual",
        "Office"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "D&G Light Blue",
    "brand": "Dolce & Gabbana",
    "description": "A fresh citrus fragrance by Dolce & Gabbana",
    "concentration": "EDT",
    "variants": [
      {
        "title": "25mL EDT",
        "price": 4500
      },
      {
        "title": "50mL EDT",
        "price": 7000
      },
      {
        "title": "100mL EDT",
        "price": 10000
      }
    ],
    "fragrance": {
      "top_notes": [
        "Sicilian Lemon",
        "Apple",
        "Cedar",
        "Bellflower"
      ],
      "heart_notes": [
        "Bamboo",
        "Jasmine",
        "White Rose"
      ],
      "base_notes": [
        "Cedar",
        "Musk",
        "Amber"
      ],
      "accords": [
        "Fresh",
        "Citrus",
        "Floral",
        "Aquatic"
      ],
      "family": "Fresh",
      "sub_family": "Citrus",
      "concentration": "EDT",
      "longevity": 2.8,
      "sillage": 2.5,
      "projection": 2.3,
      "gender": "Feminine",
      "season": [
        "Spring",
        "Summer"
      ],
      "occasion": [
        "Casual",
        "Office"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Montblanc Legend",
    "brand": "Montblanc",
    "description": "A fresh aromatic fragrance by Montblanc",
    "concentration": "EDT",
    "variants": [
      {
        "title": "30mL EDT",
        "price": 4500
      },
      {
        "title": "50mL EDT",
        "price": 6500
      },
      {
        "title": "100mL EDT",
        "price": 9000
      }
    ],
    "fragrance": {
      "top_notes": [
        "Bergamot",
        "Pineapple Leaf",
        "Lavender"
      ],
      "heart_notes": [
        "Geranium",
        "Apple",
        "Rose",
        "Coumarin"
      ],
      "base_notes": [
        "Sandalwood",
        "Tonka Bean",
        "Musk",
        "Oakmoss"
      ],
      "accords": [
        "Fresh",
        "Aromatic",
        "Woody",
        "Fruity"
      ],
      "family": "Fresh",
      "sub_family": "Aromatic",
      "concentration": "EDT",
      "longevity": 3.0,
      "sillage": 2.8,
      "projection": 2.5,
      "gender": "Masculine",
      "season": [
        "Spring",
        "Summer"
      ],
      "occasion": [
        "Office",
        "Casual"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Burberry Her",
    "brand": "Burberry",
    "description": "A fruity floral fragrance by Burberry",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 7500
      },
      {
        "title": "50mL EDP",
        "price": 10500
      },
      {
        "title": "100mL EDP",
        "price": 14500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Blackberry",
        "Raspberry",
        "Strawberry",
        "Blackcurrant"
      ],
      "heart_notes": [
        "Jasmine",
        "Violet"
      ],
      "base_notes": [
        "Musk",
        "Amber",
        "Woody Notes"
      ],
      "accords": [
        "Fruity",
        "Sweet",
        "Floral",
        "Amber"
      ],
      "family": "Floral",
      "sub_family": "Fruity Floral",
      "concentration": "EDP",
      "longevity": 3.8,
      "sillage": 3.5,
      "projection": 3.3,
      "gender": "Feminine",
      "season": [
        "Spring",
        "Summer",
        "Fall"
      ],
      "occasion": [
        "Casual",
        "Office"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&q=80"
    ]
  },
  {
    "title": "Cloud",
    "brand": "Ariana Grande",
    "description": "A sweet dreamy fragrance by Ariana Grande",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 4500
      },
      {
        "title": "50mL EDP",
        "price": 6000
      },
      {
        "title": "100mL EDP",
        "price": 7500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Lavender Blossom",
        "Juicy Pear",
        "Bergamot"
      ],
      "heart_notes": [
        "Coconut",
        "Praline",
        "Vanilla Orchid"
      ],
      "base_notes": [
        "Musks",
        "Blonde Woods",
        "Cashmere"
      ],
      "accords": [
        "Sweet",
        "Creamy",
        "Coconut",
        "Musky",
        "Vanilla"
      ],
      "family": "Amber",
      "sub_family": "Sweet",
      "concentration": "EDP",
      "longevity": 3.5,
      "sillage": 3.2,
      "projection": 3.0,
      "gender": "Feminine",
      "season": [
        "Spring",
        "Summer",
        "Fall"
      ],
      "occasion": [
        "Casual"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1772191399367-91ed8d95664b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxhbWJlciUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ5N3ww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1772191399367-91ed8d95664b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxhbWJlciUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Gucci Guilty",
    "brand": "Gucci",
    "description": "A floral amber fragrance by Gucci",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 7500
      },
      {
        "title": "50mL EDP",
        "price": 10500
      },
      {
        "title": "90mL EDP",
        "price": 14000
      }
    ],
    "fragrance": {
      "top_notes": [
        "Mandarin Orange",
        "Pink Pepper",
        "Bergamot"
      ],
      "heart_notes": [
        "Lilac",
        "Geranium",
        "Rose"
      ],
      "base_notes": [
        "Patchouli",
        "Amber",
        "Cedarwood"
      ],
      "accords": [
        "Floral",
        "Amber",
        "Fresh",
        "Woody"
      ],
      "family": "Floral",
      "sub_family": "Floral Amber",
      "concentration": "EDP",
      "longevity": 3.5,
      "sillage": 3.3,
      "projection": 3.0,
      "gender": "Feminine",
      "season": [
        "Spring",
        "Fall"
      ],
      "occasion": [
        "Office",
        "Casual"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=800&q=80"
    ]
  },
  {
    "title": "Gucci Bloom",
    "brand": "Gucci",
    "description": "A floral white floral fragrance by Gucci",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 7500
      },
      {
        "title": "50mL EDP",
        "price": 10500
      },
      {
        "title": "100mL EDP",
        "price": 14000
      }
    ],
    "fragrance": {
      "top_notes": [
        "Natural Tuberose"
      ],
      "heart_notes": [
        "Jasmine",
        "Rangoon Creeper"
      ],
      "base_notes": [
        "Sandalwood",
        "Musk"
      ],
      "accords": [
        "Floral",
        "White Floral",
        "Powdery",
        "Green"
      ],
      "family": "Floral",
      "sub_family": "White Floral",
      "concentration": "EDP",
      "longevity": 3.8,
      "sillage": 3.5,
      "projection": 3.3,
      "gender": "Feminine",
      "season": [
        "Spring",
        "Summer"
      ],
      "occasion": [
        "Casual",
        "Date Night"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&q=80"
    ]
  },
  {
    "title": "Chanel No. 5",
    "brand": "Chanel",
    "description": "A floral aldehyde fragrance by Chanel",
    "concentration": "EDP",
    "variants": [
      {
        "title": "35mL EDP",
        "price": 11000
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 19500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Aldehydes",
        "Ylang-Ylang",
        "Neroli",
        "Bergamot"
      ],
      "heart_notes": [
        "Jasmine",
        "Rose",
        "Lily of the Valley",
        "Iris"
      ],
      "base_notes": [
        "Sandalwood",
        "Vanilla",
        "Vetiver",
        "Amber",
        "Patchouli",
        "Musk"
      ],
      "accords": [
        "Floral",
        "Powdery",
        "Aldehyde",
        "Woody",
        "Amber"
      ],
      "family": "Floral",
      "sub_family": "Soft Floral",
      "concentration": "EDP",
      "longevity": 4.2,
      "sillage": 3.8,
      "projection": 3.5,
      "gender": "Feminine",
      "season": [
        "Fall",
        "Winter",
        "Spring"
      ],
      "occasion": [
        "Special Event",
        "Office"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1731855315921-7be11aa1879d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxDaGFuZWwlMjBwZXJmdW1lfGVufDB8Mnx8fDE3NzU0MDQ0OTF8MA&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1731855315921-7be11aa1879d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxDaGFuZWwlMjBwZXJmdW1lfGVufDB8Mnx8fDE3NzU0MDQ0OTF8MA&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Joop! Homme Joop! 1989 Eau de Toilette",
    "brand": "Joop!",
    "description": "A amber sweet fragrance by Joop!",
    "concentration": "EDT",
    "variants": [
      {
        "title": "30mL EDT",
        "price": 6500
      },
      {
        "title": "50mL EDT",
        "price": 8500
      },
      {
        "title": "100mL EDT",
        "price": 12500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Orange blossom",
        "Bergamot",
        "Mandarin orange",
        "Lemon"
      ],
      "heart_notes": [
        "Heliotrope",
        "Cinnamon",
        "Lily of the valley",
        "Jasmine"
      ],
      "base_notes": [
        "Vanilla",
        "Tonka bean",
        "Sandalwood",
        "Patchouli"
      ],
      "accords": [
        "Sweet",
        "Oriental",
        "Synthetic",
        "Spicy",
        "Fruity"
      ],
      "family": "Amber",
      "sub_family": "Sweet",
      "concentration": "EDT",
      "longevity": 2.9,
      "sillage": 2.7,
      "projection": 2.5,
      "gender": "Masculine",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1772191399367-91ed8d95664b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxhbWJlciUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ5N3ww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1772191399367-91ed8d95664b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxhbWJlciUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Million Paco Rabanne 2008 Eau de Toilette",
    "brand": "Paco Rabanne",
    "description": "A amber sweet fragrance by Paco Rabanne",
    "concentration": "EDT",
    "variants": [
      {
        "title": "30mL EDT",
        "price": 6500
      },
      {
        "title": "50mL EDT",
        "price": 8500
      },
      {
        "title": "100mL EDT",
        "price": 12500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Red mandarin orange",
        "Peppermint"
      ],
      "heart_notes": [
        "Cinnamon",
        "Rose absolute"
      ],
      "base_notes": [
        "Amberketal",
        "Leather"
      ],
      "accords": [
        "Sweet",
        "Spicy",
        "Oriental",
        "Synthetic",
        "Fruity"
      ],
      "family": "Amber",
      "sub_family": "Sweet",
      "concentration": "EDT",
      "longevity": 2.9,
      "sillage": 2.7,
      "projection": 2.5,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1772191399367-91ed8d95664b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxhbWJlciUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ5N3ww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1772191399367-91ed8d95664b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxhbWJlciUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "CK One Calvin Klein 1994 Eau de Toilette",
    "brand": "Calvin Klein",
    "description": "A fresh citrus fragrance by Calvin Klein",
    "concentration": "EDT",
    "variants": [
      {
        "title": "30mL EDT",
        "price": 6500
      },
      {
        "title": "50mL EDT",
        "price": 8500
      },
      {
        "title": "100mL EDT",
        "price": 12500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Bergamot",
        "Lemon",
        "Mandarin orange",
        "Papaya"
      ],
      "heart_notes": [
        "Green tea",
        "Jasmine",
        "Lily of the valley",
        "Nutmeg",
        "Violet",
        "Rose"
      ],
      "base_notes": [
        "Musk",
        "Amber"
      ],
      "accords": [
        "Fresh",
        "Citrus",
        "Aquatic",
        "Floral",
        "Synthetic"
      ],
      "family": "Fresh",
      "sub_family": "Fresh",
      "concentration": "EDT",
      "longevity": 2.3,
      "sillage": 2.1,
      "projection": 1.9,
      "gender": "Unisex",
      "season": [
        "Spring",
        "Summer"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Outdoor",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Individuel Montblanc 2003 Eau de Toilette",
    "brand": "Montblanc",
    "description": "A fresh sweet fragrance by Montblanc",
    "concentration": "EDT",
    "variants": [
      {
        "title": "30mL EDT",
        "price": 6500
      },
      {
        "title": "50mL EDT",
        "price": 8500
      },
      {
        "title": "100mL EDT",
        "price": 12500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Juniper berry",
        "Bergamot",
        "Cinnamon",
        "Lavender",
        "Mint",
        "Coriander"
      ],
      "heart_notes": [
        "Geranium",
        "Orange blossom",
        "Jasmine",
        "Violet"
      ],
      "base_notes": [
        "Raspberry",
        "Vanilla",
        "Amber",
        "Musk",
        "Oakmoss",
        "Patchouli"
      ],
      "accords": [
        "Sweet",
        "Fruity",
        "Fresh",
        "Synthetic",
        "Spicy"
      ],
      "family": "Fresh",
      "sub_family": "Sweet",
      "concentration": "EDT",
      "longevity": 2.6,
      "sillage": 2.4,
      "projection": 2.2,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "La Vie est Belle L'Eau de Parfum",
    "brand": "Lancôme",
    "description": "A floral sweet fragrance by Lancôme",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Blackcurrant",
        "Pear"
      ],
      "heart_notes": [
        "Iris",
        "Jasmine",
        "Orange blossom"
      ],
      "base_notes": [
        "Praliné",
        "Tonka bean",
        "Patchouli",
        "Vanilla"
      ],
      "accords": [
        "Sweet",
        "Floral",
        "Gourmand",
        "Fruity",
        "Powdery"
      ],
      "family": "Floral",
      "sub_family": "Sweet",
      "concentration": "EDP",
      "longevity": 3.8,
      "sillage": 3.6,
      "projection": 3.4,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&q=80"
    ]
  },
  {
    "title": "Invictus Paco Rabanne 2013 Eau de Toilette",
    "brand": "Paco Rabanne",
    "description": "A fresh synthetic fragrance by Paco Rabanne",
    "concentration": "EDT",
    "variants": [
      {
        "title": "30mL EDT",
        "price": 6500
      },
      {
        "title": "50mL EDT",
        "price": 8500
      },
      {
        "title": "100mL EDT",
        "price": 12500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Marine notes",
        "Grapefruit"
      ],
      "heart_notes": [
        "Bay leaf",
        "Jasmine"
      ],
      "base_notes": [
        "Ambergris",
        "Gaiac wood",
        "Oakmoss",
        "Patchouli"
      ],
      "accords": [
        "Fresh",
        "Synthetic",
        "Sweet",
        "Aquatic",
        "Fruity"
      ],
      "family": "Fresh",
      "sub_family": "Fresh",
      "concentration": "EDT",
      "longevity": 2.5,
      "sillage": 2.3,
      "projection": 2.1,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Outdoor"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Sculpture Homme Nikos 1995 Eau de Toilette",
    "brand": "Nikos",
    "description": "A fresh sweet fragrance by Nikos",
    "concentration": "EDT",
    "variants": [
      {
        "title": "30mL EDT",
        "price": 6500
      },
      {
        "title": "50mL EDT",
        "price": 8500
      },
      {
        "title": "100mL EDT",
        "price": 12500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Orange blossom",
        "Bergamot",
        "Coriander",
        "Lemon",
        "Mandarin orange"
      ],
      "heart_notes": [
        "Geranium",
        "Lily of the valley",
        "Jasmine",
        "Rose"
      ],
      "base_notes": [
        "Tonka bean",
        "Benzoin",
        "Amber",
        "Cedar"
      ],
      "accords": [
        "Fresh",
        "Sweet",
        "Citrus",
        "Floral",
        "Synthetic"
      ],
      "family": "Fresh",
      "sub_family": "Fresh",
      "concentration": "EDT",
      "longevity": 2.5,
      "sillage": 2.3,
      "projection": 2.1,
      "gender": "Masculine",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Passionate",
    "brand": "Boadicea the Victorious",
    "description": "A fresh sweet fragrance by Boadicea the Victorious",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Orange blossom",
        "Bergamot",
        "Coriander",
        "Lemon",
        "Mandarin orange"
      ],
      "heart_notes": [
        "Geranium",
        "Lily of the valley",
        "Jasmine",
        "Rose"
      ],
      "base_notes": [
        "Tonka bean",
        "Benzoin",
        "Amber",
        "Cedar"
      ],
      "accords": [
        "Fresh",
        "Sweet",
        "Citrus",
        "Floral",
        "Synthetic"
      ],
      "family": "Fresh",
      "sub_family": "Fresh",
      "concentration": "EDP",
      "longevity": 3.5,
      "sillage": 3.3,
      "projection": 3.1,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "The Royal",
    "brand": "ann fragrance",
    "description": "A fresh sweet fragrance by ann fragrance",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Orange blossom",
        "Bergamot",
        "Coriander",
        "Lemon",
        "Mandarin orange"
      ],
      "heart_notes": [
        "Geranium",
        "Lily of the valley",
        "Jasmine",
        "Rose"
      ],
      "base_notes": [
        "Tonka bean",
        "Benzoin",
        "Amber",
        "Cedar"
      ],
      "accords": [
        "Fresh",
        "Sweet",
        "Citrus",
        "Floral",
        "Synthetic"
      ],
      "family": "Fresh",
      "sub_family": "Fresh",
      "concentration": "EDP",
      "longevity": 3.5,
      "sillage": 3.3,
      "projection": 3.1,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "L'Eau d'Issey pour Homme Issey Miyake 1994 Eau de Toilette",
    "brand": "Issey Miyake",
    "description": "A fresh citrus fragrance by Issey Miyake",
    "concentration": "EDT",
    "variants": [
      {
        "title": "30mL EDT",
        "price": 6500
      },
      {
        "title": "50mL EDT",
        "price": 8500
      },
      {
        "title": "100mL EDT",
        "price": 12500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Yuzu",
        "Mandarin orange"
      ],
      "heart_notes": [
        "Nutmeg",
        "Water lily",
        "Cinnamon"
      ],
      "base_notes": [
        "Sandalwood",
        "Vetiver",
        "Amber",
        "Tobacco"
      ],
      "accords": [
        "Fresh",
        "Citrus",
        "Aquatic",
        "Woody",
        "Spicy"
      ],
      "family": "Fresh",
      "sub_family": "Fresh",
      "concentration": "EDT",
      "longevity": 2.3,
      "sillage": 2.1,
      "projection": 1.9,
      "gender": "Masculine",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Outdoor",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Emporio Armani - Stronger With You",
    "brand": "Giorgio Armani",
    "description": "A amber sweet fragrance by Giorgio Armani",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Cardamom",
        "Pink pepper",
        "Violet leaf"
      ],
      "heart_notes": [
        "Sage"
      ],
      "base_notes": [
        "Vanilla",
        "Marron glacé"
      ],
      "accords": [
        "Sweet",
        "Spicy",
        "Gourmand",
        "Synthetic",
        "Woody"
      ],
      "family": "Amber",
      "sub_family": "Sweet",
      "concentration": "EDP",
      "longevity": 3.8,
      "sillage": 3.6,
      "projection": 3.4,
      "gender": "Masculine",
      "season": [
        "Fall",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1772191399367-91ed8d95664b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxhbWJlciUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ5N3ww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1772191399367-91ed8d95664b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxhbWJlciUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Ambassador for Men",
    "brand": "Gisada",
    "description": "A amber sweet fragrance by Gisada",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Apple",
        "Green mandarin orange",
        "Cardamom",
        "Violet"
      ],
      "heart_notes": [
        "Mango",
        "Black pepper",
        "Lavender",
        "Patchouli",
        "Peony"
      ],
      "base_notes": [
        "Amber",
        "Vanilla",
        "Vetiver",
        "Moss",
        "Teak"
      ],
      "accords": [
        "Sweet",
        "Fruity",
        "Synthetic",
        "Spicy",
        "Woody"
      ],
      "family": "Amber",
      "sub_family": "Sweet",
      "concentration": "EDP",
      "longevity": 3.8,
      "sillage": 3.6,
      "projection": 3.4,
      "gender": "Masculine",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1772191399367-91ed8d95664b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxhbWJlciUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ5N3ww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1772191399367-91ed8d95664b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxhbWJlciUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Armani Code Black Code Giorgio Armani 2004 Eau de Toilette",
    "brand": "Giorgio Armani",
    "description": "A amber spicy fragrance by Giorgio Armani",
    "concentration": "EDT",
    "variants": [
      {
        "title": "30mL EDT",
        "price": 6500
      },
      {
        "title": "50mL EDT",
        "price": 8500
      },
      {
        "title": "100mL EDT",
        "price": 12500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Bergamot",
        "Lemon"
      ],
      "heart_notes": [
        "Star anise",
        "Olive blossom"
      ],
      "base_notes": [
        "Tonka bean",
        "Gaiac wood",
        "Leather",
        "Tobacco"
      ],
      "accords": [
        "Spicy",
        "Sweet",
        "Woody",
        "Oriental",
        "Fresh"
      ],
      "family": "Amber",
      "sub_family": "Spicy",
      "concentration": "EDT",
      "longevity": 2.8,
      "sillage": 2.6,
      "projection": 2.4,
      "gender": "Masculine",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1772191399367-91ed8d95664b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxhbWJlciUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ5N3ww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1772191399367-91ed8d95664b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxhbWJlciUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Angel Mugler 1992 Eau de Parfum",
    "brand": "Mugler",
    "description": "A amber sweet fragrance by Mugler",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Cotton candy",
        "Cassia",
        "Coconut",
        "Jasmine",
        "Bergamot",
        "Mandarin orange"
      ],
      "heart_notes": [
        "Honey",
        "Jasmine",
        "Orchid",
        "Peach",
        "Red berries",
        "Apricot"
      ],
      "base_notes": [
        "Patchouli",
        "Chocolate",
        "Caramel",
        "Amber",
        "Musk",
        "Tonka bean"
      ],
      "accords": [
        "Sweet",
        "Gourmand",
        "Oriental",
        "Spicy",
        "Fruity"
      ],
      "family": "Amber",
      "sub_family": "Sweet",
      "concentration": "EDP",
      "longevity": 3.9,
      "sillage": 3.7,
      "projection": 3.5,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1772191399367-91ed8d95664b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxhbWJlciUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ5N3ww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1772191399367-91ed8d95664b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxhbWJlciUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Blue Jeans",
    "brand": "Versace",
    "description": "A fresh citrus fragrance by Versace",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Citrus fruits",
        "Aniseed",
        "Bergamot",
        "Rosewood",
        "Basil",
        "Juniper"
      ],
      "heart_notes": [
        "Heliotrope",
        "Lavender",
        "Carnation",
        "Jasmine",
        "Sage",
        "Fir"
      ],
      "base_notes": [
        "Tonka bean",
        "Amber",
        "Cedar",
        "Iris",
        "Musk",
        "Patchouli"
      ],
      "accords": [
        "Fresh",
        "Citrus",
        "Sweet",
        "Floral",
        "Synthetic"
      ],
      "family": "Fresh",
      "sub_family": "Fresh",
      "concentration": "EDP",
      "longevity": 3.5,
      "sillage": 3.3,
      "projection": 3.1,
      "gender": "Unisex",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Voyage Nautica 2006 Eau de Toilette",
    "brand": "Nautica",
    "description": "A fresh aquatic fragrance by Nautica",
    "concentration": "EDT",
    "variants": [
      {
        "title": "30mL EDT",
        "price": 6500
      },
      {
        "title": "50mL EDT",
        "price": 8500
      },
      {
        "title": "100mL EDT",
        "price": 12500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Apple",
        "Leaves"
      ],
      "heart_notes": [
        "Lotus",
        "Mimosa"
      ],
      "base_notes": [
        "Moss",
        "Musk",
        "Cedar",
        "Amber"
      ],
      "accords": [
        "Aquatic",
        "Fresh",
        "Synthetic",
        "Green",
        "Fruity"
      ],
      "family": "Fresh",
      "sub_family": "Aquatic",
      "concentration": "EDT",
      "longevity": 2.3,
      "sillage": 2.1,
      "projection": 1.9,
      "gender": "Unisex",
      "season": [
        "Spring",
        "Summer"
      ],
      "occasion": [
        "Casual",
        "Office",
        "Outdoor"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "title": "Office for Men",
    "brand": "Fragrance One",
    "description": "A fresh citrus fragrance by Fragrance One",
    "concentration": "EDP",
    "variants": [
      {
        "title": "30mL EDP",
        "price": 9500
      },
      {
        "title": "50mL EDP",
        "price": 14500
      },
      {
        "title": "100mL EDP",
        "price": 22500
      }
    ],
    "fragrance": {
      "top_notes": [
        "Ambrox",
        "Bergamot",
        "Iris"
      ],
      "heart_notes": [
        "Cachalox",
        "Paradisone®",
        "Pink pepper"
      ],
      "base_notes": [
        "Musk",
        "Woody notes",
        "Patchouli"
      ],
      "accords": [
        "Fresh",
        "Citrus",
        "Synthetic",
        "Woody",
        "Spicy"
      ],
      "family": "Fresh",
      "sub_family": "Fresh",
      "concentration": "EDP",
      "longevity": 3.5,
      "sillage": 3.3,
      "projection": 3.1,
      "gender": "Masculine",
      "season": [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
      ],
      "occasion": [
        "Casual",
        "Date Night",
        "Office",
        "Special Event"
      ]
    },
    "thumbnail": "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=400",
    "images": [
      "https://images.unsplash.com/photo-1720423514789-15a33e59fc81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTYzOTZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MHwyfHx8MTc3NTQwNDQ4NXww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  }
];
