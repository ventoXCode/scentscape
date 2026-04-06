// Single source of truth for all fragrance family visual identities.
// Every component that needs family-specific colors, patterns, or styles imports from here.

export type FamilySlug =
  | "fresh"
  | "floral"
  | "amber"
  | "woody"
  | "citrus"
  | "aromatic";

export const FAMILY_SLUGS: FamilySlug[] = [
  "fresh",
  "floral",
  "amber",
  "woody",
  "citrus",
  "aromatic",
];

export interface FamilyVisualIdentity {
  slug: FamilySlug;
  name: string;
  emoji: string;
  /** Atomic Tailwind class references for the family color tokens */
  classes: {
    bg: string;
    bgSubtle: string;
    text: string;
    border: string;
    dot: string;
  };
  /** Pre-composed class strings for common UI patterns */
  badge: string;
  card: string;
  cardBorder: string;
  cardIconBg: string;
  heroGradient: string;
  noteGradient: string;
  collectionGradient: string;
  /** CSS pattern class name — subtle decorative texture unique to this family */
  pattern: string;
  /** Raw hex values for SVG fills and other contexts where Tailwind classes can't be used */
  hex: { main: string; subtle: string; text: string };
}

export const FAMILIES: Record<FamilySlug, FamilyVisualIdentity> = {
  fresh: {
    slug: "fresh",
    name: "Fresh",
    emoji: "🌊",
    classes: {
      bg: "bg-family-fresh",
      bgSubtle: "bg-family-fresh-subtle",
      text: "text-family-fresh",
      border: "border-family-fresh",
      dot: "bg-family-fresh",
    },
    badge: "bg-family-fresh-subtle text-family-fresh",
    card: "bg-family-fresh-subtle border-family-fresh/20 hover:border-family-fresh/40",
    cardBorder: "bg-family-fresh-subtle border-family-fresh/30",
    cardIconBg: "bg-family-fresh/10",
    heroGradient: "from-family-fresh-subtle to-surface-primary",
    noteGradient: "from-family-fresh/10 to-transparent",
    collectionGradient: "from-family-fresh/20 to-family-fresh/5",
    pattern: "family-pattern-fresh",
    hex: { main: "#2D8F8F", subtle: "#E6F5F5", text: "#1A5C5C" },
  },
  floral: {
    slug: "floral",
    name: "Floral",
    emoji: "🌸",
    classes: {
      bg: "bg-family-floral",
      bgSubtle: "bg-family-floral-subtle",
      text: "text-family-floral",
      border: "border-family-floral",
      dot: "bg-family-floral",
    },
    badge: "bg-family-floral-subtle text-family-floral",
    card: "bg-family-floral-subtle border-family-floral/20 hover:border-family-floral/40",
    cardBorder: "bg-family-floral-subtle border-family-floral/30",
    cardIconBg: "bg-family-floral/10",
    heroGradient: "from-family-floral-subtle to-surface-primary",
    noteGradient: "from-family-floral/10 to-transparent",
    collectionGradient: "from-family-floral/20 to-family-floral/5",
    pattern: "family-pattern-floral",
    hex: { main: "#C45B84", subtle: "#F9E8F0", text: "#8A3D5C" },
  },
  amber: {
    slug: "amber",
    name: "Amber",
    emoji: "✨",
    classes: {
      bg: "bg-family-amber",
      bgSubtle: "bg-family-amber-subtle",
      text: "text-family-amber",
      border: "border-family-amber",
      dot: "bg-family-amber",
    },
    badge: "bg-family-amber-subtle text-family-amber",
    card: "bg-family-amber-subtle border-family-amber/20 hover:border-family-amber/40",
    cardBorder: "bg-family-amber-subtle border-family-amber/30",
    cardIconBg: "bg-family-amber/10",
    heroGradient: "from-family-amber-subtle to-surface-primary",
    noteGradient: "from-family-amber/10 to-transparent",
    collectionGradient: "from-family-amber/20 to-family-amber/5",
    pattern: "family-pattern-amber",
    hex: { main: "#B8860B", subtle: "#FDF3D7", text: "#7A5A07" },
  },
  woody: {
    slug: "woody",
    name: "Woody",
    emoji: "🌲",
    classes: {
      bg: "bg-family-woody",
      bgSubtle: "bg-family-woody-subtle",
      text: "text-family-woody",
      border: "border-family-woody",
      dot: "bg-family-woody",
    },
    badge: "bg-family-woody-subtle text-family-woody",
    card: "bg-family-woody-subtle border-family-woody/20 hover:border-family-woody/40",
    cardBorder: "bg-family-woody-subtle border-family-woody/30",
    cardIconBg: "bg-family-woody/10",
    heroGradient: "from-family-woody-subtle to-surface-primary",
    noteGradient: "from-family-woody/10 to-transparent",
    collectionGradient: "from-family-woody/20 to-family-woody/5",
    pattern: "family-pattern-woody",
    hex: { main: "#6B5B4F", subtle: "#F0EBE6", text: "#4A3F37" },
  },
  citrus: {
    slug: "citrus",
    name: "Citrus",
    emoji: "🍋",
    classes: {
      bg: "bg-family-citrus",
      bgSubtle: "bg-family-citrus-subtle",
      text: "text-family-citrus",
      border: "border-family-citrus",
      dot: "bg-family-citrus",
    },
    badge: "bg-family-citrus-subtle text-family-citrus",
    card: "bg-family-citrus-subtle border-family-citrus/20 hover:border-family-citrus/40",
    cardBorder: "bg-family-citrus-subtle border-family-citrus/30",
    cardIconBg: "bg-family-citrus/10",
    heroGradient: "from-family-citrus-subtle to-surface-primary",
    noteGradient: "from-family-citrus/10 to-transparent",
    collectionGradient: "from-family-citrus/20 to-family-citrus/5",
    pattern: "family-pattern-citrus",
    hex: { main: "#D4A017", subtle: "#FFF8E1", text: "#8B6A10" },
  },
  aromatic: {
    slug: "aromatic",
    name: "Aromatic",
    emoji: "🌿",
    classes: {
      bg: "bg-family-aromatic",
      bgSubtle: "bg-family-aromatic-subtle",
      text: "text-family-aromatic",
      border: "border-family-aromatic",
      dot: "bg-family-aromatic",
    },
    badge: "bg-family-aromatic-subtle text-family-aromatic",
    card: "bg-family-aromatic-subtle border-family-aromatic/20 hover:border-family-aromatic/40",
    cardBorder: "bg-family-aromatic-subtle border-family-aromatic/30",
    cardIconBg: "bg-family-aromatic/10",
    heroGradient: "from-family-aromatic-subtle to-surface-primary",
    noteGradient: "from-family-aromatic/10 to-transparent",
    collectionGradient: "from-family-aromatic/20 to-family-aromatic/5",
    pattern: "family-pattern-aromatic",
    hex: { main: "#4A7C59", subtle: "#E8F3EC", text: "#2F5139" },
  },
};

