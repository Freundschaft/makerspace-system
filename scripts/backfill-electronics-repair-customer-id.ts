import "dotenv/config";
import { prisma } from "@/lib/prisma";

type CountRow = {
  count: bigint | number;
};

function toNumber(value: bigint | number) {
  return typeof value === "bigint" ? Number(value) : value;
}

async function ensureColumn() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set");
  }

  const [databaseName] = new URL(databaseUrl).pathname.replace(/^\//, "").split("?");

  const rows = await prisma.$queryRawUnsafe<CountRow[]>(
    `
      SELECT COUNT(*) AS count
      FROM information_schema.COLUMNS
      WHERE TABLE_SCHEMA = ?
        AND TABLE_NAME = 'ElectronicsRepair'
        AND COLUMN_NAME = 'customerIdCardNumber'
    `,
    databaseName,
  );

  if (toNumber(rows[0]?.count ?? 0) === 0) {
    await prisma.$executeRawUnsafe(
      "ALTER TABLE `ElectronicsRepair` ADD COLUMN `customerIdCardNumber` VARCHAR(191) NULL",
    );
  }
}

async function backfillRows() {
  return prisma.$executeRawUnsafe(`
    UPDATE \`ElectronicsRepair\`
    SET \`customerIdCardNumber\` = CASE
      WHEN \`customerIdCardNumber\` IS NULL OR TRIM(\`customerIdCardNumber\`) = ''
        THEN CONCAT('UNKNOWN-', LPAD(\`repairId\`, 6, '0'))
      ELSE \`customerIdCardNumber\`
    END
  `);
}

async function enforceRequiredColumn() {
  await prisma.$executeRawUnsafe(
    "ALTER TABLE `ElectronicsRepair` MODIFY COLUMN `customerIdCardNumber` VARCHAR(191) NOT NULL",
  );
}

async function countPlaceholderRows() {
  const rows = await prisma.$queryRawUnsafe<CountRow[]>(`
    SELECT COUNT(*) AS count
    FROM \`ElectronicsRepair\`
    WHERE \`customerIdCardNumber\` LIKE 'UNKNOWN-%'
  `);

  return toNumber(rows[0]?.count ?? 0);
}

async function main() {
  await ensureColumn();
  const updatedRows = await backfillRows();
  await enforceRequiredColumn();
  const placeholderRows = await countPlaceholderRows();

  console.log(`Backfill complete. Rows touched: ${updatedRows}.`);
  console.log(`Repairs still using placeholder ID values: ${placeholderRows}.`);
}

main()
  .catch((error) => {
    console.error("Failed to backfill electronics repair customer ID:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
