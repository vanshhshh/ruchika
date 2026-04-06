import { NextResponse } from "next/server";

import { getChatbotReply } from "@/lib/chatbot";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { message?: string };
    const message = body.message?.trim();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    const result = getChatbotReply(message);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      {
        error: "The assistant could not process that message right now.",
      },
      { status: 500 }
    );
  }
}
