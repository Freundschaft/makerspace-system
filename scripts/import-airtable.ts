import { readFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { resolve } from "node:path";
import { Readable } from "node:stream";

import {
  CarpentryCustomerType,
  CarpentryGender,
  CarpentryOrderType,
  ElectronicsCategory,
  ElectronicsRepairStatus,
  JobStatus,
  PrismaClient,
  RepairStatus,
  RentalStatus,
  TeamMemberStatus,
} from "../generated/prisma/index.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import * as ftp from "basic-ftp";

type ModuleName =
  | "team"
  | "electronics"
  | "bicycle-repairs"
  | "rentals"
  | "carpentry"
  | "projects"
  | "jobs";

type AirtableAttachment = {
  url: string;
};

type AirtableRecord = {
  id: string;
  fields: Record<string, unknown>;
  createdTime: string;
};

type AirtableListResponse = {
  records: AirtableRecord[];
  offset?: string;
};

const PROGRESS_EVERY = 100;
const BATCH_WRITE_SIZE = 250;

let prisma: PrismaClient;

const DEFAULT_MODULES: ModuleName[] = [
  "team",
  "electronics",
  "bicycle-repairs",
  "rentals",
  "carpentry",
  "projects",
  "jobs",
];

function parseBaseIds(value: string | undefined, fallback: string[]) {
  if (!value) {
    return fallback;
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

const BASE_IDS = {
  team: process.env.AIRTABLE_TEAM_BASE_ID || "applcBkmGbKfiRbVl",
  electronics: parseBaseIds(process.env.AIRTABLE_ELECTRONICS_BASE_IDS, [
    "appJgb5Axcnrylc3g",
    "appa8QskVbtYWTfS6",
  ]),
  bicycleRepairs: parseBaseIds(process.env.AIRTABLE_BICYCLE_REPAIRS_BASE_IDS, [
    "appQI0YGpBn3hlR4D",
    "appYA7TN9jWJdItZt",
    "appjtHhV5wKkvb0s0",
    "appa298jkznK6qL7g",
    "app0uLG4xFtSIMNiv",
    "appAKjM32kvP5Nja1",
    "appz11VLYcWUfpo87",
  ]),
  rentals: process.env.AIRTABLE_RENTALS_BASE_ID || "appMzGKV5q6TEGaxh",
  carpentry: process.env.AIRTABLE_CARPENTRY_BASE_ID || "appILeLHxoWHQxpn4",
  projects: process.env.AIRTABLE_PROJECTS_BASE_ID || "appOwEJZsw3HTFldf",
  jobs: process.env.AIRTABLE_JOBS_BASE_ID || "appjUfr5vrmW9usxd",
} as const;

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

function getToken() {
  const token = process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN;
  if (!token) {
    throw new Error("AIRTABLE_PERSONAL_ACCESS_TOKEN is not set");
  }
  return token;
}

function getDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set");
  }
  return databaseUrl;
}

function createPrismaClient() {
  const connectionUrl = new URL(getDatabaseUrl());
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
  const modulesArg = args.find((arg) => arg.startsWith("--modules="));
  const write = args.includes("--write");
  const allowNonEmpty = args.includes("--allow-non-empty");
  const modules = modulesArg
    ? modulesArg
        .split("=")[1]
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean) as ModuleName[]
    : DEFAULT_MODULES;

  return {
    modules,
    write,
    allowNonEmpty,
  };
}

async function airtableRequest<T>(path: string) {
  const response = await fetch(`https://api.airtable.com/v0/${path}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Airtable request failed (${response.status}): ${body}`);
  }

  return (await response.json()) as T;
}

function logProgress(message: string) {
  console.log(`[airtable-import] ${message}`);
}

function formatBytes(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function createTransferProgressLogger(
  label: string,
  phase: "download" | "upload",
  totalBytes: number
) {
  let lastBucket = -1;

  return (bytesTransferred: number) => {
    if (totalBytes > 0) {
      const percent = Math.min(
        100,
        Math.floor((bytesTransferred / totalBytes) * 100)
      );
      const bucket = Math.floor(percent / 10);
      if (bucket !== lastBucket || percent === 100) {
        lastBucket = bucket;
        logProgress(
          `${label}: ${phase} ${percent}% (${formatBytes(
            bytesTransferred
          )}/${formatBytes(totalBytes)})`
        );
      }
      return;
    }

    const bucket = Math.floor(bytesTransferred / (1024 * 1024));
    if (bucket !== lastBucket) {
      lastBucket = bucket;
      logProgress(
        `${label}: ${phase} ${formatBytes(bytesTransferred)} transferred`
      );
    }
  };
}

function logModuleProgress(
  moduleName: ModuleName,
  current: number,
  total: number,
  action: "dry-run" | "import"
) {
  if (current === 1 || current === total || current % PROGRESS_EVERY === 0) {
    logProgress(
      `${moduleName}: ${action} ${current}/${total} (${Math.round(
        (current / total) * 100
      )}%)`
    );
  }
}

function chunkArray<T>(items: T[], size: number) {
  const chunks: T[][] = [];
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }
  return chunks;
}

async function listRecords(baseId: string, tableName: string) {
  const records: AirtableRecord[] = [];
  let offset: string | undefined;
  let page = 0;

  logProgress(`fetching ${tableName} from base ${baseId}`);

  do {
    page += 1;
    const params = new URLSearchParams({
      pageSize: "100",
    });
    if (offset) {
      params.set("offset", offset);
    }

    const response = await airtableRequest<AirtableListResponse>(
      `${baseId}/${encodeURIComponent(tableName)}?${params.toString()}`
    );
    records.push(...response.records);
    logProgress(
      `fetched page ${page} from ${baseId}/${tableName} (${records.length} records so far)`
    );
    offset = response.offset;
  } while (offset);

  logProgress(`completed fetch for ${baseId}/${tableName}: ${records.length} records`);
  return records;
}

