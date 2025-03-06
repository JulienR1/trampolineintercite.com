import { z } from "zod";

export const Person = z.object({
  firstname: z.string(),
  lastname: z.string(),
  url: z.string().nullable(),
});

export type Person = z.infer<typeof Person>;
