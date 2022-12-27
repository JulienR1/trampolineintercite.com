import { MigrationHistory } from "../types";

export type CommandFunc = (
  payload: CommandFuncPayload
) => Promise<MigrationHistory>;

export type CommandFuncPayload = {
  migrationHistory: MigrationHistory;
  args: { useSsl: boolean; others: string[] };
  repository: string;
  backupDir: string;
  environment: string;
};
