import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { REVIEW_MODULE } from "../../../../../modules/review";

// GET /store/products/:id/reviews — public, returns reviews + aggregate stats
export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const { id } = req.params;

  const reviewService = req.scope.resolve(REVIEW_MODULE);

  const [reviews, aggregate] = await Promise.all([
    reviewService.listByProductId(id),
    reviewService.getAggregateByProductId(id),
  ]);

  res.json({ reviews, ...aggregate });
}
