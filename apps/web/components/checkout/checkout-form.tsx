"use client";

import { useState, useTransition } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { AddressForm, type AddressData } from "./address-form";
import type { HttpTypes } from "@medusajs/types";
import {
  setShippingAddress,
  createPaymentSession,
  completeCart,
} from "@/lib/medusa/checkout-actions";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

interface CheckoutFormProps {
  cart: HttpTypes.StoreCart;
}

type Step = "shipping" | "payment" | "review";

export function CheckoutForm({ cart }: CheckoutFormProps) {
  const [step, setStep] = useState<Step>("shipping");
  const [shippingData, setShippingData] = useState<AddressData | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleShippingSubmit = async (data: AddressData) => {
    startTransition(async () => {
      await setShippingAddress(cart.id, data);
      const { client_secret } = await createPaymentSession(cart.id, "stripe");
      setShippingData(data);
      setClientSecret(client_secret);
      setStep("payment");
    });
  };

  const steps: Step[] = ["shipping", "payment", "review"];

  return (
    <div className="space-y-8">
      {/* Step indicators */}
      <div className="flex items-center justify-between sm:justify-start">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step === s
                  ? "bg-text-primary text-text-inverse"
                  : steps.indexOf(step) > i
                  ? "bg-text-secondary text-text-inverse"
                  : "bg-surface-subtle text-text-muted"
              }`}
            >
              {i + 1}
            </div>
            <span
              className={`ml-2 capitalize text-sm ${
                step === s ? "font-semibold" : "text-text-muted"
              }`}
            >
              {s}
            </span>
            {i < steps.length - 1 && (
              <div className="w-4 sm:w-8 h-px bg-border-default mx-2 sm:mx-4" />
            )}
          </div>
        ))}
      </div>

      {step === "shipping" && (
        <AddressForm onSubmit={handleShippingSubmit} isPending={isPending} />
      )}

      {step === "payment" && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm
            cartId={cart.id}
            onBack={() => setStep("shipping")}
            onComplete={() => setStep("review")}
          />
        </Elements>
      )}

      {step === "review" && shippingData && (
        <ReviewStep cartId={cart.id} shippingData={shippingData} />
      )}
    </div>
  );
}

function PaymentForm({
  cartId,
  onBack,
  onComplete,
}: {
  cartId: string;
  onBack: () => void;
  onComplete: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message || "Payment failed");
      setProcessing(false);
      return;
    }

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success?cart_id=${cartId}`,
      },
      redirect: "if_required",
    });

    if (confirmError) {
      setError(confirmError.message || "Payment failed");
      setProcessing(false);
      return;
    }

    onComplete();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-lg font-semibold mb-4">Payment Details</h2>
      <PaymentElement />
      {error && <p className="text-error mt-2 text-sm">{error}</p>}
      <div className="flex gap-4 mt-6">
        <button
          type="button"
          onClick={onBack}
          className="min-w-[96px] px-6 py-3 border border-border-default rounded-lg hover:bg-surface-subtle transition-colors"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={!stripe || processing}
          className="flex-1 px-6 py-3 bg-text-primary text-text-inverse rounded-lg disabled:opacity-50 hover:bg-text-secondary transition-colors"
        >
          {processing ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </form>
  );
}

function ReviewStep({
  cartId,
  shippingData,
}: {
  cartId: string;
  shippingData: AddressData;
}) {
  const [isPending, startTransition] = useTransition();

  const handleComplete = () => {
    startTransition(async () => {
      const order = await completeCart(cartId);
      window.location.href = `/checkout/success?order_id=${order.id}`;
    });
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Review Order</h2>

      <div className="bg-surface-subtle rounded-lg p-4 mb-6">
        <h3 className="font-medium mb-2">Shipping to:</h3>
        <p>
          {shippingData.first_name} {shippingData.last_name}
        </p>
        <p>{shippingData.address_1}</p>
        <p>
          {shippingData.city}, {shippingData.province} {shippingData.postal_code}
        </p>
        <p className="uppercase text-sm text-text-muted mt-1">
          {shippingData.country_code}
        </p>
        {shippingData.phone && (
          <p className="text-sm text-text-secondary mt-1">{shippingData.phone}</p>
        )}
      </div>

      <p className="text-sm text-text-secondary mb-6">
        Your payment has been authorized. Click below to place your order.
      </p>

      <button
        onClick={handleComplete}
        disabled={isPending}
        className="w-full px-6 py-3 bg-text-primary text-text-inverse rounded-lg disabled:opacity-50 hover:bg-text-secondary transition-colors"
      >
        {isPending ? "Completing order..." : "Complete Order"}
      </button>
    </div>
  );
}
