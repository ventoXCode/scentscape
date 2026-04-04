"use server";

import { medusa } from "./client";
import { cookies } from "next/headers";

export async function register(data: {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}) {
  // Step 1: obtain a registration JWT
  const token = await medusa.auth.register("customer", "emailpass", {
    email: data.email,
    password: data.password,
  });

  // Step 2: create the customer record using that token
  await medusa.store.customer.create(
    {
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
    },
    {},
    { Authorization: `Bearer ${token}` }
  );

  // Step 3: log the customer in to get a session token
  const sessionToken = await medusa.auth.login("customer", "emailpass", {
    email: data.email,
    password: data.password,
  });

  if (typeof sessionToken !== "string") {
    throw new Error("Authentication requires additional steps");
  }

  const cookieStore = await cookies();
  cookieStore.set("auth_token", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });

  return { success: true };
}

export async function login(email: string, password: string) {
  const result = await medusa.auth.login("customer", "emailpass", {
    email,
    password,
  });

  if (typeof result !== "string") {
    throw new Error("Authentication requires additional steps");
  }

  const cookieStore = await cookies();
  cookieStore.set("auth_token", result, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });

  return { success: true };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
  return { success: true };
}

export async function updateProfile(data: {
  first_name?: string;
  last_name?: string;
  email?: string;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) throw new Error("Not authenticated");

  const { customer } = await medusa.store.customer.update(
    data,
    {},
    { Authorization: `Bearer ${token}` }
  );

  return customer;
}

export async function getCustomer() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

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
