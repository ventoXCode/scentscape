"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import { useSwipe } from "@/hooks/use-swipe";

interface ProductImage {
  id: string;
  url: string;
}

interface ImageGalleryProps {
  thumbnail: string | null;
  images: ProductImage[];
  title: string;
}

function getTouchDistance(t1: Touch, t2: Touch): number {
  return Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
}

function getTouchCenter(t1: Touch, t2: Touch): { x: number; y: number } {
  return { x: (t1.clientX + t2.clientX) / 2, y: (t1.clientY + t2.clientY) / 2 };
}

export function ImageGallery({ thumbnail, images, title }: ImageGalleryProps) {
  const allImages =
    images.length > 0
      ? images
      : thumbnail
        ? [{ id: "thumbnail", url: thumbnail }]
        : [];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(null);
  const selectedImage = allImages[selectedIndex];
  const hasMultiple = allImages.length > 1;

  // Pinch-to-zoom state
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const isPinching = useRef(false);
  const lastPinchDistance = useRef(0);
  const lastPinchCenter = useRef({ x: 0, y: 0 });
  const lastTapTime = useRef(0);
  const panStart = useRef({ x: 0, y: 0 });
  const translateStart = useRef({ x: 0, y: 0 });
  const isPanning = useRef(false);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const isZoomed = scale > 1.05;

  const resetZoom = useCallback(() => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  }, []);

  // Reset zoom when changing images
  const goTo = useCallback(
    (index: number, direction: "left" | "right") => {
      if (index < 0 || index >= allImages.length) return;
      resetZoom();
      setSlideDirection(direction);
      setSelectedIndex(index);
      setTimeout(() => setSlideDirection(null), 300);
    },
    [allImages.length, resetZoom]
  );

  const { onTouchStart: swipeTouchStart, onTouchEnd: swipeTouchEnd } = useSwipe({
    onSwipeLeft: () => goTo(selectedIndex + 1, "left"),
    onSwipeRight: () => goTo(selectedIndex - 1, "right"),
    threshold: 40,
  });

  // Non-passive touch listeners for pinch-to-zoom
  useEffect(() => {
    const el = mainImageRef.current;
    if (!el) return;

    let currentScale = 1;
    let currentTranslate = { x: 0, y: 0 };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        isPinching.current = true;
        lastPinchDistance.current = getTouchDistance(e.touches[0], e.touches[1]);
        lastPinchCenter.current = getTouchCenter(e.touches[0], e.touches[1]);
        e.preventDefault();
      } else if (e.touches.length === 1) {
        // Double-tap to reset zoom
        const now = Date.now();
        if (now - lastTapTime.current < 300) {
          setScale(1);
          setTranslate({ x: 0, y: 0 });
          currentScale = 1;
          currentTranslate = { x: 0, y: 0 };
          e.preventDefault();
        }
        lastTapTime.current = now;

        // Start pan if zoomed
        if (currentScale > 1.05) {
          isPanning.current = true;
          panStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
          translateStart.current = { ...currentTranslate };
        }
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && isPinching.current) {
        e.preventDefault();
        const newDist = getTouchDistance(e.touches[0], e.touches[1]);
        const ratio = newDist / lastPinchDistance.current;
        const newScale = Math.min(3, Math.max(1, currentScale * ratio));
        lastPinchDistance.current = newDist;
        currentScale = newScale;
        setScale(newScale);

        // If scale returned to 1, reset translate
        if (newScale <= 1.05) {
          currentTranslate = { x: 0, y: 0 };
          setTranslate({ x: 0, y: 0 });
        }
      } else if (e.touches.length === 1 && isPanning.current && currentScale > 1.05) {
        e.preventDefault();
        const dx = e.touches[0].clientX - panStart.current.x;
        const dy = e.touches[0].clientY - panStart.current.y;
        // Clamp panning to prevent image from going off-screen
        const maxPan = ((currentScale - 1) / currentScale) * 50;
        const newX = Math.min(maxPan, Math.max(-maxPan, translateStart.current.x + dx));
        const newY = Math.min(maxPan, Math.max(-maxPan, translateStart.current.y + dy));
        currentTranslate = { x: newX, y: newY };
        setTranslate({ x: newX, y: newY });
      }
    };

    const handleTouchEnd = () => {
      isPinching.current = false;
      isPanning.current = false;
      // Snap back to 1 if barely zoomed
      if (currentScale < 1.1) {
        currentScale = 1;
        currentTranslate = { x: 0, y: 0 };
        setScale(1);
        setTranslate({ x: 0, y: 0 });
      }
    };

    el.addEventListener("touchstart", handleTouchStart, { passive: false });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });
    el.addEventListener("touchend", handleTouchEnd);

    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, [selectedIndex]); // Re-bind when image changes

  // Wrap swipe handlers to skip when zoomed or pinching
  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length > 1 || isZoomed) return;
      swipeTouchStart(e);
    },
    [swipeTouchStart, isZoomed]
  );

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (isPinching.current || isZoomed) return;
      swipeTouchEnd(e);
    },
    [swipeTouchEnd, isZoomed]
  );

  if (allImages.length === 0) {
    return (
      <div className="aspect-square bg-surface-subtle rounded-xl flex items-center justify-center text-text-muted">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-24"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Main image — swipeable + pinch-to-zoom on mobile */}
      <div
        ref={mainImageRef}
        className={`aspect-square bg-surface-subtle rounded-xl overflow-hidden relative select-none ${
          isZoomed ? "touch-none" : "touch-pan-y"
        }`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <Image
          src={selectedImage.url}
          alt={`${title}${hasMultiple ? ` — image ${selectedIndex + 1} of ${allImages.length}` : ""}`}
          fill
          className={`object-cover transition-all duration-300 ease-out ${
            slideDirection === "left"
              ? "animate-slide-in-from-right"
              : slideDirection === "right"
                ? "animate-slide-in-from-left"
                : ""
          }`}
          style={
            isZoomed
              ? { transform: `scale(${scale}) translate(${translate.x / scale}px, ${translate.y / scale}px)` }
              : undefined
          }
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />

        {/* Image counter badge — mobile only */}
        {hasMultiple && (
          <div className="absolute top-3 right-3 md:hidden bg-black/50 text-white text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">
            {selectedIndex + 1} / {allImages.length}
          </div>
        )}

        {/* Prev/Next arrows — desktop only */}
        {hasMultiple && (
          <>
            {selectedIndex > 0 && (
              <button
                onClick={() => goTo(selectedIndex - 1, "right")}
                className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 items-center justify-center rounded-full bg-white/80 hover:bg-white shadow-sm text-text-primary transition-colors"
                aria-label="Previous image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            )}
            {selectedIndex < allImages.length - 1 && (
              <button
                onClick={() => goTo(selectedIndex + 1, "left")}
                className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 items-center justify-center rounded-full bg-white/80 hover:bg-white shadow-sm text-text-primary transition-colors"
                aria-label="Next image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </>
        )}
      </div>

      {/* Dot indicator — mobile only */}
      {hasMultiple && (
        <div className="flex md:hidden justify-center gap-1.5" role="tablist" aria-label="Image navigation">
          {allImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index, index > selectedIndex ? "left" : "right")}
              role="tab"
              aria-selected={index === selectedIndex}
              aria-label={`View image ${index + 1}`}
              className={`rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? "w-6 h-2 bg-accent-primary"
                  : "w-2 h-2 bg-border-strong/50"
              }`}
            />
          ))}
        </div>
      )}

      {/* Thumbnail strip — desktop only */}
      {hasMultiple && (
        <div className="hidden md:flex gap-2 overflow-x-auto pb-1" role="listbox" aria-label="Product images">
          {allImages.map((img, index) => (
            <button
              key={img.id}
              onClick={() => goTo(index, index > selectedIndex ? "left" : "right")}
              role="option"
              aria-selected={index === selectedIndex}
              className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                index === selectedIndex
                  ? "border-accent-primary ring-1 ring-accent-primary/30"
                  : "border-border-default hover:border-border-strong"
              }`}
            >
              <Image
                src={img.url}
                alt={`${title} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
