import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { PrismaClient, UserRole } from "../generated/prisma/index.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

function loadDotEnv() {
  const envPath = resolve(process.cwd(), ".env");
  let contents = "";

  try {
    contents = readFileSync(envPath, "utf8");
  } catch {
    return;
  }

  for (const line of contents.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex < 0) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    if (!key || process.env[key] !== undefined) {
      continue;
    }

    let value = trimmed.slice(separatorIndex + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    process.env[key] = value;
  }
}

function createPrismaClient() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set");
  }

  const connectionUrl = new URL(databaseUrl);
  const adapter = new PrismaMariaDb({
    host: connectionUrl.hostname,
    port: parseInt(connectionUrl.port || "3306", 10),
    user: decodeURIComponent(connectionUrl.username),
    password: decodeURIComponent(connectionUrl.password),
    database: decodeURIComponent(connectionUrl.pathname.slice(1)),
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT || "2", 10),
    acquireTimeout: parseInt(process.env.DB_ACQUIRE_TIMEOUT_MS || "10000", 10),
    connectTimeout: parseInt(process.env.DB_CONNECT_TIMEOUT_MS || "10000", 10),
    idleTimeout: parseInt(process.env.DB_IDLE_TIMEOUT_S || "60", 10),
    keepAliveDelay: 0,
  });

  return new PrismaClient({ adapter });
}

function parseArgs() {
  const args = process.argv.slice(2);
  return {
    write: args.includes("--write"),
  };
}

async function main() {
  loadDotEnv();
  const prisma = createPrismaClient();
  const { write } = parseArgs();

  try {
    const adminUsers = await prisma.user.findMany({
      where: { role: UserRole.ADMIN },
      select: { id: true, email: true },
    });

    const summary = {
      repairParts: await prisma.repairPart.count(),
      parts: await prisma.part.count(),
      bicycleRepairs: await prisma.bicycleRepair.count(),
      bicycleRentals: await prisma.bicycleRental.count(),
      teamMemberPresences: await prisma.teamMemberPresence.count(),
      teamMembers: await prisma.teamMember.count(),
      electronicsRepairs: await prisma.electronicsRepair.count(),
      carpentryProjects: await prisma.carpentryProject.count(),
      houseProjects: await prisma.houseProject.count(),
      expenses: await prisma.expense.count(),
      budgets: await prisma.budget.count(),
      nonAdminUsers: await prisma.user.count({
        where: {
          role: {
            not: UserRole.ADMIN,
          },
        },
      }),
      adminUsers: adminUsers.length,
    };

    console.log("Clear imported data summary:");
    console.table(summary);
    console.log(
      "Admin users kept:",
      adminUsers.map((user) => user.email || user.id).join(", ") || "(none)"
    );

    if (!write) {
      console.log(
        "Dry run only. Re-run with --write to actually delete imported data and non-admin users."
      );
      return;
    }

    await prisma.$transaction([
      prisma.repairPart.deleteMany(),
      prisma.expense.deleteMany(),
      prisma.budget.deleteMany(),
      prisma.bicycleRental.deleteMany(),
      prisma.bicycleRepair.deleteMany(),
      prisma.part.deleteMany(),
      prisma.teamMemberPresence.deleteMany(),
      prisma.teamMember.deleteMany(),
      prisma.electronicsRepair.deleteMany(),
      prisma.carpentryProject.deleteMany(),
      prisma.houseProject.deleteMany(),
      prisma.user.deleteMany({
        where: {
          role: {
            not: UserRole.ADMIN,
          },
        },
      }),
    ]);

    console.log("Imported data cleared. Admin accounts were preserved.");
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
