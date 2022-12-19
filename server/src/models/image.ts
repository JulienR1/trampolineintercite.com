import { z } from "zod";

export const Image = z.object({
  src: z.string().url(),
  alt: z.string(),
  width: z.number().positive(),
  height: z.number().positive(),
});

export type IImage = z.infer<typeof Image>;

export type IImageData = {
  id: number;
  key: string;
  alt: string;
  width: number;
  height: number;
};
