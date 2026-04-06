"use client";

import Image from "next/image";
import Link from "next/link";
import { useComparison } from "@/lib/comparison/context";

export function CompareBar() {
  const { items, removeItem, clearAll, count } = useComparison();

  if (count === 0) return null;

  return (
    <div className="fixed bottom-0 md:bottom-4 left-0 md:left-1/2 md:-translate-x-1/2 right-0 md:right-auto z-40 md:w-auto md:min-w-[500px] md:max-w-[700px] md:rounded-xl bg-surface-elevated border-t md:border border-border-default shadow-elevated px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] md:pb-3 animate-fade-in-up">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {items.map((item) => (
            <div key={item.id} className="relative group shrink-0">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-surface-subtle border border-border-default">
                {item.thumbnail ? (
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-text-muted text-xs">?</div>
                )}
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-text-primary text-text-inverse flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label={`Remove ${item.title} from comparison`}
              >
                &times;
              </button>
            </div>
          ))}
          {/* Empty slots */}
          {Array.from({ length: Math.max(0, 2 - count) }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="w-12 h-12 rounded-lg border-2 border-dashed border-border-default shrink-0 hidden sm:block"
            />
          ))}
          <span className="text-sm text-text-secondary ml-1 hidden sm:inline">
            {count}/4
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={clearAll}
            className="text-xs text-text-muted hover:text-text-primary transition-colors px-2 py-1"
          >
            Clear
          </button>
          <Link
            href={`/compare?products=${items.map((i) => i.handle).join(",")}`}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              count >= 2
                ? "bg-accent-primary text-white hover:bg-accent-primary-hover"
                : "bg-surface-subtle text-text-muted cursor-not-allowed pointer-events-none"
            }`}
            aria-disabled={count < 2}
            tabIndex={count < 2 ? -1 : undefined}
          >
            Compare{count >= 2 ? ` (${count})` : ""}
          </Link>
        </div>
      </div>
    </div>
  );
}
