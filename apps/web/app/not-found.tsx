import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | ScentScape",
  description: "The page you're looking for doesn't exist. Discover your signature fragrance with our personality quiz.",
};

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="text-6xl font-display font-bold text-accent-primary mb-4">
          404
        </p>
        <h1 className="font-display text-2xl font-bold text-text-primary mb-2">
          Page Not Found
        </h1>
        <p className="text-text-secondary mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
          Let&apos;s get you back on the scent trail.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <Link
            href="/quiz"
            className="px-6 py-3 bg-accent-primary text-white rounded-lg font-medium hover:bg-accent-primary-hover transition-colors"
          >
            Take the Quiz
          </Link>
          <Link
            href="/products"
            className="px-6 py-3 border border-border-default rounded-lg font-medium text-text-primary hover:bg-surface-subtle transition-colors"
          >
            Browse Fragrances
          </Link>
        </div>

        <div className="border-t border-border-default pt-6">
          <p className="text-sm text-text-muted mb-3">Or try one of these:</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/" className="text-sm text-text-secondary hover:text-text-primary underline">
              Home
            </Link>
            <Link href="/explore" className="text-sm text-text-secondary hover:text-text-primary underline">
              Fragrance Wheel
            </Link>
            <Link href="/moods" className="text-sm text-text-secondary hover:text-text-primary underline">
              Browse by Mood
            </Link>
            <Link href="/collections" className="text-sm text-text-secondary hover:text-text-primary underline">
              Collections
            </Link>
            <Link href="/learn" className="text-sm text-text-secondary hover:text-text-primary underline">
              Learn About Fragrance
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
