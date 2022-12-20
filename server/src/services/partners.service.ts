import { executeQuery, s3 } from "../lib";
import { IPartner, IPartnerData } from "../models";

export const getAllPartners = async (): Promise<IPartner[]> => {
  const partners = await executeQuery<IPartnerData[]>({
    sql: "SELECT * FROM partner_data",
  });

  if (!partners.isOk()) {
    return [];
  }

  return partners.value.map((partner) => ({
    websiteUrl: partner.website_link,
    label: partner.label,
    img: {
      src: s3.formatUrl(partner.key),
      alt: partner.alt,
      width: partner.width,
      height: partner.height,
    },
  }));
};
