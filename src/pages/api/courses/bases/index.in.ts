import { RequestReponse } from "@trampo/lib/server";
import { Method } from "@trampo/types";
import { NextApiRequest, NextApiResponse } from "next";

import { getCourseBases } from "../courses.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== Method.GET) {
    return RequestReponse.Invalid(res);
  }

  const courses = await getCourseBases();
  return RequestReponse.Ok(res, courses);
}
