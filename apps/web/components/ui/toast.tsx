"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue>({
  toast: () => {},
});

export function useToast() {
  return useContext(ToastContext);
}

const DURATIONS: Record<ToastType, number> = {
  success: 3000,
  error: 5000,
  info: 4000,
};

const MAX_TOASTS = 3;

let nextId = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [exiting, setExiting] = useState<Set<string>>(new Set());
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map(),
  );

  const dismiss = useCallback((id: string) => {
    setExiting((prev) => new Set(prev).add(id));
    // Remove after exit animation completes
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
      setExiting((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 200);
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const toast = useCallback(
    (message: string, type: ToastType = "info") => {
      const id = `toast-${++nextId}`;
      setToasts((prev) => {
        const next = [...prev, { id, message, type }];
        // Evict oldest if over limit
        if (next.length > MAX_TOASTS) {
          const evicted = next[0];
          dismiss(evicted.id);
        }
        return next.slice(-MAX_TOASTS);
      });
      const timer = setTimeout(() => dismiss(id), DURATIONS[type]);
      timersRef.current.set(id, timer);
    },
    [dismiss],
  );

  // Cleanup timers on unmount
  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <ToastContainer toasts={toasts} exiting={exiting} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

const ICONS: Record<ToastType, string> = {
  success: "✓",
  error: "✕",
  info: "ℹ",
};

const TYPE_STYLES: Record<ToastType, string> = {
  success:
    "bg-success-subtle text-success border-success/20",
  error:
    "bg-error-subtle text-error border-error/20",
  info: "bg-surface-elevated text-text-primary border-border-default",
};

const ICON_STYLES: Record<ToastType, string> = {
  success: "bg-success text-white",
  error: "bg-error text-white",
  info: "bg-text-secondary text-white",
};

function ToastContainer({
  toasts,
  exiting,
  onDismiss,
}: {
  toasts: Toast[];
  exiting: Set<string>;
  onDismiss: (id: string) => void;
}) {
  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-relevant="additions removals"
      className="fixed bottom-20 left-4 right-4 z-[60] flex flex-col items-center gap-2 pointer-events-none md:bottom-6 md:left-auto md:right-6 md:items-end"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-lg border shadow-elevated max-w-sm w-full transition-all duration-200 ${TYPE_STYLES[t.type]} ${
            exiting.has(t.id)
              ? "opacity-0 translate-y-2"
              : "opacity-100 translate-y-0 animate-slide-in-toast"
          }`}
        >
          <span
            className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${ICON_STYLES[t.type]}`}
          >
            {ICONS[t.type]}
          </span>
          <p className="text-sm font-medium flex-1">{t.message}</p>
          <button
            onClick={() => onDismiss(t.id)}
            className="flex-shrink-0 text-current opacity-50 hover:opacity-100 transition-opacity"
            aria-label="Dismiss"
          >
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
