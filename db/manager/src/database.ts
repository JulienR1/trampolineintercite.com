import { spawn } from "child_process";
import { createWriteStream } from "fs";
import { Connection, ConnectionConfig, createConnection } from "mysql";
import { join } from "path";

function getDatabaseConfig(useSsl: boolean): ConnectionConfig {
  const dbConfig: ConnectionConfig = {
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    port: parseInt(process.env.DATABASE_PORT as string),
    multipleStatements: true,
  };

  if (useSsl) {
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

export async function executeSQL(sql: string | string[], useSsl?: boolean) {
  const sqlToExecute = Array.isArray(sql) ? sql : [sql];

  let connection: Connection;
  const config = getDatabaseConfig(useSsl ?? false);

  try {
    connection = createConnection(config);
  } catch (error) {
    console.error(
      "Could not establish connection. Maybe use the '--use-ssl' flag"
    );
    throw error;
  }

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

export async function backup(backupDir: string, useSsl: boolean) {
  const sslCertificatePath = join(process.env.SLL_CERTIFICATE_PATH ?? "");
  if (!process.env.SLL_CERTIFICATE_PATH) {
    throw new Error("Missing env variable: 'SLL_CERTIFICATE_PATH'");
  }

  const filename = `${Date.now().toString()}.dump.sql`;
  const writeStream = createWriteStream(join(backupDir, filename));

  console.log("Creating backup ..");
  try {
    await new Promise<void>((resolve, reject) => {
      const args = [
        "--user",
        process.env.DATABASE_USER as string,
        `-p${process.env.DATABASE_PASSWORD}`,
        "--host",
        process.env.DATABASE_HOST as string,
        "--port",
        process.env.DATABASE_PORT as string,
        process.env.DATABASE_NAME as string,
      ];

      if (useSsl) {
        args.push(
          ...["--ssl-mode=VERIFIY_IDENTITY", "--ssl-ca=" + sslCertificatePath]
        );
      }

      const dump = spawn("mysqldump", args);

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
