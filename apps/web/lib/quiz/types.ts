// ── Personality Dimensions ──────────────────────────────────────────
// Each axis ranges from -1 to +1. The user's accumulated scores
// determine which archetype they're closest to.

export interface PersonalityDimensions {
  warmthFreshness: number;    // -1 = crisp/fresh/clean → +1 = warm/cozy/rich
  boldnessSubtlety: number;  // -1 = subtle/understated → +1 = bold/commanding
  classicAvantgarde: number;  // -1 = classic/timeless → +1 = modern/experimental
  intimateProjecting: number; // -1 = intimate/close → +1 = projecting/filling-a-room
}

export interface Archetype {
  id: string;
  name: string;
  tagline: string;
  description: string;
  gradient: string;         // tailwind gradient classes
  textColor: string;        // tailwind text class for contrast
  accentColor: string;      // tailwind accent class
  dimensions: PersonalityDimensions;
  familyAffinities: Record<string, number>; // family name → 0-1 affinity
  accordAffinities: string[];
}

// ── Quiz Questions ─────────────────────────────────────────────────

export interface QuizOption {
  id: string;
  label: string;
  description: string;
  emoji: string;
  dimensionShifts: Partial<PersonalityDimensions>;
  familyBoosts?: Record<string, number>;
  accordBoosts?: string[];
}

export interface QuizQuestionTheme {
  /** Subtle background gradient applied to the step container */
  bg: string;
  /** Accent color for selected state border + checkmark */
  accent: string;
  /** Accent background for the checkmark circle */
  accentBg: string;
}

export interface QuizQuestion {
  id: string;
  title: string;
  subtitle: string;
  hint?: string; // Brief educational context shown below the subtitle
  type: "single" | "multi";
  maxSelections?: number;
  options: QuizOption[];
  condition?: (session: QuizSession) => boolean;
  theme?: QuizQuestionTheme;
}

// ── Quiz Session (persisted to localStorage) ───────────────────────

export interface QuizSession {
  currentStepIndex: number;
  answers: Record<string, string | string[]>;
  dimensions: PersonalityDimensions;
  familyAffinities: Record<string, number>;
  accordAffinities: Record<string, number>;
  intensity: string | null;
  occasions: string[];
  experience: string | null;
  budget: string | null;
}

// ── Quiz Result ────────────────────────────────────────────────────

export interface QuizResult {
  productId: string;
  handle: string;
  title: string;
  brand: string;
  thumbnail: string | null;
  price: number;
  matchScore: number;
  explanation: string;
  family: string;
  topAccords: string[];
}

export interface QuizOutcome {
  archetype: Archetype;
  results: QuizResult[];
  dimensions: PersonalityDimensions;
}

export const EMPTY_DIMENSIONS: PersonalityDimensions = {
  warmthFreshness: 0,
  boldnessSubtlety: 0,
  classicAvantgarde: 0,
  intimateProjecting: 0,
};

export function createEmptySession(): QuizSession {
  return {
    currentStepIndex: 0,
    answers: {},
    dimensions: { ...EMPTY_DIMENSIONS },
    familyAffinities: {},
    accordAffinities: {},
    intensity: null,
    occasions: [],
    experience: null,
    budget: null,
  };
}
