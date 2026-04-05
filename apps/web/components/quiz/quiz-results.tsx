"use client";

import { useEffect, useState } from "react";
import { QuizAnswers, QuizResult } from "@/lib/quiz/types";
import { getRecommendations } from "@/lib/quiz/recommendation-engine";
import Link from "next/link";

interface QuizResultsProps {
  answers: QuizAnswers;
  onRetake: () => void;
}

export function QuizResults({ answers, onRetake }: QuizResultsProps) {
  const [results, setResults] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    getRecommendations(answers)
      .then((recs) => {
        setResults(recs);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [answers]);

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600 mb-4">Something went wrong loading recommendations.</p>
        <button onClick={onRetake} className="px-6 py-3 border rounded hover:bg-gray-50">
          Try Again
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="animate-spin w-8 h-8 border-2 border-black border-t-transparent rounded-full mx-auto mb-4" />
        <p>Finding your perfect matches...</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Your Scent Matches</h2>
      <p className="text-gray-600 mb-8">
        Based on your preferences, we think you&apos;ll love these
      </p>

      <div className="space-y-4 mb-8">
        {results.map((result) => (
          <Link
            key={result.productId}
            href={`/products/${result.handle}`}
            className="flex gap-4 p-4 bg-white rounded-lg border hover:border-black transition-colors"
          >
            {result.thumbnail && (
              <img
                src={result.thumbnail}
                alt={result.title}
                className="w-20 h-20 object-cover rounded"
              />
            )}
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">{result.brand}</p>
                  <p className="font-semibold">{result.title}</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-medium">
                    {result.matchScore}% match
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {result.matchReasons.slice(0, 2).join(" • ")}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <button
        onClick={onRetake}
        className="w-full py-3 border rounded hover:bg-gray-50"
      >
        Retake Quiz
      </button>
    </div>
  );
}
