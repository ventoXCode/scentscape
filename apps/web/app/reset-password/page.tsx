"use client";

import { useState, useTransition, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { resetPassword } from "@/lib/medusa/auth-actions";
import { Button, Input, Skeleton, useToast } from "@/components/ui";
import { useRouter } from "next/navigation";
import Link from "next/link";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  if (!token) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-md">
        <h1 className="font-display text-2xl font-bold mb-4 text-text-primary">Invalid Reset Link</h1>
        <p className="text-text-secondary mb-6">
          This password reset link is missing or invalid. Please request a new one.
        </p>
        <Link
          href="/forgot-password"
          className="block w-full py-3 bg-text-primary text-text-inverse rounded-lg font-medium hover:bg-text-secondary transition-colors text-center"
        >
          Request New Link
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    startTransition(async () => {
      const result = await resetPassword(token, password);
      if (result.success) {
        toast("Password reset successfully! Please sign in.", "success");
        router.push("/login");
      } else {
        setError(result.error);
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <h1 className="font-display text-2xl font-bold mb-2 text-text-primary">Set New Password</h1>
      <p className="text-text-secondary mb-8">Enter your new password below.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            label="New Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
          <p className="text-xs text-text-muted mt-1">Minimum 8 characters</p>
        </div>

        <Input
          label="Confirm New Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength={8}
        />

        {error && <p className="text-error text-sm">{error}</p>}

        <Button
          type="submit"
          loading={isPending}
          loadingText="Resetting..."
          fullWidth
          size="lg"
        >
          Reset Password
        </Button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-16 max-w-md space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
