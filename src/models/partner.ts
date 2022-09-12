export interface IPartner {
  label: string;
  websiteUrl: string;
  img: {
    src: string;
    size: {
      width: number;
      height: number;
    };
  };
}

export interface IPartnerData {
  website_link: string;
  label: string;
  width: number;
  height: number;
  url: string;
  alt: string;
}
