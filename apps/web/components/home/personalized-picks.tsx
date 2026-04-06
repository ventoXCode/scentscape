"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/product/product-card";
import { ScrollReveal } from "@/components/home/scroll-reveal";
import { getRecommendations } from "@/lib/quiz/recommendation-engine";
import type { QuizSession, QuizResult, Archetype } from "@/lib/quiz/types";

const STORAGE_KEY = "scentscape-quiz-session";

function getCompletedSession(): QuizSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw);
    // Verify quiz was meaningfully completed
    if (
      !session?.familyAffinities ||
      Object.keys(session.familyAffinities).length === 0
    )
      return null;
    return session as QuizSession;
  } catch {
    return null;
  }
}

interface PersonalizedState {
  archetype: Archetype;
  picks: QuizResult[];
}

export function PersonalizedPicks() {
  const [data, setData] = useState<PersonalizedState | null>(null);

  useEffect(() => {
    const session = getCompletedSession();
    if (!session) return;

    getRecommendations(session)
      .then((outcome) => {
        if (outcome.results.length > 0) {
          setData({
            archetype: outcome.archetype,
            picks: outcome.results.slice(0, 4),
          });
        }
      })
      .catch(() => {
        // Meilisearch unavailable — silently skip personalization
      });
  }, []);

  if (!data) return null;

  return (
    <ScrollReveal>
      <section className="py-section-sm md:py-section bg-surface-primary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-accent-primary font-medium text-sm uppercase tracking-wide mb-2">
              Picked for You
            </p>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary mb-2">
              Because You&apos;re a {data.archetype.name}
            </h2>
            <p className="text-text-secondary max-w-lg mx-auto">
              Fresh recommendations based on your scent personality — refreshed
              every visit.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {data.picks.map((pick) => (
              <ProductCard
                key={pick.handle}
                product={{
                  id: pick.productId,
                  handle: pick.handle,
                  title: pick.title,
                  thumbnail: pick.thumbnail,
                  brand: pick.brand,
                  family: pick.family,
                  variants:
                    pick.price != null
                      ? [
                          {
                            prices: [
                              { amount: pick.price, currency_code: "usd" },
                            ],
                          },
                        ]
                      : [],
                }}
              />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/quiz"
              className="text-text-secondary hover:text-text-primary font-medium transition-colors"
            >
              Retake the quiz for new results &rarr;
            </Link>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
