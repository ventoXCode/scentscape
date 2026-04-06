"use client";

import { useState, useTransition } from "react";
import { requestPasswordReset } from "@/lib/medusa/auth-actions";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      await requestPasswordReset(email);
      setSubmitted(true);
    });
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-md">
        <h1 className="font-display text-2xl font-bold mb-4 text-text-primary">Check Your Email</h1>
        <p className="text-text-secondary mb-6">
          If an account exists for <strong className="text-text-primary">{email}</strong>, we&apos;ve sent a password reset link. Check your inbox and spam folder.
        </p>
        <Link
          href="/login"
          className="block w-full py-3 bg-text-primary text-text-inverse rounded-lg font-medium hover:bg-text-secondary transition-colors text-center"
        >
          Back to Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <h1 className="font-display text-2xl font-bold mb-2 text-text-primary">Reset Your Password</h1>
      <p className="text-text-secondary mb-8">
        Enter your email address and we&apos;ll send you a link to reset your password.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-text-primary">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
            className="w-full px-4 py-2.5 border border-border-default rounded-lg bg-surface-elevated text-text-primary focus:outline-none focus:ring-2 focus:ring-border-focus focus:border-border-focus transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3 bg-text-primary text-text-inverse rounded-lg font-medium hover:bg-text-secondary disabled:opacity-50 transition-colors"
        >
          {isPending ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      <p className="mt-6 text-center text-text-secondary">
        Remember your password?{" "}
        <Link href="/login" className="text-text-primary underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
