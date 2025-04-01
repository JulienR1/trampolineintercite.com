import { Article, ArticlePreview } from "common";
import z from "zod";
import _articles from "./articles.json";

export const articles = z.array(Article).parse(_articles);

export function findBySlug(slug: string) {
    return articles.find((article) => article.slug === slug);
}

export const previews = z
    .array(ArticlePreview)
    .parse(_articles)
    .map((article) => ({ ...article, tags: [...new Set(article.tags)] }))
    .sort(
        (a, b) =>
            (b.updateDate ?? b.releaseDate).getTime() -
            (a.updateDate ?? a.releaseDate).getTime(),
    );
