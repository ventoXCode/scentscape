"use client";

import { useState, useTransition } from "react";
import { addToCart } from "@/lib/medusa/actions";
import { useCart } from "@/components/providers";

interface AddToCartButtonProps {
  variantId?: string;
}

export function AddToCartButton({ variantId }: AddToCartButtonProps) {
  const { refreshCart } = useCart();
  const [isPending, startTransition] = useTransition();
  const [added, setAdded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddToCart = () => {
    if (!variantId) return;

    setError(null);
    startTransition(async () => {
      try {
        await addToCart(variantId, 1);
        await refreshCart();
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
      } catch {
        setError("Failed to add to cart. Please try again.");
        setTimeout(() => setError(null), 4000);
      }
    });
  };

  return (
    <div>
      <button
        onClick={handleAddToCart}
        disabled={isPending || !variantId}
        className={`w-full py-3 px-6 rounded-lg font-medium transition-all ${
          error
            ? "bg-red-600 text-white"
            : added
              ? "bg-green-600 text-white"
              : "bg-black text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        }`}
      >
        {isPending ? "Adding..." : error ? "Try Again" : added ? "Added to Cart!" : "Add to Cart"}
      </button>
      <div aria-live="polite" className="sr-only">
        {added && "Item added to cart"}
        {error && error}
      </div>
      {error && (
        <p className="text-red-600 text-sm mt-2">{error}</p>
      )}
    </div>
  );
}