/** Lookup by Title-case display name (e.g. "Fresh") */
export function getFamilyByName(name: string): FamilyVisualIdentity | undefined {
  const slug = name.toLowerCase() as FamilySlug;
  return FAMILIES[slug];
}

/** Lookup by slug with fallback to a neutral default */
export function getFamily(slug: string): FamilyVisualIdentity {
  return FAMILIES[slug as FamilySlug] ?? FAMILIES.fresh;
}

/** Accord name to family slug — used by accord chips to inherit family styling */
export const ACCORD_FAMILY_MAP: Record<string, FamilySlug> = {
  Woody: "woody",
  Earthy: "woody",
  Oud: "woody",
  Sandalwood: "woody",
  Vetiver: "woody",
  Leathery: "woody",
  Smoky: "woody",
  Fresh: "fresh",
  Aquatic: "fresh",
  Green: "fresh",
  Floral: "floral",
  "Fresh Floral": "floral",
  Powdery: "floral",
  Musky: "floral",
  Amber: "amber",
  "Warm Spicy": "amber",
  "Fresh Spicy": "amber",
  Sweet: "amber",
  Vanilla: "amber",
  Incense: "amber",
  Citrus: "citrus",
  Fruity: "citrus",
  Coffee: "aromatic",
  Aromatic: "aromatic",
};
