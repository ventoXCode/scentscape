"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useCart } from "@/components/providers";
import { useWishlist } from "@/lib/wishlist/context";
import { SearchBar } from "@/components/search/search-bar";
import { useState, useTransition, useEffect } from "react";
import { logout } from "@/lib/medusa/auth-actions";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "@/lib/theme/context";

const CartDrawer = dynamic(
  () => import("@/components/cart/cart-drawer").then((mod) => mod.CartDrawer),
  { ssr: false }
);

interface HeaderProps {
  customer?: { first_name?: string | null; email?: string | null } | null;
}

export function Header({ customer }: HeaderProps) {
  const { cart, cartOpen, setCartOpen } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { resolvedTheme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const itemCount =
    cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  // Close mobile menu on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    startTransition(async () => {
      await logout();
      router.push("/");
      router.refresh();
    });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border-default bg-surface-elevated">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-xl font-semibold flex-shrink-0 text-text-primary"
        >
          ScentScape
        </Link>

        {/* Desktop search */}
        <div className="hidden md:block flex-1 max-w-sm">
          <SearchBar />
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/products"
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            Shop
          </Link>
          <Link
            href="/collections"
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            Collections
          </Link>
          <Link
            href="/explore"
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            Explore
          </Link>
          <Link
            href="/moods"
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            Moods
          </Link>
          <Link
            href="/learn"
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            Learn
          </Link>
          <Link
            href="/quiz"
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            Find Your Scent
          </Link>

          {customer ? (
            <>
              <Link href="/account" className="hover:underline">
                {customer.first_name ?? "Account"}
              </Link>
              <button
                onClick={handleLogout}
                disabled={isPending}
                className="text-text-muted hover:text-text-primary disabled:opacity-50 transition-colors"
              >
                {isPending ? "Signing out..." : "Sign Out"}
              </button>
            </>
          ) : (
            <Link href="/login">Sign In</Link>
          )}

          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="text-text-secondary hover:text-text-primary transition-colors"
            aria-label={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {resolvedTheme === "dark" ? (
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
            )}
          </button>

          <Link
            href="/account/wishlist"
            className="relative text-text-secondary hover:text-accent-secondary transition-colors"
            aria-label={`Wishlist${wishlistCount > 0 ? ` (${wishlistCount} items)` : ""}`}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent-secondary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          <button
            onClick={() => setCartOpen(true)}
            className="relative text-text-secondary hover:text-text-primary transition-colors"
          >
            Cart
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-text-primary text-text-inverse text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 md:hidden">
          <Link
            href="/account/wishlist"
            className="relative text-text-secondary hover:text-accent-secondary transition-colors"
            aria-label={`Wishlist${wishlistCount > 0 ? ` (${wishlistCount} items)` : ""}`}
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-accent-secondary text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          <button
            onClick={() => setCartOpen(true)}
            className="relative text-text-secondary hover:text-text-primary transition-colors"
            aria-label="Open cart"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-text-primary text-text-inverse text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="text-text-secondary hover:text-text-primary transition-colors p-1"
            aria-label={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {resolvedTheme === "dark" ? (
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            className="text-text-secondary hover:text-text-primary transition-colors p-1"
          >
            {mobileMenuOpen ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-smooth ${mobileMenuOpen ? "max-h-96" : "max-h-0"}`}
      >
        <div className="container mx-auto px-4 pb-4 space-y-4">
          {/* Mobile search */}
          <div>
            <SearchBar />
          </div>

          {/* Mobile nav links */}
          <nav className="flex flex-col gap-1">
            <Link
              href="/quiz"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-accent-primary font-medium hover:bg-surface-subtle transition-colors"
            >
              Find Your Scent
            </Link>
            <Link
              href="/products"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:bg-surface-subtle hover:text-text-primary transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/collections"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:bg-surface-subtle hover:text-text-primary transition-colors"
            >
              Collections
            </Link>
            <Link
              href="/explore"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:bg-surface-subtle hover:text-text-primary transition-colors"
            >
              Explore
            </Link>
            <Link
              href="/moods"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:bg-surface-subtle hover:text-text-primary transition-colors"
            >
              Moods
            </Link>
            <Link
              href="/learn"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:bg-surface-subtle hover:text-text-primary transition-colors"
            >
              Learn
            </Link>

            <div className="border-t border-border-default my-1" />

            {customer ? (
              <>
                <Link
                  href="/account"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:bg-surface-subtle hover:text-text-primary transition-colors"
                >
                  {customer.first_name ?? "Account"}
                </Link>
                <button
                  onClick={handleLogout}
                  disabled={isPending}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-muted hover:bg-surface-subtle hover:text-text-primary disabled:opacity-50 transition-colors text-left"
                >
                  {isPending ? "Signing out..." : "Sign Out"}
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:bg-surface-subtle hover:text-text-primary transition-colors"
              >
                Sign In
              </Link>
            )}
          </nav>
        </div>
      </div>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}
