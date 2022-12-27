import { copyFileSync, readFileSync, rmdirSync, unlinkSync } from "fs";
import { join } from "path";

import { executeSQL } from "../database.js";
import { CommandFunc } from "./types.js";
import { getFiles, getFilesInDirectory } from "./utils.js";

export const rollback: CommandFunc = async ({
  migrationHistory,
  repository,
  environment,
  args,
}) => {
  const lastMigrationDir =
    migrationHistory.migrations[migrationHistory.migrations.length - 1] ?? [];
  const migrationFiles = getFilesInDirectory(
    join(repository, lastMigrationDir)
  );
  const filenames = migrationFiles
    .filter((migrationFile) => /.*\.down\.sql/g.test(migrationFile))
    .map((migrationFile: string) => migrationFile.replace(".down.sql", ""));

  if (migrationFiles.length > 0) {
    const sql = await Promise.all(
      filenames
        .map((filename: string) =>
          join(repository, lastMigrationDir, getFiles(filename).down)
        )
        .reverse()
        .map((filepath: string) => readFileSync(filepath, "utf-8"))
    );

    const success = await executeSQL(sql, args.useSsl);

    if (success) {
      restoreMigration(lastMigrationDir, repository);

      migrationHistory.migrations.pop();
      migrationHistory.currentMigration = [
        ...filenames,
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

function restoreMigration(migrationDir: string, repository: string) {
  const dirPath = join(repository, migrationDir);
  const files = getFilesInDirectory(dirPath);

  files.forEach((filename: string) => {
    const filePath = join(dirPath, filename);
    const targetPath = join(repository, filename);
    copyFileSync(filePath, targetPath);
    unlinkSync(filePath);
  });
  rmdirSync(dirPath);
}
