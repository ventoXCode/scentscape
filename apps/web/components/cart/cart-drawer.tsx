"use client";

import { useCart } from "@/components/providers";
import { removeFromCart, updateCartItem } from "@/lib/medusa/actions";
import { useTransition } from "react";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { cart, refreshCart } = useCart();
  const [isPending, startTransition] = useTransition();

  if (!open) return null;

  const handleRemove = (lineItemId: string) => {
    startTransition(async () => {
      await removeFromCart(lineItemId);
      await refreshCart();
    });
  };

  const handleUpdateQuantity = (lineItemId: string, quantity: number) => {
    startTransition(async () => {
      await updateCartItem(lineItemId, quantity);
      await refreshCart();
    });
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount / 100);
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button onClick={onClose}>Close</button>
        </div>

        {!cart?.items?.length ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          <div className="space-y-4">
            {cart.items.map((item) => (
              <div key={item.id} className="flex gap-4 border-b pb-4">
                <div className="flex-1">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">{(item as any).variant?.title}</p>
                  <p className="text-sm">{formatPrice(item.unit_price)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      disabled={isPending || item.quantity <= 1}
                      className="w-8 h-8 border rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      disabled={isPending}
                      className="w-8 h-8 border rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleRemove(item.id)}
                      disabled={isPending}
                      className="text-red-500 text-sm ml-4"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="pt-4 border-t">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{formatPrice((cart as any).total || 0)}</span>
              </div>
              <a
                href="/checkout"
                className="block w-full mt-4 bg-black text-white text-center py-3 rounded"
              >
                Checkout
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
