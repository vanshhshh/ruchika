import type { Review } from "@/types";

import IndianPortrait from "@/components/illustrations/IndianPortrait";
import { REVIEWS } from "@/lib/data";

type ReviewWithPhotos = Review & {
  hasTransformation: true;
};

const transformationReviews = REVIEWS.filter(
  (item): item is ReviewWithPhotos => Boolean(item.hasTransformation)
).slice(0, 3);

export default function BeforeAfterResults() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage-600">
            Visible Transformation
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold text-charcoal md:text-5xl">
            Before & After Results
          </h2>
          <p className="mt-4 text-olive-gray">
            Real journeys from clients who followed consistent, practical plans.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {transformationReviews.map((review) => (
            <article
              key={review.id}
              className="overflow-hidden rounded-2xl border border-sage-100 bg-white shadow-soft"
            >
              <div className="grid grid-cols-2">
                <div className="relative h-52 overflow-hidden">
                  <IndianPortrait
                    variant={review.portraitVariant}
                    stage="before"
                    title={`${review.firstName} before nutrition plan`}
                    className="h-full w-full"
                  />
                  <span className="absolute left-2 top-2 rounded-full bg-charcoal/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                    Before
                  </span>
                </div>
                <div className="relative h-52 overflow-hidden">
                  <IndianPortrait
                    variant={review.portraitVariant}
                    stage="after"
                    title={`${review.firstName} after nutrition plan`}
                    className="h-full w-full"
                  />
                  <span className="absolute left-2 top-2 rounded-full bg-sage-700/85 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                    After
                  </span>
                </div>
              </div>

              <div className="p-4">
                <p className="font-semibold text-charcoal">
                  {review.firstName}, {review.city}
                </p>
                <p className="mt-1 text-sm text-olive-gray">{review.program}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
