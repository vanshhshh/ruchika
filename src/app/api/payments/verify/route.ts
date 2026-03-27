import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { PRODUCTS } from "@/lib/data";
import { authOptions } from "@/lib/authOptions";
import { getDatabase } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      productId?: string;
      razorpayOrderId?: string;
      razorpayPaymentId?: string;
      razorpaySignature?: string;
    };

    const product = PRODUCTS.find((item) => item.id === body.productId);

    if (!product || !body.razorpayOrderId || !body.razorpayPaymentId || !body.razorpaySignature) {
      return NextResponse.json({ error: "Invalid payment payload." }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    if (!userEmail) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const razorpaySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!razorpaySecret) {
      return NextResponse.json({ error: "Razorpay secret not configured." }, { status: 500 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", razorpaySecret)
      .update(`${body.razorpayOrderId}|${body.razorpayPaymentId}`)
      .digest("hex");

    if (expectedSignature !== body.razorpaySignature) {
      return NextResponse.json({ error: "Payment signature mismatch." }, { status: 400 });
    }

    const db = await getDatabase();
    const users = db.collection("users");
    const purchases = db.collection("purchases");

    await users.updateOne(
      { email: userEmail },
      {
        $set: {
          email: userEmail,
          name: session.user?.name ?? userEmail,
          image: session.user?.image ?? null,
          updatedAt: new Date(),
        },
        $setOnInsert: {
          createdAt: new Date(),
        },
      },
      { upsert: true }
    );

    await purchases.updateOne(
      {
        userEmail,
        productId: product.id,
      },
      {
        $set: {
          userEmail,
          productId: product.id,
          razorpayOrderId: body.razorpayOrderId,
          razorpayPaymentId: body.razorpayPaymentId,
          amount: product.price,
          paymentStatus: "paid",
          updatedAt: new Date(),
        },
        $setOnInsert: {
          createdAt: new Date(),
        },
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to verify payment.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
