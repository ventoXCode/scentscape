"use server";

import { medusa } from "./client";
import { cookies } from "next/headers";

export async function getOrCreateCart() {
  const cookieStore = await cookies();
  let cartId = cookieStore.get("cart_id")?.value;

  if (!cartId) {
    const { cart } = await medusa.store.cart.create({});
    cartId = cart.id;
    cookieStore.set("cart_id", cartId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
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

  const { cart: updatedCart } = await medusa.store.cart.deleteLineItem(
    cart.id,
    lineItemId
  );

  return updatedCart;
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
