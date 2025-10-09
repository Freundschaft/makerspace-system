
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime,
  createParam,
} = require('./runtime/library.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}




  const path = require('path')

/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  googleId: 'googleId',
  role: 'role',
  enabled: 'enabled'
};

exports.Prisma.ProblemTypeScalarFieldEnum = {
  id: 'id',
  value: 'value',
  label: 'label',
  image: 'image',
  index: 'index',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BicycleRepairScalarFieldEnum = {
  id: 'id',
  problemTypes: 'problemTypes',
  description: 'description',
  receivedDate: 'receivedDate',
  repairedDate: 'repairedDate',
  pickupDate: 'pickupDate',
  ownerPhone: 'ownerPhone',
  status: 'status',
  photoPath: 'photoPath',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PartScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  quantity: 'quantity',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.RepairPartScalarFieldEnum = {
  id: 'id',
  repairId: 'repairId',
  partId: 'partId',
  quantity: 'quantity',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BicycleRentalScalarFieldEnum = {
  id: 'id',
  renterName: 'renterName',
  renterPhone: 'renterPhone',
  renterEmail: 'renterEmail',
  bicycleId: 'bicycleId',
  startDate: 'startDate',
  endDate: 'endDate',
  actualReturnDate: 'actualReturnDate',
  status: 'status',
  notes: 'notes',
  signature: 'signature',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TeamMemberScalarFieldEnum = {
  id: 'id',
  familyName: 'familyName',
  givenNames: 'givenNames',
  nationality: 'nationality',
  photoPath: 'photoPath',
  status: 'status',
  startDate: 'startDate',
  endDate: 'endDate',
  department: 'department',
  email: 'email',
  phone: 'phone',
  homeAddress: 'homeAddress',
  dateOfBirth: 'dateOfBirth',
  legalStatus: 'legalStatus',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ElectronicsRepairScalarFieldEnum = {
  id: 'id',
  repairId: 'repairId',
  customerName: 'customerName',
  category: 'category',
  item: 'item',
  whatsapp: 'whatsapp',
  serialNumber: 'serialNumber',
  status: 'status',
  repairable: 'repairable',
  notes: 'notes',
  photoPath: 'photoPath',
  createdDate: 'createdDate',
  repairerId: 'repairerId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.UserOrderByRelevanceFieldEnum = {
  id: 'id',
  email: 'email',
  googleId: 'googleId',
  role: 'role'
};

exports.Prisma.ProblemTypeOrderByRelevanceFieldEnum = {
  id: 'id',
  value: 'value',
  label: 'label',
  image: 'image'
};

exports.Prisma.BicycleRepairOrderByRelevanceFieldEnum = {
  id: 'id',
  problemTypes: 'problemTypes',
  description: 'description',
  ownerPhone: 'ownerPhone',
  photoPath: 'photoPath'
};

exports.Prisma.PartOrderByRelevanceFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description'
};

exports.Prisma.RepairPartOrderByRelevanceFieldEnum = {
  id: 'id',
  repairId: 'repairId',
  partId: 'partId'
};

exports.Prisma.BicycleRentalOrderByRelevanceFieldEnum = {
  id: 'id',
  renterName: 'renterName',
  renterPhone: 'renterPhone',
  renterEmail: 'renterEmail',
  bicycleId: 'bicycleId',
  notes: 'notes',
  signature: 'signature'
};

exports.Prisma.TeamMemberOrderByRelevanceFieldEnum = {
  id: 'id',
  familyName: 'familyName',
  givenNames: 'givenNames',
  nationality: 'nationality',
  photoPath: 'photoPath',
  department: 'department',
  email: 'email',
  phone: 'phone',
  homeAddress: 'homeAddress',
  legalStatus: 'legalStatus'
};

exports.Prisma.ElectronicsRepairOrderByRelevanceFieldEnum = {
  id: 'id',
  customerName: 'customerName',
  item: 'item',
  whatsapp: 'whatsapp',
  serialNumber: 'serialNumber',
  notes: 'notes',
  photoPath: 'photoPath',
  repairerId: 'repairerId'
};
exports.RepairStatus = exports.$Enums.RepairStatus = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  WAITING_FOR_PARTS: 'WAITING_FOR_PARTS',
  COMPLETED: 'COMPLETED',
  PICKED_UP: 'PICKED_UP',
  CANCELLED: 'CANCELLED'
};

exports.RentalStatus = exports.$Enums.RentalStatus = {
  ACTIVE: 'ACTIVE',
  RETURNED: 'RETURNED',
  OVERDUE: 'OVERDUE',
  CANCELLED: 'CANCELLED'
};

exports.TeamMemberStatus = exports.$Enums.TeamMemberStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
};

exports.ElectronicsRepairStatus = exports.$Enums.ElectronicsRepairStatus = {
  UNCHECKED: 'UNCHECKED',
  CHECKED: 'CHECKED',
  IN_PROGRESS: 'IN_PROGRESS',
  READY_FOR_PICKUP: 'READY_FOR_PICKUP',
  DONE: 'DONE',
  PICKED_UP: 'PICKED_UP',
  NO_WAY_TO_FIX: 'NO_WAY_TO_FIX'
};

exports.ElectronicsCategory = exports.$Enums.ElectronicsCategory = {
  PHONE: 'PHONE',
  TABLET: 'TABLET',
  HEADPHONES: 'HEADPHONES',
  HEATER: 'HEATER',
  SPEAKER: 'SPEAKER',
  HAIR_CLIPPER: 'HAIR_CLIPPER',
  COOLER: 'COOLER',
  POWER_BANK: 'POWER_BANK',
  KETTLE: 'KETTLE',
  LAPTOP: 'LAPTOP',
  MULTI_SOCKET: 'MULTI_SOCKET',
  PIZZA_PAN_CABLE: 'PIZZA_PAN_CABLE',
  PAN: 'PAN',
  GLASSES: 'GLASSES',
  AUX: 'AUX',
  WATCH: 'WATCH',
  ADAPTOR: 'ADAPTOR',
  HANDSFREE: 'HANDSFREE',
  CABLE: 'CABLE',
  HAIR_CUTTER: 'HAIR_CUTTER',
  HAIR_DRYER: 'HAIR_DRYER',
  FAN: 'FAN',
  PRINTER: 'PRINTER',
  ELECTRONIC_CIGARETTE: 'ELECTRONIC_CIGARETTE',
  STOVE: 'STOVE',
  PIZZA_PAN: 'PIZZA_PAN',
  WIRELESS: 'WIRELESS',
  EAR_PAD: 'EAR_PAD',
  SMART_WATCH: 'SMART_WATCH',
  XBOX360: 'XBOX360',
  TOASTER: 'TOASTER',
  TAILOR_MACHINE: 'TAILOR_MACHINE',
  BATTERY: 'BATTERY',
  PHONE_CASE: 'PHONE_CASE',
  BRACELET: 'BRACELET',
  TESBIH: 'TESBIH',
  HAND_MIXER: 'HAND_MIXER',
  COMPUTER: 'COMPUTER',
  SEWING_MACHINE: 'SEWING_MACHINE',
  WATER_HEATER: 'WATER_HEATER',
  PUMP: 'PUMP',
  KEYBOARD: 'KEYBOARD',
  PLUG: 'PLUG',
  WATER_BOILER: 'WATER_BOILER',
  THERAPY: 'THERAPY',
  COFFEE_MAKER: 'COFFEE_MAKER',
  KITCHEN: 'KITCHEN',
  BOARD: 'BOARD',
  MAT: 'MAT',
  RADIO: 'RADIO',
  VACUUM_CLEANER: 'VACUUM_CLEANER',
  OTHER: 'OTHER'
};

exports.Prisma.ModelName = {
  User: 'User',
  ProblemType: 'ProblemType',
  BicycleRepair: 'BicycleRepair',
  Part: 'Part',
  RepairPart: 'RepairPart',
  BicycleRental: 'BicycleRental',
  TeamMember: 'TeamMember',
  ElectronicsRepair: 'ElectronicsRepair'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "C:\\repos\\makerspace-system\\generated\\prisma",
      "fromEnvVar": null
    },
    "config": {
      "seed": "tsx prisma/seed.ts",
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "windows",
        "native": true
      }
    ],
    "previewFeatures": [],
    "sourceFilePath": "C:\\repos\\makerspace-system\\prisma\\schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null
  },
  "relativePath": "../../prisma",
  "clientVersion": "6.6.0",
  "engineVersion": "f676762280b54cd07c770017ed3711ddde35f37a",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "mysql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = \"prisma-client-js\"\n  output   = \"../generated/prisma\"\n  seed     = \"tsx prisma/seed.ts\"\n}\n\ndatasource db {\n  provider = \"mysql\"\n  url      = env(\"DATABASE_URL\")\n}\n\nmodel User {\n  id                 String              @id @default(uuid())\n  email              String?\n  googleId           String              @unique\n  role               String?\n  enabled            Boolean?\n  electronicsRepairs ElectronicsRepair[]\n}\n\nmodel ProblemType {\n  id        String   @id @default(cuid())\n  value     String   @unique\n  label     String\n  image     String\n  index     Int      @default(0)\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel BicycleRepair {\n  id           String       @id @default(uuid())\n  problemTypes String       @default(\"[]\") @db.Text\n  description  String       @db.Text\n  receivedDate DateTime\n  repairedDate DateTime?\n  pickupDate   DateTime?\n  ownerPhone   String\n  status       RepairStatus @default(PENDING)\n  photoPath    String?      @db.Text\n  partsUsed    RepairPart[]\n  createdAt    DateTime     @default(now())\n  updatedAt    DateTime     @updatedAt\n}\n\nmodel Part {\n  id          String       @id @default(uuid())\n  name        String\n  description String?      @db.Text\n  quantity    Int\n  repairs     RepairPart[]\n  createdAt   DateTime     @default(now())\n  updatedAt   DateTime     @updatedAt\n}\n\nmodel RepairPart {\n  id        String        @id @default(uuid())\n  repair    BicycleRepair @relation(fields: [repairId], references: [id])\n  repairId  String\n  part      Part          @relation(fields: [partId], references: [id])\n  partId    String\n  quantity  Int\n  createdAt DateTime      @default(now())\n  updatedAt DateTime      @updatedAt\n\n  @@unique([repairId, partId])\n}\n\nenum RepairStatus {\n  PENDING\n  IN_PROGRESS\n  WAITING_FOR_PARTS\n  COMPLETED\n  PICKED_UP\n  CANCELLED\n}\n\nenum RentalStatus {\n  ACTIVE\n  RETURNED\n  OVERDUE\n  CANCELLED\n}\n\nmodel BicycleRental {\n  id               String       @id @default(uuid())\n  renterName       String\n  renterPhone      String\n  renterEmail      String?\n  bicycleId        String\n  startDate        DateTime\n  endDate          DateTime\n  actualReturnDate DateTime?\n  status           RentalStatus @default(ACTIVE)\n  notes            String?      @db.Text\n  signature        String?      @db.Text\n  createdAt        DateTime     @default(now())\n  updatedAt        DateTime     @updatedAt\n}\n\nenum TeamMemberStatus {\n  ACTIVE\n  INACTIVE\n}\n\nmodel TeamMember {\n  id          String           @id @default(uuid())\n  familyName  String\n  givenNames  String\n  nationality String\n  photoPath   String?          @db.Text\n  status      TeamMemberStatus @default(ACTIVE)\n  startDate   DateTime\n  endDate     DateTime?\n  department  String\n  email       String           @unique\n  phone       String\n  homeAddress String?          @db.Text\n  dateOfBirth DateTime\n  legalStatus String\n  createdAt   DateTime         @default(now())\n  updatedAt   DateTime         @updatedAt\n}\n\nenum ElectronicsRepairStatus {\n  UNCHECKED\n  CHECKED\n  IN_PROGRESS\n  READY_FOR_PICKUP\n  DONE\n  PICKED_UP\n  NO_WAY_TO_FIX\n}\n\nenum ElectronicsCategory {\n  PHONE\n  TABLET\n  HEADPHONES\n  HEATER\n  SPEAKER\n  HAIR_CLIPPER\n  COOLER\n  POWER_BANK\n  KETTLE\n  LAPTOP\n  MULTI_SOCKET\n  PIZZA_PAN_CABLE\n  PAN\n  GLASSES\n  AUX\n  WATCH\n  ADAPTOR\n  HANDSFREE\n  CABLE\n  HAIR_CUTTER\n  HAIR_DRYER\n  FAN\n  PRINTER\n  ELECTRONIC_CIGARETTE\n  STOVE\n  PIZZA_PAN\n  WIRELESS\n  EAR_PAD\n  SMART_WATCH\n  XBOX360\n  TOASTER\n  TAILOR_MACHINE\n  BATTERY\n  PHONE_CASE\n  BRACELET\n  TESBIH\n  HAND_MIXER\n  COMPUTER\n  SEWING_MACHINE\n  WATER_HEATER\n  PUMP\n  KEYBOARD\n  PLUG\n  WATER_BOILER\n  THERAPY\n  COFFEE_MAKER\n  KITCHEN\n  BOARD\n  MAT\n  RADIO\n  VACUUM_CLEANER\n  OTHER\n}\n\nmodel ElectronicsRepair {\n  id           String                  @id @default(uuid())\n  repairId     Int                     @unique @default(autoincrement())\n  customerName String\n  category     ElectronicsCategory\n  item         String?\n  whatsapp     String?\n  serialNumber String?                 @db.Text\n  status       ElectronicsRepairStatus @default(UNCHECKED)\n  repairable   Boolean?\n  notes        String?                 @db.Text\n  photoPath    String?                 @db.Text\n  createdDate  DateTime                @default(now())\n  repairerId   String?\n  repairer     User?                   @relation(fields: [repairerId], references: [id])\n  createdAt    DateTime                @default(now())\n  updatedAt    DateTime                @updatedAt\n}\n",
  "inlineSchemaHash": "a25127dc28162e8ceb166070f720464a90f3a24ab46bf53c3e0a4e97607c5d6b",
  "copyEngine": true
}

