import { MigrationHistory } from "../types.js";
import {
  getBackupDirectory,
  getRepository,
  selectEnvironment,
} from "../working-directory.js";
import { add } from "./add.js";
import { migrate } from "./migrate.js";
import { remove } from "./remove.js";
import { rollback } from "./rollback.js";

export enum Command {
  ADD = "add",
  REMOVE = "remove",
  MIGRATE = "migrate",
  ROLLBACK = "rollback",
}

type CommandPayload = {
  command: Command;
  args: string[];
};

const commands = {
  [Command.ADD]: ["a", "add"],
  [Command.REMOVE]: ["r", "remove"],
  [Command.MIGRATE]: ["m", "migrate"],
  [Command.ROLLBACK]: ["rollback"],
};

export function getCommand(): CommandPayload {
  const [_, __, commandStr, ...args] = process.argv;

  const command = Object.keys(commands)
    .map(c => c as unknown as Command)
    .find(c => commands[c].includes(commandStr));

  if (!command) {
    throw new Error(`Unknown command: '${commandStr}'`);
  }

  return { command, args };
}

export async function executeCommand(
  { command, args }: CommandPayload,
  migrationHistory: MigrationHistory,
  workingDirectory: string,
) {
  const mapping = {
    [Command.ADD]: add,
    [Command.REMOVE]: remove,
    [Command.MIGRATE]: migrate,
    [Command.ROLLBACK]: rollback,
  };

  const environment = await selectEnvironment(workingDirectory);
  const repository = getRepository(workingDirectory);
  const backupDir = getBackupDirectory(workingDirectory);

  return (
    (await mapping[command]({
      migrationHistory,
      args,
      repository,
      environment,
      backupDir,
    })) ?? migrationHistory
  );
}
