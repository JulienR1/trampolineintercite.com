import { createConnection, ConnectionConfig } from "mysql";

async function getDatabaseConfig(): Promise<ConnectionConfig> {
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

export async function executeSQL(sql: string | string[]) {
  const sqlToExecute = Array.isArray(sql) ? sql : [sql];

  const config = await getDatabaseConfig();
  const connection = createConnection(config);

  let success = false;

  try {
    await new Promise<void>(resolve =>
      connection.beginTransaction(async err => {
        if (err) {
          throw err;
        }

        await sqlToExecute.forEach(async query => {
          await new Promise<void>(queryResolve =>
            connection.query(query, err => {
              if (err) {
                throw err;
              }
              return queryResolve();
            }),
          );
        });

        connection.commit(err => {
          if (err) {
            throw err;
          }

          success = true;
          console.log(`Successfully applied ${sqlToExecute.length} changes.`);
          return resolve();
        });
      }),
    );
  } catch {
    console.log("Could not apply the required changes.");
  } finally {
    connection.end();
  }

  return success;
}
