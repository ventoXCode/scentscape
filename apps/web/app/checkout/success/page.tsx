export const dynamic = "force-dynamic";

import { medusa } from "@/lib/medusa/client";
import { completeCart } from "@/lib/medusa/checkout-actions";
import { formatPrice } from "@/lib/utils/format";
import { cookies } from "next/headers";
import Link from "next/link";

interface SuccessPageProps {
  searchParams: Promise<{ order_id?: string; cart_id?: string }>;
}

export default async function CheckoutSuccessPage({ searchParams }: SuccessPageProps) {
  const { order_id, cart_id } = await searchParams;

  let resolvedOrderId = order_id;

  // Stripe redirect passes cart_id — complete the cart to get the order
  if (!resolvedOrderId && cart_id) {
    try {
      const order = await completeCart(cart_id);
      resolvedOrderId = order.id;
    } catch {
      // Cart may already be completed or invalid
    }
  }

  if (!resolvedOrderId) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
        <p className="text-3xl mb-3" aria-hidden="true">📦</p>
        <h1 className="text-xl font-display font-bold text-text-primary mb-2">We couldn&apos;t find your order</h1>
        <p className="text-sm text-text-muted mb-6">
          If you just completed a payment, your order may still be processing. Check your email for a confirmation from Stripe.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/account/orders" className="px-6 py-3 bg-text-primary text-text-inverse rounded-lg font-medium hover:bg-text-secondary transition-colors">
            View Order History
          </Link>
          <Link href="/" className="text-sm text-text-secondary hover:text-text-primary transition-colors underline">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  // Clear cart cookie after successful checkout
  const cookieStore = await cookies();
  cookieStore.delete("cart_id");

  const { order } = await medusa.store.order.retrieve(resolvedOrderId);

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
      <div className="w-16 h-16 bg-success-subtle rounded-full flex items-center justify-center mx-auto mb-6">
        <svg
          className="w-8 h-8 text-success"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h1 className="text-2xl font-bold font-display mb-2">Thank you for your order!</h1>
      <p className="text-text-secondary mb-8">
        Order #{order.display_id} has been confirmed
      </p>

      <div className="bg-surface-subtle rounded-lg p-6 text-left">
        <h3 className="font-semibold mb-4">Order Summary</h3>
        {order.items?.map((item: any) => (
          <div key={item.id} className="flex justify-between py-2 border-b border-border-default last:border-b-0">
            <span>
              {item.title} &times; {item.quantity}
            </span>
            <span>{formatPrice(item.unit_price * item.quantity)}</span>
          </div>
        ))}
        <div className="flex justify-between pt-4 font-semibold border-t border-border-default mt-2">
          <span>Total</span>
          <span>{formatPrice(order.total)}</span>
        </div>
      </div>

      {order.shipping_address && (
        <div className="bg-surface-subtle rounded-lg p-6 text-left mt-4">
          <h3 className="font-semibold mb-2">Shipping to</h3>
          <p>
            {order.shipping_address.first_name} {order.shipping_address.last_name}
          </p>
          <p>{order.shipping_address.address_1}</p>
          <p>
            {order.shipping_address.city}, {order.shipping_address.province}{" "}
            {order.shipping_address.postal_code}
          </p>
        </div>
      )}

      <Link
        href="/"
        className="inline-block mt-8 px-8 py-3 bg-text-primary text-text-inverse rounded-lg hover:bg-text-secondary transition-colors"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
