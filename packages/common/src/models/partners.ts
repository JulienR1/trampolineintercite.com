import { z } from "zod";
import { Image } from "./image";

export const Partner = z.object({
    label: z.string(),
    url: z.string().url(),
    image: Image
})

export type Partner = z.infer<typeof Partner>
