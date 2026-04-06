import { useRef, useCallback, type TouchEvent } from "react";

interface UseSwipeOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  /** Minimum horizontal distance in px to trigger a swipe (default: 50) */
  threshold?: number;
  /** Max vertical distance allowed — prevents triggering during scroll (default: 100) */
  maxVertical?: number;
}

/**
 * Lightweight horizontal swipe detection via native touch events.
 * Returns onTouchStart / onTouchEnd handlers to spread onto a container element.
 */
export function useSwipe({
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
  maxVertical = 100,
}: UseSwipeOptions) {
  const startX = useRef(0);
  const startY = useRef(0);

  const onTouchStart = useCallback((e: TouchEvent) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
  }, []);

  const onTouchEnd = useCallback(
    (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX.current;
      const dy = Math.abs(e.changedTouches[0].clientY - startY.current);

      // Ignore if the gesture was more vertical than horizontal (user was scrolling)
      if (dy > maxVertical) return;

      if (dx < -threshold) {
        onSwipeLeft?.();
      } else if (dx > threshold) {
        onSwipeRight?.();
      }
    },
    [onSwipeLeft, onSwipeRight, threshold, maxVertical]
  );

  return { onTouchStart, onTouchEnd };
}
