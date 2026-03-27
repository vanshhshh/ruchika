"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star, ShoppingBag } from "lucide-react";
import { PRODUCTS } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

export default function FeaturedProducts() {
  return (
    <section className="py-28 relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-warm-100/40 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sage-500 text-sm font-medium uppercase tracking-[0.2em] mb-3"
            >
              Digital Products
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-5xl font-bold text-charcoal"
            >
              Plans That <span className="text-gradient">Actually Work</span>
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="section-divider mt-6"
            />
          </div>
          <motion.div
            initial={{ opacity: 0 }}
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Link
                href={`/products/${product.slug}`}
                className="group block h-full"
              >
                <div className="h-full rounded-2xl bg-white border border-sage-100 overflow-hidden hover:shadow-elevated transition-all duration-500 hover:-translate-y-1">
                  {/* Image area */}
                  <div className="relative h-48 bg-gradient-to-br from-sage-100 to-warm-100 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ShoppingBag className="w-12 h-12 text-sage-300 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    {product.badge && (
                      <div className="absolute top-3 left-3 px-3 py-1 bg-sage-600 text-white text-[10px] font-semibold uppercase tracking-wider rounded-full">
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
