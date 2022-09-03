import { join } from "path";
import { readFileSync } from "fs";
import { getFiles } from "./utils.js";
import { executeSQL } from "../database.js";
import { CommandFunc } from "./types.js";

export const migrate: CommandFunc = async ({
  migrationHistory,
  repository,
  environment,
}) => {
  const filePaths = migrationHistory.currentMigration.map((filename: string) =>
    join(repository, getFiles(filename).up),
  );
  const sql = await Promise.all(
    filePaths.map((filepath: string) => readFileSync(filepath, "utf-8")),
  );

  const success = await executeSQL(sql);

  if (migrationHistory.currentMigration.length > 0 && success) {
    migrationHistory.migrations.push(migrationHistory.currentMigration);
    migrationHistory.currentMigration = [];
    migrationHistory.databases[environment] =
      migrationHistory.migrations.length - 1;
  }

  return migrationHistory;
};
