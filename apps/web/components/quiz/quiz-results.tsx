"use client";

import { useEffect, useState } from "react";
import type { QuizSession, QuizOutcome } from "@/lib/quiz/types";
import { getRecommendations } from "@/lib/quiz/recommendation-engine";
import { PersonalityCard } from "./personality-card";
import { QuizLoading } from "./quiz-loading";
import Link from "next/link";
import { formatPrice } from "@/lib/utils/format";

interface QuizResultsProps {
  session: QuizSession;
  onRetake: () => void;
}

export function QuizResults({ session, onRetake }: QuizResultsProps) {
  const [outcome, setOutcome] = useState<QuizOutcome | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);

    getRecommendations(session)
      .then((result) => {
        if (!cancelled) {
          setOutcome(result);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [session]);

  if (loading) return <QuizLoading />;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <p className="text-gray-600 mb-2">Something went wrong loading your results.</p>
        <p className="text-sm text-gray-400 mb-6">
          Your answers are saved — try again without losing progress.
        </p>
        <button
          onClick={() => {
            setLoading(true);
            setError(false);
            getRecommendations(session)
              .then(setOutcome)
              .catch(() => setError(true))
              .finally(() => setLoading(false));
          }}
          className="px-6 py-3 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!outcome) return null;

  const { archetype, results } = outcome;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Personality card — the hero of the results */}
      <PersonalityCard archetype={archetype} dimensions={outcome.dimensions} />

      {/* Results list */}
      <div className="mt-10">
        <h3 className="text-xl font-bold mb-1">Your Recommended Fragrances</h3>
        <p className="text-sm text-gray-500 mb-6">
          Curated for your {archetype.name} personality — refresh for new picks
        </p>

        {results.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <p className="text-gray-600 mb-4">
              No fragrances found matching your profile yet.
            </p>
            <Link
              href="/products"
              className="inline-block px-6 py-3 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Browse All Fragrances
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {results.map((result, index) => (
              <Link
                key={result.productId}
                href={`/products/${result.handle}`}
                className="group flex gap-4 p-4 rounded-xl border border-gray-200 bg-white hover:border-gray-400 hover:shadow-md transition-all duration-200"
              >
                {/* Rank badge */}
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-500 group-hover:bg-black group-hover:text-white transition-colors">
                  {index + 1}
                </div>

                {/* Image */}
                {result.thumbnail && (
                  <img
                    src={result.thumbnail}
                    alt={result.title}
                    className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg flex-shrink-0"
                  />
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs text-gray-400 uppercase tracking-wide">
                        {result.brand}
                      </p>
                      <p className="font-semibold text-sm md:text-base truncate">
                        {result.title}
                      </p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                          result.matchScore >= 75
                            ? "bg-emerald-100 text-emerald-800"
                            : result.matchScore >= 50
                            ? "bg-amber-100 text-amber-800"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {result.matchScore}%
                      </span>
                    </div>
                  </div>

                  {/* Explanation */}
                  <p className="text-xs md:text-sm text-gray-500 mt-1 line-clamp-2">
                    {result.explanation}
                  </p>

                  {/* Meta row */}
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                      {result.family}
                    </span>
                    {result.topAccords.slice(0, 2).map((accord) => (
                      <span
                        key={accord}
                        className="text-xs px-2 py-0.5 rounded-full bg-gray-50 text-gray-500"
                      >
                        {accord}
                      </span>
                    ))}
                    {result.price > 0 && (
                      <span className="text-xs text-gray-400 ml-auto">
                        {formatPrice(result.price)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="mt-10 space-y-3">
        <button
          onClick={() => {
            setLoading(true);
            getRecommendations(session)
              .then(setOutcome)
              .catch(() => setError(true))
              .finally(() => setLoading(false));
          }}
          className="w-full py-3 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Refresh Recommendations
        </button>
        <button
          onClick={onRetake}
          className="w-full py-3 rounded-lg text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          Retake Quiz
        </button>
      </div>
    </div>
  );
}
