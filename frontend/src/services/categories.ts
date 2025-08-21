import { fetchAPI } from '@/lib/strapi';

/**
 * Obter todas as categorias
 */
export async function getCategories() {
  const params = {
    sort: ['name:asc'],
    populate: {
      articles: {
        fields: ['id'],
      },
    },
  };

  const response = await fetchAPI('/api/categories', params);
  return response;
}

/**
 * Obter uma categoria por slug
 */
export async function getCategoryBySlug(slug: string) {
  const params = {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: ['name', 'description'],
  };

  const response = await fetchAPI('/api/categories', params);
  return response.data?.[0] || null;
}

/**
 * Obter artigos por categoria
 */
export async function getArticlesByCategory(
  categorySlug: string,
  page: number = 1,
  pageSize: number = 10
) {
  const params = {
    filters: {
      category: {
        slug: {
          $eq: categorySlug,
        },
      },
    },
    sort: ['publishedAt:desc'],
    pagination: {
      page,
      pageSize,
    },
    populate: {
      coverImage: {
        fields: ['url', 'width', 'height', 'alternativeText'],
      },
      category: {
        populate: ['name', 'slug'],
      },
      author: {
        populate: ['name', 'avatar'],
      },
    },
  };

  const response = await fetchAPI('/api/articles', params);
  return response;
}
