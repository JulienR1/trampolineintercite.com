import z from "zod";

export const AuthCredentials = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type IAuthCredentials = z.infer<typeof AuthCredentials>;
