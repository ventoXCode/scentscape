"use client";

import Link from "next/link";
import { useCart } from "@/components/providers";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { SearchBar } from "@/components/search/search-bar";
import { useState, useTransition } from "react";
import { logout } from "@/lib/medusa/auth-actions";
import { useRouter } from "next/navigation";

interface HeaderProps {
  customer?: { first_name?: string | null; email?: string | null } | null;
}

export function Header({ customer }: HeaderProps) {
  const { cart } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const itemCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const handleLogout = () => {
    startTransition(async () => {
      await logout();
      router.push("/");
      router.refresh();
    });
  };

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

          {customer ? (
            <>
              <Link href="/account" className="hover:underline">
                {customer.first_name ?? "Account"}
              </Link>
              <button
                onClick={handleLogout}
                disabled={isPending}
                className="text-gray-500 hover:text-black disabled:opacity-50"
              >
                {isPending ? "Signing out..." : "Sign Out"}
              </button>
            </>
          ) : (
            <Link href="/login">Sign In</Link>
          )}

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
