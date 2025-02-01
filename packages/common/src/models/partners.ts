import { z } from "zod";
import { Image } from "./images";

export const Partner = z.object({
    label: z.string(),
    url: z.string().url(),
    image: Image
})

export type Partner = z.infer<typeof Partner>
