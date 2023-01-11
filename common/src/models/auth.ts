import z from "zod";
import { IPermission } from "./user";

export const AuthCredentials = z.object({
  email: z.string().email({ message: "Courriel invalide" }),
  password: z.string().min(1, { message: "Veuillez entrer une valeur" }),
});

export type IAuthCredentials = z.infer<typeof AuthCredentials>;

export type IAuthUser = {
  id: number;
  firstname: string;
  lastname: string;
  permissions: IPermission[];
  iat: number;
};
