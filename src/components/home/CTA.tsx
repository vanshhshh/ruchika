"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

import { SITE_CONFIG } from "@/lib/data";

export default function CTA() {
  const whatsappHref = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
    "Hi Ruchika! I'd like to know more about your nutrition plans."
  )}`;

  return (
    <section className="relative overflow-hidden py-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-br from-sage-900 via-sage-700 to-warm-700" />
        <div className="absolute right-0 top-0 h-100 w-100 rounded-full bg-sage-400/18 blur-[80px]" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-warm-300/18 blur-[80px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/12 px-4 py-1.5 text-xs font-medium text-warm-100 backdrop-blur-sm">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Free 15-minute discovery call</span>
          </div>

          <h2 className="font-display text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            Ready to Transform{" "}
            <span className="bg-linear-to-r from-warm-200 via-warm-300 to-white bg-clip-text text-transparent">
              Your Health?
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-sage-100/90">
            Take the first step towards a healthier you. Whether you&apos;re
            looking to manage your weight, balance your hormones, or simply eat
            better, I&apos;m here to guide you every step of the way.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 rounded-full bg-warm-300 px-8 py-4 font-semibold text-sage-900 transition-all duration-300 hover:-translate-y-0.5 hover:bg-warm-200 hover:shadow-xl hover:shadow-warm-300/25"
            >
              Explore Plans
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-4 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
