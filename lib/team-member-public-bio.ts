import { z } from "zod";

import { MAX_PUBLIC_BIO_LENGTH } from "@/lib/team-member-public-bio-constants";

export const publicBioSchema = z.preprocess(
  (value) =>
    typeof value === "string" && value.trim() === "" ? null : value,
  z.string().trim().max(MAX_PUBLIC_BIO_LENGTH).nullable().optional()
);
