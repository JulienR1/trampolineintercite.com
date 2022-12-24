import z from "zod";
import { Image } from "./image";

export const Partner = z.object({
  label: z.string(),
  websiteUrl: z.string().url(),
  img: Image,
});

export type IPartner = z.infer<typeof Partner>;

export interface IPartnerData {
  website_link: string;
  label: string;
  width: number;
  height: number;
  key: string;
  alt: string;
}
