"use client";

import { useWishlist, type WishlistItem } from "@/lib/wishlist/context";
import { useToast } from "@/components/ui/toast";

interface WishlistButtonProps {
  product: WishlistItem;
  /** "card" renders a small overlay icon; "detail" renders a larger button with label */
  variant?: "card" | "detail";
}

export function WishlistButton({ product, variant = "card" }: WishlistButtonProps) {
  const { toggleItem, isWishlisted } = useWishlist();
  const { toast } = useToast();
  const wishlisted = isWishlisted(product.id);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
    toast(
      wishlisted ? "Removed from wishlist" : "Saved to wishlist",
      wishlisted ? "info" : "success",
    );
  };

  if (variant === "detail") {
    return (
      <button
        onClick={handleClick}
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        aria-pressed={wishlisted}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
          wishlisted
            ? "border-accent-secondary bg-accent-secondary/10 text-accent-secondary"
            : "border-border-default text-text-secondary hover:border-accent-secondary hover:text-accent-secondary"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5"
          fill={wishlisted ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
        <span className="text-sm font-medium">
          {wishlisted ? "Saved" : "Save"}
        </span>
      </button>
    );
  }

  // Card variant: small overlay icon
  return (
    <button
      onClick={handleClick}
      aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={wishlisted}
      className={`absolute bottom-2 right-2 z-10 w-8 h-8 flex items-center justify-center rounded-full backdrop-blur-sm shadow-sm transition-all ${
        wishlisted
          ? "bg-accent-secondary/90 text-white"
          : "bg-surface-elevated/80 text-text-muted hover:text-accent-secondary hover:bg-surface-elevated/95"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        className="w-4 h-4"
        fill={wishlisted ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    </button>
  );
}
