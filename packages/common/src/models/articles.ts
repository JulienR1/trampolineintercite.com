import { z } from "zod";
import { Image } from "./images";
import { Person } from "./people";

const ArticleBase = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  releaseDate: z.date(),
  updateDate: z.date().optional(),
  author: Person,
});

export const ArticlePreview = ArticleBase.and(z.object({ image: Image }));

export const Article = ArticleBase.and(
  z.object({
    images: z.array(Image),
    contents: z.array(z.string()),
    results: z.unknown().optional(),
  }),
);

export type ArticlePreview = z.infer<typeof ArticlePreview>;
export type Article = z.infer<typeof Article>;
