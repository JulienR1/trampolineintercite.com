import { query } from "../lib";
import { IPermissionData, IRoleData, IUser, IUserData } from "../models";
import { err, ok, Result } from "../types";

export const getUser = async (userId: number): Promise<Result<IUser>> => {
  const user = await query<IUserData>({
    sql: "SELECT * FROM users WHERE id = ?",
    values: [userId],
  }).single();

  if (!user.isOk()) {
    return err(user.error);
  }

  const roles = await query<IRoleData>({
    sql: "SELECT * FROM user_roles WHERE person_id = ?",
    values: [userId],
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
