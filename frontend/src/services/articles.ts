import fetchContentType from "@/lib/strapi/fetchContentType";
import { Article } from "@/types/article";
import { StrapiQueryParams } from "@/types";
import {
  populateImage,
  populateImageMinimal,
  populateSEO,
  populateCategory,
} from "@/lib/strapi/constants";

/**
 * Obter todos os artigos com paginação
 */
export async function getArticles(
  page: number = 1,
  pageSize: number = 10,
  filters = {},
): Promise<Article[]> {
  const params: StrapiQueryParams = {
    sort: ["publishedAt:desc"],
    populate: {
      coverImage: populateImageMinimal(),
      category: populateCategory(),
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

  const response = await fetchContentType<Article>("articles", params);

  // Type guard para verificar se é uma response com array
  if ("data" in response && Array.isArray(response.data)) {
    return response.data.map((item) => item.attributes || item);
  }

  return [];
}

/**
 * Obter um artigo por slug
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const params: StrapiQueryParams = {
    filters: { slug: { $eq: slug } },
    populate: {
      image: populateImage(),
      categories: populateCategory(),
      //author: { populate: ["name", "avatar"] },
      seo: populateSEO(),
    },
  };

  const response = await fetchContentType<Article>("articles", params, true);
  return response;
}

/**
 * Obter artigos relacionados por categoria
 */
export async function getRelatedArticles(
  categoryId: number,
  articleId: string,
  limit: number = 3,
): Promise<Article[]> {
  const params: StrapiQueryParams = {
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
      coverImage: populateImageMinimal(), // Para relacionados, usar campos mínimos
      category: populateCategory(),
    },
  };

  const response = await fetchContentType<Article>("articles", params);

  // Type guard para verificar se é uma response com array
  if ("data" in response && Array.isArray(response.data)) {
    return response.data.map((item) => item.attributes || item);
  }

  return [];
}
