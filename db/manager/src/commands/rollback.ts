import { readFileSync } from "fs";
import { join } from "path";
import { executeSQL } from "../database.js";
import { MigrationHistory } from "../types.js";
import { getFiles } from "./utils.js";

export async function rollback(
  migrationHistory: MigrationHistory,
  args: string[],
  repository: string,
): Promise<MigrationHistory> {
  const lastMigration =
    migrationHistory.migrations[migrationHistory.migrations.length - 1] ?? [];
  const filePaths = lastMigration.map(filename =>
    join(repository, getFiles(filename).down),
  );

  if (lastMigration.length > 0) {
    const sql = await Promise.all(
      filePaths.reverse().map(filepath => readFileSync(filepath, "utf-8")),
    );

    const success = await executeSQL(repository, sql);

    if (success) {
      migrationHistory.migrations.pop();
      migrationHistory.currentMigration = [
        ...lastMigration,
        ...migrationHistory.currentMigration,
      ];
    }
  }

  return migrationHistory;
}
