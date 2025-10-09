
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


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

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

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

exports.ElectronicsRepairStatus = exports.$Enums.ElectronicsRepairStatus = {
  UNCHECKED: 'UNCHECKED',
  CHECKED: 'CHECKED',
  IN_PROGRESS: 'IN_PROGRESS',
  READY_FOR_PICKUP: 'READY_FOR_PICKUP',
  DONE: 'DONE',
  PICKED_UP: 'PICKED_UP',
  NO_WAY_TO_FIX: 'NO_WAY_TO_FIX'
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
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
