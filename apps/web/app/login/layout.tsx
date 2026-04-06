import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | ScentScape",
  description: "Sign in to your ScentScape account to access your scent profile, wishlist, and order history.",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
