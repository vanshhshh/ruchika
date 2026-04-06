"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

import { cn } from "@/lib/utils";

type HeaderAuthActionsProps = {
  mobile?: boolean;
  onAction?: () => void;
  className?: string;
  tone?: "default" | "header";
};

export default function HeaderAuthActions({
  mobile = false,
  onAction,
  className,
  tone = "default",
}: HeaderAuthActionsProps) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const isHeaderTone = tone === "header";

  async function authenticate() {
    setIsLoading(true);
    await signIn("google", {
      callbackUrl: pathname || "/",
    });
  }

  async function signOutUser() {
    setIsLoading(true);
    await signOut({
      callbackUrl: "/",
      redirect: true,
    });
    onAction?.();
  }

  if (session?.user) {
    return (
      <div
        className={cn(
          "flex items-center gap-2",
          mobile && "w-full flex-col items-stretch",
          className
        )}
      >
        <Link
          href="/my-products"
          onClick={onAction}
          className={cn(
            isHeaderTone
              ? "inline-flex items-center justify-center rounded-sm border border-warm-600/55 bg-warm-800/70 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-warm-50 transition-colors hover:bg-warm-700/80"
              : "inline-flex items-center justify-center rounded-sm border border-sage-200 bg-cream px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-sage-700 transition-colors hover:bg-sage-50",
            mobile && "w-full rounded-2xl py-3 text-sm tracking-[0.18em]"
          )}
        >
          My Library
        </Link>
        <button
          type="button"
          onClick={signOutUser}
          disabled={isLoading}
          className={cn(
            isHeaderTone
              ? "inline-flex items-center justify-center rounded-sm bg-warm-300 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-warm-900 transition-colors hover:bg-warm-200 disabled:cursor-not-allowed disabled:opacity-70"
              : "inline-flex items-center justify-center rounded-sm bg-sage-700 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-sage-800 disabled:cursor-not-allowed disabled:opacity-70",
            mobile && "w-full rounded-2xl py-3 text-sm tracking-[0.18em]"
          )}
        >
          {isLoading ? "Signing Out..." : "Sign Out"}
        </button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center gap-2",
        mobile && "w-full flex-col items-stretch",
        className
      )}
    >
      <button
        type="button"
        onClick={authenticate}
        disabled={isLoading}
        className={cn(
          isHeaderTone
            ? "inline-flex items-center justify-center px-2 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-warm-100 transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
            : "inline-flex items-center justify-center px-2 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-sage-700 transition-colors hover:text-sage-900 disabled:cursor-not-allowed disabled:opacity-70",
          mobile &&
            (isHeaderTone
              ? "w-full rounded-2xl border border-warm-600/55 bg-warm-800/70 px-4 py-3 text-sm tracking-[0.18em] text-warm-50 hover:bg-warm-700/80"
              : "w-full rounded-2xl border border-sage-200 bg-white px-4 py-3 text-sm tracking-[0.18em] hover:bg-sage-50")
        )}
      >
        {isLoading ? "Connecting..." : "Login"}
      </button>
      <button
        type="button"
        onClick={authenticate}
        disabled={isLoading}
        className={cn(
          isHeaderTone
            ? "inline-flex items-center justify-center rounded-sm bg-warm-300 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-warm-900 transition-colors hover:bg-warm-200 disabled:cursor-not-allowed disabled:opacity-70"
            : "inline-flex items-center justify-center rounded-sm bg-sage-700 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-sage-800 disabled:cursor-not-allowed disabled:opacity-70",
          mobile && "w-full rounded-2xl py-3 text-sm tracking-[0.18em]"
        )}
      >
        Sign Up
      </button>
    </div>
  );
}
