import NextAuth from "next-auth";
import { NextResponse, type NextRequest } from "next/server";

import {
  getAuthConfigurationError,
  getAuthOptions,
} from "@/lib/authOptions";

type AuthRouteContext = {
  params: Promise<{ nextauth: string[] }>;
};

async function getConfigErrorResponse(
  request: NextRequest,
  context: AuthRouteContext
) {
  const configError = getAuthConfigurationError();

  if (!configError) {
    return null;
  }

  const { nextauth = [] } = await context.params;
  const authAction = nextauth[0];

  if (request.method === "GET" && authAction === "session") {
    return NextResponse.json(null);
  }

  if (request.method === "POST" && authAction === "_log") {
    return new NextResponse(null, { status: 204 });
  }

  return NextResponse.json({ error: configError }, { status: 500 });
}

export async function GET(request: NextRequest, context: AuthRouteContext) {
  const configErrorResponse = await getConfigErrorResponse(request, context);

  if (configErrorResponse) {
    return configErrorResponse;
  }

  return NextAuth(request, context, getAuthOptions());
}

export async function POST(request: NextRequest, context: AuthRouteContext) {
  const configErrorResponse = await getConfigErrorResponse(request, context);

  if (configErrorResponse) {
    return configErrorResponse;
  }

  return NextAuth(request, context, getAuthOptions());
}
