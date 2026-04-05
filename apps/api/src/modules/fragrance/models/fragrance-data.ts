import { model } from "@medusajs/framework/utils";

export const FragranceData = model.define("fragrance_data", {
  id: model.id().primaryKey(),
  product_id: model.text().unique(),

  // Three-tier scent pyramid
  top_notes: model.json().$default(() => []),    // string[]
  heart_notes: model.json().$default(() => []),  // string[]
  base_notes: model.json().$default(() => []),   // string[]

  // Classification
  accords: model.json().$default(() => []),      // string[]
  family: model.enum(["Fresh", "Floral", "Amber", "Woody"]),
  sub_family: model.text().nullable(),
  concentration: model.enum(["EDC", "EDT", "EDP", "Parfum", "Extrait"]),

  // Performance ratings (1-5 scale)
  longevity: model.float().nullable(),
  sillage: model.float().nullable(),
  projection: model.float().nullable(),

  // Additional metadata
  gender: model.enum(["Masculine", "Feminine", "Unisex"]).default("Unisex"),
  season: model.json().$default(() => []),       // string[] e.g., ["Spring", "Summer"]
  occasion: model.json().$default(() => []),     // string[] e.g., ["Office", "Date Night"]

  created_at: model.dateTime(),
  updated_at: model.dateTime(),
});
