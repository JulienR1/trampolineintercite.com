import { RequestReponse } from "@trampo/lib/server";
import { EmailContact } from "@trampo/lib/shared";
import { Method } from "@trampo/types";
import { NextApiRequest, NextApiResponse } from "next";

import { forwardEmailToReference } from "./contact-mail.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== Method.POST) {
    return RequestReponse.Invalid(res);
  }

  const parsedBody = EmailContact.safeParse(req.body ?? {});
  if (!parsedBody.success) {
    return RequestReponse.Invalid(res);
  }

  const { name, email, subject, message } = parsedBody.data;
  const mailStatus = await forwardEmailToReference(
    name,
    email,
    subject,
    message,
  );

  return mailStatus.isOk()
    ? RequestReponse.Ok(res, { ok: true })
    : RequestReponse.ServerError(res, mailStatus.error.message);
}
