import { formatPrice } from "@/lib/utils/format";

interface OrderSummaryProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cart: any;
}

export function OrderSummary({ cart }: OrderSummaryProps) {
  const items = cart.items ?? [];
  const subtotal = cart.subtotal ?? 0;
  const shippingTotal = cart.shipping_total ?? 0;
  const total = cart.total ?? 0;

  return (
    <div className="bg-surface-subtle rounded-lg p-6 sticky top-8">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

      <div className="space-y-4 mb-6">
        {items.map((item: any) => (
          <div key={item.id} className="flex gap-3">
            {item.thumbnail ? (
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-16 h-16 object-cover rounded border border-border-default bg-surface-elevated flex-shrink-0"
              />
            ) : (
              <div className="w-16 h-16 bg-surface-subtle rounded border border-border-default flex-shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm leading-tight truncate">{item.title}</p>
              {item.variant?.title && (
                <p className="text-xs text-text-muted mt-0.5">{item.variant.title}</p>
              )}
              <p className="text-xs text-text-muted mt-0.5">Qty: {item.quantity}</p>
            </div>
            <p className="text-sm font-medium flex-shrink-0">
              {formatPrice(item.unit_price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      <div className="border-t border-border-default pt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-text-secondary">Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">Shipping</span>
          <span>
            {shippingTotal > 0 ? formatPrice(shippingTotal) : "Calculated at checkout"}
          </span>
        </div>
        <div className="flex justify-between font-semibold text-base border-t border-border-default pt-2 mt-2">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
}
