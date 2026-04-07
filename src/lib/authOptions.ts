import { MongoDBAdapter } from "@auth/mongodb-adapter";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import getMongoClientPromise from "@/lib/mongodb";

function getFirstNonEmptyEnv(...keys: string[]) {
  for (const key of keys) {
    const value = process.env[key]?.trim();
    if (value) {
      return value;
    }
  }

  return "";
}

export function getAuthConfigurationError() {
  const googleClientId = getFirstNonEmptyEnv("NEXTAUTH_GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_ID");
  const googleClientSecret = getFirstNonEmptyEnv("NEXTAUTH_GOOGLE_CLIENT_SECRET", "GOOGLE_CLIENT_SECRET");
  const nextAuthSecret = getFirstNonEmptyEnv("NEXTAUTH_SECRET");
  const mongodbUri = getFirstNonEmptyEnv("MONGODB_URI");

  const missingKeys: string[] = [];

  if (!googleClientId) {
    missingKeys.push("NEXTAUTH_GOOGLE_CLIENT_ID or GOOGLE_CLIENT_ID");
  }
  if (!googleClientSecret) {
    missingKeys.push("NEXTAUTH_GOOGLE_CLIENT_SECRET or GOOGLE_CLIENT_SECRET");
  }
  if (!nextAuthSecret) {
    missingKeys.push("NEXTAUTH_SECRET");
  }
  if (!mongodbUri) {
    missingKeys.push("MONGODB_URI");
  }

  if (!missingKeys.length) {
    return null;
  }

  return `Missing auth environment variables: ${missingKeys.join(", ")}.`;
}

export function getAuthOptions(): NextAuthOptions {
  const configError = getAuthConfigurationError();

  if (configError) {
    throw new Error(configError);
  }

  const googleClientId = getFirstNonEmptyEnv("NEXTAUTH_GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_ID");
  const googleClientSecret = getFirstNonEmptyEnv("NEXTAUTH_GOOGLE_CLIENT_SECRET", "GOOGLE_CLIENT_SECRET");

  return {
    adapter: MongoDBAdapter(getMongoClientPromise),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: "jwt",
    },
    providers: [
      GoogleProvider({
        clientId: googleClientId,
        clientSecret: googleClientSecret,
      }),
    ],
    pages: {
      signIn: "/",
    },
    callbacks: {
      async session({ session, token }) {
        if (session.user && token.email) {
          session.user.email = token.email;
        }
        return session;
      },
    },
  };
}
