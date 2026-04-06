import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSharedQuizSession } from "@/lib/quiz/api";
import { getArchetypeById } from "@/lib/quiz/personality";
import { SharedQuizResults } from "@/components/quiz/shared-quiz-results";

export const revalidate = 300;

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const session = await getSharedQuizSession(id);
  if (!session) return { title: "Quiz Results Not Found — ScentScape" };

  const archetype = getArchetypeById(session.archetype_id);
  const name = archetype?.name ?? "Scent Personality";

  return {
    title: `${name} — My Scent Personality | ScentScape`,
    description: archetype?.description?.slice(0, 155) ?? `See my personalized fragrance recommendations from ScentScape's personality quiz.`,
    openGraph: {
      title: `I'm a ${name}! — ScentScape Quiz Results`,
      description: archetype?.tagline ?? "Discover your scent personality",
    },
  };
}

export default async function SharedResultsPage({ params }: Props) {
  const { id } = await params;
  const session = await getSharedQuizSession(id);

  if (!session) notFound();

  const archetype = getArchetypeById(session.archetype_id);
  if (!archetype) notFound();

  return (
    <SharedQuizResults
      archetype={archetype}
      dimensions={session.dimensions}
      results={session.results}
      createdAt={session.created_at}
    />
  );
}
