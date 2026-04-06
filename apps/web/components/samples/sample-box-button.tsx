"use client";

import { useSampleBox, type SampleItem } from "@/lib/samples/context";
import { useToast } from "@/components/ui/toast";
import Link from "next/link";

interface SampleBoxButtonProps {
  product: SampleItem;
  /** "inline" for product pages, "compact" for cards/quiz results */
  variant?: "inline" | "compact";
}

export function SampleBoxButton({
  product,
  variant = "inline",
}: SampleBoxButtonProps) {
  const { addItem, removeItem, isInBox, isFull } = useSampleBox();
  const { toast } = useToast();
  const inBox = isInBox(product.id);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (inBox) {
      removeItem(product.id);
      toast("Removed from sample box", "info");
      return;
    }

    if (isFull) {
      toast("Sample box is full (5 max)", "error");
      return;
    }

    const added = addItem(product);
    if (added) {
      toast("Added to sample box", "success");
    }
  };

  if (variant === "compact") {
    return (
      <button
        onClick={handleClick}
        aria-label={
          inBox ? "Remove from sample box" : "Add to sample box"
        }
        aria-pressed={inBox}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
          inBox
            ? "border-accent-primary bg-accent-primary/10 text-accent-primary"
            : "border-border-default text-text-secondary hover:border-accent-primary hover:text-accent-primary"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          className="w-3.5 h-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714a2.25 2.25 0 0 0 .659 1.591L19 14.5m-4.75-11.396c.249.023.498.05.75.082M5 14.5l-1.456 1.456a1.5 1.5 0 0 0 0 2.121l.707.707a1.5 1.5 0 0 0 2.121 0L8.5 16.657m-3.5-2.157h13m0 0 1.456 1.456a1.5 1.5 0 0 1 0 2.121l-.707.707a1.5 1.5 0 0 1-2.121 0L15.5 16.657"
          />
        </svg>
        {inBox ? "In Sample Box" : "Try Sample"}
      </button>
    );
  }

  // Inline variant for product pages
  return (
    <div className="space-y-2">
      <button
        onClick={handleClick}
        aria-label={
          inBox ? "Remove from sample box" : "Add to sample box"
        }
        aria-pressed={inBox}
        className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${
          inBox
            ? "border-accent-primary bg-accent-primary/10 text-accent-primary"
            : "border-border-default text-text-secondary hover:border-accent-primary hover:text-accent-primary"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714a2.25 2.25 0 0 0 .659 1.591L19 14.5m-4.75-11.396c.249.023.498.05.75.082M5 14.5l-1.456 1.456a1.5 1.5 0 0 0 0 2.121l.707.707a1.5 1.5 0 0 0 2.121 0L8.5 16.657m-3.5-2.157h13m0 0 1.456 1.456a1.5 1.5 0 0 1 0 2.121l-.707.707a1.5 1.5 0 0 1-2.121 0L15.5 16.657"
          />
        </svg>
        {inBox ? "In Your Sample Box" : "Try Before You Buy — Add Sample"}
      </button>
      {inBox && (
        <Link
          href="/samples"
          className="block text-center text-xs text-accent-primary hover:underline"
        >
          View your sample box →
        </Link>
      )}
    </div>
  );
}
