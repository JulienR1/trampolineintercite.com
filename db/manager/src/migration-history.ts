import { join } from "path";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { MigrationHistory } from "./types.js";

const migrationHistoryFileName = "history.json";

export async function getMigrationHistory(
  targetDir: string,
): Promise<MigrationHistory> {
  const migrationHistoryPath = join(targetDir, migrationHistoryFileName);

  if (!existsSync(migrationHistoryPath)) {
    return { currentMigration: [], migrations: [], databases: {} };
  }

  const migrationHistoryRaw = readFileSync(migrationHistoryPath, "utf-8");
  const migrationHistory = JSON.parse(migrationHistoryRaw) as MigrationHistory;

  if (!validateHistory(migrationHistory)) {
    throw new Error("The provided history is corrupt.");
  }

  return migrationHistory;
}

export async function updateMigrationHistory(
  update: MigrationHistory,
  targetDir: string,
) {
  if (!validateHistory(update)) {
    throw new Error("Something went wrong with the history. Aborting.");
  }

  const filename = join(targetDir, migrationHistoryFileName);
  const updateStr = JSON.stringify(update);
  writeFileSync(filename, updateStr, "utf-8");
}

function validateHistory(migrationHistory: MigrationHistory): boolean {
  if (!migrationHistory) {
    return false;
  }

  if (
    !("currentMigration" in migrationHistory) ||
    !Array.isArray(migrationHistory.currentMigration)
  ) {
    return false;
  }

  if (
    !("migrations" in migrationHistory) ||
    !Array.isArray(migrationHistory.migrations) ||
    migrationHistory.migrations.some(migration => !Array.isArray(migration))
  ) {
    return false;
  }

  if (!("databases" in migrationHistory)) {
    return false;
  }

  return true;
}
