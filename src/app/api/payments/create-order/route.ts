import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { PRODUCTS } from "@/lib/data";
import { authOptions } from "@/lib/authOptions";
import { createRazorpayClient } from "@/lib/payments/razorpay";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { productId?: string };
    const productId = body.productId;

    if (!productId) {
      return NextResponse.json({ error: "Missing productId." }, { status: 400 });
    }

    const product = PRODUCTS.find((item) => item.id === productId);

    if (!product) {
      return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }

    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    if (!userEmail) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const razorpay = createRazorpayClient();
    const order = await razorpay.orders.create({
      amount: product.price * 100,
      currency: "INR",
      receipt: `${product.id}-${Date.now()}`,
      notes: {
        userEmail,
        productId: product.id,
      },
    });

    return NextResponse.json({
      order,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to create order.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
