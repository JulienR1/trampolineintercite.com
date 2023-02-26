import { z } from "zod";
import { User } from "./user";

export const Message = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  date: z.date(),
});

export const MessageDetails = z.object({
  id: z.number().positive(),
  title: z.string().min(1),
  content: z.string().min(1),
  startDate: z.date(),
  endDate: z.date(),
  visible: z.boolean(),
  isActive: z.boolean(),
  author: User.nullable(),
});

export const NewMessagePayload = z
  .object({
    title: z.string().min(1),
    content: z.string().min(1),
    startDate: z
      .string()
      .transform((dateStr) => new Date(dateStr))
      .refine((date) => z.date().safeParse(date).success),
    endDate: z
      .string()
      .transform((dateStr) => new Date(dateStr))
      .refine((date) => z.date().safeParse(date).success),
  })
  .refine((obj) => obj.startDate < obj.endDate);

export type IMessage = z.infer<typeof Message>;
export type IMessageDetails = z.infer<typeof MessageDetails>;
export type INewMessagePayload = z.infer<typeof NewMessagePayload>;

export interface IMessageData {
  title: string;
  content: string;
  start_date: string;
}

export interface IMessageDataDetails extends IMessageData {
  id: number;
  end_date: string;
  author_id: number;
  visible: number;
}
