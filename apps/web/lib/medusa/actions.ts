"use server";

import { medusa } from "./client";
import { cookies } from "next/headers";
import { CART_COOKIE_NAME, AUTH_COOKIE_OPTIONS } from "@/lib/constants";

export async function getOrCreateCart() {
  const cookieStore = await cookies();
  const cartId = cookieStore.get(CART_COOKIE_NAME)?.value;

  if (!cartId) {
    const { cart } = await medusa.store.cart.create({});
    cookieStore.set(CART_COOKIE_NAME, cart.id, AUTH_COOKIE_OPTIONS);
    return cart;
  }

  const { cart } = await medusa.store.cart.retrieve(cartId);
  return cart;
}

export async function addToCart(variantId: string, quantity: number = 1) {
  const cart = await getOrCreateCart();

  const { cart: updatedCart } = await medusa.store.cart.createLineItem(cart.id, {
    variant_id: variantId,
    quantity,
  });

  return updatedCart;
}

export async function removeFromCart(lineItemId: string) {
  const cart = await getOrCreateCart();

  const result = await medusa.store.cart.deleteLineItem(cart.id, lineItemId);

  if (result.parent) {
    return result.parent;
  }

  // Fallback: re-fetch cart if parent is absent
  const { cart: refreshed } = await medusa.store.cart.retrieve(cart.id);
  return refreshed;
}

export async function updateCartItem(lineItemId: string, quantity: number) {
  const cart = await getOrCreateCart();

  const { cart: updatedCart } = await medusa.store.cart.updateLineItem(
    cart.id,
    lineItemId,
    { quantity }
  );

  return updatedCart;
}
