import { z } from "zod";

export const ImagePayload = z.object({
  name: z.string().min(1, "Veuillez fournir un nom à l'image"),
  file: z.string().min(1, "Veuillez fournir une image"),
  type: z.string().min(1),
  size: z.object({
    width: z.number().int(),
    height: z.number().int(),
  }),
});

export type ImagePayload = z.infer<typeof ImagePayload>;
