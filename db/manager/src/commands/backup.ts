import inquirer from "inquirer";
import { backup } from "../database.js";
import { CommandFunc } from "./types.js";

export const doBackup: CommandFunc = async ({
  migrationHistory,
  backupDir,
}) => {
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

  return migrationHistory;
};
