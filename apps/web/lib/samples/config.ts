/** Sample box configuration — pricing tiers, limits, and fulfillment partners */

export interface SampleBoxTier {
  id: string;
  name: string;
  sampleCount: number;
  /** Price in cents */
  price: number;
  description: string;
}

export interface SamplePartner {
  id: string;
  name: string;
  urlTemplate: string;
  tagline: string;
}

export const SAMPLE_BOX_TIERS: SampleBoxTier[] = [
  {
    id: "starter",
    name: "Starter Set",
    sampleCount: 3,
    price: 2500,
    description: "3 curated 2mL spray vials",
  },
  {
    id: "discovery",
    name: "Discovery Set",
    sampleCount: 5,
    price: 3500,
    description: "5 curated 2mL spray vials",
  },
];

export const MAX_SAMPLES = 5;
export const MIN_SAMPLES = 3;

export const SAMPLE_PARTNER: SamplePartner = {
  id: "microperfumes",
  name: "MicroPerfumes",
  urlTemplate:
    "https://microperfumes.com/search?q={query}&ref=scentscape",
  tagline: "Fulfilled by our trusted sampling partner",
};

/** Build partner URL with product names as search query */
export function buildSamplePartnerUrl(
  productNames: string[],
): string {
  const query = encodeURIComponent(productNames.join(" "));
  return SAMPLE_PARTNER.urlTemplate.replace("{query}", query);
}
