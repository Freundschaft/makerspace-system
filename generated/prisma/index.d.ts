
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model ProblemType
 * 
 */
export type ProblemType = $Result.DefaultSelection<Prisma.$ProblemTypePayload>
/**
 * Model BicycleRepair
 * 
 */
export type BicycleRepair = $Result.DefaultSelection<Prisma.$BicycleRepairPayload>
/**
 * Model Part
 * 
 */
export type Part = $Result.DefaultSelection<Prisma.$PartPayload>
/**
 * Model RepairPart
 * 
 */
export type RepairPart = $Result.DefaultSelection<Prisma.$RepairPartPayload>
/**
 * Model BicycleRental
 * 
 */
export type BicycleRental = $Result.DefaultSelection<Prisma.$BicycleRentalPayload>
/**
 * Model TeamMember
 * 
 */
export type TeamMember = $Result.DefaultSelection<Prisma.$TeamMemberPayload>
/**
 * Model ElectronicsRepair
 * 
 */
export type ElectronicsRepair = $Result.DefaultSelection<Prisma.$ElectronicsRepairPayload>
/**
 * Model CarpentryProject
 * 
 */
export type CarpentryProject = $Result.DefaultSelection<Prisma.$CarpentryProjectPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const RepairStatus: {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  WAITING_FOR_PARTS: 'WAITING_FOR_PARTS',
  COMPLETED: 'COMPLETED',
  PICKED_UP: 'PICKED_UP',
  CANCELLED: 'CANCELLED'
};

export type RepairStatus = (typeof RepairStatus)[keyof typeof RepairStatus]


export const RentalStatus: {
  ACTIVE: 'ACTIVE',
  RETURNED: 'RETURNED',
  OVERDUE: 'OVERDUE',
  CANCELLED: 'CANCELLED'
};

export type RentalStatus = (typeof RentalStatus)[keyof typeof RentalStatus]


export const TeamMemberStatus: {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
};

export type TeamMemberStatus = (typeof TeamMemberStatus)[keyof typeof TeamMemberStatus]


export const ElectronicsRepairStatus: {
  UNCHECKED: 'UNCHECKED',
  CHECKED: 'CHECKED',
  IN_PROGRESS: 'IN_PROGRESS',
  READY_FOR_PICKUP: 'READY_FOR_PICKUP',
  DONE: 'DONE',
  PICKED_UP: 'PICKED_UP',
  NO_WAY_TO_FIX: 'NO_WAY_TO_FIX'
};

export type ElectronicsRepairStatus = (typeof ElectronicsRepairStatus)[keyof typeof ElectronicsRepairStatus]


export const ElectronicsCategory: {
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

export type ElectronicsCategory = (typeof ElectronicsCategory)[keyof typeof ElectronicsCategory]


export const CarpentryCustomerType: {
  PRIVATE_PERSON: 'PRIVATE_PERSON',
  ORGANIZATION: 'ORGANIZATION',
  BARBERSHOP: 'BARBERSHOP',
  HOUSE: 'HOUSE'
};

export type CarpentryCustomerType = (typeof CarpentryCustomerType)[keyof typeof CarpentryCustomerType]


export const CarpentryOrderType: {
  REPAIR_ORDER: 'REPAIR_ORDER',
  PROJECT: 'PROJECT'
};

export type CarpentryOrderType = (typeof CarpentryOrderType)[keyof typeof CarpentryOrderType]


export const CarpentryGender: {
  FEMALE: 'FEMALE',
  MALE: 'MALE'
};

export type CarpentryGender = (typeof CarpentryGender)[keyof typeof CarpentryGender]

}

export type RepairStatus = $Enums.RepairStatus

export const RepairStatus: typeof $Enums.RepairStatus

export type RentalStatus = $Enums.RentalStatus

export const RentalStatus: typeof $Enums.RentalStatus

export type TeamMemberStatus = $Enums.TeamMemberStatus

export const TeamMemberStatus: typeof $Enums.TeamMemberStatus

export type ElectronicsRepairStatus = $Enums.ElectronicsRepairStatus

export const ElectronicsRepairStatus: typeof $Enums.ElectronicsRepairStatus

export type ElectronicsCategory = $Enums.ElectronicsCategory

export const ElectronicsCategory: typeof $Enums.ElectronicsCategory

export type CarpentryCustomerType = $Enums.CarpentryCustomerType

export const CarpentryCustomerType: typeof $Enums.CarpentryCustomerType

export type CarpentryOrderType = $Enums.CarpentryOrderType

export const CarpentryOrderType: typeof $Enums.CarpentryOrderType

export type CarpentryGender = $Enums.CarpentryGender

