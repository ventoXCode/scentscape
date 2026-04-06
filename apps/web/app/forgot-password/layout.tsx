import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password | ScentScape",
  description: "Reset your ScentScape account password.",
};

export default function ForgotPasswordLayout({ children }: { children: React.ReactNode }) {
  return children;
}
