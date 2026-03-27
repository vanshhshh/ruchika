"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/data";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
    };
  }
}

type BuyButtonProps = {
  productId: string;
  productTitle: string;
};

export default function BuyButton({ productId, productTitle }: BuyButtonProps) {
  const { status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  async function handlePurchase() {
    setIsLoading(true);

    if (status !== "authenticated") {
      await signIn("google", {
        callbackUrl: "/products",
      });
      return;
    }

    const orderResponse = await fetch("/api/payments/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });

    if (!orderResponse.ok) {
      setIsLoading(false);
      return;
    }

    const orderData = await orderResponse.json();

    if (!window.Razorpay) {
      setIsLoading(false);
      return;
    }

    const razorpay = new window.Razorpay({
      key: orderData.keyId,
      amount: orderData.order.amount,
      currency: orderData.order.currency,
      order_id: orderData.order.id,
      name: SITE_CONFIG.name,
      description: productTitle,
      handler: async (response: Record<string, string>) => {
        const verifyResponse = await fetch("/api/payments/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productId,
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          }),
        });

        if (verifyResponse.ok) {
          window.location.href = "/my-products";
        }
      },
      theme: {
        color: "#798a72",
      },
    });

    razorpay.open();
    setIsLoading(false);
  }

  return (
    <Button onClick={handlePurchase} disabled={isLoading} className="w-full">
      {isLoading ? "Processing..." : "Buy now"}
    </Button>
  );
}
