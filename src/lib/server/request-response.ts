import { err, ok } from "@trampo/types";
import { NextApiResponse } from "next";

export class RequestReponse {
  public static Invalid(res: NextApiResponse) {
    return res.status(200).json(err("Invalid request"));
  }

  public static ServerError(res: NextApiResponse, error?: string) {
    return res.status(200).json(err(`Server error: ${error ?? "unknown"}`));
  }

  public static Ok(res: NextApiResponse, payload?: unknown) {
    return res.status(200).json(ok(payload));
  }
}
