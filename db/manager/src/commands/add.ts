import { join } from "path";
import { getFiles } from "./utils.js";
import { closeSync, openSync } from "fs";
import { CommandFunc } from "./types.js";

export const add: CommandFunc = async ({
  migrationHistory,
  repository,
  args,
}) => {
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
};
