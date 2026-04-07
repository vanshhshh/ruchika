"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

import { PortraitAvatar } from "@/components/illustrations/IndianPortrait";
import { REVIEWS } from "@/lib/data";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const visibleReviews = REVIEWS.slice(0, 6);

  const next = () =>
    setCurrent((prev) => (prev + 1) % visibleReviews.length);
  const prev = () =>
    setCurrent(
      (prev) => (prev - 1 + visibleReviews.length) % visibleReviews.length
    );

  const review = visibleReviews[current];

  return (
    <section className="relative overflow-hidden py-20 md:py-24">
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-[#f8efd8] via-[#fdf8ed] to-cream" />
      <div className="absolute right-0 top-20 h-75 w-75 rounded-full bg-sage-300/20 blur-[80px]" />
      <div className="absolute bottom-0 left-10 h-64 w-64 rounded-full bg-warm-200/20 blur-[90px]" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <motion.p
            initial={false}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sage-500 text-sm font-medium uppercase tracking-[0.2em] mb-3"
          >
            Client Stories
          </motion.p>
          <motion.h2
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl font-bold text-charcoal sm:text-4xl md:text-5xl"
          >
            Real People, <span className="text-gradient">Real Results</span>
          </motion.h2>
          <motion.div
            initial={false}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="section-divider mx-auto mt-6"
          />
        </div>

        {/* Testimonial Carousel */}
        <div className="mx-auto max-w-4xl">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={review.id}
                initial={false}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-3xl border border-sage-200/80 bg-linear-to-br from-[#fffaf2] via-[#fbf2dd] to-[#f2e2bc] p-6 shadow-medium sm:p-8 md:p-12"
              >
                <Quote className="w-10 h-10 text-sage-200 mb-6" />

                <p className="mb-7 text-base leading-relaxed font-light text-charcoal sm:text-lg md:mb-8 md:text-xl">
                  &ldquo;{review.text}&rdquo;
                </p>

                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <PortraitAvatar
                      variant={review.portraitVariant}
                      title={`${review.name} portrait`}
                      className="h-12 w-12"
                    />
                    <div>
                      <p className="font-semibold text-charcoal">
                        {review.firstName} from {review.city}
                      </p>
                      <p className="text-sm text-olive-gray">
                        {review.program}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-warm-500 text-warm-500"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prev}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-sage-300 bg-white/70 text-sage-700 transition-colors hover:bg-white"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex gap-2">
                {visibleReviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === current
                        ? "w-8 bg-sage-500"
                        : "bg-sage-200 hover:bg-sage-300"
                    }`}
                    aria-label={`Go to review ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-sage-300 bg-white/70 text-sage-700 transition-colors hover:bg-white"
                aria-label="Next review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
