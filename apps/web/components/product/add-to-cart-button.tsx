"use client";

import { useTransition } from "react";
import { addToCart } from "@/lib/medusa/actions";
import { useCart } from "@/components/providers";
import { useToast } from "@/components/ui/toast";

interface AddToCartButtonProps {
  variantId?: string;
}

export function AddToCartButton({ variantId }: AddToCartButtonProps) {
  const { refreshCart, setCartOpen } = useCart();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleAddToCart = () => {
    if (!variantId) return;

    startTransition(async () => {
      try {
        const updatedCart = await addToCart(variantId, 1);
        refreshCart(updatedCart);
        toast("Added to cart", "success");
        setCartOpen(true);
      } catch {
        toast("Failed to add to cart. Please try again.", "error");
      }
    });
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isPending || !variantId}
      className="w-full py-3 px-6 rounded-lg font-medium transition-all bg-text-primary text-text-inverse hover:bg-text-secondary disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isPending ? "Adding..." : "Add to Cart"}
    </button>
  );
}
