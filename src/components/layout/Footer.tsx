import Link from "next/link";
import { Mail, Instagram, Youtube, Phone, ArrowUpRight } from "lucide-react";

import BrandLogo from "@/components/layout/BrandLogo";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-sage-800 text-white">
      <div className="absolute left-0 right-0 top-0 h-px bg-linear-to-r from-transparent via-sage-400/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 pb-10 pt-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-2">
            <BrandLogo
              className="mb-5 w-[8.5rem] border-white/15 bg-white/95 shadow-[0_18px_45px_rgba(57,70,56,0.28)]"
              sizes="136px"
            />
            <p className="mb-6 max-w-md text-sm leading-relaxed text-sage-300">
              {SITE_CONFIG.description}
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: SITE_CONFIG.instagram, label: "Instagram" },
                { icon: Youtube, href: SITE_CONFIG.youtube, label: "YouTube" },
                { icon: Mail, href: `mailto:${SITE_CONFIG.email}`, label: "Email" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-700/50 text-sage-300 transition-all duration-300 hover:-translate-y-0.5 hover:bg-sage-600 hover:text-white"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-5 font-display text-sm font-semibold uppercase tracking-wider text-sage-400">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1 text-sm text-sage-300 transition-colors duration-200 hover:text-white"
                  >
                    {item.label}
                    <ArrowUpRight className="h-3 w-3 translate-x-0.5 -translate-y-0.5 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 font-display text-sm font-semibold uppercase tracking-wider text-sage-400">
              Get in Touch
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-start gap-3 text-sm text-sage-300 transition-colors hover:text-white"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{SITE_CONFIG.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="flex items-start gap-3 text-sm text-sage-300 transition-colors hover:text-white"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{SITE_CONFIG.phone}</span>
                </a>
              </li>
            </ul>

            <div className="mt-8 rounded-xl border border-sage-600/30 bg-sage-700/40 p-4">
              <p className="text-xs leading-relaxed text-sage-300">
                <span className="font-medium text-sage-200">Disclaimer:</span>{" "}
                Nutrition advice is not a substitute for medical treatment.
                Please consult your doctor for medical conditions.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-sage-700/50 pt-8 md:flex-row">
          <p className="text-xs text-sage-400">
            Copyright {new Date().getFullYear()} Nourished with Ruchika Chawla.
          </p>
          <div className="flex items-center gap-6 text-xs text-sage-400">
            <Link href="#" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#" className="transition-colors hover:text-white">
              Terms of Service
            </Link>
            <Link href="#" className="transition-colors hover:text-white">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
