import { api } from "@trampo/lib/app";
import { EmailContact } from "@trampo/lib/shared";
import { Method } from "@trampo/types";

type MailContactPayload = { ok: true };

export const sendContactMail = async (
  contactMailData: EmailContact,
  onError: () => void,
  onSuccess: () => void,
) => {
  const response = await api<MailContactPayload>("/api/contact/mail", {
    body: JSON.stringify(contactMailData),
    method: Method.POST,
  });

  return response.ok ? onSuccess() : onError();
};
