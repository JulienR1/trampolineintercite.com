import { err } from "@trampo/types";
import { NextApiResponse } from "next";

export const invalidRequest = (res: NextApiResponse) =>
  res.status(200).json(err("Invalid request"));
