import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

import BuyButton from "@/components/products/BuyButton";
import { Badge } from "@/components/ui/badge";
import { PRODUCTS } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Digital Products",
  description: "Premium diet plans, recipe ebooks, and fitness guides by Ruchika Chawla.",
};

export default function ProductsPage() {
  return (
    <section className="py-20 md:py-24">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <h1 className="font-display text-4xl font-bold text-charcoal md:text-5xl">Digital Products</h1>
          <p className="mt-4 text-olive-gray">
            Downloadable plans built for measurable outcomes and practical implementation.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product) => (
            <article key={product.id} className="rounded-2xl border border-sage-100 bg-white p-6 shadow-soft">
              {product.badge ? <Badge className="mb-4">{product.badge}</Badge> : null}
              <h2 className="font-display text-2xl font-semibold text-charcoal">{product.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-olive-gray">{product.description}</p>

              <div className="mt-4 flex items-end gap-2">
                <span className="text-2xl font-semibold text-sage-700">{formatPrice(product.price)}</span>
                {product.originalPrice ? (
                  <span className="pb-0.5 text-sm text-olive-gray line-through">{formatPrice(product.originalPrice)}</span>
                ) : null}
              </div>

              <ul className="mt-4 list-disc space-y-1 pl-5 text-xs text-olive-gray">
                {product.features.slice(0, 3).map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>

              <div className="mt-6 space-y-2">
                <BuyButton productId={product.id} productTitle={product.title} />
                <Link href={`/products/${product.slug}`} className="block text-center text-sm text-sage-700 hover:underline">
                  View details
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
