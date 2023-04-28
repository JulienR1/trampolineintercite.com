import { z } from "zod";

export const Person = z.object({
  firstname: z.string(),
  lastname: z.string(),
});

export type IPerson = z.infer<typeof Person>;

export interface IPersonData {
  id: number;
  firstname: string;
  lastname: string;
}
