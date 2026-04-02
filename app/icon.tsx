import { createBrandIconResponse } from "@/lib/branding/icon-response";

export const size = {
  width: 192,
  height: 192,
};

export const contentType = "image/png";

export default async function Icon() {
  return createBrandIconResponse(size.width, size.height, { padded: true });
}
