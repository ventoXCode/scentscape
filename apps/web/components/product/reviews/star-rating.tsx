interface StarRatingProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

function StarIcon({ filled, partial, className }: { filled: boolean; partial?: number; className: string }) {
  const id = `star-${Math.random().toString(36).slice(2, 8)}`;

  if (partial != null && partial > 0 && partial < 1) {
    return (
      <svg className={className} viewBox="0 0 20 20" aria-hidden="true">
        <defs>
          <linearGradient id={id}>
            <stop offset={`${partial * 100}%`} stopColor="currentColor" className="text-accent-primary" />
            <stop offset={`${partial * 100}%`} stopColor="currentColor" className="text-border-default" />
          </linearGradient>
        </defs>
        <path
          fill={`url(#${id})`}
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
        />
      </svg>
    );
  }

  return (
    <svg className={`${className} ${filled ? "text-accent-primary" : "text-border-default"}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

export function StarRating({ rating, size = "md", showValue = false }: StarRatingProps) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<StarIcon key={i} filled className={sizeClasses[size]} />);
    } else if (rating > i - 1) {
      stars.push(<StarIcon key={i} filled={false} partial={rating - (i - 1)} className={sizeClasses[size]} />);
    } else {
      stars.push(<StarIcon key={i} filled={false} className={sizeClasses[size]} />);
    }
  }

  return (
    <div className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {stars}
      {showValue && (
        <span className="ml-1.5 text-sm font-medium text-text-secondary">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}
