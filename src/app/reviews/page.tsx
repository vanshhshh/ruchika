import type { Metadata } from "next";
import { Star } from "lucide-react";

import { REVIEWS } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Reviews",
  description: "Client transformations and testimonials for Ruchika Chawla nutrition programs.",
};

export default function ReviewsPage() {
  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="font-display text-4xl font-bold text-charcoal md:text-5xl">Client Reviews</h1>
        <p className="mt-4 max-w-3xl text-olive-gray">
          Verified outcomes from clients across weight, gut health, and hormonal wellness journeys.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {REVIEWS.map((review) => (
            <article key={review.id} className="rounded-2xl border border-sage-100 bg-white p-6 shadow-soft">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-semibold text-charcoal">{review.name}</h2>
                  <p className="text-xs uppercase tracking-widest text-sage-600">{review.program}</p>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-warm-500 text-warm-500" />
                  ))}
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-olive-gray">{review.text}</p>

              <div className="mt-5 text-xs text-olive-gray">Reviewed on {formatDate(review.date)}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
