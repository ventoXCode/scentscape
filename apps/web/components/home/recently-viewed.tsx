"use client";

import { useRecentlyViewed } from "@/lib/recently-viewed/context";
import { ProductCard } from "@/components/product/product-card";
import { ScrollReveal } from "@/components/home/scroll-reveal";

export function RecentlyViewed() {
  const { items } = useRecentlyViewed();

  if (items.length === 0) return null;

  // Show up to 4 most recent items
  const displayItems = items.slice(0, 4);

  return (
    <ScrollReveal>
      <section className="py-section-sm md:py-section bg-surface-primary">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-3">
            Recently Viewed
          </h2>
          <p className="text-text-secondary text-center mb-10 max-w-lg mx-auto">
            Pick up where you left off
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {displayItems.map((item) => (
              <ProductCard
                key={item.id}
                product={{
                  id: item.id,
                  handle: item.handle,
                  title: item.title,
                  thumbnail: item.thumbnail,
                  brand: item.brand,
                  family: item.family,
                  concentration: item.concentration,
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
