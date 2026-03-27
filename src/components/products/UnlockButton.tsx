"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

type UnlockButtonProps = {
  productId: string;
};

export default function UnlockButton({ productId }: UnlockButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function unlockProduct() {
    setError(null);
    setIsLoading(true);

    const response = await fetch(`/api/products/${productId}/access`, {
      method: "GET",
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      setError(data?.error ?? "Unable to unlock this product.");
      setIsLoading(false);
      return;
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    window.open(url, "_blank", "noopener,noreferrer");
    window.setTimeout(() => {
      window.URL.revokeObjectURL(url);
    }, 10000);
    setIsLoading(false);
  }

  return (
    <div className="space-y-2">
      <Button onClick={unlockProduct} disabled={isLoading} variant="secondary" className="w-full">
        {isLoading ? "Unlocking..." : "Unlock & download"}
      </Button>
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
