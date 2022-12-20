import { QueryOptions } from "mysql2";
import { Connection, createConnection } from "mysql2/promise";
import { ConnectionOptions } from "mysql2/typings/mysql";
import { err, ok, Result } from "../types";

function getDatabaseConfig() {
  const dbConfig: ConnectionOptions = {
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    port: parseInt(process.env.DATABASE_PORT as string),
  };

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
          ? ok(result.value[0])
          : err(new Error("No single value available"))
        : err(result.error);
    },
  };
};