export const CarpentryGender: typeof $Enums.CarpentryGender

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.problemType`: Exposes CRUD operations for the **ProblemType** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProblemTypes
    * const problemTypes = await prisma.problemType.findMany()
    * ```
    */
  get problemType(): Prisma.ProblemTypeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bicycleRepair`: Exposes CRUD operations for the **BicycleRepair** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BicycleRepairs
    * const bicycleRepairs = await prisma.bicycleRepair.findMany()
    * ```
    */
  get bicycleRepair(): Prisma.BicycleRepairDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.part`: Exposes CRUD operations for the **Part** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Parts
    * const parts = await prisma.part.findMany()
    * ```
    */
  get part(): Prisma.PartDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.repairPart`: Exposes CRUD operations for the **RepairPart** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RepairParts
    * const repairParts = await prisma.repairPart.findMany()
    * ```
    */
  get repairPart(): Prisma.RepairPartDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bicycleRental`: Exposes CRUD operations for the **BicycleRental** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BicycleRentals
    * const bicycleRentals = await prisma.bicycleRental.findMany()
    * ```
    */
  get bicycleRental(): Prisma.BicycleRentalDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.teamMember`: Exposes CRUD operations for the **TeamMember** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TeamMembers
    * const teamMembers = await prisma.teamMember.findMany()
    * ```
    */
  get teamMember(): Prisma.TeamMemberDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.electronicsRepair`: Exposes CRUD operations for the **ElectronicsRepair** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ElectronicsRepairs
    * const electronicsRepairs = await prisma.electronicsRepair.findMany()
    * ```
    */
  get electronicsRepair(): Prisma.ElectronicsRepairDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.carpentryProject`: Exposes CRUD operations for the **CarpentryProject** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CarpentryProjects
    * const carpentryProjects = await prisma.carpentryProject.findMany()
    * ```
    */
  get carpentryProject(): Prisma.CarpentryProjectDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.2.0
   * Query Engine version: 0c8ef2ce45c83248ab3df073180d5eda9e8be7a3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    ProblemType: 'ProblemType',
    BicycleRepair: 'BicycleRepair',
    Part: 'Part',
    RepairPart: 'RepairPart',
    BicycleRental: 'BicycleRental',
    TeamMember: 'TeamMember',
    ElectronicsRepair: 'ElectronicsRepair',
    CarpentryProject: 'CarpentryProject'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "problemType" | "bicycleRepair" | "part" | "repairPart" | "bicycleRental" | "teamMember" | "electronicsRepair" | "carpentryProject"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      ProblemType: {
        payload: Prisma.$ProblemTypePayload<ExtArgs>
        fields: Prisma.ProblemTypeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProblemTypeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemTypePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProblemTypeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemTypePayload>
          }
          findFirst: {
            args: Prisma.ProblemTypeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemTypePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProblemTypeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemTypePayload>
          }
          findMany: {
            args: Prisma.ProblemTypeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemTypePayload>[]
          }
          create: {
            args: Prisma.ProblemTypeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemTypePayload>
          }
          createMany: {
            args: Prisma.ProblemTypeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProblemTypeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemTypePayload>
          }
          update: {
            args: Prisma.ProblemTypeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemTypePayload>
          }
          deleteMany: {
            args: Prisma.ProblemTypeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProblemTypeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProblemTypeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemTypePayload>
          }
          aggregate: {
            args: Prisma.ProblemTypeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProblemType>
          }
          groupBy: {
            args: Prisma.ProblemTypeGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProblemTypeGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProblemTypeCountArgs<ExtArgs>
            result: $Utils.Optional<ProblemTypeCountAggregateOutputType> | number
          }
        }
      }
      BicycleRepair: {
        payload: Prisma.$BicycleRepairPayload<ExtArgs>
        fields: Prisma.BicycleRepairFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BicycleRepairFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BicycleRepairPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BicycleRepairFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BicycleRepairPayload>
          }
          findFirst: {
            args: Prisma.BicycleRepairFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BicycleRepairPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BicycleRepairFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BicycleRepairPayload>
          }
          findMany: {
            args: Prisma.BicycleRepairFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BicycleRepairPayload>[]
          }
          create: {
            args: Prisma.BicycleRepairCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BicycleRepairPayload>
          }
          createMany: {
            args: Prisma.BicycleRepairCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.BicycleRepairDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BicycleRepairPayload>
          }
          update: {
            args: Prisma.BicycleRepairUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BicycleRepairPayload>
          }
          deleteMany: {
            args: Prisma.BicycleRepairDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BicycleRepairUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BicycleRepairUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BicycleRepairPayload>
          }
          aggregate: {
            args: Prisma.BicycleRepairAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBicycleRepair>
          }
          groupBy: {
            args: Prisma.BicycleRepairGroupByArgs<ExtArgs>
            result: $Utils.Optional<BicycleRepairGroupByOutputType>[]
          }
          count: {
            args: Prisma.BicycleRepairCountArgs<ExtArgs>
            result: $Utils.Optional<BicycleRepairCountAggregateOutputType> | number
          }
        }
      }
      Part: {
        payload: Prisma.$PartPayload<ExtArgs>
        fields: Prisma.PartFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PartFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PartFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>
          }
          findFirst: {
            args: Prisma.PartFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PartFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>
          }
          findMany: {
            args: Prisma.PartFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>[]
          }
          create: {
            args: Prisma.PartCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>
          }
          createMany: {
            args: Prisma.PartCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PartDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>
          }
          update: {
            args: Prisma.PartUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>
          }
          deleteMany: {
            args: Prisma.PartDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PartUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PartUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>
          }
          aggregate: {
            args: Prisma.PartAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePart>
          }
          groupBy: {
            args: Prisma.PartGroupByArgs<ExtArgs>
            result: $Utils.Optional<PartGroupByOutputType>[]
          }
          count: {
            args: Prisma.PartCountArgs<ExtArgs>
            result: $Utils.Optional<PartCountAggregateOutputType> | number
          }
        }
      }
      RepairPart: {
        payload: Prisma.$RepairPartPayload<ExtArgs>
        fields: Prisma.RepairPartFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RepairPartFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairPartPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RepairPartFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairPartPayload>
          }
          findFirst: {
            args: Prisma.RepairPartFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairPartPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RepairPartFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairPartPayload>
          }
          findMany: {
            args: Prisma.RepairPartFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairPartPayload>[]
          }
          create: {
            args: Prisma.RepairPartCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairPartPayload>
          }
          createMany: {
            args: Prisma.RepairPartCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.RepairPartDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairPartPayload>
          }
          update: {
            args: Prisma.RepairPartUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairPartPayload>
          }
          deleteMany: {
            args: Prisma.RepairPartDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RepairPartUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RepairPartUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepairPartPayload>
          }
          aggregate: {
            args: Prisma.RepairPartAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRepairPart>
          }
          groupBy: {
            args: Prisma.RepairPartGroupByArgs<ExtArgs>
            result: $Utils.Optional<RepairPartGroupByOutputType>[]
          }
          count: {
            args: Prisma.RepairPartCountArgs<ExtArgs>
            result: $Utils.Optional<RepairPartCountAggregateOutputType> | number
          }
        }
      }
      BicycleRental: {
        payload: Prisma.$BicycleRentalPayload<ExtArgs>
        fields: Prisma.BicycleRentalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BicycleRentalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BicycleRentalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BicycleRentalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BicycleRentalPayload>
          }
          findFirst: {
            args: Prisma.BicycleRentalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BicycleRentalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BicycleRentalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BicycleRentalPayload>
          }
          findMany: {
            args: Prisma.BicycleRentalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BicycleRentalPayload>[]
          }
          create: {
            args: Prisma.BicycleRentalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BicycleRentalPayload>
          }
          createMany: {
            args: Prisma.BicycleRentalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.BicycleRentalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BicycleRentalPayload>
          }
          update: {
            args: Prisma.BicycleRentalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BicycleRentalPayload>
          }
          deleteMany: {
            args: Prisma.BicycleRentalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BicycleRentalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BicycleRentalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BicycleRentalPayload>
          }
          aggregate: {
            args: Prisma.BicycleRentalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBicycleRental>
          }
          groupBy: {
            args: Prisma.BicycleRentalGroupByArgs<ExtArgs>
            result: $Utils.Optional<BicycleRentalGroupByOutputType>[]
          }
          count: {
            args: Prisma.BicycleRentalCountArgs<ExtArgs>
            result: $Utils.Optional<BicycleRentalCountAggregateOutputType> | number
          }
        }
      }
      TeamMember: {
        payload: Prisma.$TeamMemberPayload<ExtArgs>
        fields: Prisma.TeamMemberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TeamMemberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TeamMemberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>
          }
          findFirst: {
            args: Prisma.TeamMemberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TeamMemberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>
          }
          findMany: {
            args: Prisma.TeamMemberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>[]
          }
          create: {
            args: Prisma.TeamMemberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>
          }
          createMany: {
            args: Prisma.TeamMemberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TeamMemberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>
          }
          update: {
            args: Prisma.TeamMemberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>
          }
          deleteMany: {
            args: Prisma.TeamMemberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TeamMemberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TeamMemberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>
          }
          aggregate: {
            args: Prisma.TeamMemberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTeamMember>
          }
          groupBy: {
            args: Prisma.TeamMemberGroupByArgs<ExtArgs>
            result: $Utils.Optional<TeamMemberGroupByOutputType>[]
          }
          count: {
            args: Prisma.TeamMemberCountArgs<ExtArgs>
            result: $Utils.Optional<TeamMemberCountAggregateOutputType> | number
          }
        }
      }
      ElectronicsRepair: {
        payload: Prisma.$ElectronicsRepairPayload<ExtArgs>
        fields: Prisma.ElectronicsRepairFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ElectronicsRepairFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElectronicsRepairPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ElectronicsRepairFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElectronicsRepairPayload>
          }
          findFirst: {
            args: Prisma.ElectronicsRepairFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElectronicsRepairPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ElectronicsRepairFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElectronicsRepairPayload>
          }
          findMany: {
            args: Prisma.ElectronicsRepairFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElectronicsRepairPayload>[]
          }
          create: {
            args: Prisma.ElectronicsRepairCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElectronicsRepairPayload>
          }
          createMany: {
            args: Prisma.ElectronicsRepairCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ElectronicsRepairDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElectronicsRepairPayload>
          }
          update: {
            args: Prisma.ElectronicsRepairUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElectronicsRepairPayload>
          }
          deleteMany: {
            args: Prisma.ElectronicsRepairDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ElectronicsRepairUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ElectronicsRepairUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElectronicsRepairPayload>
          }
          aggregate: {
            args: Prisma.ElectronicsRepairAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateElectronicsRepair>
          }
          groupBy: {
            args: Prisma.ElectronicsRepairGroupByArgs<ExtArgs>
            result: $Utils.Optional<ElectronicsRepairGroupByOutputType>[]
          }
          count: {
            args: Prisma.ElectronicsRepairCountArgs<ExtArgs>
            result: $Utils.Optional<ElectronicsRepairCountAggregateOutputType> | number
          }
        }
      }
      CarpentryProject: {
        payload: Prisma.$CarpentryProjectPayload<ExtArgs>
        fields: Prisma.CarpentryProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CarpentryProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarpentryProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CarpentryProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarpentryProjectPayload>
          }
          findFirst: {
            args: Prisma.CarpentryProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarpentryProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CarpentryProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarpentryProjectPayload>
          }
          findMany: {
            args: Prisma.CarpentryProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarpentryProjectPayload>[]
          }
          create: {
            args: Prisma.CarpentryProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarpentryProjectPayload>
          }
          createMany: {
            args: Prisma.CarpentryProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CarpentryProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarpentryProjectPayload>
          }
          update: {
            args: Prisma.CarpentryProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarpentryProjectPayload>
          }
          deleteMany: {
            args: Prisma.CarpentryProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CarpentryProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CarpentryProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarpentryProjectPayload>
          }
          aggregate: {
            args: Prisma.CarpentryProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCarpentryProject>
          }
          groupBy: {
            args: Prisma.CarpentryProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<CarpentryProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.CarpentryProjectCountArgs<ExtArgs>
            result: $Utils.Optional<CarpentryProjectCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    problemType?: ProblemTypeOmit
    bicycleRepair?: BicycleRepairOmit
    part?: PartOmit
    repairPart?: RepairPartOmit
    bicycleRental?: BicycleRentalOmit
    teamMember?: TeamMemberOmit
    electronicsRepair?: ElectronicsRepairOmit
    carpentryProject?: CarpentryProjectOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    electronicsRepairs: number
    carpentryProjects: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    electronicsRepairs?: boolean | UserCountOutputTypeCountElectronicsRepairsArgs
    carpentryProjects?: boolean | UserCountOutputTypeCountCarpentryProjectsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountElectronicsRepairsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ElectronicsRepairWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCarpentryProjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CarpentryProjectWhereInput
  }


  /**
   * Count Type BicycleRepairCountOutputType
   */

  export type BicycleRepairCountOutputType = {
    partsUsed: number
  }

  export type BicycleRepairCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    partsUsed?: boolean | BicycleRepairCountOutputTypeCountPartsUsedArgs
  }

  // Custom InputTypes
  /**
   * BicycleRepairCountOutputType without action
   */
  export type BicycleRepairCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BicycleRepairCountOutputType
     */
    select?: BicycleRepairCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BicycleRepairCountOutputType without action
   */
  export type BicycleRepairCountOutputTypeCountPartsUsedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RepairPartWhereInput
  }


  /**
   * Count Type PartCountOutputType
   */

  export type PartCountOutputType = {
    repairs: number
  }

  export type PartCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repairs?: boolean | PartCountOutputTypeCountRepairsArgs
  }

  // Custom InputTypes
  /**
   * PartCountOutputType without action
   */
  export type PartCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartCountOutputType
     */
    select?: PartCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PartCountOutputType without action
   */
  export type PartCountOutputTypeCountRepairsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RepairPartWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    googleId: string | null
    role: string | null
    enabled: boolean | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    googleId: string | null
    role: string | null
    enabled: boolean | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    googleId: number
    role: number
    enabled: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    googleId?: true
    role?: true
    enabled?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    googleId?: true
    role?: true
    enabled?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    googleId?: true
    role?: true
    enabled?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string | null
    googleId: string
    role: string | null
    enabled: boolean | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    googleId?: boolean
    role?: boolean
    enabled?: boolean
    electronicsRepairs?: boolean | User$electronicsRepairsArgs<ExtArgs>
    carpentryProjects?: boolean | User$carpentryProjectsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    googleId?: boolean
    role?: boolean
    enabled?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "googleId" | "role" | "enabled", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    electronicsRepairs?: boolean | User$electronicsRepairsArgs<ExtArgs>
    carpentryProjects?: boolean | User$carpentryProjectsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      electronicsRepairs: Prisma.$ElectronicsRepairPayload<ExtArgs>[]
      carpentryProjects: Prisma.$CarpentryProjectPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string | null
      googleId: string
      role: string | null
      enabled: boolean | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    electronicsRepairs<T extends User$electronicsRepairsArgs<ExtArgs> = {}>(args?: Subset<T, User$electronicsRepairsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ElectronicsRepairPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    carpentryProjects<T extends User$carpentryProjectsArgs<ExtArgs> = {}>(args?: Subset<T, User$carpentryProjectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CarpentryProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly googleId: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly enabled: FieldRef<"User", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.electronicsRepairs
   */
  export type User$electronicsRepairsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElectronicsRepair
     */
    select?: ElectronicsRepairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElectronicsRepair
     */
    omit?: ElectronicsRepairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElectronicsRepairInclude<ExtArgs> | null
    where?: ElectronicsRepairWhereInput
    orderBy?: ElectronicsRepairOrderByWithRelationInput | ElectronicsRepairOrderByWithRelationInput[]
    cursor?: ElectronicsRepairWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ElectronicsRepairScalarFieldEnum | ElectronicsRepairScalarFieldEnum[]
  }

  /**
   * User.carpentryProjects
   */
  export type User$carpentryProjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarpentryProject
     */
    select?: CarpentryProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CarpentryProject
     */
    omit?: CarpentryProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarpentryProjectInclude<ExtArgs> | null
    where?: CarpentryProjectWhereInput
    orderBy?: CarpentryProjectOrderByWithRelationInput | CarpentryProjectOrderByWithRelationInput[]
    cursor?: CarpentryProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CarpentryProjectScalarFieldEnum | CarpentryProjectScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model ProblemType
   */

  export type AggregateProblemType = {
    _count: ProblemTypeCountAggregateOutputType | null
    _avg: ProblemTypeAvgAggregateOutputType | null
    _sum: ProblemTypeSumAggregateOutputType | null
    _min: ProblemTypeMinAggregateOutputType | null
    _max: ProblemTypeMaxAggregateOutputType | null
  }

  export type ProblemTypeAvgAggregateOutputType = {
    index: number | null
  }

  export type ProblemTypeSumAggregateOutputType = {
    index: number | null
  }

  export type ProblemTypeMinAggregateOutputType = {
    id: string | null
    value: string | null
    label: string | null
    image: string | null
    index: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProblemTypeMaxAggregateOutputType = {
    id: string | null
    value: string | null
    label: string | null
    image: string | null
    index: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProblemTypeCountAggregateOutputType = {
    id: number
    value: number
    label: number
    image: number
    index: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProblemTypeAvgAggregateInputType = {
    index?: true
  }

  export type ProblemTypeSumAggregateInputType = {
    index?: true
  }

  export type ProblemTypeMinAggregateInputType = {
    id?: true
    value?: true
    label?: true
    image?: true
    index?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProblemTypeMaxAggregateInputType = {
    id?: true
    value?: true
    label?: true
    image?: true
    index?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProblemTypeCountAggregateInputType = {
    id?: true
    value?: true
    label?: true
    image?: true
    index?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProblemTypeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProblemType to aggregate.
     */
    where?: ProblemTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProblemTypes to fetch.
     */
    orderBy?: ProblemTypeOrderByWithRelationInput | ProblemTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProblemTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProblemTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProblemTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProblemTypes
    **/
    _count?: true | ProblemTypeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProblemTypeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProblemTypeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProblemTypeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProblemTypeMaxAggregateInputType
  }

  export type GetProblemTypeAggregateType<T extends ProblemTypeAggregateArgs> = {
        [P in keyof T & keyof AggregateProblemType]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProblemType[P]>
      : GetScalarType<T[P], AggregateProblemType[P]>
  }




  export type ProblemTypeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProblemTypeWhereInput
    orderBy?: ProblemTypeOrderByWithAggregationInput | ProblemTypeOrderByWithAggregationInput[]
    by: ProblemTypeScalarFieldEnum[] | ProblemTypeScalarFieldEnum
    having?: ProblemTypeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProblemTypeCountAggregateInputType | true
    _avg?: ProblemTypeAvgAggregateInputType
    _sum?: ProblemTypeSumAggregateInputType
    _min?: ProblemTypeMinAggregateInputType
    _max?: ProblemTypeMaxAggregateInputType
  }

  export type ProblemTypeGroupByOutputType = {
    id: string
    value: string
    label: string
    image: string
    index: number
    createdAt: Date
    updatedAt: Date
    _count: ProblemTypeCountAggregateOutputType | null
    _avg: ProblemTypeAvgAggregateOutputType | null
    _sum: ProblemTypeSumAggregateOutputType | null
    _min: ProblemTypeMinAggregateOutputType | null
    _max: ProblemTypeMaxAggregateOutputType | null
  }

  type GetProblemTypeGroupByPayload<T extends ProblemTypeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProblemTypeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProblemTypeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProblemTypeGroupByOutputType[P]>
            : GetScalarType<T[P], ProblemTypeGroupByOutputType[P]>
        }
      >
    >


  export type ProblemTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    value?: boolean
    label?: boolean
    image?: boolean
    index?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["problemType"]>



  export type ProblemTypeSelectScalar = {
    id?: boolean
    value?: boolean
    label?: boolean
    image?: boolean
    index?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProblemTypeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "value" | "label" | "image" | "index" | "createdAt" | "updatedAt", ExtArgs["result"]["problemType"]>

  export type $ProblemTypePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProblemType"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      value: string
      label: string
      image: string
      index: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["problemType"]>
    composites: {}
  }

  type ProblemTypeGetPayload<S extends boolean | null | undefined | ProblemTypeDefaultArgs> = $Result.GetResult<Prisma.$ProblemTypePayload, S>

  type ProblemTypeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProblemTypeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProblemTypeCountAggregateInputType | true
    }

  export interface ProblemTypeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProblemType'], meta: { name: 'ProblemType' } }
    /**
     * Find zero or one ProblemType that matches the filter.
     * @param {ProblemTypeFindUniqueArgs} args - Arguments to find a ProblemType
     * @example
     * // Get one ProblemType
     * const problemType = await prisma.problemType.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProblemTypeFindUniqueArgs>(args: SelectSubset<T, ProblemTypeFindUniqueArgs<ExtArgs>>): Prisma__ProblemTypeClient<$Result.GetResult<Prisma.$ProblemTypePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProblemType that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProblemTypeFindUniqueOrThrowArgs} args - Arguments to find a ProblemType
     * @example
     * // Get one ProblemType
     * const problemType = await prisma.problemType.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProblemTypeFindUniqueOrThrowArgs>(args: SelectSubset<T, ProblemTypeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProblemTypeClient<$Result.GetResult<Prisma.$ProblemTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProblemType that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemTypeFindFirstArgs} args - Arguments to find a ProblemType
     * @example
     * // Get one ProblemType
     * const problemType = await prisma.problemType.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProblemTypeFindFirstArgs>(args?: SelectSubset<T, ProblemTypeFindFirstArgs<ExtArgs>>): Prisma__ProblemTypeClient<$Result.GetResult<Prisma.$ProblemTypePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProblemType that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemTypeFindFirstOrThrowArgs} args - Arguments to find a ProblemType
     * @example
     * // Get one ProblemType
     * const problemType = await prisma.problemType.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProblemTypeFindFirstOrThrowArgs>(args?: SelectSubset<T, ProblemTypeFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProblemTypeClient<$Result.GetResult<Prisma.$ProblemTypePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProblemTypes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemTypeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProblemTypes
     * const problemTypes = await prisma.problemType.findMany()
     * 
     * // Get first 10 ProblemTypes
     * const problemTypes = await prisma.problemType.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const problemTypeWithIdOnly = await prisma.problemType.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProblemTypeFindManyArgs>(args?: SelectSubset<T, ProblemTypeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProblemTypePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProblemType.
     * @param {ProblemTypeCreateArgs} args - Arguments to create a ProblemType.
     * @example
     * // Create one ProblemType
     * const ProblemType = await prisma.problemType.create({
     *   data: {
     *     // ... data to create a ProblemType
     *   }
     * })
     * 
     */
    create<T extends ProblemTypeCreateArgs>(args: SelectSubset<T, ProblemTypeCreateArgs<ExtArgs>>): Prisma__ProblemTypeClient<$Result.GetResult<Prisma.$ProblemTypePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProblemTypes.
     * @param {ProblemTypeCreateManyArgs} args - Arguments to create many ProblemTypes.
     * @example
     * // Create many ProblemTypes
     * const problemType = await prisma.problemType.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProblemTypeCreateManyArgs>(args?: SelectSubset<T, ProblemTypeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ProblemType.
     * @param {ProblemTypeDeleteArgs} args - Arguments to delete one ProblemType.
     * @example
     * // Delete one ProblemType
     * const ProblemType = await prisma.problemType.delete({
     *   where: {
     *     // ... filter to delete one ProblemType
     *   }
     * })
     * 
     */
    delete<T extends ProblemTypeDeleteArgs>(args: SelectSubset<T, ProblemTypeDeleteArgs<ExtArgs>>): Prisma__ProblemTypeClient<$Result.GetResult<Prisma.$ProblemTypePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProblemType.
     * @param {ProblemTypeUpdateArgs} args - Arguments to update one ProblemType.
     * @example
     * // Update one ProblemType
     * const problemType = await prisma.problemType.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProblemTypeUpdateArgs>(args: SelectSubset<T, ProblemTypeUpdateArgs<ExtArgs>>): Prisma__ProblemTypeClient<$Result.GetResult<Prisma.$ProblemTypePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProblemTypes.
     * @param {ProblemTypeDeleteManyArgs} args - Arguments to filter ProblemTypes to delete.
     * @example
     * // Delete a few ProblemTypes
     * const { count } = await prisma.problemType.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProblemTypeDeleteManyArgs>(args?: SelectSubset<T, ProblemTypeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProblemTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemTypeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProblemTypes
     * const problemType = await prisma.problemType.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProblemTypeUpdateManyArgs>(args: SelectSubset<T, ProblemTypeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ProblemType.
     * @param {ProblemTypeUpsertArgs} args - Arguments to update or create a ProblemType.
     * @example
     * // Update or create a ProblemType
     * const problemType = await prisma.problemType.upsert({
     *   create: {
     *     // ... data to create a ProblemType
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProblemType we want to update
     *   }
     * })
     */
    upsert<T extends ProblemTypeUpsertArgs>(args: SelectSubset<T, ProblemTypeUpsertArgs<ExtArgs>>): Prisma__ProblemTypeClient<$Result.GetResult<Prisma.$ProblemTypePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProblemTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemTypeCountArgs} args - Arguments to filter ProblemTypes to count.
     * @example
     * // Count the number of ProblemTypes
     * const count = await prisma.problemType.count({
     *   where: {
     *     // ... the filter for the ProblemTypes we want to count
     *   }
     * })
    **/
    count<T extends ProblemTypeCountArgs>(
      args?: Subset<T, ProblemTypeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProblemTypeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProblemType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemTypeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProblemTypeAggregateArgs>(args: Subset<T, ProblemTypeAggregateArgs>): Prisma.PrismaPromise<GetProblemTypeAggregateType<T>>

    /**
     * Group by ProblemType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemTypeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProblemTypeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProblemTypeGroupByArgs['orderBy'] }
        : { orderBy?: ProblemTypeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProblemTypeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProblemTypeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProblemType model
   */
  readonly fields: ProblemTypeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProblemType.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProblemTypeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProblemType model
   */
  interface ProblemTypeFieldRefs {
    readonly id: FieldRef<"ProblemType", 'String'>
    readonly value: FieldRef<"ProblemType", 'String'>
    readonly label: FieldRef<"ProblemType", 'String'>
    readonly image: FieldRef<"ProblemType", 'String'>
    readonly index: FieldRef<"ProblemType", 'Int'>
    readonly createdAt: FieldRef<"ProblemType", 'DateTime'>
    readonly updatedAt: FieldRef<"ProblemType", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProblemType findUnique
   */
  export type ProblemTypeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemType
     */
    select?: ProblemTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemType
     */
    omit?: ProblemTypeOmit<ExtArgs> | null
    /**
     * Filter, which ProblemType to fetch.
     */
    where: ProblemTypeWhereUniqueInput
  }

  /**
   * ProblemType findUniqueOrThrow
   */
  export type ProblemTypeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemType
     */
    select?: ProblemTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemType
     */
    omit?: ProblemTypeOmit<ExtArgs> | null
    /**
     * Filter, which ProblemType to fetch.
     */
    where: ProblemTypeWhereUniqueInput
  }

  /**
   * ProblemType findFirst
   */
  export type ProblemTypeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemType
     */
    select?: ProblemTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemType
     */
    omit?: ProblemTypeOmit<ExtArgs> | null
    /**
     * Filter, which ProblemType to fetch.
     */
    where?: ProblemTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProblemTypes to fetch.
     */
    orderBy?: ProblemTypeOrderByWithRelationInput | ProblemTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProblemTypes.
     */
    cursor?: ProblemTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProblemTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProblemTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProblemTypes.
     */
    distinct?: ProblemTypeScalarFieldEnum | ProblemTypeScalarFieldEnum[]
  }

  /**
   * ProblemType findFirstOrThrow
   */
  export type ProblemTypeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemType
     */
    select?: ProblemTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemType
     */
    omit?: ProblemTypeOmit<ExtArgs> | null
    /**
     * Filter, which ProblemType to fetch.
     */
    where?: ProblemTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProblemTypes to fetch.
     */
    orderBy?: ProblemTypeOrderByWithRelationInput | ProblemTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProblemTypes.
     */
    cursor?: ProblemTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProblemTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProblemTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProblemTypes.
     */
    distinct?: ProblemTypeScalarFieldEnum | ProblemTypeScalarFieldEnum[]
  }

  /**
   * ProblemType findMany
   */
  export type ProblemTypeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemType
     */
    select?: ProblemTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemType
     */
    omit?: ProblemTypeOmit<ExtArgs> | null
    /**
     * Filter, which ProblemTypes to fetch.
     */
    where?: ProblemTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProblemTypes to fetch.
     */
    orderBy?: ProblemTypeOrderByWithRelationInput | ProblemTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProblemTypes.
     */
    cursor?: ProblemTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProblemTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProblemTypes.
     */
    skip?: number
    distinct?: ProblemTypeScalarFieldEnum | ProblemTypeScalarFieldEnum[]
  }

  /**
   * ProblemType create
   */
  export type ProblemTypeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemType
     */
    select?: ProblemTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemType
     */
    omit?: ProblemTypeOmit<ExtArgs> | null
    /**
     * The data needed to create a ProblemType.
     */
    data: XOR<ProblemTypeCreateInput, ProblemTypeUncheckedCreateInput>
  }

  /**
   * ProblemType createMany
   */
  export type ProblemTypeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProblemTypes.
     */
    data: ProblemTypeCreateManyInput | ProblemTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProblemType update
   */
  export type ProblemTypeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemType
     */
    select?: ProblemTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemType
     */
    omit?: ProblemTypeOmit<ExtArgs> | null
    /**
     * The data needed to update a ProblemType.
     */
    data: XOR<ProblemTypeUpdateInput, ProblemTypeUncheckedUpdateInput>
    /**
     * Choose, which ProblemType to update.
     */
    where: ProblemTypeWhereUniqueInput
  }

  /**
   * ProblemType updateMany
   */
  export type ProblemTypeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProblemTypes.
     */
    data: XOR<ProblemTypeUpdateManyMutationInput, ProblemTypeUncheckedUpdateManyInput>
    /**
     * Filter which ProblemTypes to update
     */
    where?: ProblemTypeWhereInput
    /**
     * Limit how many ProblemTypes to update.
     */
    limit?: number
  }

  /**
   * ProblemType upsert
   */
  export type ProblemTypeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemType
     */
    select?: ProblemTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemType
     */
    omit?: ProblemTypeOmit<ExtArgs> | null
    /**
     * The filter to search for the ProblemType to update in case it exists.
     */
    where: ProblemTypeWhereUniqueInput
    /**
     * In case the ProblemType found by the `where` argument doesn't exist, create a new ProblemType with this data.
     */
    create: XOR<ProblemTypeCreateInput, ProblemTypeUncheckedCreateInput>
    /**
     * In case the ProblemType was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProblemTypeUpdateInput, ProblemTypeUncheckedUpdateInput>
  }

  /**
   * ProblemType delete
   */
  export type ProblemTypeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemType
     */
    select?: ProblemTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemType
     */
    omit?: ProblemTypeOmit<ExtArgs> | null
    /**
     * Filter which ProblemType to delete.
     */
    where: ProblemTypeWhereUniqueInput
  }

  /**
   * ProblemType deleteMany
   */
  export type ProblemTypeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProblemTypes to delete
     */
    where?: ProblemTypeWhereInput
    /**
     * Limit how many ProblemTypes to delete.
     */
    limit?: number
  }

  /**
   * ProblemType without action
   */
  export type ProblemTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemType
     */
    select?: ProblemTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemType
     */
    omit?: ProblemTypeOmit<ExtArgs> | null
  }


  /**
   * Model BicycleRepair
   */

  export type AggregateBicycleRepair = {
    _count: BicycleRepairCountAggregateOutputType | null
    _min: BicycleRepairMinAggregateOutputType | null
    _max: BicycleRepairMaxAggregateOutputType | null
  }

  export type BicycleRepairMinAggregateOutputType = {
    id: string | null
    problemTypes: string | null
    description: string | null
    receivedDate: Date | null
    repairedDate: Date | null
    pickupDate: Date | null
    ownerPhone: string | null
    status: $Enums.RepairStatus | null
    photoPath: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BicycleRepairMaxAggregateOutputType = {
    id: string | null
    problemTypes: string | null
    description: string | null
    receivedDate: Date | null
    repairedDate: Date | null
    pickupDate: Date | null
    ownerPhone: string | null
    status: $Enums.RepairStatus | null
    photoPath: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BicycleRepairCountAggregateOutputType = {
    id: number
    problemTypes: number
    description: number
    receivedDate: number
    repairedDate: number
    pickupDate: number
    ownerPhone: number
    status: number
    photoPath: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BicycleRepairMinAggregateInputType = {
    id?: true
    problemTypes?: true
    description?: true
    receivedDate?: true
    repairedDate?: true
    pickupDate?: true
    ownerPhone?: true
    status?: true
    photoPath?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BicycleRepairMaxAggregateInputType = {
    id?: true
    problemTypes?: true
    description?: true
    receivedDate?: true
    repairedDate?: true
    pickupDate?: true
    ownerPhone?: true
    status?: true
    photoPath?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BicycleRepairCountAggregateInputType = {
    id?: true
    problemTypes?: true
    description?: true
    receivedDate?: true
    repairedDate?: true
    pickupDate?: true
    ownerPhone?: true
    status?: true
    photoPath?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BicycleRepairAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BicycleRepair to aggregate.
     */
    where?: BicycleRepairWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BicycleRepairs to fetch.
     */
    orderBy?: BicycleRepairOrderByWithRelationInput | BicycleRepairOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BicycleRepairWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BicycleRepairs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BicycleRepairs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BicycleRepairs
    **/
    _count?: true | BicycleRepairCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BicycleRepairMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BicycleRepairMaxAggregateInputType
  }

  export type GetBicycleRepairAggregateType<T extends BicycleRepairAggregateArgs> = {
        [P in keyof T & keyof AggregateBicycleRepair]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBicycleRepair[P]>
      : GetScalarType<T[P], AggregateBicycleRepair[P]>
  }




  export type BicycleRepairGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BicycleRepairWhereInput
    orderBy?: BicycleRepairOrderByWithAggregationInput | BicycleRepairOrderByWithAggregationInput[]
    by: BicycleRepairScalarFieldEnum[] | BicycleRepairScalarFieldEnum
    having?: BicycleRepairScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BicycleRepairCountAggregateInputType | true
    _min?: BicycleRepairMinAggregateInputType
    _max?: BicycleRepairMaxAggregateInputType
  }

  export type BicycleRepairGroupByOutputType = {
    id: string
    problemTypes: string
    description: string
    receivedDate: Date
    repairedDate: Date | null
    pickupDate: Date | null
    ownerPhone: string
    status: $Enums.RepairStatus
    photoPath: string | null
    createdAt: Date
    updatedAt: Date
    _count: BicycleRepairCountAggregateOutputType | null
    _min: BicycleRepairMinAggregateOutputType | null
    _max: BicycleRepairMaxAggregateOutputType | null
  }

  type GetBicycleRepairGroupByPayload<T extends BicycleRepairGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BicycleRepairGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BicycleRepairGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BicycleRepairGroupByOutputType[P]>
            : GetScalarType<T[P], BicycleRepairGroupByOutputType[P]>
        }
      >
    >


  export type BicycleRepairSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    problemTypes?: boolean
    description?: boolean
    receivedDate?: boolean
    repairedDate?: boolean
    pickupDate?: boolean
    ownerPhone?: boolean
    status?: boolean
    photoPath?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    partsUsed?: boolean | BicycleRepair$partsUsedArgs<ExtArgs>
    _count?: boolean | BicycleRepairCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bicycleRepair"]>



  export type BicycleRepairSelectScalar = {
    id?: boolean
    problemTypes?: boolean
    description?: boolean
    receivedDate?: boolean
    repairedDate?: boolean
    pickupDate?: boolean
    ownerPhone?: boolean
    status?: boolean
    photoPath?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BicycleRepairOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "problemTypes" | "description" | "receivedDate" | "repairedDate" | "pickupDate" | "ownerPhone" | "status" | "photoPath" | "createdAt" | "updatedAt", ExtArgs["result"]["bicycleRepair"]>
  export type BicycleRepairInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    partsUsed?: boolean | BicycleRepair$partsUsedArgs<ExtArgs>
    _count?: boolean | BicycleRepairCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $BicycleRepairPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BicycleRepair"
    objects: {
      partsUsed: Prisma.$RepairPartPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      problemTypes: string
      description: string
      receivedDate: Date
      repairedDate: Date | null
      pickupDate: Date | null
      ownerPhone: string
      status: $Enums.RepairStatus
      photoPath: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["bicycleRepair"]>
    composites: {}
  }

  type BicycleRepairGetPayload<S extends boolean | null | undefined | BicycleRepairDefaultArgs> = $Result.GetResult<Prisma.$BicycleRepairPayload, S>

  type BicycleRepairCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BicycleRepairFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BicycleRepairCountAggregateInputType | true
    }

  export interface BicycleRepairDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BicycleRepair'], meta: { name: 'BicycleRepair' } }
    /**
     * Find zero or one BicycleRepair that matches the filter.
     * @param {BicycleRepairFindUniqueArgs} args - Arguments to find a BicycleRepair
     * @example
     * // Get one BicycleRepair
     * const bicycleRepair = await prisma.bicycleRepair.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BicycleRepairFindUniqueArgs>(args: SelectSubset<T, BicycleRepairFindUniqueArgs<ExtArgs>>): Prisma__BicycleRepairClient<$Result.GetResult<Prisma.$BicycleRepairPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BicycleRepair that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BicycleRepairFindUniqueOrThrowArgs} args - Arguments to find a BicycleRepair
     * @example
     * // Get one BicycleRepair
     * const bicycleRepair = await prisma.bicycleRepair.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BicycleRepairFindUniqueOrThrowArgs>(args: SelectSubset<T, BicycleRepairFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BicycleRepairClient<$Result.GetResult<Prisma.$BicycleRepairPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BicycleRepair that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BicycleRepairFindFirstArgs} args - Arguments to find a BicycleRepair
     * @example
     * // Get one BicycleRepair
     * const bicycleRepair = await prisma.bicycleRepair.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BicycleRepairFindFirstArgs>(args?: SelectSubset<T, BicycleRepairFindFirstArgs<ExtArgs>>): Prisma__BicycleRepairClient<$Result.GetResult<Prisma.$BicycleRepairPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BicycleRepair that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BicycleRepairFindFirstOrThrowArgs} args - Arguments to find a BicycleRepair
     * @example
     * // Get one BicycleRepair
     * const bicycleRepair = await prisma.bicycleRepair.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BicycleRepairFindFirstOrThrowArgs>(args?: SelectSubset<T, BicycleRepairFindFirstOrThrowArgs<ExtArgs>>): Prisma__BicycleRepairClient<$Result.GetResult<Prisma.$BicycleRepairPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BicycleRepairs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BicycleRepairFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BicycleRepairs
     * const bicycleRepairs = await prisma.bicycleRepair.findMany()
     * 
     * // Get first 10 BicycleRepairs
     * const bicycleRepairs = await prisma.bicycleRepair.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bicycleRepairWithIdOnly = await prisma.bicycleRepair.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BicycleRepairFindManyArgs>(args?: SelectSubset<T, BicycleRepairFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BicycleRepairPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BicycleRepair.
     * @param {BicycleRepairCreateArgs} args - Arguments to create a BicycleRepair.
     * @example
     * // Create one BicycleRepair
     * const BicycleRepair = await prisma.bicycleRepair.create({
     *   data: {
     *     // ... data to create a BicycleRepair
     *   }
     * })
     * 
     */
    create<T extends BicycleRepairCreateArgs>(args: SelectSubset<T, BicycleRepairCreateArgs<ExtArgs>>): Prisma__BicycleRepairClient<$Result.GetResult<Prisma.$BicycleRepairPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BicycleRepairs.
     * @param {BicycleRepairCreateManyArgs} args - Arguments to create many BicycleRepairs.
     * @example
     * // Create many BicycleRepairs
     * const bicycleRepair = await prisma.bicycleRepair.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BicycleRepairCreateManyArgs>(args?: SelectSubset<T, BicycleRepairCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a BicycleRepair.
     * @param {BicycleRepairDeleteArgs} args - Arguments to delete one BicycleRepair.
     * @example
     * // Delete one BicycleRepair
     * const BicycleRepair = await prisma.bicycleRepair.delete({
     *   where: {
     *     // ... filter to delete one BicycleRepair
     *   }
     * })
     * 
     */
    delete<T extends BicycleRepairDeleteArgs>(args: SelectSubset<T, BicycleRepairDeleteArgs<ExtArgs>>): Prisma__BicycleRepairClient<$Result.GetResult<Prisma.$BicycleRepairPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BicycleRepair.
     * @param {BicycleRepairUpdateArgs} args - Arguments to update one BicycleRepair.
     * @example
     * // Update one BicycleRepair
     * const bicycleRepair = await prisma.bicycleRepair.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BicycleRepairUpdateArgs>(args: SelectSubset<T, BicycleRepairUpdateArgs<ExtArgs>>): Prisma__BicycleRepairClient<$Result.GetResult<Prisma.$BicycleRepairPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BicycleRepairs.
     * @param {BicycleRepairDeleteManyArgs} args - Arguments to filter BicycleRepairs to delete.
     * @example
     * // Delete a few BicycleRepairs
     * const { count } = await prisma.bicycleRepair.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BicycleRepairDeleteManyArgs>(args?: SelectSubset<T, BicycleRepairDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BicycleRepairs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BicycleRepairUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BicycleRepairs
     * const bicycleRepair = await prisma.bicycleRepair.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BicycleRepairUpdateManyArgs>(args: SelectSubset<T, BicycleRepairUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one BicycleRepair.
     * @param {BicycleRepairUpsertArgs} args - Arguments to update or create a BicycleRepair.
     * @example
     * // Update or create a BicycleRepair
     * const bicycleRepair = await prisma.bicycleRepair.upsert({
     *   create: {
     *     // ... data to create a BicycleRepair
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BicycleRepair we want to update
     *   }
     * })
     */
    upsert<T extends BicycleRepairUpsertArgs>(args: SelectSubset<T, BicycleRepairUpsertArgs<ExtArgs>>): Prisma__BicycleRepairClient<$Result.GetResult<Prisma.$BicycleRepairPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BicycleRepairs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BicycleRepairCountArgs} args - Arguments to filter BicycleRepairs to count.
     * @example
     * // Count the number of BicycleRepairs
     * const count = await prisma.bicycleRepair.count({
     *   where: {
     *     // ... the filter for the BicycleRepairs we want to count
     *   }
     * })
    **/
    count<T extends BicycleRepairCountArgs>(
      args?: Subset<T, BicycleRepairCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BicycleRepairCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BicycleRepair.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BicycleRepairAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BicycleRepairAggregateArgs>(args: Subset<T, BicycleRepairAggregateArgs>): Prisma.PrismaPromise<GetBicycleRepairAggregateType<T>>

    /**
     * Group by BicycleRepair.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BicycleRepairGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BicycleRepairGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BicycleRepairGroupByArgs['orderBy'] }
        : { orderBy?: BicycleRepairGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BicycleRepairGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBicycleRepairGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BicycleRepair model
   */
  readonly fields: BicycleRepairFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BicycleRepair.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BicycleRepairClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    partsUsed<T extends BicycleRepair$partsUsedArgs<ExtArgs> = {}>(args?: Subset<T, BicycleRepair$partsUsedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepairPartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BicycleRepair model
   */
  interface BicycleRepairFieldRefs {
    readonly id: FieldRef<"BicycleRepair", 'String'>
    readonly problemTypes: FieldRef<"BicycleRepair", 'String'>
    readonly description: FieldRef<"BicycleRepair", 'String'>
    readonly receivedDate: FieldRef<"BicycleRepair", 'DateTime'>
    readonly repairedDate: FieldRef<"BicycleRepair", 'DateTime'>
    readonly pickupDate: FieldRef<"BicycleRepair", 'DateTime'>
    readonly ownerPhone: FieldRef<"BicycleRepair", 'String'>
    readonly status: FieldRef<"BicycleRepair", 'RepairStatus'>
    readonly photoPath: FieldRef<"BicycleRepair", 'String'>
    readonly createdAt: FieldRef<"BicycleRepair", 'DateTime'>
    readonly updatedAt: FieldRef<"BicycleRepair", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BicycleRepair findUnique
   */
  export type BicycleRepairFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BicycleRepair
     */
    select?: BicycleRepairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BicycleRepair
     */
    omit?: BicycleRepairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BicycleRepairInclude<ExtArgs> | null
    /**
     * Filter, which BicycleRepair to fetch.
     */
    where: BicycleRepairWhereUniqueInput
  }

  /**
   * BicycleRepair findUniqueOrThrow
   */
  export type BicycleRepairFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BicycleRepair
     */
    select?: BicycleRepairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BicycleRepair
     */
    omit?: BicycleRepairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BicycleRepairInclude<ExtArgs> | null
    /**
     * Filter, which BicycleRepair to fetch.
     */
    where: BicycleRepairWhereUniqueInput
  }

  /**
   * BicycleRepair findFirst
   */
  export type BicycleRepairFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BicycleRepair
     */
    select?: BicycleRepairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BicycleRepair
     */
    omit?: BicycleRepairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BicycleRepairInclude<ExtArgs> | null
    /**
     * Filter, which BicycleRepair to fetch.
     */
    where?: BicycleRepairWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BicycleRepairs to fetch.
     */
    orderBy?: BicycleRepairOrderByWithRelationInput | BicycleRepairOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BicycleRepairs.
     */
    cursor?: BicycleRepairWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BicycleRepairs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BicycleRepairs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BicycleRepairs.
     */
    distinct?: BicycleRepairScalarFieldEnum | BicycleRepairScalarFieldEnum[]
  }

  /**
   * BicycleRepair findFirstOrThrow
   */
  export type BicycleRepairFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BicycleRepair
     */
    select?: BicycleRepairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BicycleRepair
     */
    omit?: BicycleRepairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BicycleRepairInclude<ExtArgs> | null
    /**
     * Filter, which BicycleRepair to fetch.
     */
    where?: BicycleRepairWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BicycleRepairs to fetch.
     */
    orderBy?: BicycleRepairOrderByWithRelationInput | BicycleRepairOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BicycleRepairs.
     */
    cursor?: BicycleRepairWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BicycleRepairs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BicycleRepairs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BicycleRepairs.
     */
    distinct?: BicycleRepairScalarFieldEnum | BicycleRepairScalarFieldEnum[]
  }

  /**
   * BicycleRepair findMany
   */
  export type BicycleRepairFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BicycleRepair
     */
    select?: BicycleRepairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BicycleRepair
     */
    omit?: BicycleRepairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BicycleRepairInclude<ExtArgs> | null
    /**
     * Filter, which BicycleRepairs to fetch.
     */
    where?: BicycleRepairWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BicycleRepairs to fetch.
     */
    orderBy?: BicycleRepairOrderByWithRelationInput | BicycleRepairOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BicycleRepairs.
     */
    cursor?: BicycleRepairWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BicycleRepairs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BicycleRepairs.
     */
    skip?: number
    distinct?: BicycleRepairScalarFieldEnum | BicycleRepairScalarFieldEnum[]
  }

  /**
   * BicycleRepair create
   */
  export type BicycleRepairCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BicycleRepair
     */
    select?: BicycleRepairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BicycleRepair
     */
    omit?: BicycleRepairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BicycleRepairInclude<ExtArgs> | null
    /**
     * The data needed to create a BicycleRepair.
     */
    data: XOR<BicycleRepairCreateInput, BicycleRepairUncheckedCreateInput>
  }

  /**
   * BicycleRepair createMany
   */
  export type BicycleRepairCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BicycleRepairs.
     */
    data: BicycleRepairCreateManyInput | BicycleRepairCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BicycleRepair update
   */
  export type BicycleRepairUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BicycleRepair
     */
    select?: BicycleRepairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BicycleRepair
     */
    omit?: BicycleRepairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BicycleRepairInclude<ExtArgs> | null
    /**
     * The data needed to update a BicycleRepair.
     */
    data: XOR<BicycleRepairUpdateInput, BicycleRepairUncheckedUpdateInput>
    /**
     * Choose, which BicycleRepair to update.
     */
    where: BicycleRepairWhereUniqueInput
  }

  /**
   * BicycleRepair updateMany
   */
  export type BicycleRepairUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BicycleRepairs.
     */
    data: XOR<BicycleRepairUpdateManyMutationInput, BicycleRepairUncheckedUpdateManyInput>
    /**
     * Filter which BicycleRepairs to update
     */
    where?: BicycleRepairWhereInput
    /**
     * Limit how many BicycleRepairs to update.
     */
    limit?: number
  }

  /**
   * BicycleRepair upsert
   */
  export type BicycleRepairUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BicycleRepair
     */
    select?: BicycleRepairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BicycleRepair
     */
    omit?: BicycleRepairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BicycleRepairInclude<ExtArgs> | null
    /**
     * The filter to search for the BicycleRepair to update in case it exists.
     */
    where: BicycleRepairWhereUniqueInput
    /**
     * In case the BicycleRepair found by the `where` argument doesn't exist, create a new BicycleRepair with this data.
     */
    create: XOR<BicycleRepairCreateInput, BicycleRepairUncheckedCreateInput>
    /**
     * In case the BicycleRepair was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BicycleRepairUpdateInput, BicycleRepairUncheckedUpdateInput>
  }

  /**
   * BicycleRepair delete
   */
  export type BicycleRepairDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BicycleRepair
     */
    select?: BicycleRepairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BicycleRepair
     */
    omit?: BicycleRepairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BicycleRepairInclude<ExtArgs> | null
    /**
     * Filter which BicycleRepair to delete.
     */
    where: BicycleRepairWhereUniqueInput
  }

  /**
   * BicycleRepair deleteMany
   */
  export type BicycleRepairDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BicycleRepairs to delete
     */
    where?: BicycleRepairWhereInput
    /**
     * Limit how many BicycleRepairs to delete.
     */
    limit?: number
  }

  /**
   * BicycleRepair.partsUsed
   */
  export type BicycleRepair$partsUsedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairPart
     */
    select?: RepairPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairPart
     */
    omit?: RepairPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairPartInclude<ExtArgs> | null
    where?: RepairPartWhereInput
    orderBy?: RepairPartOrderByWithRelationInput | RepairPartOrderByWithRelationInput[]
    cursor?: RepairPartWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RepairPartScalarFieldEnum | RepairPartScalarFieldEnum[]
  }

  /**
   * BicycleRepair without action
   */
  export type BicycleRepairDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BicycleRepair
     */
    select?: BicycleRepairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BicycleRepair
     */
    omit?: BicycleRepairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BicycleRepairInclude<ExtArgs> | null
  }


  /**
   * Model Part
   */

  export type AggregatePart = {
    _count: PartCountAggregateOutputType | null
    _avg: PartAvgAggregateOutputType | null
    _sum: PartSumAggregateOutputType | null
    _min: PartMinAggregateOutputType | null
    _max: PartMaxAggregateOutputType | null
  }

  export type PartAvgAggregateOutputType = {
    quantity: number | null
  }

  export type PartSumAggregateOutputType = {
    quantity: number | null
  }

  export type PartMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    quantity: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PartMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    quantity: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PartCountAggregateOutputType = {
    id: number
    name: number
    description: number
    quantity: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PartAvgAggregateInputType = {
    quantity?: true
  }

  export type PartSumAggregateInputType = {
    quantity?: true
  }

  export type PartMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    quantity?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PartMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    quantity?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PartCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    quantity?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PartAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Part to aggregate.
     */
    where?: PartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parts to fetch.
     */
    orderBy?: PartOrderByWithRelationInput | PartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Parts
    **/
    _count?: true | PartCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PartAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PartSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PartMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PartMaxAggregateInputType
  }

  export type GetPartAggregateType<T extends PartAggregateArgs> = {
        [P in keyof T & keyof AggregatePart]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePart[P]>
      : GetScalarType<T[P], AggregatePart[P]>
  }




  export type PartGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PartWhereInput
    orderBy?: PartOrderByWithAggregationInput | PartOrderByWithAggregationInput[]
    by: PartScalarFieldEnum[] | PartScalarFieldEnum
    having?: PartScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PartCountAggregateInputType | true
    _avg?: PartAvgAggregateInputType
    _sum?: PartSumAggregateInputType
    _min?: PartMinAggregateInputType
    _max?: PartMaxAggregateInputType
  }

  export type PartGroupByOutputType = {
    id: string
    name: string
    description: string | null
    quantity: number
    createdAt: Date
    updatedAt: Date
    _count: PartCountAggregateOutputType | null
    _avg: PartAvgAggregateOutputType | null
    _sum: PartSumAggregateOutputType | null
    _min: PartMinAggregateOutputType | null
    _max: PartMaxAggregateOutputType | null
  }

  type GetPartGroupByPayload<T extends PartGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PartGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PartGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PartGroupByOutputType[P]>
            : GetScalarType<T[P], PartGroupByOutputType[P]>
        }
      >
    >


  export type PartSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    quantity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    repairs?: boolean | Part$repairsArgs<ExtArgs>
    _count?: boolean | PartCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["part"]>



  export type PartSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    quantity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PartOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "quantity" | "createdAt" | "updatedAt", ExtArgs["result"]["part"]>
  export type PartInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repairs?: boolean | Part$repairsArgs<ExtArgs>
    _count?: boolean | PartCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $PartPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Part"
    objects: {
      repairs: Prisma.$RepairPartPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      quantity: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["part"]>
    composites: {}
  }

  type PartGetPayload<S extends boolean | null | undefined | PartDefaultArgs> = $Result.GetResult<Prisma.$PartPayload, S>

  type PartCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PartFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PartCountAggregateInputType | true
    }

  export interface PartDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Part'], meta: { name: 'Part' } }
    /**
     * Find zero or one Part that matches the filter.
     * @param {PartFindUniqueArgs} args - Arguments to find a Part
     * @example
     * // Get one Part
     * const part = await prisma.part.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PartFindUniqueArgs>(args: SelectSubset<T, PartFindUniqueArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Part that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PartFindUniqueOrThrowArgs} args - Arguments to find a Part
     * @example
     * // Get one Part
     * const part = await prisma.part.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PartFindUniqueOrThrowArgs>(args: SelectSubset<T, PartFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Part that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartFindFirstArgs} args - Arguments to find a Part
     * @example
     * // Get one Part
     * const part = await prisma.part.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PartFindFirstArgs>(args?: SelectSubset<T, PartFindFirstArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Part that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartFindFirstOrThrowArgs} args - Arguments to find a Part
     * @example
     * // Get one Part
     * const part = await prisma.part.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PartFindFirstOrThrowArgs>(args?: SelectSubset<T, PartFindFirstOrThrowArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Parts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Parts
     * const parts = await prisma.part.findMany()
     * 
     * // Get first 10 Parts
     * const parts = await prisma.part.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const partWithIdOnly = await prisma.part.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PartFindManyArgs>(args?: SelectSubset<T, PartFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Part.
     * @param {PartCreateArgs} args - Arguments to create a Part.
     * @example
     * // Create one Part
     * const Part = await prisma.part.create({
     *   data: {
     *     // ... data to create a Part
     *   }
     * })
     * 
     */
    create<T extends PartCreateArgs>(args: SelectSubset<T, PartCreateArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Parts.
     * @param {PartCreateManyArgs} args - Arguments to create many Parts.
     * @example
     * // Create many Parts
     * const part = await prisma.part.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PartCreateManyArgs>(args?: SelectSubset<T, PartCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Part.
     * @param {PartDeleteArgs} args - Arguments to delete one Part.
     * @example
     * // Delete one Part
     * const Part = await prisma.part.delete({
     *   where: {
     *     // ... filter to delete one Part
     *   }
     * })
     * 
     */
    delete<T extends PartDeleteArgs>(args: SelectSubset<T, PartDeleteArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Part.
     * @param {PartUpdateArgs} args - Arguments to update one Part.
     * @example
     * // Update one Part
     * const part = await prisma.part.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PartUpdateArgs>(args: SelectSubset<T, PartUpdateArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Parts.
     * @param {PartDeleteManyArgs} args - Arguments to filter Parts to delete.
     * @example
     * // Delete a few Parts
     * const { count } = await prisma.part.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PartDeleteManyArgs>(args?: SelectSubset<T, PartDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Parts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Parts
     * const part = await prisma.part.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PartUpdateManyArgs>(args: SelectSubset<T, PartUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Part.
     * @param {PartUpsertArgs} args - Arguments to update or create a Part.
     * @example
     * // Update or create a Part
     * const part = await prisma.part.upsert({
     *   create: {
     *     // ... data to create a Part
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Part we want to update
     *   }
     * })
     */
    upsert<T extends PartUpsertArgs>(args: SelectSubset<T, PartUpsertArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Parts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartCountArgs} args - Arguments to filter Parts to count.
     * @example
     * // Count the number of Parts
     * const count = await prisma.part.count({
     *   where: {
     *     // ... the filter for the Parts we want to count
     *   }
     * })
    **/
    count<T extends PartCountArgs>(
      args?: Subset<T, PartCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PartCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Part.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PartAggregateArgs>(args: Subset<T, PartAggregateArgs>): Prisma.PrismaPromise<GetPartAggregateType<T>>

    /**
     * Group by Part.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PartGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PartGroupByArgs['orderBy'] }
        : { orderBy?: PartGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PartGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPartGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Part model
   */
  readonly fields: PartFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Part.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PartClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    repairs<T extends Part$repairsArgs<ExtArgs> = {}>(args?: Subset<T, Part$repairsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepairPartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Part model
   */
  interface PartFieldRefs {
    readonly id: FieldRef<"Part", 'String'>
    readonly name: FieldRef<"Part", 'String'>
    readonly description: FieldRef<"Part", 'String'>
    readonly quantity: FieldRef<"Part", 'Int'>
    readonly createdAt: FieldRef<"Part", 'DateTime'>
    readonly updatedAt: FieldRef<"Part", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Part findUnique
   */
  export type PartFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * Filter, which Part to fetch.
     */
    where: PartWhereUniqueInput
  }

  /**
   * Part findUniqueOrThrow
   */
  export type PartFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * Filter, which Part to fetch.
     */
    where: PartWhereUniqueInput
  }

  /**
   * Part findFirst
   */
  export type PartFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * Filter, which Part to fetch.
     */
    where?: PartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parts to fetch.
     */
    orderBy?: PartOrderByWithRelationInput | PartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Parts.
     */
    cursor?: PartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Parts.
     */
    distinct?: PartScalarFieldEnum | PartScalarFieldEnum[]
  }

  /**
   * Part findFirstOrThrow
   */
  export type PartFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * Filter, which Part to fetch.
     */
    where?: PartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parts to fetch.
     */
    orderBy?: PartOrderByWithRelationInput | PartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Parts.
     */
    cursor?: PartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Parts.
     */
    distinct?: PartScalarFieldEnum | PartScalarFieldEnum[]
  }

  /**
   * Part findMany
   */
  export type PartFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * Filter, which Parts to fetch.
     */
    where?: PartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parts to fetch.
     */
    orderBy?: PartOrderByWithRelationInput | PartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Parts.
     */
    cursor?: PartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parts.
     */
    skip?: number
    distinct?: PartScalarFieldEnum | PartScalarFieldEnum[]
  }

  /**
   * Part create
   */
  export type PartCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * The data needed to create a Part.
     */
    data: XOR<PartCreateInput, PartUncheckedCreateInput>
  }

  /**
   * Part createMany
   */
  export type PartCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Parts.
     */
    data: PartCreateManyInput | PartCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Part update
   */
  export type PartUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * The data needed to update a Part.
     */
    data: XOR<PartUpdateInput, PartUncheckedUpdateInput>
    /**
     * Choose, which Part to update.
     */
    where: PartWhereUniqueInput
  }

  /**
   * Part updateMany
   */
  export type PartUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Parts.
     */
    data: XOR<PartUpdateManyMutationInput, PartUncheckedUpdateManyInput>
    /**
     * Filter which Parts to update
     */
    where?: PartWhereInput
    /**
     * Limit how many Parts to update.
     */
    limit?: number
  }

  /**
   * Part upsert
   */
  export type PartUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * The filter to search for the Part to update in case it exists.
     */
    where: PartWhereUniqueInput
    /**
     * In case the Part found by the `where` argument doesn't exist, create a new Part with this data.
     */
    create: XOR<PartCreateInput, PartUncheckedCreateInput>
    /**
     * In case the Part was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PartUpdateInput, PartUncheckedUpdateInput>
  }

  /**
   * Part delete
   */
  export type PartDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * Filter which Part to delete.
     */
    where: PartWhereUniqueInput
  }

  /**
   * Part deleteMany
   */
  export type PartDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Parts to delete
     */
    where?: PartWhereInput
    /**
     * Limit how many Parts to delete.
     */
    limit?: number
  }

  /**
   * Part.repairs
   */
  export type Part$repairsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairPart
     */
    select?: RepairPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairPart
     */
    omit?: RepairPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairPartInclude<ExtArgs> | null
    where?: RepairPartWhereInput
    orderBy?: RepairPartOrderByWithRelationInput | RepairPartOrderByWithRelationInput[]
    cursor?: RepairPartWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RepairPartScalarFieldEnum | RepairPartScalarFieldEnum[]
  }

  /**
   * Part without action
   */
  export type PartDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
  }


  /**
   * Model RepairPart
   */

  export type AggregateRepairPart = {
    _count: RepairPartCountAggregateOutputType | null
    _avg: RepairPartAvgAggregateOutputType | null
    _sum: RepairPartSumAggregateOutputType | null
    _min: RepairPartMinAggregateOutputType | null
    _max: RepairPartMaxAggregateOutputType | null
  }

  export type RepairPartAvgAggregateOutputType = {
    quantity: number | null
  }

  export type RepairPartSumAggregateOutputType = {
    quantity: number | null
  }

  export type RepairPartMinAggregateOutputType = {
    id: string | null
    repairId: string | null
    partId: string | null
    quantity: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RepairPartMaxAggregateOutputType = {
    id: string | null
    repairId: string | null
    partId: string | null
    quantity: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RepairPartCountAggregateOutputType = {
    id: number
    repairId: number
    partId: number
    quantity: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RepairPartAvgAggregateInputType = {
    quantity?: true
  }

  export type RepairPartSumAggregateInputType = {
    quantity?: true
  }

  export type RepairPartMinAggregateInputType = {
    id?: true
    repairId?: true
    partId?: true
    quantity?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RepairPartMaxAggregateInputType = {
    id?: true
    repairId?: true
    partId?: true
    quantity?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RepairPartCountAggregateInputType = {
    id?: true
    repairId?: true
    partId?: true
    quantity?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RepairPartAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RepairPart to aggregate.
     */
    where?: RepairPartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RepairParts to fetch.
     */
    orderBy?: RepairPartOrderByWithRelationInput | RepairPartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RepairPartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RepairParts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RepairParts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RepairParts
    **/
    _count?: true | RepairPartCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RepairPartAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RepairPartSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RepairPartMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RepairPartMaxAggregateInputType
  }

  export type GetRepairPartAggregateType<T extends RepairPartAggregateArgs> = {
        [P in keyof T & keyof AggregateRepairPart]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRepairPart[P]>
      : GetScalarType<T[P], AggregateRepairPart[P]>
  }




  export type RepairPartGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RepairPartWhereInput
    orderBy?: RepairPartOrderByWithAggregationInput | RepairPartOrderByWithAggregationInput[]
    by: RepairPartScalarFieldEnum[] | RepairPartScalarFieldEnum
    having?: RepairPartScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RepairPartCountAggregateInputType | true
    _avg?: RepairPartAvgAggregateInputType
    _sum?: RepairPartSumAggregateInputType
    _min?: RepairPartMinAggregateInputType
    _max?: RepairPartMaxAggregateInputType
  }

  export type RepairPartGroupByOutputType = {
    id: string
    repairId: string
    partId: string
    quantity: number
    createdAt: Date
    updatedAt: Date
    _count: RepairPartCountAggregateOutputType | null
    _avg: RepairPartAvgAggregateOutputType | null
    _sum: RepairPartSumAggregateOutputType | null
    _min: RepairPartMinAggregateOutputType | null
    _max: RepairPartMaxAggregateOutputType | null
  }

  type GetRepairPartGroupByPayload<T extends RepairPartGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RepairPartGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RepairPartGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RepairPartGroupByOutputType[P]>
            : GetScalarType<T[P], RepairPartGroupByOutputType[P]>
        }
      >
    >


  export type RepairPartSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    repairId?: boolean
    partId?: boolean
    quantity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    repair?: boolean | BicycleRepairDefaultArgs<ExtArgs>
    part?: boolean | PartDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["repairPart"]>



  export type RepairPartSelectScalar = {
    id?: boolean
    repairId?: boolean
    partId?: boolean
    quantity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RepairPartOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "repairId" | "partId" | "quantity" | "createdAt" | "updatedAt", ExtArgs["result"]["repairPart"]>
  export type RepairPartInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repair?: boolean | BicycleRepairDefaultArgs<ExtArgs>
    part?: boolean | PartDefaultArgs<ExtArgs>
  }

  export type $RepairPartPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RepairPart"
    objects: {
      repair: Prisma.$BicycleRepairPayload<ExtArgs>
      part: Prisma.$PartPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      repairId: string
      partId: string
      quantity: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["repairPart"]>
    composites: {}
  }

  type RepairPartGetPayload<S extends boolean | null | undefined | RepairPartDefaultArgs> = $Result.GetResult<Prisma.$RepairPartPayload, S>

  type RepairPartCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RepairPartFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RepairPartCountAggregateInputType | true
    }

  export interface RepairPartDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RepairPart'], meta: { name: 'RepairPart' } }
    /**
     * Find zero or one RepairPart that matches the filter.
     * @param {RepairPartFindUniqueArgs} args - Arguments to find a RepairPart
     * @example
     * // Get one RepairPart
     * const repairPart = await prisma.repairPart.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RepairPartFindUniqueArgs>(args: SelectSubset<T, RepairPartFindUniqueArgs<ExtArgs>>): Prisma__RepairPartClient<$Result.GetResult<Prisma.$RepairPartPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RepairPart that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RepairPartFindUniqueOrThrowArgs} args - Arguments to find a RepairPart
     * @example
     * // Get one RepairPart
     * const repairPart = await prisma.repairPart.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RepairPartFindUniqueOrThrowArgs>(args: SelectSubset<T, RepairPartFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RepairPartClient<$Result.GetResult<Prisma.$RepairPartPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RepairPart that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairPartFindFirstArgs} args - Arguments to find a RepairPart
     * @example
     * // Get one RepairPart
     * const repairPart = await prisma.repairPart.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RepairPartFindFirstArgs>(args?: SelectSubset<T, RepairPartFindFirstArgs<ExtArgs>>): Prisma__RepairPartClient<$Result.GetResult<Prisma.$RepairPartPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RepairPart that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairPartFindFirstOrThrowArgs} args - Arguments to find a RepairPart
     * @example
     * // Get one RepairPart
     * const repairPart = await prisma.repairPart.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RepairPartFindFirstOrThrowArgs>(args?: SelectSubset<T, RepairPartFindFirstOrThrowArgs<ExtArgs>>): Prisma__RepairPartClient<$Result.GetResult<Prisma.$RepairPartPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RepairParts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairPartFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RepairParts
     * const repairParts = await prisma.repairPart.findMany()
     * 
     * // Get first 10 RepairParts
     * const repairParts = await prisma.repairPart.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const repairPartWithIdOnly = await prisma.repairPart.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RepairPartFindManyArgs>(args?: SelectSubset<T, RepairPartFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepairPartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RepairPart.
     * @param {RepairPartCreateArgs} args - Arguments to create a RepairPart.
     * @example
     * // Create one RepairPart
     * const RepairPart = await prisma.repairPart.create({
     *   data: {
     *     // ... data to create a RepairPart
     *   }
     * })
     * 
     */
    create<T extends RepairPartCreateArgs>(args: SelectSubset<T, RepairPartCreateArgs<ExtArgs>>): Prisma__RepairPartClient<$Result.GetResult<Prisma.$RepairPartPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RepairParts.
     * @param {RepairPartCreateManyArgs} args - Arguments to create many RepairParts.
     * @example
     * // Create many RepairParts
     * const repairPart = await prisma.repairPart.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RepairPartCreateManyArgs>(args?: SelectSubset<T, RepairPartCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a RepairPart.
     * @param {RepairPartDeleteArgs} args - Arguments to delete one RepairPart.
     * @example
     * // Delete one RepairPart
     * const RepairPart = await prisma.repairPart.delete({
     *   where: {
     *     // ... filter to delete one RepairPart
     *   }
     * })
     * 
     */
    delete<T extends RepairPartDeleteArgs>(args: SelectSubset<T, RepairPartDeleteArgs<ExtArgs>>): Prisma__RepairPartClient<$Result.GetResult<Prisma.$RepairPartPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RepairPart.
     * @param {RepairPartUpdateArgs} args - Arguments to update one RepairPart.
     * @example
     * // Update one RepairPart
     * const repairPart = await prisma.repairPart.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RepairPartUpdateArgs>(args: SelectSubset<T, RepairPartUpdateArgs<ExtArgs>>): Prisma__RepairPartClient<$Result.GetResult<Prisma.$RepairPartPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RepairParts.
     * @param {RepairPartDeleteManyArgs} args - Arguments to filter RepairParts to delete.
     * @example
     * // Delete a few RepairParts
     * const { count } = await prisma.repairPart.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RepairPartDeleteManyArgs>(args?: SelectSubset<T, RepairPartDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RepairParts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairPartUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RepairParts
     * const repairPart = await prisma.repairPart.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RepairPartUpdateManyArgs>(args: SelectSubset<T, RepairPartUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RepairPart.
     * @param {RepairPartUpsertArgs} args - Arguments to update or create a RepairPart.
     * @example
     * // Update or create a RepairPart
     * const repairPart = await prisma.repairPart.upsert({
     *   create: {
     *     // ... data to create a RepairPart
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RepairPart we want to update
     *   }
     * })
     */
    upsert<T extends RepairPartUpsertArgs>(args: SelectSubset<T, RepairPartUpsertArgs<ExtArgs>>): Prisma__RepairPartClient<$Result.GetResult<Prisma.$RepairPartPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RepairParts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairPartCountArgs} args - Arguments to filter RepairParts to count.
     * @example
     * // Count the number of RepairParts
     * const count = await prisma.repairPart.count({
     *   where: {
     *     // ... the filter for the RepairParts we want to count
     *   }
     * })
    **/
    count<T extends RepairPartCountArgs>(
      args?: Subset<T, RepairPartCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RepairPartCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RepairPart.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairPartAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RepairPartAggregateArgs>(args: Subset<T, RepairPartAggregateArgs>): Prisma.PrismaPromise<GetRepairPartAggregateType<T>>

    /**
     * Group by RepairPart.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairPartGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RepairPartGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RepairPartGroupByArgs['orderBy'] }
        : { orderBy?: RepairPartGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RepairPartGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRepairPartGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RepairPart model
   */
  readonly fields: RepairPartFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RepairPart.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RepairPartClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    repair<T extends BicycleRepairDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BicycleRepairDefaultArgs<ExtArgs>>): Prisma__BicycleRepairClient<$Result.GetResult<Prisma.$BicycleRepairPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    part<T extends PartDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PartDefaultArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RepairPart model
   */
  interface RepairPartFieldRefs {
    readonly id: FieldRef<"RepairPart", 'String'>
    readonly repairId: FieldRef<"RepairPart", 'String'>
    readonly partId: FieldRef<"RepairPart", 'String'>
    readonly quantity: FieldRef<"RepairPart", 'Int'>
    readonly createdAt: FieldRef<"RepairPart", 'DateTime'>
    readonly updatedAt: FieldRef<"RepairPart", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RepairPart findUnique
   */
  export type RepairPartFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairPart
     */
    select?: RepairPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairPart
     */
    omit?: RepairPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairPartInclude<ExtArgs> | null
    /**
     * Filter, which RepairPart to fetch.
     */
    where: RepairPartWhereUniqueInput
  }

  /**
   * RepairPart findUniqueOrThrow
   */
  export type RepairPartFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairPart
     */
    select?: RepairPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairPart
     */
    omit?: RepairPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairPartInclude<ExtArgs> | null
    /**
     * Filter, which RepairPart to fetch.
     */
    where: RepairPartWhereUniqueInput
  }

  /**
   * RepairPart findFirst
   */
  export type RepairPartFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairPart
     */
    select?: RepairPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairPart
     */
    omit?: RepairPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairPartInclude<ExtArgs> | null
    /**
     * Filter, which RepairPart to fetch.
     */
    where?: RepairPartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RepairParts to fetch.
     */
    orderBy?: RepairPartOrderByWithRelationInput | RepairPartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RepairParts.
     */
    cursor?: RepairPartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RepairParts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RepairParts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RepairParts.
     */
    distinct?: RepairPartScalarFieldEnum | RepairPartScalarFieldEnum[]
  }

  /**
   * RepairPart findFirstOrThrow
   */
  export type RepairPartFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairPart
     */
    select?: RepairPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairPart
     */
    omit?: RepairPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairPartInclude<ExtArgs> | null
    /**
     * Filter, which RepairPart to fetch.
     */
    where?: RepairPartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RepairParts to fetch.
     */
    orderBy?: RepairPartOrderByWithRelationInput | RepairPartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RepairParts.
     */
    cursor?: RepairPartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RepairParts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RepairParts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RepairParts.
     */
    distinct?: RepairPartScalarFieldEnum | RepairPartScalarFieldEnum[]
  }

  /**
   * RepairPart findMany
   */
  export type RepairPartFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairPart
     */
    select?: RepairPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairPart
     */
    omit?: RepairPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairPartInclude<ExtArgs> | null
    /**
     * Filter, which RepairParts to fetch.
     */
    where?: RepairPartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RepairParts to fetch.
     */
    orderBy?: RepairPartOrderByWithRelationInput | RepairPartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RepairParts.
     */
    cursor?: RepairPartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RepairParts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RepairParts.
     */
    skip?: number
    distinct?: RepairPartScalarFieldEnum | RepairPartScalarFieldEnum[]
  }

  /**
   * RepairPart create
   */
  export type RepairPartCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairPart
     */
    select?: RepairPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairPart
     */
    omit?: RepairPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairPartInclude<ExtArgs> | null
    /**
     * The data needed to create a RepairPart.
     */
    data: XOR<RepairPartCreateInput, RepairPartUncheckedCreateInput>
  }

  /**
   * RepairPart createMany
   */
  export type RepairPartCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RepairParts.
     */
    data: RepairPartCreateManyInput | RepairPartCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RepairPart update
   */
  export type RepairPartUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairPart
     */
    select?: RepairPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairPart
     */
    omit?: RepairPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairPartInclude<ExtArgs> | null
    /**
     * The data needed to update a RepairPart.
     */
    data: XOR<RepairPartUpdateInput, RepairPartUncheckedUpdateInput>
    /**
     * Choose, which RepairPart to update.
     */
    where: RepairPartWhereUniqueInput
  }

  /**
   * RepairPart updateMany
   */
  export type RepairPartUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RepairParts.
     */
    data: XOR<RepairPartUpdateManyMutationInput, RepairPartUncheckedUpdateManyInput>
    /**
     * Filter which RepairParts to update
     */
    where?: RepairPartWhereInput
    /**
     * Limit how many RepairParts to update.
     */
    limit?: number
  }

  /**
   * RepairPart upsert
   */
  export type RepairPartUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairPart
     */
    select?: RepairPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairPart
     */
    omit?: RepairPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairPartInclude<ExtArgs> | null
    /**
     * The filter to search for the RepairPart to update in case it exists.
     */
    where: RepairPartWhereUniqueInput
    /**
     * In case the RepairPart found by the `where` argument doesn't exist, create a new RepairPart with this data.
     */
    create: XOR<RepairPartCreateInput, RepairPartUncheckedCreateInput>
    /**
     * In case the RepairPart was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RepairPartUpdateInput, RepairPartUncheckedUpdateInput>
  }

  /**
   * RepairPart delete
   */
  export type RepairPartDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairPart
     */
    select?: RepairPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairPart
     */
    omit?: RepairPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairPartInclude<ExtArgs> | null
    /**
     * Filter which RepairPart to delete.
     */
    where: RepairPartWhereUniqueInput
  }

  /**
   * RepairPart deleteMany
   */
  export type RepairPartDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RepairParts to delete
     */
    where?: RepairPartWhereInput
    /**
     * Limit how many RepairParts to delete.
     */
    limit?: number
  }

  /**
   * RepairPart without action
   */
  export type RepairPartDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairPart
     */
    select?: RepairPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepairPart
     */
    omit?: RepairPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepairPartInclude<ExtArgs> | null
  }


  /**
   * Model BicycleRental
   */

  export type AggregateBicycleRental = {
    _count: BicycleRentalCountAggregateOutputType | null
    _min: BicycleRentalMinAggregateOutputType | null
    _max: BicycleRentalMaxAggregateOutputType | null
  }

  export type BicycleRentalMinAggregateOutputType = {
    id: string | null
    renterName: string | null
    renterPhone: string | null
    renterEmail: string | null
    bicycleId: string | null
    startDate: Date | null
    endDate: Date | null
    actualReturnDate: Date | null
    status: $Enums.RentalStatus | null
    notes: string | null
    signature: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BicycleRentalMaxAggregateOutputType = {
    id: string | null
    renterName: string | null
    renterPhone: string | null
    renterEmail: string | null
    bicycleId: string | null
    startDate: Date | null
    endDate: Date | null
    actualReturnDate: Date | null
    status: $Enums.RentalStatus | null
    notes: string | null
    signature: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BicycleRentalCountAggregateOutputType = {
    id: number
    renterName: number
    renterPhone: number
    renterEmail: number
    bicycleId: number
    startDate: number
    endDate: number
    actualReturnDate: number
    status: number
    notes: number
    signature: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BicycleRentalMinAggregateInputType = {
    id?: true
    renterName?: true
    renterPhone?: true
    renterEmail?: true
    bicycleId?: true
    startDate?: true
    endDate?: true
    actualReturnDate?: true
    status?: true
    notes?: true
    signature?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BicycleRentalMaxAggregateInputType = {
    id?: true
    renterName?: true
    renterPhone?: true
    renterEmail?: true
    bicycleId?: true
    startDate?: true
    endDate?: true
    actualReturnDate?: true
    status?: true
    notes?: true
    signature?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BicycleRentalCountAggregateInputType = {
    id?: true
    renterName?: true
    renterPhone?: true
    renterEmail?: true
    bicycleId?: true
    startDate?: true
    endDate?: true
    actualReturnDate?: true
    status?: true
    notes?: true
    signature?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BicycleRentalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BicycleRental to aggregate.
     */
    where?: BicycleRentalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BicycleRentals to fetch.
     */
    orderBy?: BicycleRentalOrderByWithRelationInput | BicycleRentalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BicycleRentalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BicycleRentals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BicycleRentals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BicycleRentals
    **/
    _count?: true | BicycleRentalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BicycleRentalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BicycleRentalMaxAggregateInputType
  }

  export type GetBicycleRentalAggregateType<T extends BicycleRentalAggregateArgs> = {
        [P in keyof T & keyof AggregateBicycleRental]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBicycleRental[P]>
      : GetScalarType<T[P], AggregateBicycleRental[P]>
  }




  export type BicycleRentalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BicycleRentalWhereInput
    orderBy?: BicycleRentalOrderByWithAggregationInput | BicycleRentalOrderByWithAggregationInput[]
    by: BicycleRentalScalarFieldEnum[] | BicycleRentalScalarFieldEnum
    having?: BicycleRentalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BicycleRentalCountAggregateInputType | true
    _min?: BicycleRentalMinAggregateInputType
    _max?: BicycleRentalMaxAggregateInputType
  }

  export type BicycleRentalGroupByOutputType = {
    id: string
    renterName: string
    renterPhone: string
    renterEmail: string | null
    bicycleId: string
    startDate: Date
    endDate: Date
    actualReturnDate: Date | null
    status: $Enums.RentalStatus
    notes: string | null
    signature: string | null
    createdAt: Date
    updatedAt: Date
    _count: BicycleRentalCountAggregateOutputType | null
    _min: BicycleRentalMinAggregateOutputType | null
    _max: BicycleRentalMaxAggregateOutputType | null
  }

  type GetBicycleRentalGroupByPayload<T extends BicycleRentalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BicycleRentalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BicycleRentalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BicycleRentalGroupByOutputType[P]>
            : GetScalarType<T[P], BicycleRentalGroupByOutputType[P]>
        }
      >
    >


  export type BicycleRentalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    renterName?: boolean
    renterPhone?: boolean
    renterEmail?: boolean
    bicycleId?: boolean
    startDate?: boolean
    endDate?: boolean
    actualReturnDate?: boolean
    status?: boolean
    notes?: boolean
    signature?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["bicycleRental"]>



  export type BicycleRentalSelectScalar = {
    id?: boolean
    renterName?: boolean
    renterPhone?: boolean
    renterEmail?: boolean
    bicycleId?: boolean
    startDate?: boolean
    endDate?: boolean
    actualReturnDate?: boolean
    status?: boolean
    notes?: boolean
    signature?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BicycleRentalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "renterName" | "renterPhone" | "renterEmail" | "bicycleId" | "startDate" | "endDate" | "actualReturnDate" | "status" | "notes" | "signature" | "createdAt" | "updatedAt", ExtArgs["result"]["bicycleRental"]>

  export type $BicycleRentalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BicycleRental"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      renterName: string
      renterPhone: string
      renterEmail: string | null
      bicycleId: string
      startDate: Date
      endDate: Date
      actualReturnDate: Date | null
      status: $Enums.RentalStatus
      notes: string | null
      signature: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["bicycleRental"]>
    composites: {}
  }

  type BicycleRentalGetPayload<S extends boolean | null | undefined | BicycleRentalDefaultArgs> = $Result.GetResult<Prisma.$BicycleRentalPayload, S>

  type BicycleRentalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BicycleRentalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BicycleRentalCountAggregateInputType | true
    }

  export interface BicycleRentalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BicycleRental'], meta: { name: 'BicycleRental' } }
    /**
     * Find zero or one BicycleRental that matches the filter.
     * @param {BicycleRentalFindUniqueArgs} args - Arguments to find a BicycleRental
     * @example
     * // Get one BicycleRental
     * const bicycleRental = await prisma.bicycleRental.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BicycleRentalFindUniqueArgs>(args: SelectSubset<T, BicycleRentalFindUniqueArgs<ExtArgs>>): Prisma__BicycleRentalClient<$Result.GetResult<Prisma.$BicycleRentalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BicycleRental that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BicycleRentalFindUniqueOrThrowArgs} args - Arguments to find a BicycleRental
     * @example
     * // Get one BicycleRental
     * const bicycleRental = await prisma.bicycleRental.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BicycleRentalFindUniqueOrThrowArgs>(args: SelectSubset<T, BicycleRentalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BicycleRentalClient<$Result.GetResult<Prisma.$BicycleRentalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BicycleRental that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BicycleRentalFindFirstArgs} args - Arguments to find a BicycleRental
     * @example
     * // Get one BicycleRental
     * const bicycleRental = await prisma.bicycleRental.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BicycleRentalFindFirstArgs>(args?: SelectSubset<T, BicycleRentalFindFirstArgs<ExtArgs>>): Prisma__BicycleRentalClient<$Result.GetResult<Prisma.$BicycleRentalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BicycleRental that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BicycleRentalFindFirstOrThrowArgs} args - Arguments to find a BicycleRental
     * @example
     * // Get one BicycleRental
     * const bicycleRental = await prisma.bicycleRental.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BicycleRentalFindFirstOrThrowArgs>(args?: SelectSubset<T, BicycleRentalFindFirstOrThrowArgs<ExtArgs>>): Prisma__BicycleRentalClient<$Result.GetResult<Prisma.$BicycleRentalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BicycleRentals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BicycleRentalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BicycleRentals
     * const bicycleRentals = await prisma.bicycleRental.findMany()
     * 
     * // Get first 10 BicycleRentals
     * const bicycleRentals = await prisma.bicycleRental.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bicycleRentalWithIdOnly = await prisma.bicycleRental.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BicycleRentalFindManyArgs>(args?: SelectSubset<T, BicycleRentalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BicycleRentalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BicycleRental.
     * @param {BicycleRentalCreateArgs} args - Arguments to create a BicycleRental.
     * @example
     * // Create one BicycleRental
     * const BicycleRental = await prisma.bicycleRental.create({
     *   data: {
     *     // ... data to create a BicycleRental
     *   }
     * })
     * 
     */
    create<T extends BicycleRentalCreateArgs>(args: SelectSubset<T, BicycleRentalCreateArgs<ExtArgs>>): Prisma__BicycleRentalClient<$Result.GetResult<Prisma.$BicycleRentalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BicycleRentals.
     * @param {BicycleRentalCreateManyArgs} args - Arguments to create many BicycleRentals.
     * @example
     * // Create many BicycleRentals
     * const bicycleRental = await prisma.bicycleRental.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BicycleRentalCreateManyArgs>(args?: SelectSubset<T, BicycleRentalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a BicycleRental.
     * @param {BicycleRentalDeleteArgs} args - Arguments to delete one BicycleRental.
     * @example
     * // Delete one BicycleRental
     * const BicycleRental = await prisma.bicycleRental.delete({
     *   where: {
     *     // ... filter to delete one BicycleRental
     *   }
     * })
     * 
     */
    delete<T extends BicycleRentalDeleteArgs>(args: SelectSubset<T, BicycleRentalDeleteArgs<ExtArgs>>): Prisma__BicycleRentalClient<$Result.GetResult<Prisma.$BicycleRentalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BicycleRental.
     * @param {BicycleRentalUpdateArgs} args - Arguments to update one BicycleRental.
     * @example
     * // Update one BicycleRental
     * const bicycleRental = await prisma.bicycleRental.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BicycleRentalUpdateArgs>(args: SelectSubset<T, BicycleRentalUpdateArgs<ExtArgs>>): Prisma__BicycleRentalClient<$Result.GetResult<Prisma.$BicycleRentalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BicycleRentals.
     * @param {BicycleRentalDeleteManyArgs} args - Arguments to filter BicycleRentals to delete.
     * @example
     * // Delete a few BicycleRentals
     * const { count } = await prisma.bicycleRental.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BicycleRentalDeleteManyArgs>(args?: SelectSubset<T, BicycleRentalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BicycleRentals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BicycleRentalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BicycleRentals
     * const bicycleRental = await prisma.bicycleRental.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BicycleRentalUpdateManyArgs>(args: SelectSubset<T, BicycleRentalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one BicycleRental.
     * @param {BicycleRentalUpsertArgs} args - Arguments to update or create a BicycleRental.
     * @example
     * // Update or create a BicycleRental
     * const bicycleRental = await prisma.bicycleRental.upsert({
     *   create: {
     *     // ... data to create a BicycleRental
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BicycleRental we want to update
     *   }
     * })
     */
    upsert<T extends BicycleRentalUpsertArgs>(args: SelectSubset<T, BicycleRentalUpsertArgs<ExtArgs>>): Prisma__BicycleRentalClient<$Result.GetResult<Prisma.$BicycleRentalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BicycleRentals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BicycleRentalCountArgs} args - Arguments to filter BicycleRentals to count.
     * @example
     * // Count the number of BicycleRentals
     * const count = await prisma.bicycleRental.count({
     *   where: {
     *     // ... the filter for the BicycleRentals we want to count
     *   }
     * })
    **/
    count<T extends BicycleRentalCountArgs>(
      args?: Subset<T, BicycleRentalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BicycleRentalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BicycleRental.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BicycleRentalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BicycleRentalAggregateArgs>(args: Subset<T, BicycleRentalAggregateArgs>): Prisma.PrismaPromise<GetBicycleRentalAggregateType<T>>

    /**
     * Group by BicycleRental.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BicycleRentalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BicycleRentalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BicycleRentalGroupByArgs['orderBy'] }
        : { orderBy?: BicycleRentalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BicycleRentalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBicycleRentalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BicycleRental model
   */
  readonly fields: BicycleRentalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BicycleRental.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BicycleRentalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BicycleRental model
   */
  interface BicycleRentalFieldRefs {
    readonly id: FieldRef<"BicycleRental", 'String'>
    readonly renterName: FieldRef<"BicycleRental", 'String'>
    readonly renterPhone: FieldRef<"BicycleRental", 'String'>
    readonly renterEmail: FieldRef<"BicycleRental", 'String'>
    readonly bicycleId: FieldRef<"BicycleRental", 'String'>
    readonly startDate: FieldRef<"BicycleRental", 'DateTime'>
    readonly endDate: FieldRef<"BicycleRental", 'DateTime'>
    readonly actualReturnDate: FieldRef<"BicycleRental", 'DateTime'>
    readonly status: FieldRef<"BicycleRental", 'RentalStatus'>
    readonly notes: FieldRef<"BicycleRental", 'String'>
    readonly signature: FieldRef<"BicycleRental", 'String'>
    readonly createdAt: FieldRef<"BicycleRental", 'DateTime'>
    readonly updatedAt: FieldRef<"BicycleRental", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BicycleRental findUnique
   */
  export type BicycleRentalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BicycleRental
     */
    select?: BicycleRentalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BicycleRental
     */
    omit?: BicycleRentalOmit<ExtArgs> | null
    /**
     * Filter, which BicycleRental to fetch.
     */
    where: BicycleRentalWhereUniqueInput
  }

  /**
   * BicycleRental findUniqueOrThrow
   */
  export type BicycleRentalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BicycleRental
     */
    select?: BicycleRentalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BicycleRental
     */
    omit?: BicycleRentalOmit<ExtArgs> | null
    /**
     * Filter, which BicycleRental to fetch.
     */
    where: BicycleRentalWhereUniqueInput
  }

  /**
   * BicycleRental findFirst
   */
  export type BicycleRentalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BicycleRental
     */
    select?: BicycleRentalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BicycleRental
     */
    omit?: BicycleRentalOmit<ExtArgs> | null
    /**
     * Filter, which BicycleRental to fetch.
     */
    where?: BicycleRentalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BicycleRentals to fetch.
     */
    orderBy?: BicycleRentalOrderByWithRelationInput | BicycleRentalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BicycleRentals.
     */
    cursor?: BicycleRentalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BicycleRentals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BicycleRentals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BicycleRentals.
     */
    distinct?: BicycleRentalScalarFieldEnum | BicycleRentalScalarFieldEnum[]
  }

  /**
   * BicycleRental findFirstOrThrow
   */
  export type BicycleRentalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BicycleRental
     */
    select?: BicycleRentalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BicycleRental
     */
    omit?: BicycleRentalOmit<ExtArgs> | null
    /**
     * Filter, which BicycleRental to fetch.
     */
    where?: BicycleRentalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BicycleRentals to fetch.
     */
    orderBy?: BicycleRentalOrderByWithRelationInput | BicycleRentalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BicycleRentals.
     */
    cursor?: BicycleRentalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BicycleRentals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BicycleRentals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BicycleRentals.
     */
    distinct?: BicycleRentalScalarFieldEnum | BicycleRentalScalarFieldEnum[]
  }

  /**
   * BicycleRental findMany
   */
  export type BicycleRentalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BicycleRental
     */
    select?: BicycleRentalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BicycleRental
     */
    omit?: BicycleRentalOmit<ExtArgs> | null
    /**
     * Filter, which BicycleRentals to fetch.
     */
    where?: BicycleRentalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BicycleRentals to fetch.
     */
    orderBy?: BicycleRentalOrderByWithRelationInput | BicycleRentalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BicycleRentals.
     */
    cursor?: BicycleRentalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BicycleRentals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BicycleRentals.
     */
    skip?: number
    distinct?: BicycleRentalScalarFieldEnum | BicycleRentalScalarFieldEnum[]
  }

  /**
   * BicycleRental create
   */
  export type BicycleRentalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BicycleRental
     */
    select?: BicycleRentalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BicycleRental
     */
    omit?: BicycleRentalOmit<ExtArgs> | null
    /**
     * The data needed to create a BicycleRental.
     */
    data: XOR<BicycleRentalCreateInput, BicycleRentalUncheckedCreateInput>
  }

  /**
   * BicycleRental createMany
   */
  export type BicycleRentalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BicycleRentals.
     */
    data: BicycleRentalCreateManyInput | BicycleRentalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BicycleRental update
   */
  export type BicycleRentalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BicycleRental
     */
    select?: BicycleRentalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BicycleRental
     */
    omit?: BicycleRentalOmit<ExtArgs> | null
    /**
     * The data needed to update a BicycleRental.
     */
    data: XOR<BicycleRentalUpdateInput, BicycleRentalUncheckedUpdateInput>
    /**
     * Choose, which BicycleRental to update.
     */
    where: BicycleRentalWhereUniqueInput
  }

  /**
   * BicycleRental updateMany
   */
  export type BicycleRentalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BicycleRentals.
     */
    data: XOR<BicycleRentalUpdateManyMutationInput, BicycleRentalUncheckedUpdateManyInput>
    /**
     * Filter which BicycleRentals to update
     */
    where?: BicycleRentalWhereInput
    /**
     * Limit how many BicycleRentals to update.
     */
    limit?: number
  }

  /**
   * BicycleRental upsert
   */
  export type BicycleRentalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BicycleRental
     */
    select?: BicycleRentalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BicycleRental
     */
    omit?: BicycleRentalOmit<ExtArgs> | null
    /**
     * The filter to search for the BicycleRental to update in case it exists.
     */
    where: BicycleRentalWhereUniqueInput
    /**
     * In case the BicycleRental found by the `where` argument doesn't exist, create a new BicycleRental with this data.
     */
    create: XOR<BicycleRentalCreateInput, BicycleRentalUncheckedCreateInput>
    /**
     * In case the BicycleRental was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BicycleRentalUpdateInput, BicycleRentalUncheckedUpdateInput>
  }

  /**
   * BicycleRental delete
   */
  export type BicycleRentalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BicycleRental
     */
    select?: BicycleRentalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BicycleRental
     */
    omit?: BicycleRentalOmit<ExtArgs> | null
    /**
     * Filter which BicycleRental to delete.
     */
    where: BicycleRentalWhereUniqueInput
  }

  /**
   * BicycleRental deleteMany
   */
  export type BicycleRentalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BicycleRentals to delete
     */
    where?: BicycleRentalWhereInput
    /**
     * Limit how many BicycleRentals to delete.
     */
    limit?: number
  }

  /**
   * BicycleRental without action
   */
  export type BicycleRentalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BicycleRental
     */
    select?: BicycleRentalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BicycleRental
     */
    omit?: BicycleRentalOmit<ExtArgs> | null
  }


  /**
   * Model TeamMember
   */

  export type AggregateTeamMember = {
    _count: TeamMemberCountAggregateOutputType | null
    _min: TeamMemberMinAggregateOutputType | null
    _max: TeamMemberMaxAggregateOutputType | null
  }

  export type TeamMemberMinAggregateOutputType = {
    id: string | null
    familyName: string | null
    givenNames: string | null
    nationality: string | null
    photoPath: string | null
    status: $Enums.TeamMemberStatus | null
    startDate: Date | null
    endDate: Date | null
    department: string | null
    email: string | null
    phone: string | null
    homeAddress: string | null
    dateOfBirth: Date | null
    legalStatus: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TeamMemberMaxAggregateOutputType = {
    id: string | null
    familyName: string | null
    givenNames: string | null
    nationality: string | null
    photoPath: string | null
    status: $Enums.TeamMemberStatus | null
    startDate: Date | null
    endDate: Date | null
    department: string | null
    email: string | null
    phone: string | null
    homeAddress: string | null
    dateOfBirth: Date | null
    legalStatus: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TeamMemberCountAggregateOutputType = {
    id: number
    familyName: number
    givenNames: number
    nationality: number
    photoPath: number
    status: number
    startDate: number
    endDate: number
    department: number
    email: number
    phone: number
    homeAddress: number
    dateOfBirth: number
    legalStatus: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TeamMemberMinAggregateInputType = {
    id?: true
    familyName?: true
    givenNames?: true
    nationality?: true
    photoPath?: true
    status?: true
    startDate?: true
    endDate?: true
    department?: true
    email?: true
    phone?: true
    homeAddress?: true
    dateOfBirth?: true
    legalStatus?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TeamMemberMaxAggregateInputType = {
    id?: true
    familyName?: true
    givenNames?: true
    nationality?: true
    photoPath?: true
    status?: true
    startDate?: true
    endDate?: true
    department?: true
    email?: true
    phone?: true
    homeAddress?: true
    dateOfBirth?: true
    legalStatus?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TeamMemberCountAggregateInputType = {
    id?: true
    familyName?: true
    givenNames?: true
    nationality?: true
    photoPath?: true
    status?: true
    startDate?: true
    endDate?: true
    department?: true
    email?: true
    phone?: true
    homeAddress?: true
    dateOfBirth?: true
    legalStatus?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TeamMemberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TeamMember to aggregate.
     */
    where?: TeamMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamMembers to fetch.
     */
    orderBy?: TeamMemberOrderByWithRelationInput | TeamMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TeamMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TeamMembers
    **/
    _count?: true | TeamMemberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TeamMemberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TeamMemberMaxAggregateInputType
  }

  export type GetTeamMemberAggregateType<T extends TeamMemberAggregateArgs> = {
        [P in keyof T & keyof AggregateTeamMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTeamMember[P]>
      : GetScalarType<T[P], AggregateTeamMember[P]>
  }




  export type TeamMemberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamMemberWhereInput
    orderBy?: TeamMemberOrderByWithAggregationInput | TeamMemberOrderByWithAggregationInput[]
    by: TeamMemberScalarFieldEnum[] | TeamMemberScalarFieldEnum
    having?: TeamMemberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TeamMemberCountAggregateInputType | true
    _min?: TeamMemberMinAggregateInputType
    _max?: TeamMemberMaxAggregateInputType
  }

  export type TeamMemberGroupByOutputType = {
    id: string
    familyName: string
    givenNames: string
    nationality: string
    photoPath: string | null
    status: $Enums.TeamMemberStatus
    startDate: Date
    endDate: Date | null
    department: string
    email: string
    phone: string
    homeAddress: string | null
    dateOfBirth: Date
    legalStatus: string
    createdAt: Date
    updatedAt: Date
    _count: TeamMemberCountAggregateOutputType | null
    _min: TeamMemberMinAggregateOutputType | null
    _max: TeamMemberMaxAggregateOutputType | null
  }

  type GetTeamMemberGroupByPayload<T extends TeamMemberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TeamMemberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TeamMemberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TeamMemberGroupByOutputType[P]>
            : GetScalarType<T[P], TeamMemberGroupByOutputType[P]>
        }
      >
    >


  export type TeamMemberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    familyName?: boolean
    givenNames?: boolean
    nationality?: boolean
    photoPath?: boolean
    status?: boolean
    startDate?: boolean
    endDate?: boolean
    department?: boolean
    email?: boolean
    phone?: boolean
    homeAddress?: boolean
    dateOfBirth?: boolean
    legalStatus?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["teamMember"]>



  export type TeamMemberSelectScalar = {
    id?: boolean
    familyName?: boolean
    givenNames?: boolean
    nationality?: boolean
    photoPath?: boolean
    status?: boolean
    startDate?: boolean
    endDate?: boolean
    department?: boolean
    email?: boolean
    phone?: boolean
    homeAddress?: boolean
    dateOfBirth?: boolean
    legalStatus?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TeamMemberOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "familyName" | "givenNames" | "nationality" | "photoPath" | "status" | "startDate" | "endDate" | "department" | "email" | "phone" | "homeAddress" | "dateOfBirth" | "legalStatus" | "createdAt" | "updatedAt", ExtArgs["result"]["teamMember"]>

  export type $TeamMemberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TeamMember"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      familyName: string
      givenNames: string
      nationality: string
      photoPath: string | null
      status: $Enums.TeamMemberStatus
      startDate: Date
      endDate: Date | null
      department: string
      email: string
      phone: string
      homeAddress: string | null
      dateOfBirth: Date
      legalStatus: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["teamMember"]>
    composites: {}
  }

  type TeamMemberGetPayload<S extends boolean | null | undefined | TeamMemberDefaultArgs> = $Result.GetResult<Prisma.$TeamMemberPayload, S>

  type TeamMemberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TeamMemberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TeamMemberCountAggregateInputType | true
    }

  export interface TeamMemberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TeamMember'], meta: { name: 'TeamMember' } }
    /**
     * Find zero or one TeamMember that matches the filter.
     * @param {TeamMemberFindUniqueArgs} args - Arguments to find a TeamMember
     * @example
     * // Get one TeamMember
     * const teamMember = await prisma.teamMember.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TeamMemberFindUniqueArgs>(args: SelectSubset<T, TeamMemberFindUniqueArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TeamMember that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TeamMemberFindUniqueOrThrowArgs} args - Arguments to find a TeamMember
     * @example
     * // Get one TeamMember
     * const teamMember = await prisma.teamMember.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TeamMemberFindUniqueOrThrowArgs>(args: SelectSubset<T, TeamMemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TeamMember that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberFindFirstArgs} args - Arguments to find a TeamMember
     * @example
     * // Get one TeamMember
     * const teamMember = await prisma.teamMember.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TeamMemberFindFirstArgs>(args?: SelectSubset<T, TeamMemberFindFirstArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TeamMember that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberFindFirstOrThrowArgs} args - Arguments to find a TeamMember
     * @example
     * // Get one TeamMember
     * const teamMember = await prisma.teamMember.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TeamMemberFindFirstOrThrowArgs>(args?: SelectSubset<T, TeamMemberFindFirstOrThrowArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TeamMembers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TeamMembers
     * const teamMembers = await prisma.teamMember.findMany()
     * 
     * // Get first 10 TeamMembers
     * const teamMembers = await prisma.teamMember.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const teamMemberWithIdOnly = await prisma.teamMember.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TeamMemberFindManyArgs>(args?: SelectSubset<T, TeamMemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TeamMember.
     * @param {TeamMemberCreateArgs} args - Arguments to create a TeamMember.
     * @example
     * // Create one TeamMember
     * const TeamMember = await prisma.teamMember.create({
     *   data: {
     *     // ... data to create a TeamMember
     *   }
     * })
     * 
     */
    create<T extends TeamMemberCreateArgs>(args: SelectSubset<T, TeamMemberCreateArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TeamMembers.
     * @param {TeamMemberCreateManyArgs} args - Arguments to create many TeamMembers.
     * @example
     * // Create many TeamMembers
     * const teamMember = await prisma.teamMember.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TeamMemberCreateManyArgs>(args?: SelectSubset<T, TeamMemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a TeamMember.
     * @param {TeamMemberDeleteArgs} args - Arguments to delete one TeamMember.
     * @example
     * // Delete one TeamMember
     * const TeamMember = await prisma.teamMember.delete({
     *   where: {
     *     // ... filter to delete one TeamMember
     *   }
     * })
     * 
     */
    delete<T extends TeamMemberDeleteArgs>(args: SelectSubset<T, TeamMemberDeleteArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TeamMember.
     * @param {TeamMemberUpdateArgs} args - Arguments to update one TeamMember.
     * @example
     * // Update one TeamMember
     * const teamMember = await prisma.teamMember.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TeamMemberUpdateArgs>(args: SelectSubset<T, TeamMemberUpdateArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TeamMembers.
     * @param {TeamMemberDeleteManyArgs} args - Arguments to filter TeamMembers to delete.
     * @example
     * // Delete a few TeamMembers
     * const { count } = await prisma.teamMember.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TeamMemberDeleteManyArgs>(args?: SelectSubset<T, TeamMemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TeamMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TeamMembers
     * const teamMember = await prisma.teamMember.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TeamMemberUpdateManyArgs>(args: SelectSubset<T, TeamMemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TeamMember.
     * @param {TeamMemberUpsertArgs} args - Arguments to update or create a TeamMember.
     * @example
     * // Update or create a TeamMember
     * const teamMember = await prisma.teamMember.upsert({
     *   create: {
     *     // ... data to create a TeamMember
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TeamMember we want to update
     *   }
     * })
     */
    upsert<T extends TeamMemberUpsertArgs>(args: SelectSubset<T, TeamMemberUpsertArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TeamMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberCountArgs} args - Arguments to filter TeamMembers to count.
     * @example
     * // Count the number of TeamMembers
     * const count = await prisma.teamMember.count({
     *   where: {
     *     // ... the filter for the TeamMembers we want to count
     *   }
     * })
    **/
    count<T extends TeamMemberCountArgs>(
      args?: Subset<T, TeamMemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TeamMemberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TeamMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TeamMemberAggregateArgs>(args: Subset<T, TeamMemberAggregateArgs>): Prisma.PrismaPromise<GetTeamMemberAggregateType<T>>

    /**
     * Group by TeamMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TeamMemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TeamMemberGroupByArgs['orderBy'] }
        : { orderBy?: TeamMemberGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TeamMemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeamMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TeamMember model
   */
  readonly fields: TeamMemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TeamMember.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TeamMemberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TeamMember model
   */
  interface TeamMemberFieldRefs {
    readonly id: FieldRef<"TeamMember", 'String'>
    readonly familyName: FieldRef<"TeamMember", 'String'>
    readonly givenNames: FieldRef<"TeamMember", 'String'>
    readonly nationality: FieldRef<"TeamMember", 'String'>
    readonly photoPath: FieldRef<"TeamMember", 'String'>
    readonly status: FieldRef<"TeamMember", 'TeamMemberStatus'>
    readonly startDate: FieldRef<"TeamMember", 'DateTime'>
    readonly endDate: FieldRef<"TeamMember", 'DateTime'>
    readonly department: FieldRef<"TeamMember", 'String'>
    readonly email: FieldRef<"TeamMember", 'String'>
    readonly phone: FieldRef<"TeamMember", 'String'>
    readonly homeAddress: FieldRef<"TeamMember", 'String'>
    readonly dateOfBirth: FieldRef<"TeamMember", 'DateTime'>
    readonly legalStatus: FieldRef<"TeamMember", 'String'>
    readonly createdAt: FieldRef<"TeamMember", 'DateTime'>
    readonly updatedAt: FieldRef<"TeamMember", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TeamMember findUnique
   */
  export type TeamMemberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * Filter, which TeamMember to fetch.
     */
    where: TeamMemberWhereUniqueInput
  }

  /**
   * TeamMember findUniqueOrThrow
   */
  export type TeamMemberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * Filter, which TeamMember to fetch.
     */
    where: TeamMemberWhereUniqueInput
  }

  /**
   * TeamMember findFirst
   */
  export type TeamMemberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * Filter, which TeamMember to fetch.
     */
    where?: TeamMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamMembers to fetch.
     */
    orderBy?: TeamMemberOrderByWithRelationInput | TeamMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TeamMembers.
     */
    cursor?: TeamMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TeamMembers.
     */
    distinct?: TeamMemberScalarFieldEnum | TeamMemberScalarFieldEnum[]
  }

  /**
   * TeamMember findFirstOrThrow
   */
  export type TeamMemberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * Filter, which TeamMember to fetch.
     */
    where?: TeamMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamMembers to fetch.
     */
    orderBy?: TeamMemberOrderByWithRelationInput | TeamMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TeamMembers.
     */
    cursor?: TeamMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TeamMembers.
     */
    distinct?: TeamMemberScalarFieldEnum | TeamMemberScalarFieldEnum[]
  }

  /**
   * TeamMember findMany
   */
  export type TeamMemberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * Filter, which TeamMembers to fetch.
     */
    where?: TeamMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamMembers to fetch.
     */
    orderBy?: TeamMemberOrderByWithRelationInput | TeamMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TeamMembers.
     */
    cursor?: TeamMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamMembers.
     */
    skip?: number
    distinct?: TeamMemberScalarFieldEnum | TeamMemberScalarFieldEnum[]
  }

  /**
   * TeamMember create
   */
  export type TeamMemberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * The data needed to create a TeamMember.
     */
    data: XOR<TeamMemberCreateInput, TeamMemberUncheckedCreateInput>
  }

  /**
   * TeamMember createMany
   */
  export type TeamMemberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TeamMembers.
     */
    data: TeamMemberCreateManyInput | TeamMemberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TeamMember update
   */
  export type TeamMemberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * The data needed to update a TeamMember.
     */
    data: XOR<TeamMemberUpdateInput, TeamMemberUncheckedUpdateInput>
    /**
     * Choose, which TeamMember to update.
     */
    where: TeamMemberWhereUniqueInput
  }

  /**
   * TeamMember updateMany
   */
  export type TeamMemberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TeamMembers.
     */
    data: XOR<TeamMemberUpdateManyMutationInput, TeamMemberUncheckedUpdateManyInput>
    /**
     * Filter which TeamMembers to update
     */
    where?: TeamMemberWhereInput
    /**
     * Limit how many TeamMembers to update.
     */
    limit?: number
  }

  /**
   * TeamMember upsert
   */
  export type TeamMemberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * The filter to search for the TeamMember to update in case it exists.
     */
    where: TeamMemberWhereUniqueInput
    /**
     * In case the TeamMember found by the `where` argument doesn't exist, create a new TeamMember with this data.
     */
    create: XOR<TeamMemberCreateInput, TeamMemberUncheckedCreateInput>
    /**
     * In case the TeamMember was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TeamMemberUpdateInput, TeamMemberUncheckedUpdateInput>
  }

  /**
   * TeamMember delete
   */
  export type TeamMemberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * Filter which TeamMember to delete.
     */
    where: TeamMemberWhereUniqueInput
  }

  /**
   * TeamMember deleteMany
   */
  export type TeamMemberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TeamMembers to delete
     */
    where?: TeamMemberWhereInput
    /**
     * Limit how many TeamMembers to delete.
     */
    limit?: number
  }

  /**
   * TeamMember without action
   */
  export type TeamMemberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
  }


  /**
   * Model ElectronicsRepair
   */

  export type AggregateElectronicsRepair = {
    _count: ElectronicsRepairCountAggregateOutputType | null
    _avg: ElectronicsRepairAvgAggregateOutputType | null
    _sum: ElectronicsRepairSumAggregateOutputType | null
    _min: ElectronicsRepairMinAggregateOutputType | null
    _max: ElectronicsRepairMaxAggregateOutputType | null
  }

  export type ElectronicsRepairAvgAggregateOutputType = {
    repairId: number | null
  }

  export type ElectronicsRepairSumAggregateOutputType = {
    repairId: number | null
  }

  export type ElectronicsRepairMinAggregateOutputType = {
    id: string | null
    repairId: number | null
    customerName: string | null
    category: $Enums.ElectronicsCategory | null
    item: string | null
    whatsapp: string | null
    serialNumber: string | null
    status: $Enums.ElectronicsRepairStatus | null
    repairable: boolean | null
    notes: string | null
    photoPath: string | null
    createdDate: Date | null
    repairerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ElectronicsRepairMaxAggregateOutputType = {
    id: string | null
    repairId: number | null
    customerName: string | null
    category: $Enums.ElectronicsCategory | null
    item: string | null
    whatsapp: string | null
    serialNumber: string | null
    status: $Enums.ElectronicsRepairStatus | null
    repairable: boolean | null
    notes: string | null
    photoPath: string | null
    createdDate: Date | null
    repairerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ElectronicsRepairCountAggregateOutputType = {
    id: number
    repairId: number
    customerName: number
    category: number
    item: number
    whatsapp: number
    serialNumber: number
    status: number
    repairable: number
    notes: number
    photoPath: number
    createdDate: number
    repairerId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ElectronicsRepairAvgAggregateInputType = {
    repairId?: true
  }

  export type ElectronicsRepairSumAggregateInputType = {
    repairId?: true
  }

  export type ElectronicsRepairMinAggregateInputType = {
    id?: true
    repairId?: true
    customerName?: true
    category?: true
    item?: true
    whatsapp?: true
    serialNumber?: true
    status?: true
    repairable?: true
    notes?: true
    photoPath?: true
    createdDate?: true
    repairerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ElectronicsRepairMaxAggregateInputType = {
    id?: true
    repairId?: true
    customerName?: true
    category?: true
    item?: true
    whatsapp?: true
    serialNumber?: true
    status?: true
    repairable?: true
    notes?: true
    photoPath?: true
    createdDate?: true
    repairerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ElectronicsRepairCountAggregateInputType = {
    id?: true
    repairId?: true
    customerName?: true
    category?: true
    item?: true
    whatsapp?: true
    serialNumber?: true
    status?: true
    repairable?: true
    notes?: true
    photoPath?: true
    createdDate?: true
    repairerId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ElectronicsRepairAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ElectronicsRepair to aggregate.
     */
    where?: ElectronicsRepairWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ElectronicsRepairs to fetch.
     */
    orderBy?: ElectronicsRepairOrderByWithRelationInput | ElectronicsRepairOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ElectronicsRepairWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ElectronicsRepairs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ElectronicsRepairs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ElectronicsRepairs
    **/
    _count?: true | ElectronicsRepairCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ElectronicsRepairAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ElectronicsRepairSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ElectronicsRepairMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ElectronicsRepairMaxAggregateInputType
  }

  export type GetElectronicsRepairAggregateType<T extends ElectronicsRepairAggregateArgs> = {
        [P in keyof T & keyof AggregateElectronicsRepair]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateElectronicsRepair[P]>
      : GetScalarType<T[P], AggregateElectronicsRepair[P]>
  }




  export type ElectronicsRepairGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ElectronicsRepairWhereInput
    orderBy?: ElectronicsRepairOrderByWithAggregationInput | ElectronicsRepairOrderByWithAggregationInput[]
    by: ElectronicsRepairScalarFieldEnum[] | ElectronicsRepairScalarFieldEnum
    having?: ElectronicsRepairScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ElectronicsRepairCountAggregateInputType | true
    _avg?: ElectronicsRepairAvgAggregateInputType
    _sum?: ElectronicsRepairSumAggregateInputType
    _min?: ElectronicsRepairMinAggregateInputType
    _max?: ElectronicsRepairMaxAggregateInputType
  }

  export type ElectronicsRepairGroupByOutputType = {
    id: string
    repairId: number
    customerName: string
    category: $Enums.ElectronicsCategory
    item: string | null
    whatsapp: string | null
    serialNumber: string | null
    status: $Enums.ElectronicsRepairStatus
    repairable: boolean | null
    notes: string | null
    photoPath: string | null
    createdDate: Date
    repairerId: string | null
    createdAt: Date
    updatedAt: Date
    _count: ElectronicsRepairCountAggregateOutputType | null
    _avg: ElectronicsRepairAvgAggregateOutputType | null
    _sum: ElectronicsRepairSumAggregateOutputType | null
    _min: ElectronicsRepairMinAggregateOutputType | null
    _max: ElectronicsRepairMaxAggregateOutputType | null
  }

  type GetElectronicsRepairGroupByPayload<T extends ElectronicsRepairGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ElectronicsRepairGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ElectronicsRepairGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ElectronicsRepairGroupByOutputType[P]>
            : GetScalarType<T[P], ElectronicsRepairGroupByOutputType[P]>
        }
      >
    >


  export type ElectronicsRepairSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    repairId?: boolean
    customerName?: boolean
    category?: boolean
    item?: boolean
    whatsapp?: boolean
    serialNumber?: boolean
    status?: boolean
    repairable?: boolean
    notes?: boolean
    photoPath?: boolean
    createdDate?: boolean
    repairerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    repairer?: boolean | ElectronicsRepair$repairerArgs<ExtArgs>
  }, ExtArgs["result"]["electronicsRepair"]>



  export type ElectronicsRepairSelectScalar = {
    id?: boolean
    repairId?: boolean
    customerName?: boolean
    category?: boolean
    item?: boolean
    whatsapp?: boolean
    serialNumber?: boolean
    status?: boolean
    repairable?: boolean
    notes?: boolean
    photoPath?: boolean
    createdDate?: boolean
    repairerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ElectronicsRepairOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "repairId" | "customerName" | "category" | "item" | "whatsapp" | "serialNumber" | "status" | "repairable" | "notes" | "photoPath" | "createdDate" | "repairerId" | "createdAt" | "updatedAt", ExtArgs["result"]["electronicsRepair"]>
  export type ElectronicsRepairInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repairer?: boolean | ElectronicsRepair$repairerArgs<ExtArgs>
  }

  export type $ElectronicsRepairPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ElectronicsRepair"
    objects: {
      repairer: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      repairId: number
      customerName: string
      category: $Enums.ElectronicsCategory
      item: string | null
      whatsapp: string | null
      serialNumber: string | null
      status: $Enums.ElectronicsRepairStatus
      repairable: boolean | null
      notes: string | null
      photoPath: string | null
      createdDate: Date
      repairerId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["electronicsRepair"]>
    composites: {}
  }

  type ElectronicsRepairGetPayload<S extends boolean | null | undefined | ElectronicsRepairDefaultArgs> = $Result.GetResult<Prisma.$ElectronicsRepairPayload, S>

  type ElectronicsRepairCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ElectronicsRepairFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ElectronicsRepairCountAggregateInputType | true
    }

  export interface ElectronicsRepairDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ElectronicsRepair'], meta: { name: 'ElectronicsRepair' } }
    /**
     * Find zero or one ElectronicsRepair that matches the filter.
     * @param {ElectronicsRepairFindUniqueArgs} args - Arguments to find a ElectronicsRepair
     * @example
     * // Get one ElectronicsRepair
     * const electronicsRepair = await prisma.electronicsRepair.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ElectronicsRepairFindUniqueArgs>(args: SelectSubset<T, ElectronicsRepairFindUniqueArgs<ExtArgs>>): Prisma__ElectronicsRepairClient<$Result.GetResult<Prisma.$ElectronicsRepairPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ElectronicsRepair that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ElectronicsRepairFindUniqueOrThrowArgs} args - Arguments to find a ElectronicsRepair
     * @example
     * // Get one ElectronicsRepair
     * const electronicsRepair = await prisma.electronicsRepair.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ElectronicsRepairFindUniqueOrThrowArgs>(args: SelectSubset<T, ElectronicsRepairFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ElectronicsRepairClient<$Result.GetResult<Prisma.$ElectronicsRepairPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ElectronicsRepair that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElectronicsRepairFindFirstArgs} args - Arguments to find a ElectronicsRepair
     * @example
     * // Get one ElectronicsRepair
     * const electronicsRepair = await prisma.electronicsRepair.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ElectronicsRepairFindFirstArgs>(args?: SelectSubset<T, ElectronicsRepairFindFirstArgs<ExtArgs>>): Prisma__ElectronicsRepairClient<$Result.GetResult<Prisma.$ElectronicsRepairPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ElectronicsRepair that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElectronicsRepairFindFirstOrThrowArgs} args - Arguments to find a ElectronicsRepair
     * @example
     * // Get one ElectronicsRepair
     * const electronicsRepair = await prisma.electronicsRepair.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ElectronicsRepairFindFirstOrThrowArgs>(args?: SelectSubset<T, ElectronicsRepairFindFirstOrThrowArgs<ExtArgs>>): Prisma__ElectronicsRepairClient<$Result.GetResult<Prisma.$ElectronicsRepairPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ElectronicsRepairs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElectronicsRepairFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ElectronicsRepairs
     * const electronicsRepairs = await prisma.electronicsRepair.findMany()
     * 
     * // Get first 10 ElectronicsRepairs
     * const electronicsRepairs = await prisma.electronicsRepair.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const electronicsRepairWithIdOnly = await prisma.electronicsRepair.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ElectronicsRepairFindManyArgs>(args?: SelectSubset<T, ElectronicsRepairFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ElectronicsRepairPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ElectronicsRepair.
     * @param {ElectronicsRepairCreateArgs} args - Arguments to create a ElectronicsRepair.
     * @example
     * // Create one ElectronicsRepair
     * const ElectronicsRepair = await prisma.electronicsRepair.create({
     *   data: {
     *     // ... data to create a ElectronicsRepair
     *   }
     * })
     * 
     */
    create<T extends ElectronicsRepairCreateArgs>(args: SelectSubset<T, ElectronicsRepairCreateArgs<ExtArgs>>): Prisma__ElectronicsRepairClient<$Result.GetResult<Prisma.$ElectronicsRepairPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ElectronicsRepairs.
     * @param {ElectronicsRepairCreateManyArgs} args - Arguments to create many ElectronicsRepairs.
     * @example
     * // Create many ElectronicsRepairs
     * const electronicsRepair = await prisma.electronicsRepair.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ElectronicsRepairCreateManyArgs>(args?: SelectSubset<T, ElectronicsRepairCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ElectronicsRepair.
     * @param {ElectronicsRepairDeleteArgs} args - Arguments to delete one ElectronicsRepair.
     * @example
     * // Delete one ElectronicsRepair
     * const ElectronicsRepair = await prisma.electronicsRepair.delete({
     *   where: {
     *     // ... filter to delete one ElectronicsRepair
     *   }
     * })
     * 
     */
    delete<T extends ElectronicsRepairDeleteArgs>(args: SelectSubset<T, ElectronicsRepairDeleteArgs<ExtArgs>>): Prisma__ElectronicsRepairClient<$Result.GetResult<Prisma.$ElectronicsRepairPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ElectronicsRepair.
     * @param {ElectronicsRepairUpdateArgs} args - Arguments to update one ElectronicsRepair.
     * @example
     * // Update one ElectronicsRepair
     * const electronicsRepair = await prisma.electronicsRepair.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ElectronicsRepairUpdateArgs>(args: SelectSubset<T, ElectronicsRepairUpdateArgs<ExtArgs>>): Prisma__ElectronicsRepairClient<$Result.GetResult<Prisma.$ElectronicsRepairPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ElectronicsRepairs.
     * @param {ElectronicsRepairDeleteManyArgs} args - Arguments to filter ElectronicsRepairs to delete.
     * @example
     * // Delete a few ElectronicsRepairs
     * const { count } = await prisma.electronicsRepair.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ElectronicsRepairDeleteManyArgs>(args?: SelectSubset<T, ElectronicsRepairDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ElectronicsRepairs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElectronicsRepairUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ElectronicsRepairs
     * const electronicsRepair = await prisma.electronicsRepair.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ElectronicsRepairUpdateManyArgs>(args: SelectSubset<T, ElectronicsRepairUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ElectronicsRepair.
     * @param {ElectronicsRepairUpsertArgs} args - Arguments to update or create a ElectronicsRepair.
     * @example
     * // Update or create a ElectronicsRepair
     * const electronicsRepair = await prisma.electronicsRepair.upsert({
     *   create: {
     *     // ... data to create a ElectronicsRepair
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ElectronicsRepair we want to update
     *   }
     * })
     */
    upsert<T extends ElectronicsRepairUpsertArgs>(args: SelectSubset<T, ElectronicsRepairUpsertArgs<ExtArgs>>): Prisma__ElectronicsRepairClient<$Result.GetResult<Prisma.$ElectronicsRepairPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ElectronicsRepairs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElectronicsRepairCountArgs} args - Arguments to filter ElectronicsRepairs to count.
     * @example
     * // Count the number of ElectronicsRepairs
     * const count = await prisma.electronicsRepair.count({
     *   where: {
     *     // ... the filter for the ElectronicsRepairs we want to count
     *   }
     * })
    **/
    count<T extends ElectronicsRepairCountArgs>(
      args?: Subset<T, ElectronicsRepairCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ElectronicsRepairCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ElectronicsRepair.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElectronicsRepairAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ElectronicsRepairAggregateArgs>(args: Subset<T, ElectronicsRepairAggregateArgs>): Prisma.PrismaPromise<GetElectronicsRepairAggregateType<T>>

    /**
     * Group by ElectronicsRepair.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElectronicsRepairGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ElectronicsRepairGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ElectronicsRepairGroupByArgs['orderBy'] }
        : { orderBy?: ElectronicsRepairGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ElectronicsRepairGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetElectronicsRepairGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ElectronicsRepair model
   */
  readonly fields: ElectronicsRepairFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ElectronicsRepair.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ElectronicsRepairClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    repairer<T extends ElectronicsRepair$repairerArgs<ExtArgs> = {}>(args?: Subset<T, ElectronicsRepair$repairerArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ElectronicsRepair model
   */
  interface ElectronicsRepairFieldRefs {
    readonly id: FieldRef<"ElectronicsRepair", 'String'>
    readonly repairId: FieldRef<"ElectronicsRepair", 'Int'>
    readonly customerName: FieldRef<"ElectronicsRepair", 'String'>
    readonly category: FieldRef<"ElectronicsRepair", 'ElectronicsCategory'>
    readonly item: FieldRef<"ElectronicsRepair", 'String'>
    readonly whatsapp: FieldRef<"ElectronicsRepair", 'String'>
    readonly serialNumber: FieldRef<"ElectronicsRepair", 'String'>
    readonly status: FieldRef<"ElectronicsRepair", 'ElectronicsRepairStatus'>
    readonly repairable: FieldRef<"ElectronicsRepair", 'Boolean'>
    readonly notes: FieldRef<"ElectronicsRepair", 'String'>
    readonly photoPath: FieldRef<"ElectronicsRepair", 'String'>
    readonly createdDate: FieldRef<"ElectronicsRepair", 'DateTime'>
    readonly repairerId: FieldRef<"ElectronicsRepair", 'String'>
    readonly createdAt: FieldRef<"ElectronicsRepair", 'DateTime'>
    readonly updatedAt: FieldRef<"ElectronicsRepair", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ElectronicsRepair findUnique
   */
  export type ElectronicsRepairFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElectronicsRepair
     */
    select?: ElectronicsRepairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElectronicsRepair
     */
    omit?: ElectronicsRepairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElectronicsRepairInclude<ExtArgs> | null
    /**
     * Filter, which ElectronicsRepair to fetch.
     */
    where: ElectronicsRepairWhereUniqueInput
  }

  /**
   * ElectronicsRepair findUniqueOrThrow
   */
  export type ElectronicsRepairFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElectronicsRepair
     */
    select?: ElectronicsRepairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElectronicsRepair
     */
    omit?: ElectronicsRepairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElectronicsRepairInclude<ExtArgs> | null
    /**
     * Filter, which ElectronicsRepair to fetch.
     */
    where: ElectronicsRepairWhereUniqueInput
  }

  /**
   * ElectronicsRepair findFirst
   */
  export type ElectronicsRepairFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElectronicsRepair
     */
    select?: ElectronicsRepairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElectronicsRepair
     */
    omit?: ElectronicsRepairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElectronicsRepairInclude<ExtArgs> | null
    /**
     * Filter, which ElectronicsRepair to fetch.
     */
    where?: ElectronicsRepairWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ElectronicsRepairs to fetch.
     */
    orderBy?: ElectronicsRepairOrderByWithRelationInput | ElectronicsRepairOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ElectronicsRepairs.
     */
    cursor?: ElectronicsRepairWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ElectronicsRepairs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ElectronicsRepairs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ElectronicsRepairs.
     */
    distinct?: ElectronicsRepairScalarFieldEnum | ElectronicsRepairScalarFieldEnum[]
  }

  /**
   * ElectronicsRepair findFirstOrThrow
   */
  export type ElectronicsRepairFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElectronicsRepair
     */
    select?: ElectronicsRepairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElectronicsRepair
     */
    omit?: ElectronicsRepairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElectronicsRepairInclude<ExtArgs> | null
    /**
     * Filter, which ElectronicsRepair to fetch.
     */
    where?: ElectronicsRepairWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ElectronicsRepairs to fetch.
     */
    orderBy?: ElectronicsRepairOrderByWithRelationInput | ElectronicsRepairOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ElectronicsRepairs.
     */
    cursor?: ElectronicsRepairWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ElectronicsRepairs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ElectronicsRepairs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ElectronicsRepairs.
     */
    distinct?: ElectronicsRepairScalarFieldEnum | ElectronicsRepairScalarFieldEnum[]
  }

  /**
   * ElectronicsRepair findMany
   */
  export type ElectronicsRepairFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElectronicsRepair
     */
    select?: ElectronicsRepairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElectronicsRepair
     */
    omit?: ElectronicsRepairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElectronicsRepairInclude<ExtArgs> | null
    /**
     * Filter, which ElectronicsRepairs to fetch.
     */
    where?: ElectronicsRepairWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ElectronicsRepairs to fetch.
     */
    orderBy?: ElectronicsRepairOrderByWithRelationInput | ElectronicsRepairOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ElectronicsRepairs.
     */
    cursor?: ElectronicsRepairWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ElectronicsRepairs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ElectronicsRepairs.
     */
    skip?: number
    distinct?: ElectronicsRepairScalarFieldEnum | ElectronicsRepairScalarFieldEnum[]
  }

  /**
   * ElectronicsRepair create
   */
  export type ElectronicsRepairCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElectronicsRepair
     */
    select?: ElectronicsRepairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElectronicsRepair
     */
    omit?: ElectronicsRepairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElectronicsRepairInclude<ExtArgs> | null
    /**
     * The data needed to create a ElectronicsRepair.
     */
    data: XOR<ElectronicsRepairCreateInput, ElectronicsRepairUncheckedCreateInput>
  }

  /**
   * ElectronicsRepair createMany
   */
  export type ElectronicsRepairCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ElectronicsRepairs.
     */
    data: ElectronicsRepairCreateManyInput | ElectronicsRepairCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ElectronicsRepair update
   */
  export type ElectronicsRepairUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElectronicsRepair
     */
    select?: ElectronicsRepairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElectronicsRepair
     */
    omit?: ElectronicsRepairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElectronicsRepairInclude<ExtArgs> | null
    /**
     * The data needed to update a ElectronicsRepair.
     */
    data: XOR<ElectronicsRepairUpdateInput, ElectronicsRepairUncheckedUpdateInput>
    /**
     * Choose, which ElectronicsRepair to update.
     */
    where: ElectronicsRepairWhereUniqueInput
  }

  /**
   * ElectronicsRepair updateMany
   */
  export type ElectronicsRepairUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ElectronicsRepairs.
     */
    data: XOR<ElectronicsRepairUpdateManyMutationInput, ElectronicsRepairUncheckedUpdateManyInput>
    /**
     * Filter which ElectronicsRepairs to update
     */
    where?: ElectronicsRepairWhereInput
    /**
     * Limit how many ElectronicsRepairs to update.
     */
    limit?: number
  }

  /**
   * ElectronicsRepair upsert
   */
  export type ElectronicsRepairUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElectronicsRepair
     */
    select?: ElectronicsRepairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElectronicsRepair
     */
    omit?: ElectronicsRepairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElectronicsRepairInclude<ExtArgs> | null
    /**
     * The filter to search for the ElectronicsRepair to update in case it exists.
     */
    where: ElectronicsRepairWhereUniqueInput
    /**
     * In case the ElectronicsRepair found by the `where` argument doesn't exist, create a new ElectronicsRepair with this data.
     */
    create: XOR<ElectronicsRepairCreateInput, ElectronicsRepairUncheckedCreateInput>
    /**
     * In case the ElectronicsRepair was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ElectronicsRepairUpdateInput, ElectronicsRepairUncheckedUpdateInput>
  }

  /**
   * ElectronicsRepair delete
   */
  export type ElectronicsRepairDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElectronicsRepair
     */
    select?: ElectronicsRepairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElectronicsRepair
     */
    omit?: ElectronicsRepairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElectronicsRepairInclude<ExtArgs> | null
    /**
     * Filter which ElectronicsRepair to delete.
     */
    where: ElectronicsRepairWhereUniqueInput
  }

  /**
   * ElectronicsRepair deleteMany
   */
  export type ElectronicsRepairDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ElectronicsRepairs to delete
     */
    where?: ElectronicsRepairWhereInput
    /**
     * Limit how many ElectronicsRepairs to delete.
     */
    limit?: number
  }

  /**
   * ElectronicsRepair.repairer
   */
  export type ElectronicsRepair$repairerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * ElectronicsRepair without action
   */
  export type ElectronicsRepairDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElectronicsRepair
     */
    select?: ElectronicsRepairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElectronicsRepair
     */
    omit?: ElectronicsRepairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElectronicsRepairInclude<ExtArgs> | null
  }


  /**
   * Model CarpentryProject
   */

  export type AggregateCarpentryProject = {
    _count: CarpentryProjectCountAggregateOutputType | null
    _avg: CarpentryProjectAvgAggregateOutputType | null
    _sum: CarpentryProjectSumAggregateOutputType | null
    _min: CarpentryProjectMinAggregateOutputType | null
    _max: CarpentryProjectMaxAggregateOutputType | null
  }

  export type CarpentryProjectAvgAggregateOutputType = {
    timeNeeded: number | null
    materialCosts: Decimal | null
  }

  export type CarpentryProjectSumAggregateOutputType = {
    timeNeeded: number | null
    materialCosts: Decimal | null
  }

  export type CarpentryProjectMinAggregateOutputType = {
    id: string | null
    date: Date | null
    acceptedBy: string | null
    customerType: $Enums.CarpentryCustomerType | null
    organizationName: string | null
    customerName: string | null
    phoneNumber: string | null
    gender: $Enums.CarpentryGender | null
    orderType: $Enums.CarpentryOrderType | null
    timeNeeded: number | null
    itemToRepair: string | null
    problemDescription: string | null
    projectDescription: string | null
    materialCosts: Decimal | null
    paidByCustomer: boolean | null
    photoPath: string | null
    assignedToId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CarpentryProjectMaxAggregateOutputType = {
    id: string | null
    date: Date | null
    acceptedBy: string | null
    customerType: $Enums.CarpentryCustomerType | null
    organizationName: string | null
    customerName: string | null
    phoneNumber: string | null
    gender: $Enums.CarpentryGender | null
    orderType: $Enums.CarpentryOrderType | null
    timeNeeded: number | null
    itemToRepair: string | null
    problemDescription: string | null
    projectDescription: string | null
    materialCosts: Decimal | null
    paidByCustomer: boolean | null
    photoPath: string | null
    assignedToId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CarpentryProjectCountAggregateOutputType = {
    id: number
    date: number
    acceptedBy: number
    customerType: number
    organizationName: number
    customerName: number
    phoneNumber: number
    gender: number
    orderType: number
    timeNeeded: number
    itemToRepair: number
    problemDescription: number
    projectDescription: number
    materialCosts: number
    paidByCustomer: number
    photoPath: number
    assignedToId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CarpentryProjectAvgAggregateInputType = {
    timeNeeded?: true
    materialCosts?: true
  }

  export type CarpentryProjectSumAggregateInputType = {
    timeNeeded?: true
    materialCosts?: true
  }

  export type CarpentryProjectMinAggregateInputType = {
    id?: true
    date?: true
    acceptedBy?: true
    customerType?: true
    organizationName?: true
    customerName?: true
    phoneNumber?: true
    gender?: true
    orderType?: true
    timeNeeded?: true
    itemToRepair?: true
    problemDescription?: true
    projectDescription?: true
    materialCosts?: true
    paidByCustomer?: true
    photoPath?: true
    assignedToId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CarpentryProjectMaxAggregateInputType = {
    id?: true
    date?: true
    acceptedBy?: true
    customerType?: true
    organizationName?: true
    customerName?: true
    phoneNumber?: true
    gender?: true
    orderType?: true
    timeNeeded?: true
    itemToRepair?: true
    problemDescription?: true
    projectDescription?: true
    materialCosts?: true
    paidByCustomer?: true
    photoPath?: true
    assignedToId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CarpentryProjectCountAggregateInputType = {
    id?: true
    date?: true
    acceptedBy?: true
    customerType?: true
    organizationName?: true
    customerName?: true
    phoneNumber?: true
    gender?: true
    orderType?: true
    timeNeeded?: true
    itemToRepair?: true
    problemDescription?: true
    projectDescription?: true
    materialCosts?: true
    paidByCustomer?: true
    photoPath?: true
    assignedToId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CarpentryProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CarpentryProject to aggregate.
     */
    where?: CarpentryProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CarpentryProjects to fetch.
     */
    orderBy?: CarpentryProjectOrderByWithRelationInput | CarpentryProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CarpentryProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CarpentryProjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CarpentryProjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CarpentryProjects
    **/
    _count?: true | CarpentryProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CarpentryProjectAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CarpentryProjectSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CarpentryProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CarpentryProjectMaxAggregateInputType
  }

  export type GetCarpentryProjectAggregateType<T extends CarpentryProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateCarpentryProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCarpentryProject[P]>
      : GetScalarType<T[P], AggregateCarpentryProject[P]>
  }




  export type CarpentryProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CarpentryProjectWhereInput
    orderBy?: CarpentryProjectOrderByWithAggregationInput | CarpentryProjectOrderByWithAggregationInput[]
    by: CarpentryProjectScalarFieldEnum[] | CarpentryProjectScalarFieldEnum
    having?: CarpentryProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CarpentryProjectCountAggregateInputType | true
    _avg?: CarpentryProjectAvgAggregateInputType
    _sum?: CarpentryProjectSumAggregateInputType
    _min?: CarpentryProjectMinAggregateInputType
    _max?: CarpentryProjectMaxAggregateInputType
  }

  export type CarpentryProjectGroupByOutputType = {
    id: string
    date: Date
    acceptedBy: string | null
    customerType: $Enums.CarpentryCustomerType | null
    organizationName: string | null
    customerName: string | null
    phoneNumber: string | null
    gender: $Enums.CarpentryGender | null
    orderType: $Enums.CarpentryOrderType | null
    timeNeeded: number | null
    itemToRepair: string | null
    problemDescription: string | null
    projectDescription: string | null
    materialCosts: Decimal | null
    paidByCustomer: boolean | null
    photoPath: string | null
    assignedToId: string | null
    createdAt: Date
    updatedAt: Date
    _count: CarpentryProjectCountAggregateOutputType | null
    _avg: CarpentryProjectAvgAggregateOutputType | null
    _sum: CarpentryProjectSumAggregateOutputType | null
    _min: CarpentryProjectMinAggregateOutputType | null
    _max: CarpentryProjectMaxAggregateOutputType | null
  }

  type GetCarpentryProjectGroupByPayload<T extends CarpentryProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CarpentryProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CarpentryProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CarpentryProjectGroupByOutputType[P]>
            : GetScalarType<T[P], CarpentryProjectGroupByOutputType[P]>
        }
      >
    >


  export type CarpentryProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    acceptedBy?: boolean
    customerType?: boolean
    organizationName?: boolean
    customerName?: boolean
    phoneNumber?: boolean
    gender?: boolean
    orderType?: boolean
    timeNeeded?: boolean
    itemToRepair?: boolean
    problemDescription?: boolean
    projectDescription?: boolean
    materialCosts?: boolean
    paidByCustomer?: boolean
    photoPath?: boolean
    assignedToId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    assignedTo?: boolean | CarpentryProject$assignedToArgs<ExtArgs>
  }, ExtArgs["result"]["carpentryProject"]>



  export type CarpentryProjectSelectScalar = {
    id?: boolean
    date?: boolean
    acceptedBy?: boolean
    customerType?: boolean
    organizationName?: boolean
    customerName?: boolean
    phoneNumber?: boolean
    gender?: boolean
    orderType?: boolean
    timeNeeded?: boolean
    itemToRepair?: boolean
    problemDescription?: boolean
    projectDescription?: boolean
    materialCosts?: boolean
    paidByCustomer?: boolean
    photoPath?: boolean
    assignedToId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CarpentryProjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "date" | "acceptedBy" | "customerType" | "organizationName" | "customerName" | "phoneNumber" | "gender" | "orderType" | "timeNeeded" | "itemToRepair" | "problemDescription" | "projectDescription" | "materialCosts" | "paidByCustomer" | "photoPath" | "assignedToId" | "createdAt" | "updatedAt", ExtArgs["result"]["carpentryProject"]>
  export type CarpentryProjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignedTo?: boolean | CarpentryProject$assignedToArgs<ExtArgs>
  }

  export type $CarpentryProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CarpentryProject"
    objects: {
      assignedTo: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      date: Date
      acceptedBy: string | null
      customerType: $Enums.CarpentryCustomerType | null
      organizationName: string | null
      customerName: string | null
      phoneNumber: string | null
      gender: $Enums.CarpentryGender | null
      orderType: $Enums.CarpentryOrderType | null
      timeNeeded: number | null
      itemToRepair: string | null
      problemDescription: string | null
      projectDescription: string | null
      materialCosts: Prisma.Decimal | null
      paidByCustomer: boolean | null
      photoPath: string | null
      assignedToId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["carpentryProject"]>
    composites: {}
  }

  type CarpentryProjectGetPayload<S extends boolean | null | undefined | CarpentryProjectDefaultArgs> = $Result.GetResult<Prisma.$CarpentryProjectPayload, S>

  type CarpentryProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CarpentryProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CarpentryProjectCountAggregateInputType | true
    }

  export interface CarpentryProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CarpentryProject'], meta: { name: 'CarpentryProject' } }
    /**
     * Find zero or one CarpentryProject that matches the filter.
     * @param {CarpentryProjectFindUniqueArgs} args - Arguments to find a CarpentryProject
     * @example
     * // Get one CarpentryProject
     * const carpentryProject = await prisma.carpentryProject.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CarpentryProjectFindUniqueArgs>(args: SelectSubset<T, CarpentryProjectFindUniqueArgs<ExtArgs>>): Prisma__CarpentryProjectClient<$Result.GetResult<Prisma.$CarpentryProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CarpentryProject that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CarpentryProjectFindUniqueOrThrowArgs} args - Arguments to find a CarpentryProject
     * @example
     * // Get one CarpentryProject
     * const carpentryProject = await prisma.carpentryProject.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CarpentryProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, CarpentryProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CarpentryProjectClient<$Result.GetResult<Prisma.$CarpentryProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CarpentryProject that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarpentryProjectFindFirstArgs} args - Arguments to find a CarpentryProject
     * @example
     * // Get one CarpentryProject
     * const carpentryProject = await prisma.carpentryProject.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CarpentryProjectFindFirstArgs>(args?: SelectSubset<T, CarpentryProjectFindFirstArgs<ExtArgs>>): Prisma__CarpentryProjectClient<$Result.GetResult<Prisma.$CarpentryProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CarpentryProject that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarpentryProjectFindFirstOrThrowArgs} args - Arguments to find a CarpentryProject
     * @example
     * // Get one CarpentryProject
     * const carpentryProject = await prisma.carpentryProject.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CarpentryProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, CarpentryProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__CarpentryProjectClient<$Result.GetResult<Prisma.$CarpentryProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CarpentryProjects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarpentryProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CarpentryProjects
     * const carpentryProjects = await prisma.carpentryProject.findMany()
     * 
     * // Get first 10 CarpentryProjects
     * const carpentryProjects = await prisma.carpentryProject.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const carpentryProjectWithIdOnly = await prisma.carpentryProject.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CarpentryProjectFindManyArgs>(args?: SelectSubset<T, CarpentryProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CarpentryProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CarpentryProject.
     * @param {CarpentryProjectCreateArgs} args - Arguments to create a CarpentryProject.
     * @example
     * // Create one CarpentryProject
     * const CarpentryProject = await prisma.carpentryProject.create({
     *   data: {
     *     // ... data to create a CarpentryProject
     *   }
     * })
     * 
     */
    create<T extends CarpentryProjectCreateArgs>(args: SelectSubset<T, CarpentryProjectCreateArgs<ExtArgs>>): Prisma__CarpentryProjectClient<$Result.GetResult<Prisma.$CarpentryProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CarpentryProjects.
     * @param {CarpentryProjectCreateManyArgs} args - Arguments to create many CarpentryProjects.
     * @example
     * // Create many CarpentryProjects
     * const carpentryProject = await prisma.carpentryProject.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CarpentryProjectCreateManyArgs>(args?: SelectSubset<T, CarpentryProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a CarpentryProject.
     * @param {CarpentryProjectDeleteArgs} args - Arguments to delete one CarpentryProject.
     * @example
     * // Delete one CarpentryProject
     * const CarpentryProject = await prisma.carpentryProject.delete({
     *   where: {
     *     // ... filter to delete one CarpentryProject
     *   }
     * })
     * 
     */
    delete<T extends CarpentryProjectDeleteArgs>(args: SelectSubset<T, CarpentryProjectDeleteArgs<ExtArgs>>): Prisma__CarpentryProjectClient<$Result.GetResult<Prisma.$CarpentryProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CarpentryProject.
     * @param {CarpentryProjectUpdateArgs} args - Arguments to update one CarpentryProject.
     * @example
     * // Update one CarpentryProject
     * const carpentryProject = await prisma.carpentryProject.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CarpentryProjectUpdateArgs>(args: SelectSubset<T, CarpentryProjectUpdateArgs<ExtArgs>>): Prisma__CarpentryProjectClient<$Result.GetResult<Prisma.$CarpentryProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CarpentryProjects.
     * @param {CarpentryProjectDeleteManyArgs} args - Arguments to filter CarpentryProjects to delete.
     * @example
     * // Delete a few CarpentryProjects
     * const { count } = await prisma.carpentryProject.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CarpentryProjectDeleteManyArgs>(args?: SelectSubset<T, CarpentryProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CarpentryProjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarpentryProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CarpentryProjects
     * const carpentryProject = await prisma.carpentryProject.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CarpentryProjectUpdateManyArgs>(args: SelectSubset<T, CarpentryProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CarpentryProject.
     * @param {CarpentryProjectUpsertArgs} args - Arguments to update or create a CarpentryProject.
     * @example
     * // Update or create a CarpentryProject
     * const carpentryProject = await prisma.carpentryProject.upsert({
     *   create: {
     *     // ... data to create a CarpentryProject
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CarpentryProject we want to update
     *   }
     * })
     */
    upsert<T extends CarpentryProjectUpsertArgs>(args: SelectSubset<T, CarpentryProjectUpsertArgs<ExtArgs>>): Prisma__CarpentryProjectClient<$Result.GetResult<Prisma.$CarpentryProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CarpentryProjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarpentryProjectCountArgs} args - Arguments to filter CarpentryProjects to count.
     * @example
     * // Count the number of CarpentryProjects
     * const count = await prisma.carpentryProject.count({
     *   where: {
     *     // ... the filter for the CarpentryProjects we want to count
     *   }
     * })
    **/
    count<T extends CarpentryProjectCountArgs>(
      args?: Subset<T, CarpentryProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CarpentryProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CarpentryProject.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarpentryProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CarpentryProjectAggregateArgs>(args: Subset<T, CarpentryProjectAggregateArgs>): Prisma.PrismaPromise<GetCarpentryProjectAggregateType<T>>

    /**
     * Group by CarpentryProject.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarpentryProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CarpentryProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CarpentryProjectGroupByArgs['orderBy'] }
        : { orderBy?: CarpentryProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CarpentryProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCarpentryProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CarpentryProject model
   */
  readonly fields: CarpentryProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CarpentryProject.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CarpentryProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    assignedTo<T extends CarpentryProject$assignedToArgs<ExtArgs> = {}>(args?: Subset<T, CarpentryProject$assignedToArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CarpentryProject model
   */
  interface CarpentryProjectFieldRefs {
    readonly id: FieldRef<"CarpentryProject", 'String'>
    readonly date: FieldRef<"CarpentryProject", 'DateTime'>
    readonly acceptedBy: FieldRef<"CarpentryProject", 'String'>
    readonly customerType: FieldRef<"CarpentryProject", 'CarpentryCustomerType'>
    readonly organizationName: FieldRef<"CarpentryProject", 'String'>
    readonly customerName: FieldRef<"CarpentryProject", 'String'>
    readonly phoneNumber: FieldRef<"CarpentryProject", 'String'>
    readonly gender: FieldRef<"CarpentryProject", 'CarpentryGender'>
    readonly orderType: FieldRef<"CarpentryProject", 'CarpentryOrderType'>
    readonly timeNeeded: FieldRef<"CarpentryProject", 'Int'>
    readonly itemToRepair: FieldRef<"CarpentryProject", 'String'>
    readonly problemDescription: FieldRef<"CarpentryProject", 'String'>
    readonly projectDescription: FieldRef<"CarpentryProject", 'String'>
    readonly materialCosts: FieldRef<"CarpentryProject", 'Decimal'>
    readonly paidByCustomer: FieldRef<"CarpentryProject", 'Boolean'>
    readonly photoPath: FieldRef<"CarpentryProject", 'String'>
    readonly assignedToId: FieldRef<"CarpentryProject", 'String'>
    readonly createdAt: FieldRef<"CarpentryProject", 'DateTime'>
    readonly updatedAt: FieldRef<"CarpentryProject", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CarpentryProject findUnique
   */
  export type CarpentryProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarpentryProject
     */
    select?: CarpentryProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CarpentryProject
     */
    omit?: CarpentryProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarpentryProjectInclude<ExtArgs> | null
    /**
     * Filter, which CarpentryProject to fetch.
     */
    where: CarpentryProjectWhereUniqueInput
  }

  /**
   * CarpentryProject findUniqueOrThrow
   */
  export type CarpentryProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarpentryProject
     */
    select?: CarpentryProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CarpentryProject
     */
    omit?: CarpentryProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarpentryProjectInclude<ExtArgs> | null
    /**
     * Filter, which CarpentryProject to fetch.
     */
    where: CarpentryProjectWhereUniqueInput
  }

  /**
   * CarpentryProject findFirst
   */
  export type CarpentryProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarpentryProject
     */
    select?: CarpentryProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CarpentryProject
     */
    omit?: CarpentryProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarpentryProjectInclude<ExtArgs> | null
    /**
     * Filter, which CarpentryProject to fetch.
     */
    where?: CarpentryProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CarpentryProjects to fetch.
     */
    orderBy?: CarpentryProjectOrderByWithRelationInput | CarpentryProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CarpentryProjects.
     */
    cursor?: CarpentryProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CarpentryProjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CarpentryProjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CarpentryProjects.
     */
    distinct?: CarpentryProjectScalarFieldEnum | CarpentryProjectScalarFieldEnum[]
  }

  /**
   * CarpentryProject findFirstOrThrow
   */
  export type CarpentryProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarpentryProject
     */
    select?: CarpentryProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CarpentryProject
     */
    omit?: CarpentryProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarpentryProjectInclude<ExtArgs> | null
    /**
     * Filter, which CarpentryProject to fetch.
     */
    where?: CarpentryProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CarpentryProjects to fetch.
     */
    orderBy?: CarpentryProjectOrderByWithRelationInput | CarpentryProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CarpentryProjects.
     */
    cursor?: CarpentryProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CarpentryProjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CarpentryProjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CarpentryProjects.
     */
    distinct?: CarpentryProjectScalarFieldEnum | CarpentryProjectScalarFieldEnum[]
  }

  /**
   * CarpentryProject findMany
   */
  export type CarpentryProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarpentryProject
     */
    select?: CarpentryProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CarpentryProject
     */
    omit?: CarpentryProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarpentryProjectInclude<ExtArgs> | null
    /**
     * Filter, which CarpentryProjects to fetch.
     */
    where?: CarpentryProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CarpentryProjects to fetch.
     */
    orderBy?: CarpentryProjectOrderByWithRelationInput | CarpentryProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CarpentryProjects.
     */
    cursor?: CarpentryProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CarpentryProjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CarpentryProjects.
     */
    skip?: number
    distinct?: CarpentryProjectScalarFieldEnum | CarpentryProjectScalarFieldEnum[]
  }

  /**
   * CarpentryProject create
   */
  export type CarpentryProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarpentryProject
     */
    select?: CarpentryProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CarpentryProject
     */
    omit?: CarpentryProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarpentryProjectInclude<ExtArgs> | null
    /**
     * The data needed to create a CarpentryProject.
     */
    data: XOR<CarpentryProjectCreateInput, CarpentryProjectUncheckedCreateInput>
  }

  /**
   * CarpentryProject createMany
   */
  export type CarpentryProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CarpentryProjects.
     */
    data: CarpentryProjectCreateManyInput | CarpentryProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CarpentryProject update
   */
  export type CarpentryProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarpentryProject
     */
    select?: CarpentryProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CarpentryProject
     */
    omit?: CarpentryProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarpentryProjectInclude<ExtArgs> | null
    /**
     * The data needed to update a CarpentryProject.
     */
    data: XOR<CarpentryProjectUpdateInput, CarpentryProjectUncheckedUpdateInput>
    /**
     * Choose, which CarpentryProject to update.
     */
    where: CarpentryProjectWhereUniqueInput
  }

  /**
   * CarpentryProject updateMany
   */
  export type CarpentryProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CarpentryProjects.
     */
    data: XOR<CarpentryProjectUpdateManyMutationInput, CarpentryProjectUncheckedUpdateManyInput>
    /**
     * Filter which CarpentryProjects to update
     */
    where?: CarpentryProjectWhereInput
    /**
     * Limit how many CarpentryProjects to update.
     */
    limit?: number
  }

  /**
   * CarpentryProject upsert
   */
  export type CarpentryProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarpentryProject
     */
    select?: CarpentryProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CarpentryProject
     */
    omit?: CarpentryProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarpentryProjectInclude<ExtArgs> | null
    /**
     * The filter to search for the CarpentryProject to update in case it exists.
     */
    where: CarpentryProjectWhereUniqueInput
    /**
     * In case the CarpentryProject found by the `where` argument doesn't exist, create a new CarpentryProject with this data.
     */
    create: XOR<CarpentryProjectCreateInput, CarpentryProjectUncheckedCreateInput>
    /**
     * In case the CarpentryProject was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CarpentryProjectUpdateInput, CarpentryProjectUncheckedUpdateInput>
  }

  /**
   * CarpentryProject delete
   */
  export type CarpentryProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarpentryProject
     */
    select?: CarpentryProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CarpentryProject
     */
    omit?: CarpentryProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarpentryProjectInclude<ExtArgs> | null
    /**
     * Filter which CarpentryProject to delete.
     */
    where: CarpentryProjectWhereUniqueInput
  }

  /**
   * CarpentryProject deleteMany
   */
  export type CarpentryProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CarpentryProjects to delete
     */
    where?: CarpentryProjectWhereInput
    /**
     * Limit how many CarpentryProjects to delete.
     */
    limit?: number
  }

  /**
   * CarpentryProject.assignedTo
   */
  export type CarpentryProject$assignedToArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * CarpentryProject without action
   */
  export type CarpentryProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarpentryProject
     */
    select?: CarpentryProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CarpentryProject
     */
    omit?: CarpentryProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarpentryProjectInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    googleId: 'googleId',
    role: 'role',
    enabled: 'enabled'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ProblemTypeScalarFieldEnum: {
    id: 'id',
    value: 'value',
    label: 'label',
    image: 'image',
    index: 'index',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProblemTypeScalarFieldEnum = (typeof ProblemTypeScalarFieldEnum)[keyof typeof ProblemTypeScalarFieldEnum]


  export const BicycleRepairScalarFieldEnum: {
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

  export type BicycleRepairScalarFieldEnum = (typeof BicycleRepairScalarFieldEnum)[keyof typeof BicycleRepairScalarFieldEnum]


  export const PartScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    quantity: 'quantity',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PartScalarFieldEnum = (typeof PartScalarFieldEnum)[keyof typeof PartScalarFieldEnum]


  export const RepairPartScalarFieldEnum: {
    id: 'id',
    repairId: 'repairId',
    partId: 'partId',
    quantity: 'quantity',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RepairPartScalarFieldEnum = (typeof RepairPartScalarFieldEnum)[keyof typeof RepairPartScalarFieldEnum]


  export const BicycleRentalScalarFieldEnum: {
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

  export type BicycleRentalScalarFieldEnum = (typeof BicycleRentalScalarFieldEnum)[keyof typeof BicycleRentalScalarFieldEnum]


  export const TeamMemberScalarFieldEnum: {
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

  export type TeamMemberScalarFieldEnum = (typeof TeamMemberScalarFieldEnum)[keyof typeof TeamMemberScalarFieldEnum]


  export const ElectronicsRepairScalarFieldEnum: {
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

  export type ElectronicsRepairScalarFieldEnum = (typeof ElectronicsRepairScalarFieldEnum)[keyof typeof ElectronicsRepairScalarFieldEnum]


  export const CarpentryProjectScalarFieldEnum: {
    id: 'id',
    date: 'date',
    acceptedBy: 'acceptedBy',
    customerType: 'customerType',
    organizationName: 'organizationName',
    customerName: 'customerName',
    phoneNumber: 'phoneNumber',
    gender: 'gender',
    orderType: 'orderType',
    timeNeeded: 'timeNeeded',
    itemToRepair: 'itemToRepair',
    problemDescription: 'problemDescription',
    projectDescription: 'projectDescription',
    materialCosts: 'materialCosts',
    paidByCustomer: 'paidByCustomer',
    photoPath: 'photoPath',
    assignedToId: 'assignedToId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CarpentryProjectScalarFieldEnum = (typeof CarpentryProjectScalarFieldEnum)[keyof typeof CarpentryProjectScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const UserOrderByRelevanceFieldEnum: {
    id: 'id',
    email: 'email',
    googleId: 'googleId',
    role: 'role'
  };

  export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum]


  export const ProblemTypeOrderByRelevanceFieldEnum: {
    id: 'id',
    value: 'value',
    label: 'label',
    image: 'image'
  };

  export type ProblemTypeOrderByRelevanceFieldEnum = (typeof ProblemTypeOrderByRelevanceFieldEnum)[keyof typeof ProblemTypeOrderByRelevanceFieldEnum]


  export const BicycleRepairOrderByRelevanceFieldEnum: {
    id: 'id',
    problemTypes: 'problemTypes',
    description: 'description',
    ownerPhone: 'ownerPhone',
    photoPath: 'photoPath'
  };

  export type BicycleRepairOrderByRelevanceFieldEnum = (typeof BicycleRepairOrderByRelevanceFieldEnum)[keyof typeof BicycleRepairOrderByRelevanceFieldEnum]


  export const PartOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description'
  };

  export type PartOrderByRelevanceFieldEnum = (typeof PartOrderByRelevanceFieldEnum)[keyof typeof PartOrderByRelevanceFieldEnum]


  export const RepairPartOrderByRelevanceFieldEnum: {
    id: 'id',
    repairId: 'repairId',
    partId: 'partId'
  };

  export type RepairPartOrderByRelevanceFieldEnum = (typeof RepairPartOrderByRelevanceFieldEnum)[keyof typeof RepairPartOrderByRelevanceFieldEnum]


  export const BicycleRentalOrderByRelevanceFieldEnum: {
    id: 'id',
    renterName: 'renterName',
    renterPhone: 'renterPhone',
    renterEmail: 'renterEmail',
    bicycleId: 'bicycleId',
    notes: 'notes',
    signature: 'signature'
  };

  export type BicycleRentalOrderByRelevanceFieldEnum = (typeof BicycleRentalOrderByRelevanceFieldEnum)[keyof typeof BicycleRentalOrderByRelevanceFieldEnum]


  export const TeamMemberOrderByRelevanceFieldEnum: {
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

  export type TeamMemberOrderByRelevanceFieldEnum = (typeof TeamMemberOrderByRelevanceFieldEnum)[keyof typeof TeamMemberOrderByRelevanceFieldEnum]


  export const ElectronicsRepairOrderByRelevanceFieldEnum: {
    id: 'id',
    customerName: 'customerName',
    item: 'item',
    whatsapp: 'whatsapp',
    serialNumber: 'serialNumber',
    notes: 'notes',
    photoPath: 'photoPath',
    repairerId: 'repairerId'
  };

  export type ElectronicsRepairOrderByRelevanceFieldEnum = (typeof ElectronicsRepairOrderByRelevanceFieldEnum)[keyof typeof ElectronicsRepairOrderByRelevanceFieldEnum]


  export const CarpentryProjectOrderByRelevanceFieldEnum: {
    id: 'id',
    acceptedBy: 'acceptedBy',
    organizationName: 'organizationName',
    customerName: 'customerName',
    phoneNumber: 'phoneNumber',
    itemToRepair: 'itemToRepair',
    problemDescription: 'problemDescription',
    projectDescription: 'projectDescription',
    photoPath: 'photoPath',
    assignedToId: 'assignedToId'
  };

  export type CarpentryProjectOrderByRelevanceFieldEnum = (typeof CarpentryProjectOrderByRelevanceFieldEnum)[keyof typeof CarpentryProjectOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'RepairStatus'
   */
  export type EnumRepairStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RepairStatus'>
    


  /**
   * Reference to a field of type 'RentalStatus'
   */
  export type EnumRentalStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RentalStatus'>
    


  /**
   * Reference to a field of type 'TeamMemberStatus'
   */
  export type EnumTeamMemberStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TeamMemberStatus'>
    


  /**
   * Reference to a field of type 'ElectronicsCategory'
   */
  export type EnumElectronicsCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ElectronicsCategory'>
    


  /**
   * Reference to a field of type 'ElectronicsRepairStatus'
   */
  export type EnumElectronicsRepairStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ElectronicsRepairStatus'>
    


  /**
   * Reference to a field of type 'CarpentryCustomerType'
   */
  export type EnumCarpentryCustomerTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CarpentryCustomerType'>
    


  /**
   * Reference to a field of type 'CarpentryGender'
   */
  export type EnumCarpentryGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CarpentryGender'>
    


  /**
   * Reference to a field of type 'CarpentryOrderType'
   */
  export type EnumCarpentryOrderTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CarpentryOrderType'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringNullableFilter<"User"> | string | null
    googleId?: StringFilter<"User"> | string
    role?: StringNullableFilter<"User"> | string | null
    enabled?: BoolNullableFilter<"User"> | boolean | null
    electronicsRepairs?: ElectronicsRepairListRelationFilter
    carpentryProjects?: CarpentryProjectListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrderInput | SortOrder
    googleId?: SortOrder
    role?: SortOrderInput | SortOrder
    enabled?: SortOrderInput | SortOrder
    electronicsRepairs?: ElectronicsRepairOrderByRelationAggregateInput
    carpentryProjects?: CarpentryProjectOrderByRelationAggregateInput
    _relevance?: UserOrderByRelevanceInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    googleId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    email?: StringNullableFilter<"User"> | string | null
    role?: StringNullableFilter<"User"> | string | null
    enabled?: BoolNullableFilter<"User"> | boolean | null
    electronicsRepairs?: ElectronicsRepairListRelationFilter
    carpentryProjects?: CarpentryProjectListRelationFilter
  }, "id" | "googleId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrderInput | SortOrder
    googleId?: SortOrder
    role?: SortOrderInput | SortOrder
    enabled?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    googleId?: StringWithAggregatesFilter<"User"> | string
    role?: StringNullableWithAggregatesFilter<"User"> | string | null
    enabled?: BoolNullableWithAggregatesFilter<"User"> | boolean | null
  }

  export type ProblemTypeWhereInput = {
    AND?: ProblemTypeWhereInput | ProblemTypeWhereInput[]
    OR?: ProblemTypeWhereInput[]
    NOT?: ProblemTypeWhereInput | ProblemTypeWhereInput[]
    id?: StringFilter<"ProblemType"> | string
    value?: StringFilter<"ProblemType"> | string
    label?: StringFilter<"ProblemType"> | string
    image?: StringFilter<"ProblemType"> | string
    index?: IntFilter<"ProblemType"> | number
    createdAt?: DateTimeFilter<"ProblemType"> | Date | string
    updatedAt?: DateTimeFilter<"ProblemType"> | Date | string
  }

  export type ProblemTypeOrderByWithRelationInput = {
    id?: SortOrder
    value?: SortOrder
    label?: SortOrder
    image?: SortOrder
    index?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _relevance?: ProblemTypeOrderByRelevanceInput
  }

  export type ProblemTypeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    value?: string
    AND?: ProblemTypeWhereInput | ProblemTypeWhereInput[]
    OR?: ProblemTypeWhereInput[]
    NOT?: ProblemTypeWhereInput | ProblemTypeWhereInput[]
    label?: StringFilter<"ProblemType"> | string
    image?: StringFilter<"ProblemType"> | string
    index?: IntFilter<"ProblemType"> | number
    createdAt?: DateTimeFilter<"ProblemType"> | Date | string
    updatedAt?: DateTimeFilter<"ProblemType"> | Date | string
  }, "id" | "value">

  export type ProblemTypeOrderByWithAggregationInput = {
    id?: SortOrder
    value?: SortOrder
    label?: SortOrder
    image?: SortOrder
    index?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProblemTypeCountOrderByAggregateInput
    _avg?: ProblemTypeAvgOrderByAggregateInput
    _max?: ProblemTypeMaxOrderByAggregateInput
    _min?: ProblemTypeMinOrderByAggregateInput
    _sum?: ProblemTypeSumOrderByAggregateInput
  }

  export type ProblemTypeScalarWhereWithAggregatesInput = {
    AND?: ProblemTypeScalarWhereWithAggregatesInput | ProblemTypeScalarWhereWithAggregatesInput[]
    OR?: ProblemTypeScalarWhereWithAggregatesInput[]
    NOT?: ProblemTypeScalarWhereWithAggregatesInput | ProblemTypeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProblemType"> | string
    value?: StringWithAggregatesFilter<"ProblemType"> | string
    label?: StringWithAggregatesFilter<"ProblemType"> | string
    image?: StringWithAggregatesFilter<"ProblemType"> | string
    index?: IntWithAggregatesFilter<"ProblemType"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ProblemType"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ProblemType"> | Date | string
  }

  export type BicycleRepairWhereInput = {
    AND?: BicycleRepairWhereInput | BicycleRepairWhereInput[]
    OR?: BicycleRepairWhereInput[]
    NOT?: BicycleRepairWhereInput | BicycleRepairWhereInput[]
    id?: StringFilter<"BicycleRepair"> | string
    problemTypes?: StringFilter<"BicycleRepair"> | string
    description?: StringFilter<"BicycleRepair"> | string
    receivedDate?: DateTimeFilter<"BicycleRepair"> | Date | string
    repairedDate?: DateTimeNullableFilter<"BicycleRepair"> | Date | string | null
    pickupDate?: DateTimeNullableFilter<"BicycleRepair"> | Date | string | null
    ownerPhone?: StringFilter<"BicycleRepair"> | string
    status?: EnumRepairStatusFilter<"BicycleRepair"> | $Enums.RepairStatus
    photoPath?: StringNullableFilter<"BicycleRepair"> | string | null
    createdAt?: DateTimeFilter<"BicycleRepair"> | Date | string
    updatedAt?: DateTimeFilter<"BicycleRepair"> | Date | string
    partsUsed?: RepairPartListRelationFilter
  }

  export type BicycleRepairOrderByWithRelationInput = {
    id?: SortOrder
    problemTypes?: SortOrder
    description?: SortOrder
    receivedDate?: SortOrder
    repairedDate?: SortOrderInput | SortOrder
    pickupDate?: SortOrderInput | SortOrder
    ownerPhone?: SortOrder
    status?: SortOrder
    photoPath?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    partsUsed?: RepairPartOrderByRelationAggregateInput
    _relevance?: BicycleRepairOrderByRelevanceInput
  }

  export type BicycleRepairWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BicycleRepairWhereInput | BicycleRepairWhereInput[]
    OR?: BicycleRepairWhereInput[]
    NOT?: BicycleRepairWhereInput | BicycleRepairWhereInput[]
    problemTypes?: StringFilter<"BicycleRepair"> | string
    description?: StringFilter<"BicycleRepair"> | string
    receivedDate?: DateTimeFilter<"BicycleRepair"> | Date | string
    repairedDate?: DateTimeNullableFilter<"BicycleRepair"> | Date | string | null
    pickupDate?: DateTimeNullableFilter<"BicycleRepair"> | Date | string | null
    ownerPhone?: StringFilter<"BicycleRepair"> | string
    status?: EnumRepairStatusFilter<"BicycleRepair"> | $Enums.RepairStatus
    photoPath?: StringNullableFilter<"BicycleRepair"> | string | null
    createdAt?: DateTimeFilter<"BicycleRepair"> | Date | string
    updatedAt?: DateTimeFilter<"BicycleRepair"> | Date | string
    partsUsed?: RepairPartListRelationFilter
  }, "id">

  export type BicycleRepairOrderByWithAggregationInput = {
    id?: SortOrder
    problemTypes?: SortOrder
    description?: SortOrder
    receivedDate?: SortOrder
    repairedDate?: SortOrderInput | SortOrder
    pickupDate?: SortOrderInput | SortOrder
    ownerPhone?: SortOrder
    status?: SortOrder
    photoPath?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BicycleRepairCountOrderByAggregateInput
    _max?: BicycleRepairMaxOrderByAggregateInput
    _min?: BicycleRepairMinOrderByAggregateInput
  }

  export type BicycleRepairScalarWhereWithAggregatesInput = {
    AND?: BicycleRepairScalarWhereWithAggregatesInput | BicycleRepairScalarWhereWithAggregatesInput[]
    OR?: BicycleRepairScalarWhereWithAggregatesInput[]
    NOT?: BicycleRepairScalarWhereWithAggregatesInput | BicycleRepairScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BicycleRepair"> | string
    problemTypes?: StringWithAggregatesFilter<"BicycleRepair"> | string
    description?: StringWithAggregatesFilter<"BicycleRepair"> | string
    receivedDate?: DateTimeWithAggregatesFilter<"BicycleRepair"> | Date | string
    repairedDate?: DateTimeNullableWithAggregatesFilter<"BicycleRepair"> | Date | string | null
    pickupDate?: DateTimeNullableWithAggregatesFilter<"BicycleRepair"> | Date | string | null
    ownerPhone?: StringWithAggregatesFilter<"BicycleRepair"> | string
    status?: EnumRepairStatusWithAggregatesFilter<"BicycleRepair"> | $Enums.RepairStatus
    photoPath?: StringNullableWithAggregatesFilter<"BicycleRepair"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"BicycleRepair"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"BicycleRepair"> | Date | string
  }

  export type PartWhereInput = {
    AND?: PartWhereInput | PartWhereInput[]
    OR?: PartWhereInput[]
    NOT?: PartWhereInput | PartWhereInput[]
    id?: StringFilter<"Part"> | string
    name?: StringFilter<"Part"> | string
    description?: StringNullableFilter<"Part"> | string | null
    quantity?: IntFilter<"Part"> | number
    createdAt?: DateTimeFilter<"Part"> | Date | string
    updatedAt?: DateTimeFilter<"Part"> | Date | string
    repairs?: RepairPartListRelationFilter
  }

  export type PartOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    quantity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    repairs?: RepairPartOrderByRelationAggregateInput
    _relevance?: PartOrderByRelevanceInput
  }

  export type PartWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PartWhereInput | PartWhereInput[]
    OR?: PartWhereInput[]
    NOT?: PartWhereInput | PartWhereInput[]
    name?: StringFilter<"Part"> | string
    description?: StringNullableFilter<"Part"> | string | null
    quantity?: IntFilter<"Part"> | number
    createdAt?: DateTimeFilter<"Part"> | Date | string
    updatedAt?: DateTimeFilter<"Part"> | Date | string
    repairs?: RepairPartListRelationFilter
  }, "id">

  export type PartOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    quantity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PartCountOrderByAggregateInput
    _avg?: PartAvgOrderByAggregateInput
    _max?: PartMaxOrderByAggregateInput
    _min?: PartMinOrderByAggregateInput
    _sum?: PartSumOrderByAggregateInput
  }

  export type PartScalarWhereWithAggregatesInput = {
    AND?: PartScalarWhereWithAggregatesInput | PartScalarWhereWithAggregatesInput[]
    OR?: PartScalarWhereWithAggregatesInput[]
    NOT?: PartScalarWhereWithAggregatesInput | PartScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Part"> | string
    name?: StringWithAggregatesFilter<"Part"> | string
    description?: StringNullableWithAggregatesFilter<"Part"> | string | null
    quantity?: IntWithAggregatesFilter<"Part"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Part"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Part"> | Date | string
  }

  export type RepairPartWhereInput = {
    AND?: RepairPartWhereInput | RepairPartWhereInput[]
    OR?: RepairPartWhereInput[]
    NOT?: RepairPartWhereInput | RepairPartWhereInput[]
    id?: StringFilter<"RepairPart"> | string
    repairId?: StringFilter<"RepairPart"> | string
    partId?: StringFilter<"RepairPart"> | string
    quantity?: IntFilter<"RepairPart"> | number
    createdAt?: DateTimeFilter<"RepairPart"> | Date | string
    updatedAt?: DateTimeFilter<"RepairPart"> | Date | string
    repair?: XOR<BicycleRepairScalarRelationFilter, BicycleRepairWhereInput>
    part?: XOR<PartScalarRelationFilter, PartWhereInput>
  }

  export type RepairPartOrderByWithRelationInput = {
    id?: SortOrder
    repairId?: SortOrder
    partId?: SortOrder
    quantity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    repair?: BicycleRepairOrderByWithRelationInput
    part?: PartOrderByWithRelationInput
    _relevance?: RepairPartOrderByRelevanceInput
  }

  export type RepairPartWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    repairId_partId?: RepairPartRepairIdPartIdCompoundUniqueInput
    AND?: RepairPartWhereInput | RepairPartWhereInput[]
    OR?: RepairPartWhereInput[]
    NOT?: RepairPartWhereInput | RepairPartWhereInput[]
    repairId?: StringFilter<"RepairPart"> | string
    partId?: StringFilter<"RepairPart"> | string
    quantity?: IntFilter<"RepairPart"> | number
    createdAt?: DateTimeFilter<"RepairPart"> | Date | string
    updatedAt?: DateTimeFilter<"RepairPart"> | Date | string
    repair?: XOR<BicycleRepairScalarRelationFilter, BicycleRepairWhereInput>
    part?: XOR<PartScalarRelationFilter, PartWhereInput>
  }, "id" | "repairId_partId">

  export type RepairPartOrderByWithAggregationInput = {
    id?: SortOrder
    repairId?: SortOrder
    partId?: SortOrder
    quantity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RepairPartCountOrderByAggregateInput
    _avg?: RepairPartAvgOrderByAggregateInput
    _max?: RepairPartMaxOrderByAggregateInput
    _min?: RepairPartMinOrderByAggregateInput
    _sum?: RepairPartSumOrderByAggregateInput
  }

  export type RepairPartScalarWhereWithAggregatesInput = {
    AND?: RepairPartScalarWhereWithAggregatesInput | RepairPartScalarWhereWithAggregatesInput[]
    OR?: RepairPartScalarWhereWithAggregatesInput[]
    NOT?: RepairPartScalarWhereWithAggregatesInput | RepairPartScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RepairPart"> | string
    repairId?: StringWithAggregatesFilter<"RepairPart"> | string
    partId?: StringWithAggregatesFilter<"RepairPart"> | string
    quantity?: IntWithAggregatesFilter<"RepairPart"> | number
    createdAt?: DateTimeWithAggregatesFilter<"RepairPart"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RepairPart"> | Date | string
  }

  export type BicycleRentalWhereInput = {
    AND?: BicycleRentalWhereInput | BicycleRentalWhereInput[]
    OR?: BicycleRentalWhereInput[]
    NOT?: BicycleRentalWhereInput | BicycleRentalWhereInput[]
    id?: StringFilter<"BicycleRental"> | string
    renterName?: StringFilter<"BicycleRental"> | string
    renterPhone?: StringFilter<"BicycleRental"> | string
    renterEmail?: StringNullableFilter<"BicycleRental"> | string | null
    bicycleId?: StringFilter<"BicycleRental"> | string
    startDate?: DateTimeFilter<"BicycleRental"> | Date | string
    endDate?: DateTimeFilter<"BicycleRental"> | Date | string
    actualReturnDate?: DateTimeNullableFilter<"BicycleRental"> | Date | string | null
    status?: EnumRentalStatusFilter<"BicycleRental"> | $Enums.RentalStatus
    notes?: StringNullableFilter<"BicycleRental"> | string | null
    signature?: StringNullableFilter<"BicycleRental"> | string | null
    createdAt?: DateTimeFilter<"BicycleRental"> | Date | string
    updatedAt?: DateTimeFilter<"BicycleRental"> | Date | string
  }

  export type BicycleRentalOrderByWithRelationInput = {
    id?: SortOrder
    renterName?: SortOrder
    renterPhone?: SortOrder
    renterEmail?: SortOrderInput | SortOrder
    bicycleId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    actualReturnDate?: SortOrderInput | SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    signature?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _relevance?: BicycleRentalOrderByRelevanceInput
  }

  export type BicycleRentalWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BicycleRentalWhereInput | BicycleRentalWhereInput[]
    OR?: BicycleRentalWhereInput[]
    NOT?: BicycleRentalWhereInput | BicycleRentalWhereInput[]
    renterName?: StringFilter<"BicycleRental"> | string
    renterPhone?: StringFilter<"BicycleRental"> | string
    renterEmail?: StringNullableFilter<"BicycleRental"> | string | null
    bicycleId?: StringFilter<"BicycleRental"> | string
    startDate?: DateTimeFilter<"BicycleRental"> | Date | string
    endDate?: DateTimeFilter<"BicycleRental"> | Date | string
    actualReturnDate?: DateTimeNullableFilter<"BicycleRental"> | Date | string | null
    status?: EnumRentalStatusFilter<"BicycleRental"> | $Enums.RentalStatus
    notes?: StringNullableFilter<"BicycleRental"> | string | null
    signature?: StringNullableFilter<"BicycleRental"> | string | null
    createdAt?: DateTimeFilter<"BicycleRental"> | Date | string
    updatedAt?: DateTimeFilter<"BicycleRental"> | Date | string
  }, "id">

  export type BicycleRentalOrderByWithAggregationInput = {
    id?: SortOrder
    renterName?: SortOrder
    renterPhone?: SortOrder
    renterEmail?: SortOrderInput | SortOrder
    bicycleId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    actualReturnDate?: SortOrderInput | SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    signature?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BicycleRentalCountOrderByAggregateInput
    _max?: BicycleRentalMaxOrderByAggregateInput
    _min?: BicycleRentalMinOrderByAggregateInput
  }

  export type BicycleRentalScalarWhereWithAggregatesInput = {
    AND?: BicycleRentalScalarWhereWithAggregatesInput | BicycleRentalScalarWhereWithAggregatesInput[]
    OR?: BicycleRentalScalarWhereWithAggregatesInput[]
    NOT?: BicycleRentalScalarWhereWithAggregatesInput | BicycleRentalScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BicycleRental"> | string
    renterName?: StringWithAggregatesFilter<"BicycleRental"> | string
    renterPhone?: StringWithAggregatesFilter<"BicycleRental"> | string
    renterEmail?: StringNullableWithAggregatesFilter<"BicycleRental"> | string | null
    bicycleId?: StringWithAggregatesFilter<"BicycleRental"> | string
    startDate?: DateTimeWithAggregatesFilter<"BicycleRental"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"BicycleRental"> | Date | string
    actualReturnDate?: DateTimeNullableWithAggregatesFilter<"BicycleRental"> | Date | string | null
    status?: EnumRentalStatusWithAggregatesFilter<"BicycleRental"> | $Enums.RentalStatus
    notes?: StringNullableWithAggregatesFilter<"BicycleRental"> | string | null
    signature?: StringNullableWithAggregatesFilter<"BicycleRental"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"BicycleRental"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"BicycleRental"> | Date | string
  }

  export type TeamMemberWhereInput = {
    AND?: TeamMemberWhereInput | TeamMemberWhereInput[]
    OR?: TeamMemberWhereInput[]
    NOT?: TeamMemberWhereInput | TeamMemberWhereInput[]
    id?: StringFilter<"TeamMember"> | string
    familyName?: StringFilter<"TeamMember"> | string
    givenNames?: StringFilter<"TeamMember"> | string
    nationality?: StringFilter<"TeamMember"> | string
    photoPath?: StringNullableFilter<"TeamMember"> | string | null
    status?: EnumTeamMemberStatusFilter<"TeamMember"> | $Enums.TeamMemberStatus
    startDate?: DateTimeFilter<"TeamMember"> | Date | string
    endDate?: DateTimeNullableFilter<"TeamMember"> | Date | string | null
    department?: StringFilter<"TeamMember"> | string
    email?: StringFilter<"TeamMember"> | string
    phone?: StringFilter<"TeamMember"> | string
    homeAddress?: StringNullableFilter<"TeamMember"> | string | null
    dateOfBirth?: DateTimeFilter<"TeamMember"> | Date | string
    legalStatus?: StringFilter<"TeamMember"> | string
    createdAt?: DateTimeFilter<"TeamMember"> | Date | string
    updatedAt?: DateTimeFilter<"TeamMember"> | Date | string
  }

  export type TeamMemberOrderByWithRelationInput = {
    id?: SortOrder
    familyName?: SortOrder
    givenNames?: SortOrder
    nationality?: SortOrder
    photoPath?: SortOrderInput | SortOrder
    status?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrderInput | SortOrder
    department?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    homeAddress?: SortOrderInput | SortOrder
    dateOfBirth?: SortOrder
    legalStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _relevance?: TeamMemberOrderByRelevanceInput
  }

  export type TeamMemberWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: TeamMemberWhereInput | TeamMemberWhereInput[]
    OR?: TeamMemberWhereInput[]
    NOT?: TeamMemberWhereInput | TeamMemberWhereInput[]
    familyName?: StringFilter<"TeamMember"> | string
    givenNames?: StringFilter<"TeamMember"> | string
    nationality?: StringFilter<"TeamMember"> | string
    photoPath?: StringNullableFilter<"TeamMember"> | string | null
    status?: EnumTeamMemberStatusFilter<"TeamMember"> | $Enums.TeamMemberStatus
    startDate?: DateTimeFilter<"TeamMember"> | Date | string
    endDate?: DateTimeNullableFilter<"TeamMember"> | Date | string | null
    department?: StringFilter<"TeamMember"> | string
    phone?: StringFilter<"TeamMember"> | string
    homeAddress?: StringNullableFilter<"TeamMember"> | string | null
    dateOfBirth?: DateTimeFilter<"TeamMember"> | Date | string
    legalStatus?: StringFilter<"TeamMember"> | string
    createdAt?: DateTimeFilter<"TeamMember"> | Date | string
    updatedAt?: DateTimeFilter<"TeamMember"> | Date | string
  }, "id" | "email">

  export type TeamMemberOrderByWithAggregationInput = {
    id?: SortOrder
    familyName?: SortOrder
    givenNames?: SortOrder
    nationality?: SortOrder
    photoPath?: SortOrderInput | SortOrder
    status?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrderInput | SortOrder
    department?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    homeAddress?: SortOrderInput | SortOrder
    dateOfBirth?: SortOrder
    legalStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TeamMemberCountOrderByAggregateInput
    _max?: TeamMemberMaxOrderByAggregateInput
    _min?: TeamMemberMinOrderByAggregateInput
  }

  export type TeamMemberScalarWhereWithAggregatesInput = {
    AND?: TeamMemberScalarWhereWithAggregatesInput | TeamMemberScalarWhereWithAggregatesInput[]
    OR?: TeamMemberScalarWhereWithAggregatesInput[]
    NOT?: TeamMemberScalarWhereWithAggregatesInput | TeamMemberScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TeamMember"> | string
    familyName?: StringWithAggregatesFilter<"TeamMember"> | string
    givenNames?: StringWithAggregatesFilter<"TeamMember"> | string
    nationality?: StringWithAggregatesFilter<"TeamMember"> | string
    photoPath?: StringNullableWithAggregatesFilter<"TeamMember"> | string | null
    status?: EnumTeamMemberStatusWithAggregatesFilter<"TeamMember"> | $Enums.TeamMemberStatus
    startDate?: DateTimeWithAggregatesFilter<"TeamMember"> | Date | string
    endDate?: DateTimeNullableWithAggregatesFilter<"TeamMember"> | Date | string | null
    department?: StringWithAggregatesFilter<"TeamMember"> | string
    email?: StringWithAggregatesFilter<"TeamMember"> | string
    phone?: StringWithAggregatesFilter<"TeamMember"> | string
    homeAddress?: StringNullableWithAggregatesFilter<"TeamMember"> | string | null
    dateOfBirth?: DateTimeWithAggregatesFilter<"TeamMember"> | Date | string
    legalStatus?: StringWithAggregatesFilter<"TeamMember"> | string
    createdAt?: DateTimeWithAggregatesFilter<"TeamMember"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TeamMember"> | Date | string
  }

  export type ElectronicsRepairWhereInput = {
    AND?: ElectronicsRepairWhereInput | ElectronicsRepairWhereInput[]
    OR?: ElectronicsRepairWhereInput[]
    NOT?: ElectronicsRepairWhereInput | ElectronicsRepairWhereInput[]
    id?: StringFilter<"ElectronicsRepair"> | string
    repairId?: IntFilter<"ElectronicsRepair"> | number
    customerName?: StringFilter<"ElectronicsRepair"> | string
    category?: EnumElectronicsCategoryFilter<"ElectronicsRepair"> | $Enums.ElectronicsCategory
    item?: StringNullableFilter<"ElectronicsRepair"> | string | null
    whatsapp?: StringNullableFilter<"ElectronicsRepair"> | string | null
    serialNumber?: StringNullableFilter<"ElectronicsRepair"> | string | null
    status?: EnumElectronicsRepairStatusFilter<"ElectronicsRepair"> | $Enums.ElectronicsRepairStatus
    repairable?: BoolNullableFilter<"ElectronicsRepair"> | boolean | null
    notes?: StringNullableFilter<"ElectronicsRepair"> | string | null
    photoPath?: StringNullableFilter<"ElectronicsRepair"> | string | null
    createdDate?: DateTimeFilter<"ElectronicsRepair"> | Date | string
    repairerId?: StringNullableFilter<"ElectronicsRepair"> | string | null
    createdAt?: DateTimeFilter<"ElectronicsRepair"> | Date | string
    updatedAt?: DateTimeFilter<"ElectronicsRepair"> | Date | string
    repairer?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type ElectronicsRepairOrderByWithRelationInput = {
    id?: SortOrder
    repairId?: SortOrder
    customerName?: SortOrder
    category?: SortOrder
    item?: SortOrderInput | SortOrder
    whatsapp?: SortOrderInput | SortOrder
    serialNumber?: SortOrderInput | SortOrder
    status?: SortOrder
    repairable?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    photoPath?: SortOrderInput | SortOrder
    createdDate?: SortOrder
    repairerId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    repairer?: UserOrderByWithRelationInput
    _relevance?: ElectronicsRepairOrderByRelevanceInput
  }

  export type ElectronicsRepairWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    repairId?: number
    AND?: ElectronicsRepairWhereInput | ElectronicsRepairWhereInput[]
    OR?: ElectronicsRepairWhereInput[]
    NOT?: ElectronicsRepairWhereInput | ElectronicsRepairWhereInput[]
    customerName?: StringFilter<"ElectronicsRepair"> | string
    category?: EnumElectronicsCategoryFilter<"ElectronicsRepair"> | $Enums.ElectronicsCategory
    item?: StringNullableFilter<"ElectronicsRepair"> | string | null
    whatsapp?: StringNullableFilter<"ElectronicsRepair"> | string | null
    serialNumber?: StringNullableFilter<"ElectronicsRepair"> | string | null
    status?: EnumElectronicsRepairStatusFilter<"ElectronicsRepair"> | $Enums.ElectronicsRepairStatus
    repairable?: BoolNullableFilter<"ElectronicsRepair"> | boolean | null
    notes?: StringNullableFilter<"ElectronicsRepair"> | string | null
    photoPath?: StringNullableFilter<"ElectronicsRepair"> | string | null
    createdDate?: DateTimeFilter<"ElectronicsRepair"> | Date | string
    repairerId?: StringNullableFilter<"ElectronicsRepair"> | string | null
    createdAt?: DateTimeFilter<"ElectronicsRepair"> | Date | string
    updatedAt?: DateTimeFilter<"ElectronicsRepair"> | Date | string
    repairer?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id" | "repairId">

  export type ElectronicsRepairOrderByWithAggregationInput = {
    id?: SortOrder
    repairId?: SortOrder
    customerName?: SortOrder
    category?: SortOrder
    item?: SortOrderInput | SortOrder
    whatsapp?: SortOrderInput | SortOrder
    serialNumber?: SortOrderInput | SortOrder
    status?: SortOrder
    repairable?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    photoPath?: SortOrderInput | SortOrder
    createdDate?: SortOrder
    repairerId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ElectronicsRepairCountOrderByAggregateInput
    _avg?: ElectronicsRepairAvgOrderByAggregateInput
    _max?: ElectronicsRepairMaxOrderByAggregateInput
    _min?: ElectronicsRepairMinOrderByAggregateInput
    _sum?: ElectronicsRepairSumOrderByAggregateInput
  }

  export type ElectronicsRepairScalarWhereWithAggregatesInput = {
    AND?: ElectronicsRepairScalarWhereWithAggregatesInput | ElectronicsRepairScalarWhereWithAggregatesInput[]
    OR?: ElectronicsRepairScalarWhereWithAggregatesInput[]
    NOT?: ElectronicsRepairScalarWhereWithAggregatesInput | ElectronicsRepairScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ElectronicsRepair"> | string
    repairId?: IntWithAggregatesFilter<"ElectronicsRepair"> | number
    customerName?: StringWithAggregatesFilter<"ElectronicsRepair"> | string
    category?: EnumElectronicsCategoryWithAggregatesFilter<"ElectronicsRepair"> | $Enums.ElectronicsCategory
    item?: StringNullableWithAggregatesFilter<"ElectronicsRepair"> | string | null
    whatsapp?: StringNullableWithAggregatesFilter<"ElectronicsRepair"> | string | null
    serialNumber?: StringNullableWithAggregatesFilter<"ElectronicsRepair"> | string | null
    status?: EnumElectronicsRepairStatusWithAggregatesFilter<"ElectronicsRepair"> | $Enums.ElectronicsRepairStatus
    repairable?: BoolNullableWithAggregatesFilter<"ElectronicsRepair"> | boolean | null
    notes?: StringNullableWithAggregatesFilter<"ElectronicsRepair"> | string | null
    photoPath?: StringNullableWithAggregatesFilter<"ElectronicsRepair"> | string | null
    createdDate?: DateTimeWithAggregatesFilter<"ElectronicsRepair"> | Date | string
    repairerId?: StringNullableWithAggregatesFilter<"ElectronicsRepair"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ElectronicsRepair"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ElectronicsRepair"> | Date | string
  }

  export type CarpentryProjectWhereInput = {
    AND?: CarpentryProjectWhereInput | CarpentryProjectWhereInput[]
    OR?: CarpentryProjectWhereInput[]
    NOT?: CarpentryProjectWhereInput | CarpentryProjectWhereInput[]
    id?: StringFilter<"CarpentryProject"> | string
    date?: DateTimeFilter<"CarpentryProject"> | Date | string
    acceptedBy?: StringNullableFilter<"CarpentryProject"> | string | null
    customerType?: EnumCarpentryCustomerTypeNullableFilter<"CarpentryProject"> | $Enums.CarpentryCustomerType | null
    organizationName?: StringNullableFilter<"CarpentryProject"> | string | null
    customerName?: StringNullableFilter<"CarpentryProject"> | string | null
    phoneNumber?: StringNullableFilter<"CarpentryProject"> | string | null
    gender?: EnumCarpentryGenderNullableFilter<"CarpentryProject"> | $Enums.CarpentryGender | null
    orderType?: EnumCarpentryOrderTypeNullableFilter<"CarpentryProject"> | $Enums.CarpentryOrderType | null
    timeNeeded?: IntNullableFilter<"CarpentryProject"> | number | null
    itemToRepair?: StringNullableFilter<"CarpentryProject"> | string | null
    problemDescription?: StringNullableFilter<"CarpentryProject"> | string | null
    projectDescription?: StringNullableFilter<"CarpentryProject"> | string | null
    materialCosts?: DecimalNullableFilter<"CarpentryProject"> | Decimal | DecimalJsLike | number | string | null
    paidByCustomer?: BoolNullableFilter<"CarpentryProject"> | boolean | null
    photoPath?: StringNullableFilter<"CarpentryProject"> | string | null
    assignedToId?: StringNullableFilter<"CarpentryProject"> | string | null
    createdAt?: DateTimeFilter<"CarpentryProject"> | Date | string
    updatedAt?: DateTimeFilter<"CarpentryProject"> | Date | string
    assignedTo?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type CarpentryProjectOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrder
    acceptedBy?: SortOrderInput | SortOrder
    customerType?: SortOrderInput | SortOrder
    organizationName?: SortOrderInput | SortOrder
    customerName?: SortOrderInput | SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    orderType?: SortOrderInput | SortOrder
    timeNeeded?: SortOrderInput | SortOrder
    itemToRepair?: SortOrderInput | SortOrder
    problemDescription?: SortOrderInput | SortOrder
    projectDescription?: SortOrderInput | SortOrder
    materialCosts?: SortOrderInput | SortOrder
    paidByCustomer?: SortOrderInput | SortOrder
    photoPath?: SortOrderInput | SortOrder
    assignedToId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    assignedTo?: UserOrderByWithRelationInput
    _relevance?: CarpentryProjectOrderByRelevanceInput
  }

  export type CarpentryProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CarpentryProjectWhereInput | CarpentryProjectWhereInput[]
    OR?: CarpentryProjectWhereInput[]
    NOT?: CarpentryProjectWhereInput | CarpentryProjectWhereInput[]
    date?: DateTimeFilter<"CarpentryProject"> | Date | string
    acceptedBy?: StringNullableFilter<"CarpentryProject"> | string | null
    customerType?: EnumCarpentryCustomerTypeNullableFilter<"CarpentryProject"> | $Enums.CarpentryCustomerType | null
    organizationName?: StringNullableFilter<"CarpentryProject"> | string | null
    customerName?: StringNullableFilter<"CarpentryProject"> | string | null
    phoneNumber?: StringNullableFilter<"CarpentryProject"> | string | null
    gender?: EnumCarpentryGenderNullableFilter<"CarpentryProject"> | $Enums.CarpentryGender | null
    orderType?: EnumCarpentryOrderTypeNullableFilter<"CarpentryProject"> | $Enums.CarpentryOrderType | null
    timeNeeded?: IntNullableFilter<"CarpentryProject"> | number | null
    itemToRepair?: StringNullableFilter<"CarpentryProject"> | string | null
    problemDescription?: StringNullableFilter<"CarpentryProject"> | string | null
    projectDescription?: StringNullableFilter<"CarpentryProject"> | string | null
    materialCosts?: DecimalNullableFilter<"CarpentryProject"> | Decimal | DecimalJsLike | number | string | null
    paidByCustomer?: BoolNullableFilter<"CarpentryProject"> | boolean | null
    photoPath?: StringNullableFilter<"CarpentryProject"> | string | null
    assignedToId?: StringNullableFilter<"CarpentryProject"> | string | null
    createdAt?: DateTimeFilter<"CarpentryProject"> | Date | string
    updatedAt?: DateTimeFilter<"CarpentryProject"> | Date | string
    assignedTo?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type CarpentryProjectOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    acceptedBy?: SortOrderInput | SortOrder
    customerType?: SortOrderInput | SortOrder
    organizationName?: SortOrderInput | SortOrder
    customerName?: SortOrderInput | SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    orderType?: SortOrderInput | SortOrder
    timeNeeded?: SortOrderInput | SortOrder
    itemToRepair?: SortOrderInput | SortOrder
    problemDescription?: SortOrderInput | SortOrder
    projectDescription?: SortOrderInput | SortOrder
    materialCosts?: SortOrderInput | SortOrder
    paidByCustomer?: SortOrderInput | SortOrder
    photoPath?: SortOrderInput | SortOrder
    assignedToId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CarpentryProjectCountOrderByAggregateInput
    _avg?: CarpentryProjectAvgOrderByAggregateInput
    _max?: CarpentryProjectMaxOrderByAggregateInput
    _min?: CarpentryProjectMinOrderByAggregateInput
    _sum?: CarpentryProjectSumOrderByAggregateInput
  }

  export type CarpentryProjectScalarWhereWithAggregatesInput = {
    AND?: CarpentryProjectScalarWhereWithAggregatesInput | CarpentryProjectScalarWhereWithAggregatesInput[]
    OR?: CarpentryProjectScalarWhereWithAggregatesInput[]
    NOT?: CarpentryProjectScalarWhereWithAggregatesInput | CarpentryProjectScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CarpentryProject"> | string
    date?: DateTimeWithAggregatesFilter<"CarpentryProject"> | Date | string
    acceptedBy?: StringNullableWithAggregatesFilter<"CarpentryProject"> | string | null
    customerType?: EnumCarpentryCustomerTypeNullableWithAggregatesFilter<"CarpentryProject"> | $Enums.CarpentryCustomerType | null
    organizationName?: StringNullableWithAggregatesFilter<"CarpentryProject"> | string | null
    customerName?: StringNullableWithAggregatesFilter<"CarpentryProject"> | string | null
    phoneNumber?: StringNullableWithAggregatesFilter<"CarpentryProject"> | string | null
    gender?: EnumCarpentryGenderNullableWithAggregatesFilter<"CarpentryProject"> | $Enums.CarpentryGender | null
    orderType?: EnumCarpentryOrderTypeNullableWithAggregatesFilter<"CarpentryProject"> | $Enums.CarpentryOrderType | null
    timeNeeded?: IntNullableWithAggregatesFilter<"CarpentryProject"> | number | null
    itemToRepair?: StringNullableWithAggregatesFilter<"CarpentryProject"> | string | null
    problemDescription?: StringNullableWithAggregatesFilter<"CarpentryProject"> | string | null
    projectDescription?: StringNullableWithAggregatesFilter<"CarpentryProject"> | string | null
    materialCosts?: DecimalNullableWithAggregatesFilter<"CarpentryProject"> | Decimal | DecimalJsLike | number | string | null
    paidByCustomer?: BoolNullableWithAggregatesFilter<"CarpentryProject"> | boolean | null
    photoPath?: StringNullableWithAggregatesFilter<"CarpentryProject"> | string | null
    assignedToId?: StringNullableWithAggregatesFilter<"CarpentryProject"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"CarpentryProject"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CarpentryProject"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email?: string | null
    googleId: string
    role?: string | null
    enabled?: boolean | null
    electronicsRepairs?: ElectronicsRepairCreateNestedManyWithoutRepairerInput
    carpentryProjects?: CarpentryProjectCreateNestedManyWithoutAssignedToInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email?: string | null
    googleId: string
    role?: string | null
    enabled?: boolean | null
    electronicsRepairs?: ElectronicsRepairUncheckedCreateNestedManyWithoutRepairerInput
    carpentryProjects?: CarpentryProjectUncheckedCreateNestedManyWithoutAssignedToInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    enabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    electronicsRepairs?: ElectronicsRepairUpdateManyWithoutRepairerNestedInput
    carpentryProjects?: CarpentryProjectUpdateManyWithoutAssignedToNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    enabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    electronicsRepairs?: ElectronicsRepairUncheckedUpdateManyWithoutRepairerNestedInput
    carpentryProjects?: CarpentryProjectUncheckedUpdateManyWithoutAssignedToNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email?: string | null
    googleId: string
    role?: string | null
    enabled?: boolean | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    enabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    enabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type ProblemTypeCreateInput = {
    id?: string
    value: string
    label: string
    image: string
    index?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProblemTypeUncheckedCreateInput = {
    id?: string
    value: string
    label: string
    image: string
    index?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProblemTypeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    image?: StringFieldUpdateOperationsInput | string
    index?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProblemTypeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    image?: StringFieldUpdateOperationsInput | string
    index?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProblemTypeCreateManyInput = {
    id?: string
    value: string
    label: string
    image: string
    index?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProblemTypeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    image?: StringFieldUpdateOperationsInput | string
    index?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProblemTypeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    image?: StringFieldUpdateOperationsInput | string
    index?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BicycleRepairCreateInput = {
    id?: string
    problemTypes?: string
    description: string
    receivedDate: Date | string
    repairedDate?: Date | string | null
    pickupDate?: Date | string | null
    ownerPhone: string
    status?: $Enums.RepairStatus
    photoPath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    partsUsed?: RepairPartCreateNestedManyWithoutRepairInput
  }

  export type BicycleRepairUncheckedCreateInput = {
    id?: string
    problemTypes?: string
    description: string
    receivedDate: Date | string
    repairedDate?: Date | string | null
    pickupDate?: Date | string | null
    ownerPhone: string
    status?: $Enums.RepairStatus
    photoPath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    partsUsed?: RepairPartUncheckedCreateNestedManyWithoutRepairInput
  }

  export type BicycleRepairUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    problemTypes?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    receivedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    repairedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pickupDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownerPhone?: StringFieldUpdateOperationsInput | string
    status?: EnumRepairStatusFieldUpdateOperationsInput | $Enums.RepairStatus
    photoPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    partsUsed?: RepairPartUpdateManyWithoutRepairNestedInput
  }

  export type BicycleRepairUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    problemTypes?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    receivedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    repairedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pickupDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownerPhone?: StringFieldUpdateOperationsInput | string
    status?: EnumRepairStatusFieldUpdateOperationsInput | $Enums.RepairStatus
    photoPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    partsUsed?: RepairPartUncheckedUpdateManyWithoutRepairNestedInput
  }

  export type BicycleRepairCreateManyInput = {
    id?: string
    problemTypes?: string
    description: string
    receivedDate: Date | string
    repairedDate?: Date | string | null
    pickupDate?: Date | string | null
    ownerPhone: string
    status?: $Enums.RepairStatus
    photoPath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BicycleRepairUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    problemTypes?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    receivedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    repairedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pickupDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownerPhone?: StringFieldUpdateOperationsInput | string
    status?: EnumRepairStatusFieldUpdateOperationsInput | $Enums.RepairStatus
    photoPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BicycleRepairUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    problemTypes?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    receivedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    repairedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pickupDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownerPhone?: StringFieldUpdateOperationsInput | string
    status?: EnumRepairStatusFieldUpdateOperationsInput | $Enums.RepairStatus
    photoPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PartCreateInput = {
    id?: string
    name: string
    description?: string | null
    quantity: number
    createdAt?: Date | string
    updatedAt?: Date | string
    repairs?: RepairPartCreateNestedManyWithoutPartInput
  }

  export type PartUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    quantity: number
    createdAt?: Date | string
    updatedAt?: Date | string
    repairs?: RepairPartUncheckedCreateNestedManyWithoutPartInput
  }

  export type PartUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    repairs?: RepairPartUpdateManyWithoutPartNestedInput
  }

  export type PartUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    repairs?: RepairPartUncheckedUpdateManyWithoutPartNestedInput
  }

  export type PartCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    quantity: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PartUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PartUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RepairPartCreateInput = {
    id?: string
    quantity: number
    createdAt?: Date | string
    updatedAt?: Date | string
    repair: BicycleRepairCreateNestedOneWithoutPartsUsedInput
    part: PartCreateNestedOneWithoutRepairsInput
  }

  export type RepairPartUncheckedCreateInput = {
    id?: string
    repairId: string
    partId: string
    quantity: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RepairPartUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    repair?: BicycleRepairUpdateOneRequiredWithoutPartsUsedNestedInput
    part?: PartUpdateOneRequiredWithoutRepairsNestedInput
  }

  export type RepairPartUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    repairId?: StringFieldUpdateOperationsInput | string
    partId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RepairPartCreateManyInput = {
    id?: string
    repairId: string
    partId: string
    quantity: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RepairPartUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RepairPartUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    repairId?: StringFieldUpdateOperationsInput | string
    partId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BicycleRentalCreateInput = {
    id?: string
    renterName: string
    renterPhone: string
    renterEmail?: string | null
    bicycleId: string
    startDate: Date | string
    endDate: Date | string
    actualReturnDate?: Date | string | null
    status?: $Enums.RentalStatus
    notes?: string | null
    signature?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BicycleRentalUncheckedCreateInput = {
    id?: string
    renterName: string
    renterPhone: string
    renterEmail?: string | null
    bicycleId: string
    startDate: Date | string
    endDate: Date | string
    actualReturnDate?: Date | string | null
    status?: $Enums.RentalStatus
    notes?: string | null
    signature?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BicycleRentalUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    renterName?: StringFieldUpdateOperationsInput | string
    renterPhone?: StringFieldUpdateOperationsInput | string
    renterEmail?: NullableStringFieldUpdateOperationsInput | string | null
    bicycleId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    actualReturnDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumRentalStatusFieldUpdateOperationsInput | $Enums.RentalStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BicycleRentalUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    renterName?: StringFieldUpdateOperationsInput | string
    renterPhone?: StringFieldUpdateOperationsInput | string
    renterEmail?: NullableStringFieldUpdateOperationsInput | string | null
    bicycleId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    actualReturnDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumRentalStatusFieldUpdateOperationsInput | $Enums.RentalStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BicycleRentalCreateManyInput = {
    id?: string
    renterName: string
    renterPhone: string
    renterEmail?: string | null
    bicycleId: string
    startDate: Date | string
    endDate: Date | string
    actualReturnDate?: Date | string | null
    status?: $Enums.RentalStatus
    notes?: string | null
    signature?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BicycleRentalUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    renterName?: StringFieldUpdateOperationsInput | string
    renterPhone?: StringFieldUpdateOperationsInput | string
    renterEmail?: NullableStringFieldUpdateOperationsInput | string | null
    bicycleId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    actualReturnDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumRentalStatusFieldUpdateOperationsInput | $Enums.RentalStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BicycleRentalUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    renterName?: StringFieldUpdateOperationsInput | string
    renterPhone?: StringFieldUpdateOperationsInput | string
    renterEmail?: NullableStringFieldUpdateOperationsInput | string | null
    bicycleId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    actualReturnDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumRentalStatusFieldUpdateOperationsInput | $Enums.RentalStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamMemberCreateInput = {
    id?: string
    familyName: string
    givenNames: string
    nationality: string
    photoPath?: string | null
    status?: $Enums.TeamMemberStatus
    startDate: Date | string
    endDate?: Date | string | null
    department: string
    email: string
    phone: string
    homeAddress?: string | null
    dateOfBirth: Date | string
    legalStatus: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeamMemberUncheckedCreateInput = {
    id?: string
    familyName: string
    givenNames: string
    nationality: string
    photoPath?: string | null
    status?: $Enums.TeamMemberStatus
    startDate: Date | string
    endDate?: Date | string | null
    department: string
    email: string
    phone: string
    homeAddress?: string | null
    dateOfBirth: Date | string
    legalStatus: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeamMemberUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    familyName?: StringFieldUpdateOperationsInput | string
    givenNames?: StringFieldUpdateOperationsInput | string
    nationality?: StringFieldUpdateOperationsInput | string
    photoPath?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTeamMemberStatusFieldUpdateOperationsInput | $Enums.TeamMemberStatus
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    department?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    homeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    legalStatus?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamMemberUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    familyName?: StringFieldUpdateOperationsInput | string
    givenNames?: StringFieldUpdateOperationsInput | string
    nationality?: StringFieldUpdateOperationsInput | string
    photoPath?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTeamMemberStatusFieldUpdateOperationsInput | $Enums.TeamMemberStatus
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    department?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    homeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    legalStatus?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamMemberCreateManyInput = {
    id?: string
    familyName: string
    givenNames: string
    nationality: string
    photoPath?: string | null
    status?: $Enums.TeamMemberStatus
    startDate: Date | string
    endDate?: Date | string | null
    department: string
    email: string
    phone: string
    homeAddress?: string | null
    dateOfBirth: Date | string
    legalStatus: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeamMemberUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    familyName?: StringFieldUpdateOperationsInput | string
    givenNames?: StringFieldUpdateOperationsInput | string
    nationality?: StringFieldUpdateOperationsInput | string
    photoPath?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTeamMemberStatusFieldUpdateOperationsInput | $Enums.TeamMemberStatus
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    department?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    homeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    legalStatus?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamMemberUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    familyName?: StringFieldUpdateOperationsInput | string
    givenNames?: StringFieldUpdateOperationsInput | string
    nationality?: StringFieldUpdateOperationsInput | string
    photoPath?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTeamMemberStatusFieldUpdateOperationsInput | $Enums.TeamMemberStatus
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    department?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    homeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    legalStatus?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ElectronicsRepairCreateInput = {
    id?: string
    repairId?: number
    customerName: string
    category: $Enums.ElectronicsCategory
    item?: string | null
    whatsapp?: string | null
    serialNumber?: string | null
    status?: $Enums.ElectronicsRepairStatus
    repairable?: boolean | null
    notes?: string | null
    photoPath?: string | null
    createdDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    repairer?: UserCreateNestedOneWithoutElectronicsRepairsInput
  }

  export type ElectronicsRepairUncheckedCreateInput = {
    id?: string
    repairId?: number
    customerName: string
    category: $Enums.ElectronicsCategory
    item?: string | null
    whatsapp?: string | null
    serialNumber?: string | null
    status?: $Enums.ElectronicsRepairStatus
    repairable?: boolean | null
    notes?: string | null
    photoPath?: string | null
    createdDate?: Date | string
    repairerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ElectronicsRepairUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    category?: EnumElectronicsCategoryFieldUpdateOperationsInput | $Enums.ElectronicsCategory
    item?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp?: NullableStringFieldUpdateOperationsInput | string | null
    serialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumElectronicsRepairStatusFieldUpdateOperationsInput | $Enums.ElectronicsRepairStatus
    repairable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photoPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    repairer?: UserUpdateOneWithoutElectronicsRepairsNestedInput
  }

  export type ElectronicsRepairUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    repairId?: IntFieldUpdateOperationsInput | number
    customerName?: StringFieldUpdateOperationsInput | string
    category?: EnumElectronicsCategoryFieldUpdateOperationsInput | $Enums.ElectronicsCategory
    item?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp?: NullableStringFieldUpdateOperationsInput | string | null
    serialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumElectronicsRepairStatusFieldUpdateOperationsInput | $Enums.ElectronicsRepairStatus
    repairable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photoPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    repairerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ElectronicsRepairCreateManyInput = {
    id?: string
    repairId?: number
    customerName: string
    category: $Enums.ElectronicsCategory
    item?: string | null
    whatsapp?: string | null
    serialNumber?: string | null
    status?: $Enums.ElectronicsRepairStatus
    repairable?: boolean | null
    notes?: string | null
    photoPath?: string | null
    createdDate?: Date | string
    repairerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ElectronicsRepairUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    category?: EnumElectronicsCategoryFieldUpdateOperationsInput | $Enums.ElectronicsCategory
    item?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp?: NullableStringFieldUpdateOperationsInput | string | null
    serialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumElectronicsRepairStatusFieldUpdateOperationsInput | $Enums.ElectronicsRepairStatus
    repairable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photoPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ElectronicsRepairUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    repairId?: IntFieldUpdateOperationsInput | number
    customerName?: StringFieldUpdateOperationsInput | string
    category?: EnumElectronicsCategoryFieldUpdateOperationsInput | $Enums.ElectronicsCategory
    item?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp?: NullableStringFieldUpdateOperationsInput | string | null
    serialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumElectronicsRepairStatusFieldUpdateOperationsInput | $Enums.ElectronicsRepairStatus
    repairable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photoPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    repairerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CarpentryProjectCreateInput = {
    id?: string
    date: Date | string
    acceptedBy?: string | null
    customerType?: $Enums.CarpentryCustomerType | null
    organizationName?: string | null
    customerName?: string | null
    phoneNumber?: string | null
    gender?: $Enums.CarpentryGender | null
    orderType?: $Enums.CarpentryOrderType | null
    timeNeeded?: number | null
    itemToRepair?: string | null
    problemDescription?: string | null
    projectDescription?: string | null
    materialCosts?: Decimal | DecimalJsLike | number | string | null
    paidByCustomer?: boolean | null
    photoPath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    assignedTo?: UserCreateNestedOneWithoutCarpentryProjectsInput
  }

  export type CarpentryProjectUncheckedCreateInput = {
    id?: string
    date: Date | string
    acceptedBy?: string | null
    customerType?: $Enums.CarpentryCustomerType | null
    organizationName?: string | null
    customerName?: string | null
    phoneNumber?: string | null
    gender?: $Enums.CarpentryGender | null
    orderType?: $Enums.CarpentryOrderType | null
    timeNeeded?: number | null
    itemToRepair?: string | null
    problemDescription?: string | null
    projectDescription?: string | null
    materialCosts?: Decimal | DecimalJsLike | number | string | null
    paidByCustomer?: boolean | null
    photoPath?: string | null
    assignedToId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CarpentryProjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedBy?: NullableStringFieldUpdateOperationsInput | string | null
    customerType?: NullableEnumCarpentryCustomerTypeFieldUpdateOperationsInput | $Enums.CarpentryCustomerType | null
    organizationName?: NullableStringFieldUpdateOperationsInput | string | null
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumCarpentryGenderFieldUpdateOperationsInput | $Enums.CarpentryGender | null
    orderType?: NullableEnumCarpentryOrderTypeFieldUpdateOperationsInput | $Enums.CarpentryOrderType | null
    timeNeeded?: NullableIntFieldUpdateOperationsInput | number | null
    itemToRepair?: NullableStringFieldUpdateOperationsInput | string | null
    problemDescription?: NullableStringFieldUpdateOperationsInput | string | null
    projectDescription?: NullableStringFieldUpdateOperationsInput | string | null
    materialCosts?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    paidByCustomer?: NullableBoolFieldUpdateOperationsInput | boolean | null
    photoPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedTo?: UserUpdateOneWithoutCarpentryProjectsNestedInput
  }

  export type CarpentryProjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedBy?: NullableStringFieldUpdateOperationsInput | string | null
    customerType?: NullableEnumCarpentryCustomerTypeFieldUpdateOperationsInput | $Enums.CarpentryCustomerType | null
    organizationName?: NullableStringFieldUpdateOperationsInput | string | null
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumCarpentryGenderFieldUpdateOperationsInput | $Enums.CarpentryGender | null
    orderType?: NullableEnumCarpentryOrderTypeFieldUpdateOperationsInput | $Enums.CarpentryOrderType | null
    timeNeeded?: NullableIntFieldUpdateOperationsInput | number | null
    itemToRepair?: NullableStringFieldUpdateOperationsInput | string | null
    problemDescription?: NullableStringFieldUpdateOperationsInput | string | null
    projectDescription?: NullableStringFieldUpdateOperationsInput | string | null
    materialCosts?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    paidByCustomer?: NullableBoolFieldUpdateOperationsInput | boolean | null
    photoPath?: NullableStringFieldUpdateOperationsInput | string | null
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CarpentryProjectCreateManyInput = {
    id?: string
    date: Date | string
    acceptedBy?: string | null
    customerType?: $Enums.CarpentryCustomerType | null
    organizationName?: string | null
    customerName?: string | null
    phoneNumber?: string | null
    gender?: $Enums.CarpentryGender | null
    orderType?: $Enums.CarpentryOrderType | null
    timeNeeded?: number | null
    itemToRepair?: string | null
    problemDescription?: string | null
    projectDescription?: string | null
    materialCosts?: Decimal | DecimalJsLike | number | string | null
    paidByCustomer?: boolean | null
    photoPath?: string | null
    assignedToId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CarpentryProjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedBy?: NullableStringFieldUpdateOperationsInput | string | null
    customerType?: NullableEnumCarpentryCustomerTypeFieldUpdateOperationsInput | $Enums.CarpentryCustomerType | null
    organizationName?: NullableStringFieldUpdateOperationsInput | string | null
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumCarpentryGenderFieldUpdateOperationsInput | $Enums.CarpentryGender | null
    orderType?: NullableEnumCarpentryOrderTypeFieldUpdateOperationsInput | $Enums.CarpentryOrderType | null
    timeNeeded?: NullableIntFieldUpdateOperationsInput | number | null
    itemToRepair?: NullableStringFieldUpdateOperationsInput | string | null
    problemDescription?: NullableStringFieldUpdateOperationsInput | string | null
    projectDescription?: NullableStringFieldUpdateOperationsInput | string | null
    materialCosts?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    paidByCustomer?: NullableBoolFieldUpdateOperationsInput | boolean | null
    photoPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CarpentryProjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedBy?: NullableStringFieldUpdateOperationsInput | string | null
    customerType?: NullableEnumCarpentryCustomerTypeFieldUpdateOperationsInput | $Enums.CarpentryCustomerType | null
    organizationName?: NullableStringFieldUpdateOperationsInput | string | null
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumCarpentryGenderFieldUpdateOperationsInput | $Enums.CarpentryGender | null
    orderType?: NullableEnumCarpentryOrderTypeFieldUpdateOperationsInput | $Enums.CarpentryOrderType | null
    timeNeeded?: NullableIntFieldUpdateOperationsInput | number | null
    itemToRepair?: NullableStringFieldUpdateOperationsInput | string | null
    problemDescription?: NullableStringFieldUpdateOperationsInput | string | null
    projectDescription?: NullableStringFieldUpdateOperationsInput | string | null
    materialCosts?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    paidByCustomer?: NullableBoolFieldUpdateOperationsInput | boolean | null
    photoPath?: NullableStringFieldUpdateOperationsInput | string | null
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type ElectronicsRepairListRelationFilter = {
    every?: ElectronicsRepairWhereInput
    some?: ElectronicsRepairWhereInput
    none?: ElectronicsRepairWhereInput
  }

  export type CarpentryProjectListRelationFilter = {
    every?: CarpentryProjectWhereInput
    some?: CarpentryProjectWhereInput
    none?: CarpentryProjectWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ElectronicsRepairOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CarpentryProjectOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelevanceInput = {
    fields: UserOrderByRelevanceFieldEnum | UserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    googleId?: SortOrder
    role?: SortOrder
    enabled?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    googleId?: SortOrder
    role?: SortOrder
    enabled?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    googleId?: SortOrder
    role?: SortOrder
    enabled?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ProblemTypeOrderByRelevanceInput = {
    fields: ProblemTypeOrderByRelevanceFieldEnum | ProblemTypeOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ProblemTypeCountOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
    label?: SortOrder
    image?: SortOrder
    index?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProblemTypeAvgOrderByAggregateInput = {
    index?: SortOrder
  }

  export type ProblemTypeMaxOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
    label?: SortOrder
    image?: SortOrder
    index?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProblemTypeMinOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
    label?: SortOrder
    image?: SortOrder
    index?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProblemTypeSumOrderByAggregateInput = {
    index?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EnumRepairStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RepairStatus | EnumRepairStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RepairStatus[]
    notIn?: $Enums.RepairStatus[]
    not?: NestedEnumRepairStatusFilter<$PrismaModel> | $Enums.RepairStatus
  }

  export type RepairPartListRelationFilter = {
    every?: RepairPartWhereInput
    some?: RepairPartWhereInput
    none?: RepairPartWhereInput
  }

  export type RepairPartOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BicycleRepairOrderByRelevanceInput = {
    fields: BicycleRepairOrderByRelevanceFieldEnum | BicycleRepairOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type BicycleRepairCountOrderByAggregateInput = {
    id?: SortOrder
    problemTypes?: SortOrder
    description?: SortOrder
    receivedDate?: SortOrder
    repairedDate?: SortOrder
    pickupDate?: SortOrder
    ownerPhone?: SortOrder
    status?: SortOrder
    photoPath?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BicycleRepairMaxOrderByAggregateInput = {
    id?: SortOrder
    problemTypes?: SortOrder
    description?: SortOrder
    receivedDate?: SortOrder
    repairedDate?: SortOrder
    pickupDate?: SortOrder
    ownerPhone?: SortOrder
    status?: SortOrder
    photoPath?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BicycleRepairMinOrderByAggregateInput = {
    id?: SortOrder
    problemTypes?: SortOrder
    description?: SortOrder
    receivedDate?: SortOrder
    repairedDate?: SortOrder
    pickupDate?: SortOrder
    ownerPhone?: SortOrder
    status?: SortOrder
    photoPath?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumRepairStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RepairStatus | EnumRepairStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RepairStatus[]
    notIn?: $Enums.RepairStatus[]
    not?: NestedEnumRepairStatusWithAggregatesFilter<$PrismaModel> | $Enums.RepairStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRepairStatusFilter<$PrismaModel>
    _max?: NestedEnumRepairStatusFilter<$PrismaModel>
  }

  export type PartOrderByRelevanceInput = {
    fields: PartOrderByRelevanceFieldEnum | PartOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PartCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    quantity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PartAvgOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type PartMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    quantity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PartMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    quantity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PartSumOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type BicycleRepairScalarRelationFilter = {
    is?: BicycleRepairWhereInput
    isNot?: BicycleRepairWhereInput
  }

  export type PartScalarRelationFilter = {
    is?: PartWhereInput
    isNot?: PartWhereInput
  }

  export type RepairPartOrderByRelevanceInput = {
    fields: RepairPartOrderByRelevanceFieldEnum | RepairPartOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type RepairPartRepairIdPartIdCompoundUniqueInput = {
    repairId: string
    partId: string
  }

  export type RepairPartCountOrderByAggregateInput = {
    id?: SortOrder
    repairId?: SortOrder
    partId?: SortOrder
    quantity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RepairPartAvgOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type RepairPartMaxOrderByAggregateInput = {
    id?: SortOrder
    repairId?: SortOrder
    partId?: SortOrder
    quantity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RepairPartMinOrderByAggregateInput = {
    id?: SortOrder
    repairId?: SortOrder
    partId?: SortOrder
    quantity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RepairPartSumOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type EnumRentalStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RentalStatus | EnumRentalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RentalStatus[]
    notIn?: $Enums.RentalStatus[]
    not?: NestedEnumRentalStatusFilter<$PrismaModel> | $Enums.RentalStatus
  }

  export type BicycleRentalOrderByRelevanceInput = {
    fields: BicycleRentalOrderByRelevanceFieldEnum | BicycleRentalOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type BicycleRentalCountOrderByAggregateInput = {
    id?: SortOrder
    renterName?: SortOrder
    renterPhone?: SortOrder
    renterEmail?: SortOrder
    bicycleId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    actualReturnDate?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    signature?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BicycleRentalMaxOrderByAggregateInput = {
    id?: SortOrder
    renterName?: SortOrder
    renterPhone?: SortOrder
    renterEmail?: SortOrder
    bicycleId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    actualReturnDate?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    signature?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BicycleRentalMinOrderByAggregateInput = {
    id?: SortOrder
    renterName?: SortOrder
    renterPhone?: SortOrder
    renterEmail?: SortOrder
    bicycleId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    actualReturnDate?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    signature?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumRentalStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RentalStatus | EnumRentalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RentalStatus[]
    notIn?: $Enums.RentalStatus[]
    not?: NestedEnumRentalStatusWithAggregatesFilter<$PrismaModel> | $Enums.RentalStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRentalStatusFilter<$PrismaModel>
    _max?: NestedEnumRentalStatusFilter<$PrismaModel>
  }

  export type EnumTeamMemberStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TeamMemberStatus | EnumTeamMemberStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TeamMemberStatus[]
    notIn?: $Enums.TeamMemberStatus[]
    not?: NestedEnumTeamMemberStatusFilter<$PrismaModel> | $Enums.TeamMemberStatus
  }

  export type TeamMemberOrderByRelevanceInput = {
    fields: TeamMemberOrderByRelevanceFieldEnum | TeamMemberOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type TeamMemberCountOrderByAggregateInput = {
    id?: SortOrder
    familyName?: SortOrder
    givenNames?: SortOrder
    nationality?: SortOrder
    photoPath?: SortOrder
    status?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    department?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    homeAddress?: SortOrder
    dateOfBirth?: SortOrder
    legalStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TeamMemberMaxOrderByAggregateInput = {
    id?: SortOrder
    familyName?: SortOrder
    givenNames?: SortOrder
    nationality?: SortOrder
    photoPath?: SortOrder
    status?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    department?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    homeAddress?: SortOrder
    dateOfBirth?: SortOrder
    legalStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TeamMemberMinOrderByAggregateInput = {
    id?: SortOrder
    familyName?: SortOrder
    givenNames?: SortOrder
    nationality?: SortOrder
    photoPath?: SortOrder
    status?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    department?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    homeAddress?: SortOrder
    dateOfBirth?: SortOrder
    legalStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumTeamMemberStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TeamMemberStatus | EnumTeamMemberStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TeamMemberStatus[]
    notIn?: $Enums.TeamMemberStatus[]
    not?: NestedEnumTeamMemberStatusWithAggregatesFilter<$PrismaModel> | $Enums.TeamMemberStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTeamMemberStatusFilter<$PrismaModel>
    _max?: NestedEnumTeamMemberStatusFilter<$PrismaModel>
  }

  export type EnumElectronicsCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.ElectronicsCategory | EnumElectronicsCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.ElectronicsCategory[]
    notIn?: $Enums.ElectronicsCategory[]
    not?: NestedEnumElectronicsCategoryFilter<$PrismaModel> | $Enums.ElectronicsCategory
  }

  export type EnumElectronicsRepairStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ElectronicsRepairStatus | EnumElectronicsRepairStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ElectronicsRepairStatus[]
    notIn?: $Enums.ElectronicsRepairStatus[]
    not?: NestedEnumElectronicsRepairStatusFilter<$PrismaModel> | $Enums.ElectronicsRepairStatus
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type ElectronicsRepairOrderByRelevanceInput = {
    fields: ElectronicsRepairOrderByRelevanceFieldEnum | ElectronicsRepairOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ElectronicsRepairCountOrderByAggregateInput = {
    id?: SortOrder
    repairId?: SortOrder
    customerName?: SortOrder
    category?: SortOrder
    item?: SortOrder
    whatsapp?: SortOrder
    serialNumber?: SortOrder
    status?: SortOrder
    repairable?: SortOrder
    notes?: SortOrder
    photoPath?: SortOrder
    createdDate?: SortOrder
    repairerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ElectronicsRepairAvgOrderByAggregateInput = {
    repairId?: SortOrder
  }

  export type ElectronicsRepairMaxOrderByAggregateInput = {
    id?: SortOrder
    repairId?: SortOrder
    customerName?: SortOrder
    category?: SortOrder
    item?: SortOrder
    whatsapp?: SortOrder
    serialNumber?: SortOrder
    status?: SortOrder
    repairable?: SortOrder
    notes?: SortOrder
    photoPath?: SortOrder
    createdDate?: SortOrder
    repairerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ElectronicsRepairMinOrderByAggregateInput = {
    id?: SortOrder
    repairId?: SortOrder
    customerName?: SortOrder
    category?: SortOrder
    item?: SortOrder
    whatsapp?: SortOrder
    serialNumber?: SortOrder
    status?: SortOrder
    repairable?: SortOrder
    notes?: SortOrder
    photoPath?: SortOrder
    createdDate?: SortOrder
    repairerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ElectronicsRepairSumOrderByAggregateInput = {
    repairId?: SortOrder
  }

  export type EnumElectronicsCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ElectronicsCategory | EnumElectronicsCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.ElectronicsCategory[]
    notIn?: $Enums.ElectronicsCategory[]
    not?: NestedEnumElectronicsCategoryWithAggregatesFilter<$PrismaModel> | $Enums.ElectronicsCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumElectronicsCategoryFilter<$PrismaModel>
    _max?: NestedEnumElectronicsCategoryFilter<$PrismaModel>
  }

  export type EnumElectronicsRepairStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ElectronicsRepairStatus | EnumElectronicsRepairStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ElectronicsRepairStatus[]
    notIn?: $Enums.ElectronicsRepairStatus[]
    not?: NestedEnumElectronicsRepairStatusWithAggregatesFilter<$PrismaModel> | $Enums.ElectronicsRepairStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumElectronicsRepairStatusFilter<$PrismaModel>
    _max?: NestedEnumElectronicsRepairStatusFilter<$PrismaModel>
  }

  export type EnumCarpentryCustomerTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.CarpentryCustomerType | EnumCarpentryCustomerTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.CarpentryCustomerType[] | null
    notIn?: $Enums.CarpentryCustomerType[] | null
    not?: NestedEnumCarpentryCustomerTypeNullableFilter<$PrismaModel> | $Enums.CarpentryCustomerType | null
  }

  export type EnumCarpentryGenderNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.CarpentryGender | EnumCarpentryGenderFieldRefInput<$PrismaModel> | null
    in?: $Enums.CarpentryGender[] | null
    notIn?: $Enums.CarpentryGender[] | null
    not?: NestedEnumCarpentryGenderNullableFilter<$PrismaModel> | $Enums.CarpentryGender | null
  }

  export type EnumCarpentryOrderTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.CarpentryOrderType | EnumCarpentryOrderTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.CarpentryOrderType[] | null
    notIn?: $Enums.CarpentryOrderType[] | null
    not?: NestedEnumCarpentryOrderTypeNullableFilter<$PrismaModel> | $Enums.CarpentryOrderType | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type CarpentryProjectOrderByRelevanceInput = {
    fields: CarpentryProjectOrderByRelevanceFieldEnum | CarpentryProjectOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type CarpentryProjectCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    acceptedBy?: SortOrder
    customerType?: SortOrder
    organizationName?: SortOrder
    customerName?: SortOrder
    phoneNumber?: SortOrder
    gender?: SortOrder
    orderType?: SortOrder
    timeNeeded?: SortOrder
    itemToRepair?: SortOrder
    problemDescription?: SortOrder
    projectDescription?: SortOrder
    materialCosts?: SortOrder
    paidByCustomer?: SortOrder
    photoPath?: SortOrder
    assignedToId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CarpentryProjectAvgOrderByAggregateInput = {
    timeNeeded?: SortOrder
    materialCosts?: SortOrder
  }

  export type CarpentryProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    acceptedBy?: SortOrder
    customerType?: SortOrder
    organizationName?: SortOrder
    customerName?: SortOrder
    phoneNumber?: SortOrder
    gender?: SortOrder
    orderType?: SortOrder
    timeNeeded?: SortOrder
    itemToRepair?: SortOrder
    problemDescription?: SortOrder
    projectDescription?: SortOrder
    materialCosts?: SortOrder
    paidByCustomer?: SortOrder
    photoPath?: SortOrder
    assignedToId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CarpentryProjectMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    acceptedBy?: SortOrder
    customerType?: SortOrder
    organizationName?: SortOrder
    customerName?: SortOrder
    phoneNumber?: SortOrder
    gender?: SortOrder
    orderType?: SortOrder
    timeNeeded?: SortOrder
    itemToRepair?: SortOrder
    problemDescription?: SortOrder
    projectDescription?: SortOrder
    materialCosts?: SortOrder
    paidByCustomer?: SortOrder
    photoPath?: SortOrder
    assignedToId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CarpentryProjectSumOrderByAggregateInput = {
    timeNeeded?: SortOrder
    materialCosts?: SortOrder
  }

  export type EnumCarpentryCustomerTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CarpentryCustomerType | EnumCarpentryCustomerTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.CarpentryCustomerType[] | null
    notIn?: $Enums.CarpentryCustomerType[] | null
    not?: NestedEnumCarpentryCustomerTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.CarpentryCustomerType | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumCarpentryCustomerTypeNullableFilter<$PrismaModel>
    _max?: NestedEnumCarpentryCustomerTypeNullableFilter<$PrismaModel>
  }

  export type EnumCarpentryGenderNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CarpentryGender | EnumCarpentryGenderFieldRefInput<$PrismaModel> | null
    in?: $Enums.CarpentryGender[] | null
    notIn?: $Enums.CarpentryGender[] | null
    not?: NestedEnumCarpentryGenderNullableWithAggregatesFilter<$PrismaModel> | $Enums.CarpentryGender | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumCarpentryGenderNullableFilter<$PrismaModel>
    _max?: NestedEnumCarpentryGenderNullableFilter<$PrismaModel>
  }

  export type EnumCarpentryOrderTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CarpentryOrderType | EnumCarpentryOrderTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.CarpentryOrderType[] | null
    notIn?: $Enums.CarpentryOrderType[] | null
    not?: NestedEnumCarpentryOrderTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.CarpentryOrderType | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumCarpentryOrderTypeNullableFilter<$PrismaModel>
    _max?: NestedEnumCarpentryOrderTypeNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type ElectronicsRepairCreateNestedManyWithoutRepairerInput = {
    create?: XOR<ElectronicsRepairCreateWithoutRepairerInput, ElectronicsRepairUncheckedCreateWithoutRepairerInput> | ElectronicsRepairCreateWithoutRepairerInput[] | ElectronicsRepairUncheckedCreateWithoutRepairerInput[]
    connectOrCreate?: ElectronicsRepairCreateOrConnectWithoutRepairerInput | ElectronicsRepairCreateOrConnectWithoutRepairerInput[]
    createMany?: ElectronicsRepairCreateManyRepairerInputEnvelope
    connect?: ElectronicsRepairWhereUniqueInput | ElectronicsRepairWhereUniqueInput[]
  }

  export type CarpentryProjectCreateNestedManyWithoutAssignedToInput = {
    create?: XOR<CarpentryProjectCreateWithoutAssignedToInput, CarpentryProjectUncheckedCreateWithoutAssignedToInput> | CarpentryProjectCreateWithoutAssignedToInput[] | CarpentryProjectUncheckedCreateWithoutAssignedToInput[]
    connectOrCreate?: CarpentryProjectCreateOrConnectWithoutAssignedToInput | CarpentryProjectCreateOrConnectWithoutAssignedToInput[]
    createMany?: CarpentryProjectCreateManyAssignedToInputEnvelope
    connect?: CarpentryProjectWhereUniqueInput | CarpentryProjectWhereUniqueInput[]
  }

  export type ElectronicsRepairUncheckedCreateNestedManyWithoutRepairerInput = {
    create?: XOR<ElectronicsRepairCreateWithoutRepairerInput, ElectronicsRepairUncheckedCreateWithoutRepairerInput> | ElectronicsRepairCreateWithoutRepairerInput[] | ElectronicsRepairUncheckedCreateWithoutRepairerInput[]
    connectOrCreate?: ElectronicsRepairCreateOrConnectWithoutRepairerInput | ElectronicsRepairCreateOrConnectWithoutRepairerInput[]
    createMany?: ElectronicsRepairCreateManyRepairerInputEnvelope
    connect?: ElectronicsRepairWhereUniqueInput | ElectronicsRepairWhereUniqueInput[]
  }

  export type CarpentryProjectUncheckedCreateNestedManyWithoutAssignedToInput = {
    create?: XOR<CarpentryProjectCreateWithoutAssignedToInput, CarpentryProjectUncheckedCreateWithoutAssignedToInput> | CarpentryProjectCreateWithoutAssignedToInput[] | CarpentryProjectUncheckedCreateWithoutAssignedToInput[]
    connectOrCreate?: CarpentryProjectCreateOrConnectWithoutAssignedToInput | CarpentryProjectCreateOrConnectWithoutAssignedToInput[]
    createMany?: CarpentryProjectCreateManyAssignedToInputEnvelope
    connect?: CarpentryProjectWhereUniqueInput | CarpentryProjectWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type ElectronicsRepairUpdateManyWithoutRepairerNestedInput = {
    create?: XOR<ElectronicsRepairCreateWithoutRepairerInput, ElectronicsRepairUncheckedCreateWithoutRepairerInput> | ElectronicsRepairCreateWithoutRepairerInput[] | ElectronicsRepairUncheckedCreateWithoutRepairerInput[]
    connectOrCreate?: ElectronicsRepairCreateOrConnectWithoutRepairerInput | ElectronicsRepairCreateOrConnectWithoutRepairerInput[]
    upsert?: ElectronicsRepairUpsertWithWhereUniqueWithoutRepairerInput | ElectronicsRepairUpsertWithWhereUniqueWithoutRepairerInput[]
    createMany?: ElectronicsRepairCreateManyRepairerInputEnvelope
    set?: ElectronicsRepairWhereUniqueInput | ElectronicsRepairWhereUniqueInput[]
    disconnect?: ElectronicsRepairWhereUniqueInput | ElectronicsRepairWhereUniqueInput[]
    delete?: ElectronicsRepairWhereUniqueInput | ElectronicsRepairWhereUniqueInput[]
    connect?: ElectronicsRepairWhereUniqueInput | ElectronicsRepairWhereUniqueInput[]
    update?: ElectronicsRepairUpdateWithWhereUniqueWithoutRepairerInput | ElectronicsRepairUpdateWithWhereUniqueWithoutRepairerInput[]
    updateMany?: ElectronicsRepairUpdateManyWithWhereWithoutRepairerInput | ElectronicsRepairUpdateManyWithWhereWithoutRepairerInput[]
    deleteMany?: ElectronicsRepairScalarWhereInput | ElectronicsRepairScalarWhereInput[]
  }

  export type CarpentryProjectUpdateManyWithoutAssignedToNestedInput = {
    create?: XOR<CarpentryProjectCreateWithoutAssignedToInput, CarpentryProjectUncheckedCreateWithoutAssignedToInput> | CarpentryProjectCreateWithoutAssignedToInput[] | CarpentryProjectUncheckedCreateWithoutAssignedToInput[]
    connectOrCreate?: CarpentryProjectCreateOrConnectWithoutAssignedToInput | CarpentryProjectCreateOrConnectWithoutAssignedToInput[]
    upsert?: CarpentryProjectUpsertWithWhereUniqueWithoutAssignedToInput | CarpentryProjectUpsertWithWhereUniqueWithoutAssignedToInput[]
    createMany?: CarpentryProjectCreateManyAssignedToInputEnvelope
    set?: CarpentryProjectWhereUniqueInput | CarpentryProjectWhereUniqueInput[]
    disconnect?: CarpentryProjectWhereUniqueInput | CarpentryProjectWhereUniqueInput[]
    delete?: CarpentryProjectWhereUniqueInput | CarpentryProjectWhereUniqueInput[]
    connect?: CarpentryProjectWhereUniqueInput | CarpentryProjectWhereUniqueInput[]
    update?: CarpentryProjectUpdateWithWhereUniqueWithoutAssignedToInput | CarpentryProjectUpdateWithWhereUniqueWithoutAssignedToInput[]
    updateMany?: CarpentryProjectUpdateManyWithWhereWithoutAssignedToInput | CarpentryProjectUpdateManyWithWhereWithoutAssignedToInput[]
    deleteMany?: CarpentryProjectScalarWhereInput | CarpentryProjectScalarWhereInput[]
  }

  export type ElectronicsRepairUncheckedUpdateManyWithoutRepairerNestedInput = {
    create?: XOR<ElectronicsRepairCreateWithoutRepairerInput, ElectronicsRepairUncheckedCreateWithoutRepairerInput> | ElectronicsRepairCreateWithoutRepairerInput[] | ElectronicsRepairUncheckedCreateWithoutRepairerInput[]
    connectOrCreate?: ElectronicsRepairCreateOrConnectWithoutRepairerInput | ElectronicsRepairCreateOrConnectWithoutRepairerInput[]
    upsert?: ElectronicsRepairUpsertWithWhereUniqueWithoutRepairerInput | ElectronicsRepairUpsertWithWhereUniqueWithoutRepairerInput[]
    createMany?: ElectronicsRepairCreateManyRepairerInputEnvelope
    set?: ElectronicsRepairWhereUniqueInput | ElectronicsRepairWhereUniqueInput[]
    disconnect?: ElectronicsRepairWhereUniqueInput | ElectronicsRepairWhereUniqueInput[]
    delete?: ElectronicsRepairWhereUniqueInput | ElectronicsRepairWhereUniqueInput[]
    connect?: ElectronicsRepairWhereUniqueInput | ElectronicsRepairWhereUniqueInput[]
    update?: ElectronicsRepairUpdateWithWhereUniqueWithoutRepairerInput | ElectronicsRepairUpdateWithWhereUniqueWithoutRepairerInput[]
    updateMany?: ElectronicsRepairUpdateManyWithWhereWithoutRepairerInput | ElectronicsRepairUpdateManyWithWhereWithoutRepairerInput[]
    deleteMany?: ElectronicsRepairScalarWhereInput | ElectronicsRepairScalarWhereInput[]
  }

  export type CarpentryProjectUncheckedUpdateManyWithoutAssignedToNestedInput = {
    create?: XOR<CarpentryProjectCreateWithoutAssignedToInput, CarpentryProjectUncheckedCreateWithoutAssignedToInput> | CarpentryProjectCreateWithoutAssignedToInput[] | CarpentryProjectUncheckedCreateWithoutAssignedToInput[]
    connectOrCreate?: CarpentryProjectCreateOrConnectWithoutAssignedToInput | CarpentryProjectCreateOrConnectWithoutAssignedToInput[]
    upsert?: CarpentryProjectUpsertWithWhereUniqueWithoutAssignedToInput | CarpentryProjectUpsertWithWhereUniqueWithoutAssignedToInput[]
    createMany?: CarpentryProjectCreateManyAssignedToInputEnvelope
    set?: CarpentryProjectWhereUniqueInput | CarpentryProjectWhereUniqueInput[]
    disconnect?: CarpentryProjectWhereUniqueInput | CarpentryProjectWhereUniqueInput[]
    delete?: CarpentryProjectWhereUniqueInput | CarpentryProjectWhereUniqueInput[]
    connect?: CarpentryProjectWhereUniqueInput | CarpentryProjectWhereUniqueInput[]
    update?: CarpentryProjectUpdateWithWhereUniqueWithoutAssignedToInput | CarpentryProjectUpdateWithWhereUniqueWithoutAssignedToInput[]
    updateMany?: CarpentryProjectUpdateManyWithWhereWithoutAssignedToInput | CarpentryProjectUpdateManyWithWhereWithoutAssignedToInput[]
    deleteMany?: CarpentryProjectScalarWhereInput | CarpentryProjectScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type RepairPartCreateNestedManyWithoutRepairInput = {
    create?: XOR<RepairPartCreateWithoutRepairInput, RepairPartUncheckedCreateWithoutRepairInput> | RepairPartCreateWithoutRepairInput[] | RepairPartUncheckedCreateWithoutRepairInput[]
    connectOrCreate?: RepairPartCreateOrConnectWithoutRepairInput | RepairPartCreateOrConnectWithoutRepairInput[]
    createMany?: RepairPartCreateManyRepairInputEnvelope
    connect?: RepairPartWhereUniqueInput | RepairPartWhereUniqueInput[]
  }

  export type RepairPartUncheckedCreateNestedManyWithoutRepairInput = {
    create?: XOR<RepairPartCreateWithoutRepairInput, RepairPartUncheckedCreateWithoutRepairInput> | RepairPartCreateWithoutRepairInput[] | RepairPartUncheckedCreateWithoutRepairInput[]
    connectOrCreate?: RepairPartCreateOrConnectWithoutRepairInput | RepairPartCreateOrConnectWithoutRepairInput[]
    createMany?: RepairPartCreateManyRepairInputEnvelope
    connect?: RepairPartWhereUniqueInput | RepairPartWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EnumRepairStatusFieldUpdateOperationsInput = {
    set?: $Enums.RepairStatus
  }

  export type RepairPartUpdateManyWithoutRepairNestedInput = {
    create?: XOR<RepairPartCreateWithoutRepairInput, RepairPartUncheckedCreateWithoutRepairInput> | RepairPartCreateWithoutRepairInput[] | RepairPartUncheckedCreateWithoutRepairInput[]
    connectOrCreate?: RepairPartCreateOrConnectWithoutRepairInput | RepairPartCreateOrConnectWithoutRepairInput[]
    upsert?: RepairPartUpsertWithWhereUniqueWithoutRepairInput | RepairPartUpsertWithWhereUniqueWithoutRepairInput[]
    createMany?: RepairPartCreateManyRepairInputEnvelope
    set?: RepairPartWhereUniqueInput | RepairPartWhereUniqueInput[]
    disconnect?: RepairPartWhereUniqueInput | RepairPartWhereUniqueInput[]
    delete?: RepairPartWhereUniqueInput | RepairPartWhereUniqueInput[]
    connect?: RepairPartWhereUniqueInput | RepairPartWhereUniqueInput[]
    update?: RepairPartUpdateWithWhereUniqueWithoutRepairInput | RepairPartUpdateWithWhereUniqueWithoutRepairInput[]
    updateMany?: RepairPartUpdateManyWithWhereWithoutRepairInput | RepairPartUpdateManyWithWhereWithoutRepairInput[]
    deleteMany?: RepairPartScalarWhereInput | RepairPartScalarWhereInput[]
  }

  export type RepairPartUncheckedUpdateManyWithoutRepairNestedInput = {
    create?: XOR<RepairPartCreateWithoutRepairInput, RepairPartUncheckedCreateWithoutRepairInput> | RepairPartCreateWithoutRepairInput[] | RepairPartUncheckedCreateWithoutRepairInput[]
    connectOrCreate?: RepairPartCreateOrConnectWithoutRepairInput | RepairPartCreateOrConnectWithoutRepairInput[]
    upsert?: RepairPartUpsertWithWhereUniqueWithoutRepairInput | RepairPartUpsertWithWhereUniqueWithoutRepairInput[]
    createMany?: RepairPartCreateManyRepairInputEnvelope
    set?: RepairPartWhereUniqueInput | RepairPartWhereUniqueInput[]
    disconnect?: RepairPartWhereUniqueInput | RepairPartWhereUniqueInput[]
    delete?: RepairPartWhereUniqueInput | RepairPartWhereUniqueInput[]
    connect?: RepairPartWhereUniqueInput | RepairPartWhereUniqueInput[]
    update?: RepairPartUpdateWithWhereUniqueWithoutRepairInput | RepairPartUpdateWithWhereUniqueWithoutRepairInput[]
    updateMany?: RepairPartUpdateManyWithWhereWithoutRepairInput | RepairPartUpdateManyWithWhereWithoutRepairInput[]
    deleteMany?: RepairPartScalarWhereInput | RepairPartScalarWhereInput[]
  }

  export type RepairPartCreateNestedManyWithoutPartInput = {
    create?: XOR<RepairPartCreateWithoutPartInput, RepairPartUncheckedCreateWithoutPartInput> | RepairPartCreateWithoutPartInput[] | RepairPartUncheckedCreateWithoutPartInput[]
    connectOrCreate?: RepairPartCreateOrConnectWithoutPartInput | RepairPartCreateOrConnectWithoutPartInput[]
    createMany?: RepairPartCreateManyPartInputEnvelope
    connect?: RepairPartWhereUniqueInput | RepairPartWhereUniqueInput[]
  }

  export type RepairPartUncheckedCreateNestedManyWithoutPartInput = {
    create?: XOR<RepairPartCreateWithoutPartInput, RepairPartUncheckedCreateWithoutPartInput> | RepairPartCreateWithoutPartInput[] | RepairPartUncheckedCreateWithoutPartInput[]
    connectOrCreate?: RepairPartCreateOrConnectWithoutPartInput | RepairPartCreateOrConnectWithoutPartInput[]
    createMany?: RepairPartCreateManyPartInputEnvelope
    connect?: RepairPartWhereUniqueInput | RepairPartWhereUniqueInput[]
  }

  export type RepairPartUpdateManyWithoutPartNestedInput = {
    create?: XOR<RepairPartCreateWithoutPartInput, RepairPartUncheckedCreateWithoutPartInput> | RepairPartCreateWithoutPartInput[] | RepairPartUncheckedCreateWithoutPartInput[]
    connectOrCreate?: RepairPartCreateOrConnectWithoutPartInput | RepairPartCreateOrConnectWithoutPartInput[]
    upsert?: RepairPartUpsertWithWhereUniqueWithoutPartInput | RepairPartUpsertWithWhereUniqueWithoutPartInput[]
    createMany?: RepairPartCreateManyPartInputEnvelope
    set?: RepairPartWhereUniqueInput | RepairPartWhereUniqueInput[]
    disconnect?: RepairPartWhereUniqueInput | RepairPartWhereUniqueInput[]
    delete?: RepairPartWhereUniqueInput | RepairPartWhereUniqueInput[]
    connect?: RepairPartWhereUniqueInput | RepairPartWhereUniqueInput[]
    update?: RepairPartUpdateWithWhereUniqueWithoutPartInput | RepairPartUpdateWithWhereUniqueWithoutPartInput[]
    updateMany?: RepairPartUpdateManyWithWhereWithoutPartInput | RepairPartUpdateManyWithWhereWithoutPartInput[]
    deleteMany?: RepairPartScalarWhereInput | RepairPartScalarWhereInput[]
  }

  export type RepairPartUncheckedUpdateManyWithoutPartNestedInput = {
    create?: XOR<RepairPartCreateWithoutPartInput, RepairPartUncheckedCreateWithoutPartInput> | RepairPartCreateWithoutPartInput[] | RepairPartUncheckedCreateWithoutPartInput[]
    connectOrCreate?: RepairPartCreateOrConnectWithoutPartInput | RepairPartCreateOrConnectWithoutPartInput[]
    upsert?: RepairPartUpsertWithWhereUniqueWithoutPartInput | RepairPartUpsertWithWhereUniqueWithoutPartInput[]
    createMany?: RepairPartCreateManyPartInputEnvelope
    set?: RepairPartWhereUniqueInput | RepairPartWhereUniqueInput[]
    disconnect?: RepairPartWhereUniqueInput | RepairPartWhereUniqueInput[]
    delete?: RepairPartWhereUniqueInput | RepairPartWhereUniqueInput[]
    connect?: RepairPartWhereUniqueInput | RepairPartWhereUniqueInput[]
    update?: RepairPartUpdateWithWhereUniqueWithoutPartInput | RepairPartUpdateWithWhereUniqueWithoutPartInput[]
    updateMany?: RepairPartUpdateManyWithWhereWithoutPartInput | RepairPartUpdateManyWithWhereWithoutPartInput[]
    deleteMany?: RepairPartScalarWhereInput | RepairPartScalarWhereInput[]
  }

  export type BicycleRepairCreateNestedOneWithoutPartsUsedInput = {
    create?: XOR<BicycleRepairCreateWithoutPartsUsedInput, BicycleRepairUncheckedCreateWithoutPartsUsedInput>
    connectOrCreate?: BicycleRepairCreateOrConnectWithoutPartsUsedInput
    connect?: BicycleRepairWhereUniqueInput
  }

  export type PartCreateNestedOneWithoutRepairsInput = {
    create?: XOR<PartCreateWithoutRepairsInput, PartUncheckedCreateWithoutRepairsInput>
    connectOrCreate?: PartCreateOrConnectWithoutRepairsInput
    connect?: PartWhereUniqueInput
  }

  export type BicycleRepairUpdateOneRequiredWithoutPartsUsedNestedInput = {
    create?: XOR<BicycleRepairCreateWithoutPartsUsedInput, BicycleRepairUncheckedCreateWithoutPartsUsedInput>
    connectOrCreate?: BicycleRepairCreateOrConnectWithoutPartsUsedInput
    upsert?: BicycleRepairUpsertWithoutPartsUsedInput
    connect?: BicycleRepairWhereUniqueInput
    update?: XOR<XOR<BicycleRepairUpdateToOneWithWhereWithoutPartsUsedInput, BicycleRepairUpdateWithoutPartsUsedInput>, BicycleRepairUncheckedUpdateWithoutPartsUsedInput>
  }

  export type PartUpdateOneRequiredWithoutRepairsNestedInput = {
    create?: XOR<PartCreateWithoutRepairsInput, PartUncheckedCreateWithoutRepairsInput>
    connectOrCreate?: PartCreateOrConnectWithoutRepairsInput
    upsert?: PartUpsertWithoutRepairsInput
    connect?: PartWhereUniqueInput
    update?: XOR<XOR<PartUpdateToOneWithWhereWithoutRepairsInput, PartUpdateWithoutRepairsInput>, PartUncheckedUpdateWithoutRepairsInput>
  }

  export type EnumRentalStatusFieldUpdateOperationsInput = {
    set?: $Enums.RentalStatus
  }

  export type EnumTeamMemberStatusFieldUpdateOperationsInput = {
    set?: $Enums.TeamMemberStatus
  }

  export type UserCreateNestedOneWithoutElectronicsRepairsInput = {
    create?: XOR<UserCreateWithoutElectronicsRepairsInput, UserUncheckedCreateWithoutElectronicsRepairsInput>
    connectOrCreate?: UserCreateOrConnectWithoutElectronicsRepairsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumElectronicsCategoryFieldUpdateOperationsInput = {
    set?: $Enums.ElectronicsCategory
  }

  export type EnumElectronicsRepairStatusFieldUpdateOperationsInput = {
    set?: $Enums.ElectronicsRepairStatus
  }

  export type UserUpdateOneWithoutElectronicsRepairsNestedInput = {
    create?: XOR<UserCreateWithoutElectronicsRepairsInput, UserUncheckedCreateWithoutElectronicsRepairsInput>
    connectOrCreate?: UserCreateOrConnectWithoutElectronicsRepairsInput
    upsert?: UserUpsertWithoutElectronicsRepairsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutElectronicsRepairsInput, UserUpdateWithoutElectronicsRepairsInput>, UserUncheckedUpdateWithoutElectronicsRepairsInput>
  }

  export type UserCreateNestedOneWithoutCarpentryProjectsInput = {
    create?: XOR<UserCreateWithoutCarpentryProjectsInput, UserUncheckedCreateWithoutCarpentryProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCarpentryProjectsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableEnumCarpentryCustomerTypeFieldUpdateOperationsInput = {
    set?: $Enums.CarpentryCustomerType | null
  }

  export type NullableEnumCarpentryGenderFieldUpdateOperationsInput = {
    set?: $Enums.CarpentryGender | null
  }

  export type NullableEnumCarpentryOrderTypeFieldUpdateOperationsInput = {
    set?: $Enums.CarpentryOrderType | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type UserUpdateOneWithoutCarpentryProjectsNestedInput = {
    create?: XOR<UserCreateWithoutCarpentryProjectsInput, UserUncheckedCreateWithoutCarpentryProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCarpentryProjectsInput
    upsert?: UserUpsertWithoutCarpentryProjectsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCarpentryProjectsInput, UserUpdateWithoutCarpentryProjectsInput>, UserUncheckedUpdateWithoutCarpentryProjectsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumRepairStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RepairStatus | EnumRepairStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RepairStatus[]
    notIn?: $Enums.RepairStatus[]
    not?: NestedEnumRepairStatusFilter<$PrismaModel> | $Enums.RepairStatus
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumRepairStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RepairStatus | EnumRepairStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RepairStatus[]
    notIn?: $Enums.RepairStatus[]
    not?: NestedEnumRepairStatusWithAggregatesFilter<$PrismaModel> | $Enums.RepairStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRepairStatusFilter<$PrismaModel>
    _max?: NestedEnumRepairStatusFilter<$PrismaModel>
  }

  export type NestedEnumRentalStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RentalStatus | EnumRentalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RentalStatus[]
    notIn?: $Enums.RentalStatus[]
    not?: NestedEnumRentalStatusFilter<$PrismaModel> | $Enums.RentalStatus
  }

  export type NestedEnumRentalStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RentalStatus | EnumRentalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RentalStatus[]
    notIn?: $Enums.RentalStatus[]
    not?: NestedEnumRentalStatusWithAggregatesFilter<$PrismaModel> | $Enums.RentalStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRentalStatusFilter<$PrismaModel>
    _max?: NestedEnumRentalStatusFilter<$PrismaModel>
  }

  export type NestedEnumTeamMemberStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TeamMemberStatus | EnumTeamMemberStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TeamMemberStatus[]
    notIn?: $Enums.TeamMemberStatus[]
    not?: NestedEnumTeamMemberStatusFilter<$PrismaModel> | $Enums.TeamMemberStatus
  }

  export type NestedEnumTeamMemberStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TeamMemberStatus | EnumTeamMemberStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TeamMemberStatus[]
    notIn?: $Enums.TeamMemberStatus[]
    not?: NestedEnumTeamMemberStatusWithAggregatesFilter<$PrismaModel> | $Enums.TeamMemberStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTeamMemberStatusFilter<$PrismaModel>
    _max?: NestedEnumTeamMemberStatusFilter<$PrismaModel>
  }

  export type NestedEnumElectronicsCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.ElectronicsCategory | EnumElectronicsCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.ElectronicsCategory[]
    notIn?: $Enums.ElectronicsCategory[]
    not?: NestedEnumElectronicsCategoryFilter<$PrismaModel> | $Enums.ElectronicsCategory
  }

  export type NestedEnumElectronicsRepairStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ElectronicsRepairStatus | EnumElectronicsRepairStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ElectronicsRepairStatus[]
    notIn?: $Enums.ElectronicsRepairStatus[]
    not?: NestedEnumElectronicsRepairStatusFilter<$PrismaModel> | $Enums.ElectronicsRepairStatus
  }

  export type NestedEnumElectronicsCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ElectronicsCategory | EnumElectronicsCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.ElectronicsCategory[]
    notIn?: $Enums.ElectronicsCategory[]
    not?: NestedEnumElectronicsCategoryWithAggregatesFilter<$PrismaModel> | $Enums.ElectronicsCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumElectronicsCategoryFilter<$PrismaModel>
    _max?: NestedEnumElectronicsCategoryFilter<$PrismaModel>
  }

  export type NestedEnumElectronicsRepairStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ElectronicsRepairStatus | EnumElectronicsRepairStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ElectronicsRepairStatus[]
    notIn?: $Enums.ElectronicsRepairStatus[]
    not?: NestedEnumElectronicsRepairStatusWithAggregatesFilter<$PrismaModel> | $Enums.ElectronicsRepairStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumElectronicsRepairStatusFilter<$PrismaModel>
    _max?: NestedEnumElectronicsRepairStatusFilter<$PrismaModel>
  }

  export type NestedEnumCarpentryCustomerTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.CarpentryCustomerType | EnumCarpentryCustomerTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.CarpentryCustomerType[] | null
    notIn?: $Enums.CarpentryCustomerType[] | null
    not?: NestedEnumCarpentryCustomerTypeNullableFilter<$PrismaModel> | $Enums.CarpentryCustomerType | null
  }

  export type NestedEnumCarpentryGenderNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.CarpentryGender | EnumCarpentryGenderFieldRefInput<$PrismaModel> | null
    in?: $Enums.CarpentryGender[] | null
    notIn?: $Enums.CarpentryGender[] | null
    not?: NestedEnumCarpentryGenderNullableFilter<$PrismaModel> | $Enums.CarpentryGender | null
  }

  export type NestedEnumCarpentryOrderTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.CarpentryOrderType | EnumCarpentryOrderTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.CarpentryOrderType[] | null
    notIn?: $Enums.CarpentryOrderType[] | null
    not?: NestedEnumCarpentryOrderTypeNullableFilter<$PrismaModel> | $Enums.CarpentryOrderType | null
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedEnumCarpentryCustomerTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CarpentryCustomerType | EnumCarpentryCustomerTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.CarpentryCustomerType[] | null
    notIn?: $Enums.CarpentryCustomerType[] | null
    not?: NestedEnumCarpentryCustomerTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.CarpentryCustomerType | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumCarpentryCustomerTypeNullableFilter<$PrismaModel>
    _max?: NestedEnumCarpentryCustomerTypeNullableFilter<$PrismaModel>
  }

  export type NestedEnumCarpentryGenderNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CarpentryGender | EnumCarpentryGenderFieldRefInput<$PrismaModel> | null
    in?: $Enums.CarpentryGender[] | null
    notIn?: $Enums.CarpentryGender[] | null
    not?: NestedEnumCarpentryGenderNullableWithAggregatesFilter<$PrismaModel> | $Enums.CarpentryGender | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumCarpentryGenderNullableFilter<$PrismaModel>
    _max?: NestedEnumCarpentryGenderNullableFilter<$PrismaModel>
  }

  export type NestedEnumCarpentryOrderTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CarpentryOrderType | EnumCarpentryOrderTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.CarpentryOrderType[] | null
    notIn?: $Enums.CarpentryOrderType[] | null
    not?: NestedEnumCarpentryOrderTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.CarpentryOrderType | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumCarpentryOrderTypeNullableFilter<$PrismaModel>
    _max?: NestedEnumCarpentryOrderTypeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type ElectronicsRepairCreateWithoutRepairerInput = {
    id?: string
    repairId?: number
    customerName: string
    category: $Enums.ElectronicsCategory
    item?: string | null
    whatsapp?: string | null
    serialNumber?: string | null
    status?: $Enums.ElectronicsRepairStatus
    repairable?: boolean | null
    notes?: string | null
    photoPath?: string | null
    createdDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ElectronicsRepairUncheckedCreateWithoutRepairerInput = {
    id?: string
    repairId?: number
    customerName: string
    category: $Enums.ElectronicsCategory
    item?: string | null
    whatsapp?: string | null
    serialNumber?: string | null
    status?: $Enums.ElectronicsRepairStatus
    repairable?: boolean | null
    notes?: string | null
    photoPath?: string | null
    createdDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ElectronicsRepairCreateOrConnectWithoutRepairerInput = {
    where: ElectronicsRepairWhereUniqueInput
    create: XOR<ElectronicsRepairCreateWithoutRepairerInput, ElectronicsRepairUncheckedCreateWithoutRepairerInput>
  }

  export type ElectronicsRepairCreateManyRepairerInputEnvelope = {
    data: ElectronicsRepairCreateManyRepairerInput | ElectronicsRepairCreateManyRepairerInput[]
    skipDuplicates?: boolean
  }

  export type CarpentryProjectCreateWithoutAssignedToInput = {
    id?: string
    date: Date | string
    acceptedBy?: string | null
    customerType?: $Enums.CarpentryCustomerType | null
    organizationName?: string | null
    customerName?: string | null
    phoneNumber?: string | null
    gender?: $Enums.CarpentryGender | null
    orderType?: $Enums.CarpentryOrderType | null
    timeNeeded?: number | null
    itemToRepair?: string | null
    problemDescription?: string | null
    projectDescription?: string | null
    materialCosts?: Decimal | DecimalJsLike | number | string | null
    paidByCustomer?: boolean | null
    photoPath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CarpentryProjectUncheckedCreateWithoutAssignedToInput = {
    id?: string
    date: Date | string
    acceptedBy?: string | null
    customerType?: $Enums.CarpentryCustomerType | null
    organizationName?: string | null
    customerName?: string | null
    phoneNumber?: string | null
    gender?: $Enums.CarpentryGender | null
    orderType?: $Enums.CarpentryOrderType | null
    timeNeeded?: number | null
    itemToRepair?: string | null
    problemDescription?: string | null
    projectDescription?: string | null
    materialCosts?: Decimal | DecimalJsLike | number | string | null
    paidByCustomer?: boolean | null
    photoPath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CarpentryProjectCreateOrConnectWithoutAssignedToInput = {
    where: CarpentryProjectWhereUniqueInput
    create: XOR<CarpentryProjectCreateWithoutAssignedToInput, CarpentryProjectUncheckedCreateWithoutAssignedToInput>
  }

  export type CarpentryProjectCreateManyAssignedToInputEnvelope = {
    data: CarpentryProjectCreateManyAssignedToInput | CarpentryProjectCreateManyAssignedToInput[]
    skipDuplicates?: boolean
  }

  export type ElectronicsRepairUpsertWithWhereUniqueWithoutRepairerInput = {
    where: ElectronicsRepairWhereUniqueInput
    update: XOR<ElectronicsRepairUpdateWithoutRepairerInput, ElectronicsRepairUncheckedUpdateWithoutRepairerInput>
    create: XOR<ElectronicsRepairCreateWithoutRepairerInput, ElectronicsRepairUncheckedCreateWithoutRepairerInput>
  }

  export type ElectronicsRepairUpdateWithWhereUniqueWithoutRepairerInput = {
    where: ElectronicsRepairWhereUniqueInput
    data: XOR<ElectronicsRepairUpdateWithoutRepairerInput, ElectronicsRepairUncheckedUpdateWithoutRepairerInput>
  }

  export type ElectronicsRepairUpdateManyWithWhereWithoutRepairerInput = {
    where: ElectronicsRepairScalarWhereInput
    data: XOR<ElectronicsRepairUpdateManyMutationInput, ElectronicsRepairUncheckedUpdateManyWithoutRepairerInput>
  }

  export type ElectronicsRepairScalarWhereInput = {
    AND?: ElectronicsRepairScalarWhereInput | ElectronicsRepairScalarWhereInput[]
    OR?: ElectronicsRepairScalarWhereInput[]
    NOT?: ElectronicsRepairScalarWhereInput | ElectronicsRepairScalarWhereInput[]
    id?: StringFilter<"ElectronicsRepair"> | string
    repairId?: IntFilter<"ElectronicsRepair"> | number
    customerName?: StringFilter<"ElectronicsRepair"> | string
    category?: EnumElectronicsCategoryFilter<"ElectronicsRepair"> | $Enums.ElectronicsCategory
    item?: StringNullableFilter<"ElectronicsRepair"> | string | null
    whatsapp?: StringNullableFilter<"ElectronicsRepair"> | string | null
    serialNumber?: StringNullableFilter<"ElectronicsRepair"> | string | null
    status?: EnumElectronicsRepairStatusFilter<"ElectronicsRepair"> | $Enums.ElectronicsRepairStatus
    repairable?: BoolNullableFilter<"ElectronicsRepair"> | boolean | null
    notes?: StringNullableFilter<"ElectronicsRepair"> | string | null
    photoPath?: StringNullableFilter<"ElectronicsRepair"> | string | null
    createdDate?: DateTimeFilter<"ElectronicsRepair"> | Date | string
    repairerId?: StringNullableFilter<"ElectronicsRepair"> | string | null
    createdAt?: DateTimeFilter<"ElectronicsRepair"> | Date | string
    updatedAt?: DateTimeFilter<"ElectronicsRepair"> | Date | string
  }

  export type CarpentryProjectUpsertWithWhereUniqueWithoutAssignedToInput = {
    where: CarpentryProjectWhereUniqueInput
    update: XOR<CarpentryProjectUpdateWithoutAssignedToInput, CarpentryProjectUncheckedUpdateWithoutAssignedToInput>
    create: XOR<CarpentryProjectCreateWithoutAssignedToInput, CarpentryProjectUncheckedCreateWithoutAssignedToInput>
  }

  export type CarpentryProjectUpdateWithWhereUniqueWithoutAssignedToInput = {
    where: CarpentryProjectWhereUniqueInput
    data: XOR<CarpentryProjectUpdateWithoutAssignedToInput, CarpentryProjectUncheckedUpdateWithoutAssignedToInput>
  }

  export type CarpentryProjectUpdateManyWithWhereWithoutAssignedToInput = {
    where: CarpentryProjectScalarWhereInput
    data: XOR<CarpentryProjectUpdateManyMutationInput, CarpentryProjectUncheckedUpdateManyWithoutAssignedToInput>
  }

  export type CarpentryProjectScalarWhereInput = {
    AND?: CarpentryProjectScalarWhereInput | CarpentryProjectScalarWhereInput[]
    OR?: CarpentryProjectScalarWhereInput[]
    NOT?: CarpentryProjectScalarWhereInput | CarpentryProjectScalarWhereInput[]
    id?: StringFilter<"CarpentryProject"> | string
    date?: DateTimeFilter<"CarpentryProject"> | Date | string
    acceptedBy?: StringNullableFilter<"CarpentryProject"> | string | null
    customerType?: EnumCarpentryCustomerTypeNullableFilter<"CarpentryProject"> | $Enums.CarpentryCustomerType | null
    organizationName?: StringNullableFilter<"CarpentryProject"> | string | null
    customerName?: StringNullableFilter<"CarpentryProject"> | string | null
    phoneNumber?: StringNullableFilter<"CarpentryProject"> | string | null
    gender?: EnumCarpentryGenderNullableFilter<"CarpentryProject"> | $Enums.CarpentryGender | null
    orderType?: EnumCarpentryOrderTypeNullableFilter<"CarpentryProject"> | $Enums.CarpentryOrderType | null
    timeNeeded?: IntNullableFilter<"CarpentryProject"> | number | null
    itemToRepair?: StringNullableFilter<"CarpentryProject"> | string | null
    problemDescription?: StringNullableFilter<"CarpentryProject"> | string | null
    projectDescription?: StringNullableFilter<"CarpentryProject"> | string | null
    materialCosts?: DecimalNullableFilter<"CarpentryProject"> | Decimal | DecimalJsLike | number | string | null
    paidByCustomer?: BoolNullableFilter<"CarpentryProject"> | boolean | null
    photoPath?: StringNullableFilter<"CarpentryProject"> | string | null
    assignedToId?: StringNullableFilter<"CarpentryProject"> | string | null
    createdAt?: DateTimeFilter<"CarpentryProject"> | Date | string
    updatedAt?: DateTimeFilter<"CarpentryProject"> | Date | string
  }

  export type RepairPartCreateWithoutRepairInput = {
    id?: string
    quantity: number
    createdAt?: Date | string
    updatedAt?: Date | string
    part: PartCreateNestedOneWithoutRepairsInput
  }

  export type RepairPartUncheckedCreateWithoutRepairInput = {
    id?: string
    partId: string
    quantity: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RepairPartCreateOrConnectWithoutRepairInput = {
    where: RepairPartWhereUniqueInput
    create: XOR<RepairPartCreateWithoutRepairInput, RepairPartUncheckedCreateWithoutRepairInput>
  }

  export type RepairPartCreateManyRepairInputEnvelope = {
    data: RepairPartCreateManyRepairInput | RepairPartCreateManyRepairInput[]
    skipDuplicates?: boolean
  }

  export type RepairPartUpsertWithWhereUniqueWithoutRepairInput = {
    where: RepairPartWhereUniqueInput
    update: XOR<RepairPartUpdateWithoutRepairInput, RepairPartUncheckedUpdateWithoutRepairInput>
    create: XOR<RepairPartCreateWithoutRepairInput, RepairPartUncheckedCreateWithoutRepairInput>
  }

  export type RepairPartUpdateWithWhereUniqueWithoutRepairInput = {
    where: RepairPartWhereUniqueInput
    data: XOR<RepairPartUpdateWithoutRepairInput, RepairPartUncheckedUpdateWithoutRepairInput>
  }

  export type RepairPartUpdateManyWithWhereWithoutRepairInput = {
    where: RepairPartScalarWhereInput
    data: XOR<RepairPartUpdateManyMutationInput, RepairPartUncheckedUpdateManyWithoutRepairInput>
  }

  export type RepairPartScalarWhereInput = {
    AND?: RepairPartScalarWhereInput | RepairPartScalarWhereInput[]
    OR?: RepairPartScalarWhereInput[]
    NOT?: RepairPartScalarWhereInput | RepairPartScalarWhereInput[]
    id?: StringFilter<"RepairPart"> | string
    repairId?: StringFilter<"RepairPart"> | string
    partId?: StringFilter<"RepairPart"> | string
    quantity?: IntFilter<"RepairPart"> | number
    createdAt?: DateTimeFilter<"RepairPart"> | Date | string
    updatedAt?: DateTimeFilter<"RepairPart"> | Date | string
  }

  export type RepairPartCreateWithoutPartInput = {
    id?: string
    quantity: number
    createdAt?: Date | string
    updatedAt?: Date | string
    repair: BicycleRepairCreateNestedOneWithoutPartsUsedInput
  }

  export type RepairPartUncheckedCreateWithoutPartInput = {
    id?: string
    repairId: string
    quantity: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RepairPartCreateOrConnectWithoutPartInput = {
    where: RepairPartWhereUniqueInput
    create: XOR<RepairPartCreateWithoutPartInput, RepairPartUncheckedCreateWithoutPartInput>
  }

  export type RepairPartCreateManyPartInputEnvelope = {
    data: RepairPartCreateManyPartInput | RepairPartCreateManyPartInput[]
    skipDuplicates?: boolean
  }

  export type RepairPartUpsertWithWhereUniqueWithoutPartInput = {
    where: RepairPartWhereUniqueInput
    update: XOR<RepairPartUpdateWithoutPartInput, RepairPartUncheckedUpdateWithoutPartInput>
    create: XOR<RepairPartCreateWithoutPartInput, RepairPartUncheckedCreateWithoutPartInput>
  }

  export type RepairPartUpdateWithWhereUniqueWithoutPartInput = {
    where: RepairPartWhereUniqueInput
    data: XOR<RepairPartUpdateWithoutPartInput, RepairPartUncheckedUpdateWithoutPartInput>
  }

  export type RepairPartUpdateManyWithWhereWithoutPartInput = {
    where: RepairPartScalarWhereInput
    data: XOR<RepairPartUpdateManyMutationInput, RepairPartUncheckedUpdateManyWithoutPartInput>
  }

  export type BicycleRepairCreateWithoutPartsUsedInput = {
    id?: string
    problemTypes?: string
    description: string
    receivedDate: Date | string
    repairedDate?: Date | string | null
    pickupDate?: Date | string | null
    ownerPhone: string
    status?: $Enums.RepairStatus
    photoPath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BicycleRepairUncheckedCreateWithoutPartsUsedInput = {
    id?: string
    problemTypes?: string
    description: string
    receivedDate: Date | string
    repairedDate?: Date | string | null
    pickupDate?: Date | string | null
    ownerPhone: string
    status?: $Enums.RepairStatus
    photoPath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BicycleRepairCreateOrConnectWithoutPartsUsedInput = {
    where: BicycleRepairWhereUniqueInput
    create: XOR<BicycleRepairCreateWithoutPartsUsedInput, BicycleRepairUncheckedCreateWithoutPartsUsedInput>
  }

  export type PartCreateWithoutRepairsInput = {
    id?: string
    name: string
    description?: string | null
    quantity: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PartUncheckedCreateWithoutRepairsInput = {
    id?: string
    name: string
    description?: string | null
    quantity: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PartCreateOrConnectWithoutRepairsInput = {
    where: PartWhereUniqueInput
    create: XOR<PartCreateWithoutRepairsInput, PartUncheckedCreateWithoutRepairsInput>
  }

  export type BicycleRepairUpsertWithoutPartsUsedInput = {
    update: XOR<BicycleRepairUpdateWithoutPartsUsedInput, BicycleRepairUncheckedUpdateWithoutPartsUsedInput>
    create: XOR<BicycleRepairCreateWithoutPartsUsedInput, BicycleRepairUncheckedCreateWithoutPartsUsedInput>
    where?: BicycleRepairWhereInput
  }

  export type BicycleRepairUpdateToOneWithWhereWithoutPartsUsedInput = {
    where?: BicycleRepairWhereInput
    data: XOR<BicycleRepairUpdateWithoutPartsUsedInput, BicycleRepairUncheckedUpdateWithoutPartsUsedInput>
  }

  export type BicycleRepairUpdateWithoutPartsUsedInput = {
    id?: StringFieldUpdateOperationsInput | string
    problemTypes?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    receivedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    repairedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pickupDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownerPhone?: StringFieldUpdateOperationsInput | string
    status?: EnumRepairStatusFieldUpdateOperationsInput | $Enums.RepairStatus
    photoPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BicycleRepairUncheckedUpdateWithoutPartsUsedInput = {
    id?: StringFieldUpdateOperationsInput | string
    problemTypes?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    receivedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    repairedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pickupDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownerPhone?: StringFieldUpdateOperationsInput | string
    status?: EnumRepairStatusFieldUpdateOperationsInput | $Enums.RepairStatus
    photoPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PartUpsertWithoutRepairsInput = {
    update: XOR<PartUpdateWithoutRepairsInput, PartUncheckedUpdateWithoutRepairsInput>
    create: XOR<PartCreateWithoutRepairsInput, PartUncheckedCreateWithoutRepairsInput>
    where?: PartWhereInput
  }

  export type PartUpdateToOneWithWhereWithoutRepairsInput = {
    where?: PartWhereInput
    data: XOR<PartUpdateWithoutRepairsInput, PartUncheckedUpdateWithoutRepairsInput>
  }

  export type PartUpdateWithoutRepairsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PartUncheckedUpdateWithoutRepairsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutElectronicsRepairsInput = {
    id?: string
    email?: string | null
    googleId: string
    role?: string | null
    enabled?: boolean | null
    carpentryProjects?: CarpentryProjectCreateNestedManyWithoutAssignedToInput
  }

  export type UserUncheckedCreateWithoutElectronicsRepairsInput = {
    id?: string
    email?: string | null
    googleId: string
    role?: string | null
    enabled?: boolean | null
    carpentryProjects?: CarpentryProjectUncheckedCreateNestedManyWithoutAssignedToInput
  }

  export type UserCreateOrConnectWithoutElectronicsRepairsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutElectronicsRepairsInput, UserUncheckedCreateWithoutElectronicsRepairsInput>
  }

  export type UserUpsertWithoutElectronicsRepairsInput = {
    update: XOR<UserUpdateWithoutElectronicsRepairsInput, UserUncheckedUpdateWithoutElectronicsRepairsInput>
    create: XOR<UserCreateWithoutElectronicsRepairsInput, UserUncheckedCreateWithoutElectronicsRepairsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutElectronicsRepairsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutElectronicsRepairsInput, UserUncheckedUpdateWithoutElectronicsRepairsInput>
  }

  export type UserUpdateWithoutElectronicsRepairsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    enabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    carpentryProjects?: CarpentryProjectUpdateManyWithoutAssignedToNestedInput
  }

  export type UserUncheckedUpdateWithoutElectronicsRepairsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    enabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    carpentryProjects?: CarpentryProjectUncheckedUpdateManyWithoutAssignedToNestedInput
  }

  export type UserCreateWithoutCarpentryProjectsInput = {
    id?: string
    email?: string | null
    googleId: string
    role?: string | null
    enabled?: boolean | null
    electronicsRepairs?: ElectronicsRepairCreateNestedManyWithoutRepairerInput
  }

  export type UserUncheckedCreateWithoutCarpentryProjectsInput = {
    id?: string
    email?: string | null
    googleId: string
    role?: string | null
    enabled?: boolean | null
    electronicsRepairs?: ElectronicsRepairUncheckedCreateNestedManyWithoutRepairerInput
  }

  export type UserCreateOrConnectWithoutCarpentryProjectsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCarpentryProjectsInput, UserUncheckedCreateWithoutCarpentryProjectsInput>
  }

  export type UserUpsertWithoutCarpentryProjectsInput = {
    update: XOR<UserUpdateWithoutCarpentryProjectsInput, UserUncheckedUpdateWithoutCarpentryProjectsInput>
    create: XOR<UserCreateWithoutCarpentryProjectsInput, UserUncheckedCreateWithoutCarpentryProjectsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCarpentryProjectsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCarpentryProjectsInput, UserUncheckedUpdateWithoutCarpentryProjectsInput>
  }

  export type UserUpdateWithoutCarpentryProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    enabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    electronicsRepairs?: ElectronicsRepairUpdateManyWithoutRepairerNestedInput
  }

  export type UserUncheckedUpdateWithoutCarpentryProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    enabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    electronicsRepairs?: ElectronicsRepairUncheckedUpdateManyWithoutRepairerNestedInput
  }

  export type ElectronicsRepairCreateManyRepairerInput = {
    id?: string
    repairId?: number
    customerName: string
    category: $Enums.ElectronicsCategory
    item?: string | null
    whatsapp?: string | null
    serialNumber?: string | null
    status?: $Enums.ElectronicsRepairStatus
    repairable?: boolean | null
    notes?: string | null
    photoPath?: string | null
    createdDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CarpentryProjectCreateManyAssignedToInput = {
    id?: string
    date: Date | string
    acceptedBy?: string | null
    customerType?: $Enums.CarpentryCustomerType | null
    organizationName?: string | null
    customerName?: string | null
    phoneNumber?: string | null
    gender?: $Enums.CarpentryGender | null
    orderType?: $Enums.CarpentryOrderType | null
    timeNeeded?: number | null
    itemToRepair?: string | null
    problemDescription?: string | null
    projectDescription?: string | null
    materialCosts?: Decimal | DecimalJsLike | number | string | null
    paidByCustomer?: boolean | null
    photoPath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ElectronicsRepairUpdateWithoutRepairerInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    category?: EnumElectronicsCategoryFieldUpdateOperationsInput | $Enums.ElectronicsCategory
    item?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp?: NullableStringFieldUpdateOperationsInput | string | null
    serialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumElectronicsRepairStatusFieldUpdateOperationsInput | $Enums.ElectronicsRepairStatus
    repairable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photoPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ElectronicsRepairUncheckedUpdateWithoutRepairerInput = {
    id?: StringFieldUpdateOperationsInput | string
    repairId?: IntFieldUpdateOperationsInput | number
    customerName?: StringFieldUpdateOperationsInput | string
    category?: EnumElectronicsCategoryFieldUpdateOperationsInput | $Enums.ElectronicsCategory
    item?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp?: NullableStringFieldUpdateOperationsInput | string | null
    serialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumElectronicsRepairStatusFieldUpdateOperationsInput | $Enums.ElectronicsRepairStatus
    repairable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photoPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ElectronicsRepairUncheckedUpdateManyWithoutRepairerInput = {
    id?: StringFieldUpdateOperationsInput | string
    repairId?: IntFieldUpdateOperationsInput | number
    customerName?: StringFieldUpdateOperationsInput | string
    category?: EnumElectronicsCategoryFieldUpdateOperationsInput | $Enums.ElectronicsCategory
    item?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp?: NullableStringFieldUpdateOperationsInput | string | null
    serialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumElectronicsRepairStatusFieldUpdateOperationsInput | $Enums.ElectronicsRepairStatus
    repairable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photoPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CarpentryProjectUpdateWithoutAssignedToInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedBy?: NullableStringFieldUpdateOperationsInput | string | null
    customerType?: NullableEnumCarpentryCustomerTypeFieldUpdateOperationsInput | $Enums.CarpentryCustomerType | null
    organizationName?: NullableStringFieldUpdateOperationsInput | string | null
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumCarpentryGenderFieldUpdateOperationsInput | $Enums.CarpentryGender | null
    orderType?: NullableEnumCarpentryOrderTypeFieldUpdateOperationsInput | $Enums.CarpentryOrderType | null
    timeNeeded?: NullableIntFieldUpdateOperationsInput | number | null
    itemToRepair?: NullableStringFieldUpdateOperationsInput | string | null
    problemDescription?: NullableStringFieldUpdateOperationsInput | string | null
    projectDescription?: NullableStringFieldUpdateOperationsInput | string | null
    materialCosts?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    paidByCustomer?: NullableBoolFieldUpdateOperationsInput | boolean | null
    photoPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CarpentryProjectUncheckedUpdateWithoutAssignedToInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedBy?: NullableStringFieldUpdateOperationsInput | string | null
    customerType?: NullableEnumCarpentryCustomerTypeFieldUpdateOperationsInput | $Enums.CarpentryCustomerType | null
    organizationName?: NullableStringFieldUpdateOperationsInput | string | null
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumCarpentryGenderFieldUpdateOperationsInput | $Enums.CarpentryGender | null
    orderType?: NullableEnumCarpentryOrderTypeFieldUpdateOperationsInput | $Enums.CarpentryOrderType | null
    timeNeeded?: NullableIntFieldUpdateOperationsInput | number | null
    itemToRepair?: NullableStringFieldUpdateOperationsInput | string | null
    problemDescription?: NullableStringFieldUpdateOperationsInput | string | null
    projectDescription?: NullableStringFieldUpdateOperationsInput | string | null
    materialCosts?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    paidByCustomer?: NullableBoolFieldUpdateOperationsInput | boolean | null
    photoPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CarpentryProjectUncheckedUpdateManyWithoutAssignedToInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedBy?: NullableStringFieldUpdateOperationsInput | string | null
    customerType?: NullableEnumCarpentryCustomerTypeFieldUpdateOperationsInput | $Enums.CarpentryCustomerType | null
    organizationName?: NullableStringFieldUpdateOperationsInput | string | null
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumCarpentryGenderFieldUpdateOperationsInput | $Enums.CarpentryGender | null
    orderType?: NullableEnumCarpentryOrderTypeFieldUpdateOperationsInput | $Enums.CarpentryOrderType | null
    timeNeeded?: NullableIntFieldUpdateOperationsInput | number | null
    itemToRepair?: NullableStringFieldUpdateOperationsInput | string | null
    problemDescription?: NullableStringFieldUpdateOperationsInput | string | null
    projectDescription?: NullableStringFieldUpdateOperationsInput | string | null
    materialCosts?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    paidByCustomer?: NullableBoolFieldUpdateOperationsInput | boolean | null
    photoPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RepairPartCreateManyRepairInput = {
    id?: string
    partId: string
    quantity: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RepairPartUpdateWithoutRepairInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    part?: PartUpdateOneRequiredWithoutRepairsNestedInput
  }

  export type RepairPartUncheckedUpdateWithoutRepairInput = {
    id?: StringFieldUpdateOperationsInput | string
    partId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RepairPartUncheckedUpdateManyWithoutRepairInput = {
    id?: StringFieldUpdateOperationsInput | string
    partId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RepairPartCreateManyPartInput = {
    id?: string
    repairId: string
    quantity: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RepairPartUpdateWithoutPartInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    repair?: BicycleRepairUpdateOneRequiredWithoutPartsUsedNestedInput
  }

  export type RepairPartUncheckedUpdateWithoutPartInput = {
    id?: StringFieldUpdateOperationsInput | string
    repairId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RepairPartUncheckedUpdateManyWithoutPartInput = {
    id?: StringFieldUpdateOperationsInput | string
    repairId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}