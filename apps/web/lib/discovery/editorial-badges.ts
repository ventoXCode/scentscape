/**
 * Editorial badge system for product cards.
 *
 * Staff Picks: curated selection of noteworthy fragrances across families/brands.
 * Trending: deterministic weekly rotation — ~14% of products "trend" at any time,
 * refreshing each week so the catalog feels alive without real analytics data.
 */

// Curated across families, price points, and brands for editorial diversity
const STAFF_PICKS = new Set([
  "baccarat-rouge-540",   // iconic niche amber
  "portrait-of-a-lady",   // masterpiece floral
  "terre-d-hermes",       // elegant classic
  "black-opium",          // modern classic
  "tobacco-vanille",      // iconic Tom Ford
  "oud-for-greatness",    // niche powerhouse
  "gypsy-water",          // cult following
  "coco-mademoiselle",    // timeless icon
  "another-13",           // cult niche
  "flowerbomb",           // modern classic
  "layton",               // community favorite
  "chanel-no-5",          // legendary
  "aventus",              // performance king
  "delina",               // feminine standout
  "grand-soir",           // amber masterclass
]);

export function isStaffPick(handle: string): boolean {
  return STAFF_PICKS.has(handle);
}

/**
 * Deterministic trending: hash product ID with current week number.
 * Different products trend each week without needing analytics data.
 */
export function isTrending(productId: string): boolean {
  const weekNumber = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
  let hash = 0;
  const key = productId + weekNumber;
  for (let i = 0; i < key.length; i++) {
    hash = ((hash << 5) - hash + key.charCodeAt(i)) | 0;
  }
  return (Math.abs(hash) % 7) === 0;
}
