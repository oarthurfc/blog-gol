import fetchContentType from "@/lib/strapi/fetchContentType";
import { Category } from "@/types/category";
import { Article } from "@/types/article";

/**
 * Obter todas as categorias
 */
export async function getCategories() {
  const response = await fetchContentType<Category>("categories", {
    sort: ["name:asc"],
    populate: {
      articles: {
        fields: ["id"],
      },
    },
  });

  // Type guard para verificar se a response não é null e tem array de dados
  if (response && "data" in response && Array.isArray(response.data)) {
    return response.data.map((item) => item.attributes || item);
  }

  return [];
}

/**
 * Obter categoria por slug
 */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const response = await fetchContentType<Category>(
    "categories",
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: {
        name: true,
        description: true,
      },
    },
    true,
  );

  return response as Category | null;
}

/**
 * Obter artigos por categoria
 */
export async function getArticlesByCategory(
  categorySlug: string,
  page: number = 1,
  pageSize: number = 10,
) {
  const response = await fetchContentType<Article>("articles", {
    filters: {
      category: {
        slug: {
          $eq: categorySlug,
        },
      },
    },
    sort: ["publishedAt:desc"],
    pagination: {
      page,
      pageSize,
    },
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
  });

  // Type guard para verificar se a response não é null e tem array de dados
  if (response && "data" in response && Array.isArray(response.data)) {
    return response.data.map((item) => item.attributes || item);
  }

  return [];
}
