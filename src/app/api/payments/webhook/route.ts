import crypto from "node:crypto";
import { NextResponse } from "next/server";

import { getDatabase } from "@/lib/db";

function timingSafeEqualHex(a: string, b: string) {
  try {
    return crypto.timingSafeEqual(Buffer.from(a, "hex"), Buffer.from(b, "hex"));
  } catch {
    return false;
  }
}

type RazorpayWebhookPayload = {
  event?: string;
  payload?: {
    payment?: {
      entity?: {
        id?: string;
        order_id?: string;
        amount?: number;
        notes?: {
          userEmail?: string;
          productId?: string;
        };
      };
    };
  };
};

export async function POST(request: Request) {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return NextResponse.json({ error: "Webhook secret not configured." }, { status: 500 });
  }

  const signature = request.headers.get("x-razorpay-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing webhook signature." }, { status: 400 });
  }

  const rawBody = await request.text();
  const expectedSignature = crypto.createHmac("sha256", webhookSecret).update(rawBody).digest("hex");

  if (!timingSafeEqualHex(signature, expectedSignature)) {
    return NextResponse.json({ error: "Invalid webhook signature." }, { status: 400 });
  }

  const body = JSON.parse(rawBody) as RazorpayWebhookPayload;

  if (body.event !== "payment.captured") {
    return NextResponse.json({ ok: true });
  }

  const payment = body.payload?.payment?.entity;
  const userEmail = payment?.notes?.userEmail;
  const productId = payment?.notes?.productId;
  const razorpayOrderId = payment?.order_id;
  const razorpayPaymentId = payment?.id;

  if (!userEmail || !productId || !razorpayOrderId || !razorpayPaymentId) {
    return NextResponse.json({ error: "Incomplete webhook payload." }, { status: 400 });
  }

  const db = await getDatabase();
  const purchases = db.collection("purchases");

  await purchases.updateOne(
    {
      userEmail,
      productId,
    },
    {
      $set: {
        userEmail,
        productId,
        razorpayOrderId,
        razorpayPaymentId,
        amount: (payment.amount ?? 0) / 100,
        paymentStatus: "paid",
        updatedAt: new Date(),
      },
      $setOnInsert: {
        createdAt: new Date(),
      },
    },
    { upsert: true }
  );

  return NextResponse.json({ ok: true });
}
