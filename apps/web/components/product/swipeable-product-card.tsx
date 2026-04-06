"use client";

import {
  useRef,
  useState,
  useCallback,
  type ReactNode,
  type TouchEvent as ReactTouchEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { useWishlist, type WishlistItem } from "@/lib/wishlist/context";
import { useToast } from "@/components/ui/toast";
import { formatPrice } from "@/lib/utils/format";

const LONGEVITY_LABELS = [
  "",
  "Fleeting",
  "Short",
  "Moderate",
  "Long-lasting",
  "Legendary",
];
const SILLAGE_LABELS = [
  "",
  "Intimate",
  "Close",
  "Moderate",
  "Strong",
  "Enormous",
];

const ACTION_WIDTH = 72;
const SWIPE_THRESHOLD = ACTION_WIDTH / 2;
const LONG_PRESS_MS = 500;

interface SwipeableProduct extends WishlistItem {
  description?: string | null;
  concentration?: string | null;
  longevity?: number | null;
  sillage?: number | null;
  price?: number | null;
}

interface SwipeableProductCardProps {
  children: ReactNode;
  product: SwipeableProduct;
}

export function SwipeableProductCard({
  children,
  product,
}: SwipeableProductCardProps) {
  const { toggleItem, isWishlisted } = useWishlist();
  const { toast } = useToast();
  const wishlisted = isWishlisted(product.id);

  const [offset, setOffset] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const startX = useRef(0);
  const startY = useRef(0);
  const dragging = useRef(false);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const preventClick = useRef(false);

  const clearLongPress = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }, []);

  const handleTouchStart = useCallback(
    (e: ReactTouchEvent) => {
      const touch = e.touches[0];
      startX.current = touch.clientX;
      startY.current = touch.clientY;
      dragging.current = false;
      preventClick.current = false;
      setTransitioning(false);

      longPressTimer.current = setTimeout(() => {
        setShowPreview(true);
        preventClick.current = true;
        if (navigator.vibrate) navigator.vibrate(15);
      }, LONG_PRESS_MS);
    },
    []
  );

  const handleTouchMove = useCallback(
    (e: ReactTouchEvent) => {
      clearLongPress();

      const touch = e.touches[0];
      const dx = touch.clientX - startX.current;
      const dy = Math.abs(touch.clientY - startY.current);

      // Vertical scrolling — don't interfere
      if (dy > 15 && !dragging.current) return;

      if (Math.abs(dx) > 8) {
        dragging.current = true;
        preventClick.current = true;

        if (revealed) {
          // Closing: allow right swipe from revealed state
          const newOffset = Math.max(
            Math.min(dx - ACTION_WIDTH, 0),
            -ACTION_WIDTH
          );
          setOffset(newOffset);
        } else {
          // Opening: only allow left swipe
          const newOffset = Math.max(Math.min(dx, 0), -ACTION_WIDTH);
          setOffset(newOffset);
        }
      }
    },
    [revealed, clearLongPress]
  );

  const handleTouchEnd = useCallback(() => {
    clearLongPress();

    if (!dragging.current) return;

    setTransitioning(true);
    if (offset < -SWIPE_THRESHOLD) {
      setOffset(-ACTION_WIDTH);
      setRevealed(true);
    } else {
      setOffset(0);
      setRevealed(false);
    }

    // Reset dragging after the transition completes
    setTimeout(() => setTransitioning(false), 200);
  }, [offset, clearLongPress]);

  const handleClickCapture = useCallback(
    (e: ReactMouseEvent) => {
      if (preventClick.current) {
        e.preventDefault();
        e.stopPropagation();
        preventClick.current = false;
      }
    },
    []
  );

  const handleWishlistAction = useCallback(
    (e: ReactMouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      toggleItem({
        id: product.id,
        handle: product.handle,
        title: product.title,
        thumbnail: product.thumbnail,
        brand: product.brand,
        family: product.family,
      });
      toast(
        wishlisted ? "Removed from wishlist" : "Saved to wishlist",
        wishlisted ? "info" : "success"
      );
      // Snap back
      setTransitioning(true);
      setOffset(0);
      setRevealed(false);
      if (navigator.vibrate) navigator.vibrate(10);
    },
    [product, wishlisted, toggleItem, toast]
  );

  const dismissPreview = useCallback(() => {
    setShowPreview(false);
  }, []);

  return (
    <div className="relative md:contents">
      {/* Desktop: md:contents makes this wrapper invisible, card renders as direct grid child.
          Mobile: relative container enables the swipe panel and overflow clipping. */}
      <div className="relative overflow-hidden rounded-xl md:hidden">
        {/* Swipe action panel behind the card */}
        <div
          className="absolute inset-y-0 right-0 flex items-center justify-center"
          style={{ width: ACTION_WIDTH }}
        >
          <button
            onClick={handleWishlistAction}
            className={`flex h-full w-full flex-col items-center justify-center gap-1 transition-colors ${
              wishlisted
                ? "bg-accent-secondary text-white"
                : "bg-surface-subtle text-text-secondary active:bg-surface-primary"
            }`}
            aria-label={
              wishlisted ? "Remove from wishlist" : "Save to wishlist"
            }
          >
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6"
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
            <span className="text-[10px] font-medium">
              {wishlisted ? "Saved" : "Save"}
            </span>
          </button>
        </div>

        {/* Card with swipe transform */}
        <div
          className="relative touch-pan-y"
          style={{
            transform: `translateX(${offset}px)`,
            transition: transitioning ? "transform 200ms ease" : "none",
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClickCapture={handleClickCapture}
        >
          {children}
        </div>
      </div>

      {/* Desktop: render card directly (md:contents above hides mobile wrapper) */}
      <div className="hidden md:block">{children}</div>

      {/* Long-press quick preview overlay */}
      {showPreview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm md:hidden"
          onClick={dismissPreview}
          onTouchEnd={(e) => {
            e.preventDefault();
            dismissPreview();
          }}
          role="dialog"
          aria-modal="true"
          aria-label={`Quick preview: ${product.title}`}
        >
          <div
            className="mx-6 max-w-sm w-full bg-surface-elevated rounded-2xl shadow-modal overflow-hidden animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5">
              <h3 className="font-display font-semibold text-lg text-text-primary leading-snug">
                {product.title}
              </h3>
              {product.brand && (
                <p className="text-xs text-text-muted uppercase tracking-wider mt-1">
                  {product.brand}
                </p>
              )}

              <div className="flex items-center gap-2 mt-3">
                {product.family && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-surface-subtle text-text-secondary">
                    {product.family}
                  </span>
                )}
                {product.concentration && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-surface-subtle text-text-secondary">
                    {product.concentration}
                  </span>
                )}
                {product.price != null && (
                  <span className="text-sm font-semibold text-accent-primary ml-auto">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>

              {product.description && (
                <p className="text-sm text-text-secondary mt-3 line-clamp-3 leading-relaxed">
                  {product.description}
                </p>
              )}

              {(product.longevity != null || product.sillage != null) && (
                <div className="flex gap-4 mt-3 text-xs text-text-muted">
                  {product.longevity != null && (
                    <span>
                      Longevity:{" "}
                      <span className="text-text-secondary font-medium">
                        {LONGEVITY_LABELS[Math.round(product.longevity)] || "—"}
                      </span>
                    </span>
                  )}
                  {product.sillage != null && (
                    <span>
                      Sillage:{" "}
                      <span className="text-text-secondary font-medium">
                        {SILLAGE_LABELS[Math.round(product.sillage)] || "—"}
                      </span>
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="border-t border-border-default px-5 py-3 flex items-center justify-between">
              <button
                onClick={(e) => {
                  handleWishlistAction(e);
                  dismissPreview();
                }}
                className={`text-sm font-medium ${
                  wishlisted
                    ? "text-accent-secondary"
                    : "text-text-secondary hover:text-accent-secondary"
                }`}
              >
                {wishlisted ? "♥ Saved" : "♡ Save"}
              </button>
              <a
                href={`/products/${product.handle}`}
                className="text-sm font-medium text-accent-primary"
              >
                View Details →
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
