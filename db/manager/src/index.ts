import { executeCommand, getCommand } from "./commands/index.js";
import {
  getMigrationHistory,
  updateMigrationHistory,
} from "./migration-history.js";
import { getRepository, getWorkingDirectory } from "./working-directory.js";

(async function run() {
  try {
    const workingDirectory = await getWorkingDirectory();
    const migrationHistory = await getMigrationHistory(workingDirectory);

    const command = getCommand();
    const updatedHistory = await executeCommand(
      command,
      migrationHistory,
      workingDirectory,
    );

    await updateMigrationHistory(updatedHistory, workingDirectory);
  } catch (err) {
    console.error(err);
  }
})();
