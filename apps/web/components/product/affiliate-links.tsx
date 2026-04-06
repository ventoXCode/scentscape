"use client";

import { RETAILERS, buildAffiliateUrl } from "@/lib/affiliate/retailers";

interface AffiliateLinksProps {
  handle: string;
  productTitle: string;
  /** Compact mode for quiz result cards — shows fewer retailers */
  compact?: boolean;
}

export function AffiliateLinks({ handle, productTitle, compact }: AffiliateLinksProps) {
  const retailers = compact ? RETAILERS.slice(0, 2) : RETAILERS;

  // Build tracked URL that redirects through our server-side logging endpoint
  const buildTrackedUrl = (retailer: { id: string }, directUrl: string) => {
    const params = new URLSearchParams({
      url: directUrl,
      retailer: retailer.id,
      product: handle,
    });
    return `/api/affiliate/click?${params.toString()}`;
  };

  const handleClick = (retailerId: string) => {
    // Client-side analytics (supplement — may be blocked by ad blockers)
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "affiliate_click", {
        retailer: retailerId,
        product: handle,
      });
    }
  };

  return (
    <div className={compact ? "space-y-2" : "space-y-2.5"}>
      <p className="text-xs text-text-muted uppercase tracking-wider font-medium">
        Buy at authorized retailers
      </p>
      <div className={`grid gap-2 ${compact ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-3"}`}>
        {retailers.map((retailer) => {
          const directUrl = buildAffiliateUrl(retailer, handle);
          return (
          <a
            key={retailer.id}
            href={buildTrackedUrl(retailer, directUrl)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleClick(retailer.id)}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm font-medium transition-colors ${retailer.colorClass}`}
            aria-label={`Buy ${productTitle} at ${retailer.name}`}
          >
            <span>{retailer.name}</span>
            <svg className="w-3.5 h-3.5 opacity-70" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
            </svg>
          </a>
          );
        })}
      </div>
      {!compact && (
        <p className="text-[11px] text-text-muted">
          ScentScape may earn a commission from purchases made through these links.
        </p>
      )}
    </div>
  );
}

// Extend window type for gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
