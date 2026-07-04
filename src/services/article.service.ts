import { prisma } from "@/lib/prisma";
import type { ArticleFormValues } from "@/lib/validations/admin";

export function getPublishedArticles(limit?: number) {
  return prisma.article.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
}

export function getArticleBySlug(slug: string) {
  return prisma.article.findUnique({ where: { slug } });
}

export async function getRelatedArticles(slug: string, category?: string | null, limit = 3) {
  return prisma.article.findMany({
    where: {
      published: true,
      slug: { not: slug },
      ...(category ? { category } : {}),
    },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
}

export function getAllArticlesAdmin() {
  return prisma.article.findMany({ orderBy: { createdAt: "desc" } });
}

export function getArticleById(id: string) {
  return prisma.article.findUnique({ where: { id } });
}

export function createArticle(data: ArticleFormValues) {
  return prisma.article.create({ data: { ...data, publishedAt: new Date() } });
}

export function updateArticle(id: string, data: Partial<ArticleFormValues>) {
  return prisma.article.update({ where: { id }, data });
}

export function deleteArticle(id: string) {
  return prisma.article.delete({ where: { id } });
}
