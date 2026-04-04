import { medusa } from "@/lib/medusa/client";

interface SuccessPageProps {
  searchParams: Promise<{ order_id?: string }>;
}

export default async function CheckoutSuccessPage({ searchParams }: SuccessPageProps) {
  const { order_id } = await searchParams;

  if (!order_id) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
        <p className="text-gray-600">Order not found.</p>
        <a href="/" className="inline-block mt-4 px-8 py-3 bg-black text-white rounded">
          Return Home
        </a>
      </div>
    );
  }

  const { order } = await medusa.store.order.retrieve(order_id);

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount / 100);

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg
          className="w-8 h-8 text-green-600"
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

      <h1 className="text-2xl font-bold mb-2">Thank you for your order!</h1>
      <p className="text-gray-600 mb-8">
        Order #{order.display_id} has been confirmed
      </p>

      <div className="bg-gray-50 rounded-lg p-6 text-left">
        <h3 className="font-semibold mb-4">Order Summary</h3>
        {order.items?.map((item: any) => (
          <div key={item.id} className="flex justify-between py-2 border-b last:border-b-0">
            <span>
              {item.title} &times; {item.quantity}
            </span>
            <span>{formatPrice(item.unit_price * item.quantity)}</span>
          </div>
        ))}
        <div className="flex justify-between pt-4 font-semibold border-t mt-2">
          <span>Total</span>
          <span>{formatPrice(order.total)}</span>
        </div>
      </div>

      {order.shipping_address && (
        <div className="bg-gray-50 rounded-lg p-6 text-left mt-4">
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

      <a
        href="/"
        className="inline-block mt-8 px-8 py-3 bg-black text-white rounded hover:bg-gray-800 transition-colors"
      >
        Continue Shopping
      </a>
    </div>
  );
}
