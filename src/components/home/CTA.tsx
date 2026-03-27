"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-sage-700 via-sage-800 to-sage-900" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-sage-600/20 blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-warm-400/10 blur-[80px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-sage-300 text-xs font-medium mb-8 backdrop-blur-sm border border-white/10">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Free 15-minute discovery call</span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Ready to Transform{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sage-300 to-warm-300">
              Your Health?
            </span>
          </h2>

          <p className="mt-6 text-sage-300 text-lg leading-relaxed max-w-2xl mx-auto">
            Take the first step towards a healthier you. Whether you&apos;re
            looking to manage your weight, balance your hormones, or simply eat
            better — I&apos;m here to guide you every step of the way.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-sage-800 font-semibold rounded-full hover:bg-sage-50 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
            >
              Explore Plans
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href={`https://wa.me/919876543210?text=Hi%20Ruchika!%20I'd%20like%20to%20know%20more%20about%20your%20nutrition%20plans.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-medium rounded-full hover:bg-white/10 transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
