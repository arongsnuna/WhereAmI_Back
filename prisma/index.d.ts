
/**
 * Client
**/

import * as runtime from './runtime/library';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions

export type PrismaPromise<T> = $Public.PrismaPromise<T>


export type AreaPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "Area"
  objects: {
    Landmark: LandmarkPayload<ExtArgs>[]
  }
  scalars: $Extensions.GetResult<{
    id: number
    siDo: string
    siGu: string
  }, ExtArgs["result"]["area"]>
  composites: {}
}

/**
 * Model Area
 * 
 */
export type Area = runtime.Types.DefaultSelection<AreaPayload>
export type LandmarkPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "Landmark"
  objects: {
    Area: AreaPayload<ExtArgs>
  }
  scalars: $Extensions.GetResult<{
    id: number
    name: string
    address: string
    imagePath: string
    areaId: number
  }, ExtArgs["result"]["landmark"]>
  composites: {}
}

/**
 * Model Landmark
 * 
 */
export type Landmark = runtime.Types.DefaultSelection<LandmarkPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Areas
 * const areas = await prisma.area.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Areas
   * const areas = await prisma.area.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => Promise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<R>


  $extends: $Extensions.ExtendsHook<'extends', Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.area`: Exposes CRUD operations for the **Area** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Areas
    * const areas = await prisma.area.findMany()
    * ```
    */
  get area(): Prisma.AreaDelegate<ExtArgs>;

  /**
   * `prisma.landmark`: Exposes CRUD operations for the **Landmark** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Landmarks
    * const landmarks = await prisma.landmark.findMany()
    * ```
    */
  get landmark(): Prisma.LandmarkDelegate<ExtArgs>;
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
  export import NotFoundError = runtime.NotFoundError

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
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export type Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export type Args<T, F extends $Public.Operation> = $Public.Args<T, F>
  export type Payload<T, F extends $Public.Operation> = $Public.Payload<T, F>
  export type Result<T, A, F extends $Public.Operation> = $Public.Result<T, A, F>
  export type Exact<T, W> = $Public.Exact<T, W>

  /**
   * Prisma Client JS version: 5.0.0
   * Query Engine version: 6b0aef69b7cdfc787f822ecd7cdc76d5f1991584
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

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
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

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
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
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
    Area: 'Area',
    Landmark: 'Landmark'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }


  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.Args}, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs']>
  }

  export type TypeMap<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    meta: {
      modelProps: 'area' | 'landmark'
      txIsolationLevel: Prisma.TransactionIsolationLevel
    },
    model: {
      Area: {
        payload: AreaPayload<ExtArgs>
        fields: Prisma.AreaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AreaFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AreaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AreaFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AreaPayload>
          }
          findFirst: {
            args: Prisma.AreaFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AreaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AreaFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AreaPayload>
          }
          findMany: {
            args: Prisma.AreaFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AreaPayload>[]
          }
          create: {
            args: Prisma.AreaCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AreaPayload>
          }
          createMany: {
            args: Prisma.AreaCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.AreaDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AreaPayload>
          }
          update: {
            args: Prisma.AreaUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AreaPayload>
          }
          deleteMany: {
            args: Prisma.AreaDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.AreaUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.AreaUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AreaPayload>
          }
          aggregate: {
            args: Prisma.AreaAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateArea>
          }
          groupBy: {
            args: Prisma.AreaGroupByArgs<ExtArgs>,
            result: $Utils.Optional<AreaGroupByOutputType>[]
          }
          count: {
            args: Prisma.AreaCountArgs<ExtArgs>,
            result: $Utils.Optional<AreaCountAggregateOutputType> | number
          }
        }
      }
      Landmark: {
        payload: LandmarkPayload<ExtArgs>
        fields: Prisma.LandmarkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LandmarkFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<LandmarkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LandmarkFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<LandmarkPayload>
          }
          findFirst: {
            args: Prisma.LandmarkFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<LandmarkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LandmarkFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<LandmarkPayload>
          }
          findMany: {
            args: Prisma.LandmarkFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<LandmarkPayload>[]
          }
          create: {
            args: Prisma.LandmarkCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<LandmarkPayload>
          }
          createMany: {
            args: Prisma.LandmarkCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.LandmarkDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<LandmarkPayload>
          }
          update: {
            args: Prisma.LandmarkUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<LandmarkPayload>
          }
          deleteMany: {
            args: Prisma.LandmarkDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.LandmarkUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.LandmarkUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<LandmarkPayload>
          }
          aggregate: {
            args: Prisma.LandmarkAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateLandmark>
          }
          groupBy: {
            args: Prisma.LandmarkGroupByArgs<ExtArgs>,
            result: $Utils.Optional<LandmarkGroupByOutputType>[]
          }
          count: {
            args: Prisma.LandmarkCountArgs<ExtArgs>,
            result: $Utils.Optional<LandmarkCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<'define', Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

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
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

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
   * Count Type AreaCountOutputType
   */


  export type AreaCountOutputType = {
    Landmark: number
  }

  export type AreaCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    Landmark?: boolean | AreaCountOutputTypeCountLandmarkArgs
  }

  // Custom InputTypes

  /**
   * AreaCountOutputType without action
   */
  export type AreaCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AreaCountOutputType
     */
    select?: AreaCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * AreaCountOutputType without action
   */
  export type AreaCountOutputTypeCountLandmarkArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: LandmarkWhereInput
  }



  /**
   * Models
   */

  /**
   * Model Area
   */


  export type AggregateArea = {
    _count: AreaCountAggregateOutputType | null
    _avg: AreaAvgAggregateOutputType | null
    _sum: AreaSumAggregateOutputType | null
    _min: AreaMinAggregateOutputType | null
    _max: AreaMaxAggregateOutputType | null
  }

  export type AreaAvgAggregateOutputType = {
    id: number | null
  }

  export type AreaSumAggregateOutputType = {
    id: number | null
  }

  export type AreaMinAggregateOutputType = {
    id: number | null
    siDo: string | null
    siGu: string | null
  }

  export type AreaMaxAggregateOutputType = {
    id: number | null
    siDo: string | null
    siGu: string | null
  }

  export type AreaCountAggregateOutputType = {
    id: number
    siDo: number
    siGu: number
    _all: number
  }


  export type AreaAvgAggregateInputType = {
    id?: true
  }

  export type AreaSumAggregateInputType = {
    id?: true
  }

  export type AreaMinAggregateInputType = {
    id?: true
    siDo?: true
    siGu?: true
  }

  export type AreaMaxAggregateInputType = {
    id?: true
    siDo?: true
    siGu?: true
  }

  export type AreaCountAggregateInputType = {
    id?: true
    siDo?: true
    siGu?: true
    _all?: true
  }

  export type AreaAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Area to aggregate.
     */
    where?: AreaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Areas to fetch.
     */
    orderBy?: AreaOrderByWithRelationInput | AreaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AreaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Areas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Areas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Areas
    **/
    _count?: true | AreaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AreaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AreaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AreaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AreaMaxAggregateInputType
  }

  export type GetAreaAggregateType<T extends AreaAggregateArgs> = {
        [P in keyof T & keyof AggregateArea]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArea[P]>
      : GetScalarType<T[P], AggregateArea[P]>
  }




  export type AreaGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: AreaWhereInput
    orderBy?: AreaOrderByWithAggregationInput | AreaOrderByWithAggregationInput[]
    by: AreaScalarFieldEnum[] | AreaScalarFieldEnum
    having?: AreaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AreaCountAggregateInputType | true
    _avg?: AreaAvgAggregateInputType
    _sum?: AreaSumAggregateInputType
    _min?: AreaMinAggregateInputType
    _max?: AreaMaxAggregateInputType
  }


  export type AreaGroupByOutputType = {
    id: number
    siDo: string
    siGu: string
    _count: AreaCountAggregateOutputType | null
    _avg: AreaAvgAggregateOutputType | null
    _sum: AreaSumAggregateOutputType | null
    _min: AreaMinAggregateOutputType | null
    _max: AreaMaxAggregateOutputType | null
  }

  type GetAreaGroupByPayload<T extends AreaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AreaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AreaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AreaGroupByOutputType[P]>
            : GetScalarType<T[P], AreaGroupByOutputType[P]>
        }
      >
    >


  export type AreaSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    siDo?: boolean
    siGu?: boolean
    Landmark?: boolean | Area$LandmarkArgs<ExtArgs>
    _count?: boolean | AreaCountOutputTypeArgs<ExtArgs>
  }, ExtArgs["result"]["area"]>

  export type AreaSelectScalar = {
    id?: boolean
    siDo?: boolean
    siGu?: boolean
  }

  export type AreaInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    Landmark?: boolean | Area$LandmarkArgs<ExtArgs>
    _count?: boolean | AreaCountOutputTypeArgs<ExtArgs>
  }


  type AreaGetPayload<S extends boolean | null | undefined | AreaArgs> = $Types.GetResult<AreaPayload, S>

  type AreaCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<AreaFindManyArgs, 'select' | 'include'> & {
      select?: AreaCountAggregateInputType | true
    }

  export interface AreaDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Area'], meta: { name: 'Area' } }
    /**
     * Find zero or one Area that matches the filter.
     * @param {AreaFindUniqueArgs} args - Arguments to find a Area
     * @example
     * // Get one Area
     * const area = await prisma.area.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends AreaFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, AreaFindUniqueArgs<ExtArgs>>
    ): Prisma__AreaClient<$Types.GetResult<AreaPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Area that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {AreaFindUniqueOrThrowArgs} args - Arguments to find a Area
     * @example
     * // Get one Area
     * const area = await prisma.area.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends AreaFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, AreaFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__AreaClient<$Types.GetResult<AreaPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Area that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AreaFindFirstArgs} args - Arguments to find a Area
     * @example
     * // Get one Area
     * const area = await prisma.area.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends AreaFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, AreaFindFirstArgs<ExtArgs>>
    ): Prisma__AreaClient<$Types.GetResult<AreaPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Area that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AreaFindFirstOrThrowArgs} args - Arguments to find a Area
     * @example
     * // Get one Area
     * const area = await prisma.area.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends AreaFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, AreaFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__AreaClient<$Types.GetResult<AreaPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Areas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AreaFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Areas
     * const areas = await prisma.area.findMany()
     * 
     * // Get first 10 Areas
     * const areas = await prisma.area.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const areaWithIdOnly = await prisma.area.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends AreaFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, AreaFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<AreaPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Area.
     * @param {AreaCreateArgs} args - Arguments to create a Area.
     * @example
     * // Create one Area
     * const Area = await prisma.area.create({
     *   data: {
     *     // ... data to create a Area
     *   }
     * })
     * 
    **/
    create<T extends AreaCreateArgs<ExtArgs>>(
      args: SelectSubset<T, AreaCreateArgs<ExtArgs>>
    ): Prisma__AreaClient<$Types.GetResult<AreaPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Areas.
     *     @param {AreaCreateManyArgs} args - Arguments to create many Areas.
     *     @example
     *     // Create many Areas
     *     const area = await prisma.area.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends AreaCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, AreaCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Area.
     * @param {AreaDeleteArgs} args - Arguments to delete one Area.
     * @example
     * // Delete one Area
     * const Area = await prisma.area.delete({
     *   where: {
     *     // ... filter to delete one Area
     *   }
     * })
     * 
    **/
    delete<T extends AreaDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, AreaDeleteArgs<ExtArgs>>
    ): Prisma__AreaClient<$Types.GetResult<AreaPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Area.
     * @param {AreaUpdateArgs} args - Arguments to update one Area.
     * @example
     * // Update one Area
     * const area = await prisma.area.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends AreaUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, AreaUpdateArgs<ExtArgs>>
    ): Prisma__AreaClient<$Types.GetResult<AreaPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Areas.
     * @param {AreaDeleteManyArgs} args - Arguments to filter Areas to delete.
     * @example
     * // Delete a few Areas
     * const { count } = await prisma.area.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends AreaDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, AreaDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Areas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AreaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Areas
     * const area = await prisma.area.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends AreaUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, AreaUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Area.
     * @param {AreaUpsertArgs} args - Arguments to update or create a Area.
     * @example
     * // Update or create a Area
     * const area = await prisma.area.upsert({
     *   create: {
     *     // ... data to create a Area
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Area we want to update
     *   }
     * })
    **/
    upsert<T extends AreaUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, AreaUpsertArgs<ExtArgs>>
    ): Prisma__AreaClient<$Types.GetResult<AreaPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Areas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AreaCountArgs} args - Arguments to filter Areas to count.
     * @example
     * // Count the number of Areas
     * const count = await prisma.area.count({
     *   where: {
     *     // ... the filter for the Areas we want to count
     *   }
     * })
    **/
    count<T extends AreaCountArgs>(
      args?: Subset<T, AreaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AreaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Area.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AreaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AreaAggregateArgs>(args: Subset<T, AreaAggregateArgs>): Prisma.PrismaPromise<GetAreaAggregateType<T>>

    /**
     * Group by Area.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AreaGroupByArgs} args - Group by arguments.
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
      T extends AreaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AreaGroupByArgs['orderBy'] }
        : { orderBy?: AreaGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AreaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAreaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Area model
   */
  readonly fields: AreaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Area.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__AreaClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    Landmark<T extends Area$LandmarkArgs<ExtArgs> = {}>(args?: Subset<T, Area$LandmarkArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<LandmarkPayload<ExtArgs>, T, 'findMany'>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  /**
   * Fields of the Area model
   */ 
  interface AreaFieldRefs {
    readonly id: FieldRef<"Area", 'Int'>
    readonly siDo: FieldRef<"Area", 'String'>
    readonly siGu: FieldRef<"Area", 'String'>
  }
    

  // Custom InputTypes

  /**
   * Area findUnique
   */
  export type AreaFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Area
     */
    select?: AreaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AreaInclude<ExtArgs> | null
    /**
     * Filter, which Area to fetch.
     */
    where: AreaWhereUniqueInput
  }


  /**
   * Area findUniqueOrThrow
   */
  export type AreaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Area
     */
    select?: AreaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AreaInclude<ExtArgs> | null
    /**
     * Filter, which Area to fetch.
     */
    where: AreaWhereUniqueInput
  }


  /**
   * Area findFirst
   */
  export type AreaFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Area
     */
    select?: AreaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AreaInclude<ExtArgs> | null
    /**
     * Filter, which Area to fetch.
     */
    where?: AreaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Areas to fetch.
     */
    orderBy?: AreaOrderByWithRelationInput | AreaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Areas.
     */
    cursor?: AreaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Areas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Areas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Areas.
     */
    distinct?: AreaScalarFieldEnum | AreaScalarFieldEnum[]
  }


  /**
   * Area findFirstOrThrow
   */
  export type AreaFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Area
     */
    select?: AreaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AreaInclude<ExtArgs> | null
    /**
     * Filter, which Area to fetch.
     */
    where?: AreaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Areas to fetch.
     */
    orderBy?: AreaOrderByWithRelationInput | AreaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Areas.
     */
    cursor?: AreaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Areas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Areas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Areas.
     */
    distinct?: AreaScalarFieldEnum | AreaScalarFieldEnum[]
  }


  /**
   * Area findMany
   */
  export type AreaFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Area
     */
    select?: AreaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AreaInclude<ExtArgs> | null
    /**
     * Filter, which Areas to fetch.
     */
    where?: AreaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Areas to fetch.
     */
    orderBy?: AreaOrderByWithRelationInput | AreaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Areas.
     */
    cursor?: AreaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Areas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Areas.
     */
    skip?: number
    distinct?: AreaScalarFieldEnum | AreaScalarFieldEnum[]
  }


  /**
   * Area create
   */
  export type AreaCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Area
     */
    select?: AreaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AreaInclude<ExtArgs> | null
    /**
     * The data needed to create a Area.
     */
    data: XOR<AreaCreateInput, AreaUncheckedCreateInput>
  }


  /**
   * Area createMany
   */
  export type AreaCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Areas.
     */
    data: AreaCreateManyInput | AreaCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Area update
   */
  export type AreaUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Area
     */
    select?: AreaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AreaInclude<ExtArgs> | null
    /**
     * The data needed to update a Area.
     */
    data: XOR<AreaUpdateInput, AreaUncheckedUpdateInput>
    /**
     * Choose, which Area to update.
     */
    where: AreaWhereUniqueInput
  }


  /**
   * Area updateMany
   */
  export type AreaUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Areas.
     */
    data: XOR<AreaUpdateManyMutationInput, AreaUncheckedUpdateManyInput>
    /**
     * Filter which Areas to update
     */
    where?: AreaWhereInput
  }


  /**
   * Area upsert
   */
  export type AreaUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Area
     */
    select?: AreaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AreaInclude<ExtArgs> | null
    /**
     * The filter to search for the Area to update in case it exists.
     */
    where: AreaWhereUniqueInput
    /**
     * In case the Area found by the `where` argument doesn't exist, create a new Area with this data.
     */
    create: XOR<AreaCreateInput, AreaUncheckedCreateInput>
    /**
     * In case the Area was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AreaUpdateInput, AreaUncheckedUpdateInput>
  }


  /**
   * Area delete
   */
  export type AreaDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Area
     */
    select?: AreaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AreaInclude<ExtArgs> | null
    /**
     * Filter which Area to delete.
     */
    where: AreaWhereUniqueInput
  }


  /**
   * Area deleteMany
   */
  export type AreaDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Areas to delete
     */
    where?: AreaWhereInput
  }


  /**
   * Area.Landmark
   */
  export type Area$LandmarkArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Landmark
     */
    select?: LandmarkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: LandmarkInclude<ExtArgs> | null
    where?: LandmarkWhereInput
    orderBy?: LandmarkOrderByWithRelationInput | LandmarkOrderByWithRelationInput[]
    cursor?: LandmarkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LandmarkScalarFieldEnum | LandmarkScalarFieldEnum[]
  }


  /**
   * Area without action
   */
  export type AreaArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Area
     */
    select?: AreaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AreaInclude<ExtArgs> | null
  }



  /**
   * Model Landmark
   */


  export type AggregateLandmark = {
    _count: LandmarkCountAggregateOutputType | null
    _avg: LandmarkAvgAggregateOutputType | null
    _sum: LandmarkSumAggregateOutputType | null
    _min: LandmarkMinAggregateOutputType | null
    _max: LandmarkMaxAggregateOutputType | null
  }

  export type LandmarkAvgAggregateOutputType = {
    id: number | null
    areaId: number | null
  }

  export type LandmarkSumAggregateOutputType = {
    id: number | null
    areaId: number | null
  }

  export type LandmarkMinAggregateOutputType = {
    id: number | null
    name: string | null
    address: string | null
    imagePath: string | null
    areaId: number | null
  }

  export type LandmarkMaxAggregateOutputType = {
    id: number | null
    name: string | null
    address: string | null
    imagePath: string | null
    areaId: number | null
  }

  export type LandmarkCountAggregateOutputType = {
    id: number
    name: number
    address: number
    imagePath: number
    areaId: number
    _all: number
  }


  export type LandmarkAvgAggregateInputType = {
    id?: true
    areaId?: true
  }

  export type LandmarkSumAggregateInputType = {
    id?: true
    areaId?: true
  }

  export type LandmarkMinAggregateInputType = {
    id?: true
    name?: true
    address?: true
    imagePath?: true
    areaId?: true
  }

  export type LandmarkMaxAggregateInputType = {
    id?: true
    name?: true
    address?: true
    imagePath?: true
    areaId?: true
  }

  export type LandmarkCountAggregateInputType = {
    id?: true
    name?: true
    address?: true
    imagePath?: true
    areaId?: true
    _all?: true
  }

  export type LandmarkAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Landmark to aggregate.
     */
    where?: LandmarkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Landmarks to fetch.
     */
    orderBy?: LandmarkOrderByWithRelationInput | LandmarkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LandmarkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Landmarks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Landmarks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Landmarks
    **/
    _count?: true | LandmarkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LandmarkAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LandmarkSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LandmarkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LandmarkMaxAggregateInputType
  }

  export type GetLandmarkAggregateType<T extends LandmarkAggregateArgs> = {
        [P in keyof T & keyof AggregateLandmark]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLandmark[P]>
      : GetScalarType<T[P], AggregateLandmark[P]>
  }




  export type LandmarkGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: LandmarkWhereInput
    orderBy?: LandmarkOrderByWithAggregationInput | LandmarkOrderByWithAggregationInput[]
    by: LandmarkScalarFieldEnum[] | LandmarkScalarFieldEnum
    having?: LandmarkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LandmarkCountAggregateInputType | true
    _avg?: LandmarkAvgAggregateInputType
    _sum?: LandmarkSumAggregateInputType
    _min?: LandmarkMinAggregateInputType
    _max?: LandmarkMaxAggregateInputType
  }


  export type LandmarkGroupByOutputType = {
    id: number
    name: string
    address: string
    imagePath: string
    areaId: number
    _count: LandmarkCountAggregateOutputType | null
    _avg: LandmarkAvgAggregateOutputType | null
    _sum: LandmarkSumAggregateOutputType | null
    _min: LandmarkMinAggregateOutputType | null
    _max: LandmarkMaxAggregateOutputType | null
  }

  type GetLandmarkGroupByPayload<T extends LandmarkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LandmarkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LandmarkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LandmarkGroupByOutputType[P]>
            : GetScalarType<T[P], LandmarkGroupByOutputType[P]>
        }
      >
    >


  export type LandmarkSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    imagePath?: boolean
    areaId?: boolean
    Area?: boolean | AreaArgs<ExtArgs>
  }, ExtArgs["result"]["landmark"]>

  export type LandmarkSelectScalar = {
    id?: boolean
    name?: boolean
    address?: boolean
    imagePath?: boolean
    areaId?: boolean
  }

  export type LandmarkInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    Area?: boolean | AreaArgs<ExtArgs>
  }


  type LandmarkGetPayload<S extends boolean | null | undefined | LandmarkArgs> = $Types.GetResult<LandmarkPayload, S>

  type LandmarkCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<LandmarkFindManyArgs, 'select' | 'include'> & {
      select?: LandmarkCountAggregateInputType | true
    }

  export interface LandmarkDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Landmark'], meta: { name: 'Landmark' } }
    /**
     * Find zero or one Landmark that matches the filter.
     * @param {LandmarkFindUniqueArgs} args - Arguments to find a Landmark
     * @example
     * // Get one Landmark
     * const landmark = await prisma.landmark.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends LandmarkFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, LandmarkFindUniqueArgs<ExtArgs>>
    ): Prisma__LandmarkClient<$Types.GetResult<LandmarkPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Landmark that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {LandmarkFindUniqueOrThrowArgs} args - Arguments to find a Landmark
     * @example
     * // Get one Landmark
     * const landmark = await prisma.landmark.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends LandmarkFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, LandmarkFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__LandmarkClient<$Types.GetResult<LandmarkPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Landmark that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LandmarkFindFirstArgs} args - Arguments to find a Landmark
     * @example
     * // Get one Landmark
     * const landmark = await prisma.landmark.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends LandmarkFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, LandmarkFindFirstArgs<ExtArgs>>
    ): Prisma__LandmarkClient<$Types.GetResult<LandmarkPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Landmark that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LandmarkFindFirstOrThrowArgs} args - Arguments to find a Landmark
     * @example
     * // Get one Landmark
     * const landmark = await prisma.landmark.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends LandmarkFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, LandmarkFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__LandmarkClient<$Types.GetResult<LandmarkPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Landmarks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LandmarkFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Landmarks
     * const landmarks = await prisma.landmark.findMany()
     * 
     * // Get first 10 Landmarks
     * const landmarks = await prisma.landmark.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const landmarkWithIdOnly = await prisma.landmark.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends LandmarkFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, LandmarkFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<LandmarkPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Landmark.
     * @param {LandmarkCreateArgs} args - Arguments to create a Landmark.
     * @example
     * // Create one Landmark
     * const Landmark = await prisma.landmark.create({
     *   data: {
     *     // ... data to create a Landmark
     *   }
     * })
     * 
    **/
    create<T extends LandmarkCreateArgs<ExtArgs>>(
      args: SelectSubset<T, LandmarkCreateArgs<ExtArgs>>
    ): Prisma__LandmarkClient<$Types.GetResult<LandmarkPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Landmarks.
     *     @param {LandmarkCreateManyArgs} args - Arguments to create many Landmarks.
     *     @example
     *     // Create many Landmarks
     *     const landmark = await prisma.landmark.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends LandmarkCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, LandmarkCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Landmark.
     * @param {LandmarkDeleteArgs} args - Arguments to delete one Landmark.
     * @example
     * // Delete one Landmark
     * const Landmark = await prisma.landmark.delete({
     *   where: {
     *     // ... filter to delete one Landmark
     *   }
     * })
     * 
    **/
    delete<T extends LandmarkDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, LandmarkDeleteArgs<ExtArgs>>
    ): Prisma__LandmarkClient<$Types.GetResult<LandmarkPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Landmark.
     * @param {LandmarkUpdateArgs} args - Arguments to update one Landmark.
     * @example
     * // Update one Landmark
     * const landmark = await prisma.landmark.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends LandmarkUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, LandmarkUpdateArgs<ExtArgs>>
    ): Prisma__LandmarkClient<$Types.GetResult<LandmarkPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Landmarks.
     * @param {LandmarkDeleteManyArgs} args - Arguments to filter Landmarks to delete.
     * @example
     * // Delete a few Landmarks
     * const { count } = await prisma.landmark.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends LandmarkDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, LandmarkDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Landmarks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LandmarkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Landmarks
     * const landmark = await prisma.landmark.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends LandmarkUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, LandmarkUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Landmark.
     * @param {LandmarkUpsertArgs} args - Arguments to update or create a Landmark.
     * @example
     * // Update or create a Landmark
     * const landmark = await prisma.landmark.upsert({
     *   create: {
     *     // ... data to create a Landmark
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Landmark we want to update
     *   }
     * })
    **/
    upsert<T extends LandmarkUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, LandmarkUpsertArgs<ExtArgs>>
    ): Prisma__LandmarkClient<$Types.GetResult<LandmarkPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Landmarks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LandmarkCountArgs} args - Arguments to filter Landmarks to count.
     * @example
     * // Count the number of Landmarks
     * const count = await prisma.landmark.count({
     *   where: {
     *     // ... the filter for the Landmarks we want to count
     *   }
     * })
    **/
    count<T extends LandmarkCountArgs>(
      args?: Subset<T, LandmarkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LandmarkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Landmark.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LandmarkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LandmarkAggregateArgs>(args: Subset<T, LandmarkAggregateArgs>): Prisma.PrismaPromise<GetLandmarkAggregateType<T>>

    /**
     * Group by Landmark.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LandmarkGroupByArgs} args - Group by arguments.
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
      T extends LandmarkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LandmarkGroupByArgs['orderBy'] }
        : { orderBy?: LandmarkGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, LandmarkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLandmarkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Landmark model
   */
  readonly fields: LandmarkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Landmark.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__LandmarkClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    Area<T extends AreaArgs<ExtArgs> = {}>(args?: Subset<T, AreaArgs<ExtArgs>>): Prisma__AreaClient<$Types.GetResult<AreaPayload<ExtArgs>, T, 'findUnique'> | Null, never, ExtArgs>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  /**
   * Fields of the Landmark model
   */ 
  interface LandmarkFieldRefs {
    readonly id: FieldRef<"Landmark", 'Int'>
    readonly name: FieldRef<"Landmark", 'String'>
    readonly address: FieldRef<"Landmark", 'String'>
    readonly imagePath: FieldRef<"Landmark", 'String'>
    readonly areaId: FieldRef<"Landmark", 'Int'>
  }
    

  // Custom InputTypes

  /**
   * Landmark findUnique
   */
  export type LandmarkFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Landmark
     */
    select?: LandmarkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: LandmarkInclude<ExtArgs> | null
    /**
     * Filter, which Landmark to fetch.
     */
    where: LandmarkWhereUniqueInput
  }


  /**
   * Landmark findUniqueOrThrow
   */
  export type LandmarkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Landmark
     */
    select?: LandmarkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: LandmarkInclude<ExtArgs> | null
    /**
     * Filter, which Landmark to fetch.
     */
    where: LandmarkWhereUniqueInput
  }


  /**
   * Landmark findFirst
   */
  export type LandmarkFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Landmark
     */
    select?: LandmarkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: LandmarkInclude<ExtArgs> | null
    /**
     * Filter, which Landmark to fetch.
     */
    where?: LandmarkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Landmarks to fetch.
     */
    orderBy?: LandmarkOrderByWithRelationInput | LandmarkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Landmarks.
     */
    cursor?: LandmarkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Landmarks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Landmarks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Landmarks.
     */
    distinct?: LandmarkScalarFieldEnum | LandmarkScalarFieldEnum[]
  }


  /**
   * Landmark findFirstOrThrow
   */
  export type LandmarkFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Landmark
     */
    select?: LandmarkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: LandmarkInclude<ExtArgs> | null
    /**
     * Filter, which Landmark to fetch.
     */
    where?: LandmarkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Landmarks to fetch.
     */
    orderBy?: LandmarkOrderByWithRelationInput | LandmarkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Landmarks.
     */
    cursor?: LandmarkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Landmarks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Landmarks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Landmarks.
     */
    distinct?: LandmarkScalarFieldEnum | LandmarkScalarFieldEnum[]
  }


  /**
   * Landmark findMany
   */
  export type LandmarkFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Landmark
     */
    select?: LandmarkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: LandmarkInclude<ExtArgs> | null
    /**
     * Filter, which Landmarks to fetch.
     */
    where?: LandmarkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Landmarks to fetch.
     */
    orderBy?: LandmarkOrderByWithRelationInput | LandmarkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Landmarks.
     */
    cursor?: LandmarkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Landmarks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Landmarks.
     */
    skip?: number
    distinct?: LandmarkScalarFieldEnum | LandmarkScalarFieldEnum[]
  }


  /**
   * Landmark create
   */
  export type LandmarkCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Landmark
     */
    select?: LandmarkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: LandmarkInclude<ExtArgs> | null
    /**
     * The data needed to create a Landmark.
     */
    data: XOR<LandmarkCreateInput, LandmarkUncheckedCreateInput>
  }


  /**
   * Landmark createMany
   */
  export type LandmarkCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Landmarks.
     */
    data: LandmarkCreateManyInput | LandmarkCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Landmark update
   */
  export type LandmarkUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Landmark
     */
    select?: LandmarkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: LandmarkInclude<ExtArgs> | null
    /**
     * The data needed to update a Landmark.
     */
    data: XOR<LandmarkUpdateInput, LandmarkUncheckedUpdateInput>
    /**
     * Choose, which Landmark to update.
     */
    where: LandmarkWhereUniqueInput
  }


  /**
   * Landmark updateMany
   */
  export type LandmarkUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Landmarks.
     */
    data: XOR<LandmarkUpdateManyMutationInput, LandmarkUncheckedUpdateManyInput>
    /**
     * Filter which Landmarks to update
     */
    where?: LandmarkWhereInput
  }


  /**
   * Landmark upsert
   */
  export type LandmarkUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Landmark
     */
    select?: LandmarkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: LandmarkInclude<ExtArgs> | null
    /**
     * The filter to search for the Landmark to update in case it exists.
     */
    where: LandmarkWhereUniqueInput
    /**
     * In case the Landmark found by the `where` argument doesn't exist, create a new Landmark with this data.
     */
    create: XOR<LandmarkCreateInput, LandmarkUncheckedCreateInput>
    /**
     * In case the Landmark was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LandmarkUpdateInput, LandmarkUncheckedUpdateInput>
  }


  /**
   * Landmark delete
   */
  export type LandmarkDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Landmark
     */
    select?: LandmarkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: LandmarkInclude<ExtArgs> | null
    /**
     * Filter which Landmark to delete.
     */
    where: LandmarkWhereUniqueInput
  }


  /**
   * Landmark deleteMany
   */
  export type LandmarkDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Landmarks to delete
     */
    where?: LandmarkWhereInput
  }


  /**
   * Landmark without action
   */
  export type LandmarkArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Landmark
     */
    select?: LandmarkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: LandmarkInclude<ExtArgs> | null
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


  export const AreaScalarFieldEnum: {
    id: 'id',
    siDo: 'siDo',
    siGu: 'siGu'
  };

  export type AreaScalarFieldEnum = (typeof AreaScalarFieldEnum)[keyof typeof AreaScalarFieldEnum]


  export const LandmarkScalarFieldEnum: {
    id: 'id',
    name: 'name',
    address: 'address',
    imagePath: 'imagePath',
    areaId: 'areaId'
  };

  export type LandmarkScalarFieldEnum = (typeof LandmarkScalarFieldEnum)[keyof typeof LandmarkScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type AreaWhereInput = {
    AND?: AreaWhereInput | AreaWhereInput[]
    OR?: AreaWhereInput[]
    NOT?: AreaWhereInput | AreaWhereInput[]
    id?: IntFilter<"Area"> | number
    siDo?: StringFilter<"Area"> | string
    siGu?: StringFilter<"Area"> | string
    Landmark?: LandmarkListRelationFilter
  }

  export type AreaOrderByWithRelationInput = {
    id?: SortOrder
    siDo?: SortOrder
    siGu?: SortOrder
    Landmark?: LandmarkOrderByRelationAggregateInput
  }

  export type AreaWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    siDo?: string
    siGu?: string
    AND?: AreaWhereInput | AreaWhereInput[]
    OR?: AreaWhereInput[]
    NOT?: AreaWhereInput | AreaWhereInput[]
    Landmark?: LandmarkListRelationFilter
  }, "id" | "siDo" | "siGu">

  export type AreaOrderByWithAggregationInput = {
    id?: SortOrder
    siDo?: SortOrder
    siGu?: SortOrder
    _count?: AreaCountOrderByAggregateInput
    _avg?: AreaAvgOrderByAggregateInput
    _max?: AreaMaxOrderByAggregateInput
    _min?: AreaMinOrderByAggregateInput
    _sum?: AreaSumOrderByAggregateInput
  }

  export type AreaScalarWhereWithAggregatesInput = {
    AND?: AreaScalarWhereWithAggregatesInput | AreaScalarWhereWithAggregatesInput[]
    OR?: AreaScalarWhereWithAggregatesInput[]
    NOT?: AreaScalarWhereWithAggregatesInput | AreaScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Area"> | number
    siDo?: StringWithAggregatesFilter<"Area"> | string
    siGu?: StringWithAggregatesFilter<"Area"> | string
  }

  export type LandmarkWhereInput = {
    AND?: LandmarkWhereInput | LandmarkWhereInput[]
    OR?: LandmarkWhereInput[]
    NOT?: LandmarkWhereInput | LandmarkWhereInput[]
    id?: IntFilter<"Landmark"> | number
    name?: StringFilter<"Landmark"> | string
    address?: StringFilter<"Landmark"> | string
    imagePath?: StringFilter<"Landmark"> | string
    areaId?: IntFilter<"Landmark"> | number
    Area?: XOR<AreaRelationFilter, AreaWhereInput>
  }

  export type LandmarkOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    imagePath?: SortOrder
    areaId?: SortOrder
    Area?: AreaOrderByWithRelationInput
  }

  export type LandmarkWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: LandmarkWhereInput | LandmarkWhereInput[]
    OR?: LandmarkWhereInput[]
    NOT?: LandmarkWhereInput | LandmarkWhereInput[]
    address?: StringFilter<"Landmark"> | string
    imagePath?: StringFilter<"Landmark"> | string
    areaId?: IntFilter<"Landmark"> | number
    Area?: XOR<AreaRelationFilter, AreaWhereInput>
  }, "id" | "name">

  export type LandmarkOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    imagePath?: SortOrder
    areaId?: SortOrder
    _count?: LandmarkCountOrderByAggregateInput
    _avg?: LandmarkAvgOrderByAggregateInput
    _max?: LandmarkMaxOrderByAggregateInput
    _min?: LandmarkMinOrderByAggregateInput
    _sum?: LandmarkSumOrderByAggregateInput
  }

  export type LandmarkScalarWhereWithAggregatesInput = {
    AND?: LandmarkScalarWhereWithAggregatesInput | LandmarkScalarWhereWithAggregatesInput[]
    OR?: LandmarkScalarWhereWithAggregatesInput[]
    NOT?: LandmarkScalarWhereWithAggregatesInput | LandmarkScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Landmark"> | number
    name?: StringWithAggregatesFilter<"Landmark"> | string
    address?: StringWithAggregatesFilter<"Landmark"> | string
    imagePath?: StringWithAggregatesFilter<"Landmark"> | string
    areaId?: IntWithAggregatesFilter<"Landmark"> | number
  }

  export type AreaCreateInput = {
    siDo: string
    siGu: string
    Landmark?: LandmarkCreateNestedManyWithoutAreaInput
  }

  export type AreaUncheckedCreateInput = {
    id?: number
    siDo: string
    siGu: string
    Landmark?: LandmarkUncheckedCreateNestedManyWithoutAreaInput
  }

  export type AreaUpdateInput = {
    siDo?: StringFieldUpdateOperationsInput | string
    siGu?: StringFieldUpdateOperationsInput | string
    Landmark?: LandmarkUpdateManyWithoutAreaNestedInput
  }

  export type AreaUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    siDo?: StringFieldUpdateOperationsInput | string
    siGu?: StringFieldUpdateOperationsInput | string
    Landmark?: LandmarkUncheckedUpdateManyWithoutAreaNestedInput
  }

  export type AreaCreateManyInput = {
    id?: number
    siDo: string
    siGu: string
  }

  export type AreaUpdateManyMutationInput = {
    siDo?: StringFieldUpdateOperationsInput | string
    siGu?: StringFieldUpdateOperationsInput | string
  }

  export type AreaUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    siDo?: StringFieldUpdateOperationsInput | string
    siGu?: StringFieldUpdateOperationsInput | string
  }

  export type LandmarkCreateInput = {
    name: string
    address: string
    imagePath: string
    Area: AreaCreateNestedOneWithoutLandmarkInput
  }

  export type LandmarkUncheckedCreateInput = {
    id?: number
    name: string
    address: string
    imagePath: string
    areaId: number
  }

  export type LandmarkUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    imagePath?: StringFieldUpdateOperationsInput | string
    Area?: AreaUpdateOneRequiredWithoutLandmarkNestedInput
  }

  export type LandmarkUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    imagePath?: StringFieldUpdateOperationsInput | string
    areaId?: IntFieldUpdateOperationsInput | number
  }

  export type LandmarkCreateManyInput = {
    id?: number
    name: string
    address: string
    imagePath: string
    areaId: number
  }

  export type LandmarkUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    imagePath?: StringFieldUpdateOperationsInput | string
  }

  export type LandmarkUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    imagePath?: StringFieldUpdateOperationsInput | string
    areaId?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type LandmarkListRelationFilter = {
    every?: LandmarkWhereInput
    some?: LandmarkWhereInput
    none?: LandmarkWhereInput
  }

  export type LandmarkOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AreaCountOrderByAggregateInput = {
    id?: SortOrder
    siDo?: SortOrder
    siGu?: SortOrder
  }

  export type AreaAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AreaMaxOrderByAggregateInput = {
    id?: SortOrder
    siDo?: SortOrder
    siGu?: SortOrder
  }

  export type AreaMinOrderByAggregateInput = {
    id?: SortOrder
    siDo?: SortOrder
    siGu?: SortOrder
  }

  export type AreaSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
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

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type AreaRelationFilter = {
    is?: AreaWhereInput
    isNot?: AreaWhereInput
  }

  export type LandmarkCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    imagePath?: SortOrder
    areaId?: SortOrder
  }

  export type LandmarkAvgOrderByAggregateInput = {
    id?: SortOrder
    areaId?: SortOrder
  }

  export type LandmarkMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    imagePath?: SortOrder
    areaId?: SortOrder
  }

  export type LandmarkMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    imagePath?: SortOrder
    areaId?: SortOrder
  }

  export type LandmarkSumOrderByAggregateInput = {
    id?: SortOrder
    areaId?: SortOrder
  }

  export type LandmarkCreateNestedManyWithoutAreaInput = {
    create?: XOR<LandmarkCreateWithoutAreaInput, LandmarkUncheckedCreateWithoutAreaInput> | LandmarkCreateWithoutAreaInput[] | LandmarkUncheckedCreateWithoutAreaInput[]
    connectOrCreate?: LandmarkCreateOrConnectWithoutAreaInput | LandmarkCreateOrConnectWithoutAreaInput[]
    createMany?: LandmarkCreateManyAreaInputEnvelope
    connect?: LandmarkWhereUniqueInput | LandmarkWhereUniqueInput[]
  }

  export type LandmarkUncheckedCreateNestedManyWithoutAreaInput = {
    create?: XOR<LandmarkCreateWithoutAreaInput, LandmarkUncheckedCreateWithoutAreaInput> | LandmarkCreateWithoutAreaInput[] | LandmarkUncheckedCreateWithoutAreaInput[]
    connectOrCreate?: LandmarkCreateOrConnectWithoutAreaInput | LandmarkCreateOrConnectWithoutAreaInput[]
    createMany?: LandmarkCreateManyAreaInputEnvelope
    connect?: LandmarkWhereUniqueInput | LandmarkWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type LandmarkUpdateManyWithoutAreaNestedInput = {
    create?: XOR<LandmarkCreateWithoutAreaInput, LandmarkUncheckedCreateWithoutAreaInput> | LandmarkCreateWithoutAreaInput[] | LandmarkUncheckedCreateWithoutAreaInput[]
    connectOrCreate?: LandmarkCreateOrConnectWithoutAreaInput | LandmarkCreateOrConnectWithoutAreaInput[]
    upsert?: LandmarkUpsertWithWhereUniqueWithoutAreaInput | LandmarkUpsertWithWhereUniqueWithoutAreaInput[]
    createMany?: LandmarkCreateManyAreaInputEnvelope
    set?: LandmarkWhereUniqueInput | LandmarkWhereUniqueInput[]
    disconnect?: LandmarkWhereUniqueInput | LandmarkWhereUniqueInput[]
    delete?: LandmarkWhereUniqueInput | LandmarkWhereUniqueInput[]
    connect?: LandmarkWhereUniqueInput | LandmarkWhereUniqueInput[]
    update?: LandmarkUpdateWithWhereUniqueWithoutAreaInput | LandmarkUpdateWithWhereUniqueWithoutAreaInput[]
    updateMany?: LandmarkUpdateManyWithWhereWithoutAreaInput | LandmarkUpdateManyWithWhereWithoutAreaInput[]
    deleteMany?: LandmarkScalarWhereInput | LandmarkScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type LandmarkUncheckedUpdateManyWithoutAreaNestedInput = {
    create?: XOR<LandmarkCreateWithoutAreaInput, LandmarkUncheckedCreateWithoutAreaInput> | LandmarkCreateWithoutAreaInput[] | LandmarkUncheckedCreateWithoutAreaInput[]
    connectOrCreate?: LandmarkCreateOrConnectWithoutAreaInput | LandmarkCreateOrConnectWithoutAreaInput[]
    upsert?: LandmarkUpsertWithWhereUniqueWithoutAreaInput | LandmarkUpsertWithWhereUniqueWithoutAreaInput[]
    createMany?: LandmarkCreateManyAreaInputEnvelope
    set?: LandmarkWhereUniqueInput | LandmarkWhereUniqueInput[]
    disconnect?: LandmarkWhereUniqueInput | LandmarkWhereUniqueInput[]
    delete?: LandmarkWhereUniqueInput | LandmarkWhereUniqueInput[]
    connect?: LandmarkWhereUniqueInput | LandmarkWhereUniqueInput[]
    update?: LandmarkUpdateWithWhereUniqueWithoutAreaInput | LandmarkUpdateWithWhereUniqueWithoutAreaInput[]
    updateMany?: LandmarkUpdateManyWithWhereWithoutAreaInput | LandmarkUpdateManyWithWhereWithoutAreaInput[]
    deleteMany?: LandmarkScalarWhereInput | LandmarkScalarWhereInput[]
  }

  export type AreaCreateNestedOneWithoutLandmarkInput = {
    create?: XOR<AreaCreateWithoutLandmarkInput, AreaUncheckedCreateWithoutLandmarkInput>
    connectOrCreate?: AreaCreateOrConnectWithoutLandmarkInput
    connect?: AreaWhereUniqueInput
  }

  export type AreaUpdateOneRequiredWithoutLandmarkNestedInput = {
    create?: XOR<AreaCreateWithoutLandmarkInput, AreaUncheckedCreateWithoutLandmarkInput>
    connectOrCreate?: AreaCreateOrConnectWithoutLandmarkInput
    upsert?: AreaUpsertWithoutLandmarkInput
    connect?: AreaWhereUniqueInput
    update?: XOR<XOR<AreaUpdateToOneWithWhereWithoutLandmarkInput, AreaUpdateWithoutLandmarkInput>, AreaUncheckedUpdateWithoutLandmarkInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
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
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type LandmarkCreateWithoutAreaInput = {
    name: string
    address: string
    imagePath: string
  }

  export type LandmarkUncheckedCreateWithoutAreaInput = {
    id?: number
    name: string
    address: string
    imagePath: string
  }

  export type LandmarkCreateOrConnectWithoutAreaInput = {
    where: LandmarkWhereUniqueInput
    create: XOR<LandmarkCreateWithoutAreaInput, LandmarkUncheckedCreateWithoutAreaInput>
  }

  export type LandmarkCreateManyAreaInputEnvelope = {
    data: LandmarkCreateManyAreaInput | LandmarkCreateManyAreaInput[]
    skipDuplicates?: boolean
  }

  export type LandmarkUpsertWithWhereUniqueWithoutAreaInput = {
    where: LandmarkWhereUniqueInput
    update: XOR<LandmarkUpdateWithoutAreaInput, LandmarkUncheckedUpdateWithoutAreaInput>
    create: XOR<LandmarkCreateWithoutAreaInput, LandmarkUncheckedCreateWithoutAreaInput>
  }

  export type LandmarkUpdateWithWhereUniqueWithoutAreaInput = {
    where: LandmarkWhereUniqueInput
    data: XOR<LandmarkUpdateWithoutAreaInput, LandmarkUncheckedUpdateWithoutAreaInput>
  }

  export type LandmarkUpdateManyWithWhereWithoutAreaInput = {
    where: LandmarkScalarWhereInput
    data: XOR<LandmarkUpdateManyMutationInput, LandmarkUncheckedUpdateManyWithoutAreaInput>
  }

  export type LandmarkScalarWhereInput = {
    AND?: LandmarkScalarWhereInput | LandmarkScalarWhereInput[]
    OR?: LandmarkScalarWhereInput[]
    NOT?: LandmarkScalarWhereInput | LandmarkScalarWhereInput[]
    id?: IntFilter<"Landmark"> | number
    name?: StringFilter<"Landmark"> | string
    address?: StringFilter<"Landmark"> | string
    imagePath?: StringFilter<"Landmark"> | string
    areaId?: IntFilter<"Landmark"> | number
  }

  export type AreaCreateWithoutLandmarkInput = {
    siDo: string
    siGu: string
  }

  export type AreaUncheckedCreateWithoutLandmarkInput = {
    id?: number
    siDo: string
    siGu: string
  }

  export type AreaCreateOrConnectWithoutLandmarkInput = {
    where: AreaWhereUniqueInput
    create: XOR<AreaCreateWithoutLandmarkInput, AreaUncheckedCreateWithoutLandmarkInput>
  }

  export type AreaUpsertWithoutLandmarkInput = {
    update: XOR<AreaUpdateWithoutLandmarkInput, AreaUncheckedUpdateWithoutLandmarkInput>
    create: XOR<AreaCreateWithoutLandmarkInput, AreaUncheckedCreateWithoutLandmarkInput>
    where?: AreaWhereInput
  }

  export type AreaUpdateToOneWithWhereWithoutLandmarkInput = {
    where?: AreaWhereInput
    data: XOR<AreaUpdateWithoutLandmarkInput, AreaUncheckedUpdateWithoutLandmarkInput>
  }

  export type AreaUpdateWithoutLandmarkInput = {
    siDo?: StringFieldUpdateOperationsInput | string
    siGu?: StringFieldUpdateOperationsInput | string
  }

  export type AreaUncheckedUpdateWithoutLandmarkInput = {
    id?: IntFieldUpdateOperationsInput | number
    siDo?: StringFieldUpdateOperationsInput | string
    siGu?: StringFieldUpdateOperationsInput | string
  }

  export type LandmarkCreateManyAreaInput = {
    id?: number
    name: string
    address: string
    imagePath: string
  }

  export type LandmarkUpdateWithoutAreaInput = {
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    imagePath?: StringFieldUpdateOperationsInput | string
  }

  export type LandmarkUncheckedUpdateWithoutAreaInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    imagePath?: StringFieldUpdateOperationsInput | string
  }

  export type LandmarkUncheckedUpdateManyWithoutAreaInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    imagePath?: StringFieldUpdateOperationsInput | string
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