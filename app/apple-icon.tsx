import { createBrandIconResponse } from "@/lib/branding/icon-response";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default async function AppleIcon() {
  return createBrandIconResponse(size.width, size.height, { padded: true });
}
