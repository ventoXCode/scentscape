"use client";

import { useEffect, useState, useCallback } from "react";
import type { QuizSession, QuizOutcome, RecommendationFeedback } from "@/lib/quiz/types";
import { getRecommendations } from "@/lib/quiz/recommendation-engine";
import { saveQuizSession, updateQuizSessionFeedback } from "@/lib/quiz/api";
import { PersonalityCard } from "./personality-card";
import { QuizLoading } from "./quiz-loading";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils/format";
import { AffiliateLinks } from "@/components/product/affiliate-links";
import { SampleBoxCta } from "@/components/samples/sample-box-cta";
import { SampleBoxButton } from "@/components/samples/sample-box-button";

interface QuizResultsProps {
  session: QuizSession;
  onRetake: () => void;
}

export function QuizResults({ session, onRetake }: QuizResultsProps) {
  const [outcome, setOutcome] = useState<QuizOutcome | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [shareId, setShareId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [feedbackMap, setFeedbackMap] = useState<Record<string, RecommendationFeedback>>({});

  const fetchResults = () => {
    setLoading(true);
    setError(false);
    setShareId(null);
    getRecommendations(session)
      .then(setOutcome)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  const handleFeedback = useCallback(
    (productId: string, feedback: RecommendationFeedback) => {
      setFeedbackMap((prev) => {
        const next = { ...prev };
        // Toggle off if same feedback clicked again
        if (next[productId] === feedback) {
          delete next[productId];
        } else {
          next[productId] = feedback;
        }
        // If session already saved, persist feedback to backend
        if (shareId && outcome) {
          const resultsWithFeedback = outcome.results.map((r) => ({
            ...r,
            feedback: next[r.productId] as RecommendationFeedback | undefined,
          }));
          updateQuizSessionFeedback(shareId, resultsWithFeedback);
        }
        return next;
      });
    },
    [shareId, outcome]
  );

  const handleSaveAndShare = useCallback(async () => {
    if (!outcome || saving) return;
    setSaving(true);
    // Embed current feedback into results before saving
    const outcomeWithFeedback = {
      ...outcome,
      results: outcome.results.map((r) => ({
        ...r,
        feedback: feedbackMap[r.productId] as RecommendationFeedback | undefined,
      })),
    };
    const result = await saveQuizSession(session, outcomeWithFeedback);
    setSaving(false);
    if (result) {
      setShareId(result.shareId);
    }
  }, [session, outcome, saving, feedbackMap]);

  const handleCopyLink = useCallback(async () => {
    if (!shareId) return;
    const url = `${window.location.origin}/quiz/results/${shareId}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [shareId]);

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

        {/* Save & share */}
        <div className="mt-6 flex items-center gap-3">
          {!shareId ? (
            <button
              onClick={handleSaveAndShare}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border-default text-sm font-medium text-text-secondary hover:border-border-strong hover:bg-surface-subtle active:scale-[0.97] transition-all disabled:opacity-50"
            >
              {saving ? (
                <>
                  <span className="w-4 h-4 border-2 border-text-muted border-t-transparent rounded-full animate-spin" />
                  Saving…
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path d="M13 4.5a2.5 2.5 0 11.702 1.737L6.97 9.604a2.518 2.518 0 010 .792l6.733 3.367a2.5 2.5 0 11-.671 1.341l-6.733-3.367a2.5 2.5 0 110-3.474l6.733-3.367A2.52 2.52 0 0113 4.5z" />
                  </svg>
                  Save &amp; Share Results
                </>
              )}
            </button>
          ) : (
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-accent-primary text-text-inverse text-sm font-medium hover:bg-accent-primary-hover active:scale-[0.97] transition-all"
              >
                {copied ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                    Link Copied!
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z" />
                      <path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z" />
                    </svg>
                    Copy Share Link
                  </>
                )}
              </button>
              <span className="text-xs text-text-muted">Results saved!</span>
            </div>
          )}
        </div>

        {/* Results list */}
        <div className="mt-10">
          <h3 className="text-xl font-display font-bold mb-1">Your Recommended Fragrances</h3>
          <p className="text-sm text-text-muted mb-6">
            Curated for your {archetype.name} personality — refresh for new picks
          </p>

          {results.length === 0 ? (
            <div className="text-center py-12 bg-surface-subtle rounded-xl px-6">
              <p className="text-3xl mb-3" aria-hidden="true">🔮</p>
              <p className="text-text-secondary font-medium mb-2">
                No fragrances found matching your profile yet.
              </p>
              <p className="text-text-muted text-sm mb-6">
                Our catalog is growing — in the meantime, explore by mood or browse our collections.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/moods"
                  className="px-5 py-2.5 bg-accent-primary text-text-inverse rounded-lg text-sm font-medium hover:bg-accent-primary-hover transition-colors"
                >
                  Browse by Mood
                </Link>
                <Link
                  href="/products"
                  className="px-5 py-2.5 bg-text-primary text-text-inverse rounded-lg text-sm font-medium hover:bg-text-secondary transition-colors"
                >
                  Browse All Fragrances
                </Link>
                <Link href="/learn/fragrance-101" className="text-sm text-text-secondary hover:text-text-primary transition-colors underline">
                  Learn About Fragrance
                </Link>
              </div>
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
                <div className="pl-12 md:pl-14 flex flex-wrap items-center gap-2">
                  {/* Recommendation feedback */}
                  <div className="flex items-center gap-1.5 mr-auto">
                    <button
                      onClick={() => handleFeedback(result.productId, "love")}
                      aria-label={`Love ${result.title}`}
                      aria-pressed={feedbackMap[result.productId] === "love"}
                      className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium transition-all active:scale-[0.95] ${
                        feedbackMap[result.productId] === "love"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                          : "bg-surface-subtle text-text-muted hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                        <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.723.723 0 01-.692 0h-.002z" />
                      </svg>
                      Love this
                    </button>
                    <button
                      onClick={() => handleFeedback(result.productId, "not_for_me")}
                      aria-label={`Not for me: ${result.title}`}
                      aria-pressed={feedbackMap[result.productId] === "not_for_me"}
                      className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium transition-all active:scale-[0.95] ${
                        feedbackMap[result.productId] === "not_for_me"
                          ? "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300"
                          : "bg-surface-subtle text-text-muted hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20"
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                      </svg>
                      Not for me
                    </button>
                  </div>
                  <AffiliateLinks handle={result.handle} productTitle={result.title} compact />
                  <SampleBoxButton
                    product={{
                      id: result.productId,
                      handle: result.handle,
                      title: result.title,
                      brand: result.brand,
                      thumbnail: result.thumbnail,
                      family: result.family,
                    }}
                    variant="compact"
                  />
                </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sample box CTA — try before you buy */}
        {results.length > 0 && (
          <SampleBoxCta
            products={results.slice(0, 5).map((r) => ({
              id: r.productId,
              handle: r.handle,
              title: r.title,
              brand: r.brand,
              thumbnail: r.thumbnail,
              family: r.family,
            }))}
          />
        )}

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
