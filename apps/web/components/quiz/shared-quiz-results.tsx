"use client";

import type { Archetype, PersonalityDimensions, QuizResult } from "@/lib/quiz/types";
import { Badge } from "@/components/ui";
import { PersonalityCard } from "./personality-card";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils/format";

interface SharedQuizResultsProps {
  archetype: Archetype;
  dimensions: PersonalityDimensions;
  results: QuizResult[];
  createdAt: string;
}

export function SharedQuizResults({
  archetype,
  dimensions,
  results,
  createdAt,
}: SharedQuizResultsProps) {
  return (
    <div className="min-h-[100dvh] bg-surface-elevated">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Attribution banner */}
        <div className="mb-6 p-4 bg-surface-subtle rounded-xl text-center">
          <p className="text-sm text-text-muted">
            Someone shared their ScentScape quiz results with you
          </p>
          <p className="text-xs text-text-muted mt-1">
            Taken on{" "}
            {new Date(createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Personality card */}
        <PersonalityCard archetype={archetype} dimensions={dimensions} />

        {/* Results list */}
        <div className="mt-10">
          <h3 className="text-xl font-display font-bold mb-1">
            Recommended Fragrances
          </h3>
          <p className="text-sm text-text-muted mb-6">
            Curated for the {archetype.name} personality
          </p>

          {results.length > 0 && (
            <div className="space-y-4">
              {results.map((result, index) => (
                <Link
                  key={result.productId}
                  href={`/products/${result.handle}`}
                  className="group flex gap-4 p-4 rounded-xl border border-border-default bg-surface-elevated hover:border-border-strong hover:shadow-card-hover active:scale-[0.99] transition-all duration-200"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-surface-subtle flex items-center justify-center text-sm font-bold text-text-muted group-hover:bg-text-primary group-hover:text-text-inverse transition-colors">
                    {index + 1}
                  </div>

                  {result.thumbnail && (
                    <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src={result.thumbnail}
                        alt={result.title}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-xs text-text-muted uppercase tracking-wide">
                          {result.brand}
                        </p>
                        <p className="font-semibold text-sm md:text-base truncate">
                          {result.title}
                        </p>
                      </div>
                      <span
                        className={`flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-semibold ${
                          result.matchScore >= 75
                            ? "bg-emerald-100 text-emerald-800"
                            : result.matchScore >= 50
                            ? "bg-amber-100 text-amber-800"
                            : "bg-surface-subtle text-text-secondary"
                        }`}
                      >
                        {result.matchScore}%
                      </span>
                    </div>

                    <p className="text-xs md:text-sm text-text-muted mt-1 line-clamp-2">
                      {result.explanation}
                    </p>

                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      {result.feedback && (
                        <span
                          className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${
                            result.feedback === "love"
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                              : "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300"
                          }`}
                        >
                          {result.feedback === "love" ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                              <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.723.723 0 01-.692 0h-.002z" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                            </svg>
                          )}
                          {result.feedback === "love" ? "Loved" : "Passed"}
                        </span>
                      )}
                      <Badge size="sm">{result.family}</Badge>
                      {result.topAccords.slice(0, 2).map((accord) => (
                        <Badge key={accord} size="sm">{accord}</Badge>
                      ))}
                      {result.price > 0 && (
                        <span className="text-xs text-text-muted ml-auto">
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

        {/* CTA to take own quiz */}
        <div className="mt-10 p-6 bg-gradient-to-br from-accent-primary/5 to-accent-secondary/5 rounded-xl border border-border-default text-center">
          <h4 className="font-display font-semibold text-lg text-text-primary mb-2">
            Discover your own scent personality
          </h4>
          <p className="text-sm text-text-muted mb-4">
            Take the 2-minute quiz to find fragrances matched to your unique taste.
          </p>
          <Link
            href="/quiz"
            className="inline-block px-6 py-3 bg-accent-primary text-text-inverse rounded-lg text-sm font-medium hover:bg-accent-primary-hover transition-colors"
          >
            Take the Quiz — Free
          </Link>
        </div>
      </div>
    </div>
  );
}
