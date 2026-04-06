"use client";

import { useTransition } from "react";
import { addToCart } from "@/lib/medusa/actions";
import { useCart } from "@/components/providers";
import { useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";

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
    <Button
      onClick={handleAddToCart}
      loading={isPending}
      loadingText="Adding..."
      disabled={!variantId}
      fullWidth
      size="lg"
    >
      Add to Cart
    </Button>
  );
}
