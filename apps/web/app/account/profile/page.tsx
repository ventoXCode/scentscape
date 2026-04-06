export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import Link from "next/link";
import { getCustomer } from "@/lib/medusa/auth-actions";
import { ProfileForm } from "./profile-form";

export default async function ProfilePage() {
  const customer = await getCustomer();

  if (!customer) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/account" className="text-gray-500 hover:text-black">
          &larr; Account
        </Link>
        <h1 className="text-2xl font-bold">Profile Settings</h1>
      </div>

      <ProfileForm
        initialFirstName={customer.first_name ?? ""}
        initialLastName={customer.last_name ?? ""}
        initialEmail={customer.email ?? ""}
      />
    </div>
  );
}
