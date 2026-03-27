import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BuyButton from "@/components/products/BuyButton";
import { PRODUCTS } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((item) => item.slug === slug);

  if (!product) {
    return { title: "Product" };
  }

  return {
    title: product.title,
    description: product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = PRODUCTS.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <h1 className="font-display text-4xl font-bold text-charcoal md:text-5xl">{product.title}</h1>
          <p className="mt-5 text-base leading-relaxed text-olive-gray">{product.longDescription}</p>

          <h2 className="mt-8 font-display text-2xl font-semibold text-charcoal">What you get</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-sm text-olive-gray">
            {product.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>

        <aside className="h-fit rounded-2xl border border-sage-100 bg-white p-6 shadow-soft">
          <p className="text-sm text-olive-gray">One-time purchase</p>
          <div className="mt-2 flex items-end gap-2">
            <span className="text-3xl font-semibold text-sage-700">{formatPrice(product.price)}</span>
            {product.originalPrice ? (
              <span className="pb-1 text-sm text-olive-gray line-through">{formatPrice(product.originalPrice)}</span>
            ) : null}
          </div>
          <p className="mt-4 text-xs text-olive-gray">
            After successful payment, this product will be unlocked in My Products.
          </p>
          <div className="mt-6">
            <BuyButton productId={product.id} productTitle={product.title} />
          </div>
        </aside>
      </div>
    </section>
  );
}
