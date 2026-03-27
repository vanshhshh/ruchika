"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check, Sparkles, Star } from "lucide-react";

import { STATS } from "@/lib/data";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-10 top-20 h-[500px] w-[500px] rounded-full bg-sage-200/30 blur-[100px]" />
        <div className="absolute bottom-20 left-10 h-[400px] w-[400px] rounded-full bg-warm-200/30 blur-[100px]" />
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sage-100/20 blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, var(--color-sage-500) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 py-32 lg:py-0">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full bg-sage-100 px-4 py-1.5 text-xs font-medium text-sage-700"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Trusted by 2000+ clients across India</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
            >
              Eat Well. <span className="text-gradient">Feel Well.</span>
              <br />
              Live Well.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6 max-w-lg text-lg leading-relaxed text-olive-gray"
            >
              Transform your relationship with food through personalized,
              science-backed Indian nutrition plans. No fad diets, no
              restrictions, just real food for real results.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 rounded-full bg-sage-600 px-7 py-3.5 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-sage-700 hover:shadow-xl hover:shadow-sage-600/20"
              >
                Explore Plans
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full border border-sage-300 px-7 py-3.5 font-medium text-sage-700 transition-all duration-300 hover:bg-sage-50"
              >
                About Ruchika
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem]">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-sage-200 via-sage-100 to-warm-100">
                <div className="p-10 text-center">
                  <div className="mx-auto mb-6 flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-sage-300 to-sage-400">
                    <span className="font-display text-5xl font-bold text-white">
                      RC
                    </span>
                  </div>
                  <p className="font-display text-xl font-medium text-sage-700">
                    Dt. Ruchika Chawla
                  </p>
                  <p className="mt-1 text-sm text-sage-500">
                    Certified Clinical Nutritionist
                  </p>
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute right-8 top-8 rounded-2xl p-4 shadow-medium glass-card"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-100">
                    <Check className="h-5 w-5 text-sage-700" />
                  </div>
                  <div>
                    <p className="text-xs text-olive-gray">This month</p>
                    <p className="text-sm font-semibold text-charcoal">
                      48 clients transformed
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute bottom-12 left-8 rounded-2xl p-4 shadow-medium glass-card"
              >
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {["PS", "AR", "KM"].map((initials) => (
                      <div
                        key={initials}
                        className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-sage-200 text-[10px] font-medium text-sage-700"
                      >
                        {initials}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className="h-3 w-3 fill-warm-500 text-warm-500"
                        />
                      ))}
                    </div>
                    <p className="mt-0.5 text-[11px] text-olive-gray">
                      4.9/5 from 500+ reviews
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="mt-20 lg:mt-24"
        >
          <div className="rounded-2xl p-8 shadow-soft glass-card md:p-10">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-4">
              {STATS.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`text-center ${
                    index < STATS.length - 1
                      ? "md:border-r md:border-sage-200/50"
                      : ""
                  }`}
                >
                  <p className="font-display text-3xl font-bold text-sage-600 md:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-olive-gray">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
