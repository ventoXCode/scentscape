export interface Retailer {
  id: string;
  name: string;
  /** URL template — {handle} is replaced with the product handle */
  urlTemplate: string;
  /** Short tagline shown below the retailer name */
  tagline: string;
  /** Accent color class for the button */
  colorClass: string;
}

/**
 * Affiliate retailer configurations.
 * URL templates use placeholder affiliate tracking params.
 * Replace with real affiliate network URLs when partnerships are live.
 */
export const RETAILERS: Retailer[] = [
  {
    id: "sephora",
    name: "Sephora",
    urlTemplate: "https://www.sephora.com/search?keyword={handle}&ref=scentscape",
    tagline: "Free samples with purchase",
    colorClass: "bg-[#000] hover:bg-[#222]",
  },
  {
    id: "nordstrom",
    name: "Nordstrom",
    urlTemplate: "https://www.nordstrom.com/sr?keyword={handle}&origin=scentscape",
    tagline: "Free shipping & returns",
    colorClass: "bg-[#1B2738] hover:bg-[#2A3B52]",
  },
  {
    id: "fragrancenet",
    name: "FragranceNet",
    urlTemplate: "https://www.fragrancenet.com/search?q={handle}&ref=scentscape",
    tagline: "Discounted prices",
    colorClass: "bg-[#8B4513] hover:bg-[#A0522D]",
  },
];

/** Build the affiliate URL for a product at a given retailer */
export function buildAffiliateUrl(retailer: Retailer, handle: string): string {
  return retailer.urlTemplate.replace("{handle}", encodeURIComponent(handle));
}
