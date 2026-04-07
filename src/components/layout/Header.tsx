"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Instagram, Menu, ShoppingBag, X } from "lucide-react";

import HeaderAuthActions from "@/components/auth/HeaderAuthActions";
import BrandLogo from "@/components/layout/BrandLogo";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/data";
import { cn } from "@/lib/utils";

const ANNOUNCEMENT_TEXT =
  "PERSONALIZED NUTRITION FOR HORMONES, GUT & WEIGHT BALANCE";
const DESKTOP_NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/reviews", label: "Reviews" },
  { href: "/products", label: "Products" },
  { href: "/my-products", label: "Library" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const isActiveLink = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50">
        <div className="border-b border-warm-200/70 bg-warm-100 px-4 py-1 text-center">
          <p className="text-[10px] uppercase tracking-[0.16em] text-sage-900 sm:text-[11px] sm:tracking-[0.22em] md:text-xs md:tracking-[0.28em]">
            {ANNOUNCEMENT_TEXT}
          </p>
        </div>

        <div className="border-b border-sage-100/70 bg-[#fffdf8] shadow-[0_14px_28px_rgba(37,48,20,0.08)]">
          <div className="mx-auto hidden h-[5.25rem] w-full max-w-7xl items-center justify-between px-6 lg:flex xl:px-10">
            <div className="flex items-center gap-10">
              <BrandLogo
                variant="immersive"
                preload
                sizes="176px"
                className="w-36"
                imageClassName="drop-shadow-[0_12px_26px_rgba(37,48,20,0.12)]"
              />
              <nav className="flex items-center gap-7 xl:gap-8">
                {DESKTOP_NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative pb-1 font-display text-[1.28rem] leading-none tracking-[-0.03em] text-charcoal transition-colors duration-300 xl:text-[1.42rem]",
                      isActiveLink(item.href) ? "text-sage-700" : "hover:text-sage-600"
                    )}
                  >
                    {item.label}
                    {isActiveLink(item.href) ? (
                      <span className="absolute inset-x-0 -bottom-0.5 h-px bg-sage-600/70" />
                    ) : null}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-3 text-sage-700">
              <HeaderAuthActions />
              <Link
                href="/products"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sage-200 bg-cream text-sage-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-sage-50 hover:text-charcoal"
                aria-label="View digital products"
              >
                <ShoppingBag className="h-4 w-4" />
              </Link>
              <a
                href={SITE_CONFIG.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sage-200 bg-cream text-sage-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-sage-50 hover:text-charcoal"
                aria-label="Visit Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <Link
                href="/about"
                className="inline-flex items-center rounded-sm bg-sage-700 px-4 py-2.5 text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-[0_10px_20px_rgba(71,96,34,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-sage-800"
              >
                Book
              </Link>
            </div>
          </div>

          <div className="lg:hidden">
            <div className="flex h-16 items-center justify-between px-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-sage-200 bg-[#f7f4ef] text-sage-800 transition-colors hover:bg-sage-100"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>

              <BrandLogo
                variant="immersive"
                preload
                sizes="156px"
                className="w-30"
                imageClassName="drop-shadow-[0_10px_20px_rgba(37,48,20,0.12)]"
              />

              <Link
                href="/about"
                className="rounded-sm bg-sage-700 px-3 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-white shadow-[0_8px_14px_rgba(71,96,34,0.22)]"
              >
                Book
              </Link>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 bottom-0 top-[5.75rem] z-40 overflow-y-auto bg-cream/98 px-6 py-6 text-charcoal backdrop-blur-lg lg:hidden"
          >
            <nav className="flex flex-col gap-2">
              {NAV_ITEMS.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06, duration: 0.35 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "block rounded-2xl px-4 py-4 text-center font-display text-xl leading-none tracking-[-0.02em] transition-all",
                      isActiveLink(item.href)
                        ? "bg-sage-100 text-sage-700"
                        : "text-charcoal hover:bg-sage-50"
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-6 flex items-center justify-center gap-3">
              <HeaderAuthActions
                mobile
                onAction={() => setIsMobileMenuOpen(false)}
              />
            </div>

            <div className="mt-4 flex items-center justify-center gap-3">
              <Link
                href="/products"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-sage-200 bg-white text-sage-700"
                aria-label="View products"
              >
                <ShoppingBag className="h-4 w-4" />
              </Link>
              <a
                href={SITE_CONFIG.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-sage-200 bg-white text-sage-700"
                aria-label="Visit Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
