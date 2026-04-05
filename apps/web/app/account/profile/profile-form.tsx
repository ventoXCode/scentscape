"use client";

import { useState, useTransition } from "react";
import { updateProfile } from "@/lib/medusa/auth-actions";

interface ProfileFormProps {
  initialFirstName: string;
  initialLastName: string;
  initialEmail: string;
}

export function ProfileForm({
  initialFirstName,
  initialLastName,
  initialEmail,
}: ProfileFormProps) {
  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);
  const [email, setEmail] = useState(initialEmail);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    startTransition(async () => {
      try {
        await updateProfile({ first_name: firstName, last_name: lastName, email });
        setSuccess(true);
      } catch {
        setError("Failed to update profile. Please try again.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-border-default rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-border-default rounded-lg"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border border-border-default rounded-lg"
        />
      </div>

      {error && <p className="text-error text-sm">{error}</p>}
      {success && (
        <p className="text-success text-sm">Profile updated successfully.</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3 bg-text-primary text-text-inverse rounded-lg disabled:opacity-50"
      >
        {isPending ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
