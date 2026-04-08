import { timingSafeEqual } from "node:crypto";

import type { NextRequest } from "next/server";

function getSecretFromRequest(request: NextRequest) {
  const authorization = request.headers.get("authorization");
  const bearerToken = authorization?.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length).trim()
    : null;

  return bearerToken || request.headers.get("x-api-secret")?.trim() || null;
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
  const expectedSecret = process.env.REPORTS_API_SECRET?.trim();
  const providedSecret = getSecretFromRequest(request);

  if (!expectedSecret || !providedSecret) {
    return false;
  }

  return safeCompare(expectedSecret, providedSecret);
}
