import { IPartner } from "@trampo/models";

import { getPartnerData } from "./partners.repository";

export const getPartners = async (): Promise<IPartner[]> => {
  const partnerData = await getPartnerData();

  const partners: IPartner[] = partnerData.map(partner => ({
    websiteUrl: partner.website_link,
    label: partner.label,
    img: {
      src: partner.url,
      alt: partner.alt,
      width: partner.width,
      height: partner.height,
    },
  }));

  return partners;
};
