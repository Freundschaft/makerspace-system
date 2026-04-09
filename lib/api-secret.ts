import { timingSafeEqual } from "node:crypto";

import type { NextRequest } from "next/server";

import { requireAdmin, requireAuth } from "@/lib/auth";

function getSecretFromRequest(request: NextRequest) {
  const authorization = request.headers.get("authorization");
  const bearerToken = authorization?.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length).trim()
    : null;

  return bearerToken || request.headers.get("x-api-secret")?.trim() || null;
}

function isReadOnlyMethod(request: NextRequest) {
  return request.method === "GET" || request.method === "HEAD";
}

function safeCompare(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

export function hasValidApiSecret(request: NextRequest) {
  if (!isReadOnlyMethod(request)) {
    return false;
  }

  const expectedSecret = process.env.API_SECRET?.trim();
  const providedSecret = getSecretFromRequest(request);

  if (!expectedSecret || !providedSecret) {
    return false;
  }

  return safeCompare(expectedSecret, providedSecret);
}

export async function hasSessionOrApiSecret(request: NextRequest) {
  if (hasValidApiSecret(request)) {
    return true;
  }

  const token = await requireAuth(request);
  return Boolean(token);
}

export async function hasAdminSessionOrApiSecret(request: NextRequest) {
  if (hasValidApiSecret(request)) {
    return true;
  }

  const user = await requireAdmin(request);
  return Boolean(user);
}
