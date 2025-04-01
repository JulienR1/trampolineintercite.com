import { z } from "zod";

export const LooseDate = z
  .date()
  .or(z.number().transform((num) => new Date(num)))
  .or(z.string().transform((str) => new Date(str)));
