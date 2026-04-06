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
}): Promise<{ success: true } | { success: false; error: string; redirect?: string }> {
  // Step 1: Create auth identity
  let token: string;
  try {
    token = await medusa.auth.register(AUTH_ACTOR, AUTH_PROVIDER, {
      email: data.email,
      password: data.password,
    });
  } catch {
    return { success: false, error: "An account with this email already exists. Try signing in instead.", redirect: "/login" };
  }

  // Step 2: Create customer record (auth identity already exists if this fails)
  try {
    await medusa.store.customer.create(
      {
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
      },
      {},
      { Authorization: `Bearer ${token}` }
    );
  } catch {
    return { success: false, error: "Account setup incomplete. Please try signing in, or contact support if the issue persists." };
  }

  // Step 3: Log in — account is fully created, only session setup can fail
  try {
    const sessionToken = await medusa.auth.login(AUTH_ACTOR, AUTH_PROVIDER, {
      email: data.email,
      password: data.password,
    });

    if (typeof sessionToken !== "string") {
      return { success: false, error: "Account created successfully! Please sign in to continue.", redirect: "/login" };
    }

    await setAuthCookie(sessionToken);
    await transferGuestCart(sessionToken);
    return { success: true };
  } catch {
    // Account exists and is valid — just couldn't auto-login
    return { success: false, error: "Account created successfully! Please sign in to continue.", redirect: "/login" };
  }
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

export async function requestPasswordReset(email: string): Promise<{ success: boolean }> {
  try {
    await medusa.auth.resetPassword(AUTH_ACTOR, AUTH_PROVIDER, {
      identifier: email,
    });
  } catch {
    // Always return success to avoid email enumeration
  }
  return { success: true };
}

export async function resetPassword(token: string, newPassword: string): Promise<{ success: true } | { success: false; error: string }> {
  try {
    await medusa.auth.updateProvider(AUTH_ACTOR, AUTH_PROVIDER, {
      password: newPassword,
    }, token);
    return { success: true };
  } catch {
    return { success: false, error: "This reset link has expired or is invalid. Please request a new one." };
  }
}

export async function changePassword(currentPassword: string, newPassword: string): Promise<{ success: true } | { success: false; error: string }> {
  const token = await getAuthToken();
  if (!token) return { success: false, error: "Not authenticated" };

  // Verify current password by attempting login
  const customer = await getCustomer();
  if (!customer?.email) return { success: false, error: "Not authenticated" };

  try {
    await medusa.auth.login(AUTH_ACTOR, AUTH_PROVIDER, {
      email: customer.email,
      password: currentPassword,
    });
  } catch {
    return { success: false, error: "Current password is incorrect." };
  }

  // Use the reset flow to set new password — re-authenticate with the reset token approach
  try {
    await medusa.auth.updateProvider(AUTH_ACTOR, AUTH_PROVIDER, {
      password: newPassword,
    }, token);
    return { success: true };
  } catch {
    return { success: false, error: "Failed to update password. Please try again." };
  }
}
