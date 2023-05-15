import {
  INewUser,
  IPermission,
  IPermissionData,
  IRoleData,
  IUser,
  IUserData,
} from "common";
import { randomBytes } from "crypto";
import { query, transaction } from "../lib";
import { Result, err, ok } from "../types";
import { hashPassword } from "./auth.service";

export const getUser = (options?: { includePassword: boolean }) => {
  const withRolesAndPermissions = async (
    user: Result<IUserData>
  ): Promise<Result<IUser>> => {
    if (!user.isOk()) {
      return err(user.error);
    }

    const roles = await query<IRoleData>({
      sql: "SELECT * FROM user_roles WHERE person_id = ?",
      values: [user.value.id],
    }).execute();

    if (!roles.isOk()) {
      return err(roles.error);
    }

    const permissions = await query<Pick<IPermissionData, "label">>({
      sql: "SELECT DISTINCT label FROM role_permissions WHERE role_id IN (?)",
      values: [roles.value.map((role) => role.id).join(",")],
    }).execute();

    if (!permissions.isOk()) {
      return err(permissions.error);
    }

    return ok({
      id: user.value.id,
      firstname: user.value.firstname,
      lastname: user.value.lastname,
      email: user.value.email,
      password: options?.includePassword ? user.value.password : null,
      roles: roles.value.map(({ label }) => label) as IUser["roles"],
      permissions: permissions.value.map(({ label }) => label) as IPermission[],
    });
  };

  const fromId = async (userId: number) => {
    const user = await query<IUserData>({
      sql: "SELECT * FROM users WHERE id = ?",
      values: [userId],
    }).single();

    return withRolesAndPermissions(user);
  };

  const fromEmail = async (email: string) => {
    const user = await query<IUserData>({
      sql: "SELECT * FROM users WHERE email = ?",
      values: [email.toLowerCase()],
    }).single();

    return withRolesAndPermissions(user);
  };

  return { fromId, fromEmail };
};

export const registerUser = async (
  newUser: INewUser | ({ id: number } & Pick<INewUser, "email" | "password">)
) => {
  const { email, password } = newUser;

  const salt = randomBytes(16).toString("base64");
  const hashedPassword = await hashPassword(password, salt);

  if (!hashedPassword.isOk()) {
    return err(hashedPassword.error);
  }

  let existingPersonId: number | null = null;
  if ("id" in newUser) {
    const result = await getUser().fromId(newUser.id);
    if (result.isOk()) {
      if (result.value.email === null) {
        existingPersonId = result.value.id;
      } else {
        return err(new Error("This person already has an account"));
      }
    } else {
      return err(result.error);
    }
  }

  const saltAndPassword = salt + "." + hashedPassword.value.toString("base64");
  const response = await transaction(async ({ query, single }) => {
    if (existingPersonId === null && !("id" in newUser)) {
      await query({
        sql: "INSERT INTO person (firstname, lastname) VALUES (?, ?)",
        values: [newUser.firstname, newUser.lastname],
      });

      const result = await single<{ new_user_id: number }>({
        sql: "SELECT id AS new_user_id FROM person WHERE LOWER(firstname)=? AND LOWER(lastname)=? ORDER BY id DESC LIMIT 1",
        values: [
          newUser.firstname.toLowerCase(),
          newUser.lastname.toLowerCase(),
        ],
      });
      existingPersonId = result.new_user_id;
    }

    await query({
      sql: "INSERT INTO credentials (person_id, email, `password`) VALUES (?, ?, ?)",
      values: [existingPersonId, email.toLowerCase(), saltAndPassword],
    });

    return { newUserId: existingPersonId! };
  });

  return response.isOk()
    ? ok({ id: response.value.newUserId })
    : err(response.error);
};
