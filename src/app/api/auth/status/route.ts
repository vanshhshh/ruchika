import { NextResponse } from "next/server";

import { getAuthConfigurationError } from "@/lib/authOptions";

export async function GET() {
  const error = getAuthConfigurationError();

  return NextResponse.json({
    configured: !error,
    error,
  });
}
