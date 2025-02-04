import { z } from "zod";

export const Time = z.object({ hour: z.number(), minute: z.number() })

export const Activity = z.object({
    type: z.number(),
    title: z.string(),
    subtitle: z.string().optional(),
    time: z.object({ start: Time, end: Time }),
    lessons: z.object({ count: z.number(), first: z.date(), last: z.date() }),
    price: z.number(),
    color: z.string()
})

export type Time = z.infer<typeof Time>
export type Activity = z.infer<typeof Activity>
