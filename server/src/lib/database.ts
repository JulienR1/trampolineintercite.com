import { QueryOptions } from "mysql2";
import { Connection, createConnection } from "mysql2/promise";
import { ConnectionOptions } from "mysql2/typings/mysql";
import { err, ok, Result } from "../types";

type TransactionConnection = {
  query: <T>(query: QueryOptions) => Promise<T[]>;
  single: <T>(query: QueryOptions) => Promise<T>;
};

function getDatabaseConfig() {
  const dbConfig: ConnectionOptions = {
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    port: parseInt(process.env.DATABASE_PORT as string),
  };

  if (!process.env.TS_NODE_DEV) {
    dbConfig.ssl = { rejectUnauthorized: true };
  }

  if (
    !dbConfig.password ||
    !dbConfig.database ||
    !dbConfig.host ||
    !dbConfig.user ||
    !dbConfig.port ||
    Number.isNaN(dbConfig.port)
  ) {
    throw new Error("Missing environment configuration for database.");
  }

  return dbConfig;
}

export const query = <T>(query: QueryOptions) => {
  const execute = async () => {
    let response: Result<T[]>;

    let db: Connection | undefined = undefined;

    try {
      db = await createConnection(getDatabaseConfig());
      const results = await db.query(query);
      response = ok(results[0] as T[]);
    } catch (error) {
      response = err(error as Error);
    } finally {
      await db?.end();
    }

    return response;
  };

  return {
    execute,
    single: async (): Promise<Result<T>> => {
      const result = await execute();
      return result.isOk()
        ? result.value.length > 0
          ? ok(
              Array.isArray(result.value[0])
                ? result.value[0][0]
                : result.value[0]
            )
          : err(new Error("No single value available"))
        : err(result.error);
    },
  };
};

export const transaction = async <T>(
  run: (client: TransactionConnection) => Promise<T>
): Promise<Result<T>> => {
  let response: Result<T>;
  let db: Connection | undefined = undefined;

  try {
    db = await createConnection(getDatabaseConfig());
    await db.beginTransaction();

    const query = async <T>(options: QueryOptions) => {
      const res = await db?.query(options);
      if (!res) {
        throw new Error("No result found for query");
      }
      return res[0] as T[];
    };

    const single = async <Q>(options: QueryOptions): Promise<Q> => {
      const res = await query(options);
      if (res.length > 0) {
        if (Array.isArray(res[0])) {
          return res[0][0] as Q;
        }
        return res[0] as Q;
      }
      throw new Error("No single value available");
    };

    const results = await run({ query, single });
    await db.commit();
    response = ok(results);
  } catch (error) {
    await db?.rollback();
    response = err(error as Error);
  } finally {
    await db?.end();
  }

  return response;
};
