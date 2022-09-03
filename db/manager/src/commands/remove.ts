import inquirer from "inquirer";
import { join } from "path";
import { unlinkSync } from "fs";
import { MigrationHistory } from "../types.js";
import { getFiles } from "./utils.js";

export async function remove(
  migrationHistory: MigrationHistory,
  args: string[],
  repository: string,
): Promise<MigrationHistory> {
  if (migrationHistory.currentMigration.length === 0) {
    throw new Error("No file to remove in current migration.");
  }

  const { fileToRemove } = await inquirer.prompt([
    {
      type: "list",
      name: "fileToRemove",
      message: "Select a file to remove",
      choices: migrationHistory.currentMigration,
      default:
        migrationHistory.currentMigration[
          migrationHistory.currentMigration.length - 1
        ],
    },
  ]);

  const files = getFiles(fileToRemove);

  migrationHistory.currentMigration.pop();
  unlinkSync(join(repository, files.up));
  unlinkSync(join(repository, files.down));

  return migrationHistory;
}
