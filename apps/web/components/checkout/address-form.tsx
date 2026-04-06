"use client";

import { useState } from "react";

export interface AddressData {
  first_name: string;
  last_name: string;
  address_1: string;
  city: string;
  province: string;
  postal_code: string;
  country_code: string;
  phone: string;
}

interface AddressFormProps {
  onSubmit: (data: AddressData) => void;
  isPending: boolean;
}

export function AddressForm({ onSubmit, isPending }: AddressFormProps) {
  const [formData, setFormData] = useState<AddressData>({
    first_name: "",
    last_name: "",
    address_1: "",
    city: "",
    province: "",
    postal_code: "",
    country_code: "us",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-semibold">Shipping Address</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="first_name" className="block text-sm font-medium mb-1">
            First Name
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-border-default rounded-lg focus:outline-none focus:ring-2 focus:ring-border-focus"
          />
        </div>
        <div>
          <label htmlFor="last_name" className="block text-sm font-medium mb-1">
            Last Name
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-border-default rounded-lg focus:outline-none focus:ring-2 focus:ring-border-focus"
          />
        </div>
      </div>

      <div>
        <label htmlFor="address_1" className="block text-sm font-medium mb-1">
          Address
        </label>
        <input
          type="text"
          id="address_1"
          name="address_1"
          value={formData.address_1}
          onChange={handleChange}
          required
          placeholder="Street address"
          className="w-full px-4 py-3 border border-border-default rounded-lg focus:outline-none focus:ring-2 focus:ring-border-focus"
        />
      </div>

      <div>
        <label htmlFor="city" className="block text-sm font-medium mb-1">
          City
        </label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-border-default rounded-lg focus:outline-none focus:ring-2 focus:ring-border-focus"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="province" className="block text-sm font-medium mb-1">
            State / Province
          </label>
          <input
            type="text"
            id="province"
            name="province"
            value={formData.province}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-border-default rounded-lg focus:outline-none focus:ring-2 focus:ring-border-focus"
          />
        </div>
        <div>
          <label htmlFor="postal_code" className="block text-sm font-medium mb-1">
            Postal Code
          </label>
          <input
            type="text"
            id="postal_code"
            name="postal_code"
            inputMode="numeric"
            value={formData.postal_code}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-border-default rounded-lg focus:outline-none focus:ring-2 focus:ring-border-focus"
          />
        </div>
      </div>

      <div>
        <label htmlFor="country_code" className="block text-sm font-medium mb-1">
          Country
        </label>
        <select
          id="country_code"
          name="country_code"
          value={formData.country_code}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-border-default rounded-lg focus:outline-none focus:ring-2 focus:ring-border-focus bg-surface-elevated"
        >
          <option value="us">United States</option>
          <option value="ca">Canada</option>
          <option value="gb">United Kingdom</option>
          <option value="au">Australia</option>
          <option value="de">Germany</option>
          <option value="fr">France</option>
          <option value="nl">Netherlands</option>
        </select>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-1">
          Phone <span className="text-text-muted font-normal">(optional)</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-border-default rounded-lg focus:outline-none focus:ring-2 focus:ring-border-focus"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full px-6 py-3 bg-text-primary text-text-inverse rounded-lg disabled:opacity-50 hover:bg-text-secondary transition-colors"
      >
        {isPending ? "Saving..." : "Continue to Payment"}
      </button>
    </form>
  );
}
