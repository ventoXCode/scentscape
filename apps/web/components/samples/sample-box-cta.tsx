"use client";

import { useSampleBox } from "@/lib/samples/context";
import { useToast } from "@/components/ui/toast";
import Link from "next/link";
import { MAX_SAMPLES } from "@/lib/samples/config";
import type { SampleItem } from "@/lib/samples/context";

interface SampleBoxCtaProps {
  /** Products to add when CTA is clicked */
  products: SampleItem[];
}

/** Bulk-add CTA for quiz results — "Get these as samples" */
export function SampleBoxCta({ products }: SampleBoxCtaProps) {
  const { addItem, count, items } = useSampleBox();
  const { toast } = useToast();

  // Check if all products are already in the box
  const allInBox = products.every((p) =>
    items.some((i) => i.id === p.id),
  );

  const handleAddAll = () => {
    let added = 0;
    for (const product of products) {
      if (items.some((i) => i.id === product.id)) continue;
      if (count + added >= MAX_SAMPLES) break;
      addItem(product);
      added++;
    }

    if (added > 0) {
      toast(`Added ${added} sample${added > 1 ? "s" : ""} to your box`, "success");
    } else if (allInBox) {
      toast("Already in your sample box", "info");
    } else {
      toast("Sample box is full (5 max)", "error");
    }
  };

  const samplesAvailable = Math.min(
    products.filter((p) => !items.some((i) => i.id === p.id)).length,
    MAX_SAMPLES - count,
  );

  return (
    <div className="mt-8 rounded-xl border border-accent-primary/20 bg-gradient-to-br from-accent-primary/5 to-surface-subtle p-6">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent-primary/10 flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 text-accent-primary"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714a2.25 2.25 0 0 0 .659 1.591L19 14.5m-4.75-11.396c.249.023.498.05.75.082M5 14.5l-1.456 1.456a1.5 1.5 0 0 0 0 2.121l.707.707a1.5 1.5 0 0 0 2.121 0L8.5 16.657m-3.5-2.157h13m0 0 1.456 1.456a1.5 1.5 0 0 1 0 2.121l-.707.707a1.5 1.5 0 0 1-2.121 0L15.5 16.657"
            />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold font-display text-text-primary">
            Try Before You Buy
          </h3>
          <p className="mt-1 text-sm text-text-secondary">
            Not ready to commit? Get 2mL spray samples of your top matches
            delivered to your door. From $25 for 3 samples.
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            {allInBox ? (
              <Link
                href="/samples"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent-primary text-white text-sm font-medium hover:bg-accent-primary-hover transition-colors"
              >
                View Your Sample Box
                <span className="text-xs opacity-80">
                  ({count}/{MAX_SAMPLES})
                </span>
              </Link>
            ) : (
              <button
                onClick={handleAddAll}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent-primary text-white text-sm font-medium hover:bg-accent-primary-hover transition-colors"
              >
                Get Top {samplesAvailable} as Samples
              </button>
            )}
            <Link
              href="/samples"
              className="inline-flex items-center px-5 py-2.5 rounded-lg border border-border-default text-sm font-medium text-text-secondary hover:border-border-strong transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
