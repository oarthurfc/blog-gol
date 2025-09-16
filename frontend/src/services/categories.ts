import fetchContentType from "@/lib/strapi/fetchContentType";
import { Category } from "@/types/category";

/**
 * Obter todas as categorias
 */
export async function getCategories() {
  return await fetchContentType<Category[]>("categories", {
    sort: ["name:asc"],
    populate: {
      articles: {
        fields: ["id"],
      },
    },
  });
}

/**
 * Obter categoria por slug
 */
export async function getCategoryBySlug(slug: string) {
  const response = await fetchContentType("categories", {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      name: true,
      description: true,
    },
  });

  return Array.isArray(response.data) ? response.data[0] || null : null;
}

/**
 * Obter artigos por categoria
 */
export async function getArticlesByCategory(
  categorySlug: string,
  page: number = 1,
  pageSize: number = 10,
) {
  return await fetchContentType("articles", {
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
}
