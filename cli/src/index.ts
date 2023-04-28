import { config } from "dotenv";
import z from "zod";

import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { readdirSync } from "fs";
import inquirer from "inquirer";
import { join } from "path";
import SuperJSON from "superjson";
import type { AppRouter } from "trampolineintercite-server";
import { assignRoleToUser } from "./operations/assign-role.js";
import {
  associateUserToExistingPerson,
  createNewUser,
} from "./operations/create-user.js";

const selectEnvironment = async () => {
  const dir = join(process.cwd(), "cli");
  const filesInRoot = readdirSync(dir);
  const envFiles = filesInRoot.filter((filename) =>
    /^\.env.*$/g.test(filename)
  );
  const configNames = envFiles.map((configuration) =>
    (configuration.replace(/.env\.?/g, "") ?? "default").toUpperCase()
  );

  if (configNames?.length === 0) {
    throw new Error("Could not find any .env files.");
  }

  const selectedConfig =
    configNames.length === 1
      ? configNames[0]
      : (
          await inquirer.prompt([
            {
              name: "selectedConfig",
              message: "Select en environment",
              choices: configNames,
              type: "list",
            },
          ])
        ).selectedConfig;

  const configurationFile =
    envFiles[
      configNames.findIndex((configName) => configName === selectedConfig)
    ];

  config({ path: join(dir, configurationFile) });

  return z
    .object({
      SERVER_URL: z.string().min(1),
    })
    .parse(process.env);
};

let jwtToken: string | null = null;
const env = await selectEnvironment();

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${env.SERVER_URL}/trpc`,
      headers: () => {
        return jwtToken ? { authorization: "Bearer " + jwtToken } : {};
      },
    }),
  ],
  transformer: SuperJSON,
});

const pingServer = async () => {
  console.log("Starting server..");
  await client.ping.query();
  console.log("Server is running.");
};

const authorizeUser = async () => {
  const { email } = await inquirer.prompt({
    name: "email",
    message: "Enter your email:",
    type: "input",
  });
  const { password } = await inquirer.prompt({
    name: "password",
    message: "Enter your password:",
    type: "password",
  });

  try {
    jwtToken = await client.auth.login.query({ email, password });
    console.log("Connection successful.");
  } catch {
    throw new Error("Invalid credentials, could not complete the connection.");
  }
};

const OPERATIONS = [
  "Create a new user",
  "Create a new user for an existing person",
  "Assign role to user",
] as const;

const { operation }: { operation: (typeof OPERATIONS)[number] } =
  await inquirer.prompt({
    name: "operation",
    message: "Select an operation",
    type: "list",
    choices: OPERATIONS,
  });

await pingServer();
switch (operation) {
  case "Create a new user":
    await createNewUser(client);
    break;
  case "Create a new user for an existing person":
    await associateUserToExistingPerson(client);
    break;
  case "Assign role to user":
    await authorizeUser();
    await assignRoleToUser(client);
    break;
}
