import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { REVIEW_MODULE } from "../../../modules/review";

// POST /store/reviews — authenticated, creates a review
export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const customerId = (req as any).auth_context?.actor_id;
  if (!customerId) {
    return res.status(401).json({ message: "Authentication required to submit a review" });
  }

  const reviewService = req.scope.resolve(REVIEW_MODULE);

  const { product_id, rating, title, body } = req.body as Record<string, unknown>;

  if (!product_id || !rating) {
    return res.status(400).json({ message: "Missing required fields: product_id, rating" });
  }

  const numRating = Number(rating);
  if (!Number.isInteger(numRating) || numRating < 1 || numRating > 5) {
    return res.status(400).json({ message: "Rating must be an integer between 1 and 5" });
  }

  // One review per customer per product
  const existing = await reviewService.getByCustomerAndProduct(customerId, product_id as string);
  if (existing) {
    return res.status(409).json({ message: "You have already reviewed this product" });
  }

  const [review] = await (reviewService as any).createReviews([
    {
      product_id,
      customer_id: customerId,
      rating: numRating,
      title: title ? String(title).slice(0, 200) : null,
      body: body ? String(body).slice(0, 2000) : null,
      status: "approved",
    },
  ]);

  res.status(201).json({ review });
}
