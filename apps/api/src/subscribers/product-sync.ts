import { SubscriberArgs, SubscriberConfig } from "@medusajs/framework";
import { MeiliSearch } from "meilisearch";
import { FRAGRANCE_MODULE } from "../modules/fragrance";

const meilisearch = new MeiliSearch({
  host: process.env.MEILISEARCH_HOST!,
  apiKey: process.env.MEILISEARCH_ADMIN_KEY!,
});

export default async function productSyncHandler({
  event,
  container,
}: SubscriberArgs<{ id: string }>) {
  const productService = container.resolve("productModuleService");
  const fragranceService = container.resolve(FRAGRANCE_MODULE);

  const product = await productService.retrieveProduct(event.data.id, {
    relations: ["variants", "variants.prices"],
  });

  const fragranceData = await fragranceService.getByProductId(product.id);

  const searchDoc = {
    id: product.id,
    handle: product.handle,
    title: product.title,
    description: product.description,
    brand: (product.metadata as any)?.brand || "",
    thumbnail: product.thumbnail,
    price: product.variants?.[0]?.prices?.[0]?.amount || 0,
    ...fragranceData,
  };

  await meilisearch.index("products").addDocuments([searchDoc]);
}

export const config: SubscriberConfig = {
  event: ["product.created", "product.updated"],
};
