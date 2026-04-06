import { MetadataRoute } from "next";
import { medusa } from "@/lib/medusa/client";
import { COLLECTIONS } from "@/lib/collections";
import { FRAGRANCE_FAMILIES } from "@/lib/learn/families";
import { SEASONAL_GUIDES } from "@/lib/learn/seasonal-guides";
import { OCCASION_GUIDES } from "@/lib/learn/occasion-guides";
import { MOODS } from "@/lib/discovery/moods";
import { ALL_NOTES } from "@/lib/learn/notes";
import { SITE_URL } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL;

  // Static pages — use a fixed date rather than new Date() to avoid
  // signaling perpetual freshness to crawlers
  const staticDate = new Date("2026-04-06");

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: staticDate, changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/products`, lastModified: staticDate, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/quiz`, lastModified: staticDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/moods`, lastModified: staticDate, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/explore`, lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/collections`, lastModified: staticDate, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/learn`, lastModified: staticDate, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/learn/fragrance-101`, lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/learn/how-to-apply`, lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/learn/families`, lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/learn/glossary`, lastModified: staticDate, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/learn/notes`, lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/learn/signature-scent`, lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/compare`, lastModified: staticDate, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/samples`, lastModified: staticDate, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/account/wishlist`, lastModified: staticDate, changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/account/scent-profile`, lastModified: staticDate, changeFrequency: "monthly", priority: 0.5 },
  ];

  // Learn: fragrance family detail pages
  const familyPages: MetadataRoute.Sitemap = FRAGRANCE_FAMILIES.map((family) => ({
    url: `${baseUrl}/learn/families/${family.slug}`,
    lastModified: staticDate,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Learn: seasonal guide pages
  const seasonalPages: MetadataRoute.Sitemap = SEASONAL_GUIDES.map((guide) => ({
    url: `${baseUrl}/learn/seasonal/${guide.slug}`,
    lastModified: staticDate,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Collection pages
  const collectionPages: MetadataRoute.Sitemap = COLLECTIONS.map((collection) => ({
    url: `${baseUrl}/collections/${collection.slug}`,
    lastModified: staticDate,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Mood pages
  const moodPages: MetadataRoute.Sitemap = MOODS.map((mood) => ({
    url: `${baseUrl}/moods/${mood.slug}`,
    lastModified: staticDate,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // Product pages
  let products: { handle: string; updated_at?: string; created_at?: string }[] = [];
  try {
    const result = await medusa.store.product.list({ limit: 1000 });
    products = (result.products || []) as typeof products;
  } catch {
    // Backend unavailable at build time
  }

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/products/${product.handle}`,
    lastModified: new Date(product.updated_at || product.created_at || staticDate),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Note profile pages
  const notePages: MetadataRoute.Sitemap = ALL_NOTES.map((note) => ({
    url: `${baseUrl}/learn/notes/${note.slug}`,
    lastModified: staticDate,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  // Learn: occasion guide pages
  const occasionPages: MetadataRoute.Sitemap = OCCASION_GUIDES.map((guide) => ({
    url: `${baseUrl}/learn/occasions/${guide.slug}`,
    lastModified: staticDate,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...familyPages, ...seasonalPages, ...occasionPages, ...collectionPages, ...moodPages, ...notePages, ...productPages];
}
