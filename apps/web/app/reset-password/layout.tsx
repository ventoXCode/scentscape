import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Set New Password | ScentScape",
  description: "Set a new password for your ScentScape account.",
};

export default function ResetPasswordLayout({ children }: { children: React.ReactNode }) {
  return children;
}
