"use client";

import Link from "next/link";
import { useCart } from "@/components/providers";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { SearchBar } from "@/components/search/search-bar";
import { useState } from "react";

export function Header() {
  const { cart } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const itemCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <Link href="/" className="text-xl font-semibold flex-shrink-0">
          ScentScape
        </Link>
        <div className="flex-1 max-w-sm">
          <SearchBar />
        </div>
        <nav className="flex items-center gap-6">
          <Link href="/products">Shop</Link>
          <Link href="/collections">Collections</Link>
          <Link href="/quiz">Find Your Scent</Link>
          <button onClick={() => setCartOpen(true)} className="relative">
            Cart
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        </nav>
      </div>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}
