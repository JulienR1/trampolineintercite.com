import { ImagePayload } from "@trampo/lib/shared/image.model";
import { IImage } from "@trampo/models";

import { getImagesData } from "./images.repository";

export const getImages = async (): Promise<IImage[]> => {
  const baseUrl = process.env.S3_URL;
  const images = await getImagesData();

  return images.map(image => ({
    src: `${baseUrl}/${image.key}`,
    alt: image.alt,
    width: image.width,
    height: image.height,
  }));
};

export const addImage = async ({ file, type, name, size }: ImagePayload) => {
  const buffer = Buffer.from(
    file.replace(/^data:image\/\w+;base64,/, ""),
    "base64",
  );

  console.log(type);

  // const imageKey = await s3.put(buffer, type);
  // return imageKey;r
  return "dswa";
};
