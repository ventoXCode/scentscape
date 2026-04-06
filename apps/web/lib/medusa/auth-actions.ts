"use server";

import { medusa } from "./client";
import { cookies } from "next/headers";
import {
  AUTH_COOKIE_NAME,
  AUTH_COOKIE_OPTIONS,
  CART_COOKIE_NAME,
} from "@/lib/constants";

const AUTH_ACTOR = "customer";
const AUTH_PROVIDER = "emailpass";

export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_COOKIE_NAME)?.value ?? null;
}

async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, token, AUTH_COOKIE_OPTIONS);
}

// Associate an existing guest cart with the newly authenticated customer
async function transferGuestCart(token: string) {
  const cookieStore = await cookies();
  const cartId = cookieStore.get(CART_COOKIE_NAME)?.value;
  if (!cartId) return;

  try {
    await medusa.store.cart.transferCart(
      cartId,
      {},
      { Authorization: `Bearer ${token}` }
    );
  } catch {
    // Cart may already belong to this customer or be invalid — safe to ignore
  }
}

export async function register(data: {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}) {
  const token = await medusa.auth.register(AUTH_ACTOR, AUTH_PROVIDER, {
    email: data.email,
    password: data.password,
  });

  await medusa.store.customer.create(
    {
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
    },
    {},
    { Authorization: `Bearer ${token}` }
  );

  const sessionToken = await medusa.auth.login(AUTH_ACTOR, AUTH_PROVIDER, {
    email: data.email,
    password: data.password,
  });

  if (typeof sessionToken !== "string") {
    throw new Error("Authentication requires additional steps");
  }

  await setAuthCookie(sessionToken);
  await transferGuestCart(sessionToken);
  return { success: true };
}

export async function login(email: string, password: string) {
  const result = await medusa.auth.login(AUTH_ACTOR, AUTH_PROVIDER, {
    email,
    password,
  });

  if (typeof result !== "string") {
    throw new Error("Authentication requires additional steps");
  }

  await setAuthCookie(result);
  await transferGuestCart(result);
  return { success: true };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
  return { success: true };
}

export async function updateProfile(data: {
  first_name?: string;
  last_name?: string;
  email?: string;
}) {
  const token = await getAuthToken();
  if (!token) throw new Error("Not authenticated");

  const { customer } = await medusa.store.customer.update(
    data,
    {},
    { Authorization: `Bearer ${token}` }
  );

  return customer;
}

export async function getCustomer() {
  const token = await getAuthToken();
  if (!token) return null;

  try {
    const { customer } = await medusa.store.customer.retrieve(
      {},
      { Authorization: `Bearer ${token}` }
    );
    return customer;
  } catch {
    return null;
  }
}
