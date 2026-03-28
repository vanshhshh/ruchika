import { MongoDBAdapter } from "@auth/mongodb-adapter";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import getMongoClientPromise from "@/lib/mongodb";

const authEnvKeys = [
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "NEXTAUTH_SECRET",
  "MONGODB_URI",
] as const;

export function getAuthConfigurationError() {
  const missingKeys = authEnvKeys.filter((key) => !process.env[key]);

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

  return {
    adapter: MongoDBAdapter(getMongoClientPromise),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: "jwt",
    },
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
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
