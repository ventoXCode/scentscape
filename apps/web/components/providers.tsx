"use client";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useState, createContext, useContext, useRef, useCallback } from "react";
import { getOrCreateCart } from "@/lib/medusa/actions";
import { WishlistProvider } from "@/lib/wishlist/context";
import { SampleBoxProvider } from "@/lib/samples/context";
import { ToastProvider } from "@/components/ui/toast";
import { ThemeProvider } from "@/lib/theme/context";

type Cart = Awaited<ReturnType<typeof getOrCreateCart>>;

const CART_QUERY_KEY = ["cart"] as const;

const CartContext = createContext<{
  cart: Cart | null;
  isLoading: boolean;
  refreshCart: (updatedCart?: Cart) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
}>({
  cart: null,
  isLoading: true,
  refreshCart: () => {},
  cartOpen: false,
  setCartOpen: () => {},
});

export function useCart() {
  return useContext(CartContext);
}

function CartProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const [cartOpen, setCartOpen] = useState(false);

  const { data: cart = null, isLoading } = useQuery({
    queryKey: CART_QUERY_KEY,
    queryFn: getOrCreateCart,
    staleTime: 30_000,
    retry: false,
  });

  // Accept optional updated cart to set directly (avoids re-fetch after mutations)
  const refreshCart = useCallback(
    (updatedCart?: Cart) => {
      if (updatedCart) {
        queryClient.setQueryData(CART_QUERY_KEY, updatedCart);
      } else {
        queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
      }
    },
    [queryClient],
  );

  return (
    <CartContext.Provider
      value={{ cart, isLoading, refreshCart, cartOpen, setCartOpen }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClientRef = useRef<QueryClient | null>(null);
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: true,
          refetchOnReconnect: true,
        },
      },
    });
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <ThemeProvider>
        <CartProvider>
          <WishlistProvider>
            <SampleBoxProvider>
              <ToastProvider>{children}</ToastProvider>
            </SampleBoxProvider>
          </WishlistProvider>
        </CartProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
