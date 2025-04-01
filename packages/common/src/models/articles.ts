import { object, z } from "zod";
import { Image } from "./images";
import { Person } from "./people";

const ArticleBase = z.object({
  title: z.string(),
  slug: z.string(),
  tags: z.array(z.string()),
  releaseDate: z.date().or(
    z
      .string()
      .date()
      .transform((str) => new Date(str)),
  ),
  updateDate: z
    .date()
    .or(
      z
        .string()
        .date()
        .transform((str) => new Date(str)),
    )
    .nullable(),
  author: Person,
});

export const ArticlePreview = ArticleBase.and(z.object({ image: Image }));

export const Article = ArticleBase.and(
  z.object({
    images: z.array(Image),
    contents: z.array(z.string()),
    results: z
      .object({
        title: z.string().optional(),
        columns: z.array(z.string()),
        sections: z.array(
          z.object({
            label: z.string(),
            rows: z.array(
              z.object({
                athlete: Person,
                positions: z.array(z.string().nullable()),
              }),
            ),
          }),
        ),
      })
      .optional(),
  }),
).refine(
  (obj) =>
    !obj.results ||
    obj.results.sections.every((section) =>
      section.rows.every(
        (row) => row.positions.length === obj.results?.columns.length,
      ),
    ),
  { message: "Some row has more or less columns than planned." },
);

export type ArticlePreview = z.infer<typeof ArticlePreview>;
export type Article = z.infer<typeof Article>;
