"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useComparison } from "@/lib/comparison/context";
import { getFamilyByName } from "@/lib/fragrance/family-config";
import type { SearchableProduct } from "@/lib/search/meilisearch";
import { useRouter } from "next/navigation";

const LONGEVITY_LABELS = ["", "Fleeting", "Short", "Moderate", "Long-lasting", "Legendary"];
const SILLAGE_LABELS = ["", "Intimate", "Close", "Moderate", "Strong", "Enormous"];

function RatingBar({ value, max = 5, label }: { value: number; max?: number; label: string }) {
  const pct = (value / max) * 100;
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-text-secondary">{label}</span>
        <span className="text-text-primary font-medium">{value.toFixed(1)}</span>
      </div>
      <div className="h-2 bg-surface-subtle rounded-full overflow-hidden">
        <div
          className="h-full bg-accent-primary rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function NoteList({ notes, label, color }: { notes: string[]; label: string; color: string }) {
  if (!notes.length) return null;
  return (
    <div>
      <p className="text-xs text-text-muted mb-1.5">{label}</p>
      <div className="flex flex-wrap gap-1">
        {notes.map((note) => (
          <span key={note} className={`px-2 py-0.5 rounded-full text-xs ${color}`}>
            {note}
          </span>
        ))}
      </div>
    </div>
  );
}

function SharedAccordsBadge({ accords, allProducts }: { accords: string[]; allProducts: SearchableProduct[] }) {
  // Find accords shared by all products being compared
  const sharedAccords = accords.filter((accord) =>
    allProducts.every((p) => p.accords?.includes(accord))
  );
  if (sharedAccords.length === 0) return null;
  return (
    <span className="text-[10px] text-success font-medium ml-1" title="Shared across all compared fragrances">
      shared
    </span>
  );
}

interface ComparePageClientProps {
  serverProducts: SearchableProduct[];
}

