"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/lib/medusa/auth-actions";
import { Button, Input, useToast } from "@/components/ui";
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
          <Input
            label="First Name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <Input
            label="Last Name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div>
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
          <p className="text-xs text-text-muted mt-1">Minimum 8 characters</p>
        </div>

        <Input
          label="Confirm Password"
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
