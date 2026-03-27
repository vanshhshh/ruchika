import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import UnlockButton from "@/components/products/UnlockButton";
import { authOptions } from "@/lib/authOptions";
import { PRODUCTS } from "@/lib/data";
import { getDatabase } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "My Products",
  description: "Secure dashboard for purchased digital products.",
};

type PurchaseRow = {
  productId: string;
  createdAt: Date;
};

export default async function MyProductsPage() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  if (!userEmail) {
    redirect("/");
  }

  const db = await getDatabase();
  const purchasesCollection = db.collection("purchases");

  const purchases = await purchasesCollection
    .find<PurchaseRow>(
      {
        userEmail,
        paymentStatus: "paid",
      },
      {
        projection: {
          _id: 0,
          productId: 1,
          createdAt: 1,
        },
      }
    )
    .sort({ createdAt: -1 })
    .toArray();

  const purchasedProducts = purchases
    .map((purchase) => {
      const product = PRODUCTS.find((item) => item.id === purchase.productId);
      if (!product) {
        return null;
      }

      return {
        purchaseId: `${purchase.productId}-${purchase.createdAt.toISOString()}`,
        purchasedAt: purchase.createdAt,
        product,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="font-display text-4xl font-bold text-charcoal md:text-5xl">My Products</h1>
        <p className="mt-4 max-w-3xl text-olive-gray">
          Access your purchased files securely. Download links are signed and expire automatically for better content protection.
        </p>

        {purchasedProducts.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-sage-100 bg-white p-8 shadow-soft">
            <p className="text-sm text-olive-gray">No purchases found yet.</p>
            <Link href="/products" className="mt-4 inline-block text-sm font-medium text-sage-700 hover:underline">
              Browse digital products
            </Link>
          </div>
        ) : null}

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {purchasedProducts.map((item) => (
            <article key={item.purchaseId} className="rounded-2xl border border-sage-100 bg-white p-6 shadow-soft">
              <h2 className="font-display text-2xl font-semibold text-charcoal">{item.product.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-olive-gray">{item.product.description}</p>
              <p className="mt-4 text-xs text-olive-gray">Purchased on {formatDate(item.purchasedAt)}</p>
              <div className="mt-6">
                <UnlockButton productId={item.product.id} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