export function ComparePageClient({ serverProducts }: ComparePageClientProps) {
  const { items, removeItem, clearAll } = useComparison();
  const router = useRouter();
  const [products, setProducts] = useState<SearchableProduct[]>(serverProducts);

  // Sync URL with comparison context on mount
  useEffect(() => {
    if (items.length >= 2 && serverProducts.length === 0) {
      const handles = items.map((i) => i.handle).join(",");
      router.replace(`/compare?products=${handles}`);
    }
  }, [items, serverProducts.length, router]);

  // Use server products if available, otherwise show empty state
  useEffect(() => {
    if (serverProducts.length > 0) {
      setProducts(serverProducts);
    }
  }, [serverProducts]);

  // Find overlapping notes/accords across all products
  const allAccords = products.flatMap((p) => p.accords || []);
  const uniqueAccords = [...new Set(allAccords)];

  if (products.length < 2) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-display font-bold text-text-primary mb-4">
          Compare Fragrances
        </h1>
        <p className="text-text-secondary mb-8 max-w-md mx-auto">
          Add at least 2 fragrances to compare them side by side. Browse our collection and tap the compare icon on any product card.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/products"
            className="px-6 py-3 bg-accent-primary text-white rounded-lg font-medium hover:bg-accent-primary-hover transition-colors"
          >
            Browse Fragrances
          </Link>
          <Link
            href="/quiz"
            className="px-6 py-3 border border-border-default text-text-primary rounded-lg font-medium hover:border-border-strong transition-colors"
          >
            Take the Quiz
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary">
            Compare Fragrances
          </h1>
          <p className="text-text-secondary mt-1">
            {products.length} fragrances side by side
          </p>
        </div>
        <button
          onClick={() => {
            clearAll();
            router.push("/products");
          }}
          className="text-sm text-text-muted hover:text-text-primary transition-colors"
        >
          Clear all
        </button>
      </div>

      {/* Comparison grid */}
      <div className="overflow-x-auto -mx-4 px-4">
        <div
          className="grid gap-4 min-w-[640px]"
          style={{ gridTemplateColumns: `repeat(${products.length}, minmax(200px, 1fr))` }}
        >
          {/* Product headers */}
          {products.map((product) => {
            const familyConfig = product.family ? getFamilyByName(product.family) : undefined;
            return (
              <div key={product.id} className="relative">
                <button
                  onClick={() => {
                    removeItem(product.id);
                    const remaining = products.filter((p) => p.id !== product.id);
                    setProducts(remaining);
                    if (remaining.length >= 2) {
                      router.replace(`/compare?products=${remaining.map((p) => p.handle).join(",")}`);
                    }
                  }}
                  className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-surface-elevated/90 backdrop-blur-sm border border-border-default flex items-center justify-center text-text-muted hover:text-text-primary transition-colors"
                  aria-label={`Remove ${product.title} from comparison`}
                >
                  &times;
                </button>
                <Link
                  href={`/products/${product.handle}`}
                  className="block border border-border-default rounded-xl overflow-hidden hover:border-border-strong transition-colors"
                >
                  <div className="aspect-square bg-surface-subtle relative overflow-hidden">
                    {product.thumbnail ? (
                      <Image
                        src={product.thumbnail}
                        alt={product.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-text-muted">No image</div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-[11px] text-text-muted uppercase tracking-widest mb-0.5">{product.brand}</p>
                    <h2 className="font-display font-semibold text-text-primary leading-snug line-clamp-2">{product.title}</h2>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {familyConfig && (
                        <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${familyConfig.badge}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${familyConfig.classes.bg}`} />
                          {product.family}
                        </span>
                      )}
                      <span className="px-2 py-0.5 bg-surface-subtle rounded-full text-xs text-text-secondary">
                        {product.concentration}
                      </span>
                    </div>
                    <p className="text-lg font-semibold text-accent-primary mt-2">
                      ${(product.price / 100).toFixed(0)}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}

          {/* Section: Performance */}
          <SectionHeader title="Performance" colSpan={products.length} />
          {products.map((product) => (
            <div key={`perf-${product.id}`} className="space-y-3 p-3 border border-border-default rounded-xl">
              {product.longevity != null && (
                <div>
                  <RatingBar value={product.longevity} label="Longevity" />
                  <p className="text-xs text-text-muted mt-0.5">{LONGEVITY_LABELS[Math.round(product.longevity)]}</p>
                </div>
              )}
              {product.sillage != null && (
                <div>
                  <RatingBar value={product.sillage} label="Sillage" />
                  <p className="text-xs text-text-muted mt-0.5">{SILLAGE_LABELS[Math.round(product.sillage)]}</p>
                </div>
              )}
            </div>
          ))}

          {/* Section: Notes */}
          <SectionHeader title="Scent Pyramid" colSpan={products.length} />
          {products.map((product) => (
            <div key={`notes-${product.id}`} className="space-y-3 p-3 border border-border-default rounded-xl">
              <NoteList notes={product.top_notes || []} label="Top Notes" color="bg-family-citrus-subtle text-family-citrus" />
              <NoteList notes={product.heart_notes || []} label="Heart Notes" color="bg-family-floral-subtle text-family-floral" />
              <NoteList notes={product.base_notes || []} label="Base Notes" color="bg-family-woody-subtle text-family-woody" />
            </div>
          ))}

          {/* Section: Accords */}
          <SectionHeader title="Accords" colSpan={products.length} />
          {products.map((product) => (
            <div key={`accords-${product.id}`} className="p-3 border border-border-default rounded-xl">
              <div className="flex flex-wrap gap-1">
                {(product.accords || []).map((accord) => {
                  const isShared = products.every((p) => p.accords?.includes(accord));
                  return (
                    <span
                      key={accord}
                      className={`px-2 py-0.5 rounded-full text-xs ${
                        isShared
                          ? "bg-success-subtle text-success font-medium ring-1 ring-success/20"
                          : "bg-surface-subtle text-text-secondary"
                      }`}
                    >
                      {accord}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Section: Details */}
          <SectionHeader title="Details" colSpan={products.length} />
          {products.map((product) => (
            <div key={`details-${product.id}`} className="p-3 border border-border-default rounded-xl space-y-2">
              <DetailRow label="Gender" value={product.gender} />
              <DetailRow label="Season" value={(product.season || []).join(", ") || "—"} />
              <DetailRow label="Occasion" value={(product.occasion || []).join(", ") || "—"} />
              <DetailRow label="Sub-family" value={product.sub_family || "—"} />
            </div>
          ))}
        </div>
      </div>

      {/* Shared accords summary */}
      {products.length >= 2 && (() => {
        const shared = uniqueAccords.filter((a) =>
          products.every((p) => p.accords?.includes(a))
        );
        if (shared.length === 0) return null;
        return (
          <div className="mt-8 p-4 bg-success-subtle/50 border border-success/20 rounded-xl">
            <h3 className="font-display font-semibold text-text-primary mb-2">
              Shared Accords
            </h3>
            <p className="text-sm text-text-secondary mb-3">
              These accords appear in all {products.length} fragrances you&apos;re comparing:
            </p>
            <div className="flex flex-wrap gap-2">
              {shared.map((accord) => (
                <Link
                  key={accord}
                  href={`/search?accords=${encodeURIComponent(accord)}`}
                  className="px-3 py-1 bg-success-subtle text-success rounded-full text-sm font-medium hover:bg-success/20 transition-colors"
                >
                  {accord}
                </Link>
              ))}
            </div>
          </div>
        );
      })()}
    </div>
  );
}

function SectionHeader({ title, colSpan }: { title: string; colSpan: number }) {
  return (
    <div className="col-span-full mt-6 mb-2">
      <h3 className="font-display font-semibold text-text-primary text-lg">{title}</h3>
      <div className="h-px bg-border-default mt-1" />
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-text-muted">{label}</span>
      <span className="text-text-primary font-medium text-right">{value}</span>
    </div>
  );
}
