import { z } from "zod";

export const Image = z.object({
  src: z.string().url(),
  alt: z.string(),
  width: z.number().positive(),
  height: z.number().positive(),
});

export const RawImage = z.object({
  file: z.string().min(1),
  name: z.string().min(1),
  type: z.enum([
    "image/png",
    "image/gif",
    "image/jpeg",
    "image/svg+xml",
    "image/webp",
  ]),
  width: z.number().positive(),
  height: z.number().positive(),
});

export type IImage = z.infer<typeof Image>;
export type IRawImage = z.infer<typeof RawImage>;

export type IImageData = {
  id: number;
  key: string;
  alt: string;
  width: number;
  height: number;
};
