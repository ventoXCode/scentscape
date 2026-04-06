import type { QuizSession, QuizOutcome, QuizResult, PersonalityDimensions } from "./types";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ||
  process.env.MEDUSA_BACKEND_URL ||
  "http://localhost:9000";

interface SavedQuizSession {
  id: string;
  share_id: string;
  customer_id: string | null;
  archetype_id: string;
  dimensions: PersonalityDimensions;
  results: QuizResult[];
  created_at: string;
}

/** Save a completed quiz session to the backend. Returns the share_id for shareable URLs. */
export async function saveQuizSession(
  session: QuizSession,
  outcome: QuizOutcome
): Promise<{ shareId: string } | null> {
  try {
    const res = await fetch(`${BACKEND_URL}/store/quiz-sessions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        answers: session.answers,
        dimensions: session.dimensions,
        family_affinities: session.familyAffinities,
        accord_affinities: session.accordAffinities,
        intensity: session.intensity,
        occasions: session.occasions,
        experience: session.experience,
        archetype_id: outcome.archetype.id,
        results: outcome.results,
      }),
    });

    if (!res.ok) return null;
    const data = await res.json();
    return { shareId: data.quiz_session.share_id };
  } catch {
    return null;
  }
}

/** Fetch a shared quiz session by its share_id. */
export async function getSharedQuizSession(
  shareId: string
): Promise<SavedQuizSession | null> {
  try {
    const res = await fetch(
      `${BACKEND_URL}/store/quiz-sessions/${shareId}`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.quiz_session;
  } catch {
    return null;
  }
}

/** Update recommendation feedback on a saved quiz session. */
export async function updateQuizSessionFeedback(
  shareId: string,
  results: QuizResult[]
): Promise<boolean> {
  try {
    const res = await fetch(
      `${BACKEND_URL}/store/quiz-sessions/${shareId}/feedback`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ results }),
      }
    );
    return res.ok;
  } catch {
    return false;
  }
}

/** Fetch the authenticated user's quiz sessions. */
export async function getMyQuizSessions(
  authToken: string
): Promise<SavedQuizSession[]> {
  try {
    const res = await fetch(`${BACKEND_URL}/store/quiz-sessions/me`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.quiz_sessions ?? [];
  } catch {
    return [];
  }
}
