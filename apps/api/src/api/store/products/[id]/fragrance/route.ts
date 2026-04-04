import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { FRAGRANCE_MODULE } from "../../../../../modules/fragrance";

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
) {
  const { id } = req.params;
  const fragranceService = req.scope.resolve(FRAGRANCE_MODULE);

  const fragranceData = await fragranceService.getByProductId(id);

  if (!fragranceData) {
    return res.status(404).json({ message: "Fragrance data not found" });
  }

  res.json({ fragrance_data: fragranceData });
}
