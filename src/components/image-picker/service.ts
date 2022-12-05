import { api } from "@trampo/lib/app";
import { ImagePayload } from "@trampo/lib/shared/image.model";
import { Method } from "@trampo/types";

export const getImageSize = async (
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

export const saveImage = async (file: File): Promise<string | undefined> => {
  const size = await getImageSize(file);

  const imageData: string | ArrayBuffer = await new Promise(resolve => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
  });

  const body: ImagePayload = {
    file: imageData.toString(),
    name: file.name,
    type: file.type,
    size,
  };
  const response = await api<{ key: string }>("/api/images", {
    method: "PUT",
    body: JSON.stringify(body),
  });

  return response.isOk() ? response.value.key : undefined;
};

export const deleteImage = async (key: string) => {
  const response = await api("/api/images", {
    method: Method.DELETE,
    body: JSON.stringify({ key }),
  });
  return response.isOk();
};
