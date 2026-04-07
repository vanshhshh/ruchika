"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

const TWO_HOURS_IN_MS = 2 * 60 * 60 * 1000;

function formatRemaining(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

export default function FreeGuideSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [expiryAt, setExpiryAt] = useState<number | null>(null);
  const [remaining, setRemaining] = useState(TWO_HOURS_IN_MS);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const key = "free-guide-expiry";
    const current = window.localStorage.getItem(key);
    const now = Date.now();
    const nextExpiry = current ? Number(current) : now + TWO_HOURS_IN_MS;
    const safeExpiry = Number.isFinite(nextExpiry) && nextExpiry > now ? nextExpiry : now + TWO_HOURS_IN_MS;

    window.localStorage.setItem(key, String(safeExpiry));
    setExpiryAt(safeExpiry);
    setRemaining(safeExpiry - now);
  }, []);

  useEffect(() => {
    if (!expiryAt) {
      return;
    }

    const timer = setInterval(() => {
      setRemaining(Math.max(0, expiryAt - Date.now()));
    }, 1000);

    return () => clearInterval(timer);
  }, [expiryAt]);

  useEffect(() => {
    const onScroll = () => {
      setShowSticky(window.scrollY > 750);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const countdown = useMemo(() => formatRemaining(remaining), [remaining]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/free-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Could not claim free guide");
      }

      setIsSuccess(true);
      setEmail("");
    } catch {
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <section id="free-guide" className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="overflow-hidden rounded-3xl border border-warm-200 bg-linear-to-r from-[#fff6de] via-[#fff1d4] to-[#fbe6bb] p-6 shadow-medium sm:p-8 md:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage-700">
              Free Download Offer
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight text-charcoal sm:text-4xl md:text-5xl">
              Get the 7-Day Metabolism Reset PDF Guide
            </h2>
            <p className="mt-4 max-w-2xl text-sm text-olive-gray sm:text-base">
              Practical daily meal templates, shopping list, and snack swaps to kickstart your nutrition journey.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-charcoal px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white">
                Hurry: Offer ends in {countdown}
              </span>
              <span className="text-lg font-medium text-olive-gray line-through">INR 999</span>
              <span className="rounded-full bg-sage-700 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-white">
                FREE Today
              </span>
            </div>

            <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your best email"
                className="h-12 w-full rounded-full border border-sage-200 bg-white px-5 text-sm outline-none focus:border-sage-400 sm:max-w-sm"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="h-12 rounded-full bg-sage-700 px-6 text-sm font-semibold text-white transition-colors hover:bg-sage-800 disabled:opacity-60"
              >
                {isSubmitting ? "Claiming..." : "Claim Free Guide"}
              </button>
              {isSuccess ? (
                <a
                  href="/free-guide.pdf"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-sage-300 bg-white px-6 text-sm font-semibold text-sage-800"
                >
                  Download PDF
                </a>
              ) : null}
            </form>
          </div>
        </div>
      </section>

      {showSticky ? (
        <a
          href="#free-guide"
          className="fixed bottom-24 left-1/2 z-40 w-[min(92vw,22rem)] -translate-x-1/2 rounded-full bg-warm-400 px-4 py-2.5 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-sage-900 shadow-[0_10px_30px_rgba(223,159,49,0.35)] sm:w-auto sm:px-5 sm:py-3 sm:text-xs sm:tracking-[0.16em]"
        >
          Free Guide: Ends in {countdown}
        </a>
      ) : null}
    </>
  );
}
