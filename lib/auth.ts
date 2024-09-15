
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from './prisma';


export const NEXT_AUTH_CONFIG = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt" as const,  // Correct type usage

      },
      callbacks: {
        async session({ session, token, user } : {
            session:any, token:any ,user:any
        }) {
          // Check if the session has a user object
          if (session.user) {
            // Use the token's sub (which is the user ID) if available
            session.user.id = token.sub || user.id;
          }
          return session;
        },
        async jwt({ token, user } : {
            token:any , user:any
        }) {
          // Persist the user ID to the token
          if (user) {
            token.sub = user.id;
          }
          return token;
        },
      },
      pages:{
        signIn: '/signin'
      },
  }