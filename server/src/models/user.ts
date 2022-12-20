import z from "zod";

export const Role = z.enum(["ADMIN", "SUPERADMIN"]);
export type IRole = z.infer<typeof Role>;

export interface IRoleData {
  id: number;
  label: string;
}

export const Permission = z.enum(["ADMIN_PANEL", "EDIT", "DEPLOY"]);
export type IPermission = z.infer<typeof Permission>;

export interface IPermissionData {
  id: number;
  label: string;
}

export const User = z.object({
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  roles: z.array(Role),
  permissions: z.array(Permission),
});

export type IUser = z.infer<typeof User>;

export interface IUserData {
  id: number;
  firstname: string;
  lastname: string;
  email: string | undefined;
  password: string | undefined;
}
