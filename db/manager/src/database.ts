import { spawn } from "child_process";
import { createWriteStream } from "fs";
import { ConnectionConfig, createConnection } from "mysql";
import { join } from "path";

function getDatabaseConfig(): ConnectionConfig {
  const dbConfig: ConnectionConfig = {
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    port: parseInt(process.env.DATABASE_PORT as string),
    multipleStatements: true,
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

export async function executeSQL(sql: string | string[]) {
  const sqlToExecute = Array.isArray(sql) ? sql : [sql];

  const config = getDatabaseConfig();
  const connection = createConnection(config);

  let success = false;

  try {
    await new Promise<void>((resolve) =>
      connection.beginTransaction(async (error) => {
        if (error) {
          throw error;
        }

        await sqlToExecute.forEach(async (query) => {
          await new Promise<void>((queryResolve) =>
            connection.query(query, (err) => {
              if (err) {
                throw err;
              }
              return queryResolve();
            })
          );
        });

        connection.commit((err) => {
          if (err) {
            throw err;
          }

          success = true;
          console.log(`Successfully applied ${sqlToExecute.length} changes.`);
          return resolve();
        });
      })
    );
  } catch {
    console.log("Could not apply the required changes.");
  } finally {
    connection.end();
  }

  return success;
}

export async function backup(backupDir: string) {
  const filename = `${Date.now().toString()}.dump.sql`;
  const writeStream = createWriteStream(join(backupDir, filename));

  console.log("Creating backup ..");
  try {
    await new Promise<void>((resolve, reject) => {
      const dump = spawn("mysqldump", [
        "--user",
        process.env.DATABASE_USER as string,
        `-p${process.env.DATABASE_PASSWORD}`,
        "--host",
        process.env.DATABASE_HOST as string,
        "--port",
        process.env.DATABASE_PORT as string,
        process.env.DATABASE_NAME as string,
      ]);

      dump.stdout
        .pipe(writeStream)
        .on("finish", () => {
          console.log("Backup complete");
          resolve();
        })
        .on("error", (err) => reject(err));
    });
  } catch (err) {
    throw err;
  }
}