const fs = require('fs')

config.dirname = __dirname
if (!fs.existsSync(path.join(__dirname, 'schema.prisma'))) {
  const alternativePaths = [
    "generated/prisma",
    "prisma",
  ]
  
  const alternativePath = alternativePaths.find((altPath) => {
    return fs.existsSync(path.join(process.cwd(), altPath, 'schema.prisma'))
  }) ?? alternativePaths[0]

  config.dirname = path.join(process.cwd(), alternativePath)
  config.isBundled = true
}

config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"uuid\",\"args\":[4]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"googleId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"role\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"enabled\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"electronicsRepairs\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ElectronicsRepair\",\"nativeType\":null,\"relationName\":\"ElectronicsRepairToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ProblemType\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"cuid\",\"args\":[1]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"value\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"label\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"index\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"BicycleRepair\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"uuid\",\"args\":[4]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"problemTypes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":[\"Text\",[]],\"default\":\"[]\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Text\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"receivedDate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"repairedDate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pickupDate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ownerPhone\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"RepairStatus\",\"nativeType\":null,\"default\":\"PENDING\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"photoPath\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Text\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"partsUsed\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RepairPart\",\"nativeType\":null,\"relationName\":\"BicycleRepairToRepairPart\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Part\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"uuid\",\"args\":[4]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Text\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"quantity\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"repairs\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RepairPart\",\"nativeType\":null,\"relationName\":\"PartToRepairPart\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"RepairPart\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"uuid\",\"args\":[4]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"repair\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BicycleRepair\",\"nativeType\":null,\"relationName\":\"BicycleRepairToRepairPart\",\"relationFromFields\":[\"repairId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"repairId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"part\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Part\",\"nativeType\":null,\"relationName\":\"PartToRepairPart\",\"relationFromFields\":[\"partId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"partId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"quantity\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[[\"repairId\",\"partId\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"repairId\",\"partId\"]}],\"isGenerated\":false},\"BicycleRental\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"uuid\",\"args\":[4]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"renterName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"renterPhone\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"renterEmail\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"bicycleId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"startDate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"endDate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"actualReturnDate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"RentalStatus\",\"nativeType\":null,\"default\":\"ACTIVE\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"notes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Text\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"signature\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Text\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"TeamMember\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"uuid\",\"args\":[4]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"familyName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"givenNames\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nationality\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"photoPath\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Text\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"TeamMemberStatus\",\"nativeType\":null,\"default\":\"ACTIVE\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"startDate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"endDate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"department\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"phone\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"homeAddress\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Text\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dateOfBirth\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"legalStatus\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ElectronicsRepair\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"uuid\",\"args\":[4]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"repairId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"customerName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"category\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ElectronicsCategory\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"item\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"whatsapp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"serialNumber\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Text\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"ElectronicsRepairStatus\",\"nativeType\":null,\"default\":\"UNCHECKED\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"repairable\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"notes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Text\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"photoPath\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Text\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdDate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"repairerId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"repairer\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"nativeType\":null,\"relationName\":\"ElectronicsRepairToUser\",\"relationFromFields\":[\"repairerId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{\"RepairStatus\":{\"values\":[{\"name\":\"PENDING\",\"dbName\":null},{\"name\":\"IN_PROGRESS\",\"dbName\":null},{\"name\":\"WAITING_FOR_PARTS\",\"dbName\":null},{\"name\":\"COMPLETED\",\"dbName\":null},{\"name\":\"PICKED_UP\",\"dbName\":null},{\"name\":\"CANCELLED\",\"dbName\":null}],\"dbName\":null},\"RentalStatus\":{\"values\":[{\"name\":\"ACTIVE\",\"dbName\":null},{\"name\":\"RETURNED\",\"dbName\":null},{\"name\":\"OVERDUE\",\"dbName\":null},{\"name\":\"CANCELLED\",\"dbName\":null}],\"dbName\":null},\"TeamMemberStatus\":{\"values\":[{\"name\":\"ACTIVE\",\"dbName\":null},{\"name\":\"INACTIVE\",\"dbName\":null}],\"dbName\":null},\"ElectronicsRepairStatus\":{\"values\":[{\"name\":\"UNCHECKED\",\"dbName\":null},{\"name\":\"CHECKED\",\"dbName\":null},{\"name\":\"IN_PROGRESS\",\"dbName\":null},{\"name\":\"READY_FOR_PICKUP\",\"dbName\":null},{\"name\":\"DONE\",\"dbName\":null},{\"name\":\"PICKED_UP\",\"dbName\":null},{\"name\":\"NO_WAY_TO_FIX\",\"dbName\":null}],\"dbName\":null},\"ElectronicsCategory\":{\"values\":[{\"name\":\"PHONE\",\"dbName\":null},{\"name\":\"TABLET\",\"dbName\":null},{\"name\":\"HEADPHONES\",\"dbName\":null},{\"name\":\"HEATER\",\"dbName\":null},{\"name\":\"SPEAKER\",\"dbName\":null},{\"name\":\"HAIR_CLIPPER\",\"dbName\":null},{\"name\":\"COOLER\",\"dbName\":null},{\"name\":\"POWER_BANK\",\"dbName\":null},{\"name\":\"KETTLE\",\"dbName\":null},{\"name\":\"LAPTOP\",\"dbName\":null},{\"name\":\"MULTI_SOCKET\",\"dbName\":null},{\"name\":\"PIZZA_PAN_CABLE\",\"dbName\":null},{\"name\":\"PAN\",\"dbName\":null},{\"name\":\"GLASSES\",\"dbName\":null},{\"name\":\"AUX\",\"dbName\":null},{\"name\":\"WATCH\",\"dbName\":null},{\"name\":\"ADAPTOR\",\"dbName\":null},{\"name\":\"HANDSFREE\",\"dbName\":null},{\"name\":\"CABLE\",\"dbName\":null},{\"name\":\"HAIR_CUTTER\",\"dbName\":null},{\"name\":\"HAIR_DRYER\",\"dbName\":null},{\"name\":\"FAN\",\"dbName\":null},{\"name\":\"PRINTER\",\"dbName\":null},{\"name\":\"ELECTRONIC_CIGARETTE\",\"dbName\":null},{\"name\":\"STOVE\",\"dbName\":null},{\"name\":\"PIZZA_PAN\",\"dbName\":null},{\"name\":\"WIRELESS\",\"dbName\":null},{\"name\":\"EAR_PAD\",\"dbName\":null},{\"name\":\"SMART_WATCH\",\"dbName\":null},{\"name\":\"XBOX360\",\"dbName\":null},{\"name\":\"TOASTER\",\"dbName\":null},{\"name\":\"TAILOR_MACHINE\",\"dbName\":null},{\"name\":\"BATTERY\",\"dbName\":null},{\"name\":\"PHONE_CASE\",\"dbName\":null},{\"name\":\"BRACELET\",\"dbName\":null},{\"name\":\"TESBIH\",\"dbName\":null},{\"name\":\"HAND_MIXER\",\"dbName\":null},{\"name\":\"COMPUTER\",\"dbName\":null},{\"name\":\"SEWING_MACHINE\",\"dbName\":null},{\"name\":\"WATER_HEATER\",\"dbName\":null},{\"name\":\"PUMP\",\"dbName\":null},{\"name\":\"KEYBOARD\",\"dbName\":null},{\"name\":\"PLUG\",\"dbName\":null},{\"name\":\"WATER_BOILER\",\"dbName\":null},{\"name\":\"THERAPY\",\"dbName\":null},{\"name\":\"COFFEE_MAKER\",\"dbName\":null},{\"name\":\"KITCHEN\",\"dbName\":null},{\"name\":\"BOARD\",\"dbName\":null},{\"name\":\"MAT\",\"dbName\":null},{\"name\":\"RADIO\",\"dbName\":null},{\"name\":\"VACUUM_CLEANER\",\"dbName\":null},{\"name\":\"OTHER\",\"dbName\":null}],\"dbName\":null}},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined
config.compilerWasm = undefined


const { warnEnvConflicts } = require('./runtime/library.js')

warnEnvConflicts({
    rootEnvPath: config.relativeEnvPaths.rootEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.rootEnvPath),
    schemaEnvPath: config.relativeEnvPaths.schemaEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.schemaEnvPath)
})

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

// file annotations for bundling tools to include these files
path.join(__dirname, "query_engine-windows.dll.node");
path.join(process.cwd(), "generated/prisma/query_engine-windows.dll.node")
// file annotations for bundling tools to include these files
path.join(__dirname, "schema.prisma");
path.join(process.cwd(), "generated/prisma/schema.prisma")
