import inquirer from "inquirer";
import { backup } from "../database.js";
import { CommandFunc } from "./types.js";

export const doBackup: CommandFunc = async ({
  migrationHistory,
  backupDir,
  args,
}) => {
  const { doBackup } = await inquirer.prompt([
    {
      message: "Do you want to backup the current database?",
      type: "confirm",
      name: "doBackup",
    },
  ]);
  if (doBackup) {
    await backup(backupDir, args.useSsl);
  }

  return migrationHistory;
};
