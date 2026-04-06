import { MedusaService } from "@medusajs/framework/utils";
import { Review } from "./models/review";

export class ReviewModuleService extends MedusaService({
  Review,
}) {
  async listByProductId(productId: string) {
    return (this as any).listReviews(
      { product_id: productId, status: "approved" },
      { order: { created_at: "DESC" } }
    );
  }

  async getAggregateByProductId(productId: string) {
    const reviews = await (this as any).listReviews({
      product_id: productId,
      status: "approved",
    });

    if (!reviews || reviews.length === 0) {
      return { averageRating: 0, reviewCount: 0, distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } };
    }

    const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    let total = 0;
    for (const review of reviews) {
      total += review.rating;
      distribution[review.rating] = (distribution[review.rating] || 0) + 1;
    }

    return {
      averageRating: Math.round((total / reviews.length) * 10) / 10,
      reviewCount: reviews.length,
      distribution,
    };
  }

  async getByCustomerAndProduct(customerId: string, productId: string) {
    const reviews = await (this as any).listReviews({
      customer_id: customerId,
      product_id: productId,
    });
    return reviews[0] ?? null;
  }
}
