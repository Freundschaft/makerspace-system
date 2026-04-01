import type { NextAuthOptions } from "next-auth";
import { decode as defaultJwtDecode } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import { UserRole } from "@/generated/prisma";

const authSecret = process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET;

async function syncUserRole(params: {
  email?: string | null;
  googleId?: string | null;
}) {
  const { email, googleId } = params;

  if (!email && !googleId) {
    return null;
  }

  const lookupWhere = googleId && email
    ? { OR: [{ googleId }, { email }] }
    : googleId
      ? { googleId }
      : { email: email! };

  const existingUser = await prisma.user.findFirst({
    where: lookupWhere,
  });

  if (existingUser) {
    return prisma.user.update({
      where: { id: existingUser.id },
      data: {
        email: email ?? existingUser.email,
        googleId: googleId ?? existingUser.googleId,
      },
    });
  }

  if (!googleId) {
    return null;
  }

  return prisma.user.create({
    data: {
      email,
      googleId,
      role: UserRole.TEAM_MEMBER,
      enabled: true,
    },
  });
}

export const authOptions: NextAuthOptions = {
  secret: authSecret,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  jwt: {
    async decode(params) {
      try {
        return await defaultJwtDecode(params);
      } catch {
        // Treat stale or undecryptable cookies as signed-out state.
        return null;
      }
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      const dbUser = await syncUserRole({
        email: user.email,
        googleId: account?.providerAccountId,
      });

      return Boolean(dbUser);
    },
    async jwt({ token, account, user }) {
      const dbUser = await syncUserRole({
        email: typeof token.email === "string" ? token.email : user?.email,
        googleId:
          typeof account?.providerAccountId === "string"
            ? account.providerAccountId
            : typeof token.sub === "string"
              ? token.sub
              : null,
      });

      if (dbUser) {
        token.role = dbUser.role;
        token.userId = dbUser.id;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role =
          token.role === UserRole.TEAM_MEMBER
            ? UserRole.TEAM_MEMBER
            : token.role === UserRole.ADMIN
              ? UserRole.ADMIN
              : UserRole.TEAM_MEMBER;
        session.user.id =
          typeof token.userId === "string" ? token.userId : undefined;
      }

      return session;
    },
  },
};
