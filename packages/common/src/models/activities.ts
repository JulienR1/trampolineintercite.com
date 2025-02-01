import { z } from "zod";

export const Activity = z.object({

})

export type Activity = z.infer<typeof Activity>
