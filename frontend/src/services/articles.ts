import { fetchAPI } from '@/lib/strapi';
import { Article } from '@/types/article';

/**
 * Obter todos os artigos com paginação
 */
export async function getArticles(page: number = 1, pageSize: number = 10, filters = {}) {
  const params = {
    sort: ['publishedAt:desc'],
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
    pagination: {
      page,
      pageSize,
    },
    filters,
  };

  const response = await fetchAPI('/api/articles', params);
  return response;
}

/**
 * Obter artigos em destaque
 */
export async function getFeaturedArticles(limit: number = 3) {
  const params = {
    filters: {
      featured: {
        $eq: true,
      },
    },
    sort: ['publishedAt:desc'],
    pagination: {
      limit,
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

/**
 * Obter um artigo por slug
 */
export async function getArticleBySlug(slug: string) {
  const params = {
    filters: {
      slug: {
        $eq: slug,
      },
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
      seo: {
        populate: '*',
      },
      relatedArticles: {
        populate: {
          articles: {
            populate: {
              coverImage: {
                fields: ['url', 'width', 'height', 'alternativeText'],
              },
              category: {
                populate: ['name', 'slug'],
              },
            },
          },
        },
      },
    },
  };

  const response = await fetchAPI('/api/articles', params);
  return response.data?.[0] || null;
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
        fields: ['url', 'width', 'height', 'alternativeText'],
      },
      category: {
        populate: ['name', 'slug'],
      },
    },
  };

  const response = await fetchAPI('/api/articles', params);
  return response;
}
