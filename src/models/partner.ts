import { IImage } from "./image";

export interface IPartner {
  label: string;
  websiteUrl: string;
  img: IImage;
}

export interface IPartnerData {
  website_link: string;
  label: string;
  width: number;
  height: number;
  url: string;
  alt: string;
}
