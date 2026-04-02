import { createBrandIconResponse } from "@/lib/branding/icon-response";

export const runtime = "nodejs";

export async function GET() {
  return createBrandIconResponse(192, 192, { padded: true });
}
