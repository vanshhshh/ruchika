import NextAuth from "next-auth";
import { NextResponse, type NextRequest } from "next/server";

import {
  getAuthConfigurationError,
  getAuthOptions,
} from "@/lib/authOptions";

type AuthRouteContext = {
  params: Promise<{ nextauth: string[] }>;
};

function getConfigErrorResponse() {
  const configError = getAuthConfigurationError();

  if (!configError) {
    return null;
  }

  return NextResponse.json({ error: configError }, { status: 500 });
}

export async function GET(request: NextRequest, context: AuthRouteContext) {
  const configErrorResponse = getConfigErrorResponse();

  if (configErrorResponse) {
    return configErrorResponse;
  }

  return NextAuth(request, context, getAuthOptions());
}

export async function POST(request: NextRequest, context: AuthRouteContext) {
  const configErrorResponse = getConfigErrorResponse();

  if (configErrorResponse) {
    return configErrorResponse;
  }

  return NextAuth(request, context, getAuthOptions());
}
