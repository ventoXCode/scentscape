"use client";

import { useComparison, type CompareItem } from "@/lib/comparison/context";
import { useToast } from "@/components/ui/toast";

interface CompareButtonProps {
  product: CompareItem;
  variant?: "card" | "detail";
}

export function CompareButton({ product, variant = "card" }: CompareButtonProps) {
  const { addItem, removeItem, isInComparison, isFull } = useComparison();
  const { toast } = useToast();
  const inCompare = isInComparison(product.id);

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (inCompare) {
      removeItem(product.id);
      toast("Removed from comparison", "info");
    } else if (isFull) {
      toast("Compare list is full (max 4)", "error");
    } else {
      addItem(product);
      toast("Added to comparison", "success");
    }
  }

  if (variant === "detail") {
    return (
      <button
        onClick={handleClick}
        className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
          inCompare
            ? "border-accent-primary bg-accent-primary/10 text-accent-primary"
            : "border-border-default text-text-secondary hover:border-border-strong hover:text-text-primary"
        }`}
        aria-pressed={inCompare}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
        {inCompare ? "Comparing" : "Compare"}
      </button>
    );
  }

  // Card variant: small overlay icon
  return (
    <button
      onClick={handleClick}
      className={`absolute bottom-2 left-2 z-10 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors ${
        inCompare
          ? "bg-accent-primary text-white"
          : "bg-surface-elevated/80 text-text-muted hover:text-text-primary hover:bg-surface-elevated"
      }`}
      aria-label={inCompare ? "Remove from comparison" : "Add to comparison"}
      aria-pressed={inCompare}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 2H4m0 0l4 4m-4-4l4-4" />
      </svg>
    </button>
  );
}
