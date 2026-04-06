export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { getCustomer, getAuthToken } from "@/lib/medusa/auth-actions";
import { getMyQuizSessions } from "@/lib/quiz/api";
import { getArchetypeById } from "@/lib/quiz/personality";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scent Profile — ScentScape",
};

export default async function ScentProfilePage() {
  const customer = await getCustomer();
  if (!customer) redirect("/login");

  const token = await getAuthToken();
  const sessions = token ? await getMyQuizSessions(token) : [];

  const latestSession = sessions[0] ?? null;
  const latestArchetype = latestSession
    ? getArchetypeById(latestSession.archetype_id)
    : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/account"
          className="text-text-muted hover:text-text-secondary transition-colors"
        >
          Account
        </Link>
        <span className="text-text-muted">/</span>
        <h1 className="font-display text-2xl font-bold text-text-primary">
          Scent Profile
        </h1>
      </div>

      {latestArchetype && latestSession ? (
        <div className="space-y-8">
          {/* Current personality */}
          <div
            className={`rounded-2xl bg-gradient-to-br ${latestArchetype.gradient} p-8 shadow-elevated`}
          >
            <div className={latestArchetype.textColor}>
              <p className="text-sm font-medium opacity-75 mb-1">
                Your Scent Personality
              </p>
              <h2 className="text-3xl font-display font-bold mb-2">
                {latestArchetype.name}
              </h2>
              <p className="text-sm opacity-80 max-w-lg">
                {latestArchetype.tagline}
              </p>
              <p className="mt-4 text-sm opacity-70 leading-relaxed max-w-lg">
                {latestArchetype.description}
              </p>
            </div>
          </div>

          {/* Quiz history */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4 text-text-primary">
              Quiz History
            </h3>
            <div className="space-y-3">
              {sessions.map((s) => {
                const arch = getArchetypeById(s.archetype_id);
                return (
                  <div
                    key={s.id}
                    className="flex items-center justify-between p-4 rounded-xl border border-border-default bg-surface-elevated"
                  >
                    <div>
                      <p className="font-medium text-text-primary">
                        {arch?.name ?? "Unknown Archetype"}
                      </p>
                      <p className="text-sm text-text-muted">
                        {new Date(s.created_at).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                        {" · "}
                        {s.results.length} recommendations
                      </p>
                    </div>
                    <Link
                      href={`/quiz/results/${s.share_id}`}
                      className="text-sm text-accent-primary hover:text-accent-primary-hover font-medium transition-colors"
                    >
                      View Results →
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Retake CTA */}
          <div className="text-center pt-4">
            <Link
              href="/quiz"
              className="inline-block px-6 py-3 border border-border-default rounded-lg text-sm font-medium text-text-secondary hover:border-border-strong hover:bg-surface-subtle transition-all"
            >
              Retake Quiz
            </Link>
          </div>
        </div>
      ) : (
        /* Empty state */
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-surface-subtle flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8 text-text-muted"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </div>
          <h2 className="font-display text-xl font-bold mb-2 text-text-primary">
            No scent profile yet
          </h2>
          <p className="text-text-muted mb-6 max-w-sm mx-auto">
            Take our 2-minute personality quiz to discover your scent archetype
            and get personalized recommendations.
          </p>
          <Link
            href="/quiz"
            className="inline-block px-6 py-3 bg-accent-primary text-text-inverse rounded-lg text-sm font-medium hover:bg-accent-primary-hover transition-colors"
          >
            Take the Quiz — Free
          </Link>
        </div>
      )}
    </div>
  );
}
