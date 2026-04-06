import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scent Personality Quiz — Find Your Fragrance | ScentScape",
  description:
    "Take our free 2-minute personality quiz to discover your scent identity. Answer 10 questions and get personalized fragrance recommendations matched to who you are.",
  openGraph: {
    title: "Scent Personality Quiz — Find Your Fragrance | ScentScape",
    description:
      "Discover your scent personality in 2 minutes. Get personalized fragrance recommendations based on your lifestyle and preferences.",
  },
};

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
