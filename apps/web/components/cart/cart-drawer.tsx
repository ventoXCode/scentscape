"use client";

import Link from "next/link";
import { useCart } from "@/components/providers";
import { removeFromCart, updateCartItem } from "@/lib/medusa/actions";
import { formatPrice } from "@/lib/utils/format";
import { useTransition, useEffect, useRef, useCallback } from "react";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { cart, refreshCart } = useCart();
  const [isPending, startTransition] = useTransition();
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const handleClose = useCallback(() => {
    onClose();
    previousFocusRef.current?.focus();
  }, [onClose]);

  // Focus trap and Escape key
  useEffect(() => {
    if (!open) return;
    previousFocusRef.current = document.activeElement as HTMLElement;

    const panel = panelRef.current;
    if (panel) {
      const firstFocusable = panel.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      firstFocusable?.focus();
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        handleClose();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, handleClose]);

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

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="cart-drawer-title">
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} aria-hidden="true" />
      <div ref={panelRef} className="absolute right-0 top-0 h-full w-full max-w-md bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 id="cart-drawer-title" className="text-lg font-semibold">Your Cart</h2>
          <button onClick={handleClose} aria-label="Close cart">
            Close
          </button>
        </div>

        {!cart?.items?.length ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Link
              href="/products"
              onClick={handleClose}
              className="inline-block px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
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
                      className="w-8 h-8 border rounded disabled:opacity-50"
                      aria-label={`Decrease quantity of ${item.title}`}
                    >
                      -
                    </button>
                    <span aria-label={`Quantity: ${item.quantity}`}>{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      disabled={isPending}
                      className="w-8 h-8 border rounded disabled:opacity-50"
                      aria-label={`Increase quantity of ${item.title}`}
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleRemove(item.id)}
                      disabled={isPending}
                      className="text-red-500 text-sm ml-4 disabled:opacity-50"
                      aria-label={`Remove ${item.title} from cart`}
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
              <Link
                href="/checkout"
                onClick={handleClose}
                className="block w-full mt-4 bg-black text-white text-center py-3 rounded hover:bg-gray-800 transition-colors"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
