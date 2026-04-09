import { getToken } from "next-auth/jwt";
import type { JWT } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { UserRole } from "@/generated/prisma";

/**
 * Returns the authenticated token or null. Throws if NEXTAUTH_SECRET is missing.
 */
export async function requireAuth(request: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("NEXTAUTH_SECRET is not set");
  }

  return getToken({ req: request, secret });
}

export interface AuthenticatedAppUser {
  id: string;
  email: string | null;
  role: UserRole;
  token: JWT;
}

export async function requireAppUser(
  request: NextRequest
): Promise<AuthenticatedAppUser | null> {
  const token = await requireAuth(request);
  if (!token) {
    return null;
  }

  const email = typeof token.email === "string" ? token.email : null;
  const googleId = typeof token.sub === "string" ? token.sub : null;

  if (!email && !googleId) {
    return null;
  }

  const lookupWhere = googleId && email
    ? { OR: [{ googleId }, { email }] }
    : googleId
      ? { googleId }
      : { email: email! };

  const user = await prisma.user.findFirst({
    where: lookupWhere,
    select: {
      enabled: true,
      id: true,
      email: true,
      role: true,
    },
  });

  if (!user || user.enabled !== true) {
    return null;
  }

  return {
    email: user.email,
    id: user.id,
    role: user.role,
    token,
  };
}

export async function requireAdmin(request: NextRequest) {
  const user = await requireAppUser(request);
  if (!user || user.role !== UserRole.ADMIN) {
    return null;
  }

  return user;
}
