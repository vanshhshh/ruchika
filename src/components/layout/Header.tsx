"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import AuthActions from "@/components/auth/AuthActions";
import BrandLogo from "@/components/layout/BrandLogo";
import { NAV_ITEMS } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-50 border-b transition-all duration-500",
          isScrolled
            ? "border-sage-200/60 bg-cream/92 shadow-soft backdrop-blur-xl"
            : "border-transparent bg-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between py-4 lg:hidden">
            <div className="w-10 shrink-0" />
            <BrandLogo
              preload
              sizes="160px"
              className={cn(
                "w-[8.25rem] transition-all duration-300",
                isScrolled && "w-[7.5rem]"
              )}
            />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative h-10 w-10 shrink-0 rounded-full bg-sage-50 text-sage-700 transition-colors hover:bg-sage-100"
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
          </div>

          <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-6 lg:py-4">
            <nav className="flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                    pathname === item.href
                      ? "text-sage-800"
                      : "text-olive-gray hover:text-charcoal"
                  )}
                >
                  {item.label}
                  {pathname === item.href && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 -z-10 rounded-full bg-white/85 shadow-[inset_0_0_0_1px_rgba(162,179,139,0.25)]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            <BrandLogo
              preload
              sizes="180px"
              className={cn(
                "justify-self-center transition-all duration-300",
                isScrolled ? "w-[9rem]" : "w-[10rem]"
              )}
            />

            <div className="flex items-center justify-end gap-3 xl:gap-4">
              <AuthActions />
              <Link
                href="/about"
                className="hidden xl:inline-flex items-center gap-2 rounded-full bg-sage-600 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-sage-700 hover:shadow-lg hover:shadow-sage-600/20"
              >
                <span>Book Consultation</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-cream/98 pt-28 backdrop-blur-lg lg:hidden"
          >
            <nav className="flex flex-col items-center gap-2 px-6">
              {NAV_ITEMS.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.07, duration: 0.4 }}
                  className="w-full"
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "block rounded-2xl py-4 text-center font-display text-lg font-medium transition-all",
                      pathname === item.href
                        ? "bg-sage-100 text-sage-700"
                        : "text-charcoal hover:bg-sage-50"
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: NAV_ITEMS.length * 0.07,
                  duration: 0.4,
                }}
                className="mt-4 w-full"
              >
                <Link
                  href="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block rounded-2xl bg-sage-600 py-4 text-center text-lg font-medium text-white transition-colors hover:bg-sage-700"
                >
                  Book Consultation
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
