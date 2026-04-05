export const CART_COOKIE_NAME = "cart_id";
export const AUTH_COOKIE_NAME = "auth_token";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://scentscape.com";

export const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 60 * 60 * 24 * 7, // 1 week
};
