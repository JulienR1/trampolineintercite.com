import type { IMAGE_MIME_TYPE } from "@mantine/dropzone";

export type ImageType = typeof IMAGE_MIME_TYPE[number];

type CompressOptions = { maxWidth: number; maxHeight: number; type: ImageType };

export const compressImage = async (
  file: File,
  { maxWidth, maxHeight, type }: CompressOptions,
) => {
  const imageBitmap = await createImageBitmap(file);

  const isPortrait = imageBitmap.height > imageBitmap.width;
  const canvas = document.createElement("canvas");
  canvas.width = isPortrait
    ? imageBitmap.height > maxHeight
      ? (imageBitmap.width * maxHeight) / imageBitmap.height
      : imageBitmap.width
    : maxWidth;
  canvas.height = isPortrait
    ? maxHeight
    : imageBitmap.width > maxWidth
    ? (imageBitmap.height * maxWidth) / imageBitmap.width
    : imageBitmap.height;

  const ctx = canvas.getContext("2d");
  ctx?.drawImage(imageBitmap, 0, 0, canvas.width, canvas.height);

  const blob = await new Promise<Blob | null>(resolve =>
    canvas.toBlob(resolve, type),
  );

  return blob ? new File([blob], file.name, { type: blob.type }) : null;
};
