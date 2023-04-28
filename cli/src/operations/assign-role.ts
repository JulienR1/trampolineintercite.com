import { Role } from "common";
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

  const { roles } = await inquirer.prompt({
    name: "roles",
    message: "Select the roles to assign to this user",
    type: "checkbox",
    choices: Role.options,
    default: Role.options.map((option) =>
      user.roles.includes(option) ? option : null
    ),
  });

  console.log("This has not yet been implemented..");
};