async function listRecordsFromBases(baseIds: string[], tableName: string) {
  const recordGroups = await Promise.all(
    baseIds.map((baseId) => listRecords(baseId, tableName))
  );
  return recordGroups.flat();
}

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function asOptionalString(value: unknown) {
  const next = asString(value);
  return next || null;
}

function normalizeEmailPart(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ".")
    .replace(/^\.+|\.+$/g, "")
    .replace(/\.{2,}/g, ".");
}

function buildFallbackEmail(givenNames: string, familyName: string) {
  const localPart = [normalizeEmailPart(givenNames), normalizeEmailPart(familyName)]
    .filter(Boolean)
    .join(".");

  return `${localPart || "team.member"}@makerspace-lesvos.org`;
}

function buildTeamIdentityKey(
  givenNames: string,
  familyName: string,
  dateOfBirth: Date | null
) {
  return [
    normalizeEmailPart(givenNames),
    normalizeEmailPart(familyName),
    dateOfBirth ? dateOfBirth.toISOString().slice(0, 10) : "",
  ].join("::");
}

function asBoolean(value: unknown) {
  return value === true;
}

function asDate(value: unknown) {
  const next = asString(value);
  return next ? new Date(next) : null;
}

function firstAttachmentUrl(value: unknown) {
  if (!Array.isArray(value) || value.length === 0) {
    return null;
  }

  const first = value[0] as AirtableAttachment | undefined;
  return first?.url || null;
}

function getFtpConfig() {
  return {
    host: process.env.FTP_HOST || "",
    user: process.env.FTP_USER || "",
    password: process.env.FTP_USER_PASSWORD || "",
    secure: true,
  };
}

function getExtensionFromContentType(contentType: string | null) {
  switch ((contentType || "").split(";")[0].trim().toLowerCase()) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    case "image/gif":
      return "gif";
    case "image/svg+xml":
      return "svg";
    case "application/pdf":
      return "pdf";
    default:
      return null;
  }
}

function getExtensionFromUrl(url: string) {
  const match = url.match(/\.([a-zA-Z0-9]{2,5})(?:\?|$)/);
  return match ? match[1].toLowerCase() : null;
}

async function importRemoteFile(
  sourceUrl: string | null,
  targetDir: string,
  existingPath?: string | null,
  label?: string
) {
  if (!sourceUrl) {
    return existingPath || null;
  }

  if (existingPath && !existingPath.startsWith("http://") && !existingPath.startsWith("https://")) {
    return existingPath;
  }

  const progressLabel = label || `${targetDir} file`;
  logProgress(`${progressLabel}: starting attachment import`);
  const response = await fetch(sourceUrl);
  if (!response.ok) {
    throw new Error(`Failed to download Airtable attachment (${response.status})`);
  }

  const totalBytes = Number(response.headers.get("content-length") || "0");
  const logDownloadProgress = createTransferProgressLogger(
    progressLabel,
    "download",
    totalBytes
  );
  let buffer: Buffer;

  if (response.body) {
    const reader = response.body.getReader();
    const chunks: Uint8Array[] = [];
    let bytesReceived = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }

      if (value) {
        chunks.push(value);
        bytesReceived += value.byteLength;
        logDownloadProgress(bytesReceived);
      }
    }

    buffer = Buffer.concat(chunks.map((chunk) => Buffer.from(chunk)));
  } else {
    const arrayBuffer = await response.arrayBuffer();
    buffer = Buffer.from(arrayBuffer);
    logDownloadProgress(buffer.length);
  }

  const extension =
    getExtensionFromContentType(response.headers.get("content-type")) ||
    getExtensionFromUrl(sourceUrl) ||
    "bin";
  const filePath = `/${targetDir}/${randomUUID()}.${extension}`;

  const client = new ftp.Client();
  try {
    await client.access(getFtpConfig());
    await client.ensureDir(`/${targetDir}`);
    const logUploadProgress = createTransferProgressLogger(
      progressLabel,
      "upload",
      buffer.length
    );
    client.trackProgress((info) => {
      logUploadProgress(info.bytes);
    });
    await client.uploadFrom(Readable.from(buffer), filePath);
    logProgress(`${progressLabel}: completed attachment import -> ${filePath}`);
    return filePath;
  } finally {
    client.close();
  }
}

function firstStringFromArray(value: unknown) {
  if (Array.isArray(value)) {
    const first = value.find((item) => typeof item === "string");
    return typeof first === "string" ? first.trim() : "";
  }
  return asString(value);
}

function stringArray(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter((item): item is string => typeof item === "string");
}

