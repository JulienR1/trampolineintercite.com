import inquirer from "inquirer";
import { existsSync, mkdirSync, readdirSync } from "fs";
import { join } from "path";
import { config } from "dotenv";

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

export const selectEnvironment = async (workingDir: string) => {
  const filesInRoot = readdirSync(join(workingDir, ".."));
  const envFiles = filesInRoot.filter(filename => /^\.env.*$/g.test(filename));
  const configNames = envFiles.map(config =>
    (config.replace(/.env\.?/g, "") ?? "default").toUpperCase(),
  );

  if (configNames?.length === 0) {
    throw new Error("Could not find any configuration files.");
  }

  const selectedConfig =
    configNames.length === 1
      ? configNames[0]
      : (
          await inquirer.prompt([
            {
              name: "selectedConfig",
              message: "Select a database configuration",
              choices: configNames,
              type: "list",
            },
          ])
        ).selectedConfig;

  const configurationFile =
    envFiles[
      configNames.findIndex(configName => configName === selectedConfig)
    ];

  config({ path: join(workingDir, "..", configurationFile) });

  return selectedConfig;
};
