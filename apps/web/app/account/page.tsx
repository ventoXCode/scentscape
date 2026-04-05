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
      <h1 className="text-2xl font-bold mb-8">
        Welcome, {customer.first_name}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/account/orders"
          className="p-6 border rounded-lg hover:border-black transition-colors"
        >
          <h3 className="font-semibold mb-2">Order History</h3>
          <p className="text-sm text-gray-600">View past orders and tracking</p>
        </Link>

        <Link
          href="/account/wishlist"
          className="p-6 border rounded-lg hover:border-black transition-colors"
        >
          <h3 className="font-semibold mb-2">Wishlist</h3>
          <p className="text-sm text-gray-600">Saved fragrances for later</p>
        </Link>

        <Link
          href="/account/profile"
          className="p-6 border rounded-lg hover:border-black transition-colors"
        >
          <h3 className="font-semibold mb-2">Profile Settings</h3>
          <p className="text-sm text-gray-600">Update your information</p>
        </Link>
      </div>
    </div>
  );
}
