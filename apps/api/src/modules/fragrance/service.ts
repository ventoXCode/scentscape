import { MedusaService } from "@medusajs/framework/utils";
import { FragranceData } from "./models/fragrance-data";

export class FragranceModuleService extends MedusaService({
  FragranceData,
}) {
  async getByProductId(productId: string) {
    const data = await (this as any).listFragranceData({
      product_id: productId,
    });
    return data[0];
  }

  async getByProductIds(productIds: string[]) {
    const data = await (this as any).listFragranceData({
      product_id: productIds,
    });
    return data;
  }

  async upsertForProduct(productId: string, fragranceData: Record<string, unknown>) {
    const existing = await this.getByProductId(productId);

    if (existing) {
      return (this as any).updateFragranceData([{
        id: existing.id,
        ...fragranceData,
      }]);
    }

    return (this as any).createFragranceData([{
      product_id: productId,
      ...fragranceData,
    }]);
  }
}
