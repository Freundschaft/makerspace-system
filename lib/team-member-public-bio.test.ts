import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { MAX_PUBLIC_BIO_LENGTH } from "./team-member-public-bio-constants";
import { publicBioSchema } from "./team-member-public-bio";

describe("publicBioSchema", () => {
  it("trims valid public biographies", () => {
    assert.equal(
      publicBioSchema.parse("  Helps coordinate community projects.  "),
      "Helps coordinate community projects."
    );
  });

  it("normalizes blank biographies to null", () => {
    assert.equal(publicBioSchema.parse("   "), null);
  });

  it("allows an omitted biography for existing API clients", () => {
    assert.equal(publicBioSchema.parse(undefined), undefined);
  });

  it("rejects biographies above the maximum length", () => {
    assert.equal(
      publicBioSchema.safeParse("a".repeat(MAX_PUBLIC_BIO_LENGTH + 1)).success,
      false
    );
  });

  it("rejects non-string values", () => {
    assert.equal(publicBioSchema.safeParse({ text: "bio" }).success, false);
  });
});
