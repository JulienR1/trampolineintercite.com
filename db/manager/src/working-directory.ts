import inquirer from "inquirer";
import { existsSync, mkdirSync } from "fs";
import { join } from "path";

export async function getWorkingDirectory() {
  const targetDir = join(process.cwd(), "db");
  if (existsSync(targetDir)) {
    return targetDir;
  }

  const { confirmation } = await inquirer.prompt([
    {
      name: "confirmation",
      message: "Could not find './db'. Would you like to create it?",
      type: "confirm",
    },
  ]);

  if (confirmation) {
    mkdirSync(targetDir);
    return targetDir;
  }

  throw new Error("Did not find required directory. Aborting.");
}

export const getRepository = (workingDir: string) => {
  const repoPath = join(workingDir, "repo");
  if (!existsSync(repoPath)) {
    mkdirSync(repoPath);
  }
  return repoPath;
};
