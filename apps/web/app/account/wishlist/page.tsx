"use client";

import Link from "next/link";
import Image from "next/image";
import { useWishlist } from "@/lib/wishlist/context";

export default function WishlistPage() {
  const { items, removeItem } = useWishlist();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/account" className="text-text-muted hover:text-text-primary transition-colors">
          &larr; Account
        </Link>
        <h1 className="text-2xl font-bold font-display">Wishlist</h1>
        {items.length > 0 && (
          <span className="text-sm text-text-muted">
            ({items.length} {items.length === 1 ? "item" : "items"})
          </span>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-surface-subtle flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-text-muted" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </div>
          <p className="text-text-secondary font-medium mb-2">Your wishlist is empty</p>
          <p className="text-sm text-text-muted mb-6">
            Tap the heart icon on any fragrance to save it here.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/products"
              className="px-6 py-3 bg-accent-primary text-white rounded-lg font-medium hover:bg-accent-primary-hover transition-colors"
            >
              Browse Fragrances
            </Link>
            <Link
              href="/quiz"
              className="px-6 py-3 border border-border-default text-text-secondary rounded-lg font-medium hover:border-border-strong transition-colors"
            >
              Take the Quiz
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="border border-border-default rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-200"
            >
              <Link href={`/products/${item.handle}`} className="block">
                <div className="aspect-square bg-surface-subtle relative overflow-hidden">
                  {item.thumbnail ? (
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-text-muted">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  {item.brand && (
                    <p className="text-xs text-text-muted uppercase tracking-wider mb-1">
                      {item.brand}
                    </p>
                  )}
                  <h3 className="font-medium text-text-primary line-clamp-2">{item.title}</h3>
                  {item.family && (
                    <p className="text-xs text-text-muted mt-1">{item.family}</p>
                  )}
                </div>
              </Link>
              <div className="px-4 pb-4">
                <button
                  onClick={() => removeItem(item.id)}
                  className="w-full py-2 text-sm text-text-muted hover:text-error border border-border-default hover:border-error rounded-lg transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
