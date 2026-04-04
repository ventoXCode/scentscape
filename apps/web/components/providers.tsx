"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, createContext, useContext, useEffect } from "react";
import { getOrCreateCart } from "@/lib/medusa/actions";

const queryClient = new QueryClient();

type Cart = Awaited<ReturnType<typeof getOrCreateCart>>;

const CartContext = createContext<{
  cart: Cart | null;
  refreshCart: () => Promise<void>;
}>({
  cart: null,
  refreshCart: async () => {},
});

export function useCart() {
  return useContext(CartContext);
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);

  const refreshCart = async () => {
    try {
      const cart = await getOrCreateCart();
      setCart(cart);
    } catch {
      // Backend may not be available; silently ignore
    }
  };

  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <CartContext.Provider value={{ cart, refreshCart }}>
        {children}
      </CartContext.Provider>
    </QueryClientProvider>
  );
}
