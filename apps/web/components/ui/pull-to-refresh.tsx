"use client";

import {
  useRef,
  useState,
  useCallback,
  type ReactNode,
  type TouchEvent as ReactTouchEvent,
} from "react";
import { useRouter } from "next/navigation";

const PULL_THRESHOLD = 80;
const MAX_PULL = 120;
const RESISTANCE = 0.4;

interface PullToRefreshProps {
  children: ReactNode;
}

export function PullToRefresh({ children }: PullToRefreshProps) {
  const router = useRouter();
  const [pullDistance, setPullDistance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const startY = useRef(0);
  const pulling = useRef(false);

  const handleTouchStart = useCallback(
    (e: ReactTouchEvent) => {
      if (refreshing) return;
      // Only activate when scrolled to top
      if (window.scrollY > 0) return;
      startY.current = e.touches[0].clientY;
      pulling.current = false;
    },
    [refreshing]
  );

  const handleTouchMove = useCallback(
    (e: ReactTouchEvent) => {
      if (refreshing) return;
      if (window.scrollY > 0) return;

      const dy = e.touches[0].clientY - startY.current;
      if (dy > 10) {
        pulling.current = true;
        const distance = Math.min(dy * RESISTANCE, MAX_PULL);
        setPullDistance(distance);
      }
    },
    [refreshing]
  );

  const handleTouchEnd = useCallback(() => {
    if (!pulling.current) return;
    pulling.current = false;

    if (pullDistance >= PULL_THRESHOLD) {
      setRefreshing(true);
      setPullDistance(PULL_THRESHOLD * RESISTANCE);
      router.refresh();
      // Give the server time to respond, then reset
      setTimeout(() => {
        setRefreshing(false);
        setPullDistance(0);
      }, 1500);
    } else {
      setPullDistance(0);
    }
  }, [pullDistance, router]);

  return (
    <div
      className="md:hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull indicator */}
      {(pullDistance > 0 || refreshing) && (
        <div
          className="flex items-center justify-center overflow-hidden transition-[height] duration-200 ease-out"
          style={{ height: pullDistance > 0 ? pullDistance : refreshing ? 40 : 0 }}
        >
          <div
            className={`w-6 h-6 border-2 border-border-strong border-t-transparent rounded-full ${
              refreshing ? "animate-spin" : ""
            }`}
            style={{
              opacity: Math.min(pullDistance / PULL_THRESHOLD, 1),
              transform: `rotate(${(pullDistance / PULL_THRESHOLD) * 360}deg)`,
            }}
          />
        </div>
      )}
      {children}

      {/* Desktop: no pull-to-refresh needed */}
      <noscript />
    </div>
  );
}
