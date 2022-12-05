import { RequestReponse } from "@trampo/lib/server";
import { ImagePayload } from "@trampo/lib/shared/image.model";
import { Method } from "@trampo/types";
import { NextApiRequest, NextApiResponse } from "next";
import { SafeParseError } from "zod";

import { addImage, getImages } from "./images.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === Method.GET) {
    const images = await getImages();
    return RequestReponse.Ok(res, images);
  }

  if (req.method === Method.PUT) {
    const result = ImagePayload.safeParse(req.body);
    if (!result.success) {
      const errors = (result as SafeParseError<ImagePayload>).error;
      return RequestReponse.ServerError(res, JSON.stringify(errors));
    }

    const imageKey = await addImage(req.body);
    return RequestReponse.Ok(res, { key: imageKey });
  }

  if (req.method === Method.DELETE) {
    return RequestReponse.Ok(res);
  }

  return RequestReponse.Invalid(res);
}
