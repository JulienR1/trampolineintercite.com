import { api } from "@trampo/lib/app";
import { IPartner } from "@trampo/models";

export const fetchPartners = async () => {
  const partners = await api<IPartner[]>("/api/partners");
  return partners ?? [];
};
