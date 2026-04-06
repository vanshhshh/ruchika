import { NextResponse } from "next/server";

import { getDatabase } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string };
    const email = body.email?.trim().toLowerCase();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
    }

    const db = await getDatabase();
    await db.collection("free_guide_leads").updateOne(
      { email },
      {
        $set: {
          email,
          source: "homepage_free_guide",
          updatedAt: new Date().toISOString(),
        },
        $setOnInsert: {
          createdAt: new Date().toISOString(),
        },
      },
      { upsert: true }
    );

    return NextResponse.json({ ok: true, downloadUrl: "/free-guide.pdf" });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Could not save your email right now.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
