import inquirer from "inquirer";
import { Client } from "../types.js";

const getName = async () => {
  const { firstname } = await inquirer.prompt({
    name: "firstname",
    message: "Firstname: ",
    type: "input",
  });
  const { lastname } = await inquirer.prompt({
    name: "lastname",
    message: "Lastname: ",
    type: "input",
  });

  return { firstname, lastname };
};

const getCredentials = async () => {
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
  const { passwordAgain } = await inquirer.prompt({
    name: "passwordAgain",
    message: "Enter your password again:",
    type: "password",
  });

  if (password !== passwordAgain) {
    throw new Error("The passwords did not match. Aborting");
  }

  return { email, password };
};

export const createNewUser = async (client: Client) => {
  try {
    const { firstname, lastname } = await getName();
    const { email, password } = await getCredentials();
    await client.auth.signUp.mutate({ firstname, lastname, email, password });
  } catch (err) {
    console.error("Could not create the user. Aborting");
    console.error(err);
  }
};

export const associateUserToExistingPerson = async (client: Client) => {
  try {
    const { firstname, lastname } = await getName();
    const { email, password } = await getCredentials();
    await client.auth.signupExistingPerson.mutate({
      firstname,
      lastname,
      email,
      password,
    });
  } catch (err) {
    console.error("Could not create the user. Aborting");
    console.error(err);
  }
};
