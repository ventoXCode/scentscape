"use client";

import Link from "next/link";
import { useCart } from "@/components/providers";
import { removeFromCart, updateCartItem } from "@/lib/medusa/actions";
import { formatPrice } from "@/lib/utils/format";
import { useTransition, useEffect, useRef, useCallback, useState } from "react";
import { useToast } from "@/components/ui/toast";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { cart, refreshCart } = useCart();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  // Track whether the drawer has ever been opened (skip rendering until first open)
  const [hasBeenOpened, setHasBeenOpened] = useState(false);

  useEffect(() => {
    if (open) setHasBeenOpened(true);
  }, [open]);

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
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
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
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
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

  // Don't render anything until the drawer has been opened at least once
  if (!hasBeenOpened) return null;

  const handleRemove = (lineItemId: string) => {
    startTransition(async () => {
      try {
        const updatedCart = await removeFromCart(lineItemId);
        refreshCart(updatedCart);
        toast("Item removed from cart", "info");
      } catch {
        toast("Failed to remove item. Please try again.", "error");
      }
    });
  };

  const handleUpdateQuantity = (lineItemId: string, quantity: number) => {
    startTransition(async () => {
      try {
        const updatedCart = await updateCartItem(lineItemId, quantity);
        refreshCart(updatedCart);
      } catch {
        toast("Failed to update quantity. Please try again.", "error");
      }
    });
  };

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      aria-hidden={!open}
    >
      {/* Overlay with fade */}
      <div
        className={`absolute inset-0 bg-surface-overlay transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Panel with slide */}
      <div
        ref={panelRef}
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-surface-elevated p-6 shadow-modal transition-transform duration-300 ease-smooth ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between mb-6">
          <h2
            id="cart-drawer-title"
            className="font-display text-lg font-semibold text-text-primary"
          >
            Your Cart
          </h2>
          <button
            onClick={handleClose}
            aria-label="Close cart"
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            Close
          </button>
        </div>

        {!cart?.items?.length ? (
          <div className="text-center py-8">
            <p className="text-3xl mb-2" aria-hidden="true">🧴</p>
            <p className="text-text-muted mb-4">Your cart is empty</p>
            <div className="flex flex-col gap-2">
              <Link
                href="/quiz"
                onClick={handleClose}
                className="inline-block px-6 py-2.5 bg-accent-primary text-text-inverse rounded-lg font-medium hover:bg-accent-primary-hover transition-colors"
              >
                Find Your Scent
              </Link>
              <Link
                href="/products"
                onClick={handleClose}
                className="inline-block px-6 py-2.5 bg-text-primary text-text-inverse rounded-lg font-medium hover:bg-text-secondary transition-colors"
              >
                Browse Fragrances
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 border-b border-border-default pb-4"
              >
                <div className="flex-1">
                  <p className="font-medium text-text-primary">{item.title}</p>
                  <p className="text-sm text-text-muted">
                    {(item as unknown as { variant?: { title?: string } }).variant?.title}
                  </p>
                  <p className="text-sm text-text-primary">
                    {formatPrice(item.unit_price)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity - 1)
                      }
                      disabled={isPending || item.quantity <= 1}
                      className="w-8 h-8 border border-border-default rounded-lg disabled:opacity-50 text-text-secondary hover:border-border-strong transition-colors"
                      aria-label={`Decrease quantity of ${item.title}`}
                    >
                      -
                    </button>
                    <span
                      className="text-text-primary"
                      aria-label={`Quantity: ${item.quantity}`}
                    >
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity + 1)
                      }
                      disabled={isPending}
                      className="w-8 h-8 border border-border-default rounded-lg disabled:opacity-50 text-text-secondary hover:border-border-strong transition-colors"
                      aria-label={`Increase quantity of ${item.title}`}
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleRemove(item.id)}
                      disabled={isPending}
                      className="text-error text-sm ml-4 disabled:opacity-50 hover:underline"
                      aria-label={`Remove ${item.title} from cart`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="pt-4 border-t border-border-default">
              <div className="flex justify-between font-semibold text-text-primary">
                <span>Total</span>
                <span>{formatPrice((cart as unknown as { total?: number }).total || 0)}</span>
              </div>
              <Link
                href="/checkout"
                onClick={handleClose}
                className="block w-full mt-4 bg-text-primary text-text-inverse text-center py-3 rounded-lg font-medium hover:bg-text-secondary transition-colors"
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
