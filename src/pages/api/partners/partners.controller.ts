import { Method, ok } from "@trampo/types";
import { invalidRequest } from "@trampo/utils";
import { NextApiRequest, NextApiResponse } from "next";

import { getPartners } from "./partners.service";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== Method.GET) {
    return invalidRequest(res);
  }

  const partners = await getPartners();
  return res.status(200).json(ok(partners));
}
