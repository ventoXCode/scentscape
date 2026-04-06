interface SkeletonProps {
  className?: string;
}

function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-shimmer rounded-lg ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(90deg, var(--color-surface-subtle) 0%, var(--color-border-subtle) 40%, var(--color-surface-subtle) 80%)",
        backgroundSize: "200% 100%",
      }}
      aria-hidden="true"
    />
  );
}

function ProductCardSkeleton() {
  return (
    <div className="border border-border-default rounded-xl overflow-hidden">
      <Skeleton className="aspect-square rounded-none" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
}

function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }, (_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export { Skeleton, ProductCardSkeleton, ProductGridSkeleton };
