"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Clock3, Sparkles } from "lucide-react";

const OFFER_STORAGE_KEY = "nourished-offer-expiry";
const OFFER_DURATION_MS = 24 * 60 * 60 * 1000;
const OFFER_DISCOUNT = 24;

function getNextExpiry(now: number) {
  return now + OFFER_DURATION_MS;
}

function readOrResetExpiry() {
  const now = Date.now();
  const storedValue =
    typeof window !== "undefined"
      ? Number(window.localStorage.getItem(OFFER_STORAGE_KEY))
      : NaN;

  const nextExpiry =
    Number.isFinite(storedValue) && storedValue > now
      ? storedValue
      : getNextExpiry(now);

  if (typeof window !== "undefined") {
    window.localStorage.setItem(OFFER_STORAGE_KEY, String(nextExpiry));
  }

  return nextExpiry;
}

function formatRemainingTime(remainingMs: number) {
  const totalSeconds = Math.max(0, Math.floor(remainingMs / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
}

export default function OfferBanner() {
  const [remainingMs, setRemainingMs] = useState(OFFER_DURATION_MS);

  useEffect(() => {
    const updateCountdown = () => {
      const nextExpiry = readOrResetExpiry();
      setRemainingMs(nextExpiry - Date.now());
    };

    updateCountdown();
    const interval = window.setInterval(updateCountdown, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const countdown = useMemo(
    () => formatRemainingTime(remainingMs),
    [remainingMs]
  );

  return (
    <div className="overflow-hidden rounded-4xl border border-sage-200/40 bg-[linear-gradient(90deg,#253014_0%,#557327_48%,#c88320_100%)] text-white shadow-medium">
      <div className="px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2 text-sm font-medium tracking-[0.02em]">
            <Sparkles className="h-4 w-4 shrink-0" />
            <span>
              Limited 24-hour offer: unlock <strong>{OFFER_DISCOUNT}% off</strong>{" "}
              on digital wellness plans.
            </span>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/80">
              <Clock3 className="h-3.5 w-3.5" />
              Ends in
            </div>

            <div className="flex items-center gap-2">
              {[
                { label: "Hr", value: countdown.hours },
                { label: "Min", value: countdown.minutes },
                { label: "Sec", value: countdown.seconds },
              ].map((unit) => (
                <div
                  key={unit.label}
                  className="min-w-[4.2rem] rounded-2xl border border-white/15 bg-black/15 px-3 py-2 text-center backdrop-blur-sm"
                >
                  <div className="font-display text-xl font-semibold leading-none">
                    {unit.value}
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.24em] text-white/75">
                    {unit.label}
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="#product-catalog"
              className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-sage-800 transition-all duration-300 hover:-translate-y-0.5 hover:bg-warm-100"
            >
              Shop now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
