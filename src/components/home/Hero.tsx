"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check, Sparkles, Star } from "lucide-react";

import IndianPortrait, {
  PortraitAvatar,
} from "@/components/illustrations/IndianPortrait";
import { RUCHIKA_CREDENTIALS, STATS } from "@/lib/data";

export default function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-8rem)] items-center overflow-hidden bg-linear-to-b from-cream via-[#f7ecd1] to-ivory md:min-h-screen">
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-10 top-20 h-125 w-125 rounded-full bg-sage-300/30 blur-[100px]" />
        <div className="absolute bottom-20 left-10 h-105 w-105 rounded-full bg-warm-300/28 blur-[100px]" />
        <div className="absolute left-1/2 top-1/2 h-155 w-155 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sage-100/35 blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, var(--color-sage-500) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 py-14 sm:py-16 lg:py-0">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-sage-200/80 bg-linear-to-r from-sage-100 to-warm-100 px-4 py-1.5 text-[11px] font-medium text-sage-800 shadow-soft sm:text-xs"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Trusted by 2000+ clients across India</span>
            </motion.div>

            <motion.h1
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Eat Well. <span className="text-gradient">Feel Well.</span>
              <br />
              Live Well.
            </motion.h1>

            <motion.p
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-5 max-w-lg text-base leading-relaxed text-olive-gray sm:text-lg"
            >
              Transform your relationship with food through personalized,
              science-backed Indian nutrition plans. No fad diets, no
              restrictions, just real food for real results.
            </motion.p>

            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-8 grid gap-3 sm:mt-10 sm:flex sm:flex-wrap sm:gap-4"
            >
              <Link
                href="/products"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-sage-600 px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-sage-700 hover:shadow-xl hover:shadow-sage-600/20 sm:w-auto sm:text-base"
              >
                Explore Plans
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/about"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-sage-300 bg-white/65 px-7 py-3.5 text-sm font-medium text-sage-800 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90 sm:w-auto sm:text-base"
              >
                Book Consultation
              </Link>
              <Link
                href="#free-guide"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-warm-300 bg-warm-100/80 px-7 py-3.5 text-sm font-medium text-sage-900 transition-all duration-300 hover:-translate-y-0.5 hover:bg-warm-100 sm:w-auto sm:text-base"
              >
                Get Free Guide
              </Link>
            </motion.div>

            <div className="mt-8 lg:hidden">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/40 shadow-soft">
                <div className="absolute inset-0 bg-linear-to-br from-sage-300 via-sage-100 to-warm-200">
                  <IndianPortrait
                    variant="ruchika"
                    title="Ruchika Chawla portrait"
                    className="h-full w-full"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-charcoal/25 via-transparent to-transparent" />
                </div>
                <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/35 bg-white/80 p-3 backdrop-blur-sm">
                  <p className="font-display text-lg font-semibold text-sage-800">
                    Dt. Ruchika Chawla
                  </p>
                  <p className="mt-0.5 text-xs text-sage-700">
                    Clinical Nutritionist & Hormonal Health Coach
                  </p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-4xl border border-white/40 shadow-elevated">
              <div className="absolute inset-0 bg-linear-to-br from-sage-300 via-sage-100 to-warm-200">
                <IndianPortrait
                  variant="ruchika"
                  title="Ruchika Chawla portrait"
                  className="h-full w-full"
                />
                <div className="absolute inset-0 bg-linear-to-t from-charcoal/35 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/30 bg-white/78 p-4 backdrop-blur-sm">
                  <p className="font-display text-xl font-semibold text-sage-800">
                    Dt. Ruchika Chawla
                  </p>
                  <p className="mt-1 text-sm text-sage-700">
                    Clinical Nutritionist & Hormonal Health Coach
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {RUCHIKA_CREDENTIALS.slice(0, 2).map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-sage-100 px-3 py-1 text-[11px] font-medium text-sage-700"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
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
                    {([
                      { variant: "priya", title: "Priya portrait" },
                      { variant: "ananya", title: "Ananya portrait" },
                      { variant: "kavita", title: "Kavita portrait" },
                    ] as const).map((person) => (
                      <PortraitAvatar
                        key={person.variant}
                        variant={person.variant}
                        title={person.title}
                        className="h-8 w-8 border-2 border-white"
                      />
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
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="mt-14 sm:mt-16 lg:mt-24"
        >
          <div className="rounded-2xl border border-sage-200/70 bg-linear-to-r from-[#fff9ef] via-[#f9efd8] to-[#f4e5c0] p-6 shadow-medium sm:p-8 md:p-10">
            <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4 md:gap-4">
              {STATS.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`text-center ${
                    index < STATS.length - 1
                      ? "md:border-r md:border-sage-200/50"
                      : ""
                  }`}
                >
                  <p className="font-display text-2xl font-bold text-sage-600 sm:text-3xl md:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-olive-gray sm:text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
