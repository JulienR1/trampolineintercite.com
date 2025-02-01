import { z } from "zod";

export const Image = z.object({
    src: z.string().url(),
    alt: z.string(),
    width: z.number().positive(),
    height: z.number().positive()
})

export type Image = z.infer<typeof Image>
