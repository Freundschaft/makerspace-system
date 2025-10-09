import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

/**
 * Returns the authenticated token or null. Throws if NEXTAUTH_SECRET is missing.
 */
export async function requireAuth(request: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) {
    throw new Error("NEXTAUTH_SECRET is not set");
  }

  return getToken({ req: request, secret });
}
