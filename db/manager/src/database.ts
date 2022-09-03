import inquirer from "inquirer";
import { createConnection, ConnectionConfig } from "mysql";
import { readdirSync } from "fs";
import { config } from "dotenv";
import { join } from "path";

async function getDatabaseConfig(
  repository: string,
): Promise<ConnectionConfig> {
  const filesInRoot = readdirSync(join(repository, "..", ".."));
  const envFiles = filesInRoot.filter(filename => /^\.env.*$/g.test(filename));
  const configNames = envFiles.map(config =>
    (config.replace(/.env\.?/g, "") ?? "default").toUpperCase(),
  );

  if (configNames?.length === 0) {
    throw new Error("Could not find any configuration files.");
  }

  const selectedConfig =
    configNames.length === 1
      ? configNames[0]
      : (
          await inquirer.prompt([
            {
              name: "selectedConfig",
              message: "Select a database configuration",
              choices: configNames,
              type: "list",
            },
          ])
        ).selectedConfig;

  const configurationFile =
    envFiles[
      configNames.findIndex(configName => configName === selectedConfig)
    ];

  config({ path: join(repository, "..", "..", configurationFile) });
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

export async function executeSQL(repository: string, sql: string | string[]) {
  const sqlToExecute = Array.isArray(sql) ? sql : [sql];

  const config = await getDatabaseConfig(repository);
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
