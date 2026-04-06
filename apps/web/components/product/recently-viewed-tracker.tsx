"use client";

import { useEffect } from "react";
import { useRecentlyViewed } from "@/lib/recently-viewed/context";

interface RecentlyViewedTrackerProps {
  product: {
    id: string;
    handle: string;
    title: string;
    thumbnail: string | null;
    brand: string | null;
    family: string | null;
    concentration: string | null;
  };
}

export function RecentlyViewedTracker({ product }: RecentlyViewedTrackerProps) {
  const { recordView } = useRecentlyViewed();

  useEffect(() => {
    recordView(product);
    // Only track on mount — product.id is the stable key
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id]);

  return null;
}
