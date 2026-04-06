import { MetadataRoute } from "next";
import { medusa } from "@/lib/medusa/client";
import { COLLECTIONS } from "@/lib/collections";
import { FRAGRANCE_FAMILIES } from "@/lib/learn/families";
import { SITE_URL } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL;

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/products`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/quiz`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/learn`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/learn/fragrance-101`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/learn/how-to-apply`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/learn/families`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/learn/glossary`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];

  // Learn: fragrance family pages
  const familyPages: MetadataRoute.Sitemap = FRAGRANCE_FAMILIES.map((family) => ({
    url: `${baseUrl}/learn/families/${family.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Collection pages
  const collectionPages: MetadataRoute.Sitemap = COLLECTIONS.map((collection) => ({
    url: `${baseUrl}/collections/${collection.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Product pages
  let products: any[] = [];
  try {
    const result = await medusa.store.product.list({ limit: 1000 });
    products = result.products || [];
  } catch {
    // Backend unavailable at build time; return static pages only
  }

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/products/${product.handle}`,
    lastModified: new Date(product.updated_at || product.created_at),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...familyPages, ...collectionPages, ...productPages];
}
