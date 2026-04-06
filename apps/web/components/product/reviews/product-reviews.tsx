"use client";

import { useState, useCallback } from "react";
import { StarRating } from "./star-rating";
import { Button } from "@/components/ui";
import { useToast } from "@/components/ui";
import { submitReview, type ReviewData } from "@/lib/reviews/actions";

interface ProductReviewsProps {
  productId: string;
  initialReviews: ReviewData[];
  initialAverageRating: number;
  initialReviewCount: number;
  initialDistribution: Record<number, number>;
  isAuthenticated: boolean;
}

function StarInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1" role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          role="radio"
          aria-checked={value === star}
          aria-label={`${star} star${star > 1 ? "s" : ""}`}
          className="p-0.5 transition-transform hover:scale-110 active:scale-95"
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(star)}
        >
          <svg
            className={`w-8 h-8 ${(hover || value) >= star ? "text-accent-primary" : "text-border-default"}`}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  );
}

function ReviewForm({ productId, onSubmitted }: { productId: string; onSubmitted: (review: ReviewData) => void }) {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast("Please select a star rating.", "error");
      return;
    }

    setSubmitting(true);
    const result = await submitReview({
      product_id: productId,
      rating,
      title: title.trim() || undefined,
      body: body.trim() || undefined,
    });
    setSubmitting(false);

    if (result.success) {
      toast("Review submitted! Thank you for your feedback.", "success");
      onSubmitted(result.review);
      setRating(0);
      setTitle("");
      setBody("");
    } else {
      toast(result.error, "error");
    }
  }, [productId, rating, title, body, toast, onSubmitted]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">Your Rating</label>
        <StarInput value={rating} onChange={setRating} />
      </div>
      <div>
        <label htmlFor="review-title" className="block text-sm font-medium text-text-primary mb-1.5">
          Title <span className="text-text-muted font-normal">(optional)</span>
        </label>
        <input
          id="review-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={200}
          placeholder="Summarize your experience"
          className="w-full px-4 py-2.5 border border-border-default rounded-lg bg-surface-elevated text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-border-focus focus:border-border-focus transition-colors"
        />
      </div>
      <div>
        <label htmlFor="review-body" className="block text-sm font-medium text-text-primary mb-1.5">
          Review <span className="text-text-muted font-normal">(optional)</span>
        </label>
        <textarea
          id="review-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          maxLength={2000}
          rows={4}
          placeholder="What did you think of this fragrance?"
          className="w-full px-4 py-2.5 border border-border-default rounded-lg bg-surface-elevated text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-border-focus focus:border-border-focus transition-colors resize-y"
        />
      </div>
      <Button type="submit" loading={submitting} loadingText="Submitting...">
        Submit Review
      </Button>
    </form>
  );
}

function RatingBar({ stars, count, total }: { stars: number; count: number; total: number }) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="w-6 text-right text-text-muted">{stars}</span>
      <svg className="w-4 h-4 text-accent-primary shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      <div className="flex-1 h-2 bg-surface-subtle rounded-full overflow-hidden">
        <div
          className="h-full bg-accent-primary rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-8 text-text-muted">{count}</span>
    </div>
  );
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export function ProductReviews({
  productId,
  initialReviews,
  initialAverageRating,
  initialReviewCount,
  initialDistribution,
  isAuthenticated,
}: ProductReviewsProps) {
  const [reviews, setReviews] = useState(initialReviews);
  const [averageRating, setAverageRating] = useState(initialAverageRating);
  const [reviewCount, setReviewCount] = useState(initialReviewCount);
  const [distribution, setDistribution] = useState(initialDistribution);
  const [showForm, setShowForm] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const handleReviewSubmitted = useCallback((review: ReviewData) => {
    setReviews((prev) => [review, ...prev]);
    const newCount = reviewCount + 1;
    const newTotal = averageRating * reviewCount + review.rating;
    setAverageRating(Math.round((newTotal / newCount) * 10) / 10);
    setReviewCount(newCount);
    setDistribution((prev) => ({
      ...prev,
      [review.rating]: (prev[review.rating] || 0) + 1,
    }));
    setShowForm(false);
  }, [reviewCount, averageRating]);

  const displayedReviews = showAll ? reviews : reviews.slice(0, 5);

  return (
    <section className="mt-12 pt-8 border-t border-border-default" aria-labelledby="reviews-heading">
      <h2 id="reviews-heading" className="text-2xl font-bold font-display mb-6">
        Customer Reviews
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Summary */}
        <div className="text-center md:text-left">
          <div className="text-4xl font-bold text-text-primary mb-1">
            {reviewCount > 0 ? averageRating.toFixed(1) : "—"}
          </div>
          <StarRating rating={averageRating} size="md" />
          <p className="text-sm text-text-muted mt-1">
            {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
          </p>
        </div>

        {/* Distribution */}
        <div className="md:col-span-2 space-y-1.5">
          {[5, 4, 3, 2, 1].map((stars) => (
            <RatingBar
              key={stars}
              stars={stars}
              count={distribution[stars] || 0}
              total={reviewCount}
            />
          ))}
        </div>
      </div>

      {/* Write a review CTA */}
      {!showForm && (
        <div className="mb-8">
          {isAuthenticated ? (
            <Button variant="secondary" onClick={() => setShowForm(true)}>
              Write a Review
            </Button>
          ) : (
            <p className="text-sm text-text-muted">
              <a href="/login" className="text-accent-primary hover:underline">Sign in</a> to leave a review.
            </p>
          )}
        </div>
      )}

      {/* Review form */}
      {showForm && (
        <div className="mb-8 p-6 bg-surface-subtle rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-text-primary">Write Your Review</h3>
            <button
              onClick={() => setShowForm(false)}
              className="text-text-muted hover:text-text-primary transition-colors text-sm"
            >
              Cancel
            </button>
          </div>
          <ReviewForm productId={productId} onSubmitted={handleReviewSubmitted} />
        </div>
      )}

      {/* Review list */}
      {reviews.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-text-muted mb-2">No reviews yet.</p>
          <p className="text-sm text-text-muted">Be the first to share your thoughts on this fragrance.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {displayedReviews.map((review) => (
            <article key={review.id} className="pb-6 border-b border-border-subtle last:border-0">
              <div className="flex items-center gap-3 mb-2">
                <StarRating rating={review.rating} size="sm" />
                <span className="text-xs text-text-muted">{formatDate(review.created_at)}</span>
              </div>
              {review.title && (
                <h4 className="font-medium text-text-primary mb-1">{review.title}</h4>
              )}
              {review.body && (
                <p className="text-sm text-text-secondary leading-relaxed">{review.body}</p>
              )}
            </article>
          ))}
        </div>
      )}

      {reviews.length > 5 && !showAll && (
        <div className="mt-6 text-center">
          <Button variant="ghost" onClick={() => setShowAll(true)}>
            Show All {reviews.length} Reviews
          </Button>
        </div>
      )}
    </section>
  );
}
