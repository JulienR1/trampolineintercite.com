import { Permission } from "common";
import inquirer from "inquirer";
import { Client } from "../types.js";

export const assignRoleToUser = async (client: Client) => {
  const { email } = await inquirer.prompt({
    name: "email",
    message: "Specify the email associated with the user to edit.",
    type: "input",
  });
  const user = await client.users.getByEmail.query(email);
  console.log(`Found '${user.firstname} ${user.lastname}'`);

  const { continueProcess } = await inquirer.prompt({
    name: "continueProcess",
    message: "Continue with this user?",
    type: "confirm",
  });
  if (!continueProcess) {
    console.log("Aborting");
    return;
  }

  const { permissions } = await inquirer.prompt({
    name: "permissions",
    message: "Select the permissions to assign to this user",
    type: "checkbox",
    choices: Permission.options,
    default: Permission.options.map((option) =>
      user.permissions.includes(option) ? option : null
    ),
  });

  console.log("This has not yet been implemented..");
};
