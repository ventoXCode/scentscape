export interface QuizAnswers {
  gender: "masculine" | "feminine" | "unisex" | null;
  moods: string[];           // Selected mood images
  families: string[];        // Fresh, Floral, Amber, Woody
  intensity: "light" | "moderate" | "bold" | null;
  occasions: string[];       // Office, Date Night, Casual, etc.
}

export interface QuizResult {
  productId: string;
  handle: string;
  title: string;
  brand: string;
  thumbnail: string | null;
  matchScore: number;        // 0-100
  matchReasons: string[];    // Why this matches
}

export const QUIZ_STEPS = [
  "gender",
  "mood",
  "family",
  "intensity",
  "results",
] as const;

export type QuizStep = (typeof QUIZ_STEPS)[number];
