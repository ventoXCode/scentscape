import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Account | ScentScape",
  description: "Manage your ScentScape account, orders, wishlist, and scent profile.",
  robots: { index: false },
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return children;
}
