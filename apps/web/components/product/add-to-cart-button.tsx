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

  const handleAddToCart = () => {
    if (!variantId) {
      // If no variantId is passed, the parent VariantSelector manages selection;
      // this component is intentionally wired up to the first variant when used
      // standalone. In the product detail page the VariantSelector's selection
      // is lifted up and passed down as variantId.
      console.warn("AddToCartButton: no variantId provided");
      return;
    }

    startTransition(async () => {
      try {
        await addToCart(variantId, 1);
        await refreshCart();
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
      } catch (err) {
        console.error("Failed to add to cart:", err);
      }
    });
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isPending || !variantId}
      className={`w-full py-3 px-6 rounded-lg font-medium transition-all ${
        added
          ? "bg-green-600 text-white"
          : "bg-black text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
      }`}
    >
      {isPending ? "Adding..." : added ? "Added to Cart!" : "Add to Cart"}
    </button>
  );
}
