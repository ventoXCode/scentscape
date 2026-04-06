import { model } from "@medusajs/framework/utils";

export const Review = model.define("review", {
  id: model.id().primaryKey(),
  product_id: model.text().searchable(),
  customer_id: model.text(),
  // 1-5 star rating
  rating: model.number(),
  title: model.text().nullable(),
  body: model.text().nullable(),
  // For future moderation: approved, pending, rejected
  status: model.text().default("approved"),
});
