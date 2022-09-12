import { err, ok, Result } from "@trampo/types";
import { ConnectionConfig, QueryOptions } from "mysql";
import mysql from "serverless-mysql";

function getDatabaseConfig(): ConnectionConfig {
  const dbConfig: ConnectionConfig = {
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
    dbConfig.port === NaN
  ) {
    throw new Error("Missing environment configuration for database.");
  }

  return dbConfig;
}

const db = mysql({
  config: getDatabaseConfig(),
});

export const executeQuery = async <T>(
  query: QueryOptions,
): Promise<Result<T>> => {
  try {
    const results = await db.query<T>(query);
    await db.end();
    return ok(results);
  } catch (error) {
    return err(error);
  }
};
