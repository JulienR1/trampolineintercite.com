import z from "zod";

export const Role = z.enum(["ADMIN", "SUPERADMIN", "READONLY"]);
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

export const NewUser = z.object({
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
});

export const User = z.object({
  id: z.number(),
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email().nullable(),
  password: z.string().nullable(),
  roles: z.array(Role),
  permissions: z.array(Permission),
});

export type INewUser = z.infer<typeof NewUser>;
export type IUser = z.infer<typeof User>;

export interface IUserData {
  id: number;
  firstname: string;
  lastname: string;
  email: string | null;
  password: string | null;
}
