"use server";

import { medusa } from "./client";

export async function setShippingAddress(cartId: string, address: {
  first_name: string;
  last_name: string;
  address_1: string;
  city: string;
  province: string;
  postal_code: string;
  country_code: string;
  phone?: string;
}) {
  const { cart } = await medusa.store.cart.update(cartId, {
    shipping_address: address,
    billing_address: address,
  });

  return cart;
}

export async function createPaymentSession(cartId: string, providerId: string) {
  // Medusa v2: retrieve the cart first, then initiate a payment session via
  // the payment collection endpoint.
  const { cart } = await medusa.store.cart.retrieve(cartId);

  const { payment_collection } = await medusa.store.payment.initiatePaymentSession(
    cart,
    { provider_id: providerId }
  );

  const paymentSession = payment_collection.payment_sessions?.find(
    (ps) => ps.provider_id === providerId
  );

  if (!paymentSession) {
    throw new Error(`Payment provider ${providerId} not available`);
  }

  return paymentSession.data as { client_secret: string };
}

export async function completeCart(cartId: string) {
  const result = await medusa.store.cart.complete(cartId);

  if (result.type === "order") {
    return result.order;
  }

  // result.type === "cart" means an error occurred
  const errorMsg = result.type === "cart" ? result.error?.message : "Failed to complete cart";
  throw new Error(errorMsg || "Failed to complete cart");
}
