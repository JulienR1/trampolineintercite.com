import { join } from "path";
import { readFileSync } from "fs";
import { getFiles } from "./utils.js";
import { CommandFunc } from "./types.js";
import { backup, executeSQL } from "../database.js";

export const migrate: CommandFunc = async ({
  migrationHistory,
  repository,
  environment,
  backupDir,
}) => {
  const currentMigrationNumber = migrationHistory.databases[environment];
  const missingMigrations = migrationHistory.migrations.slice(
    currentMigrationNumber + 1,
  );

  const migrationsToExecute = [
    ...missingMigrations.flat(),
    ...migrationHistory.currentMigration,
  ];

  if (migrationsToExecute.length > 0) {
    await backup(backupDir);

    const filePaths = migrationsToExecute.map((filename: string) =>
      join(repository, getFiles(filename).up),
    );
    const sql = await Promise.all(
      filePaths.map((filepath: string) => readFileSync(filepath, "utf-8")),
    );

    const success = await executeSQL(sql);

    if (success) {
      if (migrationHistory.currentMigration.length > 0) {
        migrationHistory.migrations.push(migrationHistory.currentMigration);
      }
      migrationHistory.currentMigration = [];
      migrationHistory.databases[environment] =
        migrationHistory.migrations.length - 1;
    }
  }
  return migrationHistory;
};
