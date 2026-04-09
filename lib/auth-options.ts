import type { NextAuthOptions } from "next-auth";
import { decode as defaultJwtDecode } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import { UserRole } from "@/generated/prisma";

const authSecret = process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET;
const allowedGoogleDomain = process.env.ALLOWED_GOOGLE_DOMAIN?.trim().toLowerCase();

function isAllowedGoogleEmail(email?: string | null) {
  if (!email || !allowedGoogleDomain) {
    return false;
  }

  const normalizedEmail = email.trim().toLowerCase();
  return normalizedEmail.endsWith(`@${allowedGoogleDomain}`);
}

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
    async signIn({ user, account, profile }) {
      const email = user.email?.trim().toLowerCase() ?? null;
      const emailVerified =
        profile && "email_verified" in profile
          ? profile.email_verified === true
          : false;
      const hostedDomain =
        profile && "hd" in profile && typeof profile.hd === "string"
          ? profile.hd.trim().toLowerCase()
          : null;

      if (!allowedGoogleDomain) {
        console.error("ALLOWED_GOOGLE_DOMAIN is not configured");
        return false;
      }

      if (!email || !emailVerified || !isAllowedGoogleEmail(email)) {
        return false;
      }

      if (hostedDomain && hostedDomain !== allowedGoogleDomain) {
        return false;
      }

      const dbUser = await syncUserRole({
        email,
        googleId: account?.providerAccountId,
      });

      return Boolean(dbUser?.enabled);
    },
    async jwt({ token, account, user }) {
      const dbUser = await syncUserRole({
        email:
          typeof token.email === "string"
            ? token.email.trim().toLowerCase()
            : user?.email?.trim().toLowerCase(),
        googleId:
          typeof account?.providerAccountId === "string"
            ? account.providerAccountId
            : typeof token.sub === "string"
              ? token.sub
              : null,
      });

      if (dbUser) {
        token.enabled = dbUser.enabled === true;
        token.role = dbUser.role;
        token.userId = dbUser.id;
      } else {
        token.enabled = false;
      }

      return token;
    },
    async session({ session, token }) {
      if (!token.enabled) {
        return {
          ...session,
          user: undefined,
        };
      }

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
