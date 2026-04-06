"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, createContext, useContext, useEffect, useRef } from "react";
import { getOrCreateCart } from "@/lib/medusa/actions";
import { WishlistProvider } from "@/lib/wishlist/context";
import { SampleBoxProvider } from "@/lib/samples/context";
import { ToastProvider } from "@/components/ui/toast";

type Cart = Awaited<ReturnType<typeof getOrCreateCart>>;

const CartContext = createContext<{
  cart: Cart | null;
  refreshCart: () => Promise<void>;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
}>({
  cart: null,
  refreshCart: async () => {},
  cartOpen: false,
  setCartOpen: () => {},
});

export function useCart() {
  return useContext(CartContext);
}

export function Providers({ children }: { children: React.ReactNode }) {
  // Per-instance QueryClient avoids shared state across SSR requests
  const queryClientRef = useRef<QueryClient | null>(null);
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  const [cart, setCart] = useState<Cart | null>(null);
  const [cartOpen, setCartOpen] = useState(false);

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
    <QueryClientProvider client={queryClientRef.current}>
      <CartContext.Provider value={{ cart, refreshCart, cartOpen, setCartOpen }}>
        <WishlistProvider>
          <SampleBoxProvider>
            <ToastProvider>{children}</ToastProvider>
          </SampleBoxProvider>
        </WishlistProvider>
      </CartContext.Provider>
    </QueryClientProvider>
  );
}
