import { z } from "zod";
import { LooseDate } from "./date";

export const Time = z.object({ hour: z.number(), minute: z.number() });

export const Activity = z.object({
  type: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  time: z.object({ start: Time, end: Time }),
  lessons: z.object({
    count: z.number(),
    first: LooseDate,
    last: LooseDate,
    exceptions: z.array(LooseDate),
  }),
  price: z.number(),
  color: z.string(),
});

export type Time = z.infer<typeof Time>;
export type Activity = z.infer<typeof Activity>;
