import { readFileSync } from "fs";
import { join } from "path";

import { executeSQL } from "../database.js";
import { CommandFunc } from "./types.js";
import { getFiles } from "./utils.js";

export const rollback: CommandFunc = async ({
  migrationHistory,
  repository,
  environment,
}) => {
  const lastMigration =
    migrationHistory.migrations[migrationHistory.migrations.length - 1] ?? [];
  const filePaths = lastMigration.map((filename: string) =>
    join(repository, getFiles(filename).down),
  );

  if (lastMigration.length > 0) {
    const sql = await Promise.all(
      filePaths
        .reverse()
        .map((filepath: string) => readFileSync(filepath, "utf-8")),
    );

    const success = await executeSQL(sql);

    if (success) {
      migrationHistory.migrations.pop();
      migrationHistory.currentMigration = [
        ...lastMigration,
        ...migrationHistory.currentMigration,
      ];
      migrationHistory.databases[environment]--;

      if (migrationHistory.databases[environment] < 0) {
        delete migrationHistory.databases[environment];
      }
    }
  }

  return migrationHistory;
};
