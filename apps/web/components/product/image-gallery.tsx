"use client";

import { useState } from "react";
import Image from "next/image";

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
  // Build image list: use images array if available, fall back to thumbnail
  const allImages =
    images.length > 0
      ? images
      : thumbnail
        ? [{ id: "thumbnail", url: thumbnail }]
        : [];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = allImages[selectedIndex];

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
      {/* Main image */}
      <div className="aspect-square bg-surface-subtle rounded-xl overflow-hidden relative">
        <Image
          src={selectedImage.url}
          alt={`${title}${allImages.length > 1 ? ` — image ${selectedIndex + 1}` : ""}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Thumbnail strip — only show if multiple images */}
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1" role="listbox" aria-label="Product images">
          {allImages.map((img, index) => (
            <button
              key={img.id}
              onClick={() => setSelectedIndex(index)}
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
