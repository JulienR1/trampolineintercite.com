import { closeSync, openSync } from "fs";
import { join } from "path";

import { CommandFunc } from "./types.js";
import { getFiles } from "./utils.js";

export const add: CommandFunc = async ({
  migrationHistory,
  repository,
  args,
}) => {
  const requestedName = args.others[0];
  if (!requestedName) {
    throw new Error("Missing filename in command.");
  }

  const filename = [Date.now(), requestedName].join("_");
  migrationHistory.currentMigration.push(filename);

  const files = getFiles(filename);
  closeSync(openSync(join(repository, files.up), "w"));
  closeSync(openSync(join(repository, files.down), "w"));

  return migrationHistory;
};
