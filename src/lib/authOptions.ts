import { MongoDBAdapter } from "@auth/mongodb-adapter";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import clientPromise from "@/lib/mongodb";

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!googleClientId || !googleClientSecret) {
  throw new Error("Missing Google OAuth environment variables.");
}

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
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
