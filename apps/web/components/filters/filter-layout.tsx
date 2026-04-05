"use client";

import { useState, useEffect, useCallback, type ReactNode } from "react";
import { usePathname } from "next/navigation";

interface FilterLayoutProps {
  children: ReactNode;
}

export function FilterLayout({ children }: FilterLayoutProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close on navigation
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);

  const handleClose = useCallback(() => setIsOpen(false), []);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:block w-64 flex-shrink-0">{children}</aside>

      {/* Mobile filter button */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 border border-border-default rounded-lg text-sm font-medium text-text-secondary hover:border-border-strong transition-colors"
        >
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z"
              clipRule="evenodd"
            />
          </svg>
          Filters
        </button>
      </div>

      {/* Mobile filter overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-surface-overlay"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] bg-surface-elevated rounded-t-2xl shadow-modal overflow-hidden animate-slide-up flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border-default flex-shrink-0">
              <h2 className="font-display font-semibold text-text-primary">
                Filters
              </h2>
              <button
                onClick={handleClose}
                aria-label="Close filters"
                className="text-text-secondary hover:text-text-primary transition-colors p-1"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto px-5 py-4 flex-1">{children}</div>
            <div className="px-5 py-4 border-t border-border-default flex-shrink-0">
              <button
                onClick={handleClose}
                className="w-full py-2.5 bg-text-primary text-text-inverse rounded-lg font-medium hover:bg-text-secondary transition-colors"
              >
                Show Results
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
