"use client";

import { useState, useCallback } from "react";
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

  const goTo = useCallback(
    (index: number, direction: "left" | "right") => {
      if (index < 0 || index >= allImages.length) return;
      setSlideDirection(direction);
      setSelectedIndex(index);
      // Clear animation class after transition completes
      setTimeout(() => setSlideDirection(null), 300);
    },
    [allImages.length]
  );

  const { onTouchStart, onTouchEnd } = useSwipe({
    onSwipeLeft: () => goTo(selectedIndex + 1, "left"),
    onSwipeRight: () => goTo(selectedIndex - 1, "right"),
    threshold: 40,
  });

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
      {/* Main image — swipeable on mobile */}
      <div
        className="aspect-square bg-surface-subtle rounded-xl overflow-hidden relative touch-pan-y select-none"
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