function normalizeKey(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function nullableDecimal(value: unknown) {
  const next = Number(asString(value));
  return Number.isFinite(next) ? next : null;
}

function inferTeamStatus(rawStatus: string, endDate: Date | null) {
  const normalized = normalizeKey(rawStatus);
  if (
    normalized.includes("alumnus") ||
    normalized.includes("on leave") ||
    (endDate !== null && endDate < new Date())
  ) {
    return TeamMemberStatus.INACTIVE;
  }
  return TeamMemberStatus.ACTIVE;
}

function mapElectronicsCategory(rawCategory: string) {
  const normalized = normalizeKey(rawCategory);

  const categoryMap: Array<[string[], ElectronicsCategory]> = [
    [["phone", "phno", "phpne"], ElectronicsCategory.PHONE],
    [["tablet"], ElectronicsCategory.TABLET],
    [["headphones"], ElectronicsCategory.HEADPHONES],
    [["heater"], ElectronicsCategory.HEATER],
    [["speaker"], ElectronicsCategory.SPEAKER],
    [["hair clipper"], ElectronicsCategory.HAIR_CLIPPER],
    [["cooler"], ElectronicsCategory.COOLER],
    [["power bank"], ElectronicsCategory.POWER_BANK],
    [["kettle"], ElectronicsCategory.KETTLE],
    [["laptop"], ElectronicsCategory.LAPTOP],
    [["multi socket"], ElectronicsCategory.MULTI_SOCKET],
    [["pizza pan cable"], ElectronicsCategory.PIZZA_PAN_CABLE],
    [["pan"], ElectronicsCategory.PAN],
    [["glasses"], ElectronicsCategory.GLASSES],
    [["aux"], ElectronicsCategory.AUX],
    [["watch"], ElectronicsCategory.WATCH],
    [["adaptor"], ElectronicsCategory.ADAPTOR],
    [["handsfree"], ElectronicsCategory.HANDSFREE],
    [["cable"], ElectronicsCategory.CABLE],
    [["hair cutter"], ElectronicsCategory.HAIR_CUTTER],
    [["hair dryer"], ElectronicsCategory.HAIR_DRYER],
    [["fan"], ElectronicsCategory.FAN],
    [["printer"], ElectronicsCategory.PRINTER],
    [["electronic sigaret", "electronic cigarette"], ElectronicsCategory.ELECTRONIC_CIGARETTE],
    [["stove"], ElectronicsCategory.STOVE],
    [["pizza pan"], ElectronicsCategory.PIZZA_PAN],
    [["wireless"], ElectronicsCategory.WIRELESS],
    [["ear pad", "eear pad"], ElectronicsCategory.EAR_PAD],
    [["smart watch"], ElectronicsCategory.SMART_WATCH],
    [["xbox360"], ElectronicsCategory.XBOX360],
    [["toster", "toaster"], ElectronicsCategory.TOASTER],
    [["tailor machine"], ElectronicsCategory.TAILOR_MACHINE],
    [["batterie", "battery"], ElectronicsCategory.BATTERY],
    [["phonecase", "phone case"], ElectronicsCategory.PHONE_CASE],
    [["bracelet"], ElectronicsCategory.BRACELET],
    [["tesbih"], ElectronicsCategory.TESBIH],
    [["hand mixer"], ElectronicsCategory.HAND_MIXER],
    [["computer"], ElectronicsCategory.COMPUTER],
    [["swing machine", "sewing machine"], ElectronicsCategory.SEWING_MACHINE],
    [["water whatever", "water heater"], ElectronicsCategory.WATER_HEATER],
    [["pomp", "pump"], ElectronicsCategory.PUMP],
    [["keyboard"], ElectronicsCategory.KEYBOARD],
    [["plug"], ElectronicsCategory.PLUG],
    [["water boiler"], ElectronicsCategory.WATER_BOILER],
    [["terrapsy", "therapy"], ElectronicsCategory.THERAPY],
    [["coffe maker", "coffee maker"], ElectronicsCategory.COFFEE_MAKER],
    [["kitchen"], ElectronicsCategory.KITCHEN],
    [["board"], ElectronicsCategory.BOARD],
    [["mat"], ElectronicsCategory.MAT],
    [["radio"], ElectronicsCategory.RADIO],
    [["vacuum cleaner"], ElectronicsCategory.VACUUM_CLEANER],
  ];

  for (const [keys, category] of categoryMap) {
    if (keys.some((key) => normalized.includes(key))) {
      return category;
    }
  }

  return ElectronicsCategory.OTHER;
}

function mapElectronicsStatus(rawStatus: string) {
  const normalized = normalizeKey(rawStatus);
  if (normalized.includes("checked")) {
    return ElectronicsRepairStatus.CHECKED;
  }
  if (normalized.includes("in progress")) {
    return ElectronicsRepairStatus.IN_PROGRESS;
  }
  if (normalized.includes("ready for pickup")) {
    return ElectronicsRepairStatus.READY_FOR_PICKUP;
  }
  if (normalized === "done") {
    return ElectronicsRepairStatus.DONE;
  }
  if (normalized.includes("no way to fix")) {
    return ElectronicsRepairStatus.NO_WAY_TO_FIX;
  }
  if (normalized.includes("picked")) {
    return ElectronicsRepairStatus.PICKED_UP;
  }
  return ElectronicsRepairStatus.UNCHECKED;
}

function mapRepairStatus(repaired: boolean, pickedUp: boolean) {
  if (pickedUp) {
    return RepairStatus.PICKED_UP;
  }
  if (repaired) {
    return RepairStatus.COMPLETED;
  }
  return RepairStatus.PENDING;
}

function mapProblemTypes(rawProblem: string) {
  const normalized = normalizeKey(rawProblem);
  const values = new Set<string>();

  if (normalized.includes("puncture") || normalized.includes("flat") || normalized.includes("tire") || normalized.includes("tyre")) {
    values.add("FLAT_TIRE");
  }
  if (normalized.includes("brake")) {
    values.add("BRAKE_ISSUES");
  }
  if (normalized.includes("chain")) {
    values.add("CHAIN_ISSUES");
  }
  if (normalized.includes("gear") || normalized.includes("shifter") || normalized.includes("derailleur")) {
    values.add("GEAR_ISSUES");
  }
  if (normalized.includes("wheel") || normalized.includes("rim") || normalized.includes("spoke")) {
    values.add("WHEEL_ALIGNMENT");
  }
  if (normalized.includes("frame") || normalized.includes("fork")) {
    values.add("FRAME_DAMAGE");
  }
  if (normalized.includes("saddle") || normalized.includes("seat")) {
    values.add("SADDLE_ISSUES");
  }
  if (normalized.includes("handlebar") || normalized.includes("stem") || normalized.includes("grip")) {
    values.add("HANDLEBAR_ISSUES");
  }
  if (normalized.includes("pedal")) {
    values.add("PEDAL_ISSUES");
  }

  if (values.size === 0 && normalized) {
    values.add("OTHER");
  }

  return [...values];
}

function mapRentalStatus(returnValue: string) {
  return returnValue ? RentalStatus.RETURNED : RentalStatus.ACTIVE;
}

function mapCarpentryCustomerType(rawValue: string) {
  const normalized = normalizeKey(rawValue);
  if (normalized.includes("private person")) {
    return CarpentryCustomerType.PRIVATE_PERSON;
  }
  if (normalized.includes("organization")) {
    return CarpentryCustomerType.ORGANIZATION;
  }
  if (normalized.includes("barbershop")) {
    return CarpentryCustomerType.BARBERSHOP;
  }
  if (normalized.includes("house")) {
    return CarpentryCustomerType.HOUSE;
  }
  return null;
}

function mapCarpentryGender(rawValue: string) {
  const normalized = normalizeKey(rawValue);
  if (normalized === "female") {
    return CarpentryGender.FEMALE;
  }
  if (normalized === "male") {
    return CarpentryGender.MALE;
  }
  return null;
}

function mapCarpentryOrderType(rawValue: string) {
  const normalized = normalizeKey(rawValue);
  if (normalized.includes("repair order")) {
    return CarpentryOrderType.REPAIR_ORDER;
  }
  if (normalized.includes("project")) {
    return CarpentryOrderType.PROJECT;
  }
  return null;
}

function mapProjectStatus(rawValue: string) {
  const normalized = normalizeKey(rawValue);
  if (normalized === "done") {
    return "DONE" as const;
  }
  if (normalized === "in progress") {
    return "IN_PROGRESS" as const;
  }
  if (normalized === "off") {
    return "OFF" as const;
  }
  return "TODO" as const;
}

function mapJobStatus(rawValue: string) {
  const normalized = normalizeKey(rawValue);
  if (normalized === "closed") {
    return JobStatus.CLOSED;
  }
  return JobStatus.OPEN;
}

function collaboratorName(value: unknown) {
  if (Array.isArray(value)) {
    const first = value[0] as { name?: unknown; email?: unknown } | undefined;
    if (typeof first?.name === "string" && first.name.trim()) {
      return first.name.trim();
    }
    if (typeof first?.email === "string" && first.email.trim()) {
      return first.email.trim();
    }
    return null;
  }

  if (value && typeof value === "object") {
    const maybeCollaborator = value as { name?: unknown; email?: unknown };
    if (typeof maybeCollaborator.name === "string" && maybeCollaborator.name.trim()) {
      return maybeCollaborator.name.trim();
    }
    if (typeof maybeCollaborator.email === "string" && maybeCollaborator.email.trim()) {
      return maybeCollaborator.email.trim();
    }
  }

  return null;
}

async function ensureWritable(
  moduleName: ModuleName,
  write: boolean,
  allowNonEmpty: boolean
) {
  if (!write) {
    return;
  }

  const checks = {
    team: () => prisma.teamMember.count(),
    electronics: () => prisma.electronicsRepair.count(),
    "bicycle-repairs": () => prisma.bicycleRepair.count(),
    rentals: () => prisma.bicycleRental.count(),
    carpentry: () => prisma.carpentryProject.count(),
    projects: () => prisma.project.count(),
    jobs: () => prisma.job.count(),
  } as const;

  const count = await checks[moduleName]();
  if (count > 0 && !allowNonEmpty) {
    throw new Error(
      `${moduleName} table is not empty (${count} rows). Re-run with --allow-non-empty if you want to merge into existing data.`
    );
  }
}

async function importTeam(write: boolean, allowNonEmpty: boolean) {
  await ensureWritable("team", write, allowNonEmpty);
  logProgress(`team: starting ${write ? "import" : "dry run"}`);

  const [departmentRecords, teamRecords] = await Promise.all([
    listRecords(BASE_IDS.team, "Departments"),
    listRecords(BASE_IDS.team, "Team Directory"),
  ]);
  logProgress(
    `team: loaded ${departmentRecords.length} departments and ${teamRecords.length} team records`
  );

  const departmentByRecordId = new Map(
    departmentRecords.map((record) => [record.id, asString(record.fields.Name)])
  );

  let created = 0;
  let updated = 0;
  let skipped = 0;
  const existingMembers = await prisma.teamMember.findMany({
    select: {
      id: true,
      email: true,
      givenNames: true,
      familyName: true,
      dateOfBirth: true,
      photoPath: true,
      vaccinationCertificate: true,
      testCertificate: true,
      codeOfConductSignedAttachment: true,
      toolLiabilityWaiverSignedAttachment: true,
    },
  });
  const usedEmails = new Set(existingMembers.map((member) => member.email.toLowerCase()));
  const existingByEmail = new Map(
    existingMembers.map((member) => [member.email.toLowerCase(), member])
  );
  const existingByIdentity = new Map(
    existingMembers.map((member) => [
      buildTeamIdentityKey(member.givenNames, member.familyName, member.dateOfBirth),
      member,
    ])
  );

  for (const [index, record] of teamRecords.entries()) {
    logModuleProgress("team", index + 1, teamRecords.length, write ? "import" : "dry-run");
    const givenNames = asString(record.fields["Given Names"]);
    const familyName = asString(record.fields["Family Name"]);
    const existingEmail = asString(record.fields["Email address"]).toLowerCase();
    const dateOfBirth = asDate(record.fields["Date of Birth"]) || new Date("1970-01-01");
    const identityKey = buildTeamIdentityKey(givenNames, familyName, dateOfBirth);
    const matchedExisting =
      (existingEmail ? existingByEmail.get(existingEmail) : undefined) ||
      existingByIdentity.get(identityKey);
    const fallbackEmail = buildFallbackEmail(givenNames, familyName);
    let email = matchedExisting?.email.toLowerCase() || existingEmail || fallbackEmail;

    if (!matchedExisting && !existingEmail) {
      let suffix = 2;
      while (usedEmails.has(email)) {
        email = fallbackEmail.replace(
          /@makerspace-lesvos\.org$/,
          `${suffix}@makerspace-lesvos.org`
        );
        suffix += 1;
      }
    }
    usedEmails.add(email);

    const endDate = asDate(record.fields["End Date"]);
    const rawStatus = asString(record.fields.Status);
    const status = inferTeamStatus(rawStatus, endDate);
    const departmentIds = stringArray(record.fields.Department);
    const department =
      departmentIds.map((id) => departmentByRecordId.get(id)).find(Boolean) ||
      "Unassigned";

    const existing = matchedExisting || existingByEmail.get(email);
    const photoPath = write
      ? await importRemoteFile(
          firstAttachmentUrl(record.fields.Photo),
          "team-photos",
          existing?.photoPath,
          `team image ${index + 1}/${teamRecords.length} ${email}`
        )
      : firstAttachmentUrl(record.fields.Photo);
    const vaccinationCertificate = write
      ? await importRemoteFile(
          firstAttachmentUrl(record.fields["Vaccination Certificate"]),
          "team-documents",
          existing?.vaccinationCertificate,
          `team vaccination certificate ${index + 1}/${teamRecords.length} ${email}`
        )
      : firstAttachmentUrl(record.fields["Vaccination Certificate"]);
    const testCertificate = write
      ? await importRemoteFile(
          firstAttachmentUrl(record.fields["Test Certificate"]),
          "team-documents",
          existing?.testCertificate,
          `team test certificate ${index + 1}/${teamRecords.length} ${email}`
        )
      : firstAttachmentUrl(record.fields["Test Certificate"]);
    const codeOfConductSignedAttachment = write
      ? await importRemoteFile(
          firstAttachmentUrl(record.fields["Code of Conduct (signed attachment)"]),
          "team-documents",
          existing?.codeOfConductSignedAttachment,
          `team code of conduct ${index + 1}/${teamRecords.length} ${email}`
        )
      : firstAttachmentUrl(record.fields["Code of Conduct (signed attachment)"]);
    const toolLiabilityWaiverSignedAttachment = write
      ? await importRemoteFile(
          firstAttachmentUrl(record.fields["Tool Liability Waiver (signed)"]),
          "team-documents",
          existing?.toolLiabilityWaiverSignedAttachment,
          `team tool waiver ${index + 1}/${teamRecords.length} ${email}`
        )
      : firstAttachmentUrl(record.fields["Tool Liability Waiver (signed)"]);

    const data = {
      familyName,
      givenNames,
      nationality: asOptionalString(record.fields.Nationality),
      photoPath,
      status,
      googleAccountActive: status === TeamMemberStatus.ACTIVE,
      startDate: asDate(record.fields["Start date"]) || new Date(record.createdTime),
      endDate,
      department,
      email,
      secondaryEmail: existingEmail || null,
      phone: asString(record.fields.Phone),
      homeAddress: asOptionalString(record.fields["Home address"]),
      dateOfBirth,
      legalStatus: asOptionalString(record.fields["Legal Status"]),
      vaccinationCertificate,
      liabilityInsurance: typeof record.fields["Liability Insurance"] === "boolean"
        ? asBoolean(record.fields["Liability Insurance"])
        : null,
      accidentInsurance: typeof record.fields["Accident Insurance"] === "boolean"
        ? asBoolean(record.fields["Accident Insurance"])
        : null,
      testCertificate,
      livesInCamp: typeof record.fields["Lives in Camp"] === "boolean"
        ? asBoolean(record.fields["Lives in Camp"])
        : null,
      legalSupportStatus: asOptionalString(record.fields["Legal Support Status"]),
      legalSupportComment: asOptionalString(record.fields["Legal Support Comment"]),
      powerToolClearanceWood:
        typeof record.fields["Power Tool Clearance Wood"] === "boolean"
          ? asBoolean(record.fields["Power Tool Clearance Wood"])
          : null,
      powerToolClearanceMetal:
        typeof record.fields["Power Tool Clearance Metal"] === "boolean"
          ? asBoolean(record.fields["Power Tool Clearance Metal"])
          : null,
      weldingClearance: typeof record.fields["Welding Clearance"] === "boolean"
        ? asBoolean(record.fields["Welding Clearance"])
        : null,
      handToolsClearance: typeof record.fields["Hand Tools Clearance"] === "boolean"
        ? asBoolean(record.fields["Hand Tools Clearance"])
        : null,
      toolLiabilityWaiverSigned:
        typeof record.fields["Tool Liability Waiver signed"] === "boolean"
          ? asBoolean(record.fields["Tool Liability Waiver signed"])
          : null,
      vaccinationComment: asOptionalString(record.fields["Vaccination Comment"]),
      driversLicenseCar:
        typeof record.fields["Drivers License (Car)"] === "boolean"
          ? asBoolean(record.fields["Drivers License (Car)"])
          : null,
      registeredForMakerspaceVan:
        typeof record.fields["Registered for Makerspace Van"] === "boolean"
          ? asBoolean(record.fields["Registered for Makerspace Van"])
          : null,
      registeredForOhfVan:
        typeof record.fields["Registered for OHF Van"] === "boolean"
          ? asBoolean(record.fields["Registered for OHF Van"])
          : null,
      codeOfConductSigned:
        typeof record.fields["Code of Conduct Signed"] === "boolean"
          ? asBoolean(record.fields["Code of Conduct Signed"])
          : null,
      safeguardingPolicySigned:
        typeof record.fields["Safeguarding Policy Signed"] === "boolean"
          ? asBoolean(record.fields["Safeguarding Policy Signed"])
          : null,
      codeOfConductSignedAttachment,
      codeOfConductSigningDate: asDate(
        record.fields["Code of Conduct Signing Date"]
      ),
      safeguardingPolicySigningDate: asDate(
        record.fields["Safeguarding Policy Signing Date"]
      ),
      keys: firstStringFromArray(record.fields.Keys) || null,
      fireSafetyTraining:
        typeof record.fields["Fire Safety Training"] === "boolean"
          ? asBoolean(record.fields["Fire Safety Training"])
          : null,
      firstAidTraining:
        typeof record.fields["First Aid Training"] === "boolean"
          ? asBoolean(record.fields["First Aid Training"])
          : null,
      safetyTraining: typeof record.fields["Safety Training"] === "boolean"
        ? asBoolean(record.fields["Safety Training"])
        : null,
      cardNumber: asOptionalString(record.fields["CARD NR"]),
      toolLiabilityWaiverSignedAttachment,
      toolLiabilityWaiverSigningDate: asDate(
        record.fields["Tool Liability Waiver Signing Date"]
      ),
    };

    if (!write) {
      existing ? updated++ : created++;
      continue;
    }

    if (existing) {
      await prisma.teamMember.update({
        where: { email },
        data,
      });
      existingByEmail.set(email, {
        ...existing,
        email,
        givenNames,
        familyName,
        dateOfBirth,
        photoPath: photoPath ?? null,
        vaccinationCertificate: vaccinationCertificate ?? null,
        testCertificate: testCertificate ?? null,
        codeOfConductSignedAttachment: codeOfConductSignedAttachment ?? null,
        toolLiabilityWaiverSignedAttachment:
          toolLiabilityWaiverSignedAttachment ?? null,
      });
      existingByIdentity.set(identityKey, {
        ...existing,
        email,
        givenNames,
        familyName,
        dateOfBirth,
        photoPath: photoPath ?? null,
        vaccinationCertificate: vaccinationCertificate ?? null,
        testCertificate: testCertificate ?? null,
        codeOfConductSignedAttachment: codeOfConductSignedAttachment ?? null,
        toolLiabilityWaiverSignedAttachment:
          toolLiabilityWaiverSignedAttachment ?? null,
      });
      updated += 1;
    } else {
      await prisma.teamMember.create({ data });
      const createdMember = {
        id: "",
        email,
        givenNames,
        familyName,
        dateOfBirth,
        photoPath: photoPath ?? null,
        vaccinationCertificate: vaccinationCertificate ?? null,
        testCertificate: testCertificate ?? null,
        codeOfConductSignedAttachment: codeOfConductSignedAttachment ?? null,
        toolLiabilityWaiverSignedAttachment:
          toolLiabilityWaiverSignedAttachment ?? null,
      };
      existingByEmail.set(email, createdMember);
      existingByIdentity.set(identityKey, createdMember);
      created += 1;
    }
  }

  return { created, updated, skipped };
}

async function importElectronics(write: boolean, allowNonEmpty: boolean) {
  await ensureWritable("electronics", write, allowNonEmpty);
  logProgress(`electronics: starting ${write ? "import" : "dry run"}`);

  const records = await listRecordsFromBases(
    BASE_IDS.electronics,
    "Electronics Repair"
  );
  logProgress(
    `electronics: loaded ${records.length} records across ${BASE_IDS.electronics.length} bases`
  );
  let created = 0;
  let updated = 0;

  for (const [index, record] of records.entries()) {
    logModuleProgress(
      "electronics",
      index + 1,
      records.length,
      write ? "import" : "dry-run"
    );
    const repairId = Number(record.fields["Repair ID"]);
    if (!Number.isFinite(repairId)) {
      continue;
    }

    const existing = await prisma.electronicsRepair.findUnique({
      where: { repairId },
    });
    const photoPath = write
      ? await importRemoteFile(
          firstAttachmentUrl(record.fields.Attachments),
          "electronics-repairs",
          existing?.photoPath,
          `electronics image ${index + 1}/${records.length} repair ${repairId}`
        )
      : firstAttachmentUrl(record.fields.Attachments);

    const data = {
      customerName: asString(record.fields.Name),
      customerIdCardNumber: "",
      category: mapElectronicsCategory(asString(record.fields.Category)),
      item: asOptionalString(record.fields.Item),
      whatsapp: asOptionalString(record.fields.Whatsapp),
      serialNumber: asOptionalString(record.fields.Serial),
      status: mapElectronicsStatus(asString(record.fields.Status)),
      repairable:
        typeof record.fields.Repairable === "boolean"
          ? asBoolean(record.fields.Repairable)
          : null,
      notes: asOptionalString(record.fields.Notes),
      photoPath,
      createdDate: asDate(record.fields.Created) || new Date(record.createdTime),
    };

    if (!write) {
      existing ? updated++ : created++;
      continue;
    }

    if (existing) {
      await prisma.electronicsRepair.update({
        where: { repairId },
        data,
      });
      updated += 1;
    } else {
      await prisma.electronicsRepair.create({
        data: {
          ...data,
          repairId,
        },
      });
      created += 1;
    }
  }

  return { created, updated, skipped: 0 };
}

async function importBicycleRepairs(write: boolean, allowNonEmpty: boolean) {
  await ensureWritable("bicycle-repairs", write, allowNonEmpty);
  logProgress(`bicycle-repairs: starting ${write ? "import" : "dry run"}`);

  const records = await listRecordsFromBases(
    BASE_IDS.bicycleRepairs,
    "Repair List"
  );
  logProgress(`bicycle-repairs: loaded ${records.length} records across ${BASE_IDS.bicycleRepairs.length} bases`);
  const existingRepairs = await prisma.bicycleRepair.findMany({
    select: {
      id: true,
      ownerName: true,
      receivedDate: true,
    },
  });
  const existingByKey = new Map(
    existingRepairs.map((repair) => [
      `${repair.ownerName}::${repair.receivedDate.toISOString().slice(0, 10)}`,
      { id: repair.id },
    ])
  );
  let created = 0;
  let updated = 0;
  let skipped = 0;
  const queuedCreateKeys = new Set<string>();
  const queuedUpdateKeys = new Set<string>();
  const creates: {
    ownerName: string;
    ownerIdCardNumber: string;
    ownerPhone: string;
    receivedDate: Date;
    description: string | null;
    problemTypes: string;
    status: RepairStatus;
    photoPath: string | null;
  }[] = [];
  const updates: {
    id: string;
    data: {
      ownerName: string;
      ownerIdCardNumber: string;
      ownerPhone: string;
      receivedDate: Date;
      description: string | null;
      problemTypes: string;
      status: RepairStatus;
      photoPath: string | null;
    };
  }[] = [];

  for (const [index, record] of records.entries()) {
    logModuleProgress(
      "bicycle-repairs",
      index + 1,
      records.length,
      write ? "import" : "dry-run"
    );
    const ownerName = asString(record.fields["Name / نام / Magaca / Nom"]);
    const receivedDate =
      asDate(record.fields["Date / تاریخ / Taariikhda / Date"]) ||
      new Date(record.createdTime);
    const description = asString(record.fields["Problem / مشکل/ Dhibka / Problème"]);
    const repaired = asBoolean(record.fields.Repaired);
    const pickedUp = asBoolean(record.fields["Picked up"]);

    if (!ownerName) {
      continue;
    }

    const data = {
      ownerName,
      ownerIdCardNumber: "",
      ownerPhone: "",
      receivedDate,
      description: description || null,
      problemTypes: JSON.stringify(mapProblemTypes(description)),
      status: mapRepairStatus(repaired, pickedUp),
      photoPath: null as string | null,
    };
    const recordKey = `${ownerName}::${receivedDate.toISOString().slice(0, 10)}`;
    const existing = existingByKey.get(recordKey);

    if (!write) {
      if (queuedCreateKeys.has(recordKey) || queuedUpdateKeys.has(recordKey)) {
        skipped += 1;
        continue;
      }
      if (existing) {
        queuedUpdateKeys.add(recordKey);
        updated += 1;
      } else {
        queuedCreateKeys.add(recordKey);
        created += 1;
      }
      continue;
    }

    if (existing) {
      if (queuedUpdateKeys.has(recordKey)) {
        skipped += 1;
        continue;
      }
      updates.push({
        id: existing.id,
        data,
      });
      queuedUpdateKeys.add(recordKey);
    } else {
      if (queuedCreateKeys.has(recordKey)) {
        skipped += 1;
        continue;
      }
      creates.push(data);
      queuedCreateKeys.add(recordKey);
    }
  }

  if (write) {
    logProgress(
      `bicycle-repairs: classified ${creates.length} creates and ${updates.length} updates`
    );

    const createChunks = chunkArray(creates, BATCH_WRITE_SIZE);
    for (const [chunkIndex, chunk] of createChunks.entries()) {
      logProgress(
        `bicycle-repairs: create batch ${chunkIndex + 1}/${createChunks.length} (${chunk.length} records)`
      );
      await prisma.bicycleRepair.createMany({
        data: chunk,
      });
      created += chunk.length;
    }

    for (const [index, update] of updates.entries()) {
      if (
        index === 0 ||
        index === updates.length - 1 ||
        (index + 1) % 25 === 0
      ) {
        logProgress(
          `bicycle-repairs: update ${index + 1}/${updates.length} (${Math.round(
            ((index + 1) / updates.length) * 100
          )}%)`
        );
      }
      await prisma.bicycleRepair.update({
        where: { id: update.id },
        data: update.data,
      });
      updated += 1;
    }
  }

  if (skipped > 0) {
    logProgress(
      `bicycle-repairs: skipped ${skipped} duplicate records from Airtable input`
    );
  }

  return { created, updated, skipped };
}

async function importRentals(write: boolean, allowNonEmpty: boolean) {
  await ensureWritable("rentals", write, allowNonEmpty);
  logProgress(`rentals: starting ${write ? "import" : "dry run"}`);

  const records = await listRecords(BASE_IDS.rentals, "Receipt Log");
  logProgress(`rentals: loaded ${records.length} records`);
  let created = 0;
  let updated = 0;

  for (const [index, record] of records.entries()) {
    logModuleProgress("rentals", index + 1, records.length, write ? "import" : "dry-run");
    const renterName = asString(record.fields.NAME);
    const bicycleId = asString(record.fields["BICYCLE NUMBER"]);
    const startDate =
      asDate(record.fields["DATE TO TAKE"]) || new Date(record.createdTime);
    const endDate = asDate(record.fields["DATE BACK"]) || startDate;

    if (!renterName || !bicycleId) {
      continue;
    }

    const data = {
      renterName,
      renterPhone: asString(record.fields["PHONE NUMBER"]),
      renterEmail: null,
      bicycleId,
      startDate,
      endDate,
      actualReturnDate: asString(record.fields.RETURN) ? endDate : null,
      status: mapRentalStatus(asString(record.fields.RETURN)),
      notes: asOptionalString(record.fields.Notes) || asOptionalString(record.fields["Notes 2"]),
      signature: null as string | null,
    };

    if (!write) {
      const existing = await prisma.bicycleRental.findFirst({
        where: {
          renterName,
          bicycleId,
          startDate,
        },
      });
      existing ? updated++ : created++;
      continue;
    }

    const existing = await prisma.bicycleRental.findFirst({
      where: {
        renterName,
        bicycleId,
        startDate,
      },
    });
    if (existing) {
      await prisma.bicycleRental.update({
        where: { id: existing.id },
        data,
      });
      updated += 1;
    } else {
      await prisma.bicycleRental.create({ data });
      created += 1;
    }
  }

  return { created, updated, skipped: 0 };
}

async function importCarpentry(write: boolean, allowNonEmpty: boolean) {
  await ensureWritable("carpentry", write, allowNonEmpty);
  logProgress(`carpentry: starting ${write ? "import" : "dry run"}`);

  const records = await listRecords(BASE_IDS.carpentry, "Carpentry Monitoring");
  logProgress(`carpentry: loaded ${records.length} records`);
  let created = 0;
  let updated = 0;

  for (const [index, record] of records.entries()) {
    logModuleProgress("carpentry", index + 1, records.length, write ? "import" : "dry-run");
    const date = asDate(record.fields.Date) || new Date(record.createdTime);
    const customerName = asOptionalString(record.fields.name);
    const projectDescription = asOptionalString(record.fields["project description"]);

    const existing = await prisma.carpentryProject.findFirst({
      where: {
        date,
        customerName: customerName || undefined,
        projectDescription: projectDescription || undefined,
      },
    });
    const photoPath = write
      ? await importRemoteFile(
          firstAttachmentUrl(record.fields.Image),
          "carpentry-projects",
          existing?.photoPath,
          `carpentry image ${index + 1}/${records.length} ${
            customerName || "unnamed"
          }`
        )
      : firstAttachmentUrl(record.fields.Image);

    const data = {
      date,
      acceptedBy: asOptionalString(record.fields["Who accepts order?"]),
      customerType: mapCarpentryCustomerType(asString(record.fields.Customer)),
      organizationName: asOptionalString(record.fields["name of NGO"]),
      customerName,
      phoneNumber: asOptionalString(record.fields["phone number "]),
      gender: mapCarpentryGender(asString(record.fields.gender)),
      orderType: mapCarpentryOrderType(asString(record.fields["Type of order"])),
      timeNeeded: Number.isFinite(Number(record.fields["time needed"]))
        ? Number(record.fields["time needed"])
        : null,
      itemToRepair: asOptionalString(record.fields["Item to repair"]),
      problemDescription: asOptionalString(record.fields["Problem of Item"]),
      projectDescription,
      materialCosts: nullableDecimal(record.fields["material costs"]),
      paidByCustomer:
        typeof record.fields["paid by custsomer"] === "boolean"
          ? asBoolean(record.fields["paid by custsomer"])
          : null,
      photoPath,
      assignedToId: null as string | null,
    };

    if (!write) {
      existing ? updated++ : created++;
      continue;
    }

    if (existing) {
      await prisma.carpentryProject.update({
        where: { id: existing.id },
        data,
      });
      updated += 1;
    } else {
      await prisma.carpentryProject.create({ data });
      created += 1;
    }
  }

  return { created, updated, skipped: 0 };
}

async function importProjects(write: boolean, allowNonEmpty: boolean) {
  await ensureWritable("projects", write, allowNonEmpty);
  logProgress(`projects: starting ${write ? "import" : "dry run"}`);

  const records = await listRecords(BASE_IDS.projects, "Projects");
  logProgress(`projects: loaded ${records.length} records`);
  let created = 0;
  let updated = 0;

  for (const [index, record] of records.entries()) {
    logModuleProgress("projects", index + 1, records.length, write ? "import" : "dry-run");
    const name = asString(record.fields.Name) || `Project ${index + 1}`;
    const startDate = asDate(record.fields["Start Date"]);

    const existing = await prisma.project.findFirst({
      where: {
        name,
        startDate: startDate || undefined,
      },
    });

    const data = {
      name,
      notes: asOptionalString(record.fields.Notes),
      assignee: collaboratorName(record.fields.Assignee),
      status: mapProjectStatus(asString(record.fields.Status)),
      startDate,
      endDate: asDate(record.fields["End Date"]),
      googlePhotosAlbumLink: asOptionalString(record.fields["Google Photos Album Link"]),
      hashtag: asOptionalString(record.fields.Hashtag),
      purpose: asOptionalString(record.fields.Purpose),
      assignedToId: null as string | null,
    };

    if (!write) {
      existing ? updated++ : created++;
      continue;
    }

    if (existing) {
      await prisma.project.update({
        where: { id: existing.id },
        data,
      });
      updated += 1;
    } else {
      await prisma.project.create({ data });
      created += 1;
    }
  }

  return { created, updated, skipped: 0 };
}

async function importJobs(write: boolean, allowNonEmpty: boolean) {
  await ensureWritable("jobs", write, allowNonEmpty);
  logProgress(`jobs: starting ${write ? "import" : "dry run"}`);

  const records = await listRecords(BASE_IDS.jobs, "Open Positions");
  logProgress(`jobs: loaded ${records.length} records`);
  let created = 0;
  let updated = 0;

  for (const [index, record] of records.entries()) {
    logModuleProgress("jobs", index + 1, records.length, write ? "import" : "dry-run");
    const name = asString(record.fields.Name) || `Job ${index + 1}`;
    const slug = asOptionalString(record.fields.Slug);

    const existing = await prisma.job.findFirst({
      where: slug ? { OR: [{ slug }, { name }] } : { name },
    });

    const data = {
      name,
      notes: asOptionalString(record.fields.Notes),
      status: mapJobStatus(asString(record.fields.Status)),
      slug,
    };

    if (!write) {
      existing ? updated++ : created++;
      continue;
    }

    if (existing) {
      await prisma.job.update({
        where: { id: existing.id },
        data,
      });
      updated += 1;
    } else {
      await prisma.job.create({ data });
      created += 1;
    }
  }

  return { created, updated, skipped: 0 };
}

async function main() {
  loadDotEnv();
  prisma = createPrismaClient();
  const { modules, write, allowNonEmpty } = parseArgs();
  logProgress(
    `${write ? "writing" : "dry run for"} modules: ${modules.join(", ")}`
  );

  const tasks: Record<
    ModuleName,
    (write: boolean, allowNonEmpty: boolean) => Promise<{
      created: number;
      updated: number;
      skipped: number;
    }>
  > = {
    team: importTeam,
    electronics: importElectronics,
    "bicycle-repairs": importBicycleRepairs,
    rentals: importRentals,
    carpentry: importCarpentry,
    projects: importProjects,
    jobs: importJobs,
  };

  for (const moduleName of modules) {
    if (!(moduleName in tasks)) {
      throw new Error(`Unknown module: ${moduleName}`);
    }

    const result = await tasks[moduleName](write, allowNonEmpty);
    logProgress(
      `${moduleName}: completed with created ${result.created}, updated ${result.updated}, skipped ${result.skipped}`
    );
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
