import type { IMAGE_MIME_TYPE } from "@mantine/dropzone";
import type { IRawImage } from "common";

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

const getImageSize = async (
  file: File,
): Promise<{ width: number; height: number }> => {
  return new Promise(resolve => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
  });
};

export const encodeImage = async (file: File) =>
  new Promise<IRawImage>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onerror = err => reject(err);

    reader.onload = async () => {
      const size = await getImageSize(file);
      return resolve({
        file: reader.result?.toString() ?? "",
        name: file.name,
        type: file.type as IRawImage["type"],
        ...size,
      });
    };
  });
