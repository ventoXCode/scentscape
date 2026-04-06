import type { HttpTypes } from "@medusajs/types";

/**
 * Medusa v2 API returns `prices` on variants via the pricing module,
 * but @medusajs/types only declares `calculated_price`. This extension
 * reflects the actual store API response shape.
 */
export interface StoreProductVariantWithPrices
  extends HttpTypes.StoreProductVariant {
  prices?: Array<{ amount: number; currency_code: string }>;
}

export interface StoreProductWithPrices
  extends Omit<HttpTypes.StoreProduct, "variants"> {
  variants: StoreProductVariantWithPrices[] | null;
}
