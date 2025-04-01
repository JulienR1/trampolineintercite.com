import { z } from "zod";

export const Tag = z.object({
  key: z.string(),
  label: z.string(),
  color: z.string(),
});

export type Tag = z.infer<typeof Tag>;
