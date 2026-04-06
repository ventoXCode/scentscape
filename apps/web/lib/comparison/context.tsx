"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface CompareItem {
  id: string;
  handle: string;
  title: string;
  thumbnail: string | null;
  brand: string | null;
  family: string | null;
}

interface ComparisonContextType {
  items: CompareItem[];
  addItem: (item: CompareItem) => boolean;
  removeItem: (productId: string) => void;
  clearAll: () => void;
  isInComparison: (productId: string) => boolean;
  isFull: boolean;
  count: number;
}

const MAX_COMPARE = 4;

const ComparisonContext = createContext<ComparisonContextType>({
  items: [],
  addItem: () => false,
  removeItem: () => {},
  clearAll: () => {},
  isInComparison: () => false,
  isFull: false,
  count: 0,
});

const STORAGE_KEY = "scentscape-comparison";

export function ComparisonProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CompareItem[]>([]);
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

  const addItem = useCallback((item: CompareItem): boolean => {
    let added = false;
    setItems((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev;
      if (prev.length >= MAX_COMPARE) return prev;
      added = true;
      return [...prev, item];
    });
    return added;
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== productId));
  }, []);

  const clearAll = useCallback(() => {
    setItems([]);
  }, []);

  const isInComparison = useCallback(
    (productId: string) => items.some((i) => i.id === productId),
    [items]
  );

  return (
    <ComparisonContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearAll,
        isInComparison,
        isFull: items.length >= MAX_COMPARE,
        count: items.length,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
}

export function useComparison() {
  return useContext(ComparisonContext);
}
