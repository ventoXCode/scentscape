import { MedusaService } from "@medusajs/framework/utils";
import { FragranceData } from "./models/fragrance-data";

export class FragranceModuleService extends MedusaService({
  FragranceData,
}) {
  async getByProductId(productId: string) {
    const [data] = await this.listFragranceDatas({
      filters: { product_id: productId },
    });
    return data;
  }

  async getByProductIds(productIds: string[]) {
    const data = await this.listFragranceDatas({
      filters: { product_id: productIds },
    });
    return data;
  }

  async upsertForProduct(productId: string, fragranceData: Record<string, unknown>) {
    const existing = await this.getByProductId(productId);

    if (existing) {
      return this.updateFragranceDatas([{
        id: existing.id,
        ...fragranceData,
      }]);
    }

    return this.createFragranceDatas([{
      product_id: productId,
      ...fragranceData,
    }]);
  }
}
