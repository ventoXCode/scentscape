"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface QuizProfile {
  topFamily: string;
  archetypeName?: string;
}

const STORAGE_KEY = "scentscape-quiz-session";

function getQuizProfile(): QuizProfile | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const session = JSON.parse(raw);
    const affinities = session?.familyAffinities as Record<string, number> | undefined;
    if (!affinities || Object.keys(affinities).length === 0) return null;

    // Find the family with the highest affinity score
    const topFamily = Object.entries(affinities).sort(
      ([, a], [, b]) => b - a
    )[0][0];

    return { topFamily };
  } catch {
    return null;
  }
}

export function QuizProfileBanner() {
  const [profile, setProfile] = useState<QuizProfile | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    setProfile(getQuizProfile());
  }, []);

  // Don't show if no quiz data, already dismissed, or already filtering by family
  if (!profile || dismissed || searchParams.get("family")) return null;

  return (
    <div className="mb-6 bg-accent-primary/5 border border-accent-primary/20 rounded-xl p-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 min-w-0">
        <span className="text-2xl shrink-0" aria-hidden="true">✨</span>
        <p className="text-sm text-text-secondary">
          Based on your quiz, you might love{" "}
          <span className="font-semibold text-text-primary">{profile.topFamily}</span>{" "}
          fragrances.
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Link
          href={`/products?family=${encodeURIComponent(profile.topFamily)}`}
          className="px-4 py-1.5 bg-accent-primary text-text-inverse rounded-lg text-sm font-medium hover:bg-accent-primary-hover transition-colors whitespace-nowrap"
        >
          Show me
        </Link>
        <button
          onClick={() => setDismissed(true)}
          className="p-1.5 text-text-muted hover:text-text-primary transition-colors"
          aria-label="Dismiss suggestion"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
