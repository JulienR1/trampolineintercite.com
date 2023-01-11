import z from "zod";
import { Image, RawImage } from "./image";

export const Partner = z.object({
  label: z.string(),
  websiteUrl: z.string().url(),
  img: Image,
});

export const PartnerDetails = z.object({
  id: z.number(),
  label: z.string(),
  websiteUrl: z.string().url(),
  startDate: z.string(),
  endDate: z.string().nullable(),
  isActive: z.boolean(),
  img: Image,
});

export const NewPartnerPayload = z
  .object({
    label: z.string().min(1),
    websiteUrl: z.string().url(),
    from: z
      .string()
      .transform((dateStr) => new Date(dateStr))
      .refine((date) => z.date().safeParse(date).success),
    to: z
      .string()
      .nullable()
      .transform((dateStr) => (dateStr ? new Date(dateStr) : undefined))
      .refine((date) => z.date().optional().safeParse(date).success),
    logo: RawImage,
  })
  .refine((obj) => (obj.to ? obj.to > obj.from : true));

export type IPartner = z.infer<typeof Partner>;
export type IPartnerDetails = z.infer<typeof PartnerDetails>;
export type INewPartnerPayload = z.infer<typeof NewPartnerPayload>;

export interface IPartnerData {
  website_link: string;
  label: string;
  width: number;
  height: number;
  key: string;
  alt: string;
}

export interface IPartnerDetailsData extends IPartnerData {
  id: number;
  start_date: string;
  end_date: string;
}
