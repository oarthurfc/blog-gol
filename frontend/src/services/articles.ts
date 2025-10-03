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
      image: populateImageMinimal(),
      categories: populateCategory(),
      author: true,
    },
    pagination: {
      page,
      pageSize,
    },
    filters: {
      ...filters,
    },
  };

  const response = await fetchContentType<Article>("articles", params);

  // Type guard para verificar se a response não é null e tem array de dados
  if (response && "data" in response && Array.isArray(response.data)) {
    return response.data.map((item) => item.attributes || item);
  }

  return [];
}

/**
 * Obter artigos por categoria
 */
export async function getArticlesByCategory(
  categorySlug: string,
  page: number = 1,
  pageSize: number = 10,
): Promise<Article[]> {
  const params: StrapiQueryParams = {
    sort: ["publishedAt:desc"],
    populate: {
      image: populateImageMinimal(),
      categories: populateCategory(),
      author: true,
    },
    pagination: {
      page,
      pageSize,
    },
    filters: {
      categories: {
        slug: {
          $eq: categorySlug,
        },
      },
    },
  };

  const response = await fetchContentType<Article>("articles", params);

  // Type guard para verificar se a response não é null e tem array de dados
  if (response && "data" in response && Array.isArray(response.data)) {
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
      author: true,
      seo: populateSEO(),
    },
  };

  const response = await fetchContentType<Article>("articles", params, true);

  // Com spreadData: true, verificar se é um Article válido ou null
  if (response && typeof response === "object" && !("data" in response)) {
    return response as Article;
  }

  return null;
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
      categories: {
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
      image: populateImage(), // Para relacionados, usar campos mínimos
      categories: populateCategory(),
    },
  };

  const response = await fetchContentType<Article>("articles", params);

  // Type guard para verificar se a response não é null e tem array de dados
  if (response && "data" in response && Array.isArray(response.data)) {
    return response.data.map((item) => item.attributes || item);
  }

  return [];
}
