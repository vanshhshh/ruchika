"use client";

import { MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/data";

const whatsappHref = `https://wa.me/${SITE_CONFIG.whatsapp}`;

export default function WhatsAppFloat() {
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-[70] inline-flex items-center gap-3 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-[0_18px_45px_rgba(37,211,102,0.32)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#1ebc59]"
    >
      <span className="absolute inset-0 -z-10 rounded-full bg-[#25D366]/35 blur-xl" />
      <MessageCircle className="h-5 w-5 shrink-0" />
      <span className="hidden text-sm font-semibold sm:inline">
        WhatsApp us
      </span>
    </a>
  );
}
