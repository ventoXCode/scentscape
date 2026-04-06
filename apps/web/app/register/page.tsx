"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/lib/medusa/auth-actions";
import { useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    startTransition(async () => {
      const result = await register({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      });

      if (result.success) {
        toast("Account created! Welcome to ScentScape.", "success");
        router.push("/account");
        router.refresh();
      } else if (result.redirect) {
        toast(result.error, "info");
        router.push(result.redirect);
      } else {
        setError(result.error);
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

        <div>
          <label className="block text-sm font-medium mb-1 text-text-primary">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={8}
            className="w-full px-4 py-2.5 border border-border-default rounded-lg bg-surface-elevated text-text-primary focus:outline-none focus:ring-2 focus:ring-border-focus focus:border-border-focus transition-colors"
          />
        </div>

        {error && <p className="text-error text-sm">{error}</p>}

        <Button
          type="submit"
          loading={isPending}
          loadingText="Creating account..."
          fullWidth
          size="lg"
        >
          Create Account
        </Button>
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
