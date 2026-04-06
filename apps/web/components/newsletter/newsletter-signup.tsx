"use client";

import { useState, useCallback } from "react";

interface NewsletterSignupProps {
  variant?: "inline" | "card";
  heading?: string;
  description?: string;
}

export function NewsletterSignup({
  variant = "card",
  heading = "Get Your Monthly Scent Briefing",
  description = "Personalized picks, seasonal guides, and fragrance tips — delivered monthly.",
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!email.trim() || status === "loading") return;

      setStatus("loading");
      try {
        const res = await fetch("/api/newsletter/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();

        if (!res.ok) {
          setStatus("error");
          setMessage(data.error || "Something went wrong.");
          return;
        }

        setStatus("success");
        setMessage(data.message);
        setEmail("");
      } catch {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      }
    },
    [email, status]
  );

  if (variant === "inline") {
    return (
      <div>
        <h3 className="font-medium mb-3 text-text-primary">{heading}</h3>
        <p className="text-sm text-text-muted mb-3">{description}</p>
        {status === "success" ? (
          <p className="text-sm text-semantic-success font-medium">{message}</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 min-w-0 px-3 py-2 text-sm rounded-lg border border-border-default bg-surface-elevated text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-border-focus"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-accent-primary text-white hover:bg-accent-primary-hover transition-colors disabled:opacity-50"
            >
              {status === "loading" ? "..." : "Subscribe"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="text-sm text-semantic-error mt-1">{message}</p>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border-default bg-surface-elevated p-6 md:p-8 text-center max-w-lg mx-auto">
      <p className="text-2xl mb-2" aria-hidden="true">
        ✉️
      </p>
      <h3 className="font-display text-xl font-semibold text-text-primary mb-2">
        {heading}
      </h3>
      <p className="text-sm text-text-secondary mb-5">{description}</p>
      {status === "success" ? (
        <p className="text-semantic-success font-medium">{message}</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 min-w-0 px-4 py-2.5 rounded-lg border border-border-default bg-surface-primary text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-border-focus"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-5 py-2.5 font-medium rounded-lg bg-accent-primary text-white hover:bg-accent-primary-hover transition-colors disabled:opacity-50"
          >
            {status === "loading" ? "..." : "Subscribe"}
          </button>
        </form>
      )}
      {status === "error" && (
        <p className="text-sm text-semantic-error mt-2">{message}</p>
      )}
    </div>
  );
}
