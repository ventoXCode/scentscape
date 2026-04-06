"use client";

import { useState, useTransition } from "react";
import { updateProfile, changePassword } from "@/lib/medusa/auth-actions";

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

  // Password change state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isPasswordPending, startPasswordTransition] = useTransition();

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

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(false);

    if (newPassword !== confirmNewPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    startPasswordTransition(async () => {
      const result = await changePassword(currentPassword, newPassword);
      if (result.success) {
        setPasswordSuccess(true);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } else {
        setPasswordError(result.error);
      }
    });
  };

  return (
    <div className="space-y-10">
      {/* Profile info */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="font-display text-lg font-semibold text-text-primary">Personal Information</h2>
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

        {error && <p className="text-error text-sm">{error}</p>}
        {success && <p className="text-success text-sm">Profile updated successfully.</p>}

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3 bg-text-primary text-text-inverse rounded-lg font-medium hover:bg-text-secondary disabled:opacity-50 transition-colors"
        >
          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </form>

      {/* Divider */}
      <div className="border-t border-border-default" />

      {/* Password change */}
      <form onSubmit={handlePasswordChange} className="space-y-4">
        <h2 className="font-display text-lg font-semibold text-text-primary">Change Password</h2>

        <div>
          <label className="block text-sm font-medium mb-1 text-text-primary">Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            className="w-full px-4 py-2.5 border border-border-default rounded-lg bg-surface-elevated text-text-primary focus:outline-none focus:ring-2 focus:ring-border-focus focus:border-border-focus transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-text-primary">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={8}
            className="w-full px-4 py-2.5 border border-border-default rounded-lg bg-surface-elevated text-text-primary focus:outline-none focus:ring-2 focus:ring-border-focus focus:border-border-focus transition-colors"
          />
          <p className="text-xs text-text-muted mt-1">Minimum 8 characters</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-text-primary">Confirm New Password</label>
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
            minLength={8}
            className="w-full px-4 py-2.5 border border-border-default rounded-lg bg-surface-elevated text-text-primary focus:outline-none focus:ring-2 focus:ring-border-focus focus:border-border-focus transition-colors"
          />
        </div>

        {passwordError && <p className="text-error text-sm">{passwordError}</p>}
        {passwordSuccess && <p className="text-success text-sm">Password changed successfully.</p>}

        <button
          type="submit"
          disabled={isPasswordPending}
          className="w-full py-3 bg-text-primary text-text-inverse rounded-lg font-medium hover:bg-text-secondary disabled:opacity-50 transition-colors"
        >
          {isPasswordPending ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
}
