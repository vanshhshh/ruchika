"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/data";

declare global {
  interface RazorpayInstance {
    open: () => void;
    on: (event: string, handler: (response: Record<string, unknown>) => void) => void;
  }

  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => RazorpayInstance;
  }
}

type BuyButtonProps = {
  productId: string;
  productTitle: string;
};

export default function BuyButton({ productId, productTitle }: BuyButtonProps) {
  const { status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function ensureRazorpayLoaded() {
    if (window.Razorpay) {
      return true;
    }

    return await new Promise<boolean>((resolve) => {
      const existingScript = document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
      ) as HTMLScriptElement | null;

      if (existingScript) {
        if (window.Razorpay) {
          resolve(true);
          return;
        }

        existingScript.addEventListener("load", () => resolve(true), {
          once: true,
        });
        existingScript.addEventListener("error", () => resolve(false), {
          once: true,
        });
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  async function handlePurchase() {
    setError(null);
    setIsLoading(true);

    if (status !== "authenticated") {
      const authStatusResponse = await fetch("/api/auth/status", {
        cache: "no-store",
      });

      const authStatus = (await authStatusResponse.json().catch(() => null)) as {
        configured?: boolean;
        error?: string;
      } | null;

      if (!authStatus?.configured) {
        setError(authStatus?.error ?? "Auth is not configured. Add Google and NextAuth env variables.");
        setIsLoading(false);
        return;
      }

      await signIn("google", {
        callbackUrl: "/products",
      });
      setIsLoading(false);
      return;
    }

    try {
      const sdkLoaded = await ensureRazorpayLoaded();

      if (!sdkLoaded || !window.Razorpay) {
        setError("Could not load Razorpay checkout. Please try again.");
        setIsLoading(false);
        return;
      }

      const orderResponse = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      if (!orderResponse.ok) {
        const data = (await orderResponse.json().catch(() => null)) as {
          error?: string;
        } | null;
        setError(data?.error ?? "Unable to create payment order.");
        setIsLoading(false);
        return;
      }

      const orderData = (await orderResponse.json()) as {
        keyId: string;
        order: {
          id: string;
          amount: number;
          currency: string;
        };
      };

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
            return;
          }

          const data = (await verifyResponse.json().catch(() => null)) as {
            error?: string;
          } | null;
          setError(data?.error ?? "Payment verification failed. Please contact support.");
        },
        modal: {
          ondismiss: () => {
            setError("Payment cancelled.");
          },
        },
        theme: {
          color: "#798a72",
        },
      });

      razorpay.on("payment.failed", () => {
        setError("Payment failed. Please try another payment method.");
      });

      razorpay.open();
    } catch {
      setError("Unexpected error while starting payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <Button onClick={handlePurchase} disabled={isLoading} className="w-full">
        {isLoading ? "Processing..." : "Buy now"}
      </Button>
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
