import { QUIZ_QUESTIONS } from "./questions";
import {
  QuizQuestion,
  QuizSession,
  PersonalityDimensions,
  createEmptySession,
} from "./types";

const STORAGE_KEY = "scentscape-quiz-session";

/**
 * Get the ordered list of questions the user should see,
 * evaluating branching conditions against the current session.
 */
export function getActiveQuestions(session: QuizSession): QuizQuestion[] {
  return QUIZ_QUESTIONS.filter(
    (q) => !q.condition || q.condition(session)
  );
}

/**
 * Get the current question based on session step index.
 */
export function getCurrentQuestion(session: QuizSession): QuizQuestion | null {
  const active = getActiveQuestions(session);
  return active[session.currentStepIndex] ?? null;
}

/**
 * Total number of active steps (excluding skipped branches).
 */
export function getTotalSteps(session: QuizSession): number {
  return getActiveQuestions(session).length;
}

/**
 * Whether the quiz is complete (past the last question).
 */
export function isQuizComplete(session: QuizSession): boolean {
  return session.currentStepIndex >= getTotalSteps(session);
}

/**
 * Apply a single-select answer to the session, accumulating
 * dimensional shifts, accord/family boosts, and special fields.
 */
export function applySingleAnswer(
  session: QuizSession,
  questionId: string,
  optionId: string
): QuizSession {
  const question = QUIZ_QUESTIONS.find((q) => q.id === questionId);
  const option = question?.options.find((o) => o.id === optionId);
  if (!question || !option) return session;

  const next = structuredClone(session);
  next.answers[questionId] = optionId;

  // Accumulate dimensional shifts
  applyDimensionShifts(next.dimensions, option.dimensionShifts);

  // Accumulate accord boosts
  if (option.accordBoosts) {
    for (const accord of option.accordBoosts) {
      next.accordAffinities[accord] = (next.accordAffinities[accord] || 0) + 1;
    }
  }

  // Accumulate family boosts
  if (option.familyBoosts) {
    for (const [family, boost] of Object.entries(option.familyBoosts)) {
      next.familyAffinities[family] = (next.familyAffinities[family] || 0) + boost;
    }
  }

  // Track special fields
  if (questionId === "intensity") next.intensity = optionId;
  if (questionId === "experience") next.experience = optionId;

  return next;
}

/**
 * Apply a multi-select answer to the session.
 */
export function applyMultiAnswer(
  session: QuizSession,
  questionId: string,
  optionIds: string[]
): QuizSession {
  const question = QUIZ_QUESTIONS.find((q) => q.id === questionId);
  if (!question) return session;

  const next = structuredClone(session);

  // Remove previous contributions from this question if re-answering
  const prevIds = next.answers[questionId];
  if (Array.isArray(prevIds)) {
    for (const prevId of prevIds) {
      const prevOption = question.options.find((o) => o.id === prevId);
      if (prevOption) {
        reverseDimensionShifts(next.dimensions, prevOption.dimensionShifts);
        if (prevOption.accordBoosts) {
          for (const accord of prevOption.accordBoosts) {
            next.accordAffinities[accord] = Math.max(0, (next.accordAffinities[accord] || 0) - 1);
          }
        }
        if (prevOption.familyBoosts) {
          for (const [family, boost] of Object.entries(prevOption.familyBoosts)) {
            next.familyAffinities[family] = Math.max(0, (next.familyAffinities[family] || 0) - boost);
          }
        }
      }
    }
  }

  next.answers[questionId] = optionIds;

  // Apply new selections
  for (const id of optionIds) {
    const option = question.options.find((o) => o.id === id);
    if (!option) continue;
    applyDimensionShifts(next.dimensions, option.dimensionShifts);
    if (option.accordBoosts) {
      for (const accord of option.accordBoosts) {
        next.accordAffinities[accord] = (next.accordAffinities[accord] || 0) + 1;
      }
    }
    if (option.familyBoosts) {
      for (const [family, boost] of Object.entries(option.familyBoosts)) {
        next.familyAffinities[family] = (next.familyAffinities[family] || 0) + boost;
      }
    }
  }

  // Track occasions
  if (questionId === "occasion") next.occasions = optionIds;

  return next;
}

/**
 * Advance to the next question, skipping any whose conditions aren't met.
 */
export function advanceStep(session: QuizSession): QuizSession {
  const next = structuredClone(session);
  next.currentStepIndex += 1;
  return next;
}

/**
 * Go back one step within the active question list.
 */
export function goBackStep(session: QuizSession): QuizSession {
  if (session.currentStepIndex <= 0) return session;
  const next = structuredClone(session);
  next.currentStepIndex -= 1;
  return next;
}

// ── localStorage Persistence ──────────────────────────────────────

export function saveSession(session: QuizSession): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {
    // localStorage unavailable (SSR, private browsing quota exceeded)
  }
}

export function loadSession(): QuizSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // Basic shape validation
    if (typeof parsed.currentStepIndex !== "number" || !parsed.dimensions) return null;
    return parsed as QuizSession;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

// ── Helpers ───────────────────────────────────────────────────────

function applyDimensionShifts(
  dims: PersonalityDimensions,
  shifts: Partial<PersonalityDimensions>
): void {
  for (const [key, value] of Object.entries(shifts)) {
    const k = key as keyof PersonalityDimensions;
    dims[k] = clamp(dims[k] + (value ?? 0), -1, 1);
  }
}

function reverseDimensionShifts(
  dims: PersonalityDimensions,
  shifts: Partial<PersonalityDimensions>
): void {
  for (const [key, value] of Object.entries(shifts)) {
    const k = key as keyof PersonalityDimensions;
    dims[k] = clamp(dims[k] - (value ?? 0), -1, 1);
  }
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
