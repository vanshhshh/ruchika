"use client";

import { motion } from "framer-motion";
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
    <section className="py-28 relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-cream via-ivory to-cream" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sage-500 text-sm font-medium uppercase tracking-[0.2em] mb-3"
          >
            What I Offer
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-bold text-charcoal"
          >
            Nutrition Programs{" "}
            <span className="text-gradient">Designed for You</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="section-divider mx-auto mt-6"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-5 text-olive-gray leading-relaxed"
          >
            Every body is different. That&apos;s why every plan I create is
            uniquely tailored to your health goals, lifestyle, and love for
            Indian food.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {SERVICES.map((service, index) => {
            const IconComp = ICONS[service.icon] || Leaf;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group relative p-8 md:p-10 rounded-2xl bg-white border border-sage-100 hover:border-sage-200 transition-all duration-500 hover:shadow-elevated"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-sage-50 flex items-center justify-center mb-6 group-hover:bg-sage-100 group-hover:scale-110 transition-all duration-300">
                  <IconComp className="w-6 h-6 text-sage-600" />
                </div>

                <h3 className="font-display text-xl font-semibold text-charcoal mb-3">
                  {service.title}
                </h3>
                <p className="text-olive-gray text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-2">
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

                {/* Hover accent */}
                <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r from-sage-400 to-warm-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
