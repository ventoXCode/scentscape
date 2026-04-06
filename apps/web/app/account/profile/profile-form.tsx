"use client";

import { useState, useTransition } from "react";
import { updateProfile, changePassword } from "@/lib/medusa/auth-actions";
import { Button, Input } from "@/components/ui";

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

        {error && <p className="text-error text-sm">{error}</p>}
        {success && <p className="text-success text-sm">Profile updated successfully.</p>}

        <Button
          type="submit"
          loading={isPending}
          loadingText="Saving..."
          fullWidth
          size="lg"
        >
          Save Changes
        </Button>
      </form>

      {/* Divider */}
      <div className="border-t border-border-default" />

      {/* Password change */}
      <form onSubmit={handlePasswordChange} className="space-y-4">
        <h2 className="font-display text-lg font-semibold text-text-primary">Change Password</h2>

        <Input
          label="Current Password"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />

        <div>
          <Input
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={8}
          />
          <p className="text-xs text-text-muted mt-1">Minimum 8 characters</p>
        </div>

        <Input
          label="Confirm New Password"
          type="password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          required
          minLength={8}
        />

        {passwordError && <p className="text-error text-sm">{passwordError}</p>}
        {passwordSuccess && <p className="text-success text-sm">Password changed successfully.</p>}

        <Button
          type="submit"
          loading={isPasswordPending}
          loadingText="Changing..."
          fullWidth
          size="lg"
        >
          Change Password
        </Button>
      </form>
    </div>
  );
}
