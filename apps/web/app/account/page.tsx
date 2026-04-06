export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { getCustomer } from "@/lib/medusa/auth-actions";
import Link from "next/link";

export default async function AccountPage() {
  const customer = await getCustomer();

  if (!customer) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-display text-2xl font-bold mb-8 text-text-primary">
        Welcome, {customer.first_name}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/account/orders"
          className="p-6 border border-border-default rounded-xl shadow-card hover:shadow-card-hover hover:border-border-strong transition-all duration-200"
        >
          <h3 className="font-semibold mb-2 text-text-primary">Order History</h3>
          <p className="text-sm text-text-secondary">View past orders and tracking</p>
        </Link>

        <Link
          href="/account/wishlist"
          className="p-6 border border-border-default rounded-xl shadow-card hover:shadow-card-hover hover:border-border-strong transition-all duration-200"
        >
          <h3 className="font-semibold mb-2 text-text-primary">Wishlist</h3>
          <p className="text-sm text-text-secondary">Saved fragrances for later</p>
        </Link>

        <Link
          href="/account/scent-profile"
          className="p-6 border border-border-default rounded-xl shadow-card hover:shadow-card-hover hover:border-border-strong transition-all duration-200"
        >
          <h3 className="font-semibold mb-2 text-text-primary">Scent Profile</h3>
          <p className="text-sm text-text-secondary">Your personality and past quiz results</p>
        </Link>

        <Link
          href="/account/profile"
          className="p-6 border border-border-default rounded-xl shadow-card hover:shadow-card-hover hover:border-border-strong transition-all duration-200"
        >
          <h3 className="font-semibold mb-2 text-text-primary">Profile Settings</h3>
          <p className="text-sm text-text-secondary">Update your information</p>
        </Link>
      </div>
    </div>
  );
}
