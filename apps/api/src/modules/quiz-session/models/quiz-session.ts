import { model } from "@medusajs/framework/utils";

export const QuizSession = model.define("quiz_session", {
  id: model.id().primaryKey(),
  // Short URL-safe ID for shareable links
  share_id: model.text().unique(),
  // Null for anonymous sessions, set when user is authenticated
  customer_id: model.text().nullable(),
  // Raw quiz answers: questionId → optionId or optionId[]
  answers: model.json().default({}),
  // 4D personality space: warmthFreshness, boldnessSubtlety, classicAvantgarde, intimateProjecting
  dimensions: model.json().default({}),
  // Accumulated family affinity scores
  family_affinities: model.json().default({}),
  // Accumulated accord affinity scores
  accord_affinities: model.json().default({}),
  intensity: model.text().nullable(),
  occasions: model.json().default([]),
  experience: model.text().nullable(),
  // Matched archetype ID (e.g. "velvet-dusk")
  archetype_id: model.text(),
  // Full recommendation results with scores and explanations
  results: model.json().default([]),
});
