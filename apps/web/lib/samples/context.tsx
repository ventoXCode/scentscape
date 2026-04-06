"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { MAX_SAMPLES } from "./config";

export interface SampleItem {
  id: string;
  handle: string;
  title: string;
  brand: string;
  thumbnail: string | null;
  family: string | null;
}

interface SampleBoxContextType {
  items: SampleItem[];
  addItem: (item: SampleItem) => boolean;
  removeItem: (productId: string) => void;
  clearBox: () => void;
  isInBox: (productId: string) => boolean;
  isFull: boolean;
  count: number;
}

const SampleBoxContext = createContext<SampleBoxContextType>({
  items: [],
  addItem: () => false,
  removeItem: () => {},
  clearBox: () => {},
  isInBox: () => false,
  isFull: false,
  count: 0,
});

const STORAGE_KEY = "scentscape-sample-box";

export function SampleBoxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<SampleItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {
      // Corrupted or unavailable localStorage
    }
    setHydrated(true);
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, hydrated]);

  const addItem = useCallback(
    (item: SampleItem): boolean => {
      let added = false;
      setItems((prev) => {
        if (prev.some((i) => i.id === item.id)) return prev;
        if (prev.length >= MAX_SAMPLES) return prev;
        added = true;
        return [...prev, item];
      });
      return added;
    },
    [],
  );

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== productId));
  }, []);

  const clearBox = useCallback(() => {
    setItems([]);
  }, []);

  const isInBox = useCallback(
    (productId: string) => items.some((i) => i.id === productId),
    [items],
  );

  return (
    <SampleBoxContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearBox,
        isInBox,
        isFull: items.length >= MAX_SAMPLES,
        count: items.length,
      }}
    >
      {children}
    </SampleBoxContext.Provider>
  );
}

export function useSampleBox() {
  return useContext(SampleBoxContext);
}
