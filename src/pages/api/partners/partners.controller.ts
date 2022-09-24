import { RequestReponse } from "@trampo/lib/server";
import { Method } from "@trampo/types";
import { NextApiRequest, NextApiResponse } from "next";

import { getPartners } from "./partners.service";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== Method.GET) {
    return RequestReponse.Invalid(res);
  }

  const partners = await getPartners();
  return RequestReponse.Ok(res, partners);
}
