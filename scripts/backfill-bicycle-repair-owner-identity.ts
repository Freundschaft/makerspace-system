import "dotenv/config";
import { prisma } from "@/lib/prisma";

type CountRow = {
  count: bigint | number;
};

type ColumnRow = {
  count: bigint | number;
};

function toNumber(value: bigint | number) {
  return typeof value === "bigint" ? Number(value) : value;
}

async function columnExists(columnName: string) {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set");
  }

  const [databaseName] = new URL(databaseUrl).pathname.replace(/^\//, "").split("?");

  if (!databaseName) {
    throw new Error("Could not determine database name from DATABASE_URL");
  }

  const rows = await prisma.$queryRawUnsafe<ColumnRow[]>(
    `
      SELECT COUNT(*) AS count
      FROM information_schema.COLUMNS
      WHERE TABLE_SCHEMA = ?
        AND TABLE_NAME = 'BicycleRepair'
        AND COLUMN_NAME = ?
    `,
    databaseName,
    columnName,
  );

  return toNumber(rows[0]?.count ?? 0) > 0;
}

async function ensureColumns() {
  if (!(await columnExists("ownerName"))) {
    await prisma.$executeRawUnsafe(
      "ALTER TABLE `BicycleRepair` ADD COLUMN `ownerName` VARCHAR(191) NULL",
    );
  }

  if (!(await columnExists("ownerIdCardNumber"))) {
    await prisma.$executeRawUnsafe(
      "ALTER TABLE `BicycleRepair` ADD COLUMN `ownerIdCardNumber` VARCHAR(191) NULL",
    );
  }
}

async function backfillRows() {
  const updatedRows = await prisma.$executeRawUnsafe(`
    UPDATE \`BicycleRepair\`
    SET
      \`ownerName\` = CASE
        WHEN \`ownerName\` IS NULL OR TRIM(\`ownerName\`) = ''
          THEN CONCAT('Unknown owner ', LEFT(\`id\`, 8))
        ELSE \`ownerName\`
      END,
      \`ownerIdCardNumber\` = CASE
        WHEN \`ownerIdCardNumber\` IS NULL OR TRIM(\`ownerIdCardNumber\`) = ''
          THEN CONCAT('UNKNOWN-', UPPER(LEFT(REPLACE(\`id\`, '-', ''), 8)))
        ELSE \`ownerIdCardNumber\`
      END
  `);

  return updatedRows;
}

async function enforceRequiredColumns() {
  await prisma.$executeRawUnsafe(
    "ALTER TABLE `BicycleRepair` MODIFY COLUMN `ownerName` VARCHAR(191) NOT NULL",
  );
  await prisma.$executeRawUnsafe(
    "ALTER TABLE `BicycleRepair` MODIFY COLUMN `ownerIdCardNumber` VARCHAR(191) NOT NULL",
  );
}

async function countPlaceholderRows() {
  const rows = await prisma.$queryRawUnsafe<CountRow[]>(`
    SELECT COUNT(*) AS count
    FROM \`BicycleRepair\`
    WHERE \`ownerName\` LIKE 'Unknown owner %'
       OR \`ownerIdCardNumber\` LIKE 'UNKNOWN-%'
  `);

  return toNumber(rows[0]?.count ?? 0);
}

async function main() {
  await ensureColumns();
  const updatedRows = await backfillRows();
  await enforceRequiredColumns();
  const placeholderRows = await countPlaceholderRows();

  console.log(`Backfill complete. Rows touched: ${updatedRows}.`);
  console.log(`Repairs still using placeholder identity values: ${placeholderRows}.`);
}

main()
  .catch((error) => {
    console.error("Failed to backfill bicycle repair owner identity:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
