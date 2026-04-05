"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/lib/medusa/auth-actions";
import Link from "next/link";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      try {
        await register({
          first_name: firstName,
          last_name: lastName,
          email,
          password,
        });
        router.push("/account");
        router.refresh();
      } catch {
        setError("Could not create account. The email may already be in use.");
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <h1 className="font-display text-2xl font-bold mb-8 text-text-primary">Create Account</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-text-primary">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full px-4 py-2.5 border border-border-default rounded-lg bg-surface-elevated text-text-primary focus:outline-none focus:ring-2 focus:ring-border-focus focus:border-border-focus transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-text-primary">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full px-4 py-2.5 border border-border-default rounded-lg bg-surface-elevated text-text-primary focus:outline-none focus:ring-2 focus:ring-border-focus focus:border-border-focus transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-text-primary">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2.5 border border-border-default rounded-lg bg-surface-elevated text-text-primary focus:outline-none focus:ring-2 focus:ring-border-focus focus:border-border-focus transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-text-primary">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className="w-full px-4 py-2.5 border border-border-default rounded-lg bg-surface-elevated text-text-primary focus:outline-none focus:ring-2 focus:ring-border-focus focus:border-border-focus transition-colors"
          />
          <p className="text-xs text-text-muted mt-1">Minimum 8 characters</p>
        </div>

        {error && <p className="text-error text-sm">{error}</p>}

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3 bg-text-primary text-text-inverse rounded-lg font-medium hover:bg-text-secondary disabled:opacity-50 transition-colors"
        >
          {isPending ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <p className="mt-6 text-center text-text-secondary">
        Already have an account?{" "}
        <Link href="/login" className="text-text-primary underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
