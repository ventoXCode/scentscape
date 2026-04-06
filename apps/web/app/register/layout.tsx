import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account | ScentScape",
  description: "Create a ScentScape account to save your scent personality, build a wishlist, and get personalized recommendations.",
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
