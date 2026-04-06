import { ExecArgs } from "@medusajs/framework/types";
import { Modules } from "@medusajs/framework/utils";
import { FRAGRANCE_MODULE } from "../modules/fragrance";
import { FragranceModuleService } from "../modules/fragrance/service";
import { SEED_FRAGRANCES } from "./seed-data";

export default async function seedFragrances({ container }: ExecArgs) {
  const productService = container.resolve(Modules.PRODUCT);
  const fragranceService: FragranceModuleService = container.resolve(FRAGRANCE_MODULE);

  console.log(`Seeding ${SEED_FRAGRANCES.length} fragrances...`);

  let created = 0;
  let skipped = 0;

  for (const item of SEED_FRAGRANCES) {
    const handle = item.title
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // strip accents
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    // Skip if product already exists
    const existing = await productService.listProducts({ handle });
    if (existing.length > 0) {
      console.log(`  Skipped (exists): ${item.brand} — ${item.title}`);
      skipped++;
      continue;
    }

    const product = await productService.createProducts({
      title: item.title,
      description: item.description,
      handle,
      status: "published",
      thumbnail: item.thumbnail ?? undefined,
      images: item.images?.length
        ? item.images.map((url) => ({ url }))
        : undefined,
      options: [{ title: "Size", values: item.variants.map((v) => v.title) }],
      variants: item.variants.map((v) => ({
        title: v.title,
        prices: [{ amount: v.price, currency_code: "usd" }],
        options: { Size: v.title },
      })),
      metadata: { brand: item.brand },
    });

    await fragranceService.upsertForProduct(product.id, item.fragrance);

    console.log(`  Seeded: ${item.brand} — ${item.title}`);
    created++;
  }

  console.log(
    `\nDone. Created: ${created}, Skipped: ${skipped}, Total: ${SEED_FRAGRANCES.length}`
  );
}
