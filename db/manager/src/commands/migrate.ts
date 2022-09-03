import { join } from "path";
import { readFileSync } from "fs";
import { getFiles } from "./utils.js";
import { MigrationHistory } from "../types.js";
import { executeSQL } from "../database.js";

export async function migrate(
  migrationHistory: MigrationHistory,
  args: string[],
  repository: string,
): Promise<MigrationHistory> {
  const filePaths = migrationHistory.currentMigration.map(filename =>
    join(repository, getFiles(filename).up),
  );
  const sql = await Promise.all(
    filePaths.map(filepath => readFileSync(filepath, "utf-8")),
  );

  const success = await executeSQL(repository, sql);

  if (migrationHistory.currentMigration.length > 0 && success) {
    migrationHistory.migrations.push(migrationHistory.currentMigration);
    migrationHistory.currentMigration = [];
  }

  return migrationHistory;
}
