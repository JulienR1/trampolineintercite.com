import { INewUser, IPermissionData, IRoleData, IUser, IUserData } from "common";
import { randomBytes } from "crypto";
import { query } from "../lib";
import { err, ok, Result } from "../types";
import { hashPassword } from "./auth.service";

export const getUser = () => {
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

    const permissions = await query<IPermissionData>({
      sql: "SELECT * FROM role_permissions WHERE role_id IN (?)",
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
      password: user.value.password,
      roles: roles.value.map(({ label }) => label) as IUser["roles"],
      permissions: [
        ...new Set(permissions.value.map(({ label }) => label)),
      ] as IUser["permissions"],
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
      values: [email],
    }).single();

    return withRolesAndPermissions(user);
  };

  return { fromId, fromEmail };
};

export const registerUser = async (newUser: INewUser) => {
  const { firstname, lastname, email, password } = newUser;

  const salt = randomBytes(16).toString("hex");
  const hashedPassword = await hashPassword(password, salt);

  if (!hashedPassword.isOk()) {
    return err(hashedPassword.error);
  }

  const saltAndPassword = salt + "." + hashedPassword.value.toString("hex");
  const response = await query<{ new_user_id: number }>({
    sql: "CALL register_user(?, ?, ?, ?)",
    values: [firstname, lastname, email, saltAndPassword],
  }).single();

  return response.isOk()
    ? ok({ id: response.value.new_user_id })
    : err(response.error);
};
