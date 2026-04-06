"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface RecentlyViewedItem {
  id: string;
  handle: string;
  title: string;
  thumbnail: string | null;
  brand: string | null;
  family: string | null;
  concentration: string | null;
  viewedAt: number;
}

interface RecentlyViewedContextType {
  items: RecentlyViewedItem[];
  recordView: (item: Omit<RecentlyViewedItem, "viewedAt">) => void;
  count: number;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType>({
  items: [],
  recordView: () => {},
  count: 0,
});

const STORAGE_KEY = "scentscape-recently-viewed";
const MAX_ITEMS = 20;

export function RecentlyViewedProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<RecentlyViewedItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {
      // Corrupted or unavailable localStorage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, hydrated]);

  const recordView = useCallback((item: Omit<RecentlyViewedItem, "viewedAt">) => {
    setItems((prev) => {
      const filtered = prev.filter((i) => i.id !== item.id);
      return [{ ...item, viewedAt: Date.now() }, ...filtered].slice(0, MAX_ITEMS);
    });
  }, []);

  return (
    <RecentlyViewedContext.Provider value={{ items, recordView, count: items.length }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  return useContext(RecentlyViewedContext);
}
