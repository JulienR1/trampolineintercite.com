import { executeQuery } from "@trampo/lib/server";
import { IImageData } from "@trampo/models";

export const getImagesData = async (): Promise<IImageData[]> => {
  const images = await executeQuery<IImageData[]>({
    sql: "SELECT * FROM image",
  });

  if (!images.isOk()) {
    // TODO: log error
    return [];
  }

  return images.value;
};
