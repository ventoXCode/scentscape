import { redirect } from "next/navigation";
import { getCustomer } from "@/lib/medusa/auth-actions";
import Link from "next/link";

export default async function WishlistPage() {
  const customer = await getCustomer();

  if (!customer) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/account" className="text-text-muted hover:text-text-primary">
          &larr; Account
        </Link>
        <h1 className="text-2xl font-bold font-display">Wishlist</h1>
      </div>

      <div className="text-center py-16 text-text-muted">
        <p className="mb-2 font-medium">Wishlist coming soon</p>
        <p className="text-sm mb-6">
          Save fragrances to your wishlist and come back to them later.
          <br />
          This feature will be available in the next update.
        </p>
        <Link
          href="/products"
          className="inline-block px-8 py-3 bg-text-primary text-text-inverse rounded-lg"
        >
          Browse Fragrances
        </Link>
      </div>
    </div>
  );
}
