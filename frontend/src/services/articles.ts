import fetchContentType from "@/lib/strapi/fetchContentType";
import { Article } from "@/types/article";

/**
 * Obter todos os artigos com paginação
 */
export async function getArticles(
  page: number = 1,
  pageSize: number = 10,
  filters = {},
): Promise<Article[]> {
  const params = {
    sort: ["publishedAt:desc"],
    populate: {
      coverImage: {
        fields: ["url", "width", "height", "alternativeText"],
      },
      category: {
        populate: ["name", "slug"],
      },
      author: {
        populate: ["name", "avatar"],
      },
    },
    pagination: {
      page,
      pageSize,
    },
    filters,
  };

  const response = await fetchContentType("articles", params);
  return response?.data ?? [];
}

/**
 * Obter um artigo por slug
 */
export async function getArticleBySlug(slug: string): Promise<Article> {
  const params = {
    filters: { slug: { $eq: slug } },
    populate: {
      image: { fields: ["url", "width", "height", "alternativeText"] },
      categories: true,
      //author: { populate: ["name", "avatar"] },
      seo: {
        populate: {
          openGraph: { populate: "ogImage" },
          metaImage: true,
        },
      },
    },
  };

  const response = await fetchContentType("articles", params, true);
  return response as Article;
}

/**
 * Obter artigos relacionados por categoria
 */
export async function getRelatedArticles(categoryId: number, articleId: string, limit: number = 3) {
  const params = {
    filters: {
      category: {
        id: {
          $eq: categoryId,
        },
      },
      id: {
        $ne: articleId, // Não incluir o artigo atual
      },
    },
    pagination: {
      limit,
    },
    populate: {
      coverImage: {
        fields: ["url", "width", "height", "alternativeText"],
      },
      category: {
        populate: ["name", "slug"],
      },
    },
  };

  const response = await fetchContentType("articles", params);
  return response?.data ?? [];
}
