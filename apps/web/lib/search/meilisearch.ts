import { MeiliSearch } from "meilisearch";

export const meilisearch = new MeiliSearch({
  host: process.env.MEILISEARCH_HOST || "http://localhost:7700",
  apiKey: process.env.MEILISEARCH_API_KEY,
});

export const PRODUCTS_INDEX = "products";

export interface SearchableProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  brand: string;
  thumbnail: string | null;
  price: number;
  // Fragrance data
  top_notes: string[];
  heart_notes: string[];
  base_notes: string[];
  accords: string[];
  family: string;
  sub_family: string;
  concentration: string;
  longevity: number;
  sillage: number;
  gender: string;
  season: string[];
  occasion: string[];
}

export async function initializeSearchIndex() {
  const index = meilisearch.index(PRODUCTS_INDEX);

  await index.updateSettings({
    searchableAttributes: [
      "title",
      "brand",
      "description",
      "top_notes",
      "heart_notes",
      "base_notes",
      "accords",
      "family",
    ],
    filterableAttributes: [
      "family",
      "concentration",
      "gender",
      "season",
      "occasion",
      "accords",
      "price",
    ],
    sortableAttributes: ["price", "longevity", "sillage"],
  });
}
