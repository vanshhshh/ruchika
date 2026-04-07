"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { UtensilsCrossed, Scale, HeartPulse, Leaf } from "lucide-react";
import { SERVICES } from "@/lib/data";

const ICONS: Record<string, React.ElementType> = {
  utensils: UtensilsCrossed,
  scale: Scale,
  "heart-pulse": HeartPulse,
  leaf: Leaf,
};

export default function Services() {
  return (
    <section className="relative py-20 md:py-24">
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-[#f7edd2] via-[#fbf2dd] to-[#f2e1b9]" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <motion.p
            initial={false}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sage-500 text-sm font-medium uppercase tracking-[0.2em] mb-3"
          >
            What I Offer
          </motion.p>
          <motion.h2
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl font-bold text-charcoal sm:text-4xl md:text-5xl"
          >
            Nutrition Programs{" "}
            <span className="text-gradient">Designed for You</span>
          </motion.h2>
          <motion.div
            initial={false}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="section-divider mx-auto mt-6"
          />
          <motion.p
            initial={false}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-5 text-sm leading-relaxed text-olive-gray sm:text-base"
          >
            Every body is different. That&apos;s why every plan I create is
            uniquely tailored to your health goals, lifestyle, and love for
            Indian food.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {SERVICES.map((service, index) => {
            const IconComp = ICONS[service.icon] || Leaf;
            return (
              <motion.div
                key={service.id}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group relative rounded-2xl border border-sage-200/80 bg-linear-to-br from-[#fffaf0] via-[#f8edd6] to-[#f3e5c0] p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-sage-300 hover:shadow-elevated sm:p-8 md:p-10"
              >
                {/* Icon */}
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/75 shadow-soft transition-all duration-300 group-hover:scale-110 group-hover:bg-white">
                  <IconComp className="w-6 h-6 text-sage-600" />
                </div>

                <h3 className="font-display text-xl font-semibold text-charcoal mb-3">
                  {service.title}
                </h3>
                <p className="text-olive-gray text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {service.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 text-xs text-sage-600"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-sage-400" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href={service.ctaHref}
                  className="mt-7 inline-flex items-center rounded-full bg-sage-700 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sage-800"
                >
                  {service.ctaLabel}
                </Link>

                {/* Hover accent */}
                <div className="absolute bottom-0 left-8 right-8 h-0.5 rounded-full bg-linear-to-r from-sage-400 to-warm-400 scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
