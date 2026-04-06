"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star, ShoppingBag } from "lucide-react";
import { PRODUCTS } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

export default function FeaturedProducts() {
  return (
    <section className="relative py-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-125 w-125 rounded-full bg-warm-200/35 blur-[100px]" />
        <div className="absolute inset-0 bg-linear-to-b from-[#fbf1da] via-cream to-[#f6e7c4]" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <motion.p
              initial={false}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sage-500 text-sm font-medium uppercase tracking-[0.2em] mb-3"
            >
              Digital Products
            </motion.p>
            <motion.h2
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-5xl font-bold text-charcoal"
            >
              Plans That <span className="text-gradient">Actually Work</span>
            </motion.h2>
            <motion.div
              initial={false}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="section-divider mt-6"
            />
          </div>
          <motion.div
            initial={false}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 text-sage-600 font-medium hover:text-sage-700 transition-colors"
            >
              View all products
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((product, index) => (
            <motion.div
              key={product.id}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Link
                href={`/products/${product.slug}`}
                className="group block h-full"
              >
                <div className="h-full overflow-hidden rounded-2xl border border-sage-200/80 bg-linear-to-b from-[#fffaf1] to-[#f5e9c8] shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-elevated">
                  {/* Image area */}
                  <div className="relative h-48 overflow-hidden bg-linear-to-br from-sage-200 via-sage-100 to-warm-200">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ShoppingBag className="w-12 h-12 text-sage-300 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    {product.badge && (
                      <div className="absolute left-3 top-3 rounded-full bg-sage-700 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                        {product.badge}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-warm-500 text-warm-500"
                        />
                      ))}
                      <span className="text-xs text-olive-gray ml-1">
                        (50+)
                      </span>
                    </div>

                    <h3 className="font-display text-base font-semibold text-charcoal mb-2 group-hover:text-sage-600 transition-colors line-clamp-2">
                      {product.title}
                    </h3>
                    <p className="text-xs text-olive-gray leading-relaxed mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-sage-700">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-olive-gray line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
