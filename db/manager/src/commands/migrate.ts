import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  unlinkSync,
} from "fs";
import inquirer from "inquirer";
import { join } from "path";

import { backup, executeSQL } from "../database.js";
import { Filename } from "../types.js";
import { CommandFunc } from "./types.js";
import { getFiles, getFilesInDirectory } from "./utils.js";

export const migrate: CommandFunc = async ({
  migrationHistory,
  repository,
  environment,
  backupDir,
}) => {
  const currentMigrationNumber = migrationHistory.databases[environment];
  const missingMigrationDirectories = migrationHistory.migrations.slice(
    currentMigrationNumber + 1,
  );

  const missingMigrations = missingMigrationDirectories
    .reduce(
      (
        allFiles: { dir: string; filename: string }[],
        migrationDirectory: string,
      ) => [
        ...allFiles,
        ...getFilesInDirectory(join(repository, migrationDirectory)).map(
          (filename: string) => ({
            dir: join(repository, migrationDirectory),
            filename,
          }),
        ),
      ],
      [],
    )
    .filter((migration: { dir: string; filename: string }) =>
      /.*\.up\.sql/g.test(migration.filename),
    )
    .map((migration: { dir: string; filename: string }) => ({
      ...migration,
      filename: migration.filename.replace(".up.sql", ""),
    }));

  const migrationsToExecute = [
    ...missingMigrations.map((migration: { dir: string; filename: string }) =>
      join(migration.dir, getFiles(migration.filename).up),
    ),
    ...migrationHistory.currentMigration.map((filename: string) =>
      join(repository, getFiles(filename).up),
    ),
  ];

  if (migrationsToExecute.length > 0) {
    const { doBackup } = await inquirer.prompt([
      {
        message: "Do you want to backup the current database?",
        type: "confirm",
        name: "doBackup",
      },
    ]);
    if (doBackup) {
      await backup(backupDir);
    }

    const sql = await Promise.all(
      migrationsToExecute.map((filepath: string) =>
        readFileSync(filepath, "utf-8"),
      ),
    );

    const success = await executeSQL(sql);

    if (success) {
      if (migrationHistory.currentMigration.length > 0) {
        const migrationName = saveMigration(
          migrationHistory.currentMigration,
          repository,
        );
        migrationHistory.migrations.push(migrationName);
      }
      migrationHistory.currentMigration = [];
      migrationHistory.databases[environment] =
        migrationHistory.migrations.length - 1;
    }
  }
  return migrationHistory;
};

function saveMigration(migrationFiles: Filename[], repository: string) {
  const dirName = Date.now().toString();
  const dirPath = join(repository, dirName);

  if (!existsSync(dirPath)) {
    mkdirSync(dirPath);
  }

  const files = migrationFiles
    .map(migrationFile => getFiles(migrationFile))
    .reduce(
      (allFiles, currentFile) => [
        ...allFiles,
        currentFile.up,
        currentFile.down,
      ],
      [] as string[],
    );

  files.forEach((migrationFile: string) => {
    const migrationFilePath = join(repository, migrationFile);
    const migrationFileTargetPath = join(dirPath, migrationFile);

    copyFileSync(migrationFilePath, migrationFileTargetPath);
    unlinkSync(migrationFilePath);
  });

  return dirName;
}
