import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { NextRequest } from "next/server";

import {
  createPublicTeamGetHandler,
  type PublicTeamFindManyArgs,
  type PublicTeamProfile,
} from "./handler";

const testApiSecret = "test-public-team-api-secret";

interface TestTeamMember extends PublicTeamProfile {
  status: "ACTIVE" | "INACTIVE";
  email?: string;
  phone?: string;
  homeAddress?: string;
  dateOfBirth?: Date;
  legalSupportComment?: string;
  keys?: string;
}

function request(query = "", token: string | null = testApiSecret) {
  const headers = token
    ? { authorization: `Bearer ${token}` }
    : undefined;

  return new NextRequest(`http://localhost/api/team/public${query}`, {
    headers,
  });
}

function createTestHandler(records: TestTeamMember[]) {
  const queries: PublicTeamFindManyArgs[] = [];
  const handler = createPublicTeamGetHandler({
    authorize: async (incomingRequest) =>
      incomingRequest.headers.get("authorization") ===
      `Bearer ${testApiSecret}`,
    findMany: async (args) => {
      queries.push(args);

      return records.filter(
        (record) =>
          (!args.where?.status || record.status === args.where.status) &&
          (!args.where?.department ||
            record.department === args.where.department)
      );
    },
  });

  return { handler, queries };
}

const activeWorkshopMember: TestTeamMember = {
  id: "active-workshop-member",
  givenNames: "Alex",
  familyName: "Example",
  department: "Workshop",
  photoPath: "/team-photos/active-workshop-member.jpg",
  status: "ACTIVE",
};

const activeBoardMember: TestTeamMember = {
  id: "active-board-member",
  givenNames: "Bailey",
  familyName: "Example",
  department: "Board",
  photoPath: "/team-photos/active-board-member.jpg",
  status: "ACTIVE",
};

const inactiveBoardMember: TestTeamMember = {
  id: "inactive-board-member",
  givenNames: "Cameron",
  familyName: "Example",
  department: "Board",
  photoPath: null,
  status: "INACTIVE",
};

describe("GET /api/team/public", () => {
  it("returns active profiles only when status=ACTIVE", async () => {
    const { handler, queries } = createTestHandler([
      activeWorkshopMember,
      inactiveBoardMember,
    ]);

    const response = await handler(request("?status=ACTIVE"));
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.deepEqual(body.map((member: PublicTeamProfile) => member.id), [
      "active-workshop-member",
    ]);
    assert.deepEqual(queries[0].where, { status: "ACTIVE" });
  });

  it("returns only active Board profiles when both filters are supplied", async () => {
    const { handler, queries } = createTestHandler([
      activeWorkshopMember,
      activeBoardMember,
      inactiveBoardMember,
    ]);

    const response = await handler(
      request("?status=ACTIVE&department=Board")
    );
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.deepEqual(body.map((member: PublicTeamProfile) => member.id), [
      "active-board-member",
    ]);
    assert.deepEqual(queries[0].where, {
      status: "ACTIVE",
      department: "Board",
    });
  });

  it("returns an empty array when a department has no members", async () => {
    const { handler, queries } = createTestHandler([activeBoardMember]);

    const response = await handler(request("?department=NoSuchDepartment"));

    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), []);
    assert.deepEqual(queries[0].where, {
      department: "NoSuchDepartment",
    });
  });

  it("rejects invalid status values", async () => {
    const { handler, queries } = createTestHandler([]);

    const response = await handler(request("?status=PENDING"));

    assert.equal(response.status, 400);
    assert.deepEqual(await response.json(), {
      error: "Invalid query parameters",
    });
    assert.equal(queries.length, 0);
  });

  it("returns exactly the five allowed fields when sensitive data is populated", async () => {
    const sensitiveMember: TestTeamMember = {
      ...activeBoardMember,
      email: "private@example.invalid",
      phone: "+000000000",
      homeAddress: "Private address",
      dateOfBirth: new Date("2000-01-01T00:00:00.000Z"),
      legalSupportComment: "Private note",
      keys: "Private key record",
    };
    const { handler, queries } = createTestHandler([sensitiveMember]);

    const response = await handler(request("?status=ACTIVE"));
    const [profile] = await response.json();

    assert.deepEqual(Object.keys(profile).sort(), [
      "department",
      "familyName",
      "givenNames",
      "id",
      "photoPath",
    ]);
    assert.deepEqual(queries[0].select, {
      id: true,
      givenNames: true,
      familyName: true,
      department: true,
      photoPath: true,
    });
    assert.deepEqual(queries[0].orderBy, [
      { givenNames: "asc" },
      { familyName: "asc" },
    ]);
  });

  it("rejects requests without valid authentication", async () => {
    const { handler, queries } = createTestHandler([activeBoardMember]);

    for (const token of [null, "invalid-token"]) {
      const response = await handler(request("?status=ACTIVE", token));

      assert.equal(response.status, 401);
      assert.deepEqual(await response.json(), { error: "Unauthorized" });
    }

    assert.equal(queries.length, 0);
  });
});
