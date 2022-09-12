import { executeQuery } from "@trampo/lib/server";
import { IPartnerData } from "@trampo/models";

export const getPartnerData = async (): Promise<IPartnerData[]> => {
  const partnerData = await executeQuery<IPartnerData[]>({
    sql: "SELECT * FROM partner_data",
  });

  if (!partnerData.isOk()) {
    // TODO: log error in database.
    return [];
  }

  return partnerData.value;
};
