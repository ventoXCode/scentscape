"use client";

import { useEffect, useState } from "react";
import type { QuizSession, QuizOutcome } from "@/lib/quiz/types";
import { getRecommendations } from "@/lib/quiz/recommendation-engine";
import { PersonalityCard } from "./personality-card";
import { QuizLoading } from "./quiz-loading";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils/format";
import { AffiliateLinks } from "@/components/product/affiliate-links";

interface QuizResultsProps {
  session: QuizSession;
  onRetake: () => void;
}

export function QuizResults({ session, onRetake }: QuizResultsProps) {
  const [outcome, setOutcome] = useState<QuizOutcome | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchResults = () => {
    setLoading(true);
    setError(false);
    getRecommendations(session)
      .then(setOutcome)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    let cancelled = false;

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
        <p className="text-text-secondary mb-2">Something went wrong loading your results.</p>
        <p className="text-sm text-text-muted mb-6">
          Your answers are saved — try again without losing progress.
        </p>
        <button
          onClick={fetchResults}
          className="px-6 py-3 bg-text-primary text-text-inverse rounded-lg text-sm font-medium hover:bg-text-secondary transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!outcome) return null;

  const { archetype, results } = outcome;

  return (
    <>
      <div className="max-w-2xl mx-auto px-4 py-8 pb-36 md:pb-8">
        {/* Personality card — the hero of the results */}
        <PersonalityCard archetype={archetype} dimensions={outcome.dimensions} />

        {/* Results list */}
        <div className="mt-10">
          <h3 className="text-xl font-display font-bold mb-1">Your Recommended Fragrances</h3>
          <p className="text-sm text-text-muted mb-6">
            Curated for your {archetype.name} personality — refresh for new picks
          </p>

          {results.length === 0 ? (
            <div className="text-center py-12 bg-surface-subtle rounded-xl">
              <p className="text-text-secondary mb-4">
                No fragrances found matching your profile yet.
              </p>
              <Link
                href="/products"
                className="inline-block px-6 py-3 bg-text-primary text-text-inverse rounded-lg text-sm font-medium hover:bg-text-secondary transition-colors"
              >
                Browse All Fragrances
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {results.map((result, index) => (
                <div key={result.productId} className="space-y-2">
                <Link
                  href={`/products/${result.handle}`}
                  className="group flex gap-4 p-4 rounded-xl border border-border-default bg-surface-elevated hover:border-border-strong hover:shadow-card-hover active:scale-[0.99] transition-all duration-200"
                >
                  {/* Rank badge */}
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-surface-subtle flex items-center justify-center text-sm font-bold text-text-muted group-hover:bg-text-primary group-hover:text-text-inverse transition-colors">
                    {index + 1}
                  </div>

                  {/* Image */}
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

                  {/* Content */}
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
                      <div className="flex-shrink-0 text-right">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
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
                    </div>

                    {/* Explanation */}
                    <p className="text-xs md:text-sm text-text-muted mt-1 line-clamp-2">
                      {result.explanation}
                    </p>

                    {/* Meta row */}
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-surface-subtle text-text-secondary">
                        {result.family}
                      </span>
                      {result.topAccords.slice(0, 2).map((accord) => (
                        <span
                          key={accord}
                          className="text-xs px-2 py-0.5 rounded-full bg-surface-subtle text-text-muted"
                        >
                          {accord}
                        </span>
                      ))}
                      {result.price > 0 && (
                        <span className="text-xs text-text-muted ml-auto">
                          {formatPrice(result.price)}
                        </span>
                      )}
                    </div>

                    {/* Explore similar */}
                    <Link
                      href={`/search?family=${encodeURIComponent(result.family)}${result.topAccords[0] ? `&accords=${encodeURIComponent(result.topAccords[0])}` : ""}`}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-block mt-2 text-xs text-accent-primary hover:text-accent-primary-hover font-medium transition-colors"
                    >
                      Explore more like this →
                    </Link>
                  </div>
                </Link>
                <div className="pl-12 md:pl-14">
                  <AffiliateLinks handle={result.handle} productTitle={result.title} compact />
                </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Shop your profile CTA */}
        {results.length > 0 && (
          <div className="mt-10 p-5 bg-gradient-to-br from-accent-primary/5 to-accent-secondary/5 rounded-xl border border-border-default">
            <h4 className="font-display font-semibold text-text-primary mb-1">
              Shop your scent profile
            </h4>
            <p className="text-sm text-text-muted mb-4">
              Browse our full catalog filtered to match your {archetype.name} personality.
            </p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(archetype.familyAffinities)
                .filter(([, score]) => score >= 0.6)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 3)
                .map(([family]) => (
                  <Link
                    key={family}
                    href={`/search?family=${encodeURIComponent(family)}`}
                    className="px-4 py-2 bg-accent-primary text-text-inverse rounded-lg text-sm font-medium hover:bg-accent-primary-hover transition-colors"
                  >
                    Browse {family}
                  </Link>
                ))}
              <Link
                href="/products"
                className="px-4 py-2 bg-surface-elevated border border-border-default rounded-lg text-sm font-medium text-text-secondary hover:border-border-strong transition-colors"
              >
                Browse All
              </Link>
            </div>
          </div>
        )}

        {/* Educational links based on results */}
        <div className="mt-10 p-5 bg-surface-subtle rounded-xl">
          <h4 className="font-semibold text-text-primary mb-2">
            Explore your scent profile
          </h4>
          <p className="text-sm text-text-muted mb-3">
            As a {archetype.name}, you gravitate toward certain fragrance families and notes.
            Learn more about what makes your favorites tick.
          </p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(archetype.familyAffinities)
              .filter(([, score]) => score >= 0.6)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 3)
              .map(([family]) => (
                <Link
                  key={family}
                  href={`/learn/families/${family.toLowerCase()}`}
                  className="px-3 py-1.5 bg-surface-elevated border border-border-default rounded-full text-sm text-text-secondary hover:border-border-strong hover:text-text-primary transition-colors"
                >
                  {family} family
                </Link>
              ))}
            <Link
              href="/learn/notes"
              className="px-3 py-1.5 bg-surface-elevated border border-border-default rounded-full text-sm text-text-secondary hover:border-border-strong hover:text-text-primary transition-colors"
            >
              Fragrance notes guide
            </Link>
            <Link
              href="/learn/fragrance-101"
              className="px-3 py-1.5 bg-surface-elevated border border-border-default rounded-full text-sm text-text-secondary hover:border-border-strong hover:text-text-primary transition-colors"
            >
              Fragrance 101
            </Link>
          </div>
        </div>

        {/* Desktop-only inline actions */}
        <div className="hidden md:block mt-10 space-y-3">
          <button
            onClick={fetchResults}
            className="w-full py-3 rounded-lg border border-border-default text-sm font-medium text-text-secondary hover:bg-surface-subtle transition-colors"
          >
            Refresh Recommendations
          </button>
          <button
            onClick={onRetake}
            className="w-full py-3 rounded-lg text-sm text-text-muted hover:text-text-secondary transition-colors"
          >
            Retake Quiz
          </button>
        </div>
      </div>

      {/* Mobile: sticky bottom CTA bar */}
      <div className="fixed bottom-0 inset-x-0 md:hidden bg-surface-elevated/95 backdrop-blur-sm border-t border-border-default pb-[env(safe-area-inset-bottom)] px-4 pt-3 pb-3 z-40">
        <div className="flex gap-3 max-w-2xl mx-auto">
          <button
            onClick={fetchResults}
            className="flex-1 min-h-[2.75rem] py-2.5 rounded-lg border border-border-default text-sm font-medium text-text-secondary active:scale-[0.97] transition-all"
          >
            Refresh
          </button>
          <button
            onClick={onRetake}
            className="min-h-[2.75rem] px-5 py-2.5 rounded-lg text-sm text-text-muted active:scale-[0.97] transition-all"
          >
            Retake
          </button>
        </div>
      </div>
    </>
  );
}
