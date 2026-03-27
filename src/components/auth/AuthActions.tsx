"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";

export default function AuthActions() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  async function signInWithGoogle() {
    setIsLoading(true);
    const redirectPath = pathname?.startsWith("/my-products") ? pathname : "/my-products";
    await signIn("google", {
      callbackUrl: redirectPath,
    });
  }

  async function signOutUser() {
    setIsLoading(true);
    await signOut({
      callbackUrl: "/",
      redirect: true,
    });
    setIsLoading(false);
    router.refresh();
  }

  if (session?.user) {
    return (
      <div className="hidden md:flex items-center gap-2">
        <Button variant="secondary" size="sm" onClick={() => router.push("/my-products")}>
          My Products
        </Button>
        <Button variant="ghost" size="sm" onClick={signOutUser} disabled={isLoading}>
          {isLoading ? "Signing out..." : "Sign out"}
        </Button>
      </div>
    );
  }

  return (
    <div className="hidden md:block">
      <Button size="sm" onClick={signInWithGoogle} disabled={isLoading}>
        {isLoading ? "Connecting..." : "Sign in with Google"}
      </Button>
    </div>
  );
}
