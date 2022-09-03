import { join } from "path";
import { closeSync, openSync } from "fs";
import { MigrationHistory } from "../types.js";
import { getFiles } from "./utils.js";

export function add(
  migrationHistory: MigrationHistory,
  args: string[],
  repository: string,
): MigrationHistory {
  const requestedName = args[0];
  if (!requestedName) {
    throw new Error("Missing filename in command.");
  }

  const filename = [new Date().valueOf(), requestedName].join("_");
  migrationHistory.currentMigration.push(filename);

  const files = getFiles(filename);
  closeSync(openSync(join(repository, files.up), "w"));
  closeSync(openSync(join(repository, files.down), "w"));

  return migrationHistory;
}
