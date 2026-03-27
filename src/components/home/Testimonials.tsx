"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
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
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-sage-50/50 via-sage-50/80 to-cream" />
      <div className="absolute top-20 right-0 w-75 h-75 rounded-full bg-sage-200/20 blur-[80px]" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sage-500 text-sm font-medium uppercase tracking-[0.2em] mb-3"
          >
            Client Stories
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-bold text-charcoal"
          >
            Real People, <span className="text-gradient">Real Results</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="section-divider mx-auto mt-6"
          />
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={review.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white rounded-3xl p-8 md:p-12 shadow-soft border border-sage-100"
              >
                <Quote className="w-10 h-10 text-sage-200 mb-6" />

                <p className="text-lg md:text-xl text-charcoal leading-relaxed font-light mb-8">
                  &ldquo;{review.text}&rdquo;
                </p>

                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center text-sage-700 font-semibold text-sm">
                      {review.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-charcoal">
                        {review.name}
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
                className="w-10 h-10 rounded-full border border-sage-200 flex items-center justify-center text-sage-600 hover:bg-sage-50 transition-colors"
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
                className="w-10 h-10 rounded-full border border-sage-200 flex items-center justify-center text-sage-600 hover:bg-sage-50 transition-colors"
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
