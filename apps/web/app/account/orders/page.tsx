export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { getCustomer, getAuthToken } from "@/lib/medusa/auth-actions";
import { medusa } from "@/lib/medusa/client";
import { formatPrice } from "@/lib/utils/format";
import Link from "next/link";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function OrdersPage() {
  const customer = await getCustomer();

  if (!customer) {
    redirect("/login");
  }

  const token = await getAuthToken();

  let orders: any[] = [];
  try {
    const result = await medusa.store.order.list(
      {},
      { Authorization: `Bearer ${token}` }
    );
    orders = result.orders ?? [];
  } catch {
    orders = [];
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/account" className="text-text-muted hover:text-text-primary">
          &larr; Account
        </Link>
        <h1 className="text-2xl font-bold font-display">Order History</h1>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-3xl mb-3" aria-hidden="true">🛍️</p>
          <p className="text-text-secondary mb-2 font-medium">You haven&apos;t placed any orders yet.</p>
          <p className="text-text-muted text-sm mb-6">Not sure where to start? Take the quiz or explore our sample kits.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/quiz"
              className="px-5 py-2.5 bg-accent-primary text-text-inverse rounded-lg text-sm font-medium hover:bg-accent-primary-hover transition-colors"
            >
              Take the Quiz
            </Link>
            <Link
              href="/samples"
              className="px-5 py-2.5 bg-text-primary text-text-inverse rounded-lg text-sm font-medium hover:bg-text-secondary transition-colors"
            >
              Try Sample Kits
            </Link>
            <Link href="/products" className="text-sm text-text-secondary hover:text-text-primary transition-colors underline">
              Browse Fragrances
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order: any) => (
            <div key={order.id} className="border border-border-default rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-semibold">Order #{order.display_id}</p>
                  <p className="text-sm text-text-muted">
                    {formatDate(order.created_at)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{formatPrice(order.total)}</p>
                  <span className="inline-block mt-1 px-2 py-1 text-xs rounded bg-surface-subtle text-text-secondary capitalize">
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                {order.items?.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm text-text-secondary"
                  >
                    <span>
                      {item.title}{" "}
                      {item.variant?.title && (
                        <span className="text-text-muted">
                          &mdash; {item.variant.title}
                        </span>
                      )}{" "}
                      &times; {item.quantity}
                    </span>
                    <span>{formatPrice(item.unit_price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
