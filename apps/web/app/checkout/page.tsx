export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { getOrCreateCart } from "@/lib/medusa/actions";
import dynamic_ from "next/dynamic";
import { OrderSummary } from "@/components/checkout/order-summary";

const CheckoutForm = dynamic_(
  () =>
    import("@/components/checkout/checkout-form").then(
      (mod) => mod.CheckoutForm
    ),
  {
    loading: () => (
      <div className="space-y-6 animate-pulse">
        <div className="h-10 bg-surface-subtle rounded-lg" />
        <div className="h-48 bg-surface-subtle rounded-lg" />
        <div className="h-12 bg-surface-subtle rounded-lg" />
      </div>
    ),
  }
);

export default async function CheckoutPage() {
  const cart = await getOrCreateCart();

  if (!cart.items?.length) {
    redirect("/");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold font-display mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order summary first on mobile so users see what they're paying for */}
        <div className="lg:hidden">
          <OrderSummary cart={cart} />
        </div>
        <div className="lg:col-span-2">
          <CheckoutForm cart={cart} />
        </div>
        <div className="hidden lg:block">
          <OrderSummary cart={cart} />
        </div>
      </div>
    </div>
  );
}
