import { createBrandIconResponse } from "@/lib/branding/icon-response";

export const runtime = "nodejs";

export async function GET() {
  return createBrandIconResponse(512, 512, { maskable: true, padded: true });
}
